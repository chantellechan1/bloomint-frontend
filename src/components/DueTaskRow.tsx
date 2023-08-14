import { Task as ModelTask } from "../models/TaskModels"
import React from "react";

function DueTaskRow(props: {task: ModelTask, onComplete: Function}) {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant,
   */

  return (
    <li>
      <img
        src={`data:image/jpg;base64,${props.task.encoded_thumbnail}`}
        alt=""
      />
      {props.task.userplant.plant_name} due at: {props.task.due_at.toString()}
      <button onClick={() => props.onComplete(props.task.id)}></button>
    </li>
  );
};

export default DueTaskRow;
