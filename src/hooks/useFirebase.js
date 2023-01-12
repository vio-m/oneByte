import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';
export const db = getDatabase();


export function Post( postId, userId, title, image, preview, category,
                        ingredients, directions, like, dislike, starcount) {

    const reference = ref(db, "data/post/" + postId);

    set(reference, {
        id: postId,
        author: userId,
        title: title,
        image: image,
        preview: preview,
        category: category,
        ingredients: ingredients,
        directions: directions,
        like: like,
        dislike: dislike,
        starcount: starcount
    });
}


