interface Props {
    params: {
        id: string;
    }
}

const PageEvent = ({ params }: Props) => {
    return (
        <div>
            ID DO EVENTO: {params.id}
        </div>
    )
}

export default PageEvent;