import { type Task as ModelTask } from '../models/TaskModels'
import React from 'react'

function UpcomingTaskRow (props: { task: ModelTask }): JSX.Element {
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
        {props.task.userplant.plant_name}
      </li>
    </React.Fragment>
  )
};

export default UpcomingTaskRow
