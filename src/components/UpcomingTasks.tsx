import React from "react";
import { Task as ModelTask } from "../models/TaskModels"
import UpcomingTaskRow from "./UpcomingTaskRow"

function UpcomingTasks(props: {tasks: Array<ModelTask>}) {
  /*
   * Displays all the upcoming tasks.
   */
  const listItems = props.tasks.map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>);

  return (
    <ul>
      {listItems}
    </ul>
  );
};

export default UpcomingTasks;
