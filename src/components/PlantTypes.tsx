import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route, Link } from "react-router-dom";

import axiosInstance from "../services/AxiosService";
import LoadingComponent from "./Loading";

import deafultPlantImg from "../assets/images/default_plant.webp";
import PlantsInType from "./PlantsInType";

const getPlantsByType = async () => {
    let res = await axiosInstance.get(
        '/plants/user/plant_types',
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    );
    return res.data
};

const updatePlants = async (setPlantTypes: any) => {
    let plantsByType = await getPlantsByType();
    setPlantTypes(plantsByType);
}

const PlantTypes = () => {

    const [plantTypes, setPlantTypes] = useState([]);

    useEffect(() => {
        updatePlants(setPlantTypes);
    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row text-center mb-3 mt-1">
                    <h1>Plants By Type</h1>
                </div>
                <div className="row">
                    {
                        plantTypes.length === 0 ?
                            <React.Fragment>
                                <LoadingComponent />
                            </React.Fragment>
                            :
                            plantTypes.map((plantType: any) => {
                                return (
                                    <div className="col-6" key={uuidv4()}>
                                        <div className="card text-start">
                                            <Link to={`/plants_by_type/${plantType.id}`}>
                                                <img src={deafultPlantImg} className="card-img-top" alt="..." />
                                            </Link>
                                            <div className="card-body">
                                                <h3 className="card-title">
                                                    {plantType.name} ({plantType.num_owned})
                                                </h3>
                                                <div className="card-text">
                                                    <i>Temp Range: </i> {plantType.min_temp}°C to {plantType.max_temp}°C
                                                </div>
                                                <div className="card-text"><i>Sun: </i> {plantType.sunlight}</div>
                                                <div className="card-text"><i>Water: </i> Every {plantType.water_frequency} day(s)</div>
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

export default PlantTypes;