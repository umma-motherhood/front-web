"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteContent as initialSiteContent, SiteContentData } from "@/config/site";
import { GitHubConfig, commitFileToRepo, fetchFileFromRepo } from "@/lib/github";
import { AuthGate } from "./components/AuthGate";
import { TabGeneral } from "./components/TabGeneral";
import { TabVolunteers } from "./components/TabVolunteers";
import { TabUmkm } from "./components/TabUmkm";
import { TabDirectory } from "./components/TabDirectory";
import { TabArticles } from "./components/TabArticles";
import { TabHelp } from "./components/TabHelp";
import { TabSystem } from "./components/TabSystem";
import {
  Globe,
  Save,
  CheckCircle,
  AlertCircle,
  Phone,
  Users,
  ShoppingBag,
  MapPin,
  BookOpen,
  HandHeart,
  Settings,
  ExternalLink,
  RefreshCw,
  X,
} from "lucide-react";

type TabKey = "general" | "volunteers" | "umkm" | "directory" | "articles" | "help" | "system";

export default function BackofficePage() {
  const [githubConfig, setGithubConfig] = useState<GitHubConfig | null>(null);
  const [data, setData] = useState<SiteContentData>(initialSiteContent);
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  // Publishing & feedback states
  const [publishing, setPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<{
    success: boolean;
    commitSha?: string;
    commitUrl?: string;
    message?: string;
  } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [fetchingRemote, setFetchingRemote] = useState(false);
  const [remoteNotice, setRemoteNotice] = useState<string | null>(null);

  // Sync state changes
  const handleDataChange = (updated: SiteContentData) => {
    setData(updated);
    setHasUnsavedChanges(true);
  };

  // Check remote repo content once authenticated
  const checkRemoteContent = async (config: GitHubConfig) => {
    setFetchingRemote(true);
    setRemoteNotice(null);
    try {
      const remote = await fetchFileFromRepo(config, "src/data/site-content.json");
      if (remote?.content) {
        const parsed = JSON.parse(remote.content);
        if (parsed.directory && parsed.umkmList) {
          setData(parsed);
          setRemoteNotice("Data terbaru dari repository berhasil disinkronkan.");
        }
      }
    } catch {
      // Keep initial local build data
    } finally {
      setFetchingRemote(false);
    }
  };

  const handleAuthenticated = (config: GitHubConfig) => {
    setGithubConfig(config);
    checkRemoteContent(config);
  };

  const handleUpdateGithubConfig = (newConfig: GitHubConfig) => {
    setGithubConfig(newConfig);
  };

  const handleLogout = () => {
    setGithubConfig(null);
  };

  const handlePublish = async () => {
    if (!githubConfig) return;
    setPublishing(true);
    setPublishResult(null);

    try {
      const jsonString = JSON.stringify(data, null, 2);
      const result = await commitFileToRepo(
        githubConfig,
        "src/data/site-content.json",
        jsonString,
        `chore(cms): update content via backoffice at ${new Date().toLocaleString("id-ID")}`
      );

      setPublishResult(result);
      setHasUnsavedChanges(false);
    } catch (err: any) {
      setPublishResult({
        success: false,
        message: err?.message || "Terjadi kesalahan saat menyimpan ke GitHub.",
      });
    } finally {
      setPublishing(false);
    }
  };

  // Auth Protection Gate
  if (!githubConfig) {
    return <AuthGate onAuthenticated={handleAuthenticated} />;
  }

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "general", label: "Umum & Hero", icon: <Phone className="w-4 h-4" /> },
    { key: "volunteers", label: "Relawan (#dukung)", icon: <Users className="w-4 h-4" /> },
    { key: "umkm", label: "Lapak UMKM", icon: <ShoppingBag className="w-4 h-4" /> },
    { key: "directory", label: "Direktori", icon: <MapPin className="w-4 h-4" /> },
    { key: "articles", label: "Artikel", icon: <BookOpen className="w-4 h-4" /> },
    { key: "help", label: "Bantuan & Iklan", icon: <HandHeart className="w-4 h-4" /> },
    { key: "system", label: "Sistem & Deploy", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-warm-sand/20 text-ink pb-24">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="max-w-[1240px] w-[calc(100%-32px)] mx-auto py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-full bg-rosewood/10 text-rosewood flex items-center justify-center font-serif font-bold text-lg hover:bg-rosewood hover:text-white transition"
              title="Kembali ke Beranda"
            >
              U
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-ink text-base">
                  Umma Backoffice
                </span>
                <span className="text-[10px] font-bold text-rosewood bg-warm-sand/60 px-2 py-0.5 rounded uppercase">
                  CMS
                </span>
              </div>
              <p className="text-[11px] text-muted">
                Pengelola Konten Website Umma Motherhood Cipanas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://ummamotherhood.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-line bg-paper hover:bg-white text-xs font-semibold text-ink transition"
            >
              <Globe className="w-3.5 h-3.5 text-rosewood" />
              <span className="hidden sm:inline">Lihat Website Live</span>
              <ExternalLink className="w-3 h-3 text-muted" />
            </a>

            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition shadow-sm ${
                hasUnsavedChanges
                  ? "bg-rosewood text-white hover:bg-[#9f5d54] ring-2 ring-rosewood/30 animate-pulse"
                  : "bg-ink text-white hover:bg-black"
              } disabled:opacity-50`}
            >
              {publishing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Mempublikasikan...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan &amp; Publikasikan</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-[1240px] w-[calc(100%-32px)] mx-auto overflow-x-auto scrollbar-none">
          <nav className="flex space-x-1 py-1" aria-label="Menu Tab Backoffice">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.key
                    ? "border-rosewood text-rosewood font-bold bg-warm-sand/30"
                    : "border-transparent text-muted hover:text-ink hover:border-line"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1240px] w-[calc(100%-32px)] mx-auto mt-6">
        {/* Remote notification message */}
        {remoteNotice && (
          <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{remoteNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setRemoteNotice(null)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Unsaved changes banner */}
        {hasUnsavedChanges && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>
                Ada perubahan yang belum dipublikasikan ke website. Klik tombol <strong>Simpan &amp; Publikasikan</strong> di kanan atas untuk merilisnya.
              </span>
            </div>
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing}
              className="px-3 py-1 bg-amber-600 text-white rounded font-bold hover:bg-amber-700 text-[11px] shrink-0"
            >
              Publikasikan Sekarang
            </button>
          </div>
        )}

        {/* Tab Content Panels */}
        {activeTab === "general" && (
          <TabGeneral data={data} onChange={handleDataChange} />
        )}
        {activeTab === "volunteers" && (
          <TabVolunteers data={data} onChange={handleDataChange} githubConfig={githubConfig} />
        )}
        {activeTab === "umkm" && (
          <TabUmkm data={data} onChange={handleDataChange} githubConfig={githubConfig} />
        )}
        {activeTab === "directory" && (
          <TabDirectory data={data} onChange={handleDataChange} />
        )}
        {activeTab === "articles" && (
          <TabArticles data={data} onChange={handleDataChange} />
        )}
        {activeTab === "help" && (
          <TabHelp data={data} onChange={handleDataChange} />
        )}
        {activeTab === "system" && (
          <TabSystem
            data={data}
            onChange={handleDataChange}
            githubConfig={githubConfig}
            onUpdateGithubConfig={handleUpdateGithubConfig}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Publish Result Modal / Dialog */}
      {publishResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white border border-line shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="font-serif font-bold text-ink text-base flex items-center gap-2">
                {publishResult.success ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span>Publikasi Berhasil Dimulai</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span>Gagal Mempublikasikan</span>
                  </>
                )}
              </h3>
              <button
                type="button"
                onClick={() => setPublishResult(null)}
                className="text-muted hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-muted leading-relaxed space-y-2">
              <p>
                {publishResult.success
                  ? "Commit telah berhasil dikirim ke repository GitHub. Pipeline GitHub Actions otomatis berjalan untuk merilis website ke GitHub Pages dalam rentang waktu sekitar 60 sampai 90 detik."
                  : publishResult.message}
              </p>
            </div>

            {publishResult.commitUrl && (
              <div className="p-3 rounded-lg bg-paper border border-line text-xs font-mono">
                <span className="text-muted block text-[10px] mb-1">Commit SHA:</span>
                <a
                  href={publishResult.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rosewood underline inline-flex items-center gap-1"
                >
                  <span>{publishResult.commitSha?.slice(0, 10)}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-line">
              {!publishResult.success && (
                <button
                  type="button"
                  onClick={() => {
                    setPublishResult(null);
                    setActiveTab("system");
                  }}
                  className="px-4 py-2.5 rounded-lg border border-rosewood text-rosewood text-xs font-bold hover:bg-warm-sand/30 transition"
                >
                  Buka Tab Sistem &amp; Ganti Token
                </button>
              )}
              <button
                type="button"
                onClick={() => setPublishResult(null)}
                className="px-5 py-2.5 rounded-lg bg-rosewood text-white text-xs font-bold hover:bg-[#9f5d54] transition"
              >
                Tutup &amp; Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
