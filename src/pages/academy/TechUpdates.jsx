
import { get_all_language_updates } from "../../services/language";
import { useState, useEffect } from "react";
import RejectReasonBox from "../../components/RejectReasonBox";
import { useNavigate, useLocation } from 'react-router-dom';
import { approve_language } from "../../services/approval";
import { reject_language } from "../../services/approval";


function TechUpdates() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    console.log(user)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allLanguageUpdates, setAllLanguageUpdates] = useState(null);
    const [showApprovePopup, setShowApprovePopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const [showRejectBox, setShowRejectBox] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [currentRejectData, setCurrentRejectData] = useState(null); // stores { section, item }

    const openRejectBox = (section, item) => {
        setCurrentRejectData({item });
        setShowRejectBox(true);
        // console.log()
    };

    const getAllLanguageUpdates = async () => {



        try {
            setIsLoading(true);
            const response = await get_all_language_updates()
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
            setAllLanguageUpdates(result);

            setIsLoading(false);
        } catch (error) {
            console.log(error)
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
            getAllLanguageUpdates()
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
            console.log(json)
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
                getAllLanguageUpdates()
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

    useEffect(() => {
        getAllLanguageUpdates()
    }, []);



    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    return (
        <>
                <div className="px-5 pe-0">
                    <h3>Tech</h3>

                    {allLanguageUpdates && allLanguageUpdates.length > 0 ? (
                        <>
                            {allLanguageUpdates.map((language, index) => {
                                return (
                                    <div key={index} className="p-5 pe-0">
                                        <h4>Student Name: {language.user.name}</h4>
                                        <div className="p-5 pe-0 d-flex justify-content-between align-items-center">
                                            <h4>Language: {language.language}</h4>

                                            <div className="d-flex gap-5">
                                                {!language.language.is_rejected && (
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => { setShowApprovePopup(true); setSelectedUser(language.user.email); }}
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

{showRejectBox && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
                    <RejectReasonBox
                        title={`Reason for Rejecting ${currentRejectData?.section}`}
                        reason={rejectionReason}
                        setReason={setRejectionReason}
                        onCancel={() => setShowRejectBox(false)}
                        onReject={() => rejectLanguage(currentRejectData.item.user.email, rejectionReason)}
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
                                    approveLanguage(selectedUser);
                                

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

export default TechUpdates