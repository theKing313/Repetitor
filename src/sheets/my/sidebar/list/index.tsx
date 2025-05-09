import { useState } from 'react';
import styles from './index.module.scss';
import { Box, Typography, Drawer, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { getAllSpecialist, getAnnouncements as getAnnouncementsAPI} from "@/api";
import { usePathname, useRouter } from 'next/navigation';
import { useProductStore } from '@/store/product';
import { Query } from 'appwrite';
import { useMutation } from '@tanstack/react-query';
const List = ({list,role}:any) => {
    console.log(Object.entries(list))
 

    const [query, setQuery] = useState('');
    const handleChange = (key:string  ,name:string)=>{
        console.log(key)
        console.log(name)
        setQuery((prev) => ({
            ...prev,       
            [key]: name,  
          }));
        if (name === 'Все специалисты'){

        }
    }
    console.log(query)
    // getAllSpecialist
    const { mutate: getSpecialist, isPending: isLoadingSpecialist } = useMutation({
        mutationKey: ['getSpecialist'],
        mutationFn: async (queries: string[]) => {
            const response = await getAllSpecialist(queries);
            console.log(response)
            if (!response) {
                throw new Error();
            }
            setProducts(response.documents)
        },
        onError: () => { },
    });
    const { mutate: getAnnouncements, isPending: isLoadingAnnouncement } = useMutation({
        mutationKey: ['announcements'],
        mutationFn: async (queries: string[]) => {
            const response = await getAnnouncementsAPI(queries);
            console.log(response)
            if (!response) {
                throw new Error();
            }
            setProducts(response.documents)
        },
        onError: () => { },
    });

  const { products ,searchProducts,setProducts} = useProductStore();
  console.log(products)

    const handleSearch = () => {
        const filters = Object.entries(query).map(([key, value]) => Query.equal(key, value));
        console.log(filters)
        getAnnouncements(filters)
    };
    return (
        <Drawer variant="permanent" anchor="left" sx={{ width: 300, flexShrink: 0 }}>
            <Box sx={{ width: 300, p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Фильтры
            </Typography>
            {role === 'client'  ? 
            
            Object.entries(list).map(([key, { label, options }]) => (
                <FormControl fullWidth margin="normal" key={key}>
                <Typography gutterBottom>{label}</Typography>
                <Box
                    // value={selected[key] || ''}
                    // label={label}
                >
                    {options.map((option) => (
                        <MenuItem onClick={() => handleChange(key, option)} value={option} key={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Box>
                </FormControl>
            ))
            :
            
            Object.entries(list).map(([key, { label, options }]) => (
                <FormControl fullWidth margin="normal" key={key}>
                <InputLabel>{label}</InputLabel>
                <Select
                    // value={selected[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    label={label}
                >
                    {options.map((option) => (
                        <MenuItem value={option} key={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            ))
            }
     
            </Box>
            {role === 'specialist'  && 
            <Button onClick={handleSearch}>Найти</Button>
            }
            
        </Drawer>
    );
};

export default List;
