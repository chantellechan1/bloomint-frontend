import React from "react";
import { Task as ModelTask } from "../models/TaskModels"
import DueTaskRow from "../components/DueTaskRow"
import { DatesAreSame } from "../utils/Utils"
import { CompleteTask, CompleteTaskRequest } from "../api/ServerCalls"

function DueTasks(props: {dueTasks: Array<ModelTask>, tasks: Array<ModelTask>, setTasks: Function}) {
  /*
   * Displays all tasks that are due.
   * Tasks from today, and tasks from the past that werent done
   */
  function onComplete(taskID: number): void {
    const taskIndex = props.tasks.findIndex(task => task.id === taskID);

      if (taskIndex !== -1) {
        const updatedTasks = [...props.tasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed_at: new Date() };
        props.setTasks(updatedTasks);

        const completeTaskRequest: CompleteTaskRequest = {
          taskID: taskID
        };
        CompleteTask(completeTaskRequest);
      }
  }

  const today = new Date();

  const todaysTaskRows = props.dueTasks
    .filter(task => !task.completed_at && DatesAreSame(task.due_at, today))
    .map(task => <DueTaskRow key={task.id.toString()} task={task} onComplete={onComplete}/>);

  // the check for task.due_at < today shouldnt be necessary
  // because the parent isnt passing in future tasks, but for clarity and consistency
  // i will do this check
  const pastDueTaskRows = props.dueTasks
    .filter(task => !task.completed_at && !DatesAreSame(task.due_at, today) && task.due_at < today)
    .map(task => <DueTaskRow key={task.id.toString()} task={task} onComplete={onComplete}/>);

  return (
    <React.Fragment>
      {<ul>{todaysTaskRows}</ul>}
      {<ul>{pastDueTaskRows}</ul>}
    </React.Fragment>
  );
};

export default DueTasks;
