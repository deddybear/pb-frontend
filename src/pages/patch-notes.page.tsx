import { type JSX } from "react";
import { patchNotes, patchTypeConfig } from "../models/download.model";

export default function PatchNotesPage(): JSX.Element {
    return (
        <div className="min-h-screen bg-zinc-900 flex flex-col">
            <main className="flex-1 pt-16">
                {/* ── Patch Notes ───────────────────────────────────────────────── */}
                <section className="py-16 sm:py-20 border-b border-zinc-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-10">
                            <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">Patch Notes</p>
                            <h2 className="text-white font-black text-3xl sm:text-4xl uppercase tracking-tight">
                                Riwayat Update
                            </h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {patchNotes.map((patch, i) => {
                                const typeConfig = patchTypeConfig[patch.type];
                                return (
                                    <div
                                        key={patch.version}
                                        className={`bg-zinc-950 border rounded-sm overflow-hidden transition-colors
                              ${i === 0 ? "border-blue-400/30" : "border-zinc-800 hover:border-zinc-700"}`}
                                    >
                                        {/* Patch header */}
                                        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-zinc-800 flex-wrap">
                                            <div className="flex items-center gap-3">
                                                {i === 0 && (
                                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                                                )}
                                                <span className="text-white font-black text-sm uppercase tracking-widest">
                                                    {patch.version}
                                                </span>
                                                <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-sm border ${typeConfig.color}`}>
                                                    {typeConfig.label}
                                                </span>
                                            </div>
                                            <span className="text-zinc-600 text-xs uppercase tracking-widest">
                                                {patch.date}
                                            </span>
                                        </div>

                                        {/* Changes */}
                                        <ul className="px-5 py-4 flex flex-col gap-2">
                                            {patch.changes.map((change, j) => (
                                                <li key={j} className="flex items-start gap-3 text-sm text-zinc-400">
                                                    <span className="text-blue-400 mt-0.5 shrink-0">›</span>
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}