import type { IconProps } from '../types';

const IconMessage = ({ width = 14, height = 14, color = '#ED5434' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect id="bx-comment" rx="-0.500000" width="13.000000" height="13.000000" transform="translate(0.500000 0.500000)" fill="#FFFFFF" fillOpacity="0" />
            <g clipPath="url(#clip218_30163)">
                <path
                    d="M11.66 1.16L2.33 1.16C1.69 1.16 1.16 1.68 1.16 2.33L1.16 12.83L4.27 10.5L11.66 10.5C12.31 10.5 12.83 9.97 12.83 9.33L12.83 2.33C12.83 1.68 12.31 1.16 11.66 1.16ZM11.66 9.33L3.89 9.33L2.33 10.5L2.33 2.33L11.66 2.33L11.66 9.33Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
            </g>
        </svg>
    );
};

export { IconMessage };
