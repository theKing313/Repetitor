'use client';

import { useAddListing } from '@/context/addListing';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useState } from 'react';
import styles from "./index.module.scss";
import Checkbox from '@/ui/checkbox';
import { useRouter } from 'next/navigation';
import SignUp from '../registration';

const TimeSelector = () => {
  const [step, setStep] = useState<'select' | 'thankyou' | 'register'>('select');
  const [direction, setDirection] = useState<any[]>([]);
  const { setListing, listing } = useAddListing();

  const popularQueries = [
    { id: '1lesson', name: '1-2 занятия' },
    { id: 'more', name: 'Больше' },
    { id: 'another', name: 'Решу потом' },
  ];

  const handleOptionChange = (category: any) => {
    setDirection([category]);
    setListing({ ...listing, countLessons: category });
  };
  const router = useRouter();
  const handleNext = () => {
    setStep('thankyou');
    setTimeout(() => {
      setStep('register');
      router.push("/auth/registration");
    }, 1500); // 1.5 секунды показываем "Спасибо", потом регистрация
  };

  return (
    <div className={styles.container}>
      {step === 'select' && (
        <>
          <h1 className={styles.title}>Сколько занятий потребуется?</h1>
          <p className={styles.subtitle}>Обучение программированию</p>

          <Box sx={{ width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
            {popularQueries.map((category, id) => (
              <Checkbox
                key={`${category.id}-${id}`}
                label={category.name}
                checked={direction.some(item => item.id === category.id)}
                onChange={() => handleOptionChange(category)}
              />
            ))}
          </Box>

          {direction.length > 0 && (
            <Button onClick={handleNext} style={{ marginTop: '20px' }}>
              Далее
            </Button>
          )}
        </>
      )}

      {step === 'thankyou' && (
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom>Спасибо! Заявка отправлена 🎉</Typography>
          <Typography variant="body1">Теперь зарегистрируйтесь, чтобы преподаватель мог с вами связаться</Typography>
        </Box>
      )}

      {step === 'register' && (
        <SignUp/>
        
      )}
    </div>
  );
};

export default TimeSelector;
