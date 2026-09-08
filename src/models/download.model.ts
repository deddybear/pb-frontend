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


export const listPatchNotes: PatchNote[] = [
  {
    version: "v3.123",
    date: "08 September 2026",
    type: "major",
    changes: [
      "Perbaikan pada Shop Cash, Shop Point, Shop Medal, dan Shop Weapon.",
      "Fitur Battle Pass & Attedance",
      "Dan lain lain"
    ],
  }
]
