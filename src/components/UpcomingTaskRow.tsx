import { Task as ModelTask } from "../models/TaskModels"
import React from "react";

function UpcomingTaskRow(props: {task: ModelTask}) {
  /*
   * Displays a single row on the tasks page with a small
   * image of the plant, the name of the plant,
   */

  return (
    <React.Fragment>
      <img
        src={`data:image/jpg;base64,${props.task.encoded_thumbnail}`}
      />
      {props.task.due_at.toString()}
    </React.Fragment>
  );
};

export default UpcomingTaskRow;
