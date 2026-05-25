export interface MenuItem {
    id?: number;
    name: string;
    price: number;
    description?: string;
    is_available?: boolean;
    is_offer?: boolean;
    category_id: number;
}
