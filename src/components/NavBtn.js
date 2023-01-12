import {useState} from"react"
import "../styles/NavBtn.css"

const NavBtn = ({children}) => {
    const [btnState, setBtnState] = useState(false);

    function handleClick() {
        setBtnState(btnState => !btnState);
    }

    let toggleClassCheck = btnState ? "active" : null;

    return(
        <li className={toggleClassCheck}>
            <button onClick={handleClick}>
                {children}
            </button>
        </li>
    )
    }

export default NavBtn;