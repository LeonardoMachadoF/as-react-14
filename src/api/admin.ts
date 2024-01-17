import { getCookie } from "cookies-next";
import { req } from "./axios"
import { Event } from "@/types/Event";

export async function login(password: string) {
    try {
        const json = await req.post("/admin/login", { password });
        return json.data.token as string ?? false;
    } catch (err) { return false; }
}

