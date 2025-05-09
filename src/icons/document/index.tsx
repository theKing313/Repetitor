import type { IconProps } from '../types';

const IconDocument = ({ width = 14, height = 14, color = '#ED5434' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip217_24084)">
                <path
                    d="M11.6 5C11.58 4.94 11.54 4.88 11.49 4.83L7.99 1.33C7.94 1.28 7.88 1.25 7.82 1.22C7.8 1.21 7.78 1.21 7.76 1.2C7.71 1.18 7.66 1.17 7.61 1.17C7.6 1.17 7.59 1.16 7.58 1.16L3.5 1.16C2.85 1.16 2.33 1.68 2.33 2.33L2.33 11.66C2.33 12.31 2.85 12.83 3.5 12.83L10.5 12.83C11.14 12.83 11.66 12.31 11.66 11.66L11.66 5.25C11.66 5.23 11.66 5.22 11.65 5.21C11.65 5.16 11.64 5.11 11.62 5.06C11.62 5.04 11.61 5.02 11.6 5ZM9.67 4.66L8.16 4.66L8.16 3.15L9.67 4.66ZM3.5 11.66L3.5 2.33L7 2.33L7 5.25C7 5.4 7.05 5.55 7.16 5.66C7.27 5.77 7.42 5.83 7.58 5.83L10.5 5.83L10.5 11.66L3.5 11.66Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
                <path
                    d="M4.66 7L9.33 7L9.33 8.16L4.66 8.16L4.66 7ZM4.66 9.33L9.33 9.33L9.33 10.5L4.66 10.5L4.66 9.33ZM4.66 4.66L5.83 4.66L5.83 5.83L4.66 5.83L4.66 4.66Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export { IconDocument };
