import React, { useEffect } from "react";
import './CompanyMarker.css';
import { Marker, useMap, Tooltip } from 'react-leaflet';
import L from "leaflet";
import useSupercluster from "use-supercluster";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Company } from "../../app/model/Company";
import ReactDOMServer from "react-dom/server";

interface Props {
    points: GeoJSON.Feature[];
}

const icons: any = {};
const clusterIcon = (count: number, size: number) => {
    if (!icons[count]) {
        icons[count] = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="company-cluster-marker" style={{ width: `${size}px`, height: `${size}px` }}>
                    {count}
                </div>
            )
        });
    }
    return icons[count];
};

export default observer(function CompanyMarker({ points }: Props) {
    const { companyStore, mapStore, listingStore } = useStore();
    const { selectCompany, cancelSelectCompany, selectedCompany } = companyStore;
    const { zoom, setZoom, setBounds, bounds } = mapStore;
    const { selectedListing, cancelSelectListing } = listingStore;

    const maxZoom = 20;
    const map = useMap();

    const companyIcon = (company: Company) => {
        const icon = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="point-marker-company">
                    {/* {company.displayName} */}
                </div>
            )
        });

        const iconActive = L.divIcon({
            html: ReactDOMServer.renderToString(
                <div className="point-marker-company-active">
                </div>
            )
        });

        if (company.id === selectedCompany?.id) return iconActive;
        else return icon;
    };

    // get map bounds
    function updateMap() {
        const b: L.LatLngBounds = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat
        ]);
        setZoom(map.getZoom());
    }

    useEffect(() => {
        updateMap();
    }, []);

    const { clusters, supercluster } = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: { radius: 100, maxZoom: 20 }
    });

    map.on("move", updateMap);

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
                            icon={clusterIcon(
                                pointCount,
                                10 + (pointCount / points.length) * 40
                            )}
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
                                        if (selectedListing) cancelSelectListing();
                                        if (selectedCompany?.id === leaves[0].properties.company.id) {
                                            cancelSelectCompany();
                                        } else {
                                            selectCompany(leaves[0].properties.company.id);
                                        }
                                    }
                                },
                            }}
                        >
                            {leavesOverlap(cluster.id) &&
                                <Tooltip direction="top" offset={[14, -8]}>
                                    <ul className="company-snippets-container"style={{listStyleType:"none"}}>
                                            {supercluster.getLeaves(cluster.id, Infinity, 0).map((item: any) => (
                                                <li key={item.properties.company.id} className="snippet-container">
                                                    <article className="marker-text">
                                                        <b>{item.properties.company.displayName}</b>
                                                        <p style={{ margin: "0px", padding: "0px", fontSize: "10px" }}>{item.properties.company.companyReference}</p>
                                                        <br />
                                                    </article>
                                                </li>
                                            ))}
                                    </ul>
                                </Tooltip>}
                        </Marker>
                    );
                }

                // we have a single point to render
                return (
                    <Marker
                        key={`company-${cluster.properties.company.id}`}
                        position={[latitude, longitude]}
                        icon={companyIcon(cluster.properties.company)}
                        eventHandlers={{
                            click: () => {
                                if (selectedListing) cancelSelectListing();
                                if (selectedCompany?.id === cluster.properties.company.id) {
                                    cancelSelectCompany();
                                } else {
                                    selectCompany(cluster.properties.company.id);
                                }
                            }
                        }}
                    >
                        <Tooltip direction="top" offset={[3, -3]}>
                            <b>{cluster.properties.company.displayName}</b>
                            <p style={{ margin: "0px", padding: "0px", fontSize: "10px", color: "grey" }}>#{cluster.properties.company.companyReference}</p>
                            <p style={{ margin: "0px", padding: "0px", fontSize: "10px" }}>Listings: {cluster.properties.company.listings.length}</p>
                        </Tooltip>
                    </Marker>
                );
            })}
        </div>
    );
});