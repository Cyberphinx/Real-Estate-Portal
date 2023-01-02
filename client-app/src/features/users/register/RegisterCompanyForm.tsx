import './RegisterForm.css';
import { observer } from "mobx-react-lite";
import { useStore } from '../../../app/stores/store';

export default observer(function RegisterCompanyForm() {
    const { userStore: { register }, featureStore: { setActiveFeature }, modalStore: { openModal, closeModal } } = useStore();

    return (
        <div>
            <p style={{fontSize:"13px",paddingBottom:"20px",color:"#cc0000"}}>Coming soon...</p>
        </div>

    )
});