"use client"

import { escapeCPF } from "@/utils/escapeCPF";
import { useState } from "react";

interface Props {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
}

export function SearchForm({ onSearchButton, loading }: Props) {
    const [cpfInput, setCpfInput] = useState("");
    return (
        <div>
            <p className="mb-3 text-xl">Qual seu CPF?</p>
            <input
                type="text"
                inputMode="numeric"
                placeholder="Digite seu CPF"
                className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20"
                autoFocus
                value={cpfInput}
                onChange={e => setCpfInput(escapeCPF(e.target.value))}
                disabled={loading}
            />
            <button
                className="w-full p-3 mt-3 rounded-lg text-white text-4xl bg-blue-800 border-b-4 border-blue-600 active:border-0 disabled:opacity-20"
                onClick={() => onSearchButton(cpfInput)}
                disabled={loading}
            >
                {loading ? "Buscando ..." : "Entrar"}
            </button>
        </div>
    )
}