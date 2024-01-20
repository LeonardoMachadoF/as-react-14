import { getCookie } from "cookies-next";
import { req } from "./axios"
import { Event } from "@/types/Event";

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