import { useState } from 'react';
import styles from './index.module.scss';
import { Box, Typography, Drawer, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { getAllSpecialist, getAnnouncements as getAnnouncementsAPI} from "@/api";
import { useProductStore } from '@/store/product';
import { Query } from 'appwrite';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
const ListSpecialist = ({list,role}:any) => {
    const router = useRouter();
    const searchParams = useSearchParams();


  const { products ,searchProducts,setProducts} = useProductStore();
  console.log(products)

    const updateURL = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        console.log(params)
        if (value === 'Все') {
            params.delete(key); // если выбрал "Все" — убираем фильтр
        } else {
            params.set(key, value);
        }

        params.set('mode', 'specialists'); // всегда оставляем mode=specialists

        router.push(`/announcements?${params.toString()}`, { scroll: false });
        // marketplace
    };
        // Преобразовать параметры URL в appwrite queries
    const getFiltersFromURL = () => {
        const filters: string[] = [];
        Object.keys(list).forEach((key) => {
            const value = searchParams.get(key);
            if (value) {
                filters.push(Query.equal(key, value));
            }
        });
        return filters;
    };
    const activeFilters = getFiltersFromURL();
    console.log(activeFilters)
    return (
        <Drawer variant="permanent" anchor="left" sx={{ width: 300, flexShrink: 0 }}>
            <Box sx={{ width: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Фильтры
            </Typography>
            {role === 'client'  && 
            
            Object.entries(list).map(([key, { label, options }]) => (
                <FormControl fullWidth margin="normal" key={key}>
                <Typography gutterBottom>{label}</Typography>
                <Box>
                    {/* Кнопка "Все" убирает фильтр */}
                    <MenuItem
                        onClick={() => updateURL(key, 'Все')}
                        selected={!searchParams.get(key)}
                    >
                        Все
                    </MenuItem>

                    {options.map((option) => (
                        <MenuItem
                            onClick={() => updateURL(key, option)}
                            key={option}
                            selected={searchParams.get(key) === option}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Box>
            </FormControl>
            ))
      
            }
     
            </Box>

            
        </Drawer>
    );
};

export default ListSpecialist;
