'use client'

import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import SearchListing from "../search";
import styles from './index.module.scss';
import { Button, TextField } from "@mui/material";
import { useAddListing } from "@/contexts/addListing";
import EditForm from "../editForm";
import DescriptionForm from "../descriptionForm";
const PriceForm: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const {setListing,listing}= useAddListing()
    console.log(listing.selectedOption)


    useEffect(()=>{
      if(listing?.price){
        setSearchQuery(listing.price)
      }
    },[listing])
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
    const handleCategoryClick = async () => {
        setSelectedCategory('true');
        setListing({...listing, price:searchQuery})
    };
   
  return (
    <>
           {selectedCategory ? 
                  <DescriptionForm/>
                :
                <div className={styles.container}>
                <h1 className={styles.title}>Prix</h1>
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

export default PriceForm;
