import { isWithinInterval } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import Calendar, { CalendarTileProperties } from 'react-calendar';
import { Availability } from "../model/Availability";
import { Company } from "../model/CompanyAggregate/Company";
import { useStore } from "../stores/store";
import "./CalendarCore.css"
// import 'react-calendar/dist/Calendar.css';

interface Props {
    company: Company | undefined;
    // myOrdersAsBuyer?: any;
    // myOrdersAsSeller?: any;
}

export default observer(function CalendarCore({ company }: Props) {
    const { calendarStore, orderStore, userStore } = useStore();
    const { date, setDate, range } = calendarStore;
    const { myOrdersAsBuyer } = orderStore;
    const { isLoggedIn, user } = userStore;

    // useEffect(() => {
    //     if (isLoggedIn && user?.role.includes("Customer")) loadMyOrdersAsBuyer();
    // }, [loadMyOrdersAsBuyer])

    const disabledRanges: Date[][] = []
    const orderRangesAsBuyer: Date[][] = []
    const orderRangesAsSeller: Date[][] = []

    company?.availabilities.map((item: Availability) => {
        disabledRanges.push([new Date(item.startTime), new Date(item.endTime)]);
        return null;
    });

    myOrdersAsBuyer?.map((item: any) => {
        orderRangesAsBuyer.push([new Date(item.startTime), new Date(item.endTime)]);
        return null;
    });

    company?.orders.map((item: any) => {
        orderRangesAsSeller.push([new Date(item.startTime), new Date(item.endTime)]);
        return null;
    });


    function isWithinRange(date: any, range: any) {
        return isWithinInterval(date, { start: range[0], end: range[1] });
    }

    const isWithinRanges = (date: any, ranges: any) => {
        return ranges.some((range: any) => isWithinRange(date, range));
    }

    const tileDisabled = ({ date, view }: CalendarTileProperties): boolean => {
        if (view === 'month') {
            return isWithinRanges(date, disabledRanges);
        }
        return true;
    }

    const order: JSX.Element | null = <div><p className="order">Job</p></div>;
    const unavailable: JSX.Element | null = <div><p className="disabled">Unavailable</p></div>;
    const full: JSX.Element | null = <div><p className="full">Fully Booked</p></div>;
    const myOrder: JSX.Element | null = <div><p className="myOrder">My Order</p></div>;

    const tileContent = (({ date, view }: CalendarTileProperties) => {
        if (view === 'month') {
            if (isWithinRanges(date, orderRangesAsSeller)) {
                if (isWithinRanges(date, orderRangesAsBuyer) && date > new Date()) {
                    return myOrder;
                }
                if (!isLoggedIn || !user?.role.includes("Company")) {
                    return full;
                }
                return order;
            }
            else if (isWithinRanges(date, disabledRanges) && date > new Date()) {
                return unavailable;
            }
        }
        return null;
    })

    return (
        <div>
            <Calendar
                view="month"
                onChange={setDate}
                value={date}
                selectRange={range}
                tileDisabled={tileDisabled}
                tileContent={tileContent}
                minDate={new Date()}
                minDetail="month"
                maxDetail="month"
                showNavigation={true}
            />
        </div>
    );
});