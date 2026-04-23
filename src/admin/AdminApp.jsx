import {
  Admin,
  Resource,
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  EditButton,
} from "react-admin";

import dataProvider from "./dataProvider";
import authProvider from "./authProvider";

const ProductList = () => (
  <List resource="products">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="product_type" />
      <TextField source="price" />
      <EditButton />
    </Datagrid>
  </List>
);

const ProductEdit = () => (
  <Edit resource="products">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="brand" />
      <TextInput source="product_type" />
      <NumberInput source="price" />
      <TextInput source="image_link" fullWidth />
    </SimpleForm>
  </Edit>
);

export default function AdminApp() {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource name="products" list={ProductList} edit={ProductEdit} />
    </Admin>
  );
}