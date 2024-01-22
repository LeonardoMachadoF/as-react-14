import { Group } from "@/types/Group";
import { useEffect, useState } from "react";
import * as api from '@/api/admin'
import { GroupItem, GroupItemNotFound, GroupItemPlaceholder } from "./GroupItem";
import { GroupAdd } from "./GroupAdd";
import { GroupEdit } from "./GroupEdit";

type Props = {
    eventId: number
}

export function EventTabGroup({ eventId }: Props) {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    async function loadGroups() {
        setSelectedGroup(null);
        setLoading(true);
        const groupList = await api.getGroups(eventId);
        setLoading(false);
        setGroups(groupList);
    }

    useEffect(() => {
        loadGroups();
    }, [])

    function handleEditButton(group: Group): void {
        setSelectedGroup(group);
    }

    return (
        <div>
            <div className="border border-dashed p-3 my-3">
                {!selectedGroup && <GroupAdd eventId={eventId} refreshAction={loadGroups} />}
                {selectedGroup && <GroupEdit group={selectedGroup} refreshAction={loadGroups} />}
            </div>

            {!loading && groups.length > 0 && groups.map(group => (
                <GroupItem
                    key={group.id}
                    item={group}
                    refreshAction={loadGroups}
                    onEdit={handleEditButton}
                />
            ))}
            {loading &&
                <>
                    <GroupItemPlaceholder />
                    <GroupItemPlaceholder />
                </>
            }
            {!loading && groups.length === 0 && <GroupItemNotFound />}
        </div>
    );
}