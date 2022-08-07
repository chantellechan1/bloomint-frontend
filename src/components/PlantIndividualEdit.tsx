import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

import { IconContext } from "react-icons";
import { BiSave } from "react-icons/bi";

import { Camera, CameraResultType } from '@capacitor/camera';

import { server } from "../server";
import { Plant, PlantImage, plantType } from "../models/plantModels";

const getSinglePlant = async (userPlantID: number) => {
    const [plant] = await server.GetUserPlant({ userPlantID })
    return plant;
};

const getPlantTypeInformation = async (plantTypeID: number) => {
    const [plantTypeInfo] = await server.GetPlantType({ plantTypeID })
    return plantTypeInfo;
};

const getAllPlantTypes = async () => {
    const allPlantTypess = await server.GetAllPlantTypes();
    return allPlantTypess
};

const getPlantImages = async (userPlantID: number) => {
    const plantImages = await server.GetPlantImages({ userPlantID });
    return plantImages;
}

const takePicture = async (userPlantID: number) => {

    try {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
        });

        if (!image.base64String) throw new Error("No image found");

        await server.UploadPlantImage({ imageB64: image.base64String, userPlantID })

    } catch (err) {
        console.error(err);
    }
}

const PlantIndividualEdit = (props: { setLoading: (val: boolean) => void }) => {
    let params = useParams();
    let navigate = useNavigate();
    const plantID = Number(params.plantID);
    const [plant, setPlant] = useState<Plant>();
    const [plantType, setPlantType] = useState<plantType>();
    const [allPlantTypes, setAllPlantTypes] = useState<Array<plantType>>();
    const [plantImages, setPlantImages] = useState<Array<PlantImage>>()
    const [activePlantImageIdx, setActivePlantImageIdx] = useState(0);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const { setLoading } = props;

    useEffect(() => {
        const apiCalls = async () => {
            try {
                setLoading(true);
                const userPlant = await getSinglePlant(plantID);

                const [plantTypeInfo, plantTypesFromAPI, plantImagesFromAPI] = await Promise.all([
                    getPlantTypeInformation(userPlant.plant_id),
                    getAllPlantTypes(),
                    getPlantImages(plantID)
                ])

                setPlant(userPlant);
                setPlantType(plantTypeInfo);
                setAllPlantTypes(plantTypesFromAPI);
                setPlantImages(plantImagesFromAPI);

            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }

        };
        apiCalls();
    }, [setLoading, plantID]);

    const postUpdatePlant = async () => {
        if (!plant) { return } // if plant is undefined, don't try to update it
        try {
            props.setLoading(true);
            await server.UpdatePlant(plant)
            props.setLoading(false);
            navigate(`/plant/${plant.plant_id}`);
        } catch (e) {
            console.log(e)
        } finally {
            props.setLoading(false);
        }

    }

    const deletePlant = async () => {
        try {
            props.setLoading(true);
            await server.DeletePlant({ plantID })
            props.setLoading(false);
            navigate(`/plants_by_type/${plantType?.id}`);
        } catch (e) {
            console.log(e)
        } finally {
            props.setLoading(false);
        }
    }

    const toggleDeleteModal = () => {
        setOpenDeleteModal(!openDeleteModal);
    }

    return (
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
                            {/* user plant image carousel */}
                            <div id="userPlantImageCarousel" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {
                                        plantImages?.map((plantImage: PlantImage, index: number) => {
                                            return (
                                                <div key={uuidv4()} className={`carousel-item ${index == activePlantImageIdx ? 'active' : ''}`}>
                                                    <img src={`data:image/jpg;base64,${plantImage.image_data}`} className="d-block w-100" alt="..." />
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#userPlantImageCarousel" data-bs-slide="prev"
                                    onClick={() => {
                                        if (plantImages && activePlantImageIdx < plantImages.length - 1) {
                                            setActivePlantImageIdx(activePlantImageIdx + 1);
                                        } else {
                                            setActivePlantImageIdx(0);
                                        }
                                    }}
                                >
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#userPlantImageCarousel" data-bs-slide="next"
                                    onClick={() => {
                                        if (activePlantImageIdx > 0) {
                                            setActivePlantImageIdx(activePlantImageIdx - 1);
                                        } else {
                                            setActivePlantImageIdx(plantImages!.length - 1);
                                        }
                                    }}
                                >
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                            <hr className="px-5" />

                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Plant Type</InputLabel>
                                    <Select
                                        labelId="select-plant-type-label"
                                        id="select-plant-type"
                                        value={plantType?.id}
                                        label="Plant Type"
                                        onChange={(event) => {
                                            let targetID = event.target.value;
                                            const newPlantType = allPlantTypes?.find(type => {
                                                let currPlantTypeID = type.id;
                                                return targetID === currPlantTypeID;
                                            }) as plantType;

                                            const updated = { ...plant } as Plant;
                                            updated.plant_id = newPlantType?.id;

                                            setPlantType(newPlantType);
                                            setPlant(updated);
                                        }}
                                    >
                                        {
                                            allPlantTypes?.map(type => (<MenuItem key={uuidv4()} value={type.id}>{type.name}</MenuItem>))
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <i>Temp Range: </i> {plantType?.min_temp}°C to {plantType?.max_temp}°C
                            </div>
                            <div><i>Sun: </i> {plantType?.sunlight}</div>
                            <div><i>Water: </i> Every {plantType?.water_frequency} day(s)</div>

                            <div className="mt-3">
                                <i>Plant Name: </i>
                                <input type='text' className="form-control" defaultValue={plant?.plant_name}
                                    onBlur={(event) => {
                                        let updated = {
                                            ...plant,
                                            plant_name: event.target.value
                                        } as Plant; 
                                        setPlant(updated);
                                    }}
                                />
                            </div>
                            <div className="card-text my-3">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Created At"
                                        value={plant?.created_at}
                                        onChange={(newValue) => {
                                            let updated = {
                                                ...plant,
                                                created_at: (newValue as any).toUTCString()
                                            } as Plant;
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
                                        value={plant?.purchased_at}
                                        onChange={(newValue) => {
                                            if (!newValue) {return}
                                            let updated = {
                                                ...plant,
                                                purchased_at: (newValue as any).toUTCString()
                                            } as Plant;
                                            setPlant(updated);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                            </div>
                            <div className="text-center">
                                <div className="btn btn-outline-primary" onClick={() => { takePicture(plantID) }}>Add Image</div>
                            </div>
                            <div className="mb-3">
                                <i>Notes: </i>
                                <textarea className="form-control" defaultValue={plant?.notes}
                                    onBlur={(event) => {
                                        let updated = {
                                            ...plant,
                                            notes: event.target.value
                                        } as Plant;
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