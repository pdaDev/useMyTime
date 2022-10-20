import {FC} from "react";
import s from './Profile.module.scss'
import {UserAvatar} from "../../user";
import {Title} from "../../../shared";
import {useTranslation} from "react-i18next";
import 'i8next'

interface ProfileCardProps {
    name: string
    dep: string
    avatar?: null | string
    post: string
    canEdit: boolean
    email: string
    id: number,
    loading?: boolean,
}

export const ProfileCard: FC<ProfileCardProps> = (
    {
        canEdit,
        dep,
        post,
        name,
        email,
        avatar,
        loading = false,
    }) => {
    const { t } = useTranslation()
    return <div className={s.profile_card}>
        <UserAvatar type={'large'} avatar={avatar} loading={loading}/>
        <div className={s.data}>
            <div className={s.title_wrap}>
                <Title type={2} message={name} loading={loading}/>
            </div>

           <div>
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
           </div>
            {
                canEdit && <></>
            }
        </div>
    </div>
}