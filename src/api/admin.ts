import { getCookie } from "cookies-next";
import { req } from "./axios"
import { Event } from "@/types/Event";
import { Group } from "@/types/Group";
import { PersonComplete } from "@/types/PersonComplete";

export async function login(password: string) {
    try {
        const json = await req.post("/admin/login", { password });
        return json.data.token as string ?? false;
    } catch (err) { return false; }
}

export async function deleteEvent(id: number) {
    const token = getCookie("token");
    const json = await req.delete(`/admin/events/${id}`, {
        headers: { "Authorization": `Token ${token}` }
    });

    return !json.data.error;
}

type AddEventData = {
    title: string;
    description: string;
    grouped: boolean;
}
export async function addEvent(data: AddEventData): Promise<Event | false> {
    const token = getCookie("token");
    const json = await req.post(`/admin/events`, data, {
        headers: { "Authorization": `Token ${token}` }
    })
    return json.data.event as Event ?? false;
}

type UpdateEventData = {
    id: number,
    data: {
        title?: string;
        description?: string;
        grouped?: boolean;
        status?: boolean;
    }
}
export async function updateEvent({ id, data }: UpdateEventData): Promise<Event | false> {
    const token = getCookie("token");
    const json = await req.put(`/admin/events/${id}`, data, {
        headers: { "Authorization": `Token ${token}` }
    })
    return json.data.event as Event ?? false;
}

export async function getGroups(eventId: number) {
    const token = getCookie("token");
    const json = await req.get(`/admin/events/${eventId}/groups`, {
        headers: { "Authorization": `Token ${token}` }
    });

    return json.data.groups as Group[] ?? [];
}


type AddGroupData = {
    eventId: number;
    name: string;
}
export async function addGroup({ eventId, name }: AddGroupData) {
    const token = getCookie("token");
    const json = await req.post(`/admin/events/${eventId}/groups`, { name }, {
        headers: { "Authorization": `Token ${token}` }
    });

    return json.data.group as Group ?? false;
}


type UpdateGroupData = {
    eventId: number;
    id: number;
    name: string;
}
export async function updateGroup({ eventId, id, name }: UpdateGroupData) {
    const token = getCookie("token");
    const json = await req.put(`/admin/events/${eventId}/groups/${id}`, { name }, {
        headers: { "Authorization": `Token ${token}` }
    });

    return json.data.group as Group ?? false;
}

export async function deleteGroup(eventId: number, id: number) {
    const token = getCookie("token");
    const json = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
        headers: { "Authorization": `Token ${token}` }
    });

    return !json.data.error;
}

type GetPeopleType = {
    eventId: number;
    groupId: number;
}
export async function getPeople({ eventId, groupId }: GetPeopleType) {
    const token = getCookie("token");
    const json = await req.get(`/admin/events/${eventId}/groups/${groupId}/people`, {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.people as PersonComplete[] ?? [];
}

type AddPersonData = {
    eventId: number;
    groupId: number;
    name: string;
    cpf: string;
}
export async function addPerson({ cpf, eventId, groupId, name }: AddPersonData) {
    const token = getCookie("token");
    const json = await req.post(`/admin/events/${eventId}/groups/${groupId}/people`, { name, cpf }, {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.person as PersonComplete ?? false;
}

type UpdatePersonData = {
    eventId: number;
    groupId: number;
    id: number;
    name?: string;
    cpf?: string;
}
export async function updatePerson({ eventId, groupId, id, cpf, name }: UpdatePersonData) {
    const token = getCookie("token");
    const json = await req.put(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, { cpf, name }, {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.person as PersonComplete ?? false;
}

type DeletePersonData = {
    eventId: number;
    groupId: number;
    id: number;
}
export async function deletePerson({ eventId, groupId, id }: DeletePersonData) {
    const token = getCookie("token");
    const json = await req.delete(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, {
        headers: { "Authorization": `Token ${token}` }
    });

    return !json.data.error;
}