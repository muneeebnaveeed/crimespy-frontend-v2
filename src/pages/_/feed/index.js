import React from "react";
import ProductsTable from "./ProductsTable";
import DeleteProduct from "./DeleteProduct";
import CreateProduct from "./CreateProduct";

function Products() {
    return (
        <>
            <ProductsTable />
            <CreateProduct />
            <DeleteProduct />
        </>
    );
}

export default Products;
