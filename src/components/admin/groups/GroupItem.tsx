import { Group } from "@/types/Group";
import { ItemButton } from "../ItemButton";
import * as api from '@/api/admin'


type Props = {
    item: Group;
    refreshAction: () => void;
    onEdit: (group: Group) => void;
}

export function GroupItem({ item, onEdit, refreshAction }: Props) {
    async function handleDeleteButton() {
        if (confirm("Tem certeza que deseja excluir esse grupo?")) {
            await api.deleteGroup(item.id_event, item.id);
            refreshAction();
        }
    }

    return (
        <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
            <div className="flex-1">{item.name}</div>
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

export function GroupItemPlaceholder() {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    );
}

export function GroupItemNotFound() {
    return (
        <div className="text-center py-4 text-gray-500">Não há grupos neste evento</div>
    );
}