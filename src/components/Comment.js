import '../styles/Comment.css'
import { useState, useEffect } from 'react';
import { getDatabase, ref, child, push, update, remove, onValue} from "firebase/database";
import { useAuth } from '../contexts/AuthContext'
import Moment from 'react-moment';

function Comment({id, toggle, setToggle, callback}) {
    const db = getDatabase();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState();
    const [callbackId, setCallbackId] = useState({});
    const [inputText, setInputText] = useState('');
    const [comid, setComid] = useState(0)
    const [uid, setUid] = useState("")
    Moment.globalFormat = 'D MMM YYYY';
    const now = Math.floor(Date.now() / 1000)

    function triggerToggle() {
        setToggle( !toggle )
    }

    function handleCallback(props) {
        callback(props)
    }

    useEffect(() => {
        if (currentUser !== null) {
            setUid(currentUser.uid)
        }
        const commentRef = ref(db, '/data/comment/');
        onValue(commentRef, (snapshot) => {
            const comments = Object.entries(snapshot.val()).filter(([key, value]) => value.post === id)
            handleCallback(comments.map(([key, value]) => value.id))
            setComments(comments);
        });
    }, []);

    function addComment(e) {
        e.preventDefault()
        const newCommentKey = push(child(ref(db), '/data/comment/')).key;
        const commentData = { id: newCommentKey, post: id, comment: inputText, author: currentUser.uid, username: currentUser.displayName, time: now }
        const updates = {};
        updates['/data/comment/' + newCommentKey] = commentData;
        setInputText('')
        triggerToggle();
        return update(ref(db), updates);
    }

    function editComment(e, commentID) {
        e.preventDefault()
        const updates = {};
        updates['/data/comment/' + commentID + '/comment'] = inputText;
        setInputText('');
        setComid(0);
        return update(ref(db), updates)
    }

    function deleteComment(key, commentID) {
        return remove(ref(db, '/data/comment/' + commentID))
    }

    return (
        <div className="comments">
            { toggle ?
            (<div className='add-comment-form'>
                <form>
                    <textarea required type="text" placeholder="Add comment" autoComplete="off"
                        value={inputText} onChange={e => setInputText(e.target.value)} />
                    <div className='add-comment-button'>
                        <button type="submit" onClick={(e)=> {addComment(e)}}> Submit </button>
                    </div>
                </form>
            </div>) : (<div></div>)}
            <div className='comments-list-container'>

                {comments && Object.entries(comments).map(([key, value]) => {
                    return (
                    <div className='comments-box' key={key}>
                        {comid===key ? (
                        <>
                            <div className='add-comment-form'>
                                <form>
                                    <textarea required type="text" placeholder={"Edit comment..."} autoComplete="off"
                                        defaultValue={value[1].comment} onChange={e => setInputText(e.target.value)} />
                                </form>
                            </div>
                            <div className="comments-buttons-bar">
                                <button className='comments-edit-button' onClick={()=> {setComid(0)}}> Cancel </button>
                                <button className='comments-delete-button' onClick={(e)=> {editComment(e, value[0])}}> Submit </button>
                            </div>
                        </>

                        ) : (

                            uid===value[1].author ? (
                                <>
                                    <div className="comments-user-and-time">{value[1].username} on <Moment unix>{value[1].time}</Moment></div>
                                    <div className='comments-text'> {value[1].comment} </div>
                                    <div className="comments-buttons-bar">
                                        <button className='comments-delete-button' onClick={()=> {deleteComment(key, value[0])}}> Delete </button>
                                        <button className='comments-edit-button' onClick={()=> {setComid(key)}}> Edit </button>
                                    </div>
                                </>
                            ):(
                                <>
                                    <div className="comments-user-and-time">{value[1].username} on <Moment unix>{value[1].time}</Moment></div>
                                    <div className='comments-text'> {value[1].comment} </div>
                                </>
                            )
                        )}

                    </div>
                    )
                })}

            </div>
        </div>
    );
}

export default Comment;

