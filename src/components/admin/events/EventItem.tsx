import { Event } from "@/types/Event";

export function EventItemPlaceholder() {
    return (
        <div className="w-full h-16 border border-gray-700 rounded mb-3 bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse"></div>
    );
}

export function EventItemNotFound() {
    return (
        <div className="text-center py-4 text-gray-500">Não há eventos cadastrados</div>
    );
}

type Props = {
    event: Event;
}

export function EventItem({ event }: Props) {
    return (
        <div></div>
    );
}