import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton,
        Create, Edit, SimpleForm, ReferenceInput, TextInput, DateInput} from 'react-admin';

export const CommentList = (props) => {
    return <List title='Reviews list...' {...props}>
                <Datagrid rowClick="edit">
                    <TextField source='author' />
                    <TextField source='comment' />
                    <TextField source='time' />
                    <TextField source='username' />
                </Datagrid>
            </List>
}

export const CommentCreate = (props) => {
    return <Create title='Create...' {...props}>
                <SimpleForm>
                    <ReferenceInput disabled source="id" reference="admin" />
                    <TextInput source='time' />
                    <TextInput source='author' />
                    <TextInput source='username' />
                    <TextInput source='comment' />
                </SimpleForm>
            </Create>
}

export const CommentEdit = () => {
    return <Edit title='Edit review...'>
                <SimpleForm>
                    <TextInput disabled source='time' />
                    <TextInput source='author' />
                    <TextInput source='username' />
                    <TextInput source='comment' />
                </SimpleForm>
            </Edit>
}












