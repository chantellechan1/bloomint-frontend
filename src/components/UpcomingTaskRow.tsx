import { type Task as ModelTask } from '../models/TaskModels'
import React from 'react'
import '../index.css'

function UpcomingTaskRow (props: { task: ModelTask }): JSX.Element {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant,
   */
  return (
    <li className="tasks-list__row">
      <img
        src={`data:image/jpg;base64,${props.task.encoded_thumbnail}`}
        alt=""
        className="round-thumbnail tasks-list__plant-image"
      />
      <div className="tasks-list__description">
        {props.task.userplant.plant_name}
      </div>
    </li>
  )
};

export default UpcomingTaskRow
