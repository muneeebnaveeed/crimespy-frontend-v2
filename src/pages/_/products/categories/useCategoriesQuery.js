import api, { useModifiedQuery } from "helpers/query";
import qs from "querystring";
import { useCallback } from "react";
import { useSelector } from "react-redux";

function useCategoriesQuery() {
  const { page, pageSize, sort, order } = useSelector(
    (state) => state.Categories
  );

  const queryFn = useCallback(() => {
    const query = qs.stringify({
      _sort: `${sort}:${order}`,
      _limit: pageSize,
      _start: page * pageSize,
    });
    return api.get(`/categories?${query}`).then((res) => res.data);
  }, [order, page, pageSize, sort]);

  const query = useModifiedQuery(
    ["categories", page, pageSize, sort, order],
    queryFn,
    {
      keepPreviousData: true,
    }
  );

  return query;
}

export default useCategoriesQuery;
