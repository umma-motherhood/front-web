"use client";

import { useState, useEffect } from "react";
import { SiteContentData } from "@/config/site";
import { GitHubConfig, fetchWorkflowRuns, WorkflowRunInfo, testTokenPermissions } from "@/lib/github";
import { encryptData, decryptData, hashPin, verifyPin } from "@/lib/crypto";
import {
  Settings,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  Clock,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  LogOut,
  KeyRound,
  Lock,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface TabSystemProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
  githubConfig: GitHubConfig | null;
  onUpdateGithubConfig?: (newConfig: GitHubConfig) => void;
  onLogout: () => void;
}

const STORAGE_KEY = "umma_backoffice_credentials";

export function TabSystem({
  data,
  onChange,
  githubConfig,
  onUpdateGithubConfig,
  onLogout,
}: TabSystemProps) {
  const [runs, setRuns] = useState<WorkflowRunInfo[]>([]);
  const [loadingRuns, setLoadingRuns] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Token testing state
  const [testingToken, setTestingToken] = useState(false);
  const [testResult, setTestResult] = useState<{
    valid: boolean;
    canPush: boolean;
    message: string;
  } | null>(null);

  // Update token form states
  const [showUpdateToken, setShowUpdateToken] = useState(false);
  const [newToken, setNewToken] = useState("");
  const [verifyPinInput, setVerifyPinInput] = useState("");
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [updatingToken, setUpdatingToken] = useState(false);

  // Change PIN form states
  const [showChangePin, setShowChangePin] = useState(false);
  const [oldPinInput, setOldPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmNewPinInput, setConfirmNewPinInput] = useState("");
  const [pinError, setPinError] = useState<string | null>(null);
  const [pinSuccess, setPinSuccess] = useState<string | null>(null);
  const [changingPin, setChangingPin] = useState(false);

  const loadWorkflowRuns = async () => {
    if (!githubConfig) return;
    setLoadingRuns(true);
    try {
      const result = await fetchWorkflowRuns(githubConfig);
      setRuns(result);
    } catch {
      // Ignored
    } finally {
      setLoadingRuns(false);
    }
  };

  const handleTestToken = async () => {
    if (!githubConfig) return;
    setTestingToken(true);
    setTestResult(null);
    try {
      const res = await testTokenPermissions(githubConfig);
      setTestResult(res);
    } finally {
      setTestingToken(false);
    }
  };

  useEffect(() => {
    loadWorkflowRuns();
    handleTestToken();
  }, [githubConfig]);

  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `backup-umma-motherhood-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.directory && parsed.umkmList) {
          onChange(parsed);
          setImportStatus("Data berhasil dipulihkan dari file JSON!");
        } else {
          setImportStatus("Format file JSON tidak sesuai skema website.");
        }
      } catch {
        setImportStatus("Gagal membaca file JSON.");
      }
    };
    reader.readAsText(file);
  };

  const handleSaveNewToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);

    const cleanToken = newToken.trim();
    if (!cleanToken) {
      setUpdateError("Token baru tidak boleh kosong.");
      return;
    }

    setUpdatingToken(true);
    try {
      const rawStored = localStorage.getItem(STORAGE_KEY);
      if (!rawStored) {
        setUpdateError("Data kredensial lokal tidak ditemukan.");
        setUpdatingToken(false);
        return;
      }

      const stored = JSON.parse(rawStored);
      const isPinValid = await verifyPin(verifyPinInput, stored.pinHash, stored.pinSalt, stored.pinAlg);
      if (!isPinValid) {
        setUpdateError("PIN salah. Masukkan PIN admin yang saat ini digunakan.");
        setUpdatingToken(false);
        return;
      }

      // Test token access first
      const testConfig: GitHubConfig = {
        owner: stored.owner || "umma-motherhood",
        repo: stored.repo || "front-web",
        branch: stored.branch || "main",
        token: cleanToken,
      };

      const testRes = await testTokenPermissions(testConfig);
      if (!testRes.canPush) {
        setUpdateError(testRes.message);
        setUpdatingToken(false);
        return;
      }

      // Encrypt with current PIN and ensure hash uses PBKDF2-SHA512
      const encrypted = await encryptData(cleanToken, verifyPinInput);
      const pinUpdate =
        stored.pinAlg === "pbkdf2-sha512"
          ? {}
          : await (async () => {
              const { hash, salt, alg } = await hashPin(verifyPinInput);
              return { pinHash: hash, pinSalt: salt, pinAlg: alg };
            })();
      const updatedRecord = {
        ...stored,
        ...pinUpdate,
        payload: encrypted,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecord));

      if (onUpdateGithubConfig) {
        onUpdateGithubConfig(testConfig);
      }

      setUpdateSuccess("Token GitHub berhasil diperbarui dan tersambung!");
      setTestResult(testRes);
      setNewToken("");
      setVerifyPinInput("");
      setShowUpdateToken(false);
    } catch (err: any) {
      setUpdateError(err?.message || "Gagal memperbarui token.");
    } finally {
      setUpdatingToken(false);
    }
  };

  const handleSaveNewPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    setPinSuccess(null);

    if (newPinInput.length < 4) {
      setPinError("PIN baru minimal harus terdiri dari 4 karakter.");
      return;
    }

    if (newPinInput !== confirmNewPinInput) {
      setPinError("Konfirmasi PIN baru tidak cocok.");
      return;
    }

    setChangingPin(true);
    try {
      const rawStored = localStorage.getItem(STORAGE_KEY);
      if (!rawStored) {
        setPinError("Data kredensial lokal tidak ditemukan.");
        return;
      }

      const stored = JSON.parse(rawStored);
      const isOldValid = await verifyPin(oldPinInput, stored.pinHash, stored.pinSalt, stored.pinAlg);
      if (!isOldValid) {
        setPinError("PIN lama salah. Masukkan PIN admin yang saat ini digunakan.");
        return;
      }

      const decryptedToken = await decryptData(stored.payload, oldPinInput);
      const { hash, salt, alg } = await hashPin(newPinInput);
      const encryptedPayload = await encryptData(decryptedToken, newPinInput);

      const updatedRecord = {
        ...stored,
        pinHash: hash,
        pinSalt: salt,
        pinAlg: alg,
        payload: encryptedPayload,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecord));

      setPinSuccess("PIN admin berhasil diperbarui (hash PBKDF2-HMAC-SHA512 & enkripsi ulang token).");
      setOldPinInput("");
      setNewPinInput("");
      setConfirmNewPinInput("");
      setShowChangePin(false);
    } catch (err: any) {
      setPinError(err?.message || "Gagal mengganti PIN admin.");
    } finally {
      setChangingPin(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Informasi Koneksi GitOps & Status Izin Token */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-ink">
              Koneksi Repository & Deploy GitOps
            </h2>
            <p className="text-xs text-muted">
              Status integrasi GitHub Contents API untuk publikasi otomatis website.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-paper border border-line">
            <span className="text-muted block text-[11px] mb-1">Target Repository</span>
            <span className="font-mono font-bold text-ink">
              {githubConfig?.owner}/{githubConfig?.repo}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-paper border border-line">
            <span className="text-muted block text-[11px] mb-1">Target Branch</span>
            <span className="font-mono font-bold text-ink">
              {githubConfig?.branch || "main"}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-paper border border-line flex flex-col justify-between">
            <div>
              <span className="text-muted block text-[11px] mb-1">Status Hak Akses Token</span>
              {testResult ? (
                testResult.canPush ? (
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Izin Tulis Aktif (Siap Publish)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-bold text-red-600">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>Akses Ditolak</span>
                  </span>
                )
              ) : (
                <span className="text-muted">Memeriksa izin...</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleTestToken}
              disabled={testingToken}
              className="mt-2 text-[11px] text-rosewood hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${testingToken ? "animate-spin" : ""}`} />
              <span>Cek Ulang Izin Token</span>
            </button>
          </div>
        </div>

        {/* Diagnostic alert jika token belum ada izin */}
        {testResult && !testResult.canPush && (
          <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <div>
                <p className="font-bold">Kendala Izin Token GitHub:</p>
                <p className="mt-0.5 leading-relaxed">{testResult.message}</p>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowUpdateToken(true)}
                className="px-3 py-1.5 rounded-md bg-red-700 text-white font-bold text-xs hover:bg-red-800"
              >
                Ganti Token GitHub Sekarang
              </button>
            </div>
          </div>
        )}

        {/* Panduan Pembuatan Token yang Benar */}
        <div className="mt-6 p-4 rounded-xl bg-warm-sand/30 border border-line text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-ink">
            <HelpCircle className="w-4 h-4 text-rosewood" />
            <span>Panduan: Cara Membuat GitHub Token yang Memiliki Izin Publish</span>
          </div>

          <div className="space-y-2 text-muted leading-relaxed">
            <p>
              Karena repository berada di bawah Organisasi <strong>umma-motherhood</strong>, GitHub memerlukan token dengan izin tulis:
            </p>

            <div className="p-3 rounded-lg bg-white border border-line space-y-1">
              <p className="font-bold text-ink">Cara Paling Mudah: Token Classic (ghp_...)</p>
              <ol className="list-decimal list-inside space-y-1 text-[11px]">
                <li>
                  Buka{" "}
                  <a
                    href="https://github.com/settings/tokens/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rosewood underline font-medium"
                  >
                    https://github.com/settings/tokens/new
                  </a>
                </li>
                <li>Beri Note: &ldquo;Umma Backoffice&rdquo;</li>
                <li>
                  Pada bagian <strong>Select scopes</strong>: Wajib centang kotak <strong><code>repo</code></strong> (Full control of private repositories).
                </li>
                <li>Klik tombol hijau <strong>Generate token</strong> di bawah, lalu salin tokennya.</li>
              </ol>
            </div>

            <div className="p-3 rounded-lg bg-white border border-line space-y-1">
              <p className="font-bold text-ink">Cara Alternatif: Fine-grained Token (github_pat_...)</p>
              <ol className="list-decimal list-inside space-y-1 text-[11px]">
                <li>
                  Buka{" "}
                  <a
                    href="https://github.com/settings/personal-access-tokens/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rosewood underline font-medium"
                  >
                    Fine-grained Token Generator
                  </a>
                </li>
                <li>
                  Pada <strong>Resource owner</strong>: Pilih dropdown <strong>umma-motherhood</strong> (bukan personal account).
                </li>
                <li>
                  Pada <strong>Repository access</strong>: Pilih <em>Only select repositories</em> &rarr; pilih <strong>front-web</strong>.
                </li>
                <li>
                  Pada <strong>Repository permissions</strong>: Cari <strong>Contents</strong> &rarr; ubah menjadi <strong>Access: Read and write</strong>.
                </li>
                <li>Generate token dan salin.</li>
              </ol>
            </div>
          </div>
        </div>

        {updateSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{updateSuccess}</span>
          </div>
        )}

        {pinSuccess && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{pinSuccess}</span>
          </div>
        )}

        {/* Modal / Form Update Token */}
        {showUpdateToken && (
          <form onSubmit={handleSaveNewToken} className="mt-6 p-5 rounded-xl bg-paper border-2 border-rosewood space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h3 className="font-serif font-bold text-ink text-sm flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-rosewood" />
                <span>Perbarui Token GitHub di Backoffice</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowUpdateToken(false)}
                className="text-xs text-muted hover:text-ink font-medium min-h-[44px] px-2"
              >
                Batal
              </button>
            </div>

            {updateError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {updateError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                Token GitHub Baru (Classic atau Fine-grained)
              </label>
              <input
                type="password"
                value={newToken}
                onChange={(e) => setNewToken(e.target.value)}
                placeholder="ghp_... atau github_pat_..."
                required
                className="w-full h-11 px-3 text-xs font-mono rounded-lg border border-line bg-white text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                PIN Admin Anda (Untuk enkripsi ulang)
              </label>
              <input
                type="password"
                value={verifyPinInput}
                onChange={(e) => setVerifyPinInput(e.target.value)}
                placeholder="Masukkan PIN yang Anda pakai untuk login"
                required
                className="w-full h-11 px-3 text-xs rounded-lg border border-line bg-white text-ink"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUpdateToken(false)}
                className="min-h-[44px] px-4 py-2 rounded-lg border border-line bg-white text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={updatingToken}
                className="min-h-[44px] px-5 py-2 rounded-lg bg-rosewood text-white text-xs font-bold hover:bg-[#9f5d54] disabled:opacity-50"
              >
                {updatingToken ? "Menguji & Menyimpan..." : "Uji & Simpan Token Baru"}
              </button>
            </div>
          </form>
        )}

        {/* Form Ganti PIN Admin */}
        {showChangePin && (
          <form onSubmit={handleSaveNewPin} className="mt-6 p-5 rounded-xl bg-paper border-2 border-rosewood space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <h3 className="font-serif font-bold text-ink text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-rosewood" />
                <span>Ganti PIN Admin Backoffice</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowChangePin(false)}
                className="text-xs text-muted hover:text-ink font-medium min-h-[44px] px-2"
              >
                Batal
              </button>
            </div>

            {pinError && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                {pinError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                PIN Admin Saat Ini
              </label>
              <input
                type="password"
                value={oldPinInput}
                onChange={(e) => setOldPinInput(e.target.value)}
                placeholder="Masukkan PIN yang sekarang aktif"
                required
                className="w-full h-11 px-3 text-xs rounded-lg border border-line bg-white text-ink"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  PIN Admin Baru (Min. 4 Karakter)
                </label>
                <input
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Masukkan PIN baru"
                  required
                  minLength={4}
                  className="w-full h-11 px-3 text-xs rounded-lg border border-line bg-white text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
                  Konfirmasi PIN Baru
                </label>
                <input
                  type="password"
                  value={confirmNewPinInput}
                  onChange={(e) => setConfirmNewPinInput(e.target.value)}
                  placeholder="Ulangi PIN baru"
                  required
                  minLength={4}
                  className="w-full h-11 px-3 text-xs rounded-lg border border-line bg-white text-ink"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowChangePin(false)}
                className="min-h-[44px] px-4 py-2 rounded-lg border border-line bg-white text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={changingPin}
                className="min-h-[44px] px-5 py-2 rounded-lg bg-rosewood text-white text-xs font-bold hover:bg-[#9f5d54] disabled:opacity-50"
              >
                {changingPin ? "Mengenkripsi Ulang..." : "Simpan PIN Baru"}
              </button>
            </div>
          </form>
        )}

        {!showUpdateToken && !showChangePin && (
          <div className="mt-4 flex flex-wrap justify-end gap-2.5">
            <button
              type="button"
              onClick={() => {
                setShowChangePin(true);
                setShowUpdateToken(false);
                setPinError(null);
                setPinSuccess(null);
              }}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
            >
              <Lock className="w-3.5 h-3.5 text-rosewood" />
              <span>Ganti PIN Admin</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowUpdateToken(true);
                setShowChangePin(false);
                setUpdateError(null);
                setUpdateSuccess(null);
              }}
              className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
            >
              <KeyRound className="w-3.5 h-3.5 text-rosewood" />
              <span>Ganti / Perbarui Token GitHub</span>
            </button>
          </div>
        )}

        <div className="mt-4 p-3.5 rounded-xl bg-paper border border-line text-xs text-muted flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-rosewood shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-ink">Penyimpanan Kredensial Aman:</strong> PIN Admin dan Token GitHub tidak pernah disimpan ke dalam folder{" "}
            <code className="px-1 py-0.5 rounded bg-white border border-line text-[11px]">src/data/</code> maupun repository Git.
            PIN di-hash secara lokal di browser dengan <strong className="text-ink">PBKDF2-HMAC-SHA512</strong> (150.000 iterasi + salt acak) dan Token dienkripsi dengan{" "}
            <strong className="text-ink">AES-GCM 256-bit</strong>.
          </p>
        </div>

        {/* Status Deploy GitHub Actions */}
        <div className="mt-8 pt-5 border-t border-line">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
              Riwayat Deploy GitHub Pages Terakhir
            </h3>
            <button
              type="button"
              onClick={loadWorkflowRuns}
              disabled={loadingRuns}
              className="inline-flex items-center gap-1 text-xs text-rosewood hover:underline"
            >
              <RefreshCw className={`w-3 h-3 ${loadingRuns ? "animate-spin" : ""}`} />
              <span>Perbarui Status</span>
            </button>
          </div>

          <div className="space-y-2">
            {runs.slice(0, 3).map((run) => (
              <div
                key={run.id}
                className="p-3 rounded-lg bg-paper border border-line flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  {run.status === "completed" && run.conclusion === "success" ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  ) : run.status === "in_progress" ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  )}
                  <span className="font-medium text-ink">{run.name}</span>
                  <span className="text-muted">
                    ({run.status === "completed" ? run.conclusion : "sedang berjalan"})
                  </span>
                </div>

                <a
                  href={run.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-rosewood"
                >
                  <span>Lihat Log GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}

            {runs.length === 0 && (
              <p className="text-xs text-muted italic">
                Klik &ldquo;Perbarui Status&rdquo; untuk memeriksa log deploy dari GitHub.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Backup & Pulihkan Data */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-line">
          <div className="w-10 h-10 rounded-lg bg-warm-sand/50 text-rosewood flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-ink">
              Cadangan & Pemulihan Data (Backup JSON)
            </h2>
            <p className="text-xs text-muted">
              Unduh salinan seluruh isi website ke file JSON lokal sebagai arsip cadangan mandiri.
            </p>
          </div>
        </div>

        {importStatus && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
            {importStatus}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-rosewood text-white text-xs font-bold transition hover:bg-[#9f5d54] shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download File Backup JSON</span>
          </button>

          <label className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-line bg-paper hover:bg-white text-ink text-xs font-bold cursor-pointer transition">
            <Upload className="w-4 h-4 text-muted" />
            <span>Pulihkan dari File JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Tombol Kunci Sesi / Logout & Reset */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-ink text-base">
            Keamanan Sesi Backoffice
          </h3>
          <p className="text-xs text-muted">
            Keluar dari sesi admin saat ini, atau reset kredensial lokal jika ingin mengganti PIN dan Token GitHub dari awal.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  "Reset konfigurasi akan menghapus PIN dan Token tersimpan di browser ini. Anda perlu memasukkan ulang Token GitHub dan membuat PIN baru. Lanjutkan?"
                )
              ) {
                localStorage.removeItem(STORAGE_KEY);
                onLogout();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-paper hover:bg-white text-muted hover:text-ink text-xs font-bold transition"
          >
            <KeyRound className="w-4 h-4" />
            <span>Reset PIN &amp; Konfigurasi</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
