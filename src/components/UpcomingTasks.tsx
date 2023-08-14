import React from "react";
import { Task as ModelTask } from "../models/TaskModels"
import UpcomingTaskRow from "./UpcomingTaskRow"

function UpcomingTasks(props: {tasks: Array<ModelTask>}) {
  /*
   * Displays all the upcoming tasks.
   */
  function areSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
  let twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(today.getDate()+2);
  let threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate()+3);

  // この３つでいいはずだ
  const tomorrowsTasks = props.tasks
    .filter(task => areSameDate(task.due_at, tomorrow))
    .map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>);
  const twoDaysTasks = props.tasks
    .filter(task => areSameDate(task.due_at, twoDaysFromNow))
    .map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>);

  // This is for tasks within one week from today.
  // the server side should make sure I dont see tasks that are super far into the future.
  const thisWeeksTasks = props.tasks
    .filter(task => areSameDate(task.due_at, threeDaysFromNow) || task.due_at > threeDaysFromNow)
    .map(task => <UpcomingTaskRow key={task.id.toString()} task={task}/>);

  return (
    <React.Fragment>
      {tomorrowsTasks.length > 0 && (<><p>Tomorrow</p><ul>{tomorrowsTasks}</ul></>)}
      {twoDaysTasks.length > 0 && (<><p>In 2 days</p><ul>{twoDaysTasks}</ul></>)}
      {thisWeeksTasks.length > 0 && (<><p>This week</p><ul>{thisWeeksTasks}</ul></>)}
    </React.Fragment>
  );
};

export default UpcomingTasks;
