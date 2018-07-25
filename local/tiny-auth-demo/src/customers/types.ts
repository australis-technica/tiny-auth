export interface Customer {
    id: string;
    displayName: string;
    enabled: boolean,
    contact?: string;
    email: string;
    phone?: string;
    updatedAt: number;
    createdAt: number;
}