import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import axios from "axios";
import * as AxiosService from "../services/AxiosService";

import deafultPlantImg from "../assets/images/default_plant.webp";

const getPlantsByType = async () => {
    let res = await axios.get(
        '/plants/user/plant_types',
        AxiosService.getOptionsAuthed()
    );
    return res.data
};

const PlantTypes = (props: { setLoading: any }) => {

    const [plantTypes, setPlantTypes] = useState([]);

    useEffect(() => {
        const updatePlants = async (setPlantTypes: any) => {
            try {
                props.setLoading(true);
                let plantsByType = await getPlantsByType();
                setPlantTypes(plantsByType);
            } catch (e) {
                console.log(e);
            } finally {
                props.setLoading(false);
            }

        }

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