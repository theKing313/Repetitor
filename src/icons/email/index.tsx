import type { IconProps } from '../types';

export const IconEmail = ({ width = 24, height = 24, color = '#fff' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip21_5795)">
                <path
                    d="M20 4L4 4C2.89 4 2 4.89 2 6L2 18C2 19.1 2.89 20 4 20L20 20C21.1 20 22 19.1 22 18L22 6C22 4.89 21.1 4 20 4ZM20 6L20 6.51L12 12.73L4 6.51L4 6L20 6ZM4 18L4 9.04L11.38 14.78C11.56 14.92 11.77 15 12 15C12.22 15 12.43 14.92 12.61 14.78L20 9.04L20 18L4 18Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};
