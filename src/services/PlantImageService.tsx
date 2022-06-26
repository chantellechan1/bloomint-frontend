import axios from "axios";
import cactus from "../assets/images/cactus_b64.json";
import * as AxiosService from "./AxiosService";
import * as plantModels from "../models/plantModels";

const getMostRecentPlantImage = async (plantID: number) => {
    const res = await axios.post(
        '/plants/images/getByUserPlantIds',
        [plantID],
        AxiosService.getOptionsAuthed()
    );

    const plantImages: Array<plantModels.PlantImage> = res.data;

    // return last element in the array (most recent image)
    if (plantImages.length > 0) {
        return plantImages.at(-1) as plantModels.PlantImage;
    } else {
        return { image_data: cactus.b64 } as plantModels.DefaultPlantImage;
    }

}

export default getMostRecentPlantImage;