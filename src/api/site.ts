import { Event } from "@/types/Event";
import { req } from "./axios";
import { SearchResult } from "@/types/SearchResult";

export const getEventById = async (id: number) => {
    const json = await req.get(`/events/${id}`);
    return json.data.event as Event ?? false;
}

interface GetPerson {
    event_id: number;
    cpf: string;
}

export const searchCPF = async ({ event_id, cpf }: GetPerson): Promise<SearchResult | false> => {
    const json = await req.get(`/events/${event_id}/search?cpf=${cpf}`);

    if (json.data.person && json.data.personMatched) {
        return json.data as SearchResult;
    }
    return false;
}