/**
 * Creates the current day's tasks for a user, if they do not exist
 * Also contains utility functions to toggle a task's status (isDone)
 *
 */

import { individualPlant, Plant, plantType } from "../models/plantModels";
import { server } from "../server";

const MS_PER_DAY = 86400000; // milliseconds in one day

export interface Task {
  name: string | "water"; // default task is watering
  plant_name: string;
  user_plant_id: number;
  isDone: boolean;
}

export interface TaskData {
  generationTimeStamp: number; // a number of milliseconds to represent when task data was generated, using Date.now()
  tasks: Task[];
}

export const getTasks = async () => {
  let storedTasks = localStorage.getItem("taskData");
  let parsedTasks: TaskData;

  if (!storedTasks) {
    parsedTasks = await generateTasks();
  } else {
    parsedTasks = JSON.parse(storedTasks) as TaskData;

    const currentTime = Date.now();

    // check stored task generationTimeStamp
    // regenerate if data is more than a day old
    if (currentTime - parsedTasks.generationTimeStamp >= MS_PER_DAY) {
      parsedTasks = await generateTasks();
    }
  }
  return parsedTasks.tasks;
};

/**
 * Generate the current day's tasks for a user and store in localStorage
 */
const generateTasks = async (): Promise<TaskData> => {
  const userPlants: Plant[] = (await server.GetAllUserPlants()).allPlants;
  const allPlantTypes: plantType[] = await server.GetAllPlantTypes();

  const mergedPlantsUnfiltered: (individualPlant | undefined)[] =
    userPlants.map((userPlant: Plant) => {
      const matchingPlantType = allPlantTypes.find(
        (singlePlantType: plantType) =>
          singlePlantType.id === userPlant.plant_id
      );
      if (!matchingPlantType) {
        return undefined;
      }
      return {
        ...userPlant,
        ...matchingPlantType,
      };
    });

  // remove undefined records
  const mergedPlants = mergedPlantsUnfiltered.filter(
    (plantOrUndefined) => plantOrUndefined
  ) as individualPlant[];

  // filter down to plants with watering multiple for current day
  const filteredPlants = mergedPlants.filter(
    (plant: individualPlant) =>
      (Date.parse(plant.created_at) % plant.water_frequency) * MS_PER_DAY === 0
  );

  const tasks = filteredPlants.map(
    (plant: individualPlant) =>
      ({
        name: "water",
        plant_name: plant.name,
        user_plant_id: plant.user_plant_id,
        isDone: false,
      } as Task)
  );

  const currentTimeStamp = Date.now();
  const generationTimeStamp =
    currentTimeStamp - (currentTimeStamp % MS_PER_DAY); // round down to the nearest day

  const taskData: TaskData = { generationTimeStamp, tasks };
  localStorage.setItem("taskData", JSON.stringify(taskData));

  return taskData;
};

export default getTasks;
