import "../styles/Create.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from '../hooks/useFirebase'
import { useAuth } from '../contexts/AuthContext'

const Create = () => {
    const { currentUser } = useAuth();
    const postId = Date.now()
    const [title, setTitle] = useState('');
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient: ''}]);
    const [directions, setDirections] = useState('');
    const [category, setCategory] = useState('');
    const like = 0;
    const dislike = 0;
    const starcount = 0;
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();


    const addFields = (e) => {
        e.preventDefault();
        let newField = { ingredient: ""}
        setIngredients([...ingredients, newField])
    }

    const removeFields = (e, index) => {
        e.preventDefault();
        if (index > 0) {
            let data = [...ingredients];
            data.splice(index, 1)
            setIngredients(data)
        }
    }

    const handleFormChange = (index, event) => {
        let data = [...ingredients];
        data[index][event.target.name] = event.target.value;
        setIngredients(data);
    }

    function validateForm() {
        var title = document.forms["myForm"]["title"].value;
        if (title === "") {
            alert("Your recipe should have a title");
            return false;
        } else {
            return true
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()===true) {
            setIsPending(true);
            Post(postId, currentUser.uid, title, image, preview, category, ingredients, directions, like, dislike, starcount)
            setIsPending(false);
            navigate("/")
        } else {
            navigate("/Create");
        }
    }

    return (
        sessionStorage.level==='admin' || sessionStorage.level==='editor' ? (
            <div className="create-page">
                <div className="create-container">
                    <div className="create-title">Add a New Recipe</div>
                    <form name='myForm' onSubmit={handleSubmit}>

                            <input
                                required
                                name='title'
                                placeholder='Title:'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                required
                                placeholder='Add image URL:'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />

                            <textarea
                                required
                                placeholder='Add preview:'
                                value={preview}
                                onChange={(e) => setPreview(e.target.value)}
                            ></textarea>

                            {ingredients.map((input, index) => {
                                return (
                                    <div key={index}>
                                        <div className="add-ingredients">
                                            <input
                                                name='ingredient'
                                                placeholder='Add ingredient:'
                                                value={input.ingredient}
                                                onChange={event => handleFormChange(index, event)}
                                            />
                                            <button className="add-btn" type="button" onClick={addFields}>Add</button>
                                            {index===0 ? <button disabled>Remove</button> :
                                            <button className="remove-btn" onClick={(e) => removeFields(e, index)}>Remove</button>}
                                        </div>
                                    </div>
                                    )
                                })}

                            <textarea
                                required
                                placeholder='Directions:'
                                value={directions}
                                onChange={(e) => setDirections(e.target.value)}
                            ></textarea>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option> Select category </option>
                                <option value="burgers">burgers</option>
                                <option value="pasta">pasta</option>
                                <option value="pastry">pastry</option>
                                <option value="pizza">pizza</option>
                                <option value="salads">salads</option>
                                <option value="sauces">sauces</option>
                            </select>
                        {!isPending && <button type="submit" className="add-btn" onClick={handleSubmit}>Add Recipe</button>}
                        {isPending && <button disabled>Adding ...</button>}
                    </form>
                </div>
            </div>
        ) : (
            <div className="create-page">
                <div className="create-container">
                    <div className="create-message"> You do not have Editor privileges. </div>
                </div>
            </div>
        )
    );
}

export default Create;

/*

*/