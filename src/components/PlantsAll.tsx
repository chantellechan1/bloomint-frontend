import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Plant } from "../models/plantModels";
import { server } from "../server";

const PlantsAll = (props: { setLoading: any }) => {
  const [allPlants, setAllPlants] = useState<Array<Plant>>();

  useEffect(() => {
    const updateAllPlants = async () => {
      try {
        props.setLoading(true);
        const res = await server.GetAllUserPlants();
        setAllPlants(res.allPlants);
      } catch (e) {
        console.log(e);
      } finally {
        props.setLoading(false);
      }
    };

    updateAllPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row text-center mb-3 mt-1">
          <h1>All Plants</h1>
        </div>
        <div className="row">
          {allPlants &&
            allPlants.map((plant: any) => {
              return (
                <div className="row mb-3" key={uuidv4()}>
                  <div className="col">
                    <div className="card text-start">
                      <Link
                        to={`/plant/${plant.id}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <img
                          src={`data:image/jpg;base64,${plant.most_recent_image.image_data}`}
                          className="d-block w-100"
                          alt="..."
                        />
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
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlantsAll;
