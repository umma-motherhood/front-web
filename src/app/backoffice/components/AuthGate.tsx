"use client";

import { useState, useEffect } from "react";
import { Lock, KeyRound, ShieldCheck, AlertCircle, Eye, EyeOff, ExternalLink } from "lucide-react";
import { hashPin, verifyPin, encryptData, decryptData, EncryptedPayload, PinHashAlg } from "@/lib/crypto";
import { GitHubConfig } from "@/lib/github";

interface AuthGateProps {
  onAuthenticated: (config: GitHubConfig) => void;
}

interface StoredAuth {
  pinHash: string;
  pinSalt: string;
  pinAlg?: PinHashAlg;
  payload: EncryptedPayload;
  owner: string;
  repo: string;
  branch: string;
}

const STORAGE_KEY = "umma_backoffice_credentials";

export function AuthGate({ onAuthenticated }: AuthGateProps) {
  const [isSetupDone, setIsSetupDone] = useState<boolean | null>(null);
  const [storedData, setStoredData] = useState<StoredAuth | null>(null);

  // Form input states
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Setup mode states
  const [tokenInput, setTokenInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("umma-motherhood");
  const [repoInput, setRepoInput] = useState("front-web");
  const [branchInput, setBranchInput] = useState("main");
  const [confirmPin, setConfirmPin] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.pinHash && parsed.payload) {
          setStoredData(parsed);
          setIsSetupDone(true);
          return;
        }
      }
      setIsSetupDone(false);
    } catch {
      setIsSetupDone(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!storedData || !pin) return;

    setLoading(true);
    try {
      const isValid = await verifyPin(
        pin,
        storedData.pinHash,
        storedData.pinSalt,
        storedData.pinAlg
      );
      if (!isValid) {
        setError("PIN atau kata sandi tidak cocok. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      const decryptedToken = await decryptData(storedData.payload, pin);

      // Upgrade hash/encryption algorithm to PBKDF2-HMAC-SHA512 transparently
      if (
        storedData.pinAlg !== "pbkdf2-sha512" ||
        storedData.payload.kdfAlg !== "pbkdf2-sha512"
      ) {
        try {
          const { hash, salt, alg } = await hashPin(pin);
          const reEncrypted = await encryptData(decryptedToken, pin);
          const upgraded: StoredAuth = {
            ...storedData,
            pinHash: hash,
            pinSalt: salt,
            pinAlg: alg,
            payload: reEncrypted,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(upgraded));
          setStoredData(upgraded);
        } catch {
          // Non-fatal if upgrade skipped
        }
      }

      onAuthenticated({
        owner: storedData.owner || "umma-motherhood",
        repo: storedData.repo || "front-web",
        branch: storedData.branch || "main",
        token: decryptedToken,
      });
    } catch (err: any) {
      setError("Gagal mendekripsi kredensial. Pastikan PIN benar.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (pin.length < 4) {
      setError("PIN atau kata sandi minimal 4 karakter.");
      return;
    }
    if (pin !== confirmPin) {
      setError("Konfirmasi PIN tidak cocok dengan PIN pertama.");
      return;
    }
    if (!tokenInput.trim()) {
      setError("GitHub Personal Access Token (PAT) wajib diisi untuk menyimpan konten ke website.");
      return;
    }

    setLoading(true);
    try {
      const { hash, salt, alg } = await hashPin(pin);
      const encrypted = await encryptData(tokenInput.trim(), pin);

      const authRecord: StoredAuth = {
        pinHash: hash,
        pinSalt: salt,
        pinAlg: alg,
        payload: encrypted,
        owner: ownerInput.trim() || "umma-motherhood",
        repo: repoInput.trim() || "front-web",
        branch: branchInput.trim() || "main",
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(authRecord));
      setStoredData(authRecord);
      setIsSetupDone(true);

      onAuthenticated({
        owner: authRecord.owner,
        repo: authRecord.repo,
        branch: authRecord.branch,
        token: tokenInput.trim(),
      });
    } catch (err: any) {
      setError("Gagal menyimpan konfigurasi awal. " + (err?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  if (isSetupDone === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-rosewood border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Tampilan Login (Jika sudah pernah setup)
  if (isSetupDone) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-line shadow-lg">
          <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-warm-sand/50 text-rosewood">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-serif font-bold text-center text-ink">
            Akses Backoffice
          </h1>
          <p className="mt-2 text-sm text-center text-muted">
            Masuk dengan PIN / Password Pengelola Komunitas Umma Motherhood Cipanas.
          </p>

          {error && (
            <div className="mt-4 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-pin" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                PIN / Kata Sandi Admin
              </label>
              <div className="relative">
                <input
                  id="login-pin"
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Masukkan PIN rahasia"
                  required
                  autoFocus
                  className="w-full h-11 px-3.5 pr-10 text-base rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none p-1"
                  aria-label={showPin ? "Sembunyikan sandi" : "Tampilkan sandi"}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-lg bg-rosewood text-white font-bold text-sm tracking-wide transition hover:bg-[#9f5d54] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Membuka Sesi...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Buka Backoffice</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Tampilan Pengaturan Awal (First time setup)
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg p-8 rounded-2xl bg-white border border-line shadow-lg">
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-rosewood/10 text-rosewood">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-serif font-bold text-center text-ink">
          Inisialisasi Backoffice
        </h1>
        <p className="mt-2 text-sm text-center text-muted">
          Website ini menggunakan sistem GitOps terdesentralisasi. Pengaturan ini hanya perlu diisi sekali di peramban admin untuk mengaktifkan fitur simpan dan publikasi otomatis ke GitHub.
        </p>

        {error && (
          <div className="mt-4 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSetup} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
              Buat PIN / Kata Sandi Baru
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Minimal 4 karakter (misal: 123456)"
              required
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1">
              Konfirmasi PIN Baru
            </label>
            <input
              type="password"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="Ketik ulang PIN di atas"
              required
              className="w-full h-11 px-3.5 text-sm rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">
                GitHub Personal Access Token (PAT)
              </label>
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-rosewood hover:underline"
              >
                <span>Buka GitHub Token</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="ghp_... atau github_pat_..."
              required
              className="w-full h-11 px-3.5 text-sm font-mono rounded-lg border border-line bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-rosewood/40 focus:border-rosewood"
            />
            <p className="mt-1 text-[11px] text-muted leading-relaxed">
              Token hanya disimpan di browser Anda secara terenkripsi (AES-GCM). Token memerlukan izin <code>repo (contents: write)</code> agar dapat mempublikasikan data ke GitHub Pages.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-semibold text-ink uppercase tracking-wider mb-1">
                Owner Repository
              </label>
              <input
                type="text"
                value={ownerInput}
                onChange={(e) => setOwnerInput(e.target.value)}
                className="w-full h-10 px-3 text-xs font-mono rounded-lg border border-line bg-paper text-ink"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-ink uppercase tracking-wider mb-1">
                Nama Repository
              </label>
              <input
                type="text"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                className="w-full h-10 px-3 text-xs font-mono rounded-lg border border-line bg-paper text-ink"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-4 rounded-lg bg-rosewood text-white font-bold text-sm tracking-wide transition hover:bg-[#9f5d54] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyimpan Kredensial...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Simpan Konfigurasi & Masuk</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
