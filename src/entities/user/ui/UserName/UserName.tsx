import {FC} from "react";
import {Title} from "shared";

interface IUserName {
    type: 'full' | 'surname and initials'
    loading?: boolean
    fio: string | null
}

export const UserName: FC<IUserName> = ({type = 'full', loading= false, fio}) => {
    if (fio) {
        let name: string
        switch (type) {
            case "full":
                name = fio
                break
            case 'surname and initials':
                const ar = fio.split(' ')

                name = `${ar[0]} ${ar[1][0].toUpperCase()}`
        }
        return <Title type={4} message={name} loading={loading}/>
    }
    return <div/>

}