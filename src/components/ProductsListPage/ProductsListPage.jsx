import { useParams } from "react-router-dom";
import ProducstList from "../ProductsList/ProductsList";

function ProductsListPage(){

    const {type}=useParams()

    return <ProducstList type={type}/>

}

export default ProductsListPage
