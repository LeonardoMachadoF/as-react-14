import { Person } from "./Person";

export interface PersonComplete extends Person {
    cpf: string;
    id_event: number;
    id_group: number;
}