import type { IconProps } from '../types';

const CheckBoxIcon  = ({ width = 11, height = 9, color = '#fff' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.66534 6.39073L1.47001 4.19539L0.527344 5.13806L3.66534 8.27606L10.1367 1.80473L9.19401 0.862061L3.66534 6.39073Z" fill={color}/>
        </svg>
    );

};


export { CheckBoxIcon  };
