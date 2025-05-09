'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import styles from './index.module.scss';

import { getUserById } from '@/api';

import Button from '@/ui/button';
import UserAvatar from '@/shared/user-avatar';
import { useEffect, useState } from 'react';
import getUser from '@/utils/getUser';
import { Skeleton } from '@mui/material';

const User = () => {
 
    const skeletons = () =>
        Array(4)
            .fill(null)
            .map((_, idx) => <Skeleton key={idx} />);


    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadUserInfo = async () => {
            try {
                const sessionString = localStorage.getItem('user') || null;
                if (!sessionString) {
                    console.error('No session found!');
                    return;
                }
                const session = JSON.parse(sessionString);
                const userId = session.userId;
                if (!userId) {
                    console.error('No userId found in session!');
                    return;
                }
                const userInfo = await getUserById(userId);
                setUser(userInfo);
            } catch (error) {
                console.error('Error fetching user info:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUserInfo();
    }, []);

    // const { data: user } = useQuery({
    //     queryKey: ['user'],
    //     queryFn: () => getUserById(id),
    // });
    // const [user, setUser] = useState<any>(null);

    // if (!user) return null;

    return (
        <div className={styles.root}>
           {/* {loading && skeletons() } */}
           <div className={styles.avatar}>
                            <div className={styles.image}>
                                <UserAvatar avatar={user?.image_url} isVerify={user?.verified} user={{ width: 112, height: 112 }} guard={{ width: 24, height: 24 }} />
                            </div>
                            <div className={styles.info}>
                                <p className={styles.name}> {user?.name ?user?.name : "loading..."} </p>
                                {/*  */}
                                <ul className={styles.stars}>
                                    {Array(5)
                                        .fill(null)
                                        .map((_, idx) => (
                                            <li key={idx}>
                                                <Image src={'/panel/images/profile/star.svg'} width={16} height={16} alt="star" />
                                            </li>
                                        ))}
                                </ul>
                                <p className={styles.grade}>5</p>
                            </div>
                            <p className={styles.date}>Sur le service de 12.07.2022</p>
                        </div>
                        <Button className={styles.button} color="white">
                            <Image src={'/panel/images/profile/camera.svg'} width={16} height={16} alt="camera" />
                            <span>Text</span>
                        </Button>
        </div>
    );
};
export default User;
