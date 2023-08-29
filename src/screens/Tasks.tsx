import React, { useEffect, useState } from 'react'
import { type Task as ModelTask } from '../models/TaskModels'
import UpcomingTasks from '../components/UpcomingTasks'
import DueTasks from '../components/DueTasks'
import CompletedTasks from '../components/CompletedTasks'
import { GetTasks } from '../api/ServerCalls'

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
        const receivedTasks: ModelTask[] = await GetTasks()
        // some fix up: convert the date string into an actual
        // date object
        for (let i = 0; i < receivedTasks.length; i++) {
          const receivedTask = receivedTasks[i]
          receivedTask.due_at = new Date(receivedTask.due_at)
          if (receivedTask.completed_at !== null) {
            receivedTask.completed_at = new Date(receivedTask.completed_at)
          }
        }

        setTasks(receivedTasks)
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
