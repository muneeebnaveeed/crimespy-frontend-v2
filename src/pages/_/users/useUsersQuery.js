import { api, useModifiedQuery } from 'helpers/query';
import qs from 'querystring';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const fetchUsers = ({ sort, order, page, pageSize }) => {
    const query = qs.stringify({
        _sort: `${sort}:${order}`,
        _limit: pageSize,
        _start: page * pageSize,
    });
    return api.get(`/users?${query}`).then((res) => res.data);
};

function useUsersQuery() {
    const { page, pageSize, sort, order } = useSelector((state) => state.Products);

    const queryFn = useCallback(() => fetchUsers({ sort, order, page, pageSize }), [sort, order, page, pageSize]);

    const query = useModifiedQuery('users', queryFn, {
        keepPreviousData: true,
    });

    return query;
}

export default useUsersQuery;
