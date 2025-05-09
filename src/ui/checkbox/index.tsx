import { Box } from '@mui/material';
import styles from './index.module.scss';
import { CheckBoxIcon } from '@/icons/ckeckbox';

interface Props {
    label?: string;
    checked: boolean;
    onChange: (state: boolean) => void;
    variant?: 'default' | 'checkbox'; 
}

const Checkbox = ({ label, checked, onChange ,variant = 'default' }: Props) => {
    return (
        
        <Box className={styles.root} component="label">
            <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
            {variant === 'default' ? ( <span className={styles.defaultFake} />)
            : (
                <span className={styles.fake}>
                    {checked  &&<CheckBoxIcon/>}
                </span>
                ) }
            {label && <span className={styles.label}>{label}</span>}
        </Box>
    );
};

export default Checkbox;
