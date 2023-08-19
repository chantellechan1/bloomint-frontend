import React from 'react'
import { type Task as ModelTask } from '../models/TaskModels'
import { UndoCompleteTask, type UndoCompleteTaskRequest } from '../api/ServerCalls'
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
      const completeTaskRequest: UndoCompleteTaskRequest = {
        taskID
      }
      await UndoCompleteTask(completeTaskRequest)
      const updatedTasks = [...props.tasks]
      updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed_at: null }
      props.setTasks(updatedTasks)
    }
  }

  const completedTaskRows = props.completedTasks
    .map(task => <CompletedTaskRow key={task.id.toString()} task={task} onUndoComplete={onUndoComplete}/>)

  return (
    <React.Fragment>
      <ul>
        {completedTaskRows}
      </ul>
    </React.Fragment>
  )
}

export default CompletedTasks
