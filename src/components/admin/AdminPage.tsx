"use client";
import { Event } from "@/types/Event";
import { EventItem, EventItemNotFound } from "./events/EventItem";
import { ItemButton } from "./ItemButton";
import { useState } from "react";
import { ModalScreens } from "@/types/ModalSceens";
import { Modal } from "./Modal";

type Props = { events: Event[] }

function AdminPage({ events }: Props) {
    const [eventsFiltered, setEventsFiltereds] = useState(events);
    const [modalScreen, setModalScreen] = useState<ModalScreens>(null);

    const handleRefreshAction = (id: number) => {
        let newEventsList = eventsFiltered.filter(e => e.id !== id);
        setEventsFiltereds(newEventsList);
    }

    return (
        <div>
            <div className="p-3 flex items-center">
                <h1 className="text-2xl flex-1">Eventos</h1>
                <ItemButton
                    icon="plus"
                    onClick={() => setModalScreen("add")}
                />
            </div>

            <div className="my-3">
                {eventsFiltered.length > 0
                    ? eventsFiltered.map(event => (
                        <EventItem key={event.id} event={event} openModal={() => { }} refreshAction={handleRefreshAction} />
                    ))
                    : <EventItemNotFound />
                }
            </div>

            {modalScreen &&
                <Modal onClose={() => setModalScreen(null)}>
                    Tipo: {modalScreen}
                </Modal>
            }
        </div>
    )
}

export default AdminPage;