import { type UserPlant } from './PlantModels'

export interface Task {
  id: number
  type: string
  due_at: Date
  completed_at: Date | null
  encoded_thumbnail: string
  userplant: UserPlant
}
