import { Group } from "@/types/Group"
import { ErrorItem, getErrorForZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import * as api from '@/api/admin'
import { z } from "zod";

type Props = {
    group: Group;
    refreshAction: () => void;
}

export function GroupEdit({ group, refreshAction }: Props) {
    const [nameField, setNameField] = useState(group.name);
    const [errors, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const groupSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome")
    });

    useEffect(() => {
        setErros([]);
        const data = groupSchema.safeParse({ nameField });
        if (!data.success) setErros(getErrorForZod(data.error))
    }, [nameField])

    async function handleSaveButton() {
        if (errors.length > 0) return;

        setLoading(true);
        const updatedGroup = await api.updateGroup({ eventId: group.id_event, id: group.id, name: nameField });
        setLoading(false);

        if (updatedGroup) {
            refreshAction();
        } else {
            alert("Ocorreu algum erro!")
        }
    }

    return (
        <div>
            <h4 className="text-xl">Editar Grupo</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digine o nome do grupo"
                errorMessage={errors.find(err => err.field === "nameField")?.message}
                disabled={loading}
            />
            <div className="flex gap-3">
                <Button
                    value="Cancelar"
                    onClick={() => refreshAction()}
                    disabled={loading}
                />
                <Button
                    value="Salvar"
                    onClick={handleSaveButton}
                    disabled={loading}
                />
            </div>
        </div>
    )
}