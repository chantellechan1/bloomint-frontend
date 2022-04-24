import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as AxiosService from "../services/AxiosService";
import { v4 as uuidv4 } from "uuid";

import LoadingComponent from "./Loading";

import deafultPlantImg from "../assets/images/default_plant.webp";


const getPlants = async (plantTypeID: number) => {
   
    let res = await axios.post(
        '/plants/user/plants_by_type',
        {
            plant_type_id: plantTypeID
        },
        AxiosService.getOptionsAuthed()
    );
    const typePlants = res.data;

    return typePlants;
};

const updatePlants = async (plantTypeID: number, setTypePlants: any) => {
    const typePlants = await getPlants(plantTypeID);

    setTypePlants(typePlants);
}

const PlantsInType = () => {

    const [typePlants, setTypePlants] = useState([]);
    let { plantTypeID } = useParams();

    useEffect(() => {
        updatePlants(parseInt(plantTypeID as string), setTypePlants);
    }, [])

    return (
        <React.Fragment>
            {typePlants.length === 0 ?
            <React.Fragment>
                <LoadingComponent />
            </React.Fragment>
            :
            <div className="container-fluid">
                <div className="row text-center mb-3 mt-1">
                    <h1>Plants in Type</h1>
                </div>

                <div className="row">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/plants_by_type">Plants By Type</Link></li>
                            <li className="breadcrumb-item active" aria-current="page"> {plantTypeID} </li>
                        </ol>
                    </nav>
                </div>

                <div className="row">
                    {
                        typePlants.map((plant: any) => {
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
                        }
                        )
                    }
                </div>
            </div>}
        </React.Fragment>
    )
};

export default PlantsInType;