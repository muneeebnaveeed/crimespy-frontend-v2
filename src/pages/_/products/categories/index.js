import React from "react";
import CategoriesTable from "./CategoriesTable";
import CreateCategory from "./CreateCategory";
import DeleteCategory from "./DeleteCategory";

function Products() {
    return (
        <>
            <CategoriesTable />
            <CreateCategory />
            <DeleteCategory />
        </>
    );
}

export default Products;
