import * as api from "@/api/server";
import { redirect } from "next/navigation";

async function Page() {
    const logged = await api.pingAdmin();

    if (!logged) return redirect("/admin/login");
    return (
        <div>PAINEL ADMIN</div>
    )
}

export default Page;