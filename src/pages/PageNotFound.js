import { Link } from "react-router-dom";
import "../styles/PageNotFound.css"

const PageNotFound = () => {
    return (
        <div className="page-not-found">
            <div>
                <h1>4 0 4</h1>
                <p>The requested page cannot be found.</p>
                <Link to="/">Go back to HomePage</Link>
            </div>
        </div>
    );
}

export default PageNotFound;