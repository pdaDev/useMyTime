import {FC} from "react";
import {ProfileCard} from "entities/profile";
import {logout, UserSelectors} from "entities/user";
import {useSelector} from "react-redux";
import {useTabTitle} from "shared";
import {useTranslation} from "react-i18next";
import {DownloadReportBlock} from "../../../widgets/downloadReport";
import s from './MyProfile.module.scss'
import {appUseDispatch} from "../../../app/store";


export const MyProfile: FC = () => {
    const {t} = useTranslation()
    useTabTitle(t("profile.me"))
    const {name, id, department, appointment, email} = useSelector(UserSelectors.getUserData)
     const dispatch = appUseDispatch()
    const logOut = () => dispatch(logout())
    return <div className={s.container}>
        <ProfileCard canEdit={true}
                     name={name}
                     id={id}
                     dep={department}
                     post={appointment}
                     email={email}
                     phoneNumber={''}
        />
        <DownloadReportBlock />
        <div className={s.logout}
             onClick={logOut}
        >
            {t("navbar.logout")}
        </div>
    </div>
}