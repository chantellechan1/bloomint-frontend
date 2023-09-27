import React from 'react'
import { type Task as ModelTask } from '../models/TaskModels'
import UpcomingTaskRow from './UpcomingTaskRow'
import { DatesAreSame } from '../utils/Utils'
import Loading from '../components/Loading'

const UpcomingTasks = (props: { tasks: ModelTask[], loadedTasksFromServer: boolean }): JSX.Element => {
  /*
   * Displays all the upcoming tasks.
   */
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  const twoDaysFromNow = new Date()
  twoDaysFromNow.setDate(today.getDate() + 2)
  const threeDaysFromNow = new Date()
  threeDaysFromNow.setDate(today.getDate() + 3)

  // この３つでいいはずだ
  const tomorrowsTaskRows = props.tasks
    .filter(task => DatesAreSame(task.due_at, tomorrow))
    .map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>)
  const twoDaysTaskRows = props.tasks
    .filter(task => DatesAreSame(task.due_at, twoDaysFromNow))
    .map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>)

  // This is for tasks within one week from today.
  // the server side should make sure I dont see tasks that are super far into the future.
  const thisWeeksTaskRows = props.tasks
    .filter(task => DatesAreSame(task.due_at, threeDaysFromNow) || task.due_at > threeDaysFromNow)
    .map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>)

  const upcomingTasksExist: boolean = tomorrowsTaskRows.length > 0 || twoDaysTaskRows.length > 0 || thisWeeksTaskRows.length > 0

  return (
    <div className="tasks-list__display-box">
      {props.loadedTasksFromServer
        ? (upcomingTasksExist
            ? (<div>
              {tomorrowsTaskRows.length > 0 && (<><p>Tomorrow</p><ul>{tomorrowsTaskRows}</ul></>)}
              {twoDaysTaskRows.length > 0 && (<><p>In 2 days</p><ul>{twoDaysTaskRows}</ul></>)}
              {thisWeeksTaskRows.length > 0 && (<><p>This week</p><ul>{thisWeeksTaskRows}</ul></>)}
            </div>)
            : (<div> No upcoming tasks </div>))
        : (<div className="centered-div"><Loading/></div>)}
    </div>
  )
}

export default UpcomingTasks
