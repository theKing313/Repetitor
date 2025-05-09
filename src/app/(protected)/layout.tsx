"use client";

import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import { PropsWithChildren } from "react";
import { Box, Container, Stack, Theme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { Sidebar } from "@/shared/sidebar";

import styled from "@emotion/styled";
// import locale from "antd/locale/ru_RU";

import "dayjs/locale/ru";
import { usePathname } from "next/navigation";

dayjs.locale("ru");

const Layout = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient();
    const pathname = usePathname();

    return (
        <ConfigProvider locale={locale}>
            <QueryClientProvider client={queryClient}>
                <Sidebar />
                <LayoutRoot>
                    <LayoutContainer>
                        <Box component={"main"} flexGrow={1} py={pathname === "/chats" ? 0 : 8} minHeight="100vh" position="relative">
                            {pathname === "/announcements" ? (
                                children
                            ) : (
                                <Container maxWidth="xl">
                                    <Stack spacing={3}>{children}</Stack>
                                </Container>
                            )}
                        </Box>
                    </LayoutContainer>
                </LayoutRoot>
            </QueryClientProvider>
        </ConfigProvider>
    );
};

export default Layout;

const LayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingLeft: 50,
    [(theme as Theme).breakpoints.up("lg")]: {
        paddingLeft: 280,
    },
}));

const LayoutContainer = styled("div")({
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    width: "100%",
});
