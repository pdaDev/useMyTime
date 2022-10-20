import {FC} from "react";
import {Layout, Title} from 'shared'
import s from './MobileNavbar.module.scss'
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AboutGreyIcon, ContactsGreyIcon, OptionsGreyIcon, UserProfileGreyIcon} from "../../../shared/ui/Icons";

export const MobileNavbar: FC = () => {
    const n = useNavigate()
    const goToOptionsPage = () => n('/options')
    const goToProfilePage = () => n(`/me`)
    const goToProjectsPage = () => n('/projects')
    const goToAboutPage = () => n('/about')
    const goToContactsPage = () => n('/contacts')

    const { t } = useTranslation()
    return <Layout.Bar>
        <div className={s.projects}
             onClick={goToProjectsPage}
        >
            {t("mobileBar.projects")}
        </div>


        <div className={s.el}
             onClick={goToProfilePage}
        >
            <img src={UserProfileGreyIcon} alt={'user icon'}/>
            <Title type={6}
                   message={t("mobileBar.profile")}
                   color={"secondary"}
                   weight={"regular"}
            />
        </div>
        <div className={s.el}
             onClick={goToContactsPage}
        >
            <img src={ContactsGreyIcon} alt={'contacts icon'}/>
            <Title type={6}
                   message={t("navbar.contacts")}
                   color={"secondary"}
                   weight={"regular"}
            />
        </div>
        <div className={s.el}
             onClick={goToAboutPage}
        >
            <img src={AboutGreyIcon} alt={'about icon'}/>
            <Title type={6}
                   message={t("navbar.about")}
                   color={"secondary"}
                   weight={"regular"}
            />
        </div>
        <div className={s.el}
             onClick={goToOptionsPage}
        >
            <img src={OptionsGreyIcon} alt={'options icon'}/>
            <Title type={6}
                   message={t("navbar.options")}
                   color={"secondary"}
                   weight={"regular"}
            />
        </div>

    </Layout.Bar>
}