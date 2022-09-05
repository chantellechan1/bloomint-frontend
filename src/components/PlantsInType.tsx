import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { getUserPlantsInPlantType } from "../server/ServerCalls";
import getMostRecentPlantImage from "../services/PlantImageService";
import { Plant, PlantImage } from "../models/plantModels";

const PlantsInType = (props: { setLoading: any }) => {
  const [typePlants, setTypePlants] = useState<Array<Plant>>([]);
  let { plantTypeID } = useParams();

  useEffect(() => {
    const updatePlants = async (plantTypeID: number, setTypePlants: any) => {
      try {
        props.setLoading(true);
        const typePlants = await getUserPlantsInPlantType(plantTypeID);

        const results = await Promise.allSettled(
          typePlants.map((plant: Plant) => {
            if (!plant.user_plant_id) {
              return new Promise(() => {});
            }
            return getMostRecentPlantImage(plant.user_plant_id);
          })
        );

        results.forEach((res: any, idx) => {
          if (res.value) {
            typePlants[idx].most_recent_image = res.value as PlantImage;
          }
        });
        setTypePlants(typePlants);
      } catch (e) {
        console.log(e);
      } finally {
        props.setLoading(false);
      }
    };

    updatePlants(parseInt(plantTypeID as string), setTypePlants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid">
      <div className="row text-center mb-3 mt-1">
        <h1>Plants in Type</h1>
      </div>

      <div className="row">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/plants_by_type">Plants By Type</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {" "}
              {plantTypeID}{" "}
            </li>
          </ol>
        </nav>
      </div>

      <div className="row">
        {typePlants.map((plant: any) => {
          return (
            <div className="row mb-3" key={uuidv4()}>
              <div className="col">
                <div className="card text-start">
                  <Link to={`/plant/${plant.id}`}>
                    <img
                      src={`data:image/jpg;base64,${plant.most_recent_image.image_data}`}
                      className="d-block w-100"
                      alt="..."
                    />
                  </Link>
                  <div className="card-body">
                    <h3 className="card-title">{plant.plant_name}</h3>
                    <div className="card-text">
                      <i>Created At: </i> {plant.created_at}
                    </div>
                    {plant.purchased_at !== null && (
                      <div className="card-text">
                        <i>Purchased At: </i> {plant.purchased_at}
                      </div>
                    )}
                    <div className="card-text">
                      <i>Notes: </i>
                      <div>{plant.notes}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlantsInType;
