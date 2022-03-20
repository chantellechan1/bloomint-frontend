import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../services/AxiosService";
import { v4 as uuidv4 } from "uuid";

import LoadingComponent from "./Loading";

import deafultPlantImg from "../assets/images/default_plant.webp";


const getAllPlants = async () => {
    const axoisOptions = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
    };

    let res = await axiosInstance.get(
        '/plants/user/get_plant_ids',
        axoisOptions
    );
    let plantIDs = res.data;

    res = await axiosInstance.post(
        '/plants/user/get_plants',
        {
            plant_ids: plantIDs
        },
        axoisOptions
    );
    const allPlants = res.data;

    return allPlants;
};

const updateAllPlants = async (setAllPlants: any) => {
    const allPlants = await getAllPlants();

    setAllPlants(allPlants);
}

const PlantsAll = () => {

    const [allPlants, setAllPlants] = useState([]);

    useEffect(() => {
        updateAllPlants(setAllPlants);
    }, [])

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row text-center mb-3 mt-1">
                    <h1>All Plants</h1>
                </div>
                <div className="row">
                    {
                        allPlants.length === 0 ?
                            <React.Fragment>
                                <LoadingComponent />
                            </React.Fragment>
                            :
                            allPlants.map((plant: any) => {
                                return (
                                    <div className="row mb-3" key={uuidv4()}>
                                        <div className="col">
                                            <div className="card text-start">
                                                <Link to={`/plant/${plant.id}`}>
                                                    <img src={deafultPlantImg} className="card-img-top" alt="..." />
                                                </Link>
                                                <div className="card-body">
                                                    <h3 className="card-title">
                                                        {plant.plant_name}
                                                    </h3>
                                                    <div className="card-text">
                                                        <i>Created At: </i> {plant.created_at}
                                                    </div>
                                                    {
                                                        plant.purchased_at !== null &&
                                                        <div className="card-text">
                                                            <i>Purchased At: </i> {plant.purchased_at}
                                                        </div>
                                                    }
                                                    <div className="card-text">
                                                        <i>Notes: </i>
                                                        <div>{plant.notes}</div>
                                                    </div>
                                                </div>
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