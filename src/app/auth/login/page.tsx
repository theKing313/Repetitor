"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import useAuth from "@/hooks/useAuth";
import { z } from 'zod';
// import { SCHEMA } from "./constants";

import type { Schema } from "./types";
import type { IAuthError } from "@/hooks/useAuth/types";
import Link from "next/link";
// import { Link } from "@/shared/link";

const Page = () => {
    const SCHEMA = z.object({
        email: z.string().refine((val) => {
            const regExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
            const isValid = regExp.test(val);

            return isValid;
        }, "Неверный формат почты"),
        password: z.string().min(8, "Минимум 8 символов").max(20, "Максимум 20 символов"),
        
    });
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Schema>({ resolver: zodResolver(SCHEMA) });
    const { signIn } = useAuth();

    const onSubmit: SubmitHandler<Schema> = async ({ email, password }) => {
        try {
            await signIn({ email, password });
        } catch (error) {
            if ((error as IAuthError)?.status === 403 || (error as IAuthError)?.status === 401) {
                setError("email", { message: "" });
                setError("password", { message: (error as IAuthError)?.message });
            }
        }
    };
    return (
        <Box display="flex" flexDirection="column" width="100%">
            <Stack mb={3}>
                <Typography variant="h4">Вход Для Клиентов</Typography>
            </Stack>
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <TextField {...register("email")} error={!!errors?.email} helperText={errors?.email?.message} label="Почтовый адрес" />
                    <TextField
                        {...register("password")}
                        error={!!errors?.password}
                        helperText={errors?.password?.message}
                        type="password"
                        label="Пароль"
                    />
                </Stack>
                <Button sx={{ mt: 3 }} fullWidth size="large" type="submit" variant="contained">
                    Войти
                </Button>
            </Box>
            <Link href="/auth/registration" style={{ textAlign: "center", marginTop: "32px" }}>
                Нет аккаунта ?
            </Link>
        </Box>
    );
};

export default Page;
