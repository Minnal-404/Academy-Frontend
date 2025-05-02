
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { get_all_profiles, get_profile } from "../../services/profile";
import { like, unlike } from "../../services/like";
import { rank_filter, language_filter, filter_profiles } from "../../services/filter";
import { get_language_list } from "../../services/language_list";

function Company() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    console.log(user)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allProfiles, setAllProfiles] = useState(null);
    const [isRankFilter, setIsRankFilter] = useState(false);
    const [isTechFilter, setIsTechFilter] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [languageListData, setLanguageListData] = useState(null);
    const [isClear, setIsClear] = useState(false);
    const [rankIndicator, setRankIndicator] = useState('');
    const [techIndicator, setTechIndicator] = useState('');
    const [rankChoosen, setRankChoosen] = useState('');
    const [techChoosen, setTechChoosen] = useState('');
    const [selectedRank, setSelectedRank] = useState('');
    const [selectedTech, setSelectedTech] = useState('');






    const getAllLanguageList = async () => {

        try {
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
            setLanguageListData(result);
        } catch (error) {
            setIsLoading(false);

        }
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
                        // navigate('/login', { state: { data: user } });

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
            setIsLoading(false);

        } catch (error) {
            console.log(error)
            setIsLoading(false);

        }
    }




    const like_user = async (profile, index) => {
        try {
            setIsLoading(true);

            // Call your API to like
            const response = await like(profile.user.email);

            if (!response.ok) {
                const data = await response.json();
                console.log(data);

                if (!data.detail[0].msg) {
                    setError(data.detail);
                    setTimeout(() => setError(null), 3000);
                    throw new Error(data.detail);
                }

                setError(data.detail[0].msg.split(':')[1]);
                setTimeout(() => setError(null), 3000);
                throw new Error(data.detail[0].msg.split(':')[1]);
            }

            const result = await response.json();
            console.log(result);

            // Properly update the state immutably for like
            getAllProfiles()
            console.log(allProfiles.profiles.map(p => p.is_liked));

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getAllProfiles();
        getAllLanguageList();
    }, []);

    const unlike_user = async (profile, index) => {
        try {
            setIsLoading(true);

            // Call your API to unlike
            const response = await unlike(profile.user.email);

            // Check if the response is ok
            if (!response.ok) {
                const data = await response.json();
                console.log(data);

                if (!data.detail[0].msg) {
                    setError(data.detail);
                    setTimeout(() => setError(null), 3000);

                    if (data.detail === 'Token expired') {
                        setTimeout(() => {
                            navigate('/login', { state: { data: user } });
                        }, 3000);
                    }

                    throw new Error(data.detail);
                }

                setError(data.detail[0].msg.split(':')[1]);
                setTimeout(() => setError(null), 3000);
                throw new Error(data.detail[0].msg.split(':')[1]);
            }

            const result = await response.json();
            console.log(result);

            // ✅ Properly update the state immutably
            getAllProfiles()
            console.log(allProfiles.profiles.map(p => p.is_liked));

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const rankFilter = async (rank) => {
        setRankChoosen(rank)

        try {
            setIsLoading(true);
            const response = await rank_filter(rank)

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
            if (techChoosen) {
                setAllProfiles(prev => {
                    const combined = [...prev.profiles, ...result.profiles]; // O(n + m)
                    const uniqueByEmail = new Map(); // O(1) insertions

                    combined.forEach(profile => {
                        uniqueByEmail.set(profile.user.email, profile); // O(1) per operation
                    });

                    return {
                        profiles: Array.from(uniqueByEmail.values()) // O(n)
                    };
                });
            } else {
                setAllProfiles(result)
            }
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const languageFilter = async (rank) => {
        setTechChoosen(rank)

        try {
            setIsLoading(true);
            const response = await language_filter(rank)

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
            if (rankChoosen) {
                setAllProfiles(prev => {
                    const combined = [...prev.profiles, ...result.profiles]; // O(n + m)
                    const uniqueByEmail = new Map(); // O(1) insertions

                    combined.forEach(profile => {
                        uniqueByEmail.set(profile.user.email, profile); // O(1) per operation
                    });

                    return {
                        profiles: Array.from(uniqueByEmail.values()) // O(n)
                    };
                });
            } else {
                setAllProfiles(result)
            }
            setIsLoading(false);

        } catch (error) {
            console.log(error)

            setTimeout(() => {
                setError('');
            }, 3000);
            setIsLoading(false);

        }
    }

    const handleFilterChange = (field) => {
        if (field === 'rank') {
            setIsRankFilter(!isRankFilter);
            setIsClear(true);
            if (!isRankFilter){
                setRankIndicator('bg-success px-3 py-1 rounded');
            }else{
                setRankIndicator('');
            }
        } else if (field === 'tech') {
            setIsTechFilter(!isTechFilter);
            setIsClear(true);
            if (!isTechFilter){
                setTechIndicator('bg-success px-3 py-1 rounded');
            }else{
                setTechIndicator('');
            }
            setTechChoosen(field);
        }
    };

    const handleClear = () => {
        getAllProfiles()
        setRankIndicator('')
        setTechIndicator('')
        setRankChoosen('')
        setTechChoosen('')
        setIsTechFilter(false)
        setIsRankFilter(false)
        setIsClear(false);
    }

    const fetchFilteredProfiles = async () => {
        const params = new URLSearchParams();
        if (selectedRank) params.append("rank", selectedRank);
        if (selectedTech) params.append("tech", selectedTech);

        try {
            const response = await fetch(filter_profiles(`rank=${selectedRank}&tech=${selectedTech}`));
            
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
            console.log("About to parse response");
            console.log(result)
            setAllProfiles(result);
        } catch (error) {
            setIsLoading(false);

        }
    };




    if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">Loading...</div>;
    }

    const ranks = ["A1", "A2", "B1", "B2", "C1", "C2"]


    return (
        <>
            <div className="bg-black p-5 " >
                <div className="d-flex justify-content-end py-5 gap-5">
                    <h3>Filter by: </h3>
                    {/* <select
                        className="text-center "
                        onChange={handleFilterChange}
                        value={choosen}
                    >
                        <option value={''} disabled>Select a filter option</option>
                        <option value={'rank'}>
                            Rank
                        </option>
                        <option value={'tech'}>
                            Tech
                        </option>
                    </select> */}
                    <div
                        onClick={() => handleFilterChange('rank')}
                    >
                        <h3 className={`${rankIndicator}`}>Rank</h3>
                    </div>
                    <div
                        onClick={() => handleFilterChange('tech')}
                    >
                        <h3 className={`${techIndicator}`}>Tech</h3>

                    </div>
                    {isClear && (
                        <button className="btn btn-danger" onClick={handleClear}>Clear All</button>
                    )}
                </div>
                {isRankFilter && (

                    <div className="d-flex row gap-5 p-4">
                        <h3 className="col-1">Rank: </h3>
                        <select
                            className="text-center col-2"
                            value={selectedRank}
                            onChange={(e) => {setSelectedRank(e.target.value);
                                fetchFilteredProfiles()
                            }}
                        >
                            <option selected value={''} disabled>Select a rank</option>
                            {ranks.map((rank) => (
                                <option key={rank} value={rank}>
                                    {rank}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-danger col-1">Remove</button>
                    </div>
                )}
                {isTechFilter && (

                    <div className="d-flex row gap-5 p-4">
                        <h3 className="col-1">Tech: </h3>
                        <select
                            onChange={(e) => {setSelectedTech(e.target.value); fetchFilteredProfiles()}}
                            className="text-center col-2"
                            value={selectedTech}
                        >
                            <option selected value='' disabled>Select a language</option>
                            {languageListData.language_list.map((lang) => (
                                <option key={lang.id} value={lang.language}>
                                    {lang.language}
                                </option>
                            ))}
                        </select>
                        <button className="btn btn-danger col-1">Remove</button>
                    </div>
                )}
                {allProfiles.profiles.length > 0 ? (
                    <>
                        <h2 className="text-center p-5">All Profiles</h2>
                        {allProfiles.profiles.map((profile, index) => {

                            return (profile.language || profile.projects || profile.english ? (
                                <div key={index} className="p-3">
                                    {/* <h1 className="text-center">Student Profiles</h1> */}
                                    <div className="border d-flex  align-items-center" >
                                        <h2 className="p-5 flex-fill"

                                        >{profile.user.name}&apos;s Profile</h2>
                                        <div className="me-5 d-flex gap-5">

                                            <button
                                                className={`btn btn-primary`}

                                                onClick={() => { setExpandedIndex(expandedIndex === index ? null : index) }
                                                }                                    >{expandedIndex === index ? 'Hide' : 'Show'} Profile
                                            </button>

                                            <button
                                                className={`btn ${profile.is_liked ? 'btn-danger' : 'btn-success'}`}

                                                onClick={() => { profile.is_liked ? unlike_user(profile, index) : like_user(profile, index) }}
                                            >{profile.is_liked ? 'Unlike' : 'Like'}
                                            </button>


                                        </div>
                                    </div>
                                    {expandedIndex === index && (
                                        <div className="p-5 container">
                                            <section className="">
                                                <h2>Tech</h2>
                                                <div className="p-5 me-0 pe-0">


                                                    <div className="d-flex row  gap-3">
                                                        <h3 className="col-4">Language:</h3>


                                                        <h4 className="col">{profile.language.language}</h4>


                                                    </div>


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

                                </div>)
                                : (<div>
                                    <h3>No Profile Found</h3>
                                </div>))
                        })}
                    </>
                )
                    : (<div>
                        <h3 className="text-center p-5">No Profile Found</h3>
                    </div>)}

            </div>
        </>
    )
}

export default Company