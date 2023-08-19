import { type Task as ModelTask } from '../models/TaskModels'
import React from 'react'

const CompletedTaskRow = (props: { task: ModelTask, onUndoComplete: (taskID: number) => Promise<void> }): JSX.Element => {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant
   */

  return (
    <React.Fragment>
      <li>
        <img
          src={`data:image/jpg;base64,${props.task.encoded_thumbnail}`}
          alt=""
        />
        {props.task.userplant.plant_name} was due at: {props.task.due_at.toString()}
        <button onClick={() => { void props.onUndoComplete(props.task.id) }}></button>
      </li>
    </React.Fragment>
  )
}

export default CompletedTaskRow
