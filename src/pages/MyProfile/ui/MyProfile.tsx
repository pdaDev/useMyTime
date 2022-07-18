import {FC} from "react";
import {ProfileCard} from "entities/profile";
import {UserSelectors} from "entities/user";
import {useSelector} from "react-redux";
import {useTabTitle} from "shared";
import {useTranslation} from "react-i18next";

export const MyProfile: FC = () => {
    const {t} = useTranslation()
    useTabTitle(t("profile.me"))
    const {name, id, department, appointment, email} = useSelector(UserSelectors.getUserData)
    return <>
        <ProfileCard canEdit={true}
                     name={name}
                     id={id}
                     dep={department}
                     post={appointment}
                     email={email}
                     phoneNumber={''}
        />
    </>
}