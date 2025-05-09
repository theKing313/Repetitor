'use client';

import { Box, Button, TextField, Typography } from "@mui/material";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "@/hooks/useAuth";
import { IAuthError } from "@/hooks/useAuth/types";

// Определяем схему валидации
const SCHEMA = z.object({
    name: z.string().min(2, "Минимум 2 символа"),
    email: z.string().email("Неверный формат почты"),
    password: z.string().min(8, "Минимум 8 символов").max(20, "Максимум 20 символов"),
});

type Schema = z.infer<typeof SCHEMA>;

const SignUp = () => {
    const { signUp } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<Schema>({
        resolver: zodResolver(SCHEMA),
    });

    const onSubmit = async (data: Schema) => {
        const { email, password,name } = data;
        try {
            await signUp({ email, password,name });
        } catch (error) {
            const err = error as IAuthError;
            if (err?.status === 403 || err?.status === 401) {
                setError("email", { message: "" });
                setError("password", { message: err.message });
            }
        }
    };

    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5">Регистрация клиента</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Имя"
                    variant="outlined"
                    fullWidth
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Пароль"
                    variant="outlined"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Зарегистрироваться
                </Button>
            </form>
        </Box>
    );
};

export default SignUp;
