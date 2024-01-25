import { PersonComplete } from "@/types/PersonComplete";
import { ItemButton } from "../ItemButton";
import * as api from '@/api/admin'

type Props = {
    item: PersonComplete;
    refreshAction: () => void;
    onEdit: (person: PersonComplete) => void;
}

export function PersonItem({ item, onEdit, refreshAction }: Props) {
    async function handleDeleteButton() {
        if (confirm("tem certeza que deseja excluir essa pessoa?")) {
            await api.deletePerson({ eventId: item.id_event, groupId: item.id_group, id: item.id });
            refreshAction();
        }
    }

    return (
        <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
            <div className="flex-1">{item.name} (CPF: {item.cpf})</div>
            <ItemButton
                icon="edit"
                onClick={() => onEdit(item)}
            />
            <ItemButton
                icon="remove"
                onClick={handleDeleteButton}
            />
        </div>
    )
}

export function PersonItemPlaceholder() {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    );
}

export function PersonItemNotFound() {
    return (
        <div className="text-center py-4 text-gray-500">Não há pessoas neste grupo</div>
    );
}