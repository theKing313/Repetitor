"use client";


import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import useAuth from "@/hooks/useAuth";

// import { SCHEMA } from "./constants";

import type { Schema } from "./types";
import type { IAuthError } from "@/hooks/useAuth/types";
import Link from "next/link";
// import { Link } from "@/shared/link";
import {  Radio, Group } from '@mantine/core';
import { useState } from "react";
import AddListing from "@/sheets/add-listing";
import { useAddListing } from "@/context/addListing";
import getUser from "@/utils/getUser";
const Page = () => {
 
    const handleOAuthLogin = async (provider: string) => {
        try {
            const s =  auth2()
            console.log(s)
        } catch (error) {
            console.error('OAuth error:', error);
        }
    };
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [meetingPlace, setMeetingPlace] = useState('');
    // const { listing} = useAddListing()
    return (
        <Box style={{ maxWidth: '100%', margin: 'auto', padding: 24 }}>
            
        
         <AddListing/>  
            
        {/* <Typography variant="h4" style={{ marginBottom: 20 }}>
          Где удобно встретиться?
        </Typography>
  
            <Stack gap="md">
            <TextField
                label="Номер телефона"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
    
            <TextField
                label="Описание задачи"
                placeholder="Расскажите подробнее о задаче..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={4}
                required
            />
    
            <Radio.Group
                value={meetingPlace}
                onChange={setMeetingPlace}
                label="Выберите место встречи"
                withAsterisk
            >
                <Group direction="column" mt="xs">
                <Radio value="online" label="Онлайн" />
                <Radio value="at_specialist" label="У специалиста" />
                <Radio value="at_client" label="У меня" />
                <Radio value="anywhere" label="Неважно" />
                </Group>
            </Radio.Group>
    
            <Button
                fullWidth
                size="md"
                onClick={handleSubmit}
                style={{ marginTop: 20 }}
            >
                Продолжить →
            </Button>
            </Stack> */}
      </Box>
    );
};

export default Page;
