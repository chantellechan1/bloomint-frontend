import * as AxiosService from "../services/AxiosService";
import { Plant, PlantImage, plantType } from "../models/plantModels";
import axios from "axios";

export interface GenericResponse {
    status: string,
    error?: unknown
}

export interface CreateAccountRequest {
    email: string
}

export interface CreateAccountResponse extends GenericResponse { }

export const CreateAccount = async (req: CreateAccountRequest): Promise<CreateAccountResponse> => {

    const res = await axios.post<string>(
        `/auth/create_user`,
        req,
        AxiosService.getOptions()
    );

    if (res.data === 'success') {
        return { status: 'success' }
    } else {
        throw new Error(res.data)
    }

}

export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse extends GenericResponse {
    jwt: string
}

export const Login = async (req: LoginRequest): Promise<LoginResponse> => {

    const res = await axios.post<{ jwt: string }>(
        `/auth/login`,
        req,
        AxiosService.getOptions()
    );

    return { status: 'success', jwt: res.data.jwt }
}

export interface GetUserPlantRequest {
    userPlantID: number
}

/**
* returns array with one element: the single requested plant
*/
export interface GetUserPlantResponse extends Array<Plant> {}

export const GetUserPlant = async (req: GetUserPlantRequest): Promise<GetUserPlantResponse> => {
    const res = await axios.post(
        '/plants/user/get_plants',
        {
            plant_ids: [req.userPlantID]
        },
        AxiosService.getOptionsAuthed()
    );

    return res.data; // will be returned as array of plants with length 1
}

export interface GetPlantTypeRequest {
    plantTypeID: number
}

export interface GetPlantTypeResponse extends Array<plantType> {}

/**
 * get single plant type
 *  @returns one element array of type plantType
 */
export const GetPlantType = async (req: GetPlantTypeRequest): Promise<GetPlantTypeResponse> => {
    const res = await axios.post(
        '/plants/plant_types',
        {
            plant_type_ids: [req.plantTypeID]
        },
        AxiosService.getOptionsAuthed()
    );

    return res.data;
}

export interface GetPlantImagesRequest {
    userPlantID: number
}

export interface GetPlantImagesResponse extends Array<PlantImage>{}

export const GetPlantImages = async (req: GetPlantImagesRequest): Promise<GetPlantImagesResponse> => {
    const res = await axios.post(
        '/plants/images/getByUserPlantIds',
        [req.userPlantID],
        AxiosService.getOptionsAuthed()
    )
    return res.data;
}
