import {FC} from "react";
import s from './UserAvatar.module.scss'
import {UserIcon} from "../../../../shared/ui/Icons";
import {useSelector} from "react-redux";
import {getAvatar} from "../../model/User.selectors";

interface IUserAvatar {
    type: 'large' | 'small'
    editMode?: boolean
    editButton?: () => void
    loading?: boolean
    avatar?: string | null
    withBorder?: boolean
}

export const UserAvatar: FC<IUserAvatar> = (
    {
        type,
        editMode,
        loading = false,
        avatar,
        withBorder

    }) => {
    const avatarImg = useSelector(getAvatar)
    let img: string | null
    if (avatar === undefined) {
        img = avatarImg
    } else {
        img = avatar
    }
    return <div className={s.user_avatar}
                data-avatar-type={type}
                data-loading={loading}
                data-with-border={withBorder}
    >
        {(type === 'large' && editMode)
            ? <div></div>
            : <img src={img || UserIcon} alt={'user-avatar'}/>}
    </div>

}