
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAllUpdates, setIsAllUpdates] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;  // Get the current path from the URL
        const segments = path.split('/');
        console.log(segments)
        const lastSegment = segments[segments.length-1];
        if (segments.length-1 == 4) {
            setIsAllUpdates(true)
        }
        handleItemClick(lastSegment);
        console.log(activeItem)
        setIsLoading(false)
    }, []);
    const [activeItem, setActiveItem] = useState(``);
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <div className="p-5 row">
                <div className="col-3 overflow-y-scroll position-fixed sidebar">

                    <div className="list-group">
                        <NavLink state={{ data: "academy" }} to="/home/academy" className="text-decoration-none">
                            <div
                                className={`p-4 fs-4 fw-bold list-group-item list-group-item-action ${activeItem === '' ? '' : 'bg-black text-danger'}`}
                                onClick={() => { handleItemClick(''); setIsAllUpdates(false) }}
                            >

                                All Languages
                            </div>
                        </NavLink>


                        <NavLink state={{ data: "academy" }} to="/home/academy/all_students" className="text-decoration-none">
                            <div
                                className={`p-4 fs-4 fw-bold list-group-item list-group-item-action ${activeItem === 'all_students' ? '' : 'bg-black text-danger'}`}
                                onClick={() => { handleItemClick('all_students'); setIsAllUpdates(false) }}
                            >

                                All Students
                            </div>
                        </NavLink>


                        <NavLink state={{ data: "academy" }} to="/home/academy/all_profiles" className="text-decoration-none">
                            <div
                                className={`p-4 fs-4 fw-bold list-group-item list-group-item-action ${activeItem === 'all_profiles' ? '' : 'bg-black text-danger'}`}
                                onClick={() => { handleItemClick('all_profiles'); setIsAllUpdates(false) }}
                            >

                                All Profiles
                            </div>
                        </NavLink>


                        <NavLink state={{ data: "academy" }} to="/home/academy/all_updates" className="text-decoration-none">
                            <div
                                className={`p-4 pe-0 fs-4 fw-bold list-group-item list-group-item-action bg-black text-danger`}
                                onClick={() => { handleItemClick('tech'); setIsAllUpdates(true) }}
                            >

                                All Profile Updates
                            </div>
                        </NavLink>
                        {isAllUpdates && (
                            <>
                                <NavLink state={{ data: "academy" }} to="/home/academy/all_updates" className="text-decoration-none">
                                    <div
                                        className={`p-4 pe-0 fs-4 fw-bold list-group-item list-group-item-action ${activeItem === 'tech' ? '' : 'bg-black text-danger'}`}
                                        onClick={() => handleItemClick('tech')}
                                    >
                                        <h4 className='ps-5 fw-bold'>

                                            Tech
                                        </h4>
                                    </div>

                                </NavLink>
                                <NavLink state={{ data: "academy" }} to="/home/academy/all_updates/english" className="text-decoration-none">
                                    <div
                                        className={`p-4 pe-0 fs-4 fw-bold list-group-item list-group-item-action ${activeItem === 'english' ? '' : 'bg-black text-danger'}`}
                                        onClick={() => handleItemClick('english')}
                                    >
                                        <h4 className='ps-5 fw-bold'>

                                            English
                                        </h4>
                                    </div>

                                </NavLink>
                                <NavLink state={{ data: "academy" }} to="/home/academy/all_updates/project" className="text-decoration-none">
                                    <div
                                        className={`p-4 pe-0 fs-4 fw-bold list-group-item list-group-item-action ${activeItem === 'project' ? '' : 'bg-black text-danger'}`}
                                        onClick={() => handleItemClick('project')}
                                    >
                                        <h4 className='ps-5 fw-bold'>

                                            Project
                                        </h4>
                                    </div>

                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Sidebar;
