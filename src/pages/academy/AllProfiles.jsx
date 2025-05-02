

import { useEffect, useState } from "react";
import RejectReasonBox from "../../components/RejectReasonBox";
import { get_all_profiles } from "../../services/profile";
import { approve_english, approve_language, approve_project, reject_language, reject_english, reject_project } from "../../services/approval";
import { useNavigate, useLocation } from 'react-router-dom';




function AllProfiles() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allProfiles, setAllProfiles] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showApprovePopup, setShowApprovePopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
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
                    if (data.detail == 'Token expired') {

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

    useEffect(() => {
        getAllProfiles()
      }, []);

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
                    if (data.detail == 'Token expired') {

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
                    if (data.detail == 'Token expired') {

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
                    if (data.detail == 'Token expired') {

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
                    if (data.detail == 'Token expired') {

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
                    if (data.detail == 'Token expired') {

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
                    if (data.detail == 'Token expired') {

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




    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    return (
        <>
            {allProfiles && (
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

                                                            onClick={() => { setShowApprovePopup(true); setApproveType('language'); setSelectedUser(profile.user.email); }}
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
                                                            onClick={() => { setShowApprovePopup(true); setApproveType('english');  setSelectedUser(profile.english.id) }}
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
                            <button className="btn btn-secondary" onClick={() => { setShowApprovePopup(false); setSelectedUser(null); }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default AllProfiles