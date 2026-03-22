// ─── Password Strength Component ────────────────────────────────────────────

import { useEffect, type JSX } from "react";
import type { PasswordStrengthProp } from "../models/account.model";

export function CheckPasswordStrength(props: PasswordStrengthProp): JSX.Element {
    const checks = [
        { label: "Min. 8 karakter", passed: props.password.length >= 8 },
        { label: "Huruf kapital", passed: /[A-Z]/.test(props.password) },
        { label: "Angka", passed: /[0-9]/.test(props.password) },
        { label: "Simbol", passed: /[^A-Za-z0-9]/.test(props.password) },
    ];
    const score = checks.filter((c) => c.passed).length;
    const label = score <= 1 ? "Lemah" : score === 2 ? "Cukup" : score === 3 ? "Kuat" : "Sangat Kuat";
    const labelColor = score <= 1 ? "text-red-400" : score === 2 ? "text-blue-400" : score === 3 ? "text-blue-400" : "text-emerald-400";

    useEffect(() => {
        props.handleChangeLevelStrength(label);
    }, [label]);

    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-xs uppercase tracking-widest text-zinc-600">Kekuatan Password</p>
            <div className="flex gap-1">
                <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${score >= 1 ? "bg-blue-400" : "bg-zinc-800"}`} />
                <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${score >= 2 ? "bg-blue-400" : "bg-zinc-800"}`} />
                <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${score >= 3 ? "bg-blue-400" : "bg-zinc-800"}`} />
                <div className={`flex-1 h-1 rounded-full transition-colors duration-300 ${score >= 4 ? "bg-blue-400" : "bg-zinc-800"}`} />
            </div>
            <p className={`text-xs font-semibold ${labelColor}`}>{props.level}</p>
        </div>
    );
}