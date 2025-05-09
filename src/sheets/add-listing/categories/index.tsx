'use client'
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Announcement from "../announcement";
import { useMutation } from "@tanstack/react-query";
// import { getCategoriesAPI } from "@/api";
import type { ICategories } from '@/types';
import { useAddListing } from "@/context/addListing";
import ContentLoader from 'react-content-loader';
import { Typography } from "@mui/material";
import SignUp from "../registration";
// import { useAddListing } from "@/contexts/addListing";
const directions = [
  {
    id: 'web-dev',
    title: 'Веб-разработка',
    description: 'Создание сайтов, интернет-магазинов и веб-приложений.',
  },
  {
    id: 'mobile-dev',
    title: 'Разработка мобильных приложений',
    description: 'Создание приложений для Android и iOS.',
  },
  {
    id: 'data-science',
    title: 'Аналитика данных и машинное обучение',
    description: 'Работа с данными, построение моделей и предсказаний.',
  },
  {
    id: 'game-dev',
    title: 'Разработка игр',
    description: 'Создание 2D и 3D игр для различных платформ.',
  },
  {
    id: 'cybersecurity',
    title: 'Кибербезопасность',
    description: 'Защита данных, тестирование на проникновение, безопасность систем.',
  },
  {
    id: 'sysadmin-devops',
    title: 'Системное администрирование и DevOps',
    description: 'Работа с серверами, автоматизация процессов разработки.',
  },
  {
    id: 'software-engineering',
    title: 'Разработка ПО',
    description: 'Проектирование и создание сложных программных систем.',
  },
];
const Categories: React.FC = () => {
  
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<ICategories[]>(directions);
  const {setListing,listing}= useAddListing()
 
  const { mutate: getCategories, isPending: isLoadingCategories } = useMutation({
      mutationKey: ['categories'],
      mutationFn: async (queries: string[] = []) => {
          // const response = await getCategoriesAPI(queries);
          // if (!response) {
          //     throw new Error();
          // }
          // setCategories((prev) => [...prev, ...response.documents ]);
      },
      onError: () => { },
  });
    useEffect(() => {
      getCategories([]);
    }, []);
    
  const handleCategoryClick = (id: string) => {
    // setListing((prev) => [...prev,{selectedCategory:id}])
    setListing({...listing, subcategoryId:id})
    setSelectedCategory(id);
  };
  const skeletons = () =>
    Array(8)
        .fill(null)
        .map((_, idx) =>
          <Skeleton key={idx}    />
    );
  console.log(listing)
  return (
    <div className={styles.container}>
   
        {selectedCategory ? 
                    <SignUp/>
                    // <Announcement categoryId={selectedCategory}/>
        :
            <>
            <h1 className={styles.title}>Выбирете направление </h1>
            {/* <p className={styles.subtitle}>Sélectionnez la catégorie souhaitée</p> */}
            <div className={`${styles.grid} ` }>

            {
              isLoadingCategories || categories.length <= 0? 
              skeletons() :
                categories.map((category,id) => (
                  <div
                  key={id}
                  className={`${styles.card} ${selectedCategory === category.$id ? styles.selected : ""}`}
                  onClick={() => handleCategoryClick(category.id )}
                  sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                  >
                  {/* <p className={styles.title}>{category.title}</p> */}
                     <Typography
                      variant="h5"
                      sx={{
                        fontSize:'20px',
                        background: 'linear-gradient(90deg, #00d2ff, #3a47d5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold',
                        letterSpacing: '1px',

                      }}
                    >
                      {category.title}
                    </Typography>
                    <img src={category.image} alt={category.name} className={styles.image} />
                  </div>
              ))
            }
            </div>
            </>
        }
    </div>
  );
};

export default Categories;

const Skeleton = () => {
    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
          <ContentLoader
          speed={2} 
          width={310} 
          height={150} 
          viewBox="0 0 310 150" 
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
      >
          <rect x="0" y="0" rx="10" ry="10" width="310" height="150" />
      </ContentLoader>
    );
};

