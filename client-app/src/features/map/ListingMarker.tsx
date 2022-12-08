import React, { useCallback, useEffect, useState } from "react";
import './ListingMarker.css';
import { Marker, useMap, Tooltip } from 'react-leaflet';
import L from "leaflet";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { propertyType, rentFrequency } from "../../app/model/ListingAggregate/ListingEnums";
import nFormatter from "../../app/common/nFormatter";
import priceFormatter from "../../app/common/PriceFormatter";

interface Props {
    points: GeoJSON.Feature[];
    clusters: any;
    supercluster: any;
}


export default observer(function ListingMarker({ points, clusters, supercluster }: Props) {
    const { mapStore, listingStore } = useStore();
    const { selectListing, contacts, setContacts, cancelSelectListing, selectedListing, predicate } = listingStore;
    const { setZoom, activeListing, setBounds } = mapStore;

    const maxZoom = 20;
    const map = useMap();
    // const [t, setT] = useState<number | null>(null);

    const [imgLoaded, setImgLoaded] = useState<boolean>(false);

    const clusterMarkerActive = (cluster: any) => {
        return supercluster.getLeaves(cluster.id, Infinity, 0).some((x: any) => x.properties.listing.id === activeListing?.id);
    }
    const clusterMarkerSelected = (cluster: any) => {
        return supercluster.getLeaves(cluster.id, Infinity, 0).some((x: any) => x.properties.listing.id === selectedListing?.id);
    }

    const icons: any = {};
    const clusterIcon = (count: number, size: number) => {
        let style = "";
        if (count > 30) style = "low-density";
        if (count > 60) style = "med-density";
        if (count > 90) style = "high-density";

        if (!icons[count]) {
            icons[count] = L.divIcon({
                html: `<div class="cluster-marker ${style}" style="width: ${size}px; height: ${size}px;">
              ${count}
            </div>`
            });
        }
        return icons[count];
    };
    const activeClusterIcon = (count: number, size: number) => {
        let style = "";
        if (count > 30) style = "low-density";
        if (count > 60) style = "med-density";
        if (count > 90) style = "high-density";

        const icon = L.divIcon({
                html: `<div class="cluster-marker ${style}" style="width: ${size}px; height: ${size}px; color: #000; background: #00FF00;">
              ${count}
            </div>`
            });
        
        return icon;
    };

    const priceIcon = (id: string, price: string, size: number) => {
        const icon = L.divIcon({
            html: `<div class="point-marker-price" style="width: calc(7px * ${size}); height: 16px;">
            ${price}
            </div>`
        });
        const iconActive = L.divIcon({
            html: `<div class="point-marker-price-active" style="width: calc(7px * ${size}); height: 16px;">
            ${price}
            </div>`
        });
        const iconSelected = L.divIcon({
            html: `<div class="point-marker-price-selected" style="width: calc(7px * ${size}); height: 16px;">
            ${price}
            </div>`
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

    // get map bounds
    function updateMap() {
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat,
        ]);
        setZoom(map.getZoom());
    }

    // function autoSearchMapDebounnced() {
    //     if (t) clearTimeout(t);
    //     setT(window.setTimeout(() => setPredicate("mapBounds", String(bounds)), 500));
    // }

    // update map in response to user moves
    const onMove = useCallback(() => {
        updateMap();
    }, [map]);
    // load map initially
    useEffect(() => {
        updateMap();
    }, [map]);
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

    // console.log(`current zoom is: ${zoom}`);
    // console.log(`current cluster are: ${clusters.length}`);
    // console.log(`current map bounds are: ${bounds}`);
    // console.log(`Clusters shown in view: ${clusters.length}`);

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
                                        if (selectedListing?.id === leaves[0].properties.listing.id) {
                                            cancelSelectListing();
                                        } else {
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
                                                <img className="tiny-snippet" src={item.properties.listing.contents[0].url} alt="listing" />
                                                <article className="marker-text">
                                                    <b>{priceFormatter(item.properties.listing.pricing.price, item.properties.listing.pricing.currency)}</b>
                                                    {predicate.get("channel") === "sale" ? null : <span>{rentFrequency(item.properties.listing)}</span>}
                                                </article>
                                                <p className="marker-text">{item.properties.listing.totalBedrooms} Beds {propertyType(item.properties.listing)}</p>
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
                        icon={priceIcon(cluster.properties.listing.id, nFormatter(cluster.properties.listing.pricing.price, 1), cluster.properties.listing.pricing.price.toString().length)}
                        eventHandlers={{
                            click: () => {
                                if (selectedListing?.id === cluster.properties.listing.id) {
                                    cancelSelectListing();
                                } else {
                                    selectListing(cluster.properties.listing.id);
                                }
                                if (contacts === true) setContacts(false);
                            }
                        }}
                    >
                        <Tooltip direction="bottom" offset={[10, 8]}>
                            <img className="marker-snippet"
                                src={cluster.properties.listing.contents[0].url}
                                alt="listing"
                                onLoad={() => setImgLoaded(true)}
                                style={imgLoaded ? {} : { display: "none" }}
                            />
                            <section className="marker-title">
                                <div className="marker-text">
                                    <b>{priceFormatter(cluster.properties.listing.pricing.price, cluster.properties.listing.pricing.currency)}</b>
                                    {predicate.get("channel") === "sale" ? null : <span>{rentFrequency(cluster.properties.listing)}</span>}
                                </div>
                                <p className="marker-text">{cluster.properties.listing.totalBedrooms} Beds {propertyType(cluster.properties.listing)}</p>
                            </section>
                        </Tooltip>
                    </Marker>
                );
            })}
        </div>
    );
});