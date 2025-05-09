import type { IconProps } from '../types';

const IconGuardOutlined = ({ width = 14, height = 14, color = '#ED5434' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip217_24086)">
                <path
                    d="M12.24 4.02C12.23 3.92 12.2 3.83 12.14 3.75C12.08 3.67 12.01 3.6 11.92 3.56L7.26 1.22C7.17 1.18 7.08 1.16 7 1.16C6.91 1.16 6.82 1.18 6.73 1.22L2.07 3.56C1.98 3.6 1.9 3.67 1.85 3.75C1.79 3.83 1.76 3.92 1.75 4.02C1.74 4.08 1.19 10.3 6.76 12.78C6.83 12.81 6.91 12.83 7 12.83C7.08 12.83 7.16 12.81 7.23 12.78C12.8 10.3 12.25 4.08 12.24 4.02ZM7 11.6C3.05 9.69 2.86 5.62 2.89 4.45L7 2.4L11.1 4.45C11.12 5.61 10.91 9.71 7 11.6Z"
                    fill={color}
                    fillOpacity="1.000000"
                    fillRule="nonzero"
                />
                <path d="M6.41 7.34L5.07 6L4.25 6.82L6.41 8.99L9.74 5.66L8.92 4.83L6.41 7.34Z" fill={color} fillOpacity="1.000000" fillRule="nonzero" />
            </g>
        </svg>
    );
};

export { IconGuardOutlined };
