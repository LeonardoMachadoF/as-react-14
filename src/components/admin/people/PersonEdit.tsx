import { PersonComplete } from "@/types/PersonComplete"
import * as api from '@/api/admin'
import { useEffect, useState } from "react";
import { ErrorItem, getErrorForZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import { InputField } from "../InputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";

type Props = {
    person: PersonComplete;
    refreshAction: () => void;
}

export function PersonEdit({ person, refreshAction }: Props) {
    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [errors, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, "Preencha o nome"),
        cpfField: z.string().min(11, "CPF inválido"),
    })

    useEffect(() => {
        setErros([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErros(getErrorForZod(data.error));
    }, [nameField, , cpfField])

    async function handleSaveButton() {
        if (errors.length > 0) return;

        setLoading(true);
        const updatedPerson = await api.updatePerson(
            person.id_event, person.id_group, person.id, { name: person.name, cpf: person.cpf }
        );
        setLoading(false);
        if (updatedPerson) {
            refreshAction()
        } else {
            alert("Ocorreu um erro!")
        }
    }


    return (
        <div>
            <h4 className="text-xl">Editar Pessoa</h4>
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
            <div className="flex gap-3">
                <Button
                    value="Cancelar"
                    disabled={loading}
                    onClick={refreshAction}
                />
                <Button
                    value="Salvar"
                    disabled={loading}
                    onClick={handleSaveButton}
                />
            </div>
        </div>
    )
}