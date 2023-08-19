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
