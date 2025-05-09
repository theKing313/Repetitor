import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Upload from "../upload";
import { useMutation } from "@tanstack/react-query";
import { getSubCategoriesAPI } from "@/api";
import { Query } from "appwrite";
import { ISubCategories } from "@/types";
import ContentLoader from "react-content-loader";
import { useAddListing } from "@/context/addListing";
import {  Select } from "@mantine/core";
import Checkbox from "@/ui/checkbox";
import { Button } from "@mui/material";
import AdTitleStep from "../adTitleStep";

interface Icategory{
  categoryId:string
}
const languages = [
  { id: 'js', name: 'JavaScript' },
  { id: 'ts', name: 'TypeScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'php', name: 'PHP' },
  { id: 'go', name: 'Go' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'rust', name: 'Rust' },
  { id: 'dart', name: 'Dart' },
  { id: 'scala', name: 'Scala' },
  { id: 'perl', name: 'Perl' },
  { id: 'r', name: 'R' },
  { id: 'sql', name: 'SQL' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'bash', name: 'Bash' }
]
const Announcement= () => {
    const {setListing,listing}= useAddListing()
  const [selectedAnnonce, setSelectedAnnonce] = useState<null | boolean>(null);
  const [subCategories, setSubCategories] = useState<ISubCategories[]>(languages);
  
  const { mutate: getSubCategories, isPending: isLoadingCategories } = useMutation({
    mutationKey: ['subCategories'],
    mutationFn: async (queries: string[]) => {
        // const response = await getSubCategoriesAPI(queries);
        // if (!response) {
        //     throw new Error();  
        // }
        // setSubCategories((prev) => [...prev, ...response.documents]);
    },
    onError: () => { },
  });

  const [lang, setLang] = useState<any[]>([]);

  const handleOptionChange = (type: 'single' | 'multi' | 'model', category: any) => {
    setLang((prev) => [...prev, category]);
    // setLang((prev) => {
    //   if (prev.find((id) === )) {
    //     // Если язык уже выбран — удаляем
    //     return prev.filter(item => item !== lang);
    //   } else {
    //     // Если языка нет — добавляем
    //     return [...prev, lang];
    //   }
    // });
  };
  const handleCategoryClick = () => {
    setSelectedAnnonce(true);
  };
  console.log(lang)
  const skeletons = () =>
    Array(20)
        .fill(null)
        .map((_, idx) =>
          <Skeleton key={idx}    />
    );
    console.log(subCategories)
  return (
    <>
            {selectedAnnonce ? 
                  // <Upload  />
                  <AdTitleStep/>
                  // <SearchListing/>
                  // <Features />
                  // ''
              :
                <>
                 <div className={styles.container}>
                    <h1 className={styles.title}>Обучение программированию</h1>
                    <p className={styles.subtitle}>Язык программирования</p>
                    <ul className={styles.list}>
                    {
                      isLoadingCategories || subCategories.length <= 0? 
                      skeletons() :
                        subCategories.map((category,id) => (
                                <Checkbox
                                // label, checked, onChange, variant
                                variant={'checkbox'}
                                key={`${category.id}-}`}
                                label={category.name}
                                // checked={ selectedFilters.selectedMultiOption !== undefined && selectedFilters.selectedMultiOption.some(item =>
                                //     item.id === category.id && item.currentValue.some(cv => cv.id === option.id)
                                // )}
                                checked={lang.some(item => item.id === category.id)}

                                onChange={() => handleOptionChange('multi', category)}
                                />
 
                        ))
                    }
                    </ul>

                  {!listing?.selectedMultiOption  &&
                          <Button
                            onClick={() => handleCategoryClick() }>
                              Далее
                          </Button>
                    }


                 </div>
                </>
              }
    
    </>
   
  );
};

export default Announcement;
const Skeleton = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
      setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
        <ContentLoader
        speed={2} 
        width={`100%`} 
        height={54} 
        viewBox="0 0 100% 54" 
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="54" />
    </ContentLoader>
  );
};


