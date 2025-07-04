
import type { IconProps } from '../types';

export const IconGoogle = ({ width = 40, height = 40, color = '#C5331E' }: Partial<IconProps>) => {
    return (
    <svg width={width} height={height}  viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill={color}/>
    <path d="M20.3417 18.4417V22.4H25.725C24.9333 24.5375 22.875 25.9625 20.5 25.9625C17.4125 25.9625 14.9583 23.5083 14.9583 20.4208C14.9583 17.3333 17.4125 14.8792 20.5 14.8792C21.6875 14.8792 22.7958 15.275 23.7458 15.9083L24.0625 16.1458L26.4375 13.0583L26.1208 12.8208C24.4583 11.6333 22.5583 11 20.5 11C15.275 11 11 15.275 11 20.5C11 25.725 15.275 30 20.5 30C25.725 30 30 25.725 30 20.5V18.5208H20.3417V18.4417Z" fill="white"/>
    </svg>
    );
};
