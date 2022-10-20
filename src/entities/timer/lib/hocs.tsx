import React, {FC} from "react";
import {connect} from "react-redux";
import {getActiveProject, getActiveTask, getPlayButtonClicks, getStatus, getTouched} from '../model/Timer.selectors'
import {startTimer, stopTimer} from 'entities/timer'

import {stateType} from "../../../app/store";

interface IStateProps {
    status: boolean,
    hasTouched: boolean,
    projectId: number,
    taskId: number
    clicks: number
    startTimer: Function,
    stopTimer: Function
}

export const withTimerToggle = (Component: FC) => {
    const mapState = (state: stateType) => ({
        status: getStatus(state),
        hasTouched: getTouched(state),
        projectId: getActiveProject(state),
        taskId: getActiveTask(state),
        clicks: getPlayButtonClicks(state)
    })
    class Container extends React.Component<IStateProps, any> {
        componentDidUpdate(prevProps: Readonly<IStateProps>) {
            const {taskId, projectId, status, hasTouched, stopTimer,startTimer, clicks} = this.props
            const hasStatusChanges = status !== prevProps.status
            const hasClickIncremented = clicks > prevProps.clicks
            const hasTaskAndProjectChanges = (taskId !== prevProps.taskId && prevProps.taskId !== null)
                || (projectId !== prevProps.projectId && prevProps.projectId !== null)

            if ( hasTaskAndProjectChanges && hasTouched && status && !hasStatusChanges ) {
                stopTimer()
                    .then(() => startTimer())
            }
            if (hasStatusChanges && hasClickIncremented) {
                if (status) {
                    startTimer()
                } else {
                    stopTimer()
                }
            }
        }

        render() {
            return <Component {...this.props as any}/>;
        }
    }
    return connect(mapState, {startTimer, stopTimer})(Container as any)

}
