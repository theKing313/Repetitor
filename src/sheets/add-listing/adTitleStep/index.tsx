import { useState } from "react";
import styles from "./index.module.scss";
import { Box, Button, InputAdornment } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Query } from "appwrite";
// import { getKeyWords } from "@/api";
import { Autocomplete, TextField } from '@mui/material';
import { IKeyWords } from "@/types";
import { useAddListing } from "@/context/addListing";
import { useDebouncedCallback } from "@mantine/hooks";
import Checkbox from "@/ui/checkbox";
import DescriptionForm from "../descriptionForm";

const AdTitleStep = () => {
  const [selectedCategory, setSelectedCategory] = useState<boolean | null>(null);
  const popularQueries = [
    { id: 'forMyself', name: 'Для Себя' },
    { id: 'exams', name: 'Подготовка к экзамену' },
    { id: 'forKid', name: 'Для Ребенка' },
    { id: 'forWork', name: 'Для Работы' },
  ];
  const [direction, setDirection] = useState<any[]>([]);
  const handleCategoryClick = () => {
      setSelectedCategory(true)
  };
  const {setListing,listing}= useAddListing()


  const handleOptionChange = (type: 'single' | 'multi' | 'model', category: any) => {
    // setLang((prev) => [...prev, category]);
    setDirection([category])
    setListing({...listing,
      ad :category
    });

  };
  console.log(direction)
  return (
    <div className={styles.container}>
      {selectedCategory ?
      <DescriptionForm/>
      // <Upload/>
       : 
        <>
          <h1 className={styles.title}>Какая цель занятий?</h1>
          <p className={styles.subtitle}>
            Обучение программированию
          </p>
          <Box   sx={{ width: '100%',margin:'0 auto',display:'flex',flexDirection:'column',gap:'40px',  justifyContent:'center'}}>
              {popularQueries.map((category,id) => (
                            <Checkbox
                            // label, checked, onChange, variant
                            // variant={'checkbox'}
                            key={`${category.id}-${id}}`}
                            label={category.name}
                            // checked={ selectedFilters.selectedMultiOption !== undefined && selectedFilters.selectedMultiOption.some(item =>
                            //     item.id === category.id && item.currentValue.some(cv => cv.id === option.id)
                            // )}
                            checked={direction.some(item => item.id === category.id)}
        
                            onChange={() => handleOptionChange('multi', category)}
                            />
            ))}

          </Box>
          
          {direction.length && 
              <Button
                onClick={() => handleCategoryClick() }>
                  Далее
              </Button>
          }

        </>
      }

    </div>
  );
};

export default AdTitleStep;


