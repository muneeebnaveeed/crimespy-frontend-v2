import { db } from "helpers/auth";
import api, { useModifiedQuery } from "helpers/query";
import qs from "querystring";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const fetchProducts = ({ sort, order, page, pageSize }) => {
    const query = qs.stringify({
        _sort: `${sort}:${order}`,
        _limit: pageSize,
        _start: page * pageSize,
    });

    // const postRef = db.collection("posts").doc(currentUser.uid).collection("userPosts");

    // return api.get(`/products?${query}`).then((res) => res.data);
};

function useProductsQuery() {
    const { page, pageSize, sort, order } = useSelector((state) => state.Products);

    const queryFn = useCallback(() => fetchProducts({ sort, order, page, pageSize }), [sort, order, page, pageSize]);

    const query = useModifiedQuery("products", queryFn, {
        keepPreviousData: true,
    });

    return query;
}

export default useProductsQuery;
