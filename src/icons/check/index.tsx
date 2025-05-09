import type { IconProps } from '../types';

const CheckIcon  = ({ width = 14, height = 14, color = '#0F7EE4' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
            d="M0.595703 5.16132L3.7577 7.57465L8.83504 1.77199L7.83104 0.894653L3.57504 5.75865L1.4037 4.10132L0.595703 5.16132ZM13.5017 1.77199L12.4977 0.894653L8.2517 5.74732L7.7497 5.34599L6.91637 6.38732L8.41437 7.58599L13.5017 1.77199Z"
            fill={color}/>
        </svg>
    );

};


export { CheckIcon  };
