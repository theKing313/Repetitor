import type { IconProps } from '../types';

export const IconFacebook = ({ width = 40, height = 40, color = '#4E6297' }: Partial<IconProps>) => {
    return (
    <svg width={width} height={height}  viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill={color}/>
    <path d="M29 13.8186C29 12.3212 27.6788 11 26.1813 11H14.8186C13.3212 11 12 12.3212 12 13.8186V25.1813C12 26.6787 13.3212 28 14.8186 28H20.544V21.5699H18.4301V18.7513H20.544V17.6062C20.544 15.6684 21.9534 13.9948 23.715 13.9948H26.0052V16.8135H23.715C23.4508 16.8135 23.1865 17.0777 23.1865 17.6062V18.7513H26.0052V21.5699H23.1865V28H26.1813C27.6788 28 29 26.6787 29 25.1813V13.8186Z" fill="white"/>
    </svg>
    );
};
