import { format, parseISO } from "date-fns";
import React from "react";
import CompanyTags from "../../app/common/tags/CompanyTag";
import OrderStatusTags from "../../app/common/tags/OrderStatusTag";
import { Order } from "../../app/model/OrderAggregate/Order";
import './OrderCardBuyer.css';

interface Props {
    myOrder: Order;
}

export default function OrderCardBuyer({ myOrder }: Props) {
    return (
        <div>
            <OrderStatusTags order={myOrder} />
            <CompanyTags company={myOrder.company} />
            <div className="my-buyer-order" key={myOrder.id}>
                <div className="my-buyer-order-section">
                    {/* <h1>{format(parseISO(myOrder.startTime.toString()), "dd MMM yyyy")}</h1> */}
                    <h2>{myOrder.company.companyName}</h2>
                    <p>Service schedule: {myOrder.serviceSchedule}</p>
                    <p>Note: {myOrder.note}</p>
                </div>
                <div className="my-buyer-order-section">
                    <h2>Payments</h2>
                    <div>
                        <p className="buyer-payments-title">Initial Quote:</p>
                        {myOrder.invoices[0]?.total
                            ? (myOrder.invoices[0]!.total)
                            : (<p>{myOrder.company.companyName} will contact you shortly to provide a quote.</p>)}
                        <hr className="buyer-order-divider" />
                    </div>
                    <div>
                        <p className="buyer-payments-title">Holding Deposit:</p>
                        {myOrder.invoices[1]?.total
                            ? (myOrder.invoices[1]!.total)
                            : (<p>The deposit will be calculated as 50% of the initial quote price.</p>)}
                        <hr className="buyer-order-divider" />
                    </div>
                    <div>
                        <p className="buyer-payments-title">Final Price:</p>
                        {myOrder.invoices[2]?.total
                            ? (myOrder.invoices[2]!.total)
                            : (<p>The final price will be calculated after the job has been done.</p>)}
                    </div>
                </div>
                <div className="my-buyer-order-section">

                    <h2>{myOrder.buyerName}</h2>
                    <p>Phone: {myOrder.buyerPhone}</p>
                    <p>Email: {myOrder.buyerEmail}</p>
                    <p>Order placed on: {format(parseISO(myOrder.orderDate.toString()), "dd MMM yyyy")}</p>
                    <hr className="buyer-order-divider" />
                    {myOrder.serviceCategory === 0 &&
                        <div>
                            <b>Moving From: </b>
                            <p>{myOrder.orderAddresses[0].streetName}, {myOrder.orderAddresses[0].townOrCity}, {myOrder.orderAddresses[0].postalCode}</p>
                            <b>Moving To: </b>
                            <p>{myOrder.orderAddresses[1]?.streetName}, {myOrder.orderAddresses[1]?.townOrCity}, {myOrder.orderAddresses[1]?.postalCode}</p>
                        </div>
                    }
                    {myOrder.serviceCategory > 0 &&
                        <div>
                            <b>Address to be serviced: </b>
                            <p>{myOrder.orderAddresses[0].streetName}, {myOrder.orderAddresses[0].townOrCity}, {myOrder.orderAddresses[0].postalCode}</p>
                        </div>
                    }
                    <hr className="buyer-order-divider" />
                    <p>{myOrder.buyerMessage}</p>
                </div>
            </div>
        </div>

    );
}