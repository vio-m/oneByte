import { List, Datagrid, TextField, EmailField,
        DateField, EditButton, DeleteButton,
        Create, Edit,
        SimpleForm, ReferenceInput,
        TextInput, DateInput} from 'react-admin';


export const PostList = (props) => {
    return <List title='Recipe List...' {...props}>
                <Datagrid rowClick="edit">
                    <TextField source='author' />
                    <TextField source='title' />
                    <TextField source='category' />
                    <TextField source='like' />
                    <TextField source='dislike' />
                    <TextField source='starcount' />
                </Datagrid>
            </List>
}


export const PostEdit = () => (
    <Edit title='Edit Post'>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source='author' />
            <TextInput source='title' />
            <TextInput source='category' />
            <TextInput source='image' />
            <TextInput multiline source='directions' />
            <TextInput multiline source='preview' />
            <TextInput source='like' />
            <TextInput source='dislike' />
            <TextInput source='starcount' />
        </SimpleForm>
    </Edit>
);







