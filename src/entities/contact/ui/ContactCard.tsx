    import {FC} from "react";
import s from './ContactCard.module.scss'
import {Title} from "../../../shared";

interface IContactCard {
    name: string
    post: string
    email: string
    phoneNumber: string
}

export const ContactCard: FC<IContactCard> = ({
    phoneNumber,
    name,
    post,
    email
                                              }) => {
    return <div className={s.contact_card}>
        <Title type={3} message={post}/>
        <div className={s.fio}>
            <Title type={4} message={name}/>
        </div>
        <div className={s.contacts}>
            <Title type={5} message={email}/>
        </div>
        <Title type={5} message={phoneNumber}
               color={'secondary'}
               weight={'medium'}
        />
    </div>
}