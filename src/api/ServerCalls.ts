import * as AxiosService from "./AxiosService";
import {
  DefaultPlantImage,
  UserPlant,
  PlantImage,
  PlantType,
} from "../models/PlantModels";
import cactus from "../assets/images/cactus_b64.json";
import axios from "axios";

export interface GenericResponse {
  status: string;
  error?: unknown;
}

export interface CreateAccountRequest {
  email: string;
}

export interface CreateAccountResponse extends GenericResponse {}

export const CreateAccount = async (
  req: CreateAccountRequest
): Promise<CreateAccountResponse> => {
  const res = await axios.post<string>(
    `/auth/create_user`,
    req,
    AxiosService.getOptions()
  );

  if (res.data === "success") {
    return { status: "success" };
  } else {
    throw new Error(res.data);
  }
};

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends GenericResponse {
  jwt: string;
}

export const Login = async (req: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post<{ jwt: string }>(
    `/auth/login`,
    req,
    AxiosService.getOptions()
  );

  return { status: "success", jwt: res.data.jwt };
};

const GetAllUserPlantIDs = async (): Promise<number[]> => {
  let res = await axios.get(
    "/plants/user/get_plant_ids",
    AxiosService.getOptionsAuthed()
  );
  let plantIDs = res.data;
  return plantIDs;
};

const GetMostRecentPlantImage = async (plantID: number) => {
    const res = await axios.post(
        '/plants/images/getByUserPlantIds',
        [plantID],
        AxiosService.getOptionsAuthed()
    );

    const plantImages: Array<PlantImage> = res.data;

    // return last element in the array (most recent image)
    if (plantImages.length > 0) {
        return plantImages.at(-1) as PlantImage;
    } else {
        return { image_data: cactus.b64 } as DefaultPlantImage;
    }

}

export interface GetAllUserPlantsResponse extends GenericResponse {
  allPlants: UserPlant[];
}

export const GetAllUserPlants = async (): Promise<GetAllUserPlantsResponse> => {
  const userPlantIDs = await GetAllUserPlantIDs();
  const allPlantImgPromises = userPlantIDs.map((userPlantID) =>
    GetMostRecentPlantImage(userPlantID)
  );
  const getAllPlantsPromise = axios.post(
    "/plants/user/get_plants",
    {
      plant_ids: userPlantIDs,
    },
    AxiosService.getOptionsAuthed()
  );

  let [allPlantsRes, ...plantImagesRes] = await Promise.allSettled([
    getAllPlantsPromise,
    ...allPlantImgPromises,
  ]);

  if (allPlantsRes.status !== "fulfilled") {
    throw Error("error getting plant data");
  }

  let plantImages: (PlantImage | DefaultPlantImage)[] = [];

  plantImagesRes.forEach((plantImg) => {
    if (plantImg.status !== "fulfilled") {
      // push default plant image
      plantImages.push({ image_data: cactus.b64 } as DefaultPlantImage);
    } else {
      plantImages.push(plantImg.value);
    }
  });

  let allPlants = allPlantsRes.value as unknown as UserPlant[];
  try {
    allPlants.forEach((plant, index) => {
      plant.most_recent_image = plantImages[index];
    });
  } catch (e) {
    // usually wind up here if user has no plants
    console.warn(e);
    allPlants = [];
  }

  return { status: "success", allPlants };
};

export interface GetUserPlantRequest {
  userPlantID: number;
}

/**
 * returns array with one element: the single requested plant
 */
export interface GetUserPlantResponse extends Array<UserPlant> {}

export const GetUserPlant = async (
  req: GetUserPlantRequest
): Promise<GetUserPlantResponse> => {
  const res = await axios.post(
    "/plants/user/get_plants",
    {
      plant_ids: [req.userPlantID],
    },
    AxiosService.getOptionsAuthed()
  );

  const userPlants = res.data.map((server_plant: any) => ({
    ...server_plant,
    user_plant_id: server_plant.id,
  }));
  return userPlants; // will be returned as array of plants with length 1
};

export interface GetPlantTypeRequest {
  plantTypeID: number;
}

export interface GetPlantTypeResponse extends Array<PlantType> {}

/**
 * get single plant type
 *  @returns one element array of type plantType
 */
export const GetPlantType = async (
  req: GetPlantTypeRequest
): Promise<GetPlantTypeResponse> => {
  const res = await axios.post(
    "/plants/plant_types",
    {
      plant_type_ids: [req.plantTypeID],
    },
    AxiosService.getOptionsAuthed()
  );

  return res.data;
};

export interface GetAllPlantTypesResponse extends Array<PlantType> {}

export const GetAllPlantTypes = async (): Promise<GetAllPlantTypesResponse> => {
  const res = await axios.get(
    "/plants/plant_types/all",
    AxiosService.getOptionsAuthed()
  );

  return res.data;
};

export interface GetPlantImagesRequest {
  userPlantID: number;
}

export interface GetPlantImagesResponse extends Array<PlantImage> {}

export const GetPlantImages = async (
  req: GetPlantImagesRequest
): Promise<GetPlantImagesResponse> => {
  const res = await axios.post(
    "/plants/images/getByUserPlantIds",
    [req.userPlantID],
    AxiosService.getOptionsAuthed()
  );
  return res.data;
};

export interface UploadPlantImageRequest {
  imageB64: string;
  userPlantID: number;
}

export interface UploadPlantImageResponse extends GenericResponse {}

export const UploadPlantImage = async (
  req: UploadPlantImageRequest
): Promise<UploadPlantImageResponse> => {
  const res = await axios.post(
    "/plants/images/create",
    [{ image_base_64: req.imageB64, user_plant_id: req.userPlantID }],
    AxiosService.getOptionsAuthed()
  );

  if (res.data === "success") {
    return { status: "success" };
  } else {
    throw new Error("error uploading new image");
  }
};
export interface CreateNewPlantRequest extends UserPlant {}

export interface CreateNewPlantResponse extends GenericResponse {
  id: number; // the UserPlant id of the new plant
}

export const CreateNewPlant = async (req: CreateNewPlantRequest) => {
  const res = await axios.post(
    "/plants/user/create",
    [req],
    AxiosService.getOptionsAuthed()
  );
  // data here is an array of created user_plant_ids
  const returnData: { status: string; data: number[] } = res.data;

  if (returnData.status === "success") {
    return { status: "success", id: returnData.data[0] };
  } else {
    throw new Error("error creating new plant");
  }
};

export interface UpdatePlantRequest extends UserPlant {}

export interface UpdatePlantResponse extends GenericResponse {}

export const UpdatePlant = async (
  req: UpdatePlantRequest
): Promise<UpdatePlantResponse> => {
  const res = await axios.post(
    "/plants/user/update",
    [req],
    AxiosService.getOptionsAuthed()
  );

  if (res.data === "success") {
    return { status: "success" };
  } else {
    throw new Error("error updating plant");
  }
};

export interface DeletePlantRequest {
  plantID: number; // user plant id
}

//TODO: verify this uses the generic response
export interface DeletePlantResponse extends GenericResponse {}

export const DeletePlant = async (req: DeletePlantRequest) => {
  const res = await axios.post(
    "/plants/user/delete",
    { user_plant_ids: [req.plantID] },
    AxiosService.getOptionsAuthed()
  );

  if (res.data === "success") {
    return { status: "success" };
  } else {
    throw new Error("error deleting plant");
  }
};

export interface CompleteTaskRequest {
  taskID: number;
}

export const CompleteTask = async (req: CompleteTaskRequest) => {
  const res = await axios.post(
    "/tasks/complete_tasks",
    { task_ids: [req.taskID] },
    AxiosService.getOptionsAuthed()
  );

  if (res.data === "success") {
    return { status: "success" };
  } else {
    throw new Error("error completing task");
  }
};

export interface UndoCompleteTaskRequest {
  taskID: number;
}

export const UndoCompleteTask = async (req: CompleteTaskRequest) => {
  const res = await axios.post(
    "/tasks/uncomplete_tasks",
    { task_ids: [req.taskID] },
    AxiosService.getOptionsAuthed()
  );

  if (res.data === "success") {
    return { status: "success" };
  } else {
    throw new Error("error completing task");
  }
};
