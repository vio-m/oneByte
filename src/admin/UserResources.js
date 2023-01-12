import { List, Datagrid, TextField, EmailField, DateField, EditButton, DeleteButton,
        Create, Edit, SimpleForm, ReferenceInput, TextInput, DateInput} from 'react-admin';



export const UserList = (props) => {
    return <List title='Users List...' {...props}>
                <Datagrid rowClick="edit">
                    <TextField disabled source="id" />
                    <TextField source='username' />
                    <TextField source='level' />
                    <EmailField source='email' />
                </Datagrid>
            </List>
}

export const UserCreate = (props) => {
    return <Create title='Create user...' {...props}>
                <SimpleForm>
                    <TextInput source='level' />
                    <TextInput source='username' />
                    <TextInput source="email" />
                </SimpleForm>
            </Create>
}

export const UserEdit = () => (
    <Edit title='Edit user...'>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source='level' />
            <TextInput source='username' />
            <TextInput source="email" />
        </SimpleForm>
    </Edit>
);






