"use client"

import { Button } from "@/components/admin/Button";
import { InputField } from "@/components/admin/InputField";
import { useState } from "react";
import * as api from "@/api/admin";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();
    const [passwordInput, setPasswordInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");

    async function handleLoginButton() {
        if (passwordInput) {
            setWarning("");
            setLoading(true);
            const token = await api.login(passwordInput);
            setLoading(false);

            if (!token) {
                setWarning("Acesso negado!")
            } else {
                setCookie('token', token);
                router.push('/admin');
            }
        }
    }

    return (
        <div>
            <p className="text-center py-4">Qual a senha secreta?</p>
            <div className="mx-auto max-w-lg"></div>

            <InputField
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Digite a senha"
                disabled={loading}
            />
            <Button
                value={loading ? "Carregando..." : "Entrar"}
                onClick={handleLoginButton}
                disabled={loading}
            />
            {warning &&
                <div className="border border-dashed border-gray-400 p-3">{warning}</div>
            }
        </div>
    )
}

export default Page;