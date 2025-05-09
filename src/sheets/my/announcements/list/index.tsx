'use client';

import { useQuery } from '@tanstack/react-query';

import { getAnnouncements } from '@/api';

import styles from './index.module.scss';

import Announcement from '@/shared/announcement';
import Skeleton from '@/shared/announcement/skeleton';

const List = () => {
    const skeletons = () =>
        Array(12)
            .fill(null)
            .map((_, idx) => <Skeleton key={idx} />);

    const { data: announcements, isLoading: isLoadingAnnouncement } = useQuery({
        queryKey: ['announcements'],
        queryFn: async () => {
            const response = await getAnnouncements();

            if (!response) {
                throw new Error();
            }

            return response.documents!;
        },
    });

    return (
        <ul className={styles.root}>
            {isLoadingAnnouncement ? skeletons() : announcements!.map((announcement) => <Announcement key={announcement.$id} {...announcement} variant="edit" />)}
        </ul>
    );
};

export default List;
