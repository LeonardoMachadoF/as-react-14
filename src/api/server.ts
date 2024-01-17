import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { req } from "./axios";
import { Event } from "@/types/Event";

export async function pingAdmin() {
    try {
        const token = getCookie("token", { cookies });
        await req.get("/admin/ping", { headers: { 'Authorization': `Token ${token}` } });

        return true;
    } catch (err) {
        return false;
    }
}

export async function getEvents() {
    const token = getCookie('token', { cookies });
    const json = await req.get("/admin/events", {
        headers: { "Authorization": `Token ${token}` }
    });
    return json.data.events as Event[] ?? [];
}