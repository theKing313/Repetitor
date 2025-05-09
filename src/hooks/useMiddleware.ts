import { getRoleUser, getUserInfoApi } from '@/api';
import getUser from '@/utils/getUser';
import { usePathname, useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';

export default () => {
    const pathname = usePathname();
    const router = useRouter();
    const userID = getUser()?.$id;
    
    const [user, setUser] = useState<{ role: string } | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Новый стейт для контроля загрузки

    useLayoutEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getUserInfoApi(userID);
                console.log(currentUser)
                setUser(currentUser);
            } catch (e) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [userID]);

    useLayoutEffect(() => {
        console.log(user)

        if (!isLoading && pathname === '/' && user?.role ==='specialist') {
            router.replace(`/announcements?mode=${user.role}`);
            // ?mode=specialists
        }
        if( user?.role ==='client' || pathname === '/'){
            router.replace(`/announcements?mode=${user?.role}`);
            // router.replace(`/responses?mode=${user?.role}`);
        }
        // else{
        //     router.replace('/responses');
        // }
    }, [pathname, user, isLoading]);
};
