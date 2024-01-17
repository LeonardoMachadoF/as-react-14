import * as api from "@/api/server";

import AdminPage from "@/components/admin/AdminPage";
import { Event } from "@/types/Event";
import { redirect } from "next/navigation";

async function Page() {
    const logged = await api.pingAdmin();
    if (!logged) return redirect("/admin/login");

    const events = await api.getEvents();

    return <AdminPage events={events} />
}

export default Page;