import * as AxiosService from './AxiosService'
import axios, { type AxiosResponse } from 'axios'
import { type UserPlant, type PlantType } from '../models/PlantModels'
import { type User } from '../models/AuthModels'
import { type Task } from '../models/TaskModels'

export interface GenericResponse {
  status: string
  error?: unknown
}

export interface VerifyEmailRequest {
  email: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse extends GenericResponse {
  jwt: string
}

export interface UpdateTaskRequest {
  completed: boolean
}

export interface GetTasksResponse {
  id: number
  userplant: UserPlant
  encoded_thumbnail: string
  due_at: Date
  completed_at: Date
  type: string
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
export interface UpdateUserPlantRequest {
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

export interface GetUserPlantImageResponse {
  id: number
  userplant_id: number
  image_data: string
}

export const VerifyEmail = async (req: VerifyEmailRequest): Promise<GenericResponse> => {
  await axios.post<string>(
    '/auth/user/email_verification',
    req,
    AxiosService.getOptions()
  )

  return { status: 'success' }
}

export const Login = async (req: LoginRequest): Promise<LoginResponse> => {
  const res: AxiosResponse = await axios.post<{ jwt: string }>(
    '/auth/user/jwt',
    req,
    AxiosService.getOptions()
  )

  return { status: 'success', jwt: res.data.jwt }
}

export const GetUser = async (): Promise<User> => {
  const res = await axios.get(
    '/auth/user',
    AxiosService.getOptionsAuthed()
  )

  return res.data
}

export const GetPlantTypes = async (): Promise<PlantType[]> => {
  const res = await axios.get(
    '/planttypes',
    AxiosService.getOptionsAuthed()
  )

  return res.data
}

export const GetUserPlants = async (): Promise<UserPlant[]> => {
  const res: AxiosResponse = await axios.get(
    '/userplants',
    AxiosService.getOptionsAuthed()
  )

  return res.data
}

export const CreateUserPlant = async (req: CreateUserPlantRequest): Promise<GenericResponse> => {
  await axios.post(
    'userplants',
    req,
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const UpdateUserPlant = async (req: UpdateUserPlantRequest, userplantID: number): Promise<GenericResponse> => {
  await axios.put(
    `userplants?userplant_id=${userplantID}`,
    req,
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const CreateUserPlantImages = async (req: CreateUserPlantImageRequest[]): Promise<GenericResponse> => {
  await axios.post(
    '/userplants/images',
    req,
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}

export const GetUserPlantImages = async (userplantID: number): Promise<GetUserPlantImageResponse[]> => {
  const res: AxiosResponse = await axios.get(
    `/userplants/images?userplant_id=${userplantID}`,
    AxiosService.getOptionsAuthed()
  )

  return res.data
}

export const DeleteUserPlantImage = async (imageID: number): Promise<GenericResponse[]> => {
  const res: AxiosResponse = await axios.delete(
    `/userplants/images?userplantimage_id=${imageID}`,
    AxiosService.getOptionsAuthed()
  )

  return res.data
}

export const GetTasks = async (): Promise<Task[]> => {
  const res = await axios.get(
    '/tasks',
    AxiosService.getOptionsAuthed()
  )

  return res.data
}

export const UpdateTask = async (taskID: number, updateTaskRequest: UpdateTaskRequest): Promise<GenericResponse> => {
  await axios.put(
    `/tasks?task_id=${taskID}`,
    updateTaskRequest,
    AxiosService.getOptionsAuthed()
  )

  return { status: 'success' }
}
