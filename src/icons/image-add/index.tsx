import type { IconProps } from '../types';

export const ImageAdd = ({ width = 17, height = 15, color = '#ED5434' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 13L12 9L15 13.5V12H19V5C19 3.897 18.103 3 17 3H4C2.897 3 2 3.897 2 5V17C2 18.103 2.897 19 4 19H12V15H5L8 11L9 13Z" fill="#ED5434"/>
            <path d="M19 14H17V17H14V19H17V22H19V19H22V17H19V14Z" fill={color}/>
        </svg>
    );
};
