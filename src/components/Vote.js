import { useState, useEffect } from 'react';
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';


function Vote({currentUser, uid, id}) {
    const db = getDatabase();
    const pid = Number(Object.values(id).join(''))
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [likeActive, setLikeActive] = useState(false)
    const [dislikeActive, setDislikeActive] = useState(false)


    useEffect(() => {
        function getLikes(props) {
            const likeRef = ref(db, '/data/post/' + pid + '/like');
            return onValue(likeRef, (snapshot) => {
                setLike(snapshot.val());
            });
        }
        getLikes(pid);
        function getDislikes(props) {
            const dislikeRef = ref(db, '/data/post/' + pid + '/dislike');
            return onValue(dislikeRef, (snapshot) => {
                setDislike(snapshot.val())
            });
        }
        getDislikes(pid);
    }, []);

    function likeFunc() {
        if (likeActive) {
            setLikeActive(false);
            setLike(like-1);
            upVote(like-1);
        } else {
            setLikeActive(true);
            setLike(like+1);
            upVote(like+1)
            if(dislikeActive) {
                setDislikeActive(false);
                setLike(like+1);
                upVote(like+1)
                setDislike(dislike-1);
                downVote(dislike-1);
            }
        }
    }
    function dislikeFunc() {
        if (dislikeActive) {
            setDislikeActive(false);
            setDislike(dislike-1);
            downVote(dislike-1);
        } else {
            setDislikeActive(true);
            setDislike(dislike+1);
            downVote(dislike+1);
            if(likeActive) {
                setLikeActive(false);
                setDislike(dislike+1);
                downVote(dislike+1);
                setLike(like-1);
                upVote(like-1);
            }
        }
    }

    const upVote = (param)=> {
        const upvoteRef = ref(db, '/data/post/' + pid + '/like')
        set(upvoteRef, param)
    }
    const downVote = (param)=> {
        const downvoteRef = ref(db, '/data/post/' + pid + '/dislike')
        set(downvoteRef, param)
    }

    return (
        <>
            {currentUser ? (
                <>
                    <button onClick={likeFunc} id={likeActive ? 'active' : null}>Like { like }</button>
                    <button onClick={dislikeFunc} id={dislikeActive ? 'active' : null}>Dislike { dislike } </button>
                </>
            ) : (
                <>
                    <button disabled >Likes { like }</button>
                    <button disabled >Dislikes { dislike } </button>
                </>
            )}
        </>
    );
}

export default Vote;

