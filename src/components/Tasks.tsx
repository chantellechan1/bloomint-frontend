import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom";
import axios from "axios";
import * as AxiosService from "../services/AxiosService";

const getTasks = async () => {
    let res = await axios.get(
        '/plants/user/tasks',
        AxiosService.getOptionsAuthed()
    );
    return res.data
};

const Tasks = (props: { setLoading: any }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const updateTasks = async (setTasks: any) => {
            try {
                props.setLoading(true);
                let tasks = await getTasks();
                setTasks(tasks);
            } catch (e) {
                console.log(e);
            } finally {
                props.setLoading(false);
            }

        }

        updateTasks(setTasks);
    }, []);

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="row text-center mb-3 mt-1">
                    <h1>Tasks</h1>
                </div>
                <div className="row">
                    {
                        tasks.map((task: any) => {
                            return (
                                <div className="col-6" key={uuidv4()}>
                                    <div className="card text-start">
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                {task.name}
                                            </h3>
                                            <div className="card-text">
                                            {task.completed ? (<p>its done</p>) : (<p>its not done</p>)} 
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

export default Tasks;
