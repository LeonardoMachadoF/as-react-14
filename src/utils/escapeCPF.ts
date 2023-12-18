export function escapeCPF(cpf: string) {
    return cpf.replace(/\.|-/gm, '');
}