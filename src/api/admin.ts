import { getCookie } from "cookies-next";
import { req } from "./axios"
import { Event } from "@/types/Event";
import { Group } from "@/types/Group";
import { PersonComplete } from "@/types/PersonComplete";

async function apiRequest(url: string, method: string, data?: any) {
    const token = getCookie("token");
    const headers = { "Authorization": `Token ${token}` };

    try {
        const json = await req.request({
            url,
            method,
            data,
            headers,
        });

        return json;
    } catch (error) {
        console.log(error);
        alert("Ocorreu algum erro");
    }
}


export async function login(password: string) {
    try {
        const json = await req.post("/admin/login", { password });
        return json.data.token as string ?? false;
    } catch (err) { return false; }
}

export async function deleteEvent(id: number) {
    const json = await apiRequest(`/admin/events/${id}`, 'delete');
    return !json.data.error;
}

type AddEventData = {
    title: string;
    description: string;
    grouped: boolean;
}
export async function addEvent(data: AddEventData): Promise<Event | false> {
    const json = await apiRequest(`/admin/events`, 'post', data);
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
    const json = await apiRequest(`/admin/events/${id}`, 'put', data);
    return json.data.event as Event ?? false;
}

export async function getGroups(eventId: number) {
    const json = await apiRequest(`/admin/events/${eventId}/groups`, 'get');
    return json.data.groups as Group[] ?? [];
}


type AddGroupData = {
    eventId: number;
    name: string;
}
export async function addGroup({ eventId, name }: AddGroupData) {
    const json = await apiRequest(`/admin/events/${eventId}/groups`, 'post', { name });
    return json.data.group as Group ?? false;
}


type UpdateGroupData = {
    eventId: number;
    id: number;
    name: string;
}
export async function updateGroup({ eventId, id, name }: UpdateGroupData) {
    const json = await apiRequest(`/admin/events/${eventId}/groups/${id}`, 'put', { name });
    return json.data.group as Group ?? false;
}

export async function deleteGroup(eventId: number, id: number) {
    const json = await apiRequest(`/admin/events/${eventId}/groups/${id}`, 'delete');
    return !json.data.error;
}

type GetPeopleType = {
    eventId: number;
    groupId: number;
}
export async function getPeople({ eventId, groupId }: GetPeopleType) {
    const json = await apiRequest(`/admin/events/${eventId}/groups/${groupId}/people`, 'get');
    return json.data.people as PersonComplete[] ?? [];
}

type AddPersonData = {
    eventId: number;
    groupId: number;
    name: string;
    cpf: string;
}
export async function addPerson({ cpf, eventId, groupId, name }: AddPersonData) {
    const json = await apiRequest(`/admin/events/${eventId}/groups/${groupId}/people`, 'post', { name, cpf });
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
    const json = await apiRequest(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, 'put', { cpf, name });
    return json.data.person as PersonComplete ?? false;
}

type DeletePersonData = {
    eventId: number;
    groupId: number;
    id: number;
}
export async function deletePerson({ eventId, groupId, id }: DeletePersonData) {
    const json = await apiRequest(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, 'delete');
    return !json.data.error;
}