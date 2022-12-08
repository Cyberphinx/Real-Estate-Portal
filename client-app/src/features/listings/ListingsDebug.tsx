import { observer } from "mobx-react-lite";
import React from "react";
import { Listing } from "../../app/model/ListingAggregate/Listing";
import { useStore } from "../../app/stores/store";
import './ListingsDebug.css';

export default observer(function ListingsDebug() {
    const {listingStore} = useStore();
    const {listings} = listingStore;

    return (
        <div>
            <table>
                <tr>
                    <th>Index</th>
                    <th>Id</th>
                    <th>Ref</th>
                    <th>Price</th>
                </tr>
                {listings.map((listing: Listing, index: number) => (
                    <tr key={listing.id}>
                        <th>{index + 1}</th>
                        <th>{listing.id}</th>
                        <th>{listing.listingReference}</th>
                        <th>{listing.pricing.price}</th>
                    </tr>
                ))}
            </table>
        </div>
    )
})