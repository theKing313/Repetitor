import {  IOptions, SelectedFilters } from '@/types';
import React, { createContext,  useContext, ReactNode, useState } from 'react';


interface listingProps{
  // selectedAnnonce:string;
  selectedOption?:SelectedFilters;
  selectedMultiOption?:IOptions[];
  price?:string;
  desc?:string;
  mark?:string;
  images?:string[];
  ad?:string;
  title?:string;
  manufacturerID?:string;
  modelID?:string;
  subcategoryId?:string;
  models?:IOptions[];
  inputValue?:string;
  thumb?:string;
  // 
}
interface AddListingContextType {
  listing: listingProps;
  setListing: React.Dispatch<React.SetStateAction<listingProps>>;
}

const AddListingContext = createContext<AddListingContextType |undefined>(undefined);
interface addListingProviderProps {
    children: ReactNode;
}

export const AddListingProvider : React.FC<addListingProviderProps> = ({ children }) => {
    const [listing, setListing] = useState<listingProps>({});
    // categories
    return (
    <AddListingContext.Provider value={{ listing ,setListing}}> 
      {children}
    </AddListingContext.Provider>
  );
};

export const useAddListing = () => {
  const context = useContext(AddListingContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
