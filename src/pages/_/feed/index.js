import React from "react";
import ProductsTable from "./ProductsTable";
import DeleteProduct from "./DeleteProduct";
import CreateProduct from "./CreateProduct";
import "./style.css";

function Products() {
    return (
        <>
            <div className="feed">
                <ProductsTable
                    username="wasef"
                    comments="This is comment"
                    profileUrl="https://graph.facebook.com/3839782289438433/picture"
                    description="Hello there THis is first Post"
                    photoURL="https://firebasestorage.googleapis.com/v0/b/crimespy-6fc6f.appspot.com/o/images%2Fundefinedvb3tOs7tZZ.jpg?alt=media&token=cc8e3bb4-3f7e-4e50-94ab-ea1ecb84b067"
                />
                <CreateProduct />
                <DeleteProduct />
            </div>
        </>
    );
}

export default Products;
