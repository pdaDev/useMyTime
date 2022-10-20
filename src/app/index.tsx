import React, {lazy} from "react";
import './index.scss'
import {Navigate, Route, Routes} from 'react-router-dom'
import {ErrorBoundary, Layout, Loader, NotifyPopap, useSetTheme} from "shared";
import {HeaderNavbarLayout} from "../widgets/header";
import {useAuthRedirect} from "../entities/user/lib/hooks";
import {withInit} from "./hocs/withInit";
import {useToggleTimer, withTimerToggle} from "../entities/timer";


const Auth = lazy(() => import('pages/Auth'))
const About = lazy(() => import('pages/About'))
const Contacts = lazy(() => import('pages/Contacts'))
const Options = lazy(() => import('pages/Options'))
const Profile = lazy(() => import('pages/Profile'))
const Project = lazy(() => import('pages/Project'))
const Projects = lazy(() => import('pages/Projects'))
const MyProfile = lazy(() => import('pages/MyProfile'))
const DataManagement = lazy(() => import('pages/DataManagement'))
const Employees = lazy(() => import('pages/Employees'))
const Invite = lazy(() => import('pages/Invite'))

const App = () => {


    useSetTheme()
    useAuthRedirect()
    useToggleTimer()

    return (
        <React.Suspense fallback={<Layout.Center>
            <Loader/>
        </Layout.Center>}>
            <ErrorBoundary>

                <>
                    <HeaderNavbarLayout>
                        <React.Suspense fallback={<Layout.Center>
                            <Loader/>
                        </Layout.Center>}>
                            <Routes>

                                <Route path={'/'} element={<Navigate to='/auth'/>}/>
                                <Route path={'/auth'} element={<Auth/>}/>
                                <Route path={'/about'} element={<About/>}/>
                                <Route path={'/contacts'} element={<Contacts/>}/>
                                <Route path={'/projects'} element={<Projects/>}/>
                                <Route path={'/project/:id'} element={<Project/>}/>
                                <Route path={'/me'} element={<MyProfile/>}/>
                                <Route path={'/profile/:id/'} element={<Profile/>}/>
                                <Route path={'/options'} element={<Options/>}/>
                                <Route path={'/employees'} element={<Employees/>}/>
                                <Route path={'/dataManagement'} element={<DataManagement/>}/>
                                <Route path={'/invite/:code'} element={<Invite/>}/>

                            </Routes>
                        </React.Suspense>
                    </HeaderNavbarLayout>
                    <NotifyPopap/>
                </>

            </ErrorBoundary>
        </React.Suspense>

    )
}

export default withInit(withTimerToggle(App))