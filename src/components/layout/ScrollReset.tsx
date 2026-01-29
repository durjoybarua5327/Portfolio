"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReset() {
    const pathname = usePathname();

    useEffect(() => {
        // Force instant scroll to top on mount (reload)
        window.scrollTo({
            top: 0,
            behavior: 'instant' as any
        });

        // Also try to remove hash if present to prevent browser from jumping back
        if (window.location.hash) {
            history.replaceState(null, "", window.location.pathname);
            window.scrollTo({
                top: 0,
                behavior: 'instant' as any
            });
        }
    }, [pathname]);

    return null;
}
