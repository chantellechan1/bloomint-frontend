import React from "react";
import {Task as ModelTask} from "../models/TaskModels"
import { UndoCompleteTask, UndoCompleteTaskRequest } from "../api/ServerCalls"
import CompletedTaskRow from "../components/CompletedTaskRow"

function CompletedTasks(props: {completedTasks: Array<ModelTask>, tasks: Array<ModelTask>, setTasks: Function}) {
  /*
   * Displays all tasks that are due.
   * Also has functionality to allow a user to undo a completed task,
   * which moves it back to the "due tasks" UI
   */
  function onUndoComplete(taskID: number): void {
    const taskIndex = props.tasks.findIndex(task => task.id === taskID);

      if (taskIndex !== -1) {
        const updatedTasks = [...props.tasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], completed_at: null };
        props.setTasks(updatedTasks);

        const completeTaskRequest: UndoCompleteTaskRequest = {
          taskID: taskID
        };
        UndoCompleteTask(completeTaskRequest);
      }
  }

  const completedTaskRows = props.completedTasks
    .map(task => <CompletedTaskRow key={task.id.toString()} task={task} onUndoComplete={onUndoComplete}/>);

  return (
    <ul>{completedTaskRows}</ul>
  );
}

export default CompletedTasks;
