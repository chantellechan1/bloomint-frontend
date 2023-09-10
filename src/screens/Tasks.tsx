import React, { useEffect, useState } from 'react'
import { type Task as ModelTask } from '../models/TaskModels'
import UpcomingTasks from '../components/UpcomingTasks'
import DueTasks from '../components/DueTasks'
import CompletedTasks from '../components/CompletedTasks'
import { GetTasks } from '../api/ServerCalls'
import FoliageImage from '../assets/images/foliage.png'
import '../index.css'

const Tasks = (): JSX.Element => {
  /*
   * This is the screen for tasks, things that need to be done
   * for you plant(s), including watering, fertilizing, etc
   */
  // TODO: remove hardcoded strings
  const [selectedButton, setSelectedButton] = useState('due')
  const [tasks, setTasks] = useState<ModelTask[]>([])
  const [loadedTasksFromServer, setLoadedTasksFromServer] = useState<boolean>(false)
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
        setLoadedTasksFromServer(true)
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
    <div>
      <img
        className="task-top-decoration"
        src={FoliageImage} />
      <div className="task-select-button-container">
        <button
          type="button"
          className={'task-select-button ' +
            (selectedButton === 'due' ? 'task-select-button--selected' : 'task-select-button--unselected')}
          onClick={() => { setSelectedButton('due') }}>
          Today
        </button>
        <button
          type="button"
          className={'task-select-button ' +
            (selectedButton === 'upcoming' ? 'task-select-button--selected' : 'task-select-button--unselected')}
          onClick={() => { setSelectedButton('upcoming') }}>
          Upcoming
        </button>
      </div>
      {selectedButton === 'due' &&
        <React.Fragment>
          <DueTasks
            tasks={tasks}
            dueTasks={getDueTasks()}
            loadedTasksFromServer={loadedTasksFromServer}
            setTasks={setTasks}/>
          <CompletedTasks
            tasks={tasks}
            completedTasks={getCompletedTasks()}
            setTasks={setTasks}/>
        </React.Fragment>}
      {selectedButton === 'upcoming' &&
          <UpcomingTasks
            tasks={getUpcomingTasks()}/>}
    </div>
  )
}

export default Tasks
