import {FC, useEffect} from "react";
import {ProfileCard, ProfileSelectors} from "../../../entities/profile";
import {useParams} from "react-router-dom";
import {getProfile} from "entities/user";
import {appUseDispatch} from "../../../app/store";
import {useSelector} from "react-redux";


export const Profile: FC = () => {
    const id = useParams()
    const dispatch = appUseDispatch()
    const {email, avatar, dep, phoneNumber, post, name} = useSelector(ProfileSelectors.getState)
    useEffect(() => {
        // @ts-ignore
        dispatch(getProfile(id))
    }, [id, dispatch])
    return <>
        <ProfileCard name={name || ''}
                     dep={dep || ''}
                     post={post || ''}
                     email={email || ''}
                     id={id as any}
                     phoneNumber={phoneNumber || ''}
                     avatar={avatar}
        />
    </>
}