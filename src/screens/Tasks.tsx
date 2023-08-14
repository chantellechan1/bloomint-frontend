import React, { useEffect, useState } from "react";
import axios from "axios";
import * as AxiosService from '../api/AxiosService';
import {Task as ModelTask} from "../models/TaskModels"
import UpcomingTasks from "../components/UpcomingTasks"
import DueTasks from "../components/DueTasks"
import CompletedTasks from "../components/CompletedTasks"

function Tasks() {
  /*
   * This is the screen for tasks, things that need to be done
   * for you plant(s), including watering, fertilizing, etc
   */
  // TODO: remove hardcoded strings
  const [selectedButton, setSelectedButton] = useState("today");
  const [dueTasks, setDueTasks] = useState<ModelTask[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<ModelTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ModelTask[]>([]);

  // Get all tasks from server, for today and upcoming
  useEffect(() => {
    const getTasks = async () => {
      try {
        // TODO: move this to api/servercalls for consistency
        const res = await axios.get('/tasks/get_tasks', AxiosService.getOptionsAuthed());
        const currentDate: Date = new Date();

        // some fix up: convert the date string into an actual
        // date object
        for (var i=0; i<res.data.length; i++) {
          let task = res.data[i];
          task.due_at = new Date(task.due_at);
          if (task.completed_at) {
            task.completed_at = new Date(task.completed_at);
          }
        }

        const dueTasks: Array<ModelTask> = res.data.filter((x: ModelTask) => x.due_at <= currentDate && !x.completed_at);
        const upcomingTasks: Array<ModelTask> = res.data.filter((x: ModelTask) => x.due_at > currentDate);
        const completedTasks: Array<ModelTask> = res.data.filter((x: ModelTask) => x.completed_at);

        setDueTasks(dueTasks);
        setUpcomingTasks(upcomingTasks);
        setCompletedTasks(completedTasks);
      } catch (e) {
        console.log(e)
      }
    }

    getTasks();
  }, []);

  return (
    <React.Fragment>
      <div className="row justify-content-evenly">
        <div className="col-4">
          <button
            type="button"
            className={selectedButton === "today" ? "w-100 btn btn-primary" : "w-100 btn btn-outline"}
            onClick={() => {setSelectedButton("today")}}>
            Today
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            className={selectedButton === "upcoming" ? "w-100 btn btn-primary" : "w-100 btn btn-outline"}
            onClick={() => {setSelectedButton("upcoming")}}>
            Upcoming
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            className={selectedButton === "completed" ? "w-100 btn btn-primary" : "w-100 btn btn-outline"}
            onClick={() => {setSelectedButton("completed")}}>
            Completed
          </button>
        </div>
      </div>
      <div>
        {selectedButton === "today" && <DueTasks
                                          tasks={dueTasks}
                                          setTasks={setDueTasks}/>}
        {selectedButton === "upcoming" && <UpcomingTasks
                                          tasks={upcomingTasks}/>}
        {selectedButton === "completed" && <CompletedTasks
                                           tasks={completedTasks}
                                           setTasks={setDueTasks}/>}
      </div>
    </React.Fragment>
  );
};

export default Tasks;
