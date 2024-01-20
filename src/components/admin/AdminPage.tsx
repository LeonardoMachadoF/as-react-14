"use client";
import { Event } from "@/types/Event";
import { EventItem, EventItemNotFound } from "./events/EventItem";
import { ItemButton } from "./ItemButton";
import { useState } from "react";
import { ModalScreens } from "@/types/ModalSceens";
import { Modal } from "./Modal";
import { EventAdd } from "./events/EventAdd";
import { EventEdit } from "./events/EventEdit";
import { useRouter } from "next/navigation";

type Props = { events: Event[] }

function AdminPage({ events }: Props) {
    const [eventsFiltered, setEventsFiltereds] = useState(events);
    const [modalScreen, setModalScreen] = useState<ModalScreens>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event>();

    const handleDeleteAction = (id: number) => {
        let newEventsList = eventsFiltered.filter(e => e.id !== id);
        setEventsFiltereds(newEventsList);
    }

    const handleAddAction = (event: Event) => {
        setEventsFiltereds(itens => [...itens, event]);
        setModalScreen(null);
    }

    function editEvent(event: Event) {
        setSelectedEvent(event);
        setModalScreen('edit');
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
                        <EventItem key={event.id} event={event} openModal={event => editEvent(event)} refreshAction={handleDeleteAction} />
                    ))
                    : <EventItemNotFound />
                }
            </div>

            {modalScreen &&
                <Modal onClose={() => setModalScreen(null)}>
                    {modalScreen === 'add' && <EventAdd refreshAction={handleAddAction} />}
                    {modalScreen === 'edit' && <EventEdit event={selectedEvent} refreshAction={() => { }} />}
                </Modal>
            }
        </div>
    )
}

export default AdminPage;