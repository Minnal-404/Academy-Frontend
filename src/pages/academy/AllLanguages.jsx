

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { create_language_list, delete_language, get_language_list } from "../../services/language_list";












function AllLanguages() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    const [allLanguages, setAllLanguages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateLanguages, setIsCreateLanguages] = useState(false)
    const [inputs, setInputs] = useState([""]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [languageToDelete, setLanguageToDelete] = useState(null);
    const [languageId, setLanguageId] = useState(null);

    useEffect(() => {
        getAllLanguages()
      }, []);

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
            setAllLanguages(result.language_list);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }

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

    // const [inputs, setInputs] = useState([""]);
    // const [isCreateLanguages, setIsCreateLanguages] = useState(false);

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

    const handleDeleteLanguage = (indexToRemove) => {
        const updatedLanguages = allLanguages.filter((_, index) => index !== indexToRemove);
        setAllLanguages(updatedLanguages);
    };

    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    return (
        <>
            {allLanguages && !isCreateLanguages && (
                <div>
                    {allLanguages.map((language, index) => (
                        <div key={index} className="border p-5 d-flex justify-content-between">
                            <h3 className="text-white">{language.language}</h3>
                            <button className="btn btn-danger" onClick={() => { setLanguageToDelete(index); setShowDeletePopup(true); setLanguageId(language.id) }}
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
                    <button className="btn btn-secondary m-5" onClick={() => { setIsCreateLanguages(false); setInputs(['']); }}>
                        Cancel
                    </button>
                    <button className="btn btn-success m-5" onClick={createLanguageList}>
                        Create Language List
                    </button>
                </div>
            )}
            {showDeletePopup && (
                <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
                    <div className="bg-black p-5 rounded border border-danger border-5" style={{ minWidth: '400px' }}>
                        <h4 className="text-danger">Are you sure you want to delete this language?</h4>
                        <div className="d-flex justify-content-evenly gap-3 mt-4">
                            <button
                                className="btn btn-secondary"
                                onClick={() => { setShowDeletePopup(false); setLanguageToDelete(null); setLanguageId(null) }}
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
        </>

    )
}

export default AllLanguages