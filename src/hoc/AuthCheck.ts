"use client";

import { redirect, usePathname } from "next/navigation";
import { type PropsWithChildren, useEffect } from "react";

const PROTECTED_ROUTES = ["/about", "/chats"];
const PUBLIC_ROUTES = ["/auth/login", "/auth/registration"];

export default ({ children }: PropsWithChildren) => {
    const pathname = usePathname();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (PUBLIC_ROUTES.includes(pathname)) return;
        if (!user) return redirect("/auth/login");
        if (PROTECTED_ROUTES.includes(pathname)) return;
        // redirect("/about");
    }, []);
    return children;
};
