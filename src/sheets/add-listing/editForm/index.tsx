import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Используем для перенаправления
import Button from '../ui/button';
import AdModeration from "../AdModeration/AdModeration";
import { sendAnnouncement } from "@/api";
import styles from "./index.module.scss";
import Features from "../features";
import { useAddListing } from "@/contexts/addListing";
import getUser from "@/utils/getUser";

const EditForm: React.FC = () => {
    const { setListing, listing } = useAddListing();
    const userId = getUser()?.$id;
    const router = useRouter(); // Инициализация роутера

    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Состояние для сообщения

    const { mutate: addForm, isPending: isLoadingForm } = useMutation({
        mutationKey: ['categories'],
        mutationFn: async (queries: string[] = []) => {
            const response = await sendAnnouncement(queries);
            if (!response) {
                throw new Error("Ошибка при отправке данных");
            }
            return response;
        },
        onSuccess: () => {
            setSuccessMessage("✅ Объявление успешно создано!");
            setTimeout(() => {
                router.push('/'); // Перенаправление на главную через 2 секунды
            }, 2000);
        },
        onError: () => {
            setSuccessMessage("❌ Ошибка при создании объявления.");
        }
    });

    async function handleSubmit() {
        const formattedSelectedOption = Object.values(listing.selectedOption).map(value => ({ ...value }));
        const formattedModels = Object.values(listing.models).map(value => ({ ...value }));

        const messageData = {
            description: listing.desc,
            price: Number(listing.price) || 0,
            images: listing.images, 
            type: true,
            item_name: listing.desc,
            // parametrs: JSON.stringify([
            //     ...Object.values(listing.selectedOption),
            //     ...Object.values(listing.models),
            //     ...listing.selectedMultiOption
            // ]),
            parametrs: JSON.stringify([...formattedSelectedOption, ...formattedModels, ...listing.selectedMultiOption]),
            total_views: 0,
            total_likes: 0,
            creator_id: userId,
            active: true,
            on_moderation: true,
            name: listing.title,
            subcategoryId: listing.subcategoryId,
            itemId: null,
            latitude: 0,
            longitude: 0,
            creator: userId,
            area_id: "1334",
            city_id: "43",
            price_type: 'dzd',
            total_contacts: 0,
            model: listing.modelID || null,
            mark: listing.manufacturerID || null,
            contacts_views: 0,
            area2: "1334",
            city: "43",
            keywords: listing.desc,
            thumb: 'https://' 
            //
        };

        addForm({ ...messageData });
    }

    return (
        <>
            {isLoadingForm ? <AdModeration /> : (
                <div className={styles.container}>
                    <h1 className={styles.title}>Éditer</h1>
                    <div className={styles.section}>
                        <Features />
                    </div>
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* Вывод сообщения */}
                    <Button onClick={() => handleSubmit()}>Suivant</Button>
                </div>
            )}
        </>
    );
};

export default EditForm;
