import { UserPlant } from "./PlantModels"

export interface Task {
  id: number
  type: String
  due_at: Date
  completed_at: Date | null
  encoded_thumbnail: String
  userplant: UserPlant
}
