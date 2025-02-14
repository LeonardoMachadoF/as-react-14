type Props = {
    value: string;
    onClick: () => void;
    disabled?: boolean;
}

export function Button({ disabled, onClick, value }: Props) {
    return (
        <button
            onClick={onClick}
            className="w-full my-3 p-3 rounded bg-gray-700 text-center text-white uppercase font-bold hover:bg-gray-600 border-b-4  border-white/10"
            disabled={disabled}
        >
            {value}
        </button>
    )
}