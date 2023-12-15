interface Props {
    params: {
        id: string;
    }
}

const PageEvent = ({ params }: Props) => {
    return (
        <main className="text-center mx-auto mas-w-lg p-5s">
            <header>
                <h2 className="text-2xl text-yellow-400">Amigo Secreto</h2>
                <h1 className="text-3xl mt-5 mb-2">**TITULO**</h1>
                <p className="text-sm mb-5">**Descrição**</p>
            </header>

            <footer className="mt-5 text-sm">Criado por alguem</footer>
        </main>
    )
}

export default PageEvent;