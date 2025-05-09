'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Switch,
  Button,
  Typography,
  FormControlLabel,
  Box,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export default function EducationFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [studyNow, setStudyNow] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [diploma, setDiploma] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDiploma(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle>
        Образование
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle2">Учебное заведение, факультет и специализация</Typography>
        <Typography variant="body2" color="text.secondary">
          Если у вас несколько дипломов, создайте отдельную запись для каждого.
        </Typography>

        <TextField label="Название как в дипломе" fullWidth />
        <TextField label="Год начала" fullWidth type="number" />

        <FormControlLabel
          control={<Switch checked={studyNow} onChange={(e) => setStudyNow(e.target.checked)} />}
          label="Учусь тут сейчас"
        />

        <Box>
          <Typography variant="subtitle2" mb={1}>
            Фото диплома
          </Typography>

          <UploadBox>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="upload-photo"
            />
            <label htmlFor="upload-photo">
              <Typography color="primary" sx={{ cursor: 'pointer' }}>
                +
              </Typography>
            </label>
            {diploma && (
              <Typography variant="caption" mt={1}>
                {diploma.name}
              </Typography>
            )}
          </UploadBox>
        </Box>

        <FormControlLabel
          control={<Switch checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} />}
          label="Показывать фото клиентам"
        />

        <Typography variant="caption" color="text.secondary">
          Информация появится в анкете после проверки
        </Typography>

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  );
}

const UploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: 8,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
}));
