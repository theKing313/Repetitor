'use client'
import Responses from '@/sheets/responses';
import styles from './index.module.scss';
import { Box } from '@mui/material';
import Header from '@/sheets/header';
import Sidebar from '@/sheets/my/sidebar';

const Page = () => {
    return (
        <Box >
            <Header/>
            <Box className={styles.wrapper} style={{display:'flex'}} >
        
                <Sidebar />
                <Responses />
            </Box>
        </Box>
    );
};

export default Page;
