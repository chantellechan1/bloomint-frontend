import React from 'react'
import { type Task as ModelTask } from '../models/TaskModels'
import { UpdateTask, type UpdateTaskRequest } from '../api/ServerCalls'
import CompletedTaskRow from '../components/CompletedTaskRow'

const CompletedTasks = (props: { completedTasks: ModelTask[], tasks: ModelTask[], setTasks: (taskID: ModelTask[]) => void }): JSX.Element => {
  /*
   * Displays all tasks that are due.
   * Also has functionality to allow a user to undo a completed task,
   * which moves it back to the "due tasks" UI
   */
  const onUndoComplete = async (taskID: number): Promise<void> => {
    const taskIndex = props.tasks.findIndex(task => task.id === taskID)

    if (taskIndex !== -1) {
      const updateTaskRequest: UpdateTaskRequest = {
        completed: false
      }
      await UpdateTask(taskID, updateTaskRequest)
      const updatedTasks = [...props.tasks]
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed_at: null }
      props.setTasks(updatedTasks)
    }
  }

  const completedTaskRows = props.completedTasks
    .map(task => <CompletedTaskRow key={task.id.toString()} task={task} onUndoComplete={onUndoComplete}/>)

  const completedTasksExist = completedTaskRows.length > 0

  return (
    completedTasksExist
      ? <div className="tasks-list__display-box">
          <p>Completed</p>
          <ul>
            {completedTaskRows}
          </ul>
        </div>
      : <React.Fragment></React.Fragment>
  )
}

export default CompletedTasks
