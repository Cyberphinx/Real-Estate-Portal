import React, { useEffect, useState } from "react";
import './CompanyMarker.css';
import { Marker, useMap, Tooltip } from 'react-leaflet';
import L from "leaflet";
import useSupercluster from "use-supercluster";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Company } from "../../app/model/CompanyAggregate/Company";
import { ServiceCategory } from "../../app/model/ServiceCategory";

// const mapMarker = new L.Icon({
//     iconUrl: "/assets/circle.svg",
//     iconSize: [25, 25]
// });

// const mapMarker = new L.DivIcon({
//     html: `<div class="company-marker-small" style="width: 15px; height: 15px;">
//   </div>`
// });

const icons: any = {};
const fetchIcon = (count: number, size: number) => {
    if (!icons[count]) {
        icons[count] = L.divIcon({
            html: `<div class="company-marker" style="width: ${size}px; height: ${size}px;">
          ${count}
        </div>`
        });
    }
    return icons[count];
};

export default observer(function CompanyMarker() {
    const { featureStore: { zoom, setZoom }, listingStore } = useStore();
    const { companies, selectCompany } = listingStore;

    const map = useMap();
    const [bounds, setBounds] = useState<any>();

    const companyIcon = (company: Company) => {
            // const size = ServiceCategory[company.serviceCategory].length;
            const icon = L.divIcon({
                html: `<div class="point-marker-company" style="width: 80px; height: 15px;">
              ${ServiceCategory[company.serviceCategory]}
            </div>`
            });
        return icon;
    };

    // map data into "feature" GeoJson objects
    const points = companies.map(
        (company: Company) => ({
            type: "Feature",
            properties: {
                cluster: false,
                company: company,
                companyId: company.id,
                companyName: company.companyName,
                addedOn: company.addedOn,
                serviceCategory: company.serviceCategory,
                companyAddress: company.companyAddress,
                logo: company.logo,
                companyContents: company.companyContents,
            },
            geometry: {
                type: "Point",
                coordinates: [company.companyAddress.coordinates.longitude, company.companyAddress.coordinates.latitude],
            }
        })
    );

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

    // get clusters
    const { clusters } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    });

    map.on("move", updateMap);

    // debounce: to avoid making too much changes to bounds
    // const [debouncedDataBounds] = useDebounce(bounds, 200);

    return (
        <div>
            {clusters.map(cluster => {
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
                            icon={fetchIcon(
                                pointCount,
                                10 + (pointCount / points.length) * 40
                            )}
                        >
                            {/* <Tooltip offset={[25, 10]}>{latitude}</Tooltip> */}
                        </Marker>
                    );
                }

                // we have a single point to render
                return (
                    <Marker
                        key={`company-${cluster.properties.companyId}`}
                        position={[latitude, longitude]}
                        icon={companyIcon(cluster.properties.company)}
                        eventHandlers={{
                            click: () => {
                                selectCompany(cluster.properties.companyId);
                            }
                        }}
                    >
                        <Tooltip offset={[10, 0]}>
                            <b>{cluster.properties.companyName}</b>
                            <p>{ServiceCategory[cluster.properties.serviceCategory]} Company</p>
                            {/* <img src={cluster.properties.logo} style={{ width: "100px" }} /> */}
                        </Tooltip>
                    </Marker>
                );
            })}
        </div>
    );
});