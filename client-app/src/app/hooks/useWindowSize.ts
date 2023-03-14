import React, { useEffect, useState } from "react";

// custom hook to make React Apps responsive
// To use the hook, we just need to import it where we need, call it, and use the width wherever we want to hide or show certain elements
export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // a callback function to change the state of the window size (whenever the browser sizes change according to event listener in useEffect)
    function changeWindowSize() {
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(() => {
        // if we are on the client, add an event listener for the resize event in order to find out the window width and height
        window.addEventListener("resize", changeWindowSize);
        // Removing "resize" event listener when component unmounts
        return () => {
            window.removeEventListener("resize", changeWindowSize);
        }
    }, []);

    // at the end of the hook, we will return our windowSize state
    return windowSize;
}