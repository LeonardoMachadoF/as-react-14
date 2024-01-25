import { ErrorItem, getErrorForZod } from "@/utils/getErrorFromZod";
import { useState } from "react";
import { InputField } from "../InputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";
import { z } from "zod";
import * as api from '@/api/admin';

type Props = {
    eventId: number;
    groupId: number;
    refreshAction: () => void;
}

export function PersonAdd({ eventId, groupId, refreshAction }: Props) {
    const [nameField, setNameField] = useState("");
    const [cpfField, setCpfField] = useState("");
    const [errors, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome"),
        cpfField: z.string().min(11, "CPF inválido"),
    })

    const handleSaveButton = async () => {
        setErros([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErros(getErrorForZod(data.error));

        setLoading(true);
        const newPerson = await api.addPerson({ cpf: cpfField, eventId, groupId, name: nameField });
        setLoading(false);

        if (newPerson) {
            setCpfField("");
            setNameField("");
            refreshAction();
        } else {
            alert("Ocorreu algum erro!")
        }
    }

    return (
        <div>
            <h4 className="text-xl">Nova Pessoa</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome da pessoa"
                errorMessage={errors.find(item => item.field === "nameField")?.message}
                disabled={loading}
            />
            <InputField
                value={cpfField}
                onChange={e => setCpfField(escapeCPF(e.target.value))}
                placeholder="Digite o cpf da pessoa"
                errorMessage={errors.find(item => item.field === "cpfField")?.message}
                disabled={loading}
            />
            <div>
                <Button
                    value="Adicionar"
                    disabled={loading}
                    onClick={handleSaveButton}
                />
            </div>
        </div>
    )
}