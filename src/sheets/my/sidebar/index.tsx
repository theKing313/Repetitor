'use client'

// import User from './user';
import List from './list';

import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import getUser from '@/utils/getUser';
import { getRoleUser } from '@/api';
import { clientList,specialistList } from './list/data';
import { Drawer } from '@mui/material';
import ListSpecialist from './ListSpecialist';

const Sidebar = () => {
    const [role, setRole] = useState<'client' | 'specialist' | null>(null);
    useEffect(() => {
        async function fetchRole() {
          const userID = getUser().$id;      
          const currentUser = await getRoleUser(userID);
          console.log(currentUser)
          setRole(currentUser?.role || 'specialist'); // default customer
        }
        fetchRole();
    }, []);
    const menuData = role === 'specialist' ?specialistList   : clientList;

        return (
        <div className={styles.root}>
            {/* <User /> */}
            {/* <List list={menuData} role={role}/> */}
            <Drawer variant="permanent" anchor="left" sx={{ width: 300, flexShrink: 0 }}>
                {role === 'specialist' ? <List role={role} list={menuData} />  : <ListSpecialist role={role} list={menuData} /> }
            </Drawer>
        </div>
    );
};

export default Sidebar;
