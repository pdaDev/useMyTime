import {FC} from "react";
import s from './UserAvatar.module.scss'
import {UserIcon} from "../../../../shared/ui/Icons";
import {useSelector} from "react-redux";
import {getAvatar} from "../../model/User.selectors";
import {useNavigate} from "react-router-dom";

interface IUserAvatar {
    type: 'large' | 'small'
    editMode?: boolean
    editButton?: () => void
    loading?: boolean
    avatar?: string | null
}

export const UserAvatar: FC<IUserAvatar> = (
    {
        type,
        editMode,
        loading = false,
        avatar

    }) => {
    const avatarImg = useSelector(getAvatar)
    let img: string | null
    if (avatar === undefined) {
        img = avatarImg
    } else {
        img = avatar
    }
    const navigate = useNavigate()
    const id = 1
    const handleClick = () => {
        if (type === 'small')
            navigate(`/profile/${id}`)
    }
    return <div className={s.user_avatar}
                data-avatar-type={type}
                onClick={handleClick}
                data-loading={loading}
    >
        {(type === 'large' && editMode)
            ? <div></div>
            : <img src={img || UserIcon} alt={'user-avatar'}/>}
    </div>

}