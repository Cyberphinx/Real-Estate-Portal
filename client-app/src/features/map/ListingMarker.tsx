import React, { useCallback, useEffect, useState } from "react";
import './ListingMarker.css';
import { Marker, useMap, Tooltip } from 'react-leaflet';
import L from "leaflet";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { rentFrequency, rentFrequencyShort } from "../../app/model/ListingAggregate/ListingEnums";
import nFormatter from "../../app/common/nFormatter";
import priceFormatter from "../../app/common/PriceFormatter";
import * as ReactDOMServer from 'react-dom/server';
import { ListingMediaDto } from "../../app/model/ListingAggregate/ListingObjects";
import { PascalToNormal } from "../../app/common/HelperFunctions";

interface Props {
    points: GeoJSON.Feature[];
    clusters: any;
    supercluster: any;
}


export default observer(function ListingMarker({ points, clusters, supercluster }: Props) {
    const { mapStore, listingStore, companyStore } = useStore();
    const { selectListing, contacts, setContacts, cancelSelectListing, selectedListing, predicate,
        selectListingForImage, setImage, cancelSelectListingForImage } = listingStore;
    const { setZoom, activeListing, setBounds } = mapStore;
    const { selectedCompany, cancelSelectCompany } = companyStore;

    // const listingBigImages = listing.listingMedia.filter(x => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'));

    const maxZoom = 20;
    const map = useMap();

    const [imgLoaded, setImgLoaded] = useState<boolean>(false);

    const clusterMarkerActive = (cluster: any) => {
        return supercluster.getLeaves(cluster.id, Infinity, 0).some((x: any) => x.properties.listing.id === activeListing?.id);
    }
    const clusterMarkerSelected = (cluster: any) => {
        return supercluster.getLeaves(cluster.id, Infinity, 0).some((x: any) => x.properties.listing.id === selectedListing?.id);
    }

    const icons: any = {};
    const clusterIcon = (count: number, size: number) => {
        let density = "";
        if (count > 30) density = "cluster-marker low-density";
        if (count > 60) density = "cluster-marker med-density";
        if (count > 90) density = "cluster-marker high-density";

        if (!icons[count]) {
            icons[count] = L.divIcon({
                html: ReactDOMServer.renderToString(
                    <div className={`cluster-marker ${density}`} style={{ width: `${size}px`, height: `${size}px` }}>
                        {count}
                    </div>
                )
            });
        }
        return icons[count];
    };

    const activeClusterIcon = (count: number, size: number) => {
        let density = "";
        if (count > 30) density = "low-density";
        if (count > 60) density = "med-density";
        if (count > 90) density = "high-density";

        const icon = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className={`cluster-marker ${density}`} style={{ width: `${size}px`, height: `${size}px`, color: "#fff", background: "#1F51FF" }}>
                    {count}
                </div>
            )
        });
        return icon;
    };

    const priceIcon = (id: string, price: string, size: number) => {
        const icon = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="point-marker-price" style={{ width: `calc(0.5rem * ${size})`, height: '1rem' }}>
                    {price}
                </div>
            )
        });
        const iconActive = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="point-marker-price-active" style={{ width: `calc(0.5rem * ${size})`, height: '1rem' }}>
                    {price}
                </div>
            )

        });
        const iconSelected = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="point-marker-price-selected" style={{ width: `calc(0.5rem * ${size})`, height: '1rem' }}>
                    {price}
                </div>
            )
        });
        if (activeListing?.id === id) {
            return iconActive;
        }
        if (selectedListing?.id === id) {
            return iconSelected;
        }
        else {
            return icon;
        }
    }

    // update map in response to user moves
    const onMove = useCallback(() => {
        // get map bounds 
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat,
        ]);
        setZoom(map.getZoom());
    }, [map, setZoom, setBounds]);
    
    // load map initially
    useEffect(() => {
        // get map bounds
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat,
        ]);
        setZoom(map.getZoom());
    }, [map, setZoom, setBounds]);

    // load map when it moves
    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    function leavesOverlap(id: any) {
        const leaves = supercluster.getLeaves(id, Infinity, 0);
        const [long0, lat0] = leaves[0].geometry.coordinates;
        const [long1, lat1] = leaves[leaves.length - 1].geometry.coordinates;
        if (long0 === long1 && lat0 === lat1) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div>
            {clusters.map((cluster: any) => {
                // every cluster point has coordinates
                const [longitude, latitude] = cluster.geometry.coordinates;
                // the point may be either a cluster or a single point
                const {
                    cluster: isCluster,
                    point_count: pointCount,
                } = cluster.properties;

                // we have a cluster to render
                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            position={[latitude, longitude]}
                            icon={clusterMarkerActive(cluster) | clusterMarkerSelected(cluster) ?
                                activeClusterIcon(pointCount, 10 + (pointCount / points.length) * 40) :
                                clusterIcon(pointCount, 10 + (pointCount / points.length) * 40)
                            }
                            eventHandlers={{
                                click: () => {
                                    // split points upon click
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        maxZoom
                                    );
                                    map.setView([latitude, longitude], expansionZoom, {
                                        animate: true,
                                    });

                                    if (leavesOverlap(cluster.id)) {
                                        const leaves = supercluster.getLeaves(cluster.id, Infinity, 0);
                                        if (selectedCompany) cancelSelectCompany();
                                        if (selectedListing?.id === leaves[0].properties.listing.id) {
                                            cancelSelectListingForImage();
                                            cancelSelectListing();
                                        } else {
                                            let mainImage = leaves[0].properties.listing.listingMedia.find((x: ListingMediaDto) => x.isMain === true);
                                            let initialImage = mainImage ? mainImage
                                                : leaves[0].properties.listing.listingMedia.filter(
                                                    (x: ListingMediaDto) => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'))[0];
                                            setImage(initialImage);
                                            selectListingForImage(leaves[0].properties.listing.id);
                                            selectListing(leaves[0].properties.listing.id);
                                        }
                                        if (contacts === true) setContacts(false);
                                    }
                                },
                            }}
                        >
                            {leavesOverlap(cluster.id) &&
                                <Tooltip direction="top" offset={[14, -8]}>
                                    <div className="snippets-container" style={{ gridTemplateColumns: `repeat(${supercluster.getLeaves(cluster.id, Infinity, 0).length}, 1fr)` }}>
                                        {supercluster.getLeaves(cluster.id, Infinity, 0).map((item: any) => (
                                            <div key={item.properties.listing.id} className="snippet-container">
                                                <img className="tiny-snippet"
                                                    src={item.properties.listing.listingMedia
                                                        .filter((x: ListingMediaDto) =>
                                                            x.type.toString() === "Image"
                                                            && x.id.startsWith('Sanctum/img'))[0]?.url}
                                                    alt={item.properties.listing.listingMedia
                                                        .filter((x: ListingMediaDto) =>
                                                            x.type.toString() === "Image"
                                                            && x.id.startsWith('Sanctum/img'))[0]?.caption}
                                                />
                                                <article className="marker-text">
                                                    <b>{priceFormatter(item.properties.listing.pricing.price, item.properties.listing.pricing.currency)}</b>
                                                    {predicate.get("channel") === "sale" ? null : <span>{rentFrequency(item.properties.listing)}</span>}
                                                </article>
                                                <p className="marker-text">
                                                    {item.properties.listing.totalBedrooms > 0 && <span>{item.properties.listing.totalBedrooms} Beds </span>}
                                                    {PascalToNormal(item.properties.listing.propertyType.toString())}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </Tooltip>}
                        </Marker>
                    );
                }

                // we have a single point to render
                return (
                    <Marker
                        key={`estate-${cluster.properties.listing.id}`}
                        position={[latitude, longitude]}
                        icon={priceIcon(cluster.properties.listing.id, nFormatter(cluster.properties.listing.pricing.price, 1), nFormatter(cluster.properties.listing.pricing.price, 1).length)}
                        eventHandlers={{
                            click: () => {
                                if (selectedCompany) cancelSelectCompany();
                                if (selectedListing?.id === cluster.properties.listing.id) {
                                    cancelSelectListingForImage();
                                    cancelSelectListing();
                                } else {
                                    let mainImage = cluster.properties.listing.listingMedia.find((x: ListingMediaDto) => x.isMain === true);
                                    let initialImage = mainImage ? mainImage
                                        : cluster.properties.listing.listingMedia.filter((x: ListingMediaDto) => x.type.toString() === "Image" && x.id.startsWith('Sanctum/img'))[0];
                                    setImage(initialImage);
                                    selectListingForImage(cluster.properties.listing.id);
                                    selectListing(cluster.properties.listing.id);
                                }
                                if (contacts === true) setContacts(false);
                            }
                        }}
                    >
                        <Tooltip direction="bottom" offset={[15, 10]}>
                            {/* <AgencyTag listing={cluster.properties.listing} fontSize={"10px"} /> */}
                            <img className="marker-snippet"
                                src={cluster.properties.listing.listingMedia.find((x: ListingMediaDto) => x.isMain === true)?.url}
                                alt="listing"
                                onLoad={() => setImgLoaded(true)}
                                style={imgLoaded ? {} : { display: "none" }}
                            />
                            <section className="marker-title">
                                <div className="marker-text">
                                    <b>{priceFormatter(cluster.properties.listing.pricing.price, cluster.properties.listing.pricing.currency)}</b>
                                    {predicate.get("channel") === "sale" ? null : <span>{rentFrequencyShort(cluster.properties.listing)}</span>}
                                </div>
                                <p className="marker-text">
                                    {cluster.properties.listing.totalBedrooms > 0 && <span>{cluster.properties.listing.totalBedrooms} Beds </span>}
                                    {PascalToNormal(cluster.properties.listing.propertyType.toString())}
                                </p>
                            </section>
                        </Tooltip>
                    </Marker>
                );
            })}
        </div>
    );
});