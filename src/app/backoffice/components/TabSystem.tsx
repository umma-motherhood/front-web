"use client";

import { useState, useEffect } from "react";
import { SiteContentData } from "@/config/site";
import { GitHubConfig, fetchWorkflowRuns, WorkflowRunInfo } from "@/lib/github";
import { Settings, Download, Upload, RefreshCw, CheckCircle, Clock, ExternalLink, ShieldAlert, LogOut } from "lucide-react";

interface TabSystemProps {
  data: SiteContentData;
  onChange: (updated: SiteContentData) => void;
  githubConfig: GitHubConfig | null;
  onLogout: () => void;
}

export function TabSystem({ data, onChange, githubConfig, onLogout }: TabSystemProps) {
  const [runs, setRuns] = useState<WorkflowRunInfo[]>([]);
  const [loadingRuns, setLoadingRuns] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

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

  useEffect(() => {
    loadWorkflowRuns();
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

  return (
    <div className="space-y-8">
      {/* Informasi Koneksi GitOps */}
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

          <div className="p-4 rounded-xl bg-paper border border-line">
            <span className="text-muted block text-[11px] mb-1">Token Status</span>
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Tersambung & Terenkripsi</span>
            </span>
          </div>
        </div>

        {/* Status Deploy GitHub Actions */}
        <div className="mt-6 pt-5 border-t border-line">
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

      {/* Tombol Kunci Sesi / Logout */}
      <div className="p-6 rounded-2xl bg-white border border-line shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-ink text-base">
            Kunci Sesi Backoffice
          </h3>
          <p className="text-xs text-muted">
            Keluar dari sesi admin di peramban ini. Anda akan diminta memasukkan PIN kembali saat mengaksesnya.
          </p>
        </div>
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
  );
}
