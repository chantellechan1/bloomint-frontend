import { Task as ModelTask } from "../models/TaskModels"
import React from "react";

function CompletedTaskRow(props: {task: ModelTask, onUndoComplete: Function}) {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant
   */

  return (
    <li>
      <img
        src={`data:image/jpg;base64,${props.task.encoded_thumbnail}`}
        alt=""
      />
      {props.task.userplant.plant_name}
      <button onClick={() => props.onUndoComplete(props.task.id)}></button>
    </li>
  );
};

export default CompletedTaskRow;
