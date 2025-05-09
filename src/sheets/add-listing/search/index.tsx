'use client'
import Search from "@/ui/search";
import styles from "./index.module.scss";
import { Button } from "@mui/material";


import { ChangeEvent, FC, useState } from 'react'
import { useQuery }  from '@tanstack/react-query';
import {   TextField, InputAdornment } from '@mui/material';
import { useDebounce } from '@/hooks/useDebounce'
import SearchIcon from '@mui/icons-material/Search';

// import {  } from '@/api';
import { Query } from 'appwrite';
import { IMessage } from '@/types';
import { useAddListing } from "@/contexts/addListing";
import AdTitleStep from "../adTitleStep";

interface IMessagesResponse {
  documents: IMessage[];
}
const SearchListing: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 500)
    const {setListing,listing}= useAddListing()
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
      const handleCategoryClick = async () => {
          setListing({...listing,
            title :searchQuery
          });
          setSelectedCategory('true');
      };
  return (
    <>
           {selectedCategory ? 
                  <AdTitleStep/>
                :
                <div className={styles.container}>
                <h1 className={styles.title}>Indiquez le titre de l'annonce</h1>
                <p className={styles.subtitle}>Lorem ipsum dolor sit amet consectetur. Leo velit leo vitae aenean blandit urna.</p>
                <div className={styles.section}>
                <TextField
                    className={styles.search}
                    placeholder={`Titre de l'annonce`}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    />
                </div>
                {searchQuery.length > 0 && 
                    <div className={styles.button}>
                            <Button onClick={() => handleCategoryClick() } component="span" className={`${styles.nextButton} ${styles.imageSend}`} > 
                             Suivant
                            </Button>
                    </div>
                }
            </div>
           }
    
    </>

  );
};

export default SearchListing;
