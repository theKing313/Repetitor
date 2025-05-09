"use client";

import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
// import { Box, Unstable_Grid2 as Grid } from "@mui/material";

const Layout = ({ children }: PropsWithChildren) => {
    return (
    <Box sx={{ maxWidth: "1250px", padding: "100px 24px", width: "100%", margin: "0 auto" }}>
        {children}
    </Box>
    );
};

export default Layout;
