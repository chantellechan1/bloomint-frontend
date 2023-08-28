import * as AxiosService from './AxiosService'
import axios from 'axios'

export interface GenericResponse {
  status: string
  error?: unknown
}

export interface CreateAccountRequest {
  email: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse extends GenericResponse {
  jwt: string
}

export interface CompleteTaskRequest {
  taskID: number
}

export interface UndoCompleteTaskRequest {
  taskID: number
}

export interface CreateUserPlantRequest {
  planttype_id: number
  plant_name?: string
  notes?: string
}

// this is only for one plant.
// the API call accepts a list of these
export interface EditUserPlantRequest {
  id: number
  planttype_id: number
  plant_name?: string
  notes?: string
}

// this is only for one image.
// the API call accepts a list of these
export interface CreateUserPlantImageRequest {
  userplant_id: number
  image_base_64: string
}

export const CreateAccount = async (req: CreateAccountRequest): Promise<GenericResponse> => {
  await axios.post<string>(
    '/auth/create_user',
    req,
    AxiosService.getOptions()
  )

  return { status: 'success' }
}

export const Login = async (req: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<{ jwt: string }>(
    '/auth/login',
    req,
    AxiosService.getOptions()
  )

  return { status: 'success', jwt: res.data.jwt }
}

export const CompleteTask = async (req: CompleteTaskRequest): Promise<GenericResponse> => {
  await axios.post(
    '/tasks/complete_tasks',
    { task_ids: [req.taskID] },
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const UndoCompleteTask = async (req: CompleteTaskRequest): Promise<GenericResponse> => {
  await axios.post(
    '/tasks/undo_complete_tasks',
    { task_ids: [req.taskID] },
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const CreateUserPlant = async (req: CreateUserPlantRequest): Promise<GenericResponse> => {
  await axios.post(
    '/plants/user/create',
    [req],
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const EditUserPlant = async (req: EditUserPlantRequest): Promise<GenericResponse> => {
  await axios.post(
    '/plants/user/update',
    [req],
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const CreateUserPlantImages = async (req: CreateUserPlantImageRequest[]): Promise<GenericResponse> => {
  await axios.post(
    '/plants/images/create',
    req,
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}
