import {useNavigate} from "react-router-dom";
import {UserSelectors} from 'entities/user'
import {useEffect} from "react";
import {useSelector} from "react-redux";

export const useManagerRedirect = () => {
    const n = useNavigate()
    const isManager = useSelector(UserSelectors.getIsManager)
    useEffect(() => {
        !isManager && n('/me')
    }, [isManager, n])
}