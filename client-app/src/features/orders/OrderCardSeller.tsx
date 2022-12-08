import { format, parseISO } from "date-fns";
import React from "react";
import InvoiceStatusTags from "../../app/common/tags/InvoiceStatusTag";
import OrderStatusTags from "../../app/common/tags/OrderStatusTag";
import { InvoiceItem } from "../../app/model/OrderAggregate/Invoice";
import { Order } from "../../app/model/OrderAggregate/Order";
import './OrderCardSeller.css';

interface Props {
    myOrder: Order;
}

export default function OrderCardSeller({ myOrder }: Props) {
    return (
        <div>
            <OrderStatusTags order={myOrder} />
            <div className="my-order">
                <div className="my-order-grid">
                    <section className="my-order-section">
                        <h1>{myOrder.buyerName}</h1>
                        <p>Phone: {myOrder.buyerPhone}</p>
                        <p>Email: {myOrder.buyerEmail}</p>
                        <hr className="order-divider" />
                        <p className="seller-content">{myOrder.buyerMessage}</p>
                    </section>
                    <section className="my-order-section">
                        <p className="order-date">Order placed on: {format(parseISO(myOrder.orderDate.toString()), "dd MMM yyyy")}</p>
                        {myOrder.serviceCategory === 0 &&
                            <div style={{ paddingTop: "20px" }}>
                                <b className="seller-title">Moving From: </b>
                                <p className="seller-content">{myOrder.orderAddresses[0].streetName}, {myOrder.orderAddresses[0].townOrCity}, {myOrder.orderAddresses[0].postalCode}</p>
                                <hr className="order-divider" />
                                <b className="seller-title">Moving To: </b>
                                <p className="seller-content">{myOrder.orderAddresses[1]?.streetName}, {myOrder.orderAddresses[1]?.townOrCity}, {myOrder.orderAddresses[1]?.postalCode}</p>
                            </div>}
                        {myOrder.serviceCategory > 0 &&
                            <div>
                                <b className="seller-title">Address to be serviced: </b>
                                <p className="seller-content">{myOrder.orderAddresses[0].streetName}, {myOrder.orderAddresses[0].townOrCity}, {myOrder.orderAddresses[0].postalCode}</p>
                            </div>}
                    </section>
                </div>
                <hr className="order-section-divider" />
                <div className="my-order-grid">
                    <section className="my-order-section">
                        <section>

                            <p className="seller-title">Step 01 - Initial Quote </p>
                            {myOrder.invoices[0]?.total
                                ? (<div>
                                    <table>
                                        <tr>
                                            <th className="invoice-title" >Description</th>
                                            <th className="invoice-title" >Subtotal</th>
                                        </tr>
                                        {myOrder.invoices[0].items?.map((item: InvoiceItem) => (
                                            <tr key={item.id}>
                                                <td className="seller-subtitle">{item.description}</td>
                                                <td className="seller-subtitle">£{item.total}</td>
                                            </tr>
                                        ))}
                                    </table>

                                    <p className="seller-title" style={{textAlign:"right", paddingRight:"20px"}}>Total amount due: £{myOrder.invoices[0].total}</p>
                                    <button className="edit-service-button" >Edit quote</button>
                                    <InvoiceStatusTags invoice={myOrder.invoices[0]} />
                                </div>)
                                : (<div>
                                    <p className="seller-subtitle">(Pro-forma invoice with Terms and Conditions and insurance policy)</p>
                                    <br />
                                    <button className="edit-service-button" >Add quote</button>
                                </div>)}
                        </section>

                        <hr className="order-divider" />
                        <section>
                            <p className="seller-title">Step 02 - Holding Deposit</p>

                            {myOrder.invoices[1]?.total
                                ? (<div>
                                    <p>{myOrder.invoices[1].total}</p>
                                    <button className="edit-service-button" >Edit deposit</button>
                                </div>)
                                : (myOrder.invoices[0]?.total ?
                                    (<div>
                                        <p className="seller-subtitle">(To be paid before job start. Cancellation policy applies)</p>
                                        <br />
                                        <button className="edit-service-button" >Add deposit</button>
                                    </div>)
                                    : (<div>
                                        <p className="seller-subtitle">(To be paid before job start. Cancellation policy applies)</p>
                                        <br />
                                        <button className="edit-service-button" disabled >Add deposit</button>
                                    </div>))}
                        </section>

                        <hr className="order-divider" />
                        <section>
                            <p className="seller-title">Step 03 - Final Price</p>
                            {myOrder.invoices[2]?.total
                                ? (<div>
                                    <p>{myOrder.invoices[2].total}</p>
                                    <button className="edit-service-button" >Edit final price</button>
                                </div>)
                                : (myOrder.invoices[1]?.total ?
                                    (<div>
                                        <p className="seller-subtitle">(To be demanded after job completion. Dispute policy)</p>
                                        <br />
                                        <button className="edit-service-button" >Add final price</button>
                                    </div>)
                                    : (<div>
                                        <p className="seller-subtitle">(To be demanded after job completion. Dispute policy)</p>
                                        <br />
                                        <button className="edit-service-button" disabled >Add final price</button>
                                    </div>))}
                        </section>
                    </section>

                    <section className="my-order-section">
                        <p className="seller-title">Service schedule: </p>
                        <div>{myOrder.serviceSchedule
                            ? (<div>
                                <p>{myOrder.serviceSchedule}</p>
                                <br />
                                <button className="edit-service-button" >Edit service schedule</button>
                            </div>)
                            : (<div>
                                <p className="seller-subtitle">(Brief description of the works, including number of personnel, vehicle, etc.)</p>
                                <br />
                                <button className="edit-service-button" >Add service schedule</button>
                            </div>)}
                        </div>
                        <hr className="order-divider" />
                        <p className="seller-title">Note: </p>
                        <div>
                            {myOrder.note
                                ? (<div>
                                    <p>{myOrder.note}</p>
                                    <br />
                                    <button className="edit-service-button" >Edit note</button>
                                </div>)
                                : (<div>
                                    <p className="seller-subtitle">(Important notice or caveat for the client)</p>
                                    <br />
                                    <button className="edit-service-button" >Add note</button>
                                </div>)}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}