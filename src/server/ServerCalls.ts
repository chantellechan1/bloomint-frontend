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

export interface GetAllPlantTypesResponse extends Array<plantType> {}

export const GetAllPlantTypes = async (): Promise<GetAllPlantTypesResponse> => {
    const res = await axios.get(
        '/plants/plant_types/all',
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

export interface UploadPlantImageRequest {
    imageB64: string,
    userPlantID: number
}

export interface UploadPlantImageResponse extends GenericResponse{}

export const UploadPlantImage = async (req: UploadPlantImageRequest): Promise<UploadPlantImageResponse> => {
    const res = await axios.post(
        '/plants/images/create',
          [{image_base_64: req.imageB64, user_plant_id: req.userPlantID}]
        ,
        AxiosService.getOptionsAuthed()
      )
    
    if (res.data === 'success') {
        return {status: 'success'}
    } else {
        throw new Error('error uploading new image')
    }

}

export interface UpdatePlantRequest extends Plant {}

export interface UpdatePlantResponse extends GenericResponse {}

export const UpdatePlant = async (req: UpdatePlantRequest): Promise<UpdatePlantResponse> => {
    const res = await axios.post(
        '/plants/user/update',
        [req],
        AxiosService.getOptionsAuthed()
    );

    if (res.data === 'success') {
        return {status: 'success'}
    } else {
        throw new Error('error updating plant')
    }
}

export interface DeletePlantRequest {
    plantID: number
}

//TODO: verify this uses the generic response
export interface DeletePlantResponse extends GenericResponse {}

export const DeletePlant = async (req: DeletePlantRequest) => {
    const res = await axios.post(
        '/plants/user/delete',
        { user_plant_ids: [req.plantID] },
        AxiosService.getOptionsAuthed()
    );

    if (res.data === 'success') {
        return {status: 'success'}
    } else {
        throw new Error('error deleting plant')
    }
}

