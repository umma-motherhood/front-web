// Klien GitHub Contents API untuk rute /backoffice
// Mengirim commit langsung ke branch main untuk memicu pipeline deploy GitHub Actions

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
}

export interface CommitResult {
  success: boolean;
  commitSha?: string;
  commitUrl?: string;
  message?: string;
}

export interface FileDataResult {
  sha: string;
  content: string;
}

export interface WorkflowRunInfo {
  id: number;
  name: string;
  status: string;
  conclusion: string | null;
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
}

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToUtf8(base64: string): string {
  const cleanBase64 = base64.replace(/\n/g, "");
  const binary = window.atob(cleanBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export async function fetchFileFromRepo(
  config: GitHubConfig,
  path: string
): Promise<FileDataResult | null> {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gagal mengambil data dari GitHub (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  const rawContent = data.content ? base64ToUtf8(data.content) : "";

  return {
    sha: data.sha,
    content: rawContent,
  };
}

export async function commitFileToRepo(
  config: GitHubConfig,
  path: string,
  contentStr: string,
  commitMessage: string
): Promise<CommitResult> {
  const existingFile = await fetchFileFromRepo(config, path).catch(() => null);
  const base64Content = utf8ToBase64(contentStr);

  const payload: Record<string, string> = {
    message: commitMessage,
    content: base64Content,
    branch: config.branch,
  };

  if (existingFile?.sha) {
    payload.sha = existingFile.sha;
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Gagal melakukan commit (${res.status})`
    );
  }

  const responseData = await res.json();
  return {
    success: true,
    commitSha: responseData.commit?.sha,
    commitUrl: responseData.commit?.html_url,
    message: "Perubahan berhasil disimpan ke repository.",
  };
}

export async function uploadBinaryFileToRepo(
  config: GitHubConfig,
  path: string,
  base64Data: string,
  commitMessage: string
): Promise<CommitResult & { downloadUrl?: string }> {
  const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, "");
  const existingFile = await fetchFileFromRepo(config, path).catch(() => null);

  const payload: Record<string, string> = {
    message: commitMessage,
    content: cleanBase64,
    branch: config.branch,
  };

  if (existingFile?.sha) {
    payload.sha = existingFile.sha;
  }

  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${path}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Gagal mengunggah gambar (${res.status})`
    );
  }

  const responseData = await res.json();
  return {
    success: true,
    commitSha: responseData.commit?.sha,
    commitUrl: responseData.commit?.html_url,
    downloadUrl: responseData.content?.download_url,
  };
}

export async function fetchWorkflowRuns(
  config: GitHubConfig
): Promise<WorkflowRunInfo[]> {
  const url = `https://api.github.com/repos/${config.owner}/${config.repo}/actions/runs?per_page=5&branch=${config.branch}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return (data.workflow_runs || []).map((run: any) => ({
    id: run.id,
    name: run.name,
    status: run.status,
    conclusion: run.conclusion,
    htmlUrl: run.html_url,
    createdAt: run.created_at,
    updatedAt: run.updated_at,
  }));
}
