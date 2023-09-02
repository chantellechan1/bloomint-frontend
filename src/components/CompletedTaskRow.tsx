import { type Task as ModelTask } from '../models/TaskModels'
import React from 'react'
import '../index.css'
import { RiCheckLine } from 'react-icons/ri'

const CompletedTaskRow = (props: { task: ModelTask, onUndoComplete: (taskID: number) => Promise<void> }): JSX.Element => {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant
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
        onClick={() => { void props.onUndoComplete(props.task.id) }}
        className="tasks-list__task-button tasks-list__task-button--uncomplete">
        <RiCheckLine className="tasks-list__task-button__check tasks-list__task-button__check--uncomplete"/>
      </button>
    </li>
  )
}

export default CompletedTaskRow
