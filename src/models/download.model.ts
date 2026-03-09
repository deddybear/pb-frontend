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

// ─── Data ─────────────────────────────────────────────────────────────────────

export const patchNotes: PatchNote[] = [
  {
    version: "v3.6.8",
    date: "01 Januari 2026",
    type: "major",
    changes: [
      "Armor GM dihilangkan !",
      // "Map baru ditambahkan: Arctic Zone & Desert Storm",
      // "Sistem rank season 12 direset",
      // "Senjata baru: AK-12 & M416 tersedia di in-game shop",
      // "Anti-cheat engine diperbarui ke versi terbaru",
      // "Optimasi performa server — ping rata-rata turun 20ms",
      // "Perbaikan bug karakter stuck di spawn area",
      "UI inventory diperbaharui",
      "Fix Bug Error pada shop weapon"
      // "Hotfix: crash saat masuk room ranked",
      // "Perbaikan visual glitch pada scope sniper",
    ],
  },
  // {
  //   version: "v2.3.8",
  //   date: "18 Feb 2026",
  //   type: "minor",
  //   changes: [
  //     "Optimasi performa server — ping rata-rata turun 20ms",
  //     "Perbaikan bug karakter stuck di spawn area",
  //     "UI inventory diperbaharui",
  //   ],
  // },
  // {
  //   version: "v2.3.5",
  //   date: "02 Jan 2026",
  //   type: "fix",
  //   changes: [
  //     "Hotfix: crash saat masuk room ranked",
  //     "Perbaikan visual glitch pada scope sniper",
  //   ],
  // },
];

export const specs: Spec[] = [
  { label: "OS", minimum: "Windows 7 (64-bit)", recommended: "Windows 10/11 (64-bit)" },
  { label: "Processor", minimum: "Intel Core i3 2.4 GHz", recommended: "Intel Core i5 3.0 GHz+" },
  { label: "RAM", minimum: "4 GB", recommended: "8 GB" },
  { label: "GPU", minimum: "NVIDIA GTX 650", recommended: "NVIDIA GTX 1060 / AMD RX 580" },
  { label: "Storage", minimum: "8 GB", recommended: "16 GB SSD" },
  { label: "Network", minimum: "2 Mbps", recommended: "10 Mbps+" },
];

export const installSteps: InstallStep[] = [
  { num: "01", title: "Download Client", desc: "Klik tombol download di atas dan tunggu hingga file installer selesai diunduh." },
  { num: "02", title: "Ekstrak File", desc: "Ekstrak file .zip menggunakan WinRAR atau 7-Zip ke folder yang kamu inginkan." },
  { num: "03", title: "Baca Manual", desc: "Baca File Manual *BACA_AKU* yang ada pada file .Zip ." },
  { num: "04", title: "Login & Main", desc: "Buka launcher, login dengan akun yang sudah didaftarkan, dan langsung bermain!" },
];

export const patchTypeConfig: Record<PatchNote["type"], { label: string; color: string }> = {
  major: { label: "MAJOR", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
  minor: { label: "MINOR", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
  fix: { label: "HOTFIX", color: "text-red-400 border-red-400/30 bg-red-400/10" },
};