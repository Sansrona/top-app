import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface ICard extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    children: ReactNode,
    color?:'blue'|'white';
}