import React, {FC, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppSelectors, appUseDispatch, init} from "../store";
import {Layout, Loader} from "../../shared";

export const    withInit = (Component: React.ElementType) => {
     const Wrapper:FC = () => {
         const isInit = useSelector(AppSelectors.getInitStatus)
         const dispatch = appUseDispatch()
         useEffect(() => {
             dispatch(init())
         }, [dispatch])
         if (!isInit) {
             return <Layout.Center>
                 <Loader/>
             </Layout.Center>
         }
         return <Component/>
     }
    return Wrapper
}