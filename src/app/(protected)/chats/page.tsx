"use client";

import { useState } from "react";
import { Box } from "@mui/material";

import { Chat } from "@/components/pages/chats/chat";
import { ListRooms } from "@/components/pages/chats/list-rooms";
import { WarningSelectChat } from "@/components/pages/chats/chat/ui/WarningSelectChat";

import type { IRoom } from "@/types";

const Page = () => {
    const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);
    return (
        <Box className="flex relative min-h-[100vh] w-full">
            <ListRooms onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
            <Box className="grow relative">{selectedRoom ? <Chat room={selectedRoom} /> : <WarningSelectChat />}</Box>
        </Box>
    );
};

export default Page;
