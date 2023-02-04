import { observer } from "mobx-react-lite";
import Nav from "../../../app/layout/Nav";
import { useStore } from "../../../app/stores/store";
import Agency from "./agency/Agency";
import Company from "./company/Company";
import './ControlPanel.css';
import Customer from "./customer/Customer";

export default observer(function ControlPanel() {
    const { userStore } = useStore();
    const { user } = userStore;

    return (
        <div>
            <Nav />
            {user?.role.includes("Agency") && <Agency user={user} />}
            {user?.role.includes("Company") && <Company user={user} />}
            {user?.role.includes("Customer") && !user?.role.includes("Agency") && !user?.role.includes("Company") && <Customer user={user} />}
        </div>
    );
}
);