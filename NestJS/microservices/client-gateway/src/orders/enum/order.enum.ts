export enum OrderStatus {
    'PENDING' = 'PENDING',
    'CANCELLED' = 'CANCELLED',
    'PROCESSING' = 'PROCESSING',
    'DELIVERED' = 'DELIVERED',
}

export const OrderStatusList = [
    OrderStatus.PENDING,
    OrderStatus.CANCELLED,
    OrderStatus.PROCESSING,
    OrderStatus.DELIVERED,
]