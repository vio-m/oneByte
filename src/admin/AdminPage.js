import firebaseDataProvider from 'ra-data-firebase-client' // important
import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";
import '../styles/AdminPage.css'
import { Dashboard } from './Dashboard';
import { DataProvider, Admin, Resource, ListGuesser } from 'react-admin'
import { UserList, UserCreate, UserEdit } from './UserResources';
import { PostList, PostCreate, PostEdit } from './PostResources';
import { CommentList, CommentCreate, CommentEdit } from './CommentResources';

const settings = {context: 'data', imagekey: "images", filekey: "files"}

const AdminPage = () => {
    return (
        <div className="admin">
            <Admin basename="/admin"  dataProvider={firebaseDataProvider(firebase, settings)} dashboard={Dashboard}>
                <Resource name="user" list={UserList} create={UserCreate} edit={UserEdit}/>
                <Resource name="post" list={PostList} edit={PostEdit}/>
                <Resource name="comment" list={CommentList} create={CommentCreate} edit={CommentEdit}/>
            </Admin>
        </div>
    )
}
export default AdminPage;
