import { type Task as ModelTask } from '../models/TaskModels'
import React from 'react'

const DueTaskRow = (props: { task: ModelTask, onComplete: (taskID: number) => Promise<void> }): JSX.Element => {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant,
   */

  return (
    <React.Fragment>
      <li>
        <img
          src={`data:image/jpg;base64,${props.task.encoded_thumbnail}`}
          alt=""
        />
        {props.task.userplant.plant_name} due at: {props.task.due_at.toString()}
        <button onClick={() => { void props.onComplete(props.task.id) }}></button>
      </li>
    </React.Fragment>
  )
}

export default DueTaskRow
