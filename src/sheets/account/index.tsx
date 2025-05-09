'use client'
import getUser from '@/utils/getUser';
import classes from './index.module.scss';
import { Avatar, Button, Card, Container, Group, SimpleGrid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getUserInfoApi } from '@/api';
import { Box,  Modal, Title, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { styled, TextField, Typography } from '@mui/material';
import EducationFormModal from './form';
const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
];
interface User{
  
}
const  Account = () =>  {
  const user = getUser();
  const [userInfo, setUserInfo] = useState<User>();

  const { mutate: getUserInfo, isPending: isLoadingUserInfo } = useMutation({
      mutationKey: ['userInfo'],
      mutationFn: async (userId: string) => {
          const response = await getUserInfoApi(userId);
          console.log(response)
          if (!response) {
              throw new Error();
          }
          setUserInfo(response);
      },
      onError: () => { },
  });
  useEffect(()=>{
    getUserInfo(user.$id)
  },[])
  const [avatar,setAvatar] =useState()
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // setDiploma(e.target.files[0]);
      setAvatar(e.target.files[0])
    }
  };
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed" lh={1}>
        {stat.label}
      </Text>
    </div>
  ));
  const [opened, { open, close }] = useDisclosure(false);
  const content = () =>{
    return <>
      <Card withBorder padding="xl" radius="md" className={classes.card}>
      <Card.Section
        h={140}
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)',
        }}
      />
      <Box style={
        {
          display:'flex',
          position:'relative',
          maxWidth:'100px',
          margin:'0 auto'
        }
      }>

        <Avatar
          src={avatar && URL.createObjectURL(avatar)}
          // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          className={classes.avatar}
          
        />
        <UploadBox>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="upload-photo"
            />
            <label htmlFor="upload-photo">
              <Typography color="primary" sx={{ cursor: 'pointer' }}>
                +
              </Typography>
            </label>
 
          </UploadBox>
        {/* <AddPhotoAlternateIcon style={{position:'absolute',left:'0px' ,cursor:'pointer'}}/> */}
      </Box>
      <Text ta="center" fz="lg" fw={500} mt="sm">
        {userInfo?.name}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        Fullstack engineer
      </Text>
      <Group mt="md" justify="center" gap={30}>
        {/* {items} */}
          <Text ta="center" fz="lg" fw={500}>
            Отзывы 0
          </Text>
          <Text ta="center" fz="lg" fw={500}>
              Оценок 0
          </Text>
      </Group>
      <Container my="md">
            <Paper
              shadow="md"
              radius="md"
              p="xl"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                marginTop: 40,
              }}
            >
              <Box>
                <Title order={2}>О себе</Title>
                <Text c="dimmed" mt="sm" maw={450}>
                  {userInfo?.bio}
                </Text>
              </Box>

              <Button onClick={open} size="md">
                  Изменить
              </Button>
            </Paper>
            <Paper
              shadow="md"
              radius="md"
              p="xl"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                marginTop: 40,
              }}
            >
              <Box>
                <Title order={2}>Образование и опыт</Title>
                <Text c="dimmed" mt="sm" maw={450}>
                  {userInfo?.bio}
                </Text>
              </Box>

              <Button onClick={open} size="md">
                  Изменить
              </Button>
            </Paper>
            <Paper
              shadow="md"
              radius="md"
              p="xl"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                marginTop: 40,
              }}
            >
              <Box style={{width:'60%',}}>
                <Title  order={2}>Услуги</Title>
                <Box mt="lg" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <Text  maw={450}>
                      {userInfo?.languages.join(' , ')} ₽/ч
                    </Text>
                    <Text c="dimmed"  maw={450}>
                      {userInfo?.price} ₽/ч
                    </Text>
                </Box>
              </Box>

              <Button onClick={open} size="md">
                  Изменить
              </Button>
            </Paper>

      </Container>
      <Button fullWidth radius="md" mt="xl" size="md" variant="default">
        Follow
      </Button>


      </Card>



      <EducationFormModal open={opened}  onClose={close} />
    </>
  }

  console.log(avatar)
  return (
    <>
      {isLoadingUserInfo ? 'loading'  :
        content()
      }
    </>
  );
}
const UploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
}));

export default Account;