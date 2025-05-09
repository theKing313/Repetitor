
'use client';

import { Box, Typography, Paper, Stack, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserResponses } from '@/api';
import { IAnnouncement } from '@/types';

import styles from './index.module.scss';
import getUser from '@/utils/getUser';
import { Query } from 'appwrite';

const Responses = () => {
    const [responses, setResponses] = useState<IAnnouncement[]>([]);

    useEffect(() => {
      const fetchResponses = async () => {
        const user = getUser();
        if (!user) return;
  
        const data = await getUserResponses([Query.equal('specialistId',user.$id)]);
        console.log(data)
        if (data) setResponses(data);
      };
  
      fetchResponses();
    }, []);
    console.log(responses)
    return (
        <Box padding={4}>
          <Typography variant="h4" gutterBottom>Мои отклики</Typography>
    
          <Stack spacing={2}>
            {responses.length > 0 ? responses.map((item) => (
              <Paper key={item.announcement.$id} sx={{ padding: 2, borderRadius: 2 }}>
                <Typography variant="h6">{item.announcement.title}</Typography>
                <Typography>{item.announcement.language} • {item.announcement.level} • {item.announcement.age} лет</Typography>
                <Typography>{item.announcement.format} • {item.announcement.time}</Typography>
                <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                  <Avatar src={item.announcement.teacherAvatar || '/default-avatar.png'} />
                  <Typography>Преподаватель: {item.announcement.teacher}</Typography>
                </Stack>
                <Typography mt={1}>Цена: {item.announcement.price}₽ • Рейтинг: {item.announcement.rating}</Typography>
              </Paper>
            )) : (
              <Typography>Вы ещё не откликались на объявления.</Typography>
            )}
          </Stack>
        </Box>
      );
};

export default Responses;
