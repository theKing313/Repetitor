'use client';

import { Box } from '@mui/material';
import { Query } from 'appwrite';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import styles from './index.module.scss';

import { getAnnouncements as getAnnouncementsAPI } from '@/api';
import Info from './info';
import Header from '@/sheets/header';



const Announcement = ({ id }: { id: string }) => {
    const { data: announcement, mutate: getAnnouncement } = useMutation({
        mutationKey: ['announcement'],
        mutationFn: async (id: string) => {
            const response = await getAnnouncementsAPI([Query.equal('$id', id)]);

            if (!response) {
                throw new Error();
            }

            return response.documents.at(0);
        },
    });

    useEffect(() => {
        if (!id) return;

        getAnnouncement(id);
    }, [id]);

    if (!announcement) return null;

    console.log('announcement -', announcement);

    return (
        <Box className={styles.root}>
            <Header/>
            <Box className={styles.wrapper}>
                <Box className={styles.block}>
                    <Info {...announcement!} />
                    {/* <Slider photos={announcement.images} /> */}
                    {/* <Description description={announcement.description} /> */}
                    {/* <Parameters parameters={JSON.parse(announcement.parametrs)} /> */}
                    {/* <Map lng={announcement.longitude} lat={announcement.latitude} city={announcement.city.name} /> */}
                </Box>
                <Box>
                    
                </Box>
            </Box>
        </Box>
    );
};

export default Announcement;
