import { observer } from "mobx-react-lite";
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
            {user?.role.includes("Agency") && <Agency user={user} />}
            {user?.role.includes("Company") && <Company user={user} />}
            {user?.role.includes("Customer") && <Customer user={user} />}
        </div>
    );
}
);