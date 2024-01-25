import { useState } from "react";
import { InputField } from "../InputField";
import { z } from "zod";
import { ErrorItem, getErrorForZod } from "@/utils/getErrorFromZod";
import { Button } from "../Button";
import * as api from "@/api/admin";

type Props = {
    eventId: number;
    refreshAction: () => void;
}

export function GroupAdd({ eventId, refreshAction }: Props) {
    const [nameField, setNameField] = useState("");
    const [erros, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const groupSchema = z.object({
        nameField: z.string().min(1, "Preencha o campo")
    })

    async function handleAddButton() {
        setErros([]);
        const data = groupSchema.safeParse({ nameField });
        if (!data.success) return setErros(getErrorForZod(data.error));
        setLoading(true);
        const newGroup = await api.addGroup({ eventId, name: nameField });
        setLoading(false);
        if (newGroup) {
            setNameField("");
            refreshAction();
        } else {
            alert("Ocorreu um erro!");
        }
    }
    return (
        <div>
            <h4 className="text-xl">Novo Grupo</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome do grupo"
                errorMessage={erros.find(erro => erro.field === "nameField")?.message}
                disabled={loading}
            />
            <div>
                <Button
                    value={loading ? "Adicionando" : "Adicionar"}
                    onClick={handleAddButton}

                />
            </div>
        </div>
    );
}