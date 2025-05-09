import { Box } from '@mui/material';
import { CSSProperties, PropsWithChildren, useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';

import { IconShortArrow } from '@/icons/short-arrow';
import clsx from 'clsx';
import Item from './item';

export interface SelectListItem {
    id: number | string;
    value: any;
    label: string;
}

interface Props {
    sx?: CSSProperties;
    label: string;
    overflow?: "auto" | "hidden"; 
}

const Select = ({ sx, label = '',overflow = "hidden", children }: Props & PropsWithChildren) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const contentRef = useRef<HTMLUListElement | null>(null);
    const [height, setHeight] = useState<string>('0px');
    useEffect(() => {
        if (contentRef.current) {
            setHeight(isVisible ? `${contentRef.current.scrollHeight}px` : "0px");
        }
    }, [isVisible]);
    return (
        <>
            <Box sx={sx} className={styles.root} position={'relative'}>
                <button className={styles.label} style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px 16px' }} onClick={() => setIsVisible((prev) => !prev)}>
                    <span>{label}</span>
                    <IconShortArrow direction={isVisible ? 'top' : 'bottom'} color="#797B83" />
                </button>
                <Box ref={contentRef} component={'ul'}
                    style={{ maxHeight: height ,overflow}}
                 className={clsx(styles.list, { [styles.active]: isVisible })}>
                    {children}
                </Box>
            </Box>
        </>
    );
};

export default Select;
