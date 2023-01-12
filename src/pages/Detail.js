import "../styles/Detail.css"
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Vote from '../components/Vote'
import Comment from '../components/Comment'
import { useAuth } from '../contexts/AuthContext'
import { getDatabase, ref, get, child, remove } from 'firebase/database';


const Detail = () => {
    const { uid, id } = useParams();
    const { currentUser } = useAuth();
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [ingredients, setIngredients] = useState()
    const isPending = false
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate();
    const dbRef = ref(getDatabase());
    const [commIdToDelete, setCommIdToDelete] = useState();

    const callback = payload => {
        setCommIdToDelete(payload)
    }

    const triggerToggle = () => {
        setToggle( !toggle )
    }

    function handleDelete(id) {
        const db = getDatabase();
        //removes the post
        remove(ref(db, 'data/post/' + id))
        //removes the comments for the post
        for (let i = 0; i < commIdToDelete.length; i++){
            remove(ref(db, 'data/comment/' + commIdToDelete[i]))
        }
        navigate('/')
        return
    }

    useEffect(() => {
        get(child(dbRef, `/data/post/${ id }`)).then((snapshot) => {
            if (snapshot.exists()) {
                setData(snapshot.val())
                const ingr = Object.entries(snapshot.val()).filter(([key, value]) => key === "ingredients")[0][1].map((i)=>{return i.ingredient})
                setIngredients(ingr)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
            return setError(error)
        });
    }, []);


    return (
        <div className="detail">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && (
                <article>
                    <div className="detail-title">{ data.title }</div>
                    <div className="detail-review-bar"> ***** { data.starcount } | 17 REVIEWS </div>
                    <div className="detail-description">{ data.preview }</div>
                    <img src={ data.image }></img>
                    <div className="detail-subtitle">Ingredients</div>
                    <ul className="detail-description">{ ingredients && ingredients.map((i)=> {
                        return (
                            <li key={i} > {i} </li>
                            )
                        })
                    }</ul>
                    <div className="detail-subtitle">Directions</div>
                    <div className="detail-directions">{ data.directions }</div>
                    <div className="detail-cat"> ~ { data.category } ~ </div>
                    <div className='button-container'>
                        <Vote currentUser={currentUser} uid={ uid } id={ id }></Vote>
                        {currentUser && currentUser.uid===data.author ? (<button onClick={()=> handleDelete(id)}>Delete</button>) : (<button disabled>Delete</button>)}
                        {sessionStorage.level==='admin' || sessionStorage.level==='editor' || sessionStorage.level==='user' ? <button onClick={triggerToggle}>Review</button> : <button disabled>Review</button>}
                    </div>
                        <Comment callback={callback} uid={ uid }  id={ id } toggle={ toggle } setToggle={ setToggle } ></Comment>
                </article>
            )}
        </div>
    )
}

export default Detail;
