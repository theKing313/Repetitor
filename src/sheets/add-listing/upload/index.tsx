import React, { useState } from "react";
import styles from "./index.module.scss";
// import Button from "@/ui/button";
import { Box ,Button, IconButton } from "@mui/material";
import { CloseIcon, Grid } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { ImageAdd } from "@/icons/image-add";
import AdTitleStep from "../adTitleStep";
import { Loader } from "@/shared/loader";
import SearchListing from "../search";
import { useAddListing } from "@/contexts/addListing";
import { getFileUrl, uploadAnnouncementImage } from "@/api";
import Features from "../features";
import EditForm from "../editForm";
import compressImage from "@/utils/compressImage";
interface FormValues{
  files: File[];
}

const Upload: React.FC = ( ) => {
  const {setListing,listing}= useAddListing()
  console.log(listing)
  const [selectedCategory, setSelectedCategory] = useState<String | null>(null);
  const handleCategoryClick = async (id: any = '') => {
    if (selectedImages.length > 0) {
      await addImages({ files: selectedImages });
    }
    if (!isSendingImage && isSuccess){
        // setSelectedCategory('true');
    }
  };
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files)
    if (!files) return;
    let newImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
        
      const renamedFile = new File([file], "image", { type: file.type, lastModified: file.lastModified });
      
      newImages.push(renamedFile);
    }
    setSelectedImages([...selectedImages, ...newImages]);
};
  const handleRemoveImage =  (id:number) => {
    setSelectedImages(selectedImages.filter((img,i) => i!== id));
  };
  
    const { mutate: addImages, isPending: isSendingImage, error, isSuccess } = useMutation({
      mutationFn: async (images: FormValues) => {
          const uploadResults = await Promise.all(
              images.files.map(async (image, i) => {
                  try {
                    // const fileId = `img_${i}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
                      if (i ==0 ){
                        const fileId = `img_${i}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
                        console.log(image)
                        // image
                        const compressedImage = await compressImage(image);

                        const res = await uploadAnnouncementImage(fileId, compressedImage);
                        const fileUrl = getFileUrl(res.$id);
                        console.log(fileUrl)
                        setListing({ ...listing, thumb: fileUrl.href })

                      }
                      const fileId = `img_${i}_${crypto.randomUUID().replace(/-/g, "").slice(0, 18)}`;
                      const res = await uploadAnnouncementImage(fileId, image);
                      if (!res || !res.name) {
                          throw new Error("⛔ Ошибка загрузки: Пустой ответ от Appwrite");
                      }
                      console.log(res)
                      const fileUrl = getFileUrl(res.$id);
                      return fileUrl;
                  } catch (err) {
                      console.error(`❌ Ошибка загрузки файла ${i}:`, err);
                      return null;
                  }
              })
          );
          const filteredResults = uploadResults.filter((url) => url !== null);
          return filteredResults;
      },
      onSuccess: (response) => {
          console.log("✅ Файлы успешно загружены:", response);
          const imageUrls = response.map(url => url.href);
          console.log("🔗 Итоговые ссылки:", imageUrls);
          setListing({ ...listing, images: imageUrls });
      },
  });
  return (
    <>
            {selectedCategory ?
            <EditForm/> 
              // <AdTitleStep/>
              // <Features/>
          
            :
            <>
               <div className={styles.container}>
                    <h1 className={styles.title}>Photo</h1>
                  <p className={styles.subtitle}>Lorem ipsum dolor sit amet consectetur. Leo velit leo vitae aenean blandit urna.</p>
                    {selectedImages.length <= 0 &&  
                        <div className={styles.button}>
                            <input
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                />
                                <label htmlFor="raised-button-file">
                                  <Button component="span" className={styles.nextButton} > <span className={styles.icon}>+</span>
                                  Ajouter</Button>
                                  {/* variant="raised"  */}
                                </label> 
                        </div>
                    }
                    <div className={styles.grid}>
                      {selectedImages.map((image,i) => (
                        <div key={i} className={styles.photoCard}>
                              <img
                                          src={URL.createObjectURL(image)}
                                          alt={`Image ${i + 1}`}
                                          className={styles.itemImg}
                                        
                                />
                          <button onClick={() => handleRemoveImage(i)} className={styles.deleteButton}>✕</button>
                        </div>
                      ))}
                      {selectedImages.length > 0 && 
                            <div className={styles.uploadBox} >
                                    <input
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        id="raised-button-file"
                                        multiple
                                        type="file"
                                        />
                                        <label htmlFor="raised-button-file">
                                          <ImageAdd/>
                                        </label> 
                            </div>
                      }
                    </div>
                    {isSendingImage  ? (
                          <Box className="w-10 h-10 flex items-center justify-center">
                              <Loader
                                  sx={{ position: "static", left: "auto", top: "auto", transform: "none" }}
                                  customSize={{ width: "1.4rem", height: "1.4rem", border: "4px solid #f05454" }}
                              />
                          </Box>
                      ) : (
                          isSuccess && <p className={styles.successMessage}>The images have been sent successfully !</p>
                      )}
                      {selectedImages.length > 0 && !isSendingImage  && 
                        <div className={styles.button}>
                              <Button onClick={() => handleCategoryClick() } component="span" className={`${styles.nextButton} ${styles.imageSend}`} > 
                                Suivant
                              </Button>
                        </div>
                      }
              </div>
            </>
        }
    </>
  );
};
export default Upload;
