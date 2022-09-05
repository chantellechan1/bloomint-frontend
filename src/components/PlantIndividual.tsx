import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import cactus from "../assets/images/cactus_b64.json";
import { IconContext } from "react-icons";
import { BiPencil } from "react-icons/bi";

import * as plantModels from "../models/plantModels";
import { server } from "../server";

const getSinglePlant = async (plantID: number) => {
  const [plant] = await server.GetUserPlant({ userPlantID: plantID });
  return plant;
};

const getPlantTypeInformation = async (plantTypeID: number) => {
  const [plantTypeInfo] = await server.GetPlantType({ plantTypeID });
  return plantTypeInfo;
};

const getPlantImages = async (userPlantID: number) => {
  const plantImages = await server.GetPlantImages({ userPlantID });
  return plantImages;
};

const PlantIndividual = (props: { setLoading: (val: boolean) => void }) => {
  let params = useParams();
  const plantID = Number(params.plantID);
  const { setLoading } = props;

  const [plant, setPlant] = useState<plantModels.individualPlant>();
  const [plantImages, setPlantImages] =
    useState<Array<plantModels.PlantImage>>();

  useEffect(() => {
    const loadPlant = async () => {
      try {
        setLoading(true);

        const userPlant = await getSinglePlant(plantID);

        const results = await Promise.allSettled([
          getPlantTypeInformation(userPlant.plant_id),
          getPlantImages(plantID),
        ]);

        let [plantTypeInfo, plantImages] = results.map((res: any) => res.value);

        setPlant({ ...userPlant, ...plantTypeInfo });
        setPlantImages(plantImages);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadPlant();
  }, [setLoading, plantID]);

  return (
    <React.Fragment>
      <div className="float-end mt-2 me-2">
        <IconContext.Provider value={{ size: "2em" }}>
          <div>
            <Link to={`/plant/${plant?.user_plant_id}/edit`}>
              <BiPencil />
            </Link>
          </div>
        </IconContext.Provider>
      </div>
      <div className="container-fluid">
        <div className="row text-center mb-3 mt-1">
          <h1>{plant?.plant_name}</h1>
        </div>
        <div className="row">
          <div className="row mb-3" key={uuidv4()}>
            <div className="col text-start">
              {/* plant images */}
              {plantImages && plantImages.length > 0 ? (
                <div className="container-fluid">
                  <div
                    className={`row ${
                      plantImages.length <= 3
                        ? `row-cols-${plantImages.length}`
                        : `row-cols-4`
                    }`}
                  >
                    {plantImages.map((plantImage) => (
                      <img
                        key={uuidv4()}
                        src={`data:image/jpg;base64,${plantImage.image_data}`}
                        alt="..."
                        className="col"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={`data:image/jpg;base64,${cactus.b64}`}
                  className="d-block w-100"
                  alt="..."
                />
              )}

              <hr className="px-5" />
              <div>{plant?.name} Stats:</div>
              <div>
                <i>Temp Range: </i> {plant?.min_temp}°C to {plant?.max_temp}°C
              </div>
              <div>
                <i>Sun: </i> {plant?.sunlight}
              </div>
              <div>
                <i>Water: </i> Every {plant?.water_frequency} day(s)
              </div>

              <div className="mt-3">{plant?.plant_name}'s Info:</div>
              <div className="card-text">
                <i>Created At: </i> {plant?.created_at}
              </div>
              {plant?.purchased_at && (
                <div className="card-text">
                  <i>Purchased At: </i> {plant?.purchased_at}
                </div>
              )}
              <div>
                <i>Notes: </i>
                <div>{plant?.notes}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlantIndividual;
