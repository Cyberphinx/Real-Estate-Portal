import { useEffect, useState } from "react";

export const useDetectOutsideClick = (ref: any, initialState: any) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const pageClickEvent = (event: any) => {
            if (ref.current !==null && !ref.current.contains(event.target)) {
                setIsActive(!isActive);
            }
        };
        if (isActive) {
            window.addEventListener("click", pageClickEvent);
        }

        return () => {
            window.removeEventListener("click", pageClickEvent);
        }
    }, [isActive, ref])

    return [isActive, setIsActive];
}