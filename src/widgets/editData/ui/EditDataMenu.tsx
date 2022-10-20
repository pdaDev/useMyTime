import {FC, useEffect} from "react";
import {DialogMenu, Loader, Table, useNotify, useToggle} from "shared";
import {IData} from "../../../shared/ui/Table/Table";
import {useTranslation} from "react-i18next";

interface useQueryHook {
    isLoading: boolean
    data: IData
    isError: boolean
    isSuccess: boolean
    refetch: Function
}

type useMutationHook = [func: Function, meta: {
    isError: boolean
    isSuccess: boolean
    isFetching: boolean
}]

interface EditDataMenuProps {
    title: string
    prefix: string
    getHook: (body: undefined, config?: { skip?: boolean }) => useQueryHook,
    createHook: () => useMutationHook
    patchHook: () => useMutationHook
    deleteHook: () => useMutationHook
    headers: string[]
}

export const EditDataMenu: FC<EditDataMenuProps> = ({
                                                        title,
                                                        patchHook,
                                                        prefix,
                                                        getHook,
                                                        createHook,
                                                        deleteHook,
                                                        headers
                                                    }) => {
    const [isOpen, toggleOpen] = useToggle()
    const { t } = useTranslation()
    const {data, isLoading, refetch, isSuccess: getSuccess} = getHook(undefined, {skip: !isOpen})
    const [create, {isError: createError, isSuccess: createSuccess, isFetching: createFetching}] = createHook()
    const [deleteFunc, {isError: deleteError, isSuccess: deleteSuccess, isFetching: deleteFetching}] = deleteHook()
    const [patch, {isError: patchError, isSuccess: patchSuccess, isFetching: patchFetching}] = patchHook()

    const hasSuccess = createSuccess || patchSuccess || deleteSuccess
    useEffect(() => {
        isOpen && refetch()
        hasSuccess && refetch()
    }, [isOpen, refetch, hasSuccess])

    const patchEl = async (args: { id: number, body: object }) => {
        await patch(args).unwrap()
    }
    const createEl = async (obj: object) => {
        await create(obj).unwrap()
    }
    const deleteEl = async (id: number) => {
        await deleteFunc(id).unwrap()
    }

    const hasError = deleteError || createError || patchError
    const isFetching = createFetching || deleteFetching || patchFetching
    useNotify(hasError, t("errors.notSaved"), 'error')
    useNotify(hasSuccess, t("errors.saved"), 'success')
    return <DialogMenu title={title}
                       isOpen={isOpen}
                       toggleOpen={toggleOpen}
    >
        {
            isLoading && <Loader type={'block'}/>
        }
        {
            getSuccess && <Table prefix={prefix}
                                 headers={headers}
                                 patchEl={patchEl}
                                 createEl={createEl}
                                 deleteEl={deleteEl}
                                 data={data}
                                 fetching={isFetching}
            />
        }
    </DialogMenu>
}