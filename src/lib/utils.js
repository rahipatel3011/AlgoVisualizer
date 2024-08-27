import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



export const randomInt = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};
