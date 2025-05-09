'use client';

import { useSearchParams } from 'next/navigation';

import { Box } from '@mui/material';

import styles from './index.module.scss';
import Sidebar from '@/sheets/my/sidebar';
import Announcements from '@/sheets/my/announcements';
import Header from '@/sheets/header';
import Announcement from '@/sheets/my/announcement';

const Page = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (id) return <Announcement id={id} />;
    return (
        <Box>
            <Header/>
            <Box className={styles.wrapper} >
        
                <Sidebar />
                <Announcements />
            </Box>
        </Box>
    );
};

export default Page;
