import { useState, useEffect } from "react";
import RejectReasonBox from "../../components/RejectReasonBox";
import { useNavigate, useLocation } from 'react-router-dom';
import { get_all_students, get_all_companies } from "../../services/user";
import { get_all_profiles, get_all_updates } from "../../services/profile";
import { delete_language, get_language_list, create_language_list } from "../../services/language_list";
import { approve_language,
     approve_english,
      approve_project,
       reject_language,
        reject_english,
        reject_project
 } from "../../services/approval";


function Academy() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    console.log(user)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allLanguages, setAllLanguages] = useState(null);
    const [allStudents, setAllStudents] = useState(null);
    const [allCompanies, setAllCompanies] = useState(null);
    const [allProfiles, setAllProfiles] = useState(null);
    const [allUpdates, setAllUpdates] = useState(null);
    const [isAllLanguages, setIsAllLanguages] = useState(true);
    const [isAllStudents, setIsAllStudents] = useState(false);
    const [isAllCompanies, setIsAllCompanies] = useState(false);
    const [isAllProfiles, setIsAllProfiles] = useState(false);
    const [isAllUpdates, setIsAllUpdates] = useState(false);
    const [isTechUpdates, setIsTechUpdates] = useState(true);
    const [isEnglishUpdates, setIsEnglishUpdates] = useState(false);
    const [isProjectUpdates, setIsProjectUpdates] = useState(false);

    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(null);

    const handleCompanyClick = (index) => {
        // Toggle: if already selected, unselect it
        if (selectedCompanyIndex === index) {
            setSelectedCompanyIndex(null);
        } else {
            setSelectedCompanyIndex(index);
        }
    };

    const getAllLanguages = async () => {

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
            setAllLanguages(result.language_list);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

    const getAllStudents = async () => {

        try {
            setIsLoading(true);
            const response = await get_all_students();
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
            setAllStudents(result);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

    const getAllCompanies = async () => {

        try {
            setIsLoading(true);
            const response = await get_all_companies()
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
            setAllCompanies(result);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

    const getAllProfiles = async () => {

        try {
            setIsLoading(true);
            const response = await get_all_profiles()
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
            setAllProfiles(result);
            // setIsAllProfiles(true)

            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

    const getAllUpdates = async () => {

        try {
            setIsLoading(true);
            const response = await get_all_updates()
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
            setAllUpdates(result);

            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

    const showAllLanguages = () => {
        setIsAllCompanies(false)
        setIsAllProfiles(false)
        setIsAllUpdates(false)
        setIsAllStudents(false)
        setIsAllLanguages(true)
    }

    const showAllStudents = () => {
        setIsAllCompanies(false)
        setIsAllProfiles(false)
        setIsAllUpdates(false)
        setIsAllLanguages(false)
        setIsAllStudents(true)
    }

    const showAllCompanies = () => {
        setIsAllStudents(false)
        setIsAllProfiles(false)
        setIsAllUpdates(false)
        setIsAllLanguages(false)
        setIsAllCompanies(true)
    }

    const showAllProfiles = () => {
        setIsAllStudents(false)
        setIsAllCompanies(false)
        setIsAllUpdates(false)
        setIsAllLanguages(false)
        setIsAllProfiles(true)
    }

    const showAllUpdates = () => {
        setIsAllStudents(false)
        setIsAllCompanies(false)
        setIsAllProfiles(false)
        setIsAllLanguages(false)
        setIsAllUpdates(true)
        // setIsTechUpdates(true)
    }

    const showTechUpdates = () => {
        setIsProjectUpdates(false)
        setIsEnglishUpdates(false)
        setIsTechUpdates(true)
    }

    const showEnglishUpdates = () => {
        setIsProjectUpdates(false)
        setIsTechUpdates(false)
        setIsEnglishUpdates(true)
    }

    const showProjectUpdates = () => {
        setIsTechUpdates(false)
        setIsEnglishUpdates(false)
        setIsProjectUpdates(true)
    }

    useEffect(() => {
        getAllLanguages()
        getAllStudents()
        getAllCompanies()
        getAllProfiles()
        getAllUpdates()

        return () => {
        };
    }, []);

    const [expandedIndex, setExpandedIndex] = useState(null);


    const approveLanguage = async (email) => {


        try {
            setIsLoading(true);
            const response = await approve_language(email)

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
            getAllProfiles()
            getAllUpdates()
            setSelectedUser(null);
            setCurrentApproveData(null);
            setShowApprovePopup(false)
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const approveEnglish = async (english_id) => {


        try {
            setIsLoading(true);
            const response = await approve_english(english_id)

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
            getAllProfiles()
            getAllUpdates()
            setSelectedUser(null);
            setShowApprovePopup(false)
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }


    const approveProject = async (project_id) => {


        try {
            setIsLoading(true);
            const response = await approve_project(project_id)

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
            getAllProfiles()
            getAllUpdates()
            setSelectedUser(null);
            setShowApprovePopup(false)
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const rejectLanguage = async (email, message) => {
        const json = {
            email: email,
            message: message
        }
        try {
            setIsLoading(true);
            const response = await reject_language(json)

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
            getAllProfiles()
            getAllUpdates()
            setShowRejectBox(false);
            setRejectionReason("");
            setCurrentRejectData(null);
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const rejectEnglish = async (english_id, message) => {
        const json = {
            id: english_id,
            message: message
        }
        try {
            setIsLoading(true);
            const response = await reject_english(json)

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
            getAllProfiles()
            getAllUpdates()
            setShowRejectBox(false);
            setRejectionReason("");
            setCurrentRejectData(null);
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const rejectProject = async (project_id, message) => {
        const json = {
            id: project_id,
            message: message
        }
        try {
            setIsLoading(true);
            const response = await reject_project(json)

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
            getAllProfiles()
            getAllUpdates()
            setShowRejectBox(false);
            setRejectionReason("");
            setCurrentRejectData(null);
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const createLanguageList = async () => {
        const json = {
            languages: inputs
        }
        try {
            setIsLoading(true);
            const response = await create_language_list(json)

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
            getAllLanguages()
            setIsCreateLanguages(false);
            setInputs(['']);
            console.log(result)
            setIsLoading(false);

        } catch (error) {
            console.log(error)
            setError('Failed to fetch')
            setTimeout(() => {
                setError(null)
            }, (3000));
            setIsLoading(false);

        }
    }

    const [approveType, setApproveType] = useState(""); // "language" | "english" | "project"


    const [showRejectBox, setShowRejectBox] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [currentRejectData, setCurrentRejectData] = useState(null); // stores { section, item }

    const openRejectBox = (section, item) => {
        setCurrentRejectData({ section, item });
        setShowRejectBox(true);
    };

    const handleReject = () => {
        const { section, item } = currentRejectData;

        if (section === "language") {
            console.log("Rejecting language for", item.user.email, "Reason:", rejectionReason);
            rejectLanguage(item.user.email, rejectionReason)
        } else if (section === "english") {
            console.log("Rejecting English for", item.user.email, "Reason:", rejectionReason);
            rejectEnglish(item.english.id, rejectionReason)
        } else if (section === "project") {
            console.log("Rejecting project:", item.title, "Reason:", rejectionReason);
            rejectProject(item.id, rejectionReason)
        }

        // Close modal

    };

    const [showApprovePopup, setShowApprovePopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentApproveData, setCurrentApproveData] = useState(null)


    const [inputs, setInputs] = useState([""]);
    const [isCreateLanguages, setIsCreateLanguages] = useState(false)

    const handleInputChange = (index, value) => {
        const updated = [...inputs];
        updated[index] = value;
        setInputs(updated);
        console.log(inputs)
    };

    const addInput = () => {
        setInputs([...inputs, ""]);
    };

    const removeInputAtIndex = (indexToRemove) => {
        if (inputs.length > 1) {
            const updated = inputs.filter((_, index) => index !== indexToRemove);
            setInputs(updated);
        }

    }

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [languageToDelete, setLanguageToDelete] = useState(null);
    const [languageId, setLanguageId] = useState(null);

    const deleteLanguage = async (index, language_id) => {
        try {
            setIsLoading(true);
            const response = await delete_language(language_id)

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
            setLanguageToDelete(null);
            handleDeleteLanguage(index)
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

const handleDeleteLanguage = (indexToRemove) => {
        const updatedLanguages = allLanguages.filter((_, index) => index !== indexToRemove);
        setAllLanguages(updatedLanguages);
    };

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }
    return (
        <>
            <div className="p-5 m-5 row">
                <div className="col-3 overflow-y-scroll position-fixed sidebar">
                    <div className="border p-5" onClick={showAllLanguages}>
                        <h3>All Languages</h3>
                    </div>
                    <div className="border p-5" onClick={showAllStudents}>
                        <h3>All Students</h3>
                    </div>
                    <div className="border p-5" onClick={showAllCompanies}>
                        <h3>All Companies</h3>

                    </div>
                    <div className="border p-5" onClick={showAllProfiles}>
                        <h3>All Profiles</h3>
                    </div>
                    <div className="border p-5" onClick={showAllUpdates}>
                        <h3>All Updates</h3>
                        {isAllUpdates && (<div>
                            <div className="ms-5 p-2" onClick={showTechUpdates}>
                                <h4>Tech</h4>
                            </div>
                            <div className="ms-5 p-2" onClick={showEnglishUpdates}>
                                <h4>English</h4>
                            </div>
                            <div className="ms-5 p-2" onClick={showProjectUpdates}>
                                <h4>Projects</h4>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                <div className="col-3"></div>
                <div className="col ms-5">
                    {isAllLanguages && (
                        <>
                            {allLanguages && !isCreateLanguages && (
                                <div>
                                    {allLanguages.map((language, index) => (
                                        <div key={index} className="border p-5 d-flex justify-content-between">
                                            <h3 className="text-white">{language.language}</h3>
                                            <button className="btn btn-danger" onClick={() => { setLanguageToDelete(index); setShowDeletePopup(true); setLanguageId(language.id)}}
                                            >Delete</button>
                                        </div>
                                    ))}
                                    <button className="btn btn-primary m-5" onClick={() => setIsCreateLanguages(true)}>
                                        + Add More Language
                                    </button>
                                </div>
                            )}

                            {isCreateLanguages && (
                                <div className="p-4">
                                    <h4 className="mb-3">Languages</h4>

                                    {inputs.map((value, index) => (
                                        <div key={index} className="d-flex align-items-center mb-2 gap-2">
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                className="form-control"
                                                placeholder={`Language ${index + 1}`}
                                            />
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeInputAtIndex(index)}
                                                disabled={inputs.length === 1}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}

                                    <button className="btn btn-primary m-5" onClick={addInput}>
                                        + Add More Language
                                    </button>
                                    <button className="btn btn-secondary m-5" onClick={() => {setIsCreateLanguages(false); setInputs(['']);}}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-success m-5" onClick={createLanguageList}>
                                        Create Language List
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    {isAllStudents && (

                        <div >
                            {allStudents.students.map((student, index) => (
                                <div key={index} className="border p-5">
                                    <h3>{student.name}</h3>

                                    {selectedCompanyIndex === index && (
                                        <div>
                                            <p><strong>Email:</strong> {student.email}</p>
                                            <p><strong>Phone:</strong> {student.phone_number}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {allStudents.students.length == 0 && (
                                <div>
                                    <h3>No Students</h3>
                                </div>)}
                        </div>
                    )}

                    {isAllCompanies && (
                        <div>
                            <div>
                                {allCompanies.companies.map((company, index) => (
                                    <div key={index} onClick={() => handleCompanyClick(index)}>
                                        <h3>{company.name}</h3>
                                        {selectedCompanyIndex === index && (
                                            <div>
                                                <p><strong>Email:</strong> {company.email}</p>
                                                <p><strong>Phone:</strong> {company.phone_number}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {allCompanies.companies.length == 0 && (
                                    <div>
                                        <h3>No Companies</h3>
                                    </div>)}
                            </div>

                        </div>
                    )}

                    {isAllProfiles && (
                        allProfiles.profiles.map((profile, index) => {

                            return (profile.language || profile.projects || profile.english ? (
                                <div className=" " key={index}>
                                    {/* <h1 className="text-center">Student Profiles</h1> */}
                                    <div>
                                        <h2 className=" border p-5" onClick={() =>
                                            setExpandedIndex(expandedIndex === index ? null : index)
                                        }
                                        >{profile.user.name}&apos;s Profile</h2>
                                    </div>
                                    {expandedIndex === index && (
                                        <div className="ps-5 container">
                                            <section className="">
                                                <h2>Tech</h2>
                                                <div className="p-5 me-0 pe-0">


                                                    <div className="d-flex row  gap-3">
                                                        <h3 className="col-4">Language:</h3>


                                                        <h4 className="col">{profile.language.language}</h4>


                                                    </div>
                                                    <div className="d-flex row ">
                                                        <h3 className="col-4">Approval Status:</h3>
                                                        <h4 className="col">{profile.language.is_approved ? "Approved" :
                                                            profile.language.is_rejected ? "Rejected" : "Pending"}</h4>
                                                        <div className="d-flex justify-content-end gap-5 col">
                                                            {!profile.language.is_approved && (
                                                                <button
                                                                    className="col-6 btn btn-success"

                                                                    onClick={() => { setShowApprovePopup(true); setApproveType('language'); setSelectedUser(profile.user.email); setCurrentApproveData(profile) }}
                                                                >Approve
                                                                </button>
                                                            )}

                                                            {!profile.language.is_rejected && (
                                                                <button className="col-6 btn btn-danger"
                                                                    onClick={() => openRejectBox("language", profile)}

                                                                >Reject
                                                                </button>
                                                            )}
                                                        </div>



                                                    </div>
                                                    {profile.language.is_rejected && (
                                                        <div className="d-flex row">
                                                            <h3 className="col-4">Message:</h3>
                                                            <h4 className="col">{profile.language.message}</h4>
                                                        </div>)}
                                                </div>
                                            </section>

                                            <section className="">
                                                <h2>English</h2>
                                                <div className="p-5 me-0 pe-0">



                                                    <div className="d-flex row mb-3" key={profile.english.id}>
                                                        <h3 className="col-4">Rank:</h3>

                                                        <h4 className="col">{profile.english.rank}</h4>
                                                    </div>

                                                    <div className="d-flex row mb-3">
                                                        <h3 className="col-4">EF SET Certificate:</h3>

                                                        <h4 className="col">
                                                            <a href={profile.english.url} target="_blank" rel="noopener noreferrer">
                                                                {profile.english.url}
                                                            </a>
                                                        </h4>
                                                    </div>




                                                    <div className="d-flex row">
                                                        <h3 className="col-4">Approval Status:</h3>
                                                        <h4 className="col">{profile.english.is_approved ? "Approved" :
                                                            profile.english.is_rejected ? "Rejected" : "Pending"}</h4>
                                                        <div className="d-flex justify-content-end gap-5 col">
                                                            {!profile.english.is_approved && (
                                                                <button
                                                                    className="btn btn-success col-6"
                                                                    onClick={() => { setShowApprovePopup(true); setApproveType('english'); setCurrentApproveData(profile); setSelectedUser(profile.english.id) }}
                                                                >
                                                                    Approve                                                                    </button>
                                                            )}
                                                            {!profile.english.is_rejected && (

                                                                <button className="btn btn-danger col-6"
                                                                    onClick={() => openRejectBox("english", profile)}

                                                                >Reject
                                                                </button>

                                                            )}
                                                        </div>

                                                    </div>
                                                    {profile.english.is_rejected && (
                                                        <div className="d-flex row">
                                                            <h3 className="col-4">Message:</h3>
                                                            <h4 className="col">{profile.english.message}</h4>
                                                        </div>)}
                                                </div>
                                            </section>

                                            {profile.projects.length > 0 ? (
                                                <section className="">
                                                    <h2>Projects</h2>




                                                    {profile.projects.map((project) => (
                                                        <div key={project.id} className="d-flex row p-5 pe-0 border-bottom">

                                                            <>
                                                                <h3 className="text-center">{project.title}</h3>
                                                                <div className="d-flex row">
                                                                    <h4 className="col-4">Description:</h4>
                                                                    <p className="col">{project.description}</p>
                                                                </div>
                                                                <h4 className="col-4">URL:</h4>
                                                                <h5 className="col"><a href={project.url} target="_blank">{project.url}</a></h5>
                                                                <div className="d-flex row me-0 pe-0">
                                                                    <h4 className="col-4">Approval Status:</h4>
                                                                    <h5 className="col">
                                                                        {project.is_approved ? "Approved" :
                                                                            project.is_rejected ? "Rejected" : "Pending"}
                                                                    </h5>
                                                                    <div className="d-flex justify-content-end gap-5 col">
                                                                        {!project.is_approved && (
                                                                            <button
                                                                                className="btn btn-success col-6"
                                                                                onClick={() => { setShowApprovePopup(true); setApproveType('project'); setSelectedUser(project.id) }}
                                                                            >
                                                                                Approve                                                                    </button>
                                                                        )}
                                                                        {!project.is_rejected && (

                                                                            <button className="btn btn-danger col-6"
                                                                                onClick={() => openRejectBox("project", project)}

                                                                            >Reject
                                                                            </button>

                                                                        )}
                                                                    </div>

                                                                </div>
                                                                {project.is_rejected && (
                                                                    <div className="d-flex row">
                                                                        <h4 className="col-4">Message:</h4>
                                                                        <h5 className="col">{project.message}</h5>
                                                                    </div>
                                                                )}
                                                            </>
                                                        </div>
                                                    ))}

                                                </section>

                                            ) : (
                                                <>
                                                    <h2>Projects</h2>

                                                    <h3 className="text-center">No projects available</h3>


                                                </>
                                            )}
                                        </div>
                                    )}

                                </div>) : (<div>
                                    <h3>No Profile Found</h3>
                                </div>))
                        })
                    )}

                    {isAllUpdates && (
                        <div>
                            {isTechUpdates && (
                                <div className="px-5 pe-0">
                                    <h3>Tech</h3>

                                    {allUpdates.languages && allUpdates.languages.length > 0 ? (
                                        <>
                                            {allUpdates.languages.map((language, index) => {
                                                return (
                                                    <div key={index} className="p-5 pe-0">
                                                        <h4>Student Name: {language.user.name}</h4>
                                                        <div className="p-5 pe-0 d-flex justify-content-between align-items-center">
                                                            <h4>Language: {language.language}</h4>

                                                            <div className="d-flex gap-5">
                                                                {!language.language.is_rejected && (
                                                                    <button
                                                                        className="btn btn-success"
                                                                        onClick={() => { setShowApprovePopup(true); setSelectedUser(language.user.email); setCurrentApproveData(language) }}
                                                                    >
                                                                        {language.language.is_approved ? "Approved" : "Approve"}
                                                                    </button>
                                                                )}
                                                                {!language.language.is_approved && (

                                                                    <button className="btn btn-danger"
                                                                        onClick={() => openRejectBox("language", language)}

                                                                    >
                                                                        {language.language.is_rejected ? "Rejected" : "Reject"}

                                                                    </button>

                                                                )}
                                                                {/* <div
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

                                                                        minWidth: '500px'
                                                                    }}
                                                                    className="border border-danger border-5 rounded p-5 bg-black d-flex flex-column gap-4"
                                                                >
                                                                    <h4 className="text-danger ">Reason For Reject</h4>
                                                                    <textarea 
                                                                    className="form-control"
                                                                    placeholder="Enter the reason for rejection"
                                                                    ></textarea>
                                                                    <div className="d-flex justify-content-center gap-5">
                                                                                                                                            <button className="btn btn-secondary" >Cancel</button>

                                                                        <button className="btn btn-danger">
                                                                            Reject
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                </div> */}

                                                                {/* <div className="p-5"> */}

                                                                {/* === TECH === */}
                                                                {/* <h3>Tech Updates</h3>
{allUpdates.languages.map((lang, i) => (
  <div key={i} className="border p-3 my-2">
    <h5>{lang.user.name} - {lang.language}</h5>
    <button
      className="btn btn-danger"
      onClick={() => openRejectBox("language", lang)}
      >
      Reject
    </button>
  </div>
))} */}

                                                                {/* === ENGLISH === */}
                                                                {/* <h3 className="mt-5">English Updates</h3>
{allUpdates.english.map((eng, i) => (
  <div key={i} className="border p-3 my-2">
  <h5>{eng.user.name} - Rank: {eng.rank}</h5>
    <button
      className="btn btn-danger"
      onClick={() => openRejectBox("english", eng)}
    >
    Reject
    </button>
  </div>
))} */}

                                                                {/* === PROJECTS === */}
                                                                {/* <h3 className="mt-5">Project Updates</h3>
{allUpdates.projects.map((project, i) => (
  <div key={i} className="border p-3 my-2">
    <h5>{project.title} by {project.user.name}</h5>
    <button
      className="btn btn-danger"
      onClick={() => openRejectBox("project", project)}
      >
      Reject
    </button>
    </div>
    ))} */}

                                                                {/* === REJECTION MODAL === */}

                                                                {/* </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <h3>No Updates</h3>
                                    )}
                                </div>
                            )}

                            {isEnglishUpdates && (

                                <div className="px-5">
                                    <h3>English</h3>
                                    <div>
                                        {allUpdates.english && allUpdates.english.length > 0 ? (
                                            <>
                                                {allUpdates.english.map((eng) => {
                                                    return (
                                                        <div key={eng.english.id} className="p-5 ">
                                                            <h4>Student Name: {eng.user.name}</h4>
                                                            <div className="p-5 ">
                                                                <div className="d-flex justify-content-between row">
                                                                    <h4 className="col">Rank: {eng.english.rank}</h4>

                                                                    <div className="d-flex gap-5 col-1">
                                                                        {!eng.english.is_rejected && (
                                                                            <button
                                                                                className="btn btn-success"
                                                                                onClick={() => { setShowApprovePopup(true); setApproveType('english'); setCurrentApproveData(eng); setSelectedUser(eng.english.id) }}
                                                                            >
                                                                                Approve                                                                    </button>
                                                                        )}
                                                                        {!eng.english.is_approved && (

                                                                            <button className="btn btn-danger"
                                                                                onClick={() => openRejectBox("english", eng)}

                                                                            >Reject
                                                                            </button>

                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <h4 className="col">EF SET Certificate: <a className="col" href={eng.english.url}>{eng.english.url}</a></h4>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <h3>No Updates</h3>
                                        )}
                                    </div>
                                </div>
                            )}
                            {isProjectUpdates && (
                                <div className="px-5 pe-0">
                                    <h3>Projects</h3>
                                    <div>
                                        {allUpdates.projects && allUpdates.projects.length > 0 ? (
                                            <>
                                                {allUpdates.projects.map((project, index) => {
                                                    return (
                                                        <div key={index} className="p-5 pe-0">
                                                            <h4>Student Name: {project.user.name}</h4>
                                                            {project.projects.map((pro, index1) => {
                                                                return (<>
                                                                    <div key={index} className="p-5 pb-0 pe-0">
                                                                        <h4>Project {index1 + 1}</h4>
                                                                        <div className="px-5 pe-0 row">

                                                                            <h4 className="text-center ">{pro.title}</h4>
                                                                            <div className="row">
                                                                                <h5 className="col-3">Description:</h5>
                                                                                <p className="col">{pro.description}</p>
                                                                            </div>
                                                                            <div className="row">
                                                                                <h5 className="col-3">URL:</h5>
                                                                                <a href={pro.url} className="col">{pro.url}</a>
                                                                                <div className="d-flex gap-5 justify-content-end col">
                                                                                    {!pro.is_rejected && (
                                                                                        <button
                                                                                            className="btn btn-success"
                                                                                            onClick={() => { setShowApprovePopup(true); setApproveType('project'); setSelectedUser(pro.id) }}
                                                                                        >
                                                                                            Approve                                                                    </button>
                                                                                    )}
                                                                                    {!pro.is_approved && (

                                                                                        <button className="btn btn-danger"
                                                                                            onClick={() => openRejectBox("project", pro)}

                                                                                        >Reject
                                                                                        </button>

                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>)
                                                            })}
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <h3>No Updates</h3>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {showRejectBox && (
                        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
                            <RejectReasonBox
                                title={`Reason for Rejecting ${currentRejectData?.section}`}
                                reason={rejectionReason}
                                setReason={setRejectionReason}
                                onCancel={() => setShowRejectBox(false)}
                                onReject={handleReject}
                            />
                        </div>
                    )}
                    {showApprovePopup && (
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
                                className="border border-success border-5 rounded p-5 bg-black d-flex flex-column gap-4"
                            >
                                <h4 className=" ">Are you sure you want to approve?</h4>
                                <div className="d-flex justify-content-center gap-5">
                                    <button onClick={() => {
                                        if (approveType === "language") {
                                            approveLanguage(selectedUser);
                                        } else if (approveType === "english") {
                                            approveEnglish(selectedUser);
                                        } else if (approveType === "project") {
                                            approveProject(selectedUser);
                                        }

                                        setShowApprovePopup(false);
                                    }} className="btn btn-success">
                                        Approve
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => { setShowApprovePopup(false); setSelectedUser(null); setCurrentApproveData(null) }}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDeletePopup && (
                        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
                            <div className="bg-black p-5 rounded border border-danger border-5" style={{ minWidth: '400px' }}>
                                <h4 className="text-danger">Are you sure you want to delete this language?</h4>
                                <div className="d-flex justify-content-evenly gap-3 mt-4">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {setShowDeletePopup(false); setLanguageToDelete(null); setLanguageId(null)}}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            deleteLanguage(languageToDelete, languageId)
                                            
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Academy