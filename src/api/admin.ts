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
    title?: string;
    description?: string;
    grouped?: boolean;
    status?: boolean;
}
export async function updateEvent(id: number, data: UpdateEventData): Promise<Event | false> {
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
    name: string;
}
export async function addGroup(eventId: number, data: AddGroupData) {
    const token = getCookie("token");
    const json = await req.post(`/admin/events/${eventId}/groups`, data, {
        headers: { "Authorization": `Token ${token}` }
    });

    return json.data.group as Group ?? false;
}


type UpdateGroupData = {
    name: string;
}
export async function updateGroup(eventId: number, id: number, data: UpdateGroupData) {
    const token = getCookie("token");
    const json = await req.put(`/admin/events/${eventId}/groups/${id}`, data, {
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

export async function getPeople(eventId: number, groupId: number) {
    const token = getCookie("token");
    const json = await req.get(`/admin/events/${eventId}/groups/${groupId}/people`, {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.people as PersonComplete[] ?? [];
}

type AddPersonData = {
    name: string;
    cpf: string;
}
export async function addPerson(eventId: number, groupId: number, data: AddPersonData) {
    const token = getCookie("token");
    const json = await req.post(`/admin/events/${eventId}/groups/${groupId}/people`, data, {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.person as PersonComplete ?? false;
}

type UpdatePersonData = {
    name?: string;
    cpf?: string;
}
export async function updatePerson(eventId: number, groupId: number, id: number, data: UpdatePersonData) {
    const token = getCookie("token");
    const json = await req.put(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, data, {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.person as PersonComplete ?? false;
}

export async function deletePerson(eventId: number, groupId: number, id: number) {
    const token = getCookie("token");
    const json = await req.delete(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, {
        headers: { "Authorization": `Token ${token}` }
    });

    return !json.data.error;
}