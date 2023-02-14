import React from "react";
import './ListingMediaModal.css';
import { ListingMediaDto } from "../../../app/model/ListingAggregate/ListingObjects";
import Close from "../../map/toolbar/Close";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    media: ListingMediaDto;
}

export default observer(function ListingMediaModal({ media }: Props) {
    const { modalStore } = useStore();
    const { closeModal } = modalStore;

    return (
        <div className="listing-media-modal">
            <div className="listing-media-modal__content">
                <div className="listing-media-modal__close" onClick={() => closeModal()}>
                    <p className="listing-media-modal__close-button">&times;</p>
                </div>
                <img src={media.url} alt={media.caption} className="media-image" />
            </div>
        </div>
    );
});