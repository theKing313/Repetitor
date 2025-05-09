'use client';
import Link from 'next/link';
import { Box, Paper, Typography, Stack, Chip, Avatar, Divider, Button } from '@mui/material';
import classes from './index.module.scss';
import { useModals } from '@mantine/modals';
import getUser from '@/utils/getUser';
import { Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { sendResponseApi } from '@/api';
import { Query } from 'appwrite';
import { useMutation } from '@tanstack/react-query';
const Info = (announcement) => {
    console.log(announcement)
    const modals = useModals();
    const user = getUser();
    const router = useRouter();
    const { data: responseApi, mutate: sendResponse } = useMutation({
      mutationKey: ['announcement'],
      mutationFn: async () => {
          const messageData = {
            specialistId:user.$id,
            announcement :announcement.$id,
            message :'',
            status:null,
            paid:false,
            priceAtRespond:null,
            uniqueKey:''
          };
          const response = await sendResponseApi(messageData);

          if (!response) {
              throw new Error();
          }

          return response;
      },
  });
    const handleApply =async () => {
        // if (user.balance < 50 || user.balance === undefined) {
        // modals.openConfirmModal({
        //     title: 'Недостаточно средств',
        //     centered: true,
        //     children: (
        //     <Text size="sm">
        //         Для отклика необходимо минимум 50₽. Пожалуйста, пополните баланс.
        //     </Text>
        //     ),
        //     labels: { confirm: 'Пополнить', cancel: 'Отмена' },
        //     onConfirm: () => {
        //     // router.push('/account/topup');
        //         handlePayment()
        //     },
        // });
        // } else {
        // modals.openConfirmModal({
        //     title: 'Подтвердить отклик',
        //     centered: true,
        //     children: (
        //     <Text size="sm">
        //         Вы уверены, что хотите откликнуться на это объявление? С вашего баланса будет списано 50₽.
        //     </Text>
        //     ),
        //     labels: { confirm: 'Откликнуться', cancel: 'Отмена' },
        //     onConfirm: () => {
        //     // Тут логика отклика
            
        //     showNotification({
        //         title: 'Успешно',
        //         message: 'Вы откликнулись на вакансию!',
        //         color: 'green',
        //     });
        //     },
        // });
        // }


        const res = await sendResponse()
        if (responseApi){
          console.log(res)
            modals.openConfirmModal({
              title: 'Спасибо за отклик',
              centered: true,
              children: (
              <Text size="sm">
                  Чтобы посмотреть статус - задите в личный кабинет
              </Text>
              ),
              labels: { confirm: 'Мои отклики', cancel: 'Отмена' },
              onConfirm: () => {
              router.push('/responses');
                  // handlePayment()
              },
          });
        }

    };

    
    return (
        <Box className={classes.wrapper}>
            <Script src="https://widget.cloudpayments.ru/bundles/cloudpayments.js" strategy="beforeInteractive" />
          <Paper className={classes.card}>
            <Box className={classes.header}>
              <Typography variant="h5">{announcement.title}</Typography>
              <Chip label={announcement.format} color="primary" />
            </Box>
    
            <Typography className={classes.subtitle}>
              Уровень: {announcement.level} • Возраст: {announcement.age}+ • Язык: {announcement.language || '—'}
            </Typography>
    
            <Typography className={classes.time}>
              ⏰ Время занятий: {announcement.time}
            </Typography>
    
            <Divider sx={{ my: 2 }} />
    
            <Typography className={classes.description}>
              {announcement.description}
            </Typography>
    
            <Divider sx={{ my: 2 }} />
    
            <Box className={classes.teacherInfo}>
              <Avatar
                src="/default-avatar.png"
                alt={announcement.teacher}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography>Преподаватель: <strong>{announcement.teacher}</strong></Typography>
                <Typography>Рейтинг: ⭐ {announcement.rating}</Typography>
                <Typography>Цена занятия: <strong>{announcement.price} ₽</strong></Typography>
              </Box>
            </Box>
    
            <Button fullWidth mt="md" size="md" color="blue"onClick={handleApply}>
              Откликнуться
            </Button>
          </Paper>
        </Box>
      );
    
};

export default Info;





