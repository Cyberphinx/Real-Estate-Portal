import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Listing } from "../../app/model/ListingAggregate/Listing";
import { ListingMediaDto } from "../../app/model/ListingAggregate/ListingObjects";
import { useStore } from "../../app/stores/store";
import ListingItem from "./ListingItem";
import './ListingPaging.css';

interface Props {
    clusters: any;
    supercluster: any;
}

export default observer(function ListingPaging({ clusters }: Props) {
    const { listingStore, featureStore, companyStore } = useStore();
    const { predicate, listings, selectListing, contacts, setContacts,
        cancelSelectListing, selectedListing, combinedListing, setImage,
        selectListingForImage, cancelSelectListingForImage } = listingStore;
    const { cancelSelectCompany } = companyStore;
    const { isLocked } = featureStore;

    // Set page limits
    const pageNumberLimit = 5;
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(20);

    useEffect(() => {
        if (!isLocked) {
            if (currentPage !== 1) setCurrentPage(1);
        };
    }, [clusters])

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = isLocked === true ? listings.slice(indexOfFirstPost, indexOfLastPost) : combinedListing.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(isLocked === true ? (listings.length / postsPerPage) : (combinedListing.length / postsPerPage)); i++) {
        pageNumbers.push(i);
    }

    // Handle previous
    const onPrevClick = () => {
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev => prev - 1);
    }

    // Handle next
    const onNextClick = () => {
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev => prev + 1);
    }


    const pagers = pageNumbers.map(pageNumber => {
        if (pageNumber <= maxPageLimit && pageNumber > minPageLimit) {
            return (
                <div key={pageNumber} className='page-item'>
                    <button key={pageNumber} onClick={() => paginate(pageNumber)}
                        className={currentPage === pageNumber ? 'selected-page-button' : 'page-button'}>
                        {pageNumber}
                    </button>
                </div>
            );
        } else {
            return null;
        }
    });

    // page ellipses
    let pageIncrementEllipses = null;
    if (pageNumbers.length > maxPageLimit) {
        pageIncrementEllipses = <button className='page-elipse-button' onClick={onNextClick}>&hellip;</button>
    }
    let pageDecremenEllipses = null;
    if (minPageLimit >= 1) {
        pageDecremenEllipses = <button className='page-elipse-button' onClick={onPrevClick}>&hellip;</button>
    }

    return (
        <div>
            <section className='list-container'>
                {isLocked === true ?
                    (
                        currentPosts.map((listing: Listing) => (
                            <div
                                style={{ cursor: "pointer" }}
                                key={listing.id}
                                onClick={() => {
                                    cancelSelectCompany();
                                    if (selectedListing?.id !== listing.id) {
                                        let mainImage = listing.listingMedia.find(x => x.isMain === true);
                                        let initialImage = mainImage ? mainImage 
                                        : listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'))[0];
                                        setImage(initialImage);
                                        selectListingForImage(listing.id);
                                        selectListing(listing.id);
                                    } else {
                                        cancelSelectListingForImage();
                                        cancelSelectListing();
                                    }
                                    if (contacts === true) setContacts(false);
                                }}
                            >
                                <ListingItem listing={listing} predicate={predicate} />
                            </div>
                        ))
                    ) : (
                        currentPosts.map((item: any) => (
                            <div
                                style={{ cursor: "pointer" }}
                                key={item.properties.listing.id}
                                onClick={() => {
                                    cancelSelectCompany();
                                    if (selectedListing?.id !== item.properties.listing.id) {

                                        let mainImage = item.properties.listing.listingMedia.find((x: ListingMediaDto) => x.isMain === true);
                                        let initialImage = mainImage ? mainImage 
                                        : item.properties.listing.listingMedia.filter((x: ListingMediaDto) => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'))[0];
                                        setImage(initialImage)

                                        selectListingForImage(item.properties.listing.id);

                                        selectListing(item.properties.listing.id);
                                    } else {
                                        cancelSelectListingForImage();
                                        cancelSelectListing();
                                    }
                                    if (contacts === true) setContacts(false);
                                }}
                            >
                                <ListingItem listing={item.properties.listing} predicate={predicate} />
                            </div>
                        ))
                    )
                }
            </section>
            <nav className="clientside-pagination-container">
                <div className='clientside-pagination'>
                    <div className='page-item'>
                        <button className='page-arrow-button' onClick={onPrevClick} disabled={currentPage === pageNumbers[0]}>
                            &#60;
                        </button>
                    </div>

                    <section className='clientside-pagers'>
                        <div className='page-item'>{pageDecremenEllipses}</div>
                        {pagers}
                        <div className='page-item'>{pageIncrementEllipses}</div>
                    </section>

                    <div className='page-item'>
                        <button className='page-arrow-button' onClick={onNextClick} disabled={currentPage === pageNumbers[pageNumbers.length - 1]} >
                            &#62;
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
})