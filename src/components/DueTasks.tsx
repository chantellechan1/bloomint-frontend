import React from 'react'
import { type Task as ModelTask } from '../models/TaskModels'
import DueTaskRow from '../components/DueTaskRow'
import { DatesAreSame } from '../utils/Utils'
import { UpdateTask, type UpdateTaskRequest } from '../api/ServerCalls'
import Loading from '../components/Loading'

const DueTasks = (props: { dueTasks: ModelTask[], tasks: ModelTask[], loadedTasksFromServer: boolean, setTasks: (tasks: ModelTask[]) => void }): JSX.Element => {
  /*
   * Displays all tasks that are due.
   * Tasks from today, and tasks from the past that werent done
   */
  const onComplete = async (taskID: number): Promise<void> => {
    const taskIndex = props.tasks.findIndex(task => task.id === taskID)

    if (taskIndex !== -1) {
      const updateTaskRequest: UpdateTaskRequest = {
        completed: true
      }
      await UpdateTask(taskID, updateTaskRequest)

      const updatedTasks = [...props.tasks]
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed_at: new Date() }
      props.setTasks(updatedTasks)
    }
  }

  const today = new Date()

  const todaysTaskRows = props.dueTasks
    .filter(task => (task.completed_at == null) && DatesAreSame(task.due_at, today))
    .map(task => <DueTaskRow key={task.id.toString()} task={task} onComplete={onComplete}/>)

  // the check for task.due_at < today shouldnt be necessary
  // because the parent isnt passing in future tasks, but for clarity and consistency
  // i will do this check
  const pastDueTaskRows = props.dueTasks
    .filter(task => (task.completed_at == null) && !DatesAreSame(task.due_at, today) && task.due_at < today)
    .map(task => <DueTaskRow key={task.id.toString()} task={task} onComplete={onComplete}/>)

  const unfinishedTasksExist: boolean = todaysTaskRows.length > 0 || pastDueTaskRows.length > 0

  return (
    <div className="tasks-list__display-box">
      {props.loadedTasksFromServer
        ? (unfinishedTasksExist
            ? (<div>
            <p>Plants to water</p>
            <ul>{pastDueTaskRows}</ul>
            <ul>{todaysTaskRows}</ul>
          </div>)
            : (<div> All tasks are completed </div>))
        : (<div className="centered-div"><Loading/></div>)}
    </div>
  )
}

export default DueTasks
