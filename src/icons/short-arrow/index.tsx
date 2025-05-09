import type { Direction, IconProps } from '../types';

export const IconShortArrow = ({ width = 6, height = 10, color = '#DEE0E4', direction = 'right' }: Partial<IconProps> & { direction?: Direction }) => {
    const getDegDirection = () => {
        switch (direction) {
            case 'bottom':
                return '90deg';
            case 'left':
                return '180deg';
            case 'top':
                return '270deg';
            case 'right':
                return '0deg';
        }
    };

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ rotate: getDegDirection() }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs />
            <path d="M1.17 9.51L5.93 4.75L1.17 0L0 1.17L3.57 4.75L0 8.33L1.17 9.51Z" fill={color} fillOpacity="1.000000" fillRule="nonzero" />
        </svg>
    );
};
