import {Form, Icons, Layout} from "shared";
import {FCProp} from "shared/lib/types";
import {logout, UserAvatar, UserName, UserSelectors} from "entities/user";
import {useSelector} from "react-redux";
import {Timer} from "entities/timer";
import {TimerPlayButton} from "features/editTimer";
import {useNavigate} from "react-router-dom";
import s from './HeaderWidget.module.scss'
import {useTranslation} from "react-i18next";
import 'i8next'
import {appUseDispatch} from "app/store";

export const HeaderNavbarLayout: FCProp = ({children}) => {


    const navigate = useNavigate()
    const goToOptionsPage = () => navigate('/options')
    const goToProfilePage = () => navigate(`/me`)
    const goToProjectsPage = () => navigate('/projects')
    const goToAboutPage = () => navigate('/about')
    const goToContactsPage = () => navigate('/contacts')
    const goToEmployeesPage = () => navigate('/employees')
    const isAuthed = useSelector(UserSelectors.getAuthStatus)
    const name = useSelector(UserSelectors.getName)
    const {t} = useTranslation()
    const dispatch = appUseDispatch()
    const logOut = () => dispatch(logout())
    if (!isAuthed)
        return <Layout.Center>
            {children}
        </Layout.Center>
    return <Layout.Layout>

        <Layout.Navbar>
            <Form.Button type={'primary'}
                         message={t("navbar.projects")}
                         icon={Icons.ProjectsIcon}
                         onClick={goToProjectsPage}
                         fullWidth
            />
            <Form.Button type={'spy'}
                         message={t("navbar.contacts")}
                         icon={Icons.ContactsIcon}
                         onClick={goToContactsPage}
            />
            <Form.Button type={'spy'}
                         message={t("navbar.about")}
                         icon={Icons.AboutAppIcon}
                         onClick={goToAboutPage}
            />
            <Form.Button type={'spy'}
                         message={t("navbar.options")}
                         icon={Icons.SettingsIcon}
                         onClick={goToOptionsPage}
            />
            <Form.Button type={'spy'}
                         message={t("navbar.employees")}
                         icon={Icons.UsersIcon}
                         onClick={goToEmployeesPage}
            />
            <Form.Button type={'secondary'}
                         message={t("navbar.logout")}
                         fullWidth
                         onClick={logOut}
            />

        </Layout.Navbar>

        <Layout.Header>
            <div onClick={goToProfilePage as any}
                 className={s.user_data_block}>
                <UserAvatar type={'small'}/>

                    <UserName type={'surname and initials'} fio={name}/>


            </div>
            <div className={s.timer_block}>
                <Timer/>
                <div className={s.timer_button_wrapper}>
                    <TimerPlayButton size={"small"}/>
                </div>

            </div>
        </Layout.Header>
        <Layout.Content>
            {children}
        </Layout.Content>
    </Layout.Layout>
}