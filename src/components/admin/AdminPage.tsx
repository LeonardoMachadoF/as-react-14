"use client";
import { Event } from "@/types/Event";
import { EventItem, EventItemNotFound } from "./events/EventItem";

type Props = { events: Event[] }

function AdminPage({ events }: Props) {
    return (
        <div>
            <div className="p-3 flex items-center">
                <h1 className="text-2xl flex-1">Eventos</h1>
                <div>...</div>
            </div>

            <div className="my-3">
                {events.length > 0
                    ? events.map(event => (
                        <EventItem key={event.id} event={event} />
                    ))
                    : <EventItemNotFound />
                }
            </div>
        </div>
    )
}

export default AdminPage;