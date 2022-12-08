import { runInAction } from "mobx";
import agent from "../api/agent";
import { Order, OrderFormValues } from "../model/OrderAggregate/Order";
import { store } from "./store";

export default class OrderStore {
  orderRegistry = new Map<string, Order>();
  selectedOrder: Order | undefined = undefined;
  myOrdersAsBuyer: Order[] = [];
  myOrdersAsSeller: Order[] = [];
  orderEditMode: boolean = false;
  invoiceEditMode: boolean = false;

  private setOrder = (order: Order) => {
    this.orderRegistry.set(order.id, order);
  };

  private end = (date: any) => {
    var info = new Date(date);
    info.setHours(info.getHours() + 23)
    return info;
  }

  createOrder = async (orderDetails: OrderFormValues) => {
    try {
      orderDetails.startTime = store.calendarStore.date;
      orderDetails.endTime = this.end(store.calendarStore.date);
      await agent.Orders.create(orderDetails);
      const newOrder = new Order(orderDetails);
      this.setOrder(newOrder);
      runInAction(() => {
        this.selectedOrder = newOrder;
      });
    } catch (error) {
      throw error;
    }
  }

  updateOrder = async (orderDetails: OrderFormValues) => {
    try {
      await agent.Orders.update(orderDetails);
      const updatedOrder = new Order(orderDetails);
      this.setOrder(updatedOrder);
      runInAction(() => {
        this.selectedOrder = updatedOrder;
        this.orderEditMode = false;
      })
    } catch (error) {
      throw error;
    }
  }

  loadMyOrdersAsBuyer = async () => {
    try {
      const myOrders = await agent.Orders.listMyOrdersAsBuyer();
      runInAction(() => {
        this.myOrdersAsBuyer = myOrders;
      })
    } catch (error) {
      console.log(error);
    }
  }

  loadMyOrdersAsSeller = async () => {
    try {
      const myOrders = await agent.Orders.listMyOrdersAsSeller();
      runInAction(() => {
        this.myOrdersAsSeller = myOrders;
      })
    } catch (error) {
      console.log(error);
    }
  }

  

}