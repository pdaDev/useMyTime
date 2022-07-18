import React, {FC} from "react";

export type ThemeType = 'light' | 'dark'
export type FCProp<T = {}> = FC<T & {children?: React.ReactChild | React.ReactNode}>
