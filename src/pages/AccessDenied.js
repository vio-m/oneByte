import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/PageNotFound.css"



const AccessDenied = () => {

    const navigate = useNavigate();
    const goBack = ()=> {
        navigate(-1)
    }


    return (
        <div className="page-not-found">
            <div>
                <h1>4 0 3</h1>
                <p>FORBIDDEN</p>
                <Link to="/">Go to HomePage</Link>
                <button onClick={goBack}> Back </button>
            </div>
        </div>
    );
}

export default AccessDenied;