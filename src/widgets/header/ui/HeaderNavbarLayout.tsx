import {Form, Icons, Layout, MenuBurger} from "shared";
import {FCProp} from "shared/lib/types";
import {logout, UserAvatar, UserName, UserSelectors} from "entities/user";
import {useSelector} from "react-redux";
import {TimerSelectors} from "entities/timer";
import {useNavigate} from "react-router-dom";
import s from './HeaderWidget.module.scss'
import {useTranslation} from "react-i18next";
import 'i8next'
import {appUseDispatch} from "app/store";
import {useEffect, useState} from "react";
import {MobileNavbar} from "../../mobileNavBar/ui/MobileNavbar";
import {MiniTimer} from "../../../features/miniTimer";


export const HeaderNavbarLayout: FCProp = ({children}) => {
    const {touched, status} = useSelector(TimerSelectors.getState)

    const [isNavbarOpen, setIsNavbarOpen] = useState(false)
    const toggleNavbarOpen = () => setIsNavbarOpen(!isNavbarOpen)
    const navigate = useNavigate()

    const goToOptionsPage = () => navigate('/options')
    const goToProfilePage = () => navigate(`/me`)
    const goToProjectsPage = () => navigate('/projects')
    const goToAboutPage = () => navigate('/about')
    const goToContactsPage = () => navigate('/contacts')
    const goToEmployeesPage = () => navigate('/employees')
    const goToDataManagementPage = () => navigate('/dataManagement')
    const {isAuthed, isAdmin, isManager} = useSelector(UserSelectors.getState)
    const name = useSelector(UserSelectors.getName)
    const {t} = useTranslation()
    const dispatch = appUseDispatch()
    const logOut = () => dispatch(logout())
    const debounce = () => {
        let timer: NodeJS.Timeout
        return (e: any )=> {
            clearTimeout(timer)

            timer = setTimeout(() => {
                if (e.target.innerWidth > 1787) {
                    setIsNavbarOpen(true)

                }
            }, 100)
        }
    }
    const debouncedFunction = debounce()
    useEffect(() => {
        if (window.innerWidth > 1787) {
            setIsNavbarOpen(true)
        }
        window.addEventListener('resize', debouncedFunction)
        return () => window.removeEventListener('resize', debouncedFunction)
    }, [debouncedFunction])
    if (!isAuthed)
        return <Layout.Center>
            {children}
        </Layout.Center>

    return <Layout.Layout>

        <div className={s.navbar_header}>
            {
                isNavbarOpen && <Layout.Navbar>
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
                    {isManager && <Form.Button type={'spy'}
                                               message={t("navbar.employees")}
                                               icon={Icons.UsersIcon}
                                               onClick={goToEmployeesPage}
                    />}
                    {isAdmin && <Form.Button type={'spy'}
                                             message={t("navbar.dataManagement")}
                                             icon={Icons.DataIcon}
                                             onClick={goToDataManagementPage}
                    />}
                    <Form.Button type={'secondary'}
                                 message={t("navbar.logout")}
                                 fullWidth
                                 onClick={logOut}
                    />
                </Layout.Navbar>
            }

            <Layout.Header>
                <div className={s.header_profile_menu_block}>
                    <div className={s.header_navbar_menu_burger}>
                        <MenuBurger open={isNavbarOpen}
                                    handleClick={toggleNavbarOpen}
                        />
                    </div>
                    <div onClick={goToProfilePage as any}
                         className={s.user_data_block}>
                        <UserAvatar type={'small'}/>
                        <UserName type={'surname and initials'} fio={name}/>
                    </div>
                </div>

                {(touched || status) && <MiniTimer/>}

            </Layout.Header>
        </div>
        <Layout.Content>
            {children}
        </Layout.Content>
        <MobileNavbar/>
    </Layout.Layout>
}