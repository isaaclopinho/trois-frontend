export interface Order {
    id: number;
    codTransacao: string;
    url: string;
    valorTransacao: number;
    dataTransacao: Date;
    dataStatus: Date;
    userId: number;
    status: string;
}