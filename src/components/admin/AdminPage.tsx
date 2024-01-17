"use client";
import * as api from "@/api/admin";
import { Event } from "@/types/Event";
import { useEffect, useState } from "react";

function AdminPage({ events }: { events: Event[] }) {

    return (
        <div>
            <div className="p-3 flex items-center">
                <h1 className="text-2xl flex-1">Eventos</h1>
                <div>...</div>
            </div>

            <div className="my-3">
                {events.length > 0
                    ? events.map(item => (
                        <div key={item.id}>{item.title}</div>
                    ))
                    : <div>Nenhum evento encontrado...</div>}
            </div>
        </div>
    )
}

export default AdminPage;