
import { useEffect, useState } from "react";
import { get_all_students } from "../../services/user";
import { useNavigate, useLocation } from 'react-router-dom';






function AllStudents() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.data;
    const [allStudents, setAllStudents] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



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

        useEffect(() => {
        getAllStudents()
      }, []);

      if (error) {
        return <div className="d-flex justify-content-center align-items-center  vh-100 ">{error}</div>;
    }

      if (isLoading) {
        return <div>Loading...</div>;  // Show loading message until data is ready
      }
    
    return (
        <>
            {allStudents && allStudents.students.map((student, index) => (
                <div key={index} className="border p-5">
                    <h3>{student.name}</h3>

                    
                </div>
            ))}
            {allStudents.students.length == 0 && (
                <div>
                    <h3>No Students</h3>
                </div>)}
        </>
    )
}

export default AllStudents