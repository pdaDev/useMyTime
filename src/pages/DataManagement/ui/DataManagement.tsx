import {FC} from "react";
import {Layout, useRedirect} from "shared";
import {useTranslation} from "react-i18next";
import {EditDataMenu} from "../../../widgets/editData";
import {useSelector} from "react-redux";
import {UserSelectors} from 'entities/user'
import {
    useGetTypesOfProjectQuery,
    useCreateTypeOfProjectMutation,
    useDeleteTypeOfProjectMutation,
    usePatchTypeOfProjectMutation,
    useGetDirectionTypeOfProjectsQuery,
    useCreateDirectionTypeOfProjectMutation,
    useDeleteDirectionTypeOfProjectMutation,
    usePatchDirectionTypeOfProjectMutation,
    useGetAllProgramsQuery,
    useSetNewProgramMutation,
    useDeleteProgramMutation,
    usePatchProgramMutation
} from "entities/project";

export const DataManagement: FC = () => {
    const {t} = useTranslation()
    const isAdmin = useSelector(UserSelectors.getIsAdmin)
    const projectType = ['abbreviation', 'explanation']
    const programHeaders = ['name']
    useRedirect('/projects', isAdmin, false)
    return <>
        <Layout.PageTitle title={t("navbar.dataManagement")}/>
        <EditDataMenu title={t("dataManagement.projectType.title")}
                      headers={projectType}
                      prefix={"dataManagement.projectType"}
                      createHook={useCreateTypeOfProjectMutation as any}
                      getHook={useGetTypesOfProjectQuery as any}
                      deleteHook={useDeleteTypeOfProjectMutation as any}
                      patchHook={usePatchTypeOfProjectMutation as any}
        />
        <EditDataMenu title={t("dataManagement.directionType.title")}
                      prefix={"dataManagement.projectType"}
                      getHook={useGetDirectionTypeOfProjectsQuery as any}
                      createHook={useCreateDirectionTypeOfProjectMutation as any}
                      patchHook={usePatchDirectionTypeOfProjectMutation as any}
                      deleteHook={useDeleteDirectionTypeOfProjectMutation as any}
                      headers={projectType}
        />
        <EditDataMenu title={t("dataManagement.programs.title")}
                      prefix={"dataManagement.programs"}
                      getHook={useGetAllProgramsQuery as any}
                      createHook={useSetNewProgramMutation as any}
                      patchHook={usePatchProgramMutation as any}
                      deleteHook={useDeleteProgramMutation as any}
                      headers={programHeaders}
        />
    </>
}