import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IP extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
    children: ReactNode,
    font: '14'|'16'|'18'
}