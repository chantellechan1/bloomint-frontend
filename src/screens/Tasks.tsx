import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as AxiosService from '../api/AxiosService'
import { type Task as ModelTask } from '../models/TaskModels'
import UpcomingTasks from '../components/UpcomingTasks'
import DueTasks from '../components/DueTasks'
import CompletedTasks from '../components/CompletedTasks'

function Tasks (): JSX.Element {
  /*
   * This is the screen for tasks, things that need to be done
   * for you plant(s), including watering, fertilizing, etc
   */
  // TODO: remove hardcoded strings
  const [selectedButton, setSelectedButton] = useState('due')
  const [tasks, setTasks] = useState<ModelTask[]>([])
  const currentDate: Date = new Date()

  // Get all tasks from server, for today and upcoming
  useEffect(() => {
    const getTasks = async (): Promise<void> => {
      try {
        // TODO: move this to api/servercalls for consistency
        const res = await axios.get('/tasks/get_tasks', AxiosService.getOptionsAuthed())

        // some fix up: convert the date string into an actual
        // date object
        for (let i = 0; i < res.data.length; i++) {
          const task = res.data[i]
          task.due_at = new Date(task.due_at)
          if (task.completed_at !== null) {
            task.completed_at = new Date(task.completed_at)
          }
        }

        setTasks(res.data)
      } catch (e) {
        console.log(e)
      }
    }

    void getTasks()
  }, [])

  const getDueTasks = (): ModelTask[] => { return tasks.filter((x: ModelTask) => x.due_at <= currentDate && (x.completed_at == null)) }
  const getUpcomingTasks = (): ModelTask[] => { return tasks.filter((x: ModelTask) => x.due_at > currentDate) }
  const getCompletedTasks = (): ModelTask[] => { return tasks.filter((x: ModelTask) => x.completed_at) }

  return (
    <React.Fragment>
      <div className="row justify-content-evenly">
        <div className="col-4">
          <button
            type="button"
            className={selectedButton === 'due' ? 'w-100 btn btn-primary' : 'w-100 btn btn-outline'}
            onClick={() => { setSelectedButton('due') }}>
            Today
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            className={selectedButton === 'upcoming' ? 'w-100 btn btn-primary' : 'w-100 btn btn-outline'}
            onClick={() => { setSelectedButton('upcoming') }}>
            Upcoming
          </button>
        </div>
        <div className="col-4">
          <button
            type="button"
            className={selectedButton === 'completed' ? 'w-100 btn btn-primary' : 'w-100 btn btn-outline'}
            onClick={() => { setSelectedButton('completed') }}>
            Completed
          </button>
        </div>
      </div>
      <div>
        {selectedButton === 'due' && <DueTasks
                                          tasks={tasks}
                                          dueTasks={getDueTasks()}
                                          setTasks={setTasks}/>}
        {selectedButton === 'upcoming' && <UpcomingTasks
                                          tasks={getUpcomingTasks()}/>}
        {selectedButton === 'completed' && <CompletedTasks
                                           tasks={tasks}
                                           completedTasks={getCompletedTasks()}
                                           setTasks={setTasks}/>}
      </div>
    </React.Fragment>
  )
};

export default Tasks
