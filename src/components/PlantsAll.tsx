import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as AxiosService from "../services/AxiosService";
import getMostRecentPlantImage from "../services/PlantImageService";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import * as plantModels from '../models/plantModels';

const getAllUserPlantIDs = async () => {
    let res = await axios.get(
        '/plants/user/get_plant_ids',
        AxiosService.getOptionsAuthed()
    );
    let plantIDs = res.data;
    return plantIDs;
}

const getAllPlants = async (plantIDs: number[]) => {

    let res = await axios.post(
        '/plants/user/get_plants',
        {
            plant_ids: plantIDs
        },
        AxiosService.getOptionsAuthed()
    );
    const allPlants = res.data;

    return allPlants;
};

const PlantsAll = (props: { setLoading: any }) => {

    const [allPlants, setAllPlants] = useState<Array<plantModels.Plant>>();

    useEffect(() => {

        const updateAllPlants = async () => {
            try {
                props.setLoading(true);

                const allUserPlantIDs: Array<number> = await getAllUserPlantIDs();
                const allPlantImgPromises = allUserPlantIDs.map(userPlantID => getMostRecentPlantImage(userPlantID));

                const results = await Promise.allSettled(
                    [getAllPlants(allUserPlantIDs), ...allPlantImgPromises]
                )

                let tempAllPlants: Array<plantModels.Plant> = [];

                results.forEach((res: any, idx: number) => {
                    if (idx === 0) {
                        tempAllPlants = res.value;
                    } else {
                        tempAllPlants[idx - 1].most_recent_image = res.value;
                    }
                });

                setAllPlants(tempAllPlants);
            } catch (e) {
                console.log(e)
            } finally {
                props.setLoading(false);
            }
        };

        updateAllPlants();

    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row text-center mb-3 mt-1">
                    <h1>All Plants</h1>
                </div>
                <div className="row">
                    {
                        allPlants && allPlants.map((plant: any) => {
                            return (
                                <div className="row mb-3" key={uuidv4()}>
                                    <div className="col">
                                        <div className="card text-start">
                                            <Link to={`/plant/${plant.id}`} style={{textDecoration: 'none', color: 'black'}}>
                                                <img src={`data:image/jpg;base64,${plant.most_recent_image.image_data}`} className="d-block w-100" alt="..." />
                                                <div className="card-body">
                                                    <h3 className="card-title">
                                                        {plant.plant_name}
                                                    </h3>
                                                    <div className="card-text">
                                                        <i>Created At: </i> {plant.created_at}
                                                    </div>
                                                    {
                                                        plant.purchased_at !== null &&
                                                        <div className="card-text" >
                                                            <i>Purchased At: </i> {plant.purchased_at}
                                                        </div>
                                                    }
                                                    <div className="card-text">
                                                        <i>Notes: </i>
                                                        <div>{plant.notes}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
};

export default PlantsAll;