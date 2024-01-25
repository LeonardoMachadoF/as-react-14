import * as api from '@/api/admin'
import { Group } from '@/types/Group'
import { useEffect, useState } from 'react'
import { GroupItemNotFound, GroupItemPlaceholder } from '../groups/GroupItem'
import { PersonComplete } from '@/types/PersonComplete'
import { PersonItem, PersonItemNotFound, PersonItemPlaceholder } from './PersonItem'
import { PersonAdd } from './PersonAdd'
import { PersonEdit } from './PersonEdit'

type Props = {
    eventId: number
}

export const EventTabPeople = ({ eventId }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [groupLoading, setGroupLoading] = useState(true);

    const loadGroups = async () => {
        setSelectedGroupId(0);
        setGroupLoading(true);
        const groupList = await api.getGroups(eventId);
        setGroupLoading(false);
        setGroups(groupList);
    }

    useEffect(() => {
        loadGroups();
    }, [])



    const [people, setPeople] = useState<PersonComplete[]>([]);
    const [selecterdPerson, setSelectedPerson] = useState<PersonComplete>();
    const [peopleLoading, setPeopleLoading] = useState(false);

    async function loadPeople() {
        if (selectedGroupId <= 0) return;
        setSelectedPerson(undefined);
        setPeople([]);
        setPeopleLoading(true);
        const peopleList = await api.getPeople(eventId, selectedGroupId);
        setPeopleLoading(false);
        setPeople(peopleList);
    }
    useEffect(() => {
        loadPeople();
    }, [selectedGroupId])

    function handleEditButton(person: PersonComplete): void {
        setSelectedPerson(person);
    }

    return (
        <div>
            <div className='my-3'>
                {!groupLoading && groups.length > 0 &&
                    <select
                        className="w-full bg-transparent text-white text-xl p-3 outline-none"
                        onChange={e => setSelectedGroupId(parseInt(e.target.value))}
                    >
                        <option value={0}>
                            Selecione um grupo
                        </option>
                        {groups.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                }
                {groupLoading && <GroupItemPlaceholder />}
                {!groupLoading && groups.length === 0 && <GroupItemNotFound />}
            </div>

            {selectedGroupId > 0 &&
                <>
                    <div className='border border-dashed p-3 my-3'>
                        {!selecterdPerson &&
                            <PersonAdd
                                eventId={eventId}
                                groupId={selectedGroupId}
                                refreshAction={loadPeople}
                            />
                        }
                        {selecterdPerson &&
                            <PersonEdit
                                person={selecterdPerson}
                                refreshAction={loadPeople}
                            />
                        }
                    </div>
                    {!peopleLoading && people.length > 0 && people.map(item => (
                        <PersonItem
                            key={item.id}
                            item={item}
                            refreshAction={loadPeople}
                            onEdit={handleEditButton}
                        />
                    ))}
                    {peopleLoading &&
                        <>
                            <PersonItemPlaceholder />
                            <PersonItemPlaceholder />
                        </>
                    }
                    {!peopleLoading && people.length === 0 &&
                        <PersonItemNotFound />
                    }
                </>
            }
        </div>
    )
}