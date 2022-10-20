
interface Type {
    id: number
    abbreviation: string
    explanation: string
}

export const getTypeValue = (types: Type[], id: number) => {
    const type =  types.find(type => type.id === id)
    return  type ? type.abbreviation : undefined
}

interface IOption {
    value: string
    label: string
}
export const getOptionsFromTypes = (types: Type[]): IOption[] => {
    return types.map(type => ({
        value: type.id.toString(),
        label: type.abbreviation
    }))
}