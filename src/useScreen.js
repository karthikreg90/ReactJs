import { useState, useEffect } from "react";

export default function useScreen(){
    const [screenSize, setScreenSize] = useState("");
    useEffect(() => {
        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => {
            window.removeEventListener("resize", checkScreen);
        }
    });

    function checkScreen(){
        if(window.innerWidth > 900) return setScreenSize("Large");
        if(window.innerWidth < 900 && window.innerWidth > 600) return setScreenSize("Medium");
        if(window.innerWidth < 600) return setScreenSize("Small");
    }

    return screenSize;
}