

'use client';

import { Box, Typography, Paper, Skeleton, Stack, Avatar, Chip } from '@mui/material';
// import { announcements } from './data';
import { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { getAnnouncements as getAnnouncementsAPI} from "@/api";
import { Query } from 'appwrite';
import Link from 'next/link';
import { useProductStore } from '@/store/product';
import { useSearchParams } from 'next/navigation';
import ListSpecialist from './listSpecialist';
import TaskDetails from '../TaskDetail';
const Announcements = () => {

    const searchParams = useSearchParams();

    const mode = searchParams.get('mode') as 'announcements' | 'specialist' | null;
    const tags = searchParams.get('tags');
    console.log(tags)
    console.log(mode)
    const [page, setPage] = useState<number>(0);
    const { products ,setProducts} = useProductStore();
    const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);

    const { mutate: getAnnouncements, isPending: isLoadingAnnouncement } = useMutation({
        mutationKey: ['announcements'],
        mutationFn: async (queries: string[]) => {
            const response = await getAnnouncementsAPI(queries);
            if (!response) {
                throw new Error();
            }
            setAnnouncements((prev) => {
                const newDocs = response.documents.filter((doc) => !prev.some((item) => item.$id === doc.$id));
                return [...prev, ...newDocs];
            });
        },
        onError: () => { },
    });
    console.log(products)
    useEffect(() => {
      if (mode === 'specialist') {
          const limit = page ? 2 : 1;
          const queryAfter = announcements.length ? [Query.cursorAfter(announcements.at(-1)?.$id!)] : [];
          const paginationQueries = [Query.limit(limit), ...queryAfter];
          getAnnouncements(paginationQueries);
      }
  }, [page, mode]);
    const displayList  =products.length > 0 ? products : announcements;
    const languages =  [
      { id: "js", name: "javascript" },
      { id: "python", name: "python" }
    ]
    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {isLoadingAnnouncement  ? 
                <Skeleton height={300}></Skeleton>
            : 
            mode === 'specialist' ? 
              
                <>
                  {displayList.map((item) => (
                  <Link key={item.$id} href={{ pathname: '/announcements', query: { id: item.$id } }} style={{ textDecoration: 'none' }}>
                    <Paper
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
                      <Typography variant="h6" color="primary">{item.title}</Typography>
              
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip label={item.language} color="secondary" size="small" />
                        <Chip label={item.level} variant="outlined" size="small" />
                        <Chip label={`Возраст: ${item.age}`} variant="outlined" size="small" />
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                          {languages.map((lan: string, i: number) => (
                                <Typography key={i} variant="body2">{lan.name}</Typography>
                            ))}
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body2">{item.format} • {item.time}</Typography>
                      </Stack>
                      
              
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={item.teacherAvatar || '/default-avatar.png'}
                          alt={item.teacher}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography variant="body2">Преподаватель: <strong>{item.teacher}</strong></Typography>
                      </Stack>
              
                      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="body2">Цена: <strong>{item.price}₽</strong></Typography>
                        <Typography variant="body2">⭐ {item.rating}</Typography>
                      </Stack>
                    </Paper>
                  </Link>
                ))}
            
                <Button onClick={() => setPage((prev) => prev + 1)} style={{ alignSelf: 'center', marginTop: '30px' }}>
                    Показать ещё
                </Button>
                </>
              :
                // 'LIST CLEITNS'
                <ListSpecialist  />

            }
      
            
            {mode === 'details' && tags && (
              <Paper elevation={3} sx={{ p: 3 }}>
                  {/* Другие данные задачи */}
                  <TaskDetails/>
              </Paper>
          )}

        </Box>

    );
};

export default Announcements;





