
import { useNavigate, useLocation } from 'react-router-dom';


function Filter(){
    const navigate = useNavigate();

    const handleChange = (e) => {
        const selected = e.target.value;
    
        // Navigate based on selected value
        if (selected === 'rank') {
          navigate('/home/company/filter/rank');
        } else if (selected === 'tech') {
          navigate('/home/company/filter/tech');
        }
      };

    return(
        <>
        <div className="d-flex justify-content-end py-5 gap-5">
                    <h3>Filter by: </h3>
                    <select
                                        className="text-center "
                                        onClick={handleChange}
                                    >
                                        <option selected value={''} disabled>Select a fiter option</option>
                                            <option value={'rank'}>
                                                Rank
                                            </option>
                                            <option value={'tech'}>
                                                Tech
                                            </option>
                                    </select>
                </div>
        </>
    )
}


export default Filter