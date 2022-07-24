import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';

import cactus from "../assets/images/cactus_b64.json";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";

import * as plantModels from '../models/plantModels';
import { server } from "../server";

const getSinglePlant = async (plantID: number) => {
    const [plant] = await server.GetUserPlant({userPlantID: plantID});
    return plant;
};

const getPlantTypeInformation = async (plantTypeID: number) => {
    const [plantTypeInfo] = await server.GetPlantType({plantTypeID})
    return plantTypeInfo;
};

const getPlantImages = async (userPlantID: number) => {
    const plantImages = await server.GetPlantImages({userPlantID})
    return plantImages;
}

interface individualPlant extends plantModels.Plant, plantModels.plantType {}

const PlantIndividual = (props: { setLoading: any }) => {
    let params = useParams();
    const plantID = Number(params.plantID);

    const [plant, setPlant] = useState<individualPlant>();
    const [plantImages, setPlantImages] = useState<Array<plantModels.PlantImage>>();

    useEffect(() => {
        const loadPlant = async () => {
            try {
                props.setLoading(true);

                const userPlant = await getSinglePlant(plantID);

                const results = await Promise.allSettled([getPlantTypeInformation(userPlant.plant_id), getPlantImages(plantID)]);

                let [plantTypeInfo, plantImages] = results.map((res: any) => res.value);

                setPlant({...userPlant, ...plantTypeInfo});
                setPlantImages(plantImages);
            } catch (e) {
                console.log(e)
            } finally {
                props.setLoading(false);
            }
        };

        loadPlant();
    }, []);

    return (
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
                            {/* plant images */}
                            {
                                plantImages && plantImages.length > 0 ?
                                    <div className="container-fluid">
                                        <div className={`row ${plantImages.length <= 3 ? `row-cols-${plantImages.length}` : `row-cols-4`}`}>
                                            {
                                                plantImages.map(plantImage => <img key={uuidv4()} src={`data:image/jpg;base64,${plantImage.image_data}`} alt="..." className="col"/>)
                                            }
                                        </div>
                                    </div>
                                    :
                                    <img src={`data:image/jpg;base64,${cactus.b64}`} className="d-block w-100" alt="..." />
                            }

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