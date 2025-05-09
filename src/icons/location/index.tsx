import type { IconProps } from '../types';

export const IconLocation = ({ color = '#797B83', width = 10, height = 11 }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs />
            <path
                d="M4 0C1.79 0 0 1.91 0 4.26C-0.02 7.7 3.84 10.55 4 10.66C4 10.66 8.01 7.7 8 4.26C8 1.91 6.2 0 4 0ZM4 6.4C2.89 6.4 2 5.44 2 4.26C2 3.08 2.89 2.13 4 2.13C5.1 2.13 6 3.08 6 4.26C6 5.44 5.1 6.4 4 6.4Z"
                fill={color}
                fillOpacity="1.000000"
                fillRule="nonzero"
            />
        </svg>
    );
};
