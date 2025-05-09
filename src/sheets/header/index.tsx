'use client'
import { IconSearch } from '@tabler/icons-react';
import { Autocomplete, Box, Burger, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './index.module.scss';
import getUser from '@/utils/getUser';
import { getAnnouncements as getAnnouncementsAPI} from "@/api";
const links = [
  { link: '/responses', label: 'Мои отклики' },
  { link: '/account', label: 'Моя анкета' },
  { link: '/announcements', label: 'Новые заявки' },
  { link: '/community', label: 'Поддержка' },
];
import { IconAt, IconPhoneCall } from '@tabler/icons-react';
import { Avatar,  Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/product';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Query } from 'appwrite';
import Link from 'next/link';
import Image from 'next/image';

const  Header = () =>  {
  const [opened, { toggle }] = useDisclosure(false);
  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      // onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </a>
  ));
  const user = getUser();
  const router = useRouter();
  
    const { mutate: getAnnouncements, isPending: isLoadingAnnouncement } = useMutation({
        mutationKey: ['announcements'],
        mutationFn: async (queries: string[]) => {
            const response = await getAnnouncementsAPI(queries);
            if (!response) {
                throw new Error();
            }
            setProducts(response.documents)
        },
        onError: () => { },
    });
  const handleUser = ()=>{
    router.push('/account')
  }
  const { products ,searchProducts,setProducts} = useProductStore();
  console.log(products)
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    getAnnouncements([Query.search("title", query)])
  };
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
    
          <Link href={'./'}>
              <Image alt="logo" src="/logo.png" width={100} height={100}/>
          </Link>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Autocomplete
                className={classes.search}
                placeholder="Поиск по названию"
                value={query}
                onChange={setQuery}
                data={['JavaScript', 'Python', 'React', 'TypeScript']}
                visibleFrom="xs"
                leftSection={<IconSearch size={16} stroke={1.5} />}
              />
              <Button variant="light" color="blue" onClick={handleSearch}>
                <IconSearch size={18} /> 
              </Button>
          </div>
        </Group>
        <Group style={{cursor:'pointer'}} align="center" onClick={handleUser}>
            {user === undefined ? (
              <>
                <Button>Вход для специалистов</Button>
                <Button>Вход для клиентов</Button>
              </>
            ) : (
              <Group wrap="nowrap" align="center" gap="sm">
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  size="md"
                  radius="md"
                />
                <Box style={{ lineHeight: 1 }}>
                  <Text fz="sm" fw={500}>
                    {user.name}
                  </Text>
                  <Group wrap="nowrap" gap={6}>
                    <IconAt size={14} />
                    <Text fz="xs" c="dimmed">
                      robert@glassbreaker.io
                    </Text>
                  </Group>
                  <Group wrap="nowrap" gap={6}>
                    <IconPhoneCall size={14} />
                    <Text fz="xs" c="dimmed">
                    {user.email}
                    </Text>
                  </Group>
                </Box>
              </Group>
              )}
            </Group>
      </div>
    </header>
  );
}

export default Header;