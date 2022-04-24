import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from 'axios';
import * as AxiosService from '../services/AxiosService';
import { v4 as uuidv4 } from 'uuid';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import defaultPlantImg from '../assets/images/default_plant.webp'
import LoadingComponent from "./Loading";
import { IconContext } from "react-icons";
import { BiSave } from "react-icons/bi";

const getSinglePlant = async (plantID: number) => {

    const res = await axios.post(
        '/plants/user/get_plants',
        {
            plant_ids: [plantID]
        },
        AxiosService.getOptionsAuthed()
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
        AxiosService.getOptionsAuthed()
    );

    const plantTypeInfo = res.data[0];
    return plantTypeInfo;
};

const getAllPlantTypes = async () => {
    const res = await axios.get(
        '/plants/plant_types/all',
        AxiosService.getOptionsAuthed()
    );

    return res.data;
};

const PlantIndividualEdit = () => {
    let params = useParams();
    let navigate = useNavigate();
    const plantID = Number(params.plantID);
    const [loading, setLoading] = useState(true);
    const [plant, setPlant] = useState({});
    const [plantType, setPlantType] = useState({});
    const [allPlantTypes, setAllPlantTypes] = useState([]);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        const apiCalls = async () => {
            const apiPlant = await getSinglePlant(plantID);

            // TODO: refactor with Promsie.allSettled
            Promise.all([
                getPlantTypeInformation(apiPlant.plant_id),
                getAllPlantTypes()
            ]).then(results => {
                const plantTypeInfo = results[0];
                const plantTypesFromAPI = results[1];

                setPlant(apiPlant);
                setPlantType((plantTypeInfo as any));
                setAllPlantTypes((plantTypesFromAPI as any));
                setLoading(false);
            })
        };
        apiCalls();
    }, []);

    const postUpdatePlant = async () => {
        setLoading(true);
        const res = await axios.post(
            '/plants/user/update',
            [plant],
            AxiosService.getOptionsAuthed()
        );
        navigate(`/plant/${(plant as any).id}`);
    }

    const deletePlant = async () => {
        setLoading(true);
        const res = await axios.post(
            '/plants/user/delete',
            {user_plant_ids: [plantID]},
            AxiosService.getOptionsAuthed()
        );
        navigate(`/plants_by_type/${(plantType as any).id}`);
    }

    const toggleDeleteModal = () => {
        setOpenDeleteModal(!openDeleteModal);
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
                <Dialog
                    open={openDeleteModal}
                    onClose={toggleDeleteModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete this plant?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <div className="btn btn-outline-secondary" onClick={toggleDeleteModal}>Cancel</div>
                        <div className="btn btn-outline-danger" onClick={deletePlant}>Confirm Delete</div>
                    </DialogActions>
                </Dialog>
                <div className="float-end mt-2 me-2 btn btn-link">
                    <IconContext.Provider value={{ size: "2em" }}>
                        <BiSave onClick={() => {
                            postUpdatePlant();
                        }} />
                    </IconContext.Provider>
                </div>
                <div className="container-fluid">
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
                                            value={(plantType as any).id}
                                            label="Plant Type"
                                            onChange={(event) => {
                                                let targetID = event.target.value;
                                                const newPlantType: any = allPlantTypes.find(type => {
                                                    let currPlantTypeID = (type as any).id;
                                                    return targetID == currPlantTypeID;
                                                });

                                                let updated = {
                                                    ...plant,
                                                    plant_id: newPlantType.id
                                                }

                                                setPlantType(newPlantType);
                                                setPlant(updated);
                                            }}
                                        >
                                            {
                                                allPlantTypes.map(type => (<MenuItem key={uuidv4()} value={(type as any).id}>{(type as any).name}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <i>Temp Range: </i> {(plantType as any).min_temp}°C to {(plantType as any).max_temp}°C
                                </div>
                                <div><i>Sun: </i> {(plantType as any).sunlight}</div>
                                <div><i>Water: </i> Every {(plantType as any).water_frequency} day(s)</div>

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
                                <div className="mb-3">
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
                                <div className="text-center">
                                    <div className="btn btn-outline-danger" onClick={toggleDeleteModal}>Delete Plant</div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
};

export default PlantIndividualEdit;