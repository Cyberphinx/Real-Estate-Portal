import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../stores/store";

export default observer(function ModalContainer() {
    const { modalStore } = useStore();

    return (
        <div>
            {modalStore.modal.open &&
                <div >
                    <div>
                        {modalStore.modal.body}
                    </div>
                </div>
            }

        </div>

    )
});