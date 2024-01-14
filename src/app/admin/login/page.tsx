"use client"

import { InputField } from "@/components/admin/InputField";
import { useState } from "react";

function Page() {
    const [passwordInput, setPasswordInput] = useState("");


    return (
        <div>
            PAINEL ADMIN - Login
            <InputField
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="Digite a senha"
            />
        </div>
    )
}

export default Page;