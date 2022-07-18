import {FC} from "react";
import {Layout, useTabTitle} from 'shared'
import {useTranslation} from "react-i18next";
import s from './Contacts.module.scss'
import 'i8next'
import {ContactCard} from "entities/contact";
import {ChatWithDevelopersForm} from "../../../features/chatWithDeveloper/ui/ChatWithDevelopersForm";

export const Contacts: FC = () => {
    const { t } = useTranslation()
    useTabTitle(t("navbar.contacts"))
    return <>
        <Layout.PageTitle title={t("navbar.contacts")}/>
        <div className={s.contacts_grid}>
            <ContactCard name={'Cеменов Михаил Николаевич'}
                         post={'Лицензирование'}
                         email={'mike@mail.npptec.ru'}
                         phoneNumber={'+7 3822 999 784'}
            />
            <ContactCard name={'Пшеничникова Наталья Павловна'}
                         post={'Техническая поддержка'}
                         email={'pnp@mail.npptec.ru'}
                         phoneNumber={'+7 3822 999 784'}
            />
        </div>
        <ChatWithDevelopersForm/>
    </>
}