'use client'
import { useState } from "react";
import styles from './index.module.scss';
import { Button,  TextField } from "@mui/material";
import { useAddListing } from "@/context/addListing";
import TimeEducation from "../timeEducation";
const DescriptionForm: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
    const [description, setDescription] = useState('');
    const {setListing,listing}= useAddListing()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    };
    const handleCategoryClick = async () => {
        setSelectedCategory('true');
        setListing({...listing, desc:description})
    };
  return (
    <>
           {selectedCategory ? 
                  // <EditForm/>
                  <TimeEducation/>
                  // <SearchListing/>
                :
                <div className={styles.container}>
                <h1 className={styles.title}>
                В чём нужна помощь?</h1>
                <div className={styles.section}>
                  <TextField
                            fullWidth
                            multiline
                            rows={6}
                            variant="outlined"
                            placeholder="Entrez le texte"
                            value={description}
                            onChange={handleChange}
                            sx={{
                              backgroundColor: "#F3F4F7",
                              borderRadius: "10px",
                              "& fieldset": { border: "none" },
                            }}
                          />

                </div>
                {description.length <= 0 ? 
                    <div className={styles.button}>
                            <Button onClick={() => handleCategoryClick() } component="span" className={`${styles.nextButton} ${styles.imageSend}`} > 
                             Пропустить 
                            </Button>
                    </div>
                    :
                    <div className={styles.button}>
                          <Button onClick={() => handleCategoryClick() } component="span" className={`${styles.nextButton} ${styles.imageSend}`} > 
                              Продолжить 
                          </Button>
                    </div>
                }
            </div>
           }
    </>
  );
};

export default DescriptionForm;
