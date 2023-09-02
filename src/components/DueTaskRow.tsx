import { type Task as ModelTask } from '../models/TaskModels'
import React from 'react'
import { RiCheckLine } from 'react-icons/ri'
import '../index.css'

const DueTaskRow = (props: { task: ModelTask, onComplete: (taskID: number) => Promise<void> }): JSX.Element => {
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
      <button
        onClick={() => { void props.onComplete(props.task.id) }}
        className="tasks-list__task-button tasks-list__task-button--complete">
        <RiCheckLine className="tasks-list__task-button__check tasks-list__task-button__check--complete"/>
      </button>
    </li>
  )
}

export default DueTaskRow
