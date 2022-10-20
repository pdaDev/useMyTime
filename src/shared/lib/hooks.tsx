import {types} from "./index";
import {useCallback, useEffect, useRef, useState} from "react";
import {AppSelectors, appUseSelector, notify} from "../../app/store";

import 'i18next'
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";
//toggle theme of app
export const useToggleTheme = (theme: Partial<types.ThemeType>) => {
    const allThemes = appUseSelector(AppSelectors.getAllThemes)
    const currentTheme = appUseSelector(AppSelectors.getTheme)
    const currentThemeIndex = allThemes.indexOf(currentTheme)
    const nextTheme = theme || (allThemes[currentThemeIndex + 1] || allThemes[0])
    useEffect(() => {
        document.body.setAttribute('data-theme', nextTheme)
    }, [theme, nextTheme])
}

export const useSetTheme = () => {
    const currentTheme = appUseSelector(AppSelectors.getTheme)

    useEffect(() => {
        localStorage.setItem('theme', currentTheme)
        document.body.setAttribute('data-theme', currentTheme)
    }, [currentTheme])
}
export const useToggle = (defValue?: boolean): [boolean, () => void] => {
    const [is, setiIs] = useState<boolean>(defValue || false)
    const toggleIs = () => setiIs(!is)
    return [is, toggleIs]
}

export const useTabTitle = (title: string) => {
    useEffect(() => {
        if (title) {
            document.title = title
        }
    }, [title])
}

export const useForceUpdate = () => {
    const [state, setState] = useState(false)
    return () => setState(!state)
}

export function useClassState<T extends {}>(defaultValue: T): [T, (state: Partial<T>) => void] {
    const [state, setState] = useState<T>(defaultValue)
    const setNewState = (newState: Partial<T>) => setState({...state, ...newState})
    return [state, setNewState]
}

export const usePopap = (condition = true) => {
    useEffect(() => {
        if (condition) {
            const paddingSize = window.innerWidth - document.body.clientWidth
            document.body.style.overflow = 'hidden'
            document.body.style.paddingRight = `${paddingSize}px`
            return () => {
                document.body.style.overflow = 'auto'
                document.body.style.paddingRight = `0px`
            }
        }
    }, [condition])
}

export const useOptionsFromArray = (array: Array<string>, prefix: string) => {
    const {t} = useTranslation()
    return array.map(value => ({
        value,
        label: t(`${prefix}.${value}`)
    }))

}

export const useOpenClose = (defaultValue: boolean = false): [boolean, () => void, () => void] => {
    const [isOpen, setIsOPen] = useState(defaultValue)
    const open = () => setIsOPen(true)
    const close = () => setIsOPen(false)
    return [
        isOpen,
        open,
        close
    ]
}


export const useRedirect = (path: string, dependency: boolean, value: boolean) => {
    const n = useNavigate()
    useEffect(() => {
        dependency === value && n(path)
    }, [dependency, n, path, value])
}
export const useNotify = (condition: boolean, message: string, type: 'error' | 'success' | "warning") => {
    const d = useDispatch()
    useEffect(() => {
        condition && d(notify({type, message}))
    }, [condition, type, message, d])
    return {}

}
export const useNotifyFunction = (message: string  = '', type: 'error' | 'success' | "warning" = 'error') => {
    const d = useDispatch()
    return useCallback((notifyMessage = message, notifyTYpe = type) => {
        d(notify({type: notifyTYpe, message: notifyMessage}))
    }, [d, type, message])
}

type Error = FetchBaseQueryError | SerializedError | undefined

export const useError = (error: Error | Array<Error>) => {
    useEffect(() => {
            const throwError = (error: Error) => {
                if (error)
                    throw new Error(error as any)
            }
            if (Array.isArray(error)) {
                error.forEach(er => throwError(er))
            } else throwError(error)
        }, [error]
    )
}

export const useOnBlurClose = (close: () => void, open: boolean): { onBlur: () => void, onFocus: () => void, ref: any} => {
    const timer = useRef<NodeJS.Timer>()
    const ref = useRef<HTMLDivElement>(null)
    useEffect( () => {
        open && ref.current?.focus()
    }, [open])
    return {
        onFocus() {
            clearTimeout(timer.current)
        },
        onBlur() {
            timer.current = setTimeout(close)
        },
        ref
    }
}