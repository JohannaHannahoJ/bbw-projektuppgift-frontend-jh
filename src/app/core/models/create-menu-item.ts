export interface CreateMenuItem {
    name: string;
    price: number;
    description?: string;
    is_offer?: boolean;
    is_available?: boolean;
    category_id: number;
}
