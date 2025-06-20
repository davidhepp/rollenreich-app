// types/order.ts
export interface OrderHistoryItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    collection?: string;
    variation?: string;
    imageSrc?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    createdAt: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    items: OrderHistoryItem[];
    total: number;
}

export interface OrderCardProps {
    order: Order;
    onAddAllToCart: (order: Order) => void;
}
