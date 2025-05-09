
import { AddListingProvider } from "@/context/addListing";
import Categories from "./categories";

const AddListing = () => {
    
    return (
        <>
            {/* Add Listing Form */}
    
            {/* <SearchListing/> */}
            <AddListingProvider>
                <Categories />

                {/* <EditForm/> */}
                {/* <PriceForm /> */}
                {/* <AdModeration /> */}
                {/* <DescriptionForm/> */}
                {/* <AdTitleStep/> */}
                {/* <Upload></Upload> */}

            </AddListingProvider>
        </>
    );
}

export default AddListing;

