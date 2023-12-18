import * as api from "@/api/site";
import { Search } from "@/components/site/Search";
import { redirect } from "next/navigation";

interface Props {
    params: {
        id: string;
    }
}

async function PageEvent({ params }: Props) {
    const eventItem = await api.getEventById(parseInt(params.id));
    if (!eventItem || !eventItem.status) return redirect('/');

    return (
        <main className="text-center mx-auto mas-w-lg p-5">
            <header>
                <h2 className="text-2xl text-yellow-400">Amigo Secreto</h2>
                <h1 className="text-3xl mt-5 mb-2">{eventItem.title}</h1>
                <p className="text-sm mb-5">{eventItem.description}</p>
            </header>

            <Search id={eventItem.id} />

            <footer className="mt-5 text-sm">Criado por alguem</footer>
        </main>
    )
}

export default PageEvent;