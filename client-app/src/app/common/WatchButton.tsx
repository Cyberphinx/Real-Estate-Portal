import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import LoginForm from "../../features/users/LoginForm";
import { Listing } from "../model/ListingAggregate/Listing";
import { WatcherListingDto } from "../model/Profile";
import { useStore } from "../stores/store";
import './WatchButton.css';

interface Props {
    listing: Listing | WatcherListingDto | undefined;
}

export default observer(function WatchButton({ listing }: Props) {
    const { listingStore, profileStore, userStore, modalStore } = useStore();
    const { watchListing  } = listingStore;
    const { userListings } = profileStore;
    const { isLoggedIn } = userStore;
    const { openModal } = modalStore;


    const watchIcon = <img className="watch-icon" src="/assets/heart_white.svg" alt="Watch" />;
    const unwatchIcon = <img className="unwatch-icon" src="/assets/heart_white.svg" alt="Watch" />;

    const [img, setImg] = useState<boolean>(true)

    function toggleWatchButton(event: SyntheticEvent) {
        event.stopPropagation();
        watchListing(listing!.id);
        setImg(!img);
    }
    function loginPrompt(event: SyntheticEvent) {
        event.stopPropagation();
        openModal(<LoginForm />);
    }

    return (
        <div style={{ position: "relative" }}>
            <button className="watch-button" onClick={(e) => {isLoggedIn ? toggleWatchButton(e) : loginPrompt(e)}}>
                {isLoggedIn
                    ? userListings.find(x => x.id === listing!.id) ? (img ? unwatchIcon : watchIcon) : (img ? watchIcon : unwatchIcon)
                    : watchIcon
                }
            </button>
        </div>
    );
})