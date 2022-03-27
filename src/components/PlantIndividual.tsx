import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import defaultPlantImg from '../assets/images/default_plant.webp'
import LoadingComponent from "./Loading";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";

const axoisOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
};

const getSinglePlant = async (plantID: number) => {

    const res = await axios.post(
        '/plants/user/get_plants',
        {
            plant_ids: [plantID]
        },
        axoisOptions
    );

    const plant = res.data[0]; // will be returned as array of plants with length 1

    return plant;
};

const getPlantTypeInformation = async (plantTypeID: number) => {
    const res = await axios.post(
        '/plants/plant_types',
        {
            plant_type_ids: [plantTypeID]
        },
        axoisOptions
    );

    const plantTypeInfo = res.data[0];
    return plantTypeInfo;
};

const PlantIndividual = () => {
    let params = useParams();
    const plantID = Number(params.plantID);
    const [plant, setPlant] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPlant = async () => {
            const apiPlant = await getSinglePlant(plantID);
            const plantTypeInfo = await getPlantTypeInformation(apiPlant.plant_id);

            // append properties of plant type to individual plant
            apiPlant.min_temp = plantTypeInfo.min_temp;
            apiPlant.max_temp = plantTypeInfo.max_temp;
            apiPlant.plant_type_name = plantTypeInfo.name;
            apiPlant.sunlight = plantTypeInfo.sunlight;
            apiPlant.water_frequency = plantTypeInfo.water_frequency;

            setPlant(apiPlant);
            setLoading(false);
        };

        loadPlant();
    }, []);

    return (
        loading ?
            <React.Fragment>
                <div className='mt-5'>
                    <LoadingComponent />
                </div>
            </React.Fragment>
            :
            <React.Fragment>
                <div className="float-end mt-2 me-2">
                    <IconContext.Provider value={{ size: "2em" }}>
                        <div>
                            <Link to={`/plant/${(plant as any).id}/edit`}><BiPencil /></Link>
                        </div>
                    </IconContext.Provider>
                </div>
                <div className="container-fluid">
                    <div className="row text-center mb-3 mt-1">
                        <h1>{(plant as any).plant_name}</h1>
                    </div>
                    <div className="row">
                        <div className="row mb-3" key={uuidv4()}>
                            <div className="col text-start">
                                <img src={defaultPlantImg} className="card-img-top" alt="..." />
                                <hr className="px-5" />
                                <div>{(plant as any).plant_type_name} Stats:</div>
                                <div>
                                    <i>Temp Range: </i> {(plant as any).min_temp}°C to {(plant as any).max_temp}°C
                                </div>
                                <div><i>Sun: </i> {(plant as any).sunlight}</div>
                                <div><i>Water: </i> Every {(plant as any).water_frequency} day(s)</div>

                                <div className="mt-3">
                                    {(plant as any).plant_name}'s Info:
                                </div>
                                <div className="card-text">
                                    <i>Created At: </i> {(plant as any).created_at}
                                </div>
                                {
                                    (plant as any).purchased_at !== null &&
                                    <div className="card-text">
                                        <i>Purchased At: </i> {(plant as any).purchased_at}
                                    </div>
                                }
                                <div>
                                    <i>Notes: </i>
                                    <div>{(plant as any).notes}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
};

export default PlantIndividual;