import type { IconProps } from '../types';

const Arrow  = ({ width = 14, height = 14, color = '#323232' }: Partial<IconProps>) => {
    return (
        <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.70694 12.293L4.41394 7.99997H13.9999V5.99997H4.41394L8.70694 1.70697L7.29294 0.292969L0.585938 6.99997L7.29294 13.707L8.70694 12.293Z" fill={color}/>
        </svg>
    );

};



export { Arrow  };
