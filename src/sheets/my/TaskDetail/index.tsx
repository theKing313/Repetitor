'use client';

import { Paper, Typography, IconButton, List, ListItem, ListItemText, Divider, Snackbar, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

const fields = [
  { key: 'subject', label: 'Цель занятий' },
  { key: 'studentName', label: 'Имя ученика' },
  { key: 'examTime', label: 'До экзамена осталось' },
  { key: 'studentLevel', label: 'Уровень ученика' },
  { key: 'teacherGender', label: 'Важен ли вам пол репетитора?' },
  { key: 'teacherAge', label: 'Важен ли вам возраст репетитора?' },
  { key: 'schedule', label: 'Удобные дни и время занятий' },
];

export default function TaskDetails({ data, announcementId }: { data: any, announcementId: string }) {
  const [announcement, setAnnouncement] = useState(data);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');
  const [snackbar, setSnackbar] = useState(false);

  const handleEdit = (fieldKey: string, currentValue: string) => {
    setEditingField(fieldKey);
    setNewValue(currentValue || '');
  };

  const handleSave = async () => {
    const updated = { ...announcement, [editingField!]: newValue };
    setAnnouncement(updated);
    setEditingField(null);

    // Обновляем в Appwrite
    await databases.updateDocument('dbId', 'announcementsCollectionId', announcementId, {
      [editingField!]: newValue,
    });

    setSnackbar(true);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>Детали задачи</Typography>

      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Вы уже искали специалиста по этой услуге. Можно отредактировать детали и возобновить поиск.
          <br />
          Если хотите начать поиск заново, напишите в <strong>поддержку</strong>.
        </Typography>

        <List>
          {fields.map((field) => (
            <div key={field.key}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleEdit(field.key, announcement[field.key])}>
                    <EditIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={field.label}
                  secondary={announcement[field.key] ? announcement[field.key] : 'Не указано'}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </Paper>

      {editingField && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Редактирование поля</Typography>
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginBottom: 8 }}
          />
          <Button variant="contained" onClick={handleSave}>Сохранить</Button>{' '}
          <Button onClick={() => setEditingField(null)}>Отмена</Button>
        </Paper>
      )}

      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        message="Детали обновлены"
      />
    </>
  );
}
