import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import defaultPlantImg from '../assets/images/default_plant.webp'
import LoadingComponent from "./Loading";
import { IconContext } from "react-icons";
import { BiSave } from "react-icons/bi";

interface Plant {
    plant_id: number,
    plant_name: string,
    created_at: string
}

interface plantType {
    created_at: string,
    id: number,
    max_temp: number,
    min_temp: number,
    name: string,
    num_owned: number,
    sunlight: string,
    water_frequency: number
}

const axoisOptions = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}`
    }
};

const PlantTypeStatsComponent = (props: {selectedPlantType: plantType}) => {
    const selectedPlantType: plantType = props.selectedPlantType;
    return (
        <React.Fragment>
            <div>
                <i>Temp Range: </i> {selectedPlantType.min_temp}°C to {selectedPlantType.max_temp}°C
            </div>
            <div><i>Sun: </i> {selectedPlantType.sunlight}</div>
            <div><i>Water: </i> Every {selectedPlantType.water_frequency} day(s)</div>
        </React.Fragment>
    )
}

const PlantIndividualNew = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [plant, setPlant] = useState<Plant>({
        plant_id: 2, // default for Mint
        plant_name: '',
        created_at: (new Date()).toUTCString()
    });
    const [selectedPlantType, setSelectedPlantType] = useState<plantType>();
    const [allPlantTypes, setAllPlantTypes] = useState<plantType[]>([]);

    useEffect(() => {
        const apiCalls = async () => {

            const res = await axios.get(
                '/plants/plant_types/all',
                axoisOptions
            );
            const plantTypesFromAPI = res.data;

            setAllPlantTypes(plantTypesFromAPI);
            setSelectedPlantType(plantTypesFromAPI[0]);
            setLoading(false);
        };
        apiCalls();
    }, []);

    const postNewPlant = async () => {
        setLoading(true);
        const res = await axios.post(
            '/plants/user/create',
            [plant],
            axoisOptions
        );

        // data here is an array of created user_plant_ids
        // since we have created one plant, we can navigate to the id of the first userplant in the array
        const returnData: {status: string, data: number[]} = res.data; 

        navigate(`/plant/${returnData.data[0]}`);
    }

    return (
        loading ?
            <React.Fragment>
                <div className='mt-5'>
                    <LoadingComponent />
                </div>
            </React.Fragment>
            :
            <React.Fragment>
                <div className="float-end mt-2 me-2 btn btn-link">
                    <IconContext.Provider value={{ size: "2em" }}>
                        <BiSave onClick={() => {
                            postNewPlant();
                        }} />
                    </IconContext.Provider>
                </div>
                <div className="container-fluid">
                    <div className="row text-center mb-3 mt-1">
                        <h1>New Plant</h1>
                    </div>
                    <div className="row">
                        <div className="row mb-3" key={uuidv4()}>
                            <div className="col text-start">
                                <img src={defaultPlantImg} className="card-img-top" alt="..." />
                                <hr className="px-5" />
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Plant Type</InputLabel>
                                        <Select
                                            labelId="select-plant-type-label"
                                            id="select-plant-type"
                                            value={(selectedPlantType as plantType).id}
                                            label="Plant Type"
                                            onChange={(event) => {
                                                let targetID = event.target.value;
                                                const newPlantType: plantType = allPlantTypes.find(type => {
                                                    let currPlantTypeID = (type as any).id;
                                                    return targetID == currPlantTypeID;
                                                }) as plantType;

                                                setSelectedPlantType(newPlantType);

                                                let updated = {
                                                    ...plant,
                                                    plant_id: newPlantType.id
                                                }
                                                setPlant(updated);
                                            }}
                                        >
                                            {
                                                allPlantTypes.map(type => (<MenuItem key={uuidv4()} value={type.id}>{type.name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <PlantTypeStatsComponent selectedPlantType={selectedPlantType as plantType} />

                                <div className="mt-3">
                                    <i>Plant Name: </i>
                                    <input type='text' className="form-control" defaultValue={(plant as any).plant_name}
                                        onBlur={(event) => {
                                            let updated = {
                                                ...plant,
                                                plant_name: event.target.value
                                            }
                                            setPlant(updated);
                                        }}
                                    />
                                </div>
                                <div className="card-text my-3">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Created At"
                                            value={(plant as any).created_at}
                                            onChange={(newValue) => {
                                                let updated = {
                                                    ...plant,
                                                    created_at: newValue.toGMTString()
                                                }
                                                setPlant(updated);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="card-text">

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Purchased At"
                                            value={(plant as any).purchased_at}
                                            onChange={(newValue) => {
                                                let updated = {
                                                    ...plant,
                                                    purchased_at: newValue.toGMTString()
                                                }
                                                setPlant(updated);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                </div>
                                <div>
                                    <i>Notes: </i>
                                    <textarea className="form-control" defaultValue={(plant as any).notes}
                                        onBlur={(event) => {
                                            let updated = {
                                                ...plant,
                                                notes: event.target.value
                                            }
                                            setPlant(updated);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
};

export default PlantIndividualNew;