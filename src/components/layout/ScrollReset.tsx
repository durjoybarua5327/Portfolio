"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
    const pathname = usePathname();

    useEffect(() => {
        // Scroll to top on mount (reload)
        window.scrollTo(0, 0);

        // Also try to remove hash if present to prevent browser from jumping back
        if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname);
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
}
