import clsx from 'clsx';
import styles from './index.module.scss';
import { HTMLAttributes, PropsWithChildren } from 'react';

type Color = 'orange' | 'black' | 'white' | 'gray';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
    color?: Color;
    disabled?: boolean; 
}

const Button = ({ color = 'orange',  children,disabled, ...props }: Props) => {
    return (
        
        <button  {...props}  disabled={disabled}  className={clsx(styles.root, styles[color],disabled && styles.disabled, props.className)}>
            {children}
        </button>
    );
};


export default Button;
