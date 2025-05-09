'use client';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import TimeSelector from '../NumberOfLessons';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];


const TimeEducation = () => {
    const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
    const [selectedCategory, setSelectedCategory] = useState<boolean | null>(null);
    const handleCategoryClick = () => {
      setSelectedCategory(true)
    };
    const handleToggle = (day: string, hour: string) => {
      const key = `${day}-${hour}`;
      setSelected((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };
    console.log(selected)
    return (
      <>
        {selectedCategory ?
          <TimeSelector/>
          :
          <Box sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Когда удобно заниматься?
          </Typography>
          <Typography variant="body1" mb={3}>
            Отметьте все удобные часы, чтобы получить больше предложений.
          </Typography>
    
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            {days.map((day) => (
              <Grid container xs key={day} >
                <Typography align="center" fontWeight="bold">{day}</Typography>
              </Grid>
            ))}
    
            {hours.map((hour) => (
              <Grid container spacing={1} key={hour} alignItems="center">
                <Grid item xs={1}>
                  <Typography>{hour}</Typography>
                </Grid>
                {days.map((day) => {
                  const key = `${day}-${hour}`;
                  return (
                    <Grid item xs key={key}>
                      <Checkbox
                        checked={selected[key] || false}
                        onChange={() => handleToggle(day, hour)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Grid>
    
          <Box mt={4} display="flex" justifyContent="space-between">
            <Button variant="outlined">← Назад</Button>
            <Button variant="contained" color="primary" onClick={() => handleCategoryClick() }>
              Продолжить →
            </Button>
          </Box>
        </Box>
        }
      

      </>


    );
};

export default TimeEducation;


