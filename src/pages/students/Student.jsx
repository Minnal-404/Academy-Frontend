import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { create_profile, get_profile } from "../../services/profile";
import { update_project, delete_project } from "../../services/project";
import { update_english } from "../../services/english";
import { update_language } from "../../services/language";
import { get_language_list } from "../../services/language_list";






function Student() {
    const [data, setData] = useState(null);
    const [languageListData, setLanguageListData] = useState(null);
    const [languageData, setLanguageData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [englishData, setEnglishData] = useState({
        rank: '',
        url: ''
    });
    const [projectInputs, setProjectInputs] = useState([{ title: '', url: '', description: '' }]);
    const location = useLocation();
    const user = location.state?.data;
    console.log(user)

    const [isLanguageEditing, setIsLanguageEditing] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('');

    const handleLanguageEditClick = () => {
        setIsLanguageEditing(true);
    };

    const handleLanguageSaveClick = () => {
        setIsLanguageEditing(false);

        console.log("Updated Language:", selectedLanguage);
        updateLanguage()
    };

    const cancelLanguage = () => {
        setIsLanguageEditing(false);
        setSelectedLanguage(data.language.language);
    }

    const cancelEnglish = () => {
        setIsEnglishEditing(false);
        setIsEnglishInput(false);
        setEnglishUpdateData({
            rank: '',
            url: ''
        });

    }

    const navigate = useNavigate();

    const handleNavigate = () => {

        navigate('/home/student/add_project');
    };
    const handleLanguageChange = (e) => {
        setLanguageData(e.target.value);
    };
    const addInput = () => {
        setProjectInputs([...projectInputs, { title: '', url: '', description: '' }]);
    };
    const removeInput = () => {
        if (projectInputs.length > 1) {
            setProjectInputs(projectInputs.slice(0, -1));
        }
    };

    // Function to handle input changes
    const handleProjectInputChange = (index, field, value) => {
        const updatedInputs = [...projectInputs];
        updatedInputs[index][field] = value;
        setProjectInputs(updatedInputs);
    };



    const [isEnglishEditing, setIsEnglishEditing] = useState(false);
    const [isEnglishInput, setIsEnglishInput] = useState(false);
    const [englishUpdateData, setEnglishUpdateData] = useState({
        rank: '',
        url: '',
    });

    const handleChange = (field, value) => {
        setIsEnglishInput(true)
        setEnglishUpdateData(() => ({
            [field]: value,
        }));
    };

    const handleEnglishEditClick = () => setIsEnglishEditing(true);
    const handleEnglishSaveClick = () => {
        if (englishUpdateData.rank) {
            data.english.rank = englishUpdateData.rank;  // Update rank if not empty
        }

        if (englishUpdateData.url) {
            data.english.url = englishUpdateData.url;    // Update url if not empty
        }
        updateEnglish(englishUpdateData)
        console.log("Saved English data:", englishUpdateData);
    }


    const [editingId, setEditingId] = useState(null);
    const [isProjectEditing, setIsProjectEditing] = useState(false);
    const [editedProject, setEditedProject] = useState({
        title: "",
        description: "",
        url: ""
    });

    const handleEditClick = (project) => {
        setEditingId(project.id);

        //   setEditedProject({ ...project }); // preload the current project into form
    };

    const handleInputChange = (field, value) => {
        setIsProjectEditing(true)
        setEditedProject(() => ({
            [field]: value,
        }));
    };

    const handleSaveClick = (project) => {
        console.log("Updated project data:", editedProject);
        // TODO: call API to save update
        updateProject(project, editedProject)
        setEditingId(null);
    };

    const [showErrors, setShowErrors] = useState(false);
    const [languageError, setLanguageError] = useState('');
    const [showEnglishErrors, setShowEnglishErrors] = useState(false);

    const sendData = async () => {
        const updatedInputs = [...projectInputs];
        let hasErrors = false;

        updatedInputs.forEach((input, index) => {
            const errors = {};

            if (!input.title?.trim()) {
                errors.title = 'Title is required.';
            } else if (input.title.trim().length < 3) {
                errors.title = 'Title must be at least 3 characters.';
            }
            
            if (!input.description?.trim()) {
                errors.description = 'Description is required.';
            } else if (input.description.trim().length < 5) {
                errors.description = 'Description must be at least 5 characters.';
            }

            if (!input.url?.trim()) {
                errors.url = 'URL is required.';
            }

            if (Object.keys(errors).length > 0) {
                hasErrors = true;
            } 
            

            updatedInputs[index].errors = errors;
        });

        let isValid = true;

        // Validate selectedLanguage
        if (!selectedLanguage || selectedLanguage === 'Select a language') {
            setLanguageError('Language selection is required.');
            isValid = false;
        } else {
            setLanguageError('');
        }

        // Validate englishData fields
        const errors = {};
        if (!englishData.rank || englishData.rank === 'Select a language') {
            errors.rank = 'Rank is required.';
            isValid = false;
        }
        if (!englishData.url.trim()) {
            errors.url = 'EF SET Certificate URL is required.';
            isValid = false;
        } 

        setEnglishData(prev => ({ ...prev, errors }));
        setShowEnglishErrors(true);

        // Auto-hide errors after 3 seconds
        setTimeout(() => {
            setShowEnglishErrors(false);
            setLanguageError('');
        }, 3000);

        setProjectInputs(updatedInputs);
        console.log(updatedInputs)
        setShowErrors(true);
        setTimeout(() => {
            setShowErrors(false);
        }, 3000);
        if (!hasErrors && isValid) {
            const profile = {
                "language": languageData,
                "projects": projectInputs.map((input) => ({
                    title: input.title,
                    url: input.url,
                    description: input.description
                })),
                "english": {
                    "rank": englishData.rank,
                    "url": englishData.url
                }
            }
            console.log(profile)
            try {
                setIsLoading(true);
                const response = await create_profile(profile)

                if (!response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (!data.detail[0].msg) {
                        setError(data.detail)
                        setTimeout(() => {
                            setError(null)
                        }, (3000));
                        if (data.detail == 'Token expired'){

                            setTimeout(() => {
                                navigate('/login', { state: { data: user } });
                                
                            }, (3000));
                        }
                        setIsLoading(false);
                        return;
                    } 
                    setError(data.detail[0].msg.split(':')[1])
                    setTimeout(() => {
                        setError(null)
                    }, (3000));
                    setIsLoading(false);
                    return;
                }

                const result = await response.json();
                console.log(result)
                setIsLoading(false);
                window.location.reload();

            } catch (error) {
                console.log(error)
                setError('Failed to fetch')
                setTimeout(() => {
                    setError(null)
                }, (3000));
                setIsLoading(false);

            }
        }
    }

    const updateEnglish = async (englishJson) => {
        try {
            setIsLoading(true);
            const response = await update_english(data.english.id, englishJson)

            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                if (!data.detail[0].msg) {
                    setError(data.detail);
                    setTimeout(() => {
                        setError(null)
                    }, (3000));
                    if (data.detail == 'Token expired'){

                        setTimeout(() => {
                            navigate('/login', { state: { data: user } });
                            
                        }, (3000));
                    }
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
            setIsEnglishEditing(false);
            data.english.is_approved = false
            data.english.is_rejected = false
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);

    const deleteProject = async (project_id) => {
        setPendingDeleteId(project_id);
        setShowDeletePopup(true);
    };

    const confirmDeleteProject = async () => {
        console.log(pendingDeleteId)
        try {
            setIsLoading(true);
            const response = await delete_project(pendingDeleteId)

            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                if (!data.detail[0].msg) {
                    setError(data.detail);
                    setTimeout(() => {
                        setError(null)
                    }, (3000));
                    if (data.detail == 'Token expired'){

                        setTimeout(() => {
                            navigate('/login', { state: { data: user } });
                            
                        }, (3000));
                    }
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
            setShowDeletePopup(false);

            setData(prevData => ({
                ...prevData,
                projects: prevData.projects.filter(project => project.id !== pendingDeleteId)
            }));
            console.log(data)
            setPendingDeleteId(null);
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const updateProject = async (project, projectUpdate) => {
        try {
            setIsLoading(true);
            const response = await update_project(project.id, projectUpdate)
            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                if (!data.detail[0].msg) {
                    setError(data.detail);
                    if (data.detail == 'Token expired'){

                        setTimeout(() => {
                            navigate('/login', { state: { data: user } });
                            
                        }, (3000));
                    }
                    throw new Error(data.detail);
                }
                throw new Error(data.detail[0].msg.split(':')[1]);
            }

            const result = await response.json();
            console.log(result)
            if (projectUpdate.title) {
                project.title = projectUpdate.title
            }
            if (projectUpdate.description) {
                project.description = projectUpdate.description

            }
            if (projectUpdate.url) {
                project.url = projectUpdate.url

            }
            setIsProjectEditing(false)
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const updateLanguage = async () => {
        try {
            setIsLoading(true);
            const response = await update_language(selectedLanguage)

            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                if (!data.detail[0].msg) {
                    setError(data.detail);
                    if (data.detail == 'Token expired'){

                        setTimeout(() => {
                            navigate('/login', { state: { data: user } });
                            
                        }, (3000));
                    }
                    throw new Error(data.detail);
                    
                }
                //  else if (data.detail[0].msg.split(':')[0].includes("email")) {

                //     setTimeout(() => {
                //     }, 3000);
                //     return;
                // }
                // throw new Error(data.detail[0].msg.split(':')[1]);
            }

            const result = await response.json();
            console.log(result)
            data.language.language = selectedLanguage
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await get_profile()
                if (!response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (!data.detail[0].msg) {
                        setError(data.detail);
                        setTimeout(() => {
                            setError(null)
                            navigate('/login', { state: { data: user } });
    
                        }, (3000));
                        if (data.detail == 'Token expired'){

                            setTimeout(() => {
                                navigate('/login', { state: { data: user } });
                                
                            }, (3000));
                        }
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
                setData(result);
                // setSelectedLanguage(result.language.language);
                // setEnglishUpdateData(result.english)
                // setIsLoading(false);
            } catch (error) {
                // setIsLoading(false);

            }
            try {
                setIsLoading(true);
                const response = await get_language_list()
                if (!response.ok) {
                    const data = await response.json();
                    console.log(data)
                    if (!data.detail[0].msg) {
                        setError(data.detail);
                        setTimeout(() => {
                            setError(null)
                            navigate('/login', { state: { data: user } });
    
                        }, (3000));
                        if (data.detail == 'Token expired'){

                            setTimeout(() => {
                                navigate('/login', { state: { data: user } });
                                
                            }, (3000));
                        }
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
                setLanguageListData(result);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);

            }
        };

        fetchData();



        return () => {
        };
    }, []);


    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }
    const ranks = ["A1", "A2", "B1", "B2", "C1", "C2"]

    return (
        <>
            {data.language || data.projects || data.english ? (
                <div className="ps-5 container">
                    <h1 className="text-center">My Profile</h1>
                    <section className="">
                        <h2>Tech</h2>
                        <div className="p-5 me-0 pe-0">


                            <div className="d-flex row  gap-3">
                                <h3 className="col-3">Language:</h3>

                                {isLanguageEditing ? (
                                    <select
                                        className="text-center  col-6"
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                    >
                                        <option selected disabled>Select a language</option>
                                        {languageListData.language_list.map((lang) => (
                                            <option key={lang.id} value={lang.language}>
                                                {lang.language}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <h4 className="col p-0">{data.language.language}</h4>
                                )}


                            </div>
                            <div className="d-flex row ">
                                <h3 className="col-3">Approval Status:</h3>
                                <h4 className="col">{data.language.is_approved ? "Approved" :
                                    data.language.is_rejected ? "Rejected" : "Pending"}</h4>
                                <div className="d-flex justify-content-end col me-0 pe-0 gap-5"
                                >
                                    {isLanguageEditing && <button className="btn btn-danger" onClick={cancelLanguage}>Cancel</button>}
                                    <button className="btn btn-warning"
                                        onClick={isLanguageEditing ? handleLanguageSaveClick : handleLanguageEditClick}
                                    >{isLanguageEditing ? 'Update' : 'Update Language'}</button>
                                </div>

                            </div>
                            {data.language.is_rejected && (
                                <div className="d-flex row">
                                    <h3 className="col-3">Message:</h3>
                                    <h4 className="col">{data.language.message}</h4>
                                </div>)}
                        </div>
                    </section>

                    <section className="">
                        <h2>English</h2>
                        <div className="p-5 me-0 pe-0">

                            {/* <div className="d-flex row" key={data.english.id}>

                                <h3 className="col-3">Rank:</h3>
                                <h4 className="col">{data.english.rank}</h4>
                            </div>
                            <div className="d-flex row">

                                <h3 className="col-3">EF SET Certificate:</h3>
                                <h4 className="col"><a href={data.english.url} target="_blank">{data.english.url}</a></h4>
                            </div> */}

                            <div className="d-flex row mb-3" key={data.english.id}>
                                <h3 className="col-3">Rank:</h3>
                                {isEnglishEditing ? (
                                    <select
                                        className="text-center  col-6"
                                        value={""}
                                        onChange={(e) => handleChange('rank', e.target.value)}
                                    >
                                        <option selected value={""} disabled>Select a rank</option>
                                        {ranks.map((rank) => (
                                            <option key={rank} value={rank}>
                                                {rank}
                                            </option>
                                        ))}
                                    </select>

                                ) : (
                                    <h4 className="col">{data.english.rank}</h4>
                                )}
                            </div>

                            <div className="d-flex row mb-3">
                                <h3 className="col-3">EF SET Certificate:</h3>
                                {isEnglishEditing ? (
                                    <input
                                        type="url"
                                        className="col form-control"
                                        value={isEnglishInput ? englishUpdateData.url : data.english.url}
                                        onChange={(e) => handleChange('url', e.target.value)}
                                    />
                                ) : (
                                    <h4 className="col">
                                        <a href={data.english.url} target="_blank" rel="noopener noreferrer">
                                            {data.english.url}
                                        </a>
                                    </h4>
                                )}
                            </div>




                            <div className="d-flex row">
                                <h3 className="col-3">Approval Status:</h3>
                                <h4 className="col">{data.english.is_approved ? "Approved" :
                                    data.english.is_rejected ? "Rejected" : "Pending"}</h4>
                                <div className="d-flex justify-content-end col me-0 pe-0 gap-5">
                                    {isEnglishEditing && <button className="btn btn-danger" onClick={cancelEnglish}>Cancel</button>}
                                    <button className="btn btn-warning"
                                        onClick={isEnglishEditing ? handleEnglishSaveClick : handleEnglishEditClick}
                                    >{isEnglishEditing ? 'Update' : 'Update English'}</button>
                                </div>
                            </div>
                            {data.english.is_rejected && (
                                <div className="d-flex row">
                                    <h3 className="col-3">Message:</h3>
                                    <h4 className="col">{data.english.message}</h4>
                                </div>)}
                        </div>
                    </section>

                    {data.projects.length > 0 ? (
                        <section className="">
                            <h2>Projects</h2>
                            {/* {data.projects.map((project) => (
                                <div key={project.id} className="d-flex row p-5 pe-0">
                                    <h3 className=" text-center">{project.title}</h3>
                                    <div className="d-flex row">

                                        <h3 className="col-3">Descripton:</h3>
                                        <p className="col">{project.description}</p>
                                    </div>
                                    <h3 className="col-3">URL:</h3>
                                    <h4 className="col"><a href={project.url} target="_blank">{project.url}</a></h4>
                                    <div className="d-flex row me-0 pe-0">

                                        <h3 className="col-3">Approval Status:</h3>
                                        <h4 className="col">{project.is_approved ? "Approved" :
                                            project.is_rejected ? "Rejected" : "Pending"}</h4>
                                        <div className="d-flex justify-content-end col me-0 pe-0">

                                            <button className="btn btn-warning" >Update Project</button>
                                        </div>
                                    </div>
                                    {project.is_rejected && (
                                        <div className="d-flex row">
                                            <h3 className="col-3">Message:</h3>
                                            <h4 className="col">{project.message}</h4>
                                        </div>)}

                                </div>
                            ))} */}



                            {data.projects.map((project) => (
                                <div key={project.id} className="d-flex row p-5 pe-0 border-bottom">
                                    {editingId === project.id ? (
                                        <>
                                            <div className="d-flex row mb-2">
                                                <label className="col-3 fw-bold">Title:</label>
                                                <input
                                                    className="form-control col mb-2"
                                                    value={isProjectEditing ? editedProject.title : project.title}
                                                    onChange={(e) => handleInputChange("title", e.target.value)}
                                                />
                                            </div>
                                            <div className="d-flex row mb-2">
                                                <label className="col-3 fw-bold">Description:</label>
                                                <textarea
                                                    className="col form-control"
                                                    value={isProjectEditing ? editedProject.description : project.description}
                                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                                />
                                            </div>
                                            <div className="d-flex row mb-2">
                                                <label className="col-3 fw-bold">URL:</label>
                                                <input
                                                    className="col form-control"
                                                    value={isProjectEditing ? editedProject.url : project.url}
                                                    onChange={(e) => handleInputChange("url", e.target.value)}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-end gap-5">
                                                <button className="btn btn-danger" onClick={() => setEditingId(null)}>Cancel</button>
                                                <button className="btn btn-warning me-2" onClick={() => handleSaveClick(project)}>Update</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-center">{project.title}</h3>
                                            <div className="d-flex row">
                                                <h4 className="col-3">Description:</h4>
                                                <p className="col">{project.description}</p>
                                            </div>
                                            <h4 className="col-3">URL:</h4>
                                            <h5 className="col"><a href={project.url} target="_blank">{project.url}</a></h5>
                                            <div className="d-flex row me-0 pe-0">
                                                <h4 className="col-3">Approval Status:</h4>
                                                <h5 className="col">
                                                    {project.is_approved ? "Approved" :
                                                        project.is_rejected ? "Rejected" : "Pending"}
                                                </h5>
                                                <div className="d-flex justify-content-end gap-5 col me-0 pe-0">
                                                    {!editingId && (<button className="btn btn-danger" onClick={() => deleteProject(project.id)}>Delete Project</button>)}
                                                    <button className="btn btn-warning" onClick={() => handleEditClick(project)}>Update Project</button>
                                                </div>
                                            </div>
                                            {project.is_rejected && (
                                                <div className="d-flex row">
                                                    <h4 className="col-3">Message:</h4>
                                                    <h5 className="col">{project.message}</h5>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                            <div className="d-flex justify-content-end">

                                <button className="btn btn-primary position-fixed bottom-0 end-0 m-5" onClick={handleNavigate}>Add New Project</button>
                            </div>
                        </section>
                    ) : (
                        <>
                            <h2>Projects</h2>

                            <h3 className="text-center">No projects available</h3>
                            <div className="p-5">

                                <button className="btn btn-primary position-fixed bottom-0 end-0 m-5" onClick={handleNavigate}>Add New Project</button>
                            </div>

                        </>
                    )}

                </div>) : (
                <div className="px-5 bg-black container">
                    <h1 className="text-center">Create Profile</h1>
                    <section className=""
                        value={languageData}
                        onChange={handleLanguageChange} >
                        <h2 className="">Tech</h2>
                        <div className="row p-5">
                            <div className="d-flex">
                                <h3 className="col-4">Language:</h3>
                                <div className="col">
                                <select
                                    className="text-center  col-6"
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                >
                                    <option selected disabled>Select a language</option>
                                    {languageListData.language_list.map((lang) => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                                {languageError && <div style={{ color: 'red', fontSize: '0.8rem' }}>{languageError}</div>}
                            </div>
                            </div>


                        </div>

                    </section>

                    <section className="">
                        <h2>English</h2>
                        <div className="p-5 row gap-5">

                            <div className="d-flex" >

                                <h3 className="col-4">Rank: </h3>
                                <div className="col">
                                <select
                                    className="text-center  col-6"
                                    onChange={(e) => setEnglishData({ ...englishData, rank: e.target.value })}
                                >
                                    <option selected disabled>Select a language</option>
                                    {ranks.map((lang) => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                                {showEnglishErrors && englishData.errors?.rank && (
                                    <div style={{ color: 'red', fontSize: '0.8rem' }}>{englishData.errors.rank}</div>
                                )}
                                </div>
                            </div>
                            <div className="d-flex">

                                <h3 className="col-4">EF SET Certificate: </h3>
                                <div className="col">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter EF SET Certificate URL"
                                    onChange={(e) => setEnglishData({ ...englishData, url: e.target.value })}
                                ></input>
                                {showEnglishErrors && englishData.errors?.url && (
                                    <div style={{ color: 'red', fontSize: '0.8rem' }}>{englishData.errors.url}</div>
                                )}
                                </div>
                            </div>
                        </div>


                    </section>

                    <section className="">
                        <h2>Projects</h2>

                        {projectInputs.map((input, index) => (
                            <div key={index} className="p-5 ">
                                <h3>Project {index + 1}</h3>
                                <div className="row gap-5 pt-5">

                                    <div className="d-flex ">

                                        <h4 className="col-4">Title:</h4>
                                        <div className="col">
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={input.title}
                                            onChange={(e) => handleProjectInputChange(index, 'title', e.target.value)}
                                            placeholder="Enter Title"
                                        />
                                        {showErrors && input.errors?.title && (
                                            <div className="text-danger">{input.errors.title}</div>
                                        )}
                                        </div>
                                    </div>
                                    <div className="d-flex ">

                                        <h4 className="col-4">Description:</h4>
                                        <div className="col">
                                        <textarea
                                            type="text"
                                            value={input.description}
                                            onChange={(e) => handleProjectInputChange(index, 'description', e.target.value)}
                                            className="form-control"
                                            placeholder="Enter Description">
                                        </textarea>
                                        {showErrors && input.errors?.description && (
                                            <div className="text-danger">{input.errors.description}</div>
                                        )}
                                        </div>
                                    </div>
                                    <div className="d-flex">

                                        <h4 className="col-4">URL:</h4>
                                        <div className="col">

                                        <input
                                            type="url"
                                            value={input.url}
                                            onChange={(e) => handleProjectInputChange(index, 'url', e.target.value)}
                                            className="form-control"
                                            placeholder="Enter Project URL"
                                            
                                            />
                                        {showErrors && input.errors?.url && (
                                            <div className="text-danger">{input.errors.url}</div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="row gap-5 d-flex justify-content-around">
                            <button className="col-3 btn btn-primary text-white" onClick={addInput} >Add More Projects</button>
                            <button className="col-3 btn btn-danger text-white" onClick={removeInput} disabled={projectInputs.length <= 1}>Remove Last Project</button>
                        </div>
                        <div className="row d-flex justify-content-center pb-5">

                            <button className="btn btn-success col-3" onClick={sendData}>Create Profile</button>
                        </div>

                    </section>

                </div>
            )}


            {showDeletePopup && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,

                    }}
                >
                    <div
                        style={{

                            minWidth: '300px'
                        }}
                        className="border border-danger border-5 rounded p-5 bg-black d-flex flex-column gap-4"
                    >
                        <h4 className="text-danger ">Are you sure you want to delete this project?</h4>
                        <div className="d-flex justify-content-center gap-5">
                            <button onClick={confirmDeleteProject} className="btn btn-danger">
                                Delete
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
}


export default Student