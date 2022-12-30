import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Listing } from "../../../app/model/ListingAggregate/Listing";
import { WatcherListingDto } from "../../../app/model/Profile";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import './Watch.css';

interface Props {
    listing: Listing | WatcherListingDto | undefined;
}

export default observer(function Watch({ listing }: Props) {
    const { listingStore, profileStore, userStore, modalStore } = useStore();
    const { watchListing  } = listingStore;
    const { userListings } = profileStore;
    const { isLoggedIn } = userStore;
    const { openModal } = modalStore;


    const watchIcon = <img className="watch-icon-toolbar" src="/assets/heart_white.svg" alt="Watch" />;
    const unwatchIcon = <img className="unwatch-icon-toolbar" src="/assets/heart_grey.svg" alt="Watch" />;

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
            <button className="watch-button-toolbar" onClick={(e) => {isLoggedIn ? toggleWatchButton(e) : loginPrompt(e)}}>
                {isLoggedIn
                    ? userListings.find(x => x.id === listing!.id) ? (img ? unwatchIcon : watchIcon) : (img ? watchIcon : unwatchIcon)
                    : watchIcon
                }
            </button>
        </div>
    );
})