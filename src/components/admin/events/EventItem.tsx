import { Event } from "@/types/Event";
import { ItemButton } from "../ItemButton";

export function EventItemPlaceholder() {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    );
}

export function EventItemNotFound() {
    return (
        <div className="text-center py-4 text-gray-500">Não há eventos cadastrados</div>
    );
}

type Props = {
    event: Event;
    refreshAction: () => void;
    openModal: (event: Event) => void;
}

export function EventItem({ event, refreshAction, openModal }: Props) {
    function handleEditButton() {
        return openModal(event);
    }

    function handleDeleteButton() {

    }


    return (
        <div className="border border-gray-700 rounded p-3 mb-3 flex flex-col items-center md:flex-row">
            <div className="flex-1 text-xl md:text-base">{event.title}</div>
            <div className="flex items-center gap-1 mt-2 md:mt-0">
                {event.status &&
                    <div className="border brder-dashed border-white rounded">
                        <ItemButton
                            icon="link"
                            label="Link do Evento"
                            href={`/event/${event.id}`}
                        />
                    </div>
                }
                <ItemButton
                    icon="edit"
                    label="Editar"
                    onClick={handleEditButton}
                />
                <ItemButton
                    icon="remove"
                    label="Excluir"
                    onClick={handleEditButton}
                />
            </div>
        </div>
    );
}