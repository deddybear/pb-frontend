// ─── Types ────────────────────────────────────────────────────────────────────

export interface PatchNote {
  version: string;
  date: string;
  changes: string[];
  type: "major" | "minor" | "fix";
}

export interface Spec {
  label: string;
  minimum: string;
  recommended: string;
}

export interface InstallStep {
  num: string;
  title: string;
  desc: string;
}

