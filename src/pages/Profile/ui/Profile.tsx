import {FC, useEffect} from "react";
import {ProfileCard, ProfileSelectors} from "../../../entities/profile";
import {useParams} from "react-router-dom";
import {getProfile} from "entities/user";
import {appUseDispatch} from "../../../app/store";
import {useSelector} from "react-redux";
import s from './Profile.module.scss'

export const Profile: FC = () => {
    const {id} = useParams()
    const dispatch = appUseDispatch()
    const {email, avatar, department, appointment, first_name, last_name} = useSelector(ProfileSelectors.getState)
    useEffect(() => {
        dispatch(getProfile(+id!))
    }, [id, dispatch])
    const name = (first_name && last_name) ? `${first_name} ${last_name}`: ''
    return <div className={s.container}>
        <ProfileCard name={name}
                     dep={department || ''}
                     post={appointment || ''}
                     email={email || ''}
                     id={id as any}
                     avatar={avatar}
        />
    </div>
}