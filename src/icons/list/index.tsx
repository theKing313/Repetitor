import type { IconProps } from '../types';

const IconList = ({ width = 14, height = 14, color = '#ED5434' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip217_24055)">
                <path
                    d="M12.25 2.91C12.25 2.27 11.72 1.75 11.08 1.75L2.91 1.75C2.27 1.75 1.75 2.27 1.75 2.91L1.75 11.08C1.75 11.72 2.27 12.25 2.91 12.25L11.08 12.25C11.72 12.25 12.25 11.72 12.25 11.08L12.25 2.91ZM2.91 11.08L2.91 2.91L11.08 2.91L11.08 11.08L2.91 11.08Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
                <path
                    d="M4.08 4.08L5.24 4.08L5.24 5.24L4.08 5.24L4.08 4.08ZM6.41 4.08L9.91 4.08L9.91 5.24L6.41 5.24L6.41 4.08ZM4.08 6.41L5.24 6.41L5.24 7.58L4.08 7.58L4.08 6.41ZM6.41 6.41L9.91 6.41L9.91 7.58L6.41 7.58L6.41 6.41ZM4.08 8.74L5.24 8.74L5.24 9.91L4.08 9.91L4.08 8.74ZM6.41 8.74L9.91 8.74L9.91 9.91L6.41 9.91L6.41 8.74Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export { IconList };
