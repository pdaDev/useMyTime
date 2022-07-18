import {FC} from "react";
import s from './Profile.module.scss'
import {UserAvatar} from "../../user";
import {Title} from "../../../shared";
import {useTranslation} from "react-i18next";
import 'i8next'
import {Icons} from "shared";

interface ProfileCardProps {
    canEdit?: boolean
    name: string
    dep: string
    avatar?: null | string
    post: string
    email: string
    id: number,
    loading?: boolean,
    phoneNumber: string
}

export const ProfileCard: FC<ProfileCardProps> = (
    {canEdit,

        dep,
        post,
        name,
        email,
        avatar,
        loading = false,
        phoneNumber
    }) => {
    const { t } = useTranslation()
    return <div className={s.profile_card}>
        { canEdit && <div className={s.edit_button}>
            <img src={Icons.EditButton} alt={'edit button'}/>
        </div>}
        <UserAvatar type={'large'} avatar={avatar} loading={loading}/>
        <div className={s.data}>
            <div className={s.title_wrap}>
                <Title type={2} message={name} loading={loading}/>
            </div>

            <div className={s.data_set}>
                <Title type={4}
                       message={t("profile.post")}
                       color={'secondary'}
                       loading={loading}
                />
                &nbsp;
                <Title type={4} message={post}/>
            </div>

            <div className={s.data_set}>
                <Title type={4}
                       message={t("profile.dep")}
                       color={'secondary'}
                       loading={loading}
                />
                &nbsp;
                <Title type={4}
                       message={dep}
                />
            </div>

            <div className={s.data_set}>
                <Title type={4}
                       message={t("profile.email")}
                       color={'secondary'}
                       loading={loading}
                />
                &nbsp;
                <Title type={4} message={email || ''}/>
            </div>

            <div className={s.data_set}>
                <Title type={4}
                       message={t("profile.phoneNumber")}
                       color={'secondary'}
                       loading={loading}
                />
                &nbsp;
                <Title type={4} message={phoneNumber || ''}/>
            </div>

        </div>
    </div>
}