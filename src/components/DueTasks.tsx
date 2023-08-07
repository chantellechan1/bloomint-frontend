import React from "react";
import { Task as ModelTask } from "../models/TaskModels"
import DueTaskRow from "../components/DueTaskRow"

function DueTasks(props: {tasks: Array<ModelTask>}) {
  /*
   * Displays all tasks that are due.
   * Tasks from today, and tasks from the past that werent done
   */
  const listItems = props.tasks.map(task => <DueTaskRow task={task}/>);

  return (
    <React.Fragment>
      <div>
        {listItems}
      </div>
    </React.Fragment>
  );
};

export default DueTasks;
