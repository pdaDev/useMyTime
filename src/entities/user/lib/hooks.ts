import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {getAuthStatus} from "../model/User.selectors";


export const useAuthRedirect = () => {
    const n = useNavigate()
    const isAuthed = useSelector(getAuthStatus)
    useEffect(() => {
        !isAuthed && n('/auth')
    },[isAuthed, n])
}
