import Link from "next/link";
import { IconType } from "react-icons";
import { FaLink, FaPlus, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

type Props = {
    icon: "plus" | "edit" | "remove" | "link";
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    replace?: boolean;
}

export function ItemButton({ icon, href, label, onClick, replace, target }: Props) {
    const icons = {
        plus: <FaPlus />,
        edit: <FaRegEdit />,
        remove: <FaRegTrashAlt />,
        link: <FaLink />
    }

    const content = (
        <div className="p-3 flex flex-col justify-center items-center gap-2 md:flex-row">
            <div>{icons[icon]}</div>
            {label && <div>{label}</div>}
        </div>
    )

    return (
        <div
            className="rounded hover:bg-gray-800"
        >
            {href && !onClick &&
                <Link href={href} target={target} replace={replace}>{content}</Link>
            }
            {!href && onClick &&
                <div onClick={onClick} className="cursor-pointer">{content}</div>
            }
        </div>
    );
}