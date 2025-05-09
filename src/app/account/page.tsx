'use client';

import { useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import styles from './index.module.scss';

import Account from '@/sheets/account';

const Page = () => {
    const searchParams = useSearchParams();

    // if (id) return <Announcement id={id} />;
    return (
        <Box>
            <Box className={styles.wrapper} >
                <Account/>
            </Box>
        </Box>
    );
};

export default Page;
