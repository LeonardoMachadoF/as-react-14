import { Event } from "@/types/Event"
import { ErrorItem, getErrorForZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import { z } from "zod";
import * as api from "@/api/admin"
import { useRouter } from "next/navigation";

type Props = {
    event: Event;
    refreshAction: () => void;
}

export function EventTabInfo({ event, refreshAction }: Props) {
    const router = useRouter();

    const [titleField, setTitleField] = useState(event.title);
    const [descriptionField, setDescriptionField] = useState(event.description);
    const [groupedField, setGroupedField] = useState(event.grouped);
    const [statusField, setStatusField] = useState(event.status);
    const [errors, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const eventSchema = z.object({
        titleField: z.string().min(1, "Preencha o título"),
        descriptionField: z.string().min(1, "Preencha a descrição"),
        groupedField: z.boolean(),
        statusField: z.boolean()
    });

    useEffect(() => {
        setErros([]);
        const data = eventSchema.safeParse({ titleField, descriptionField, groupedField, statusField });
        if (!data.success) setErros(getErrorForZod(data.error));
    }, [titleField, descriptionField, groupedField, statusField])

    async function handleSaveButton() {
        if (errors.length > 0) return;
        setLoading(true);
        const updateEvent = await api.updateEvent({
            id: event.id,
            data: {
                title: titleField,
                description: descriptionField,
                grouped: groupedField,
                status: statusField
            }
        })
        setLoading(false);
        if (updateEvent) {
            refreshAction();
            location.reload();
        } else {
            alert("Não foi possivel sortear com esses grupos/pessoas")
        }
    }

    return (
        <div className="my-3">
            <div className="mb-5">
                <div>Titulo</div>
                <InputField
                    value={titleField}
                    onChange={e => setTitleField(e.target.value)}
                    placeholder="Digite o titulo do evento"
                    errorMessage={errors.find(erro => erro.field === "titleField")?.message}
                    disabled={loading}
                />
            </div>
            <div className="mb-5">
                <div>Descrição</div>
                <InputField
                    value={descriptionField}
                    onChange={e => setDescriptionField(e.target.value)}
                    placeholder="Digite a descrição do evento"
                    errorMessage={errors.find(erro => erro.field === "descriptionField")?.message}
                    disabled={loading}
                />
            </div>
            <div className="flex mb-5">
                <div className="flex-1">
                    <label htmlFor="">Agrupar sorteio?</label>
                    <input
                        type="checkbox"
                        checked={groupedField}
                        onChange={e => setGroupedField(!groupedField)}
                        disabled={loading}
                        className="block w-5 h-4 mt-3"
                    />
                </div>
                <div className="flex-1">
                    <label htmlFor="">Evento liberado?</label>
                    <input
                        type="checkbox"
                        checked={statusField}
                        onChange={e => setStatusField(!statusField)}
                        disabled={loading}
                        className="block w-5 h-4 mt-3"
                    />
                </div>
            </div>
            <div>
                <Button value="Salvar" onClick={handleSaveButton} disabled={loading} />
            </div>
        </div>
    )
}