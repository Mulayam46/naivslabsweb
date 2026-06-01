"use client";

import { useEffect } from "react";

export function TawkChat() {
    useEffect(() => {
        // Avoid double-loading if already injected
        if (document.getElementById("tawk-script")) return;

        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_LoadStart = new Date();

        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];

        s1.id = "tawk-script";
        s1.async = true;
        s1.src = "https://embed.tawk.to/6a19c87bc28be51c3cfa88f1/1jpqbe9if";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");

        s0.parentNode?.insertBefore(s1, s0);
    }, []);

    return null;
}

