"use client"

import { Button } from "@/components/admin/Button";
import { InputField } from "@/components/admin/InputField";
import { useState } from "react";

function Page() {
    const [passwordInput, setPasswordInput] = useState("");

    function handleLoginButton() {

    }

    return (
        <div>
            PAINEL ADMIN - Login
            <InputField
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Digite a senha"
            />
            <Button
                value="Entrar"
                onClick={handleLoginButton}
            />
        </div>
    )
}

export default Page;