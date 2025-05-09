'use client';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getAllSpecialist, getAnnouncements, getUserInfoApi } from '@/api';
import styles from './index.module.scss';
import { Button, Skeleton } from '@mui/material';
import { Box, Typography, Paper, Stack, Avatar, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/product';
import Link from 'next/link';
import { Query } from 'appwrite';
import getUser from '@/utils/getUser';


const ListSpecialist = () => {

        const [page, setPage] = useState<number>(0);
        const { products ,setProducts} = useProductStore();
        const [specialists, setSpecialists] = useState<IAnnouncement[]>([]);

        const { mutate: getSpecialist, isPending: isLoadingSpecialist } = useMutation({
            mutationKey: ['getAllSpecialist'],
            mutationFn: async (queries: string[]) => {
                const response = await getAllSpecialist(queries);
                if (!response) {
                    throw new Error();
                }
                setSpecialists((prev) => {
                    const newDocs = response.documents.filter((doc) => !prev.some((item) => item.$id === doc.$id));
                    return [...prev, ...newDocs];
                });
            },
            onError: () => { },
        });
        console.log(specialists)
 
        useEffect(() => {
            const limit = page ? 2 : 1;
            const queryAfter = specialists.length ? [Query.cursorAfter(specialists.at(-1)?.$id!)] : [];
            const paginationQueries = [Query.limit(limit), ...queryAfter];
            getSpecialist(paginationQueries);
    }, [page]);
    const displayList  =products.length > 0 ? products : specialists;
    // const user = getUser()?.$id;
    // const userPhoneNumber = getUserInfoApi()
    // 	const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
	// 	onSuccess({ data }) {
	// 		setValue('email', data.email)
	// 	},
	// 	onError(error) {
	// 		toastError(error, 'Get profile')
	// 	},
	// })
    console.log(specialists)
    const handlePhone = ()=>{
        
    }

 
    const skeletons = () =>
        Array(12)
            .fill(null)
            .map((_, idx) => <Skeleton key={idx} />);


    return (
     <>
        {displayList.map((item) => (
            <Paper
                
                key={item.$id}
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 6,
                    },
                }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        src={item.avatar || '/default-avatar.png'}
                        alt={item.name}
                        sx={{ width: 48, height: 48 }}
                    />
                    <Box>
                        <Typography variant="h6" color="primary">{item.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{item.bio}</Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {item.languages.map((lang: string, i: number) => (
                        <Chip key={i} label={lang} color="secondary" size="small" />
                    ))}
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">Цена: <strong>{item.price}₽</strong></Typography>
                    <Typography variant="body2">⭐ {item.rating}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                {(item.email || item.telegram) && (
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            sx={{ mt: 1 }}
                            href={item.telegram ? `https://t.me/${item.telegram}` : `mailto:${item.email}`}
                            target="_blank"
                        >
                            Написать специалисту
                        </Button>
                    )}
                    <Button onClick={() => handlePhone()} style={{ alignSelf: 'center', marginTop: '30px' }}>
                        Показать мой номер
                    </Button>
                </Stack>
            </Paper>
        ))}

        
        <Button onClick={() => setPage((prev) => prev + 1)} style={{ alignSelf: 'center', marginTop: '30px' }}>
            Показать ещё
        </Button>
     </>
    );
};

export default ListSpecialist;
