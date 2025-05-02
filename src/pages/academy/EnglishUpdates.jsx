
import { approve_english, reject_english } from "../../services/approval";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { get_all_english_updates } from "../../services/english";
import RejectReasonBox from "../../components/RejectReasonBox";



function EnglishUpdates() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    console.log(user)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allEnglishUpdates, setAllEnglishUpdates] = useState(null);
    const [showApprovePopup, setShowApprovePopup] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const [showRejectBox, setShowRejectBox] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [currentRejectData, setCurrentRejectData] = useState(null); // stores { section, item }

    const openRejectBox = (section, item) => {
        setCurrentRejectData({item });
        setShowRejectBox(true);
    };

    const getAllEnglishUpdates = async () => {
    
    
    
            try {
                setIsLoading(true);
                const response = await get_all_english_updates()
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
                setAllEnglishUpdates(result);
    
                setIsLoading(false);
            } catch (error) {
                console.log(error)
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
            getAllEnglishUpdates()
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
            getAllEnglishUpdates()
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
        getAllEnglishUpdates()
    }, []);

    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    return (
        <>
            <div className="px-5">
                <h3>English</h3>
                <div>
                    {allEnglishUpdates && allEnglishUpdates.length > 0 ? (
                        <>
                            {allEnglishUpdates.map((eng) => {
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
                                                            onClick={() => { setShowApprovePopup(true); setSelectedUser(eng.english.id) }}
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
            {showRejectBox && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
                    <RejectReasonBox
                        title={`Reason for Rejecting ${currentRejectData?.section}`}
                        reason={rejectionReason}
                        setReason={setRejectionReason}
                        onCancel={() => setShowRejectBox(false)}
                        onReject={() => rejectEnglish(currentRejectData.item.user.email, rejectionReason)}
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
                                    approveEnglish(selectedUser);
                                

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

export default EnglishUpdates