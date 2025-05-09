'use client';
import styles from './index.module.scss';
import { IconShortArrow } from '@/icons/short-arrow';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from "react";

import Switch from '@/ui/switch';
// import Search from '@/ui/search';
import Button from '../ui/button';
import Select from '../ui/selectItem/select';
import { useAddListing } from '@/contexts/addListing';
import { getCategoryFiltersAPI, getManufacturerAPI, getModelsAPI } from '@/api';
import { Query } from 'appwrite';
import { useMutation } from '@tanstack/react-query';
import Checkbox from '@/ui/checkbox';
import { ICategoryFilter, ICategoryOptions, ICategoryParameters,  IManufacturerSubcategory, IModels, IOptions, SelectedFilters } from '@/types';
import EditForm from '../editForm';
import PriceForm from '../priceForm';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import { useDebounce } from '@/hooks/useDebounce';
import Search from '@/ui/search';

const Features = () => {
    const {setListing,listing}= useAddListing()
    const annonce = listing?.subcategoryId;
    const [categories, setCategories] = useState<ICategoryFilter[]>([]);
    const { mutate: getCategoryFilters, isPending: isLoadingCategories } = useMutation({
        mutationKey: ['categoryFilters'],
        mutationFn: async (queries: string[]) => {
            const response = await getCategoryFiltersAPI(queries);
            if (!response) {
                throw new Error();  
            }
            setCategories((prev) => [...prev, ...response.documents]);
        },
        onError: () => { },
      });
    useEffect(() => {
        if (annonce) {
            getCategoryFilters([Query.equal("subcategoryId", annonce)]);
        }
    }, [annonce]);


    const parsedCategories = useMemo(() => {
        return categories
            .map(category => {
                if (typeof category.parameters === "string") {
                    try {
                        return JSON.parse(category.parameters);
                    } catch (error) {
                        console.error("Ошибка парсинга JSON:", error);
                        return null;
                    }
                }
                return category.parameters;
            })
            .filter(Boolean) ;
    }, [categories]); 

    useEffect(() => {
        if(parsedCategories.find(category => category.hasMark)){
            getManufacturer([Query.equal("subcategoryId", annonce !==undefined  &&  annonce)])
        }
    },[parsedCategories])
    console.log(parsedCategories)

    //models
    const [models,setModels] = useState<IModels[]>([])
    const { mutate: getModels, isPending: isLoadingModels } = useMutation({
        mutationKey: ['Models'],
        mutationFn: async (queries: string[]) => {
            const response = await getModelsAPI(queries);
            if (!response) {
                throw new Error();  
            }
            // setModels((prev) => [...prev, ...response.documents]);
            setModels(response.documents);
        },
        onError: () => { },
    });
    const parsedModels = useMemo(() => {
        return models.map(category => {
            
            try {
                const params = typeof category.parameters === "string"
                    ? JSON.parse(category.parameters.replace(/'/g, '"'))
                    : category.parameters;

                return {
                    ...category,
                    parameters: Array.isArray(params) ? params : Object.values(params),
                };
            } catch (error) {
                console.error("Ошибка парсинга JSON:", error);
                return category;
            }
        }).filter(Boolean);
    }, [models]);
    console.log(models)
    console.log(parsedModels)
 
    //manufacrurer
    const [manufacturer,setManufacturer] = useState<IManufacturerSubcategory[]>([])
    const { mutate: getManufacturer, isPending: isLoadingManufacturer } = useMutation({
        mutationKey: ['categoryFilters'],
        mutationFn: async (queries: string[]) => {
            const response = await getManufacturerAPI(queries);
            if (!response) {
                throw new Error();  
            }
            setManufacturer((prev) => [...prev, ...response.documents]);
        },
        onError: () => { },
      });
    //   console.log(manufacturer)


    useEffect(()=>{
        if(parsedCategories.find(category => category.hasModel) && listing.manufacturerID){
            getModels([Query.equal("manufacturerId", listing.manufacturerID)])
        }
    },[manufacturer])
    // const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value: string,category:ICategoryOptions) => {
        // setInputValue(event.target.value);
        console.log(category)
        setSelectedFilters(prev => {
            const updatedCategory = {
                ...category,
                currentValue: value//   category.options.find(option => String(option.id) === String(optionId)) || null 
            };
            return {
              ...prev,
              selectedOption: {
                [category.id]:{
                    ...updatedCategory
                }
              },
            };
        })
        // setListing({...listing,
        //     inputValue:value
        // });
        // setInputValue((prev) => [...prev, event.target.value]);
    };
    const [searchQuery, setSearchQuery] = useState('');
    const [searchModels, setSearchModels] = useState('');
    const handleSearchChange = (event: React.SyntheticEvent | null, newValue: string) => {
        if (newValue) {
            const manufacturers = manufacturer.find(m => m.manufacturers.name === newValue);
            if (manufacturers) {
                setSearchQuery(manufacturers.manufacturers.name);
                if(parsedCategories.find(category => category.hasModel)){
                    getModels([Query.equal("manufacturerId", manufacturers.manufacturers.$id)])
                    setListing({...listing,
                        manufacturerID:manufacturers.manufacturers.$id
                    });
                }
            }
        } else {
            setSearchQuery('');
        }
    };
    const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
    const handleSearchModels = (event: React.SyntheticEvent | null, newValue: string) => {
        if (newValue) {
            const model = parsedModels.find(m => m.name === newValue);
            console.log(model)
 
            if (model) {
                setSearchModels(model.name);

                setSelectedModel(model);
            }
        } else {
            setSelectedModel(null);
            setSearchModels('');
        }
    };
    
    
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        selectedOption: {},
        selectedMultiOption: [],
        selectedModels: {} ,
      });
    const handleOptionChange = (type: 'single' | 'multi' | 'model', categoryId: string, optionId: string, category:ICategoryOptions) => {
        console.log(type )
         console.log(category)
        
        setSelectedFilters(prev => {
          let updatedData;

          if (type === 'multi' && prev.selectedMultiOption !== undefined) {
            const existing = prev.selectedMultiOption.find(item => item.id === categoryId);
            const { options, ...filteredCategory } = category ;
            const newValue = options.find(item => String(item.id) === String(optionId));
      
            if (!existing) {
              updatedData = [...prev.selectedMultiOption, { ...filteredCategory, currentValue: [newValue] }];
            } else {
              const updatedCurrentValue = existing.currentValue.some(cv => cv.id === optionId)
                ? existing.currentValue.filter(item => item.id !== optionId)
                : [...existing.currentValue, newValue];
      
              updatedData = prev.selectedMultiOption.map(item =>
                item.id === categoryId ? { ...item, currentValue: updatedCurrentValue } : item
              );
            }
      
            return { ...prev, selectedMultiOption: updatedData };
          } 
          
          if (type === 'model') {
            return {
              ...prev,
              selectedModels: {
                ...prev.selectedModels,
                [categoryId]: {
                  ...category,
                  currentValue: category.options.find(opt => String(opt.id) === String(optionId)) || null,
                },
              },
            };
          }

          const { options, ...filteredCategory } = category;     
          const curValue  = category.options ? category.options.find(option => String(option.id) === String(optionId))  : optionId
          const updatedCategory = {
              ...filteredCategory,
              currentValue: curValue//   category.options.find(option => String(option.id) === String(optionId)) || null 
          };
          return {
            ...prev,
            selectedOption: {
              ...prev.selectedOption,
              [categoryId]: {
                ...updatedCategory,
              },

            //   [categoryId !== undefined ? categoryId : type]: { // Todo : type is the same for all type of numbers
            //     ...updatedCategory,
            //   },
            },
          };
        });
      };



    const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
    const handleCategoryClick = async () => {
        
        setSelectedCategory('true');
   
        setListing({...listing,
            selectedOption:selectedFilters.selectedOption,
            selectedMultiOption: selectedFilters.selectedMultiOption,
            mark:searchQuery,
            models :selectedFilters.selectedModels
         });
    };
    console.log(selectedFilters)
    

    useEffect(()=>{
      if(listing?.selectedMultiOption && listing?.selectedOption){
        setSelectedFilters(prev => ({
        ...prev,
        selectedMultiOption: listing?.selectedMultiOption || [],
        selectedOption: listing?.selectedOption || {},
        selectedModels: listing?.models || {},
        }));
        setSearchQuery(listing?.mark || '');

      }
    },[listing])
    console.log(parsedModels);
    console.log(parsedCategories);
    // parsedModels.flatMap(category => category.parameters || [])
    //     .map((category, categoryIndex) => (
    //         console.log(category)
    //     ))
    return (
      <>
        {selectedCategory ?
        // <EditForm/>:
         <PriceForm/> : 
            <div className={styles.container}>
                <h2 className={styles.title}>Caractéristiques</h2>
                <div className={styles.section}>
                <>
                    {parsedCategories.flatMap(category => category.parameters || []).map((category, categoryIndex) => (
                        <div key={`${category.id}-${categoryIndex}`}>
                            {category.type === 'number' ?
               
                                <Select label={`${category.nameFr}`}>
                                    <Box   sx={{ width: '100%'}}>
                                            <div className={styles.manufacturer} >
                                                <TextField
                                                    className={styles.searchSingle}
                                                    placeholder={`${category.type}`}
                                                    // value={listing.inputValue }
                                                    value={selectedFilters?.selectedOption !== undefined ? selectedFilters?.selectedOption[category.id]?.currentValue : null}
                                                    // value={listing?.selectedOption !== undefined && listing?.selectedOption['single'] ? listing?.selectedOption['single'].currentValue: null}
                                                    onChange={(e) => {
                                                        handleInputChange(e.target.value,category);
                                                      }}
                                                    // onChange={handleInputChange(category.id)}
                                                    InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                        <SearchIcon style={{ color: '#ED5434' }} />
                                                    </InputAdornment>
                                                    ),
                                                    }}
                                                />
                                            </div>
                                    </Box>
                                </Select>
                  
                             : 
                                <Select label={`${category.nameFr}`}>
                                     {renderFilterOptions(category, handleOptionChange, selectedFilters)}
                                </Select>
                            }
                      
                        </div>
                    ))}
                </>
                  <Select label={`manufacturers`}>
                    <Box   sx={{ width: '100%',margin:'0 auto',display:'flex',justifyContent:'center'}}>
                        {/* Search */}
                        <Autocomplete
                        disablePortal
                        value={searchQuery}
                        onInputChange={handleSearchChange} 
                        onChange={handleSearchChange} 
                        sx={(theme) => ({
                            display: 'inline-block',
                            '& .MuiOutlinedInput-root': {
                                paddingRight: '10px!important',
            
                            },
                            })}
        
                        options={manufacturer.map((message) => message.manufacturers.name) || []}
                        className={styles.input}
                        renderInput={(params) => (
                            <div className={styles.manufacturer} ref={params.InputProps.ref}>
                                <TextField
                                    {...params}
                                    className={styles.search}
                                    placeholder="text"
                                    InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <SearchIcon style={{ color: '#ED5434' }} />
                                    </InputAdornment>
                                    ),
                                    }}
                                />
                            </div>
                            )}
                        />
                    </Box>
                        {/* )} */}
                   </Select>
                  
                   {models  && searchQuery && 
                    <>
                        <Select label={`Models`} overflow="auto" >
                            <Box   sx={{ width: '100%',margin:'0 auto',display:'flex',justifyContent:'center'}}>
                                {/* Search */}
                                <Autocomplete
                                disablePortal
                                value={searchModels}
                                onInputChange={handleSearchModels} 
                                onChange={handleSearchModels} 
                                sx={(theme) => ({
                                    display: 'inline-block',
                                    '& .MuiOutlinedInput-root': {
                                        paddingRight: '10px!important',
                    
                                    },
                                    })}
                
                                options={parsedModels.map((message) => message?.name) || []}
                                className={styles.input}
                                renderInput={(params) => (
                                    <div className={styles.manufacturer} ref={params.InputProps.ref}>
                                        <TextField
                                            {...params}
                                            className={styles.search}
                                            placeholder="text"
                                            InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                <SearchIcon style={{ color: '#ED5434' }} />
                                            </InputAdornment>
                                            ),
                                            }}
                                        />
                                    </div>
                                    )}
                                />
                            </Box>
                        </Select>
                    </>
                    }
                    {searchModels &&
                            <Select label ="parameters" overflow="auto" >
                                   {selectedModel?.parameters?.map((param) => (
                                       <div key={param.id}>
                                           <Select  label={`${param.nameFr}`}>
                                               {param.options?.length > 0 && (
                                                   renderFilterOptions(param, handleOptionChange, selectedFilters)
                                               ) }
                                           </Select>
                                       
                                       </div>
                                   ))}
                            </Select>
                    }
    

              
                </div>

                {!listing?.selectedMultiOption  &&
                      <Button
                    //   selectedFilters.selectedOption !== undefined
                    //   disabled ={!!selectedFilters.selectedOption !== undefined}
                        //   disabled={!!(Object.keys(selectedFilters.selectedOption).length === 0 && selectedFilters.selectedMultiOption.length === 0)}
                        onClick={() => handleCategoryClick() }>
                          Suivant
                      </Button>
                }
            </div>
          } 
      </>

    );
};

export default Features;

const renderFilterOptions = (category: ICategoryParameters, handleOptionChange: Function, selectedFilters: SelectedFilters) => {
    // console.log(category)
    switch (category.type) {
        case 'option':
        case 'singleoption':
            return category.options.map((option:ICategoryOptions, optionIndex:number) => (
                <Checkbox
                    key={`${option.id}-${optionIndex}`}
                    label={option.nameFr}
                    checked={ selectedFilters.selectedOption !== undefined && selectedFilters.selectedOption[category.id]?.currentValue?.id === option.id}
                    onChange={() => handleOptionChange('single', category.id, option.id, category)}
                />
            ));
        case 'multioption':
            return category.options.map((option:ICategoryOptions, optionIndex:number) => (
                <Checkbox
                    variant={'checkbox'}
                    key={`${option.id}-${optionIndex}`}
                    label={option.nameFr}
                    checked={ selectedFilters.selectedMultiOption !== undefined && selectedFilters.selectedMultiOption.some(item =>
                        item.id === category.id && item.currentValue.some(cv => cv.id === option.id)
                    )}
                    onChange={() => handleOptionChange('multi', category.id, option.id, category)}
                />
            ));
        default:
            return <Checkbox
            key={`${category.id}`}
            label={category.name}
            // checked={ selectedFilters.selectedOption !== undefined && selectedFilters.selectedOption[category.id]?.currentValue?.id === option.id}
            // onChange={() => handleOptionChange('single', category.id, option.id, category)}
        />;
    }
};





