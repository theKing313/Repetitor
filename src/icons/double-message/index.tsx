import type { IconProps } from '../types';

const IconDoubleMessage = ({ width = 14, height = 14, color = '#ED5434' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip217_24071)">
                <path
                    d="M2.91 10.5L2.91 12.69L3.8 12.16L6.57 10.5L9.33 10.5C9.97 10.5 10.5 9.97 10.5 9.33L10.5 4.66C10.5 4.02 9.97 3.5 9.33 3.5L2.33 3.5C1.69 3.5 1.16 4.02 1.16 4.66L1.16 9.33C1.16 9.97 1.69 10.5 2.33 10.5L2.91 10.5ZM2.33 4.66L9.33 4.66L9.33 9.33L6.25 9.33L4.08 10.63L4.08 9.33L2.33 9.33L2.33 4.66Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
                <path
                    d="M11.66 1.16L4.66 1.16C4.02 1.16 3.5 1.68 3.5 2.33L10.5 2.33C11.14 2.33 11.66 2.85 11.66 3.5L11.66 8.16C12.3 8.16 12.83 7.64 12.83 7L12.83 2.33C12.83 1.68 12.3 1.16 11.66 1.16Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export { IconDoubleMessage };
