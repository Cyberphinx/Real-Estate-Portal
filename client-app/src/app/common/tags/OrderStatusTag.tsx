import { format, parseISO } from "date-fns";
import React from "react";
import { Order } from "../../model/OrderAggregate/Order";
import { OrderStatus } from "../../model/OrderAggregate/OrderStatus";
import './OrderStatusTag.css';

interface Props {
    order: Order | null;
}

export default function OrderStatusTag({ order }: Props) {
    const tagStyle = (order: Order) => {
        switch (order.orderStatus) {
            case 0:
                return "order-tag processing"
            case 1:
                return "order-tag completed"
            case 2:
                return "order-tag cancelled"
            case 3:
                return "order-tag failed"
            case 4:
                return "order-tag expired"
            case 5:
                return "order-tag onhold"
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <span className={tagStyle(order!)} >
                {format(parseISO(order!.startTime.toString()), "dd MMM yyyy")} | {OrderStatus[order!.orderStatus]}
            </span>
        </div>

    );
}