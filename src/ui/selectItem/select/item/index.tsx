import { Box, Typography } from '@mui/material';
import { SelectListItem } from '..';

import styles from './index.module.scss';
import Checkbox from '@/ui/ckeckbox';
import { useState } from 'react';

interface Props {
    item: SelectListItem;
    onClick: (state: SelectListItem) => void;
}

const Item = ({ item, onClick }: Props) => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <Box className={styles.root} component={'li'} onClick={() => onClick(item)}>
            <Checkbox checked={checked} onChange={setChecked} label="checkbox" />
        </Box>
    );
};

export default Item;
