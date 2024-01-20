"use client"
import { Event } from "@/types/Event";
import { InputField } from "../InputField";
import { useState } from "react";
import { Button } from "../Button";
import { set, z } from "zod";
import { ErrorItem, getErrorForZod } from "@/utils/getErrorFromZod";
import * as api from "@/api/admin"

type Props = {
    refreshAction: (event: Event) => void;
}

export function EventAdd({ refreshAction }: Props) {
    const [titleField, setTitleField] = useState("");
    const [descriptionField, setDescriptionField] = useState("");
    const [groupedField, setGroupedField] = useState(false);
    const [errors, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const eventSchema = z.object({
        titleField: z.string().min(1, "Preencha o título"),
        descriptionField: z.string().min(1, "Preencha a descrição"),
        groupedField: z.boolean()
    });

    async function handleAddButton() {
        setErros([]);
        setLoading(true);
        const data = eventSchema.safeParse({ titleField, descriptionField, groupedField });
        if (!data.success) return setErros(getErrorForZod(data.error));

        const eventItem = await api.addEvent({
            title: data.data.titleField,
            description: data.data.titleField,
            grouped: data.data.groupedField
        });
        setLoading(false);
        if (eventItem) refreshAction(eventItem);
    }

    return (
        <div>
            <div className="mb-5">
                <label htmlFor="">Título</label>
                <InputField
                    value={titleField}
                    onChange={e => setTitleField(e.target.value)}
                    placeholder="Digite o título do evento"
                    errorMessage={errors.find(item => item.field === 'titleField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="">Descrição</label>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescriptionField(e.target.value)}
                    placeholder="Digite a descrição do evento"
                    errorMessage={errors.find(item => item.field === 'descriptionField')?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="">Agrupar sorteio?</label>
                <input
                    type="checkbox"
                    checked={groupedField}
                    onChange={e => setGroupedField(!groupedField)}
                    className="block w-5 h-5 mt-3"
                    disabled={loading}
                />
            </div>
            <div>
                <Button
                    value={loading ? "Adicionando..." : "Adicionar"}
                    onClick={handleAddButton}
                    disabled={loading}
                />
            </div>
        </div>
    )
}