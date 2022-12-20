import { observer } from "mobx-react-lite";
import './LayersControl.css';
import React, { SyntheticEvent } from "react";
import { useStore } from "../../app/stores/store";
import LoadingComponent from "../../app/common/loading/LoadingComponent";

export default observer(function LayersControl() {
    const { mapStore, companyStore } = useStore();
    const { displayAgents, setDisplayAgents } = mapStore;
    const { loadingCompanies } = companyStore;

    return (
        <div className="map-layers-control">
            <button onClick={() => setDisplayAgents()} style={loadingCompanies ? {padding:"7px 40px 7px 15px"} : {padding:"7px 15px 7px 15px"}}>
                <span className={displayAgents ? "company-marker-legend" : "company-marker-legend-hidden"}></span>
                <span className="agent-legend-title">Estate Agents: </span> 
                {loadingCompanies ?
                <span className="button-loader"></span>
                :<span>{displayAgents ? " Visible" : " Hidden"}</span>}
            </button>
        </div>
    )
})