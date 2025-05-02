import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { create_project } from "../../services/project";


function AddProject() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projectAddInputs, setProjectAddInputs] = useState([
        { title: '', description: '', url: '' }
    ]);

    const [showErrors, setShowErrors] = useState(false);
    const addInput = () => {
        setProjectAddInputs([...projectAddInputs, { title: '', url: '' }]);
    };
    const removeInput = () => {
        setProjectAddInputs(projectAddInputs.slice(0, -1));
    };
    const handleProjectAddInputChange = (index, field, value) => {
        const updatedInputs = [...projectAddInputs];
        updatedInputs[index][field] = value;
        setProjectAddInputs(updatedInputs);
    };
    const navigate = useNavigate();



    const sendData = async () => {
        const updatedInputs = [...projectAddInputs];
        let hasErrors = false;

        updatedInputs.forEach((input, index) => {
            const errors = {};

            if (!input.title?.trim()) {
                errors.title = 'Title is required.';
            } else if (input.title.trim().length < 3) {
                errors.title = 'Title must be at least 3 characters.';
            }
            else if (input.title.trim().length > 20) {
                errors.title = 'Title cannot be more than 20 characters.';
            }

            if (!input.description?.trim()) {
                errors.description = 'Description is required.';
            } else if (input.description.trim().length < 5) {
                errors.description = 'Description must be at least 5 characters.';
            }
            else if (input.description.trim().length > 2048) {
                errors.description = 'Description cannot be more than 2048 characters.';
            }

            const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/\S*)?$/;
            if (!input.url?.trim()) {
                errors.url = 'URL is required.';
            }

            if (Object.keys(errors).length > 0) {
                hasErrors = true;
            }

            updatedInputs[index].errors = errors;
        });

        setProjectAddInputs(updatedInputs);
        console.log(updatedInputs)
        setShowErrors(true);
        setTimeout(() => {
            setShowErrors(false);
        }, 3000);
        if (!hasErrors) {

            const payload = {
                projects: updatedInputs.map(input => ({
                    title: input.title.trim(),
                    description: input.description.trim(),
                    url: input.url.trim()
                }))
            };

            try {
                setIsLoading(true);
                const response = await create_project(payload)

                if (!response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (!data.detail[0].msg) {

                        setError(data.detail);
                        setTimeout(() => {
                            setError(null)
                        }, (3000));
                        throw new Error(data.detail);
                    }
                    setError(data.detail[0].msg.split(':')[1]);
                    setTimeout(() => {
                        setError(null)
                    }, (3000));
                    throw new Error(data.detail[0].msg.split(':')[1]);
                }

                const result = await response.json();
                console.log(result)
                setIsLoading(false);
                navigate('/home/student/');

            } catch (error) {
                console.log(error)
                setIsLoading(false);

            }
        }
    }

    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }
    return (
        <>
            {projectAddInputs.map((input, index) => (
                <div key={index} className="px-5  mx-5">
                    <h2>Project {index+1}</h2>
                    <div className="p-5">

                    <div className="d-flex row mb-2">

                        <h3 className="col-2">Title:</h3>
                        <div className="col">

                            <input
                            className="form-control"
                            type="text"
                            value={input.title}
                            onChange={(e) => handleProjectAddInputChange(index, 'title', e.target.value)}
                            placeholder="Title"
                                />
                            {showErrors && input.errors?.title && (
                                <div className="text-danger">{input.errors.title}</div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex row mb-2">
                        <h3 className="col-2">Description:</h3>
                        <div className="col">
                            <textarea
                                type="text"
                                value={input.description}
                                onChange={(e) => handleProjectAddInputChange(index, 'description', e.target.value)}
                                className="form-control"
                                placeholder="Description"
                                ></textarea>
                            {showErrors && input.errors?.description && (
                                <div className="text-danger">{input.errors.description}</div>
                            )}
                        </div>
                    </div>

                    <div className="d-flex row mb-2">
                        <h3 className="col-2">URL:</h3>
                        <div className="col">

                            <input
                                type="text"
                                className="form-control"
                                value={input.url}
                                onChange={(e) => handleProjectAddInputChange(index, 'url', e.target.value)}
                                placeholder="URL"
                                />
                            {showErrors && input.errors?.url && (
                                <div className="text-danger">{input.errors.url}</div>
                            )}
                        </div>
                            </div>
                    </div>
                </div>
            ))}
            < div className="row gap-5 d-flex justify-content-around p-5" >
                <button className="col-3 btn btn-primary text-white" onClick={addInput} >Add More Projects</button>
                <button className="col-3 btn btn-danger text-white" onClick={removeInput} disabled={projectAddInputs.length <= 1}>Remove Last Project</button>
            </div >
            <div className="row d-flex justify-content-center pb-5">
                <button className="col-3 btn btn-success " onClick={sendData}>Add Projects</button>
            </div>

        </>
    )
}

export default AddProject