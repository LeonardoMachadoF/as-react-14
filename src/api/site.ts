import { Event } from "@/types/Event";
import { req } from "./axios";

export const getEvent = async (id: number) => {
    const json = await req.get(`/events/${id}`);
    return json.data.event as Event ?? false;
}