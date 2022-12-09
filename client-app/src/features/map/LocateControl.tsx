import { useEffect } from "react";
import { useMap } from "react-leaflet";
import './MainMap.css';


export default function LocateControl() {
    const map = useMap();

    const Locate = require("leaflet.locatecontrol")
    const locateControl = new Locate({
        position: "topleft"
    });

    useEffect(() => {
        map.addControl(locateControl);
        return () => { map.removeControl(locateControl) };
    }, [])

    return null;
}
