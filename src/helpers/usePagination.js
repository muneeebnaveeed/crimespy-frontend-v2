import { useCallback, useEffect, useMemo } from "react";

function usePagination({ _count, _page, _pageSize }) {
    const _totalPages = useMemo(() => {
        if (!_count) return 1;
        return Math.ceil(_count / _pageSize.value);
    }, [_count, _pageSize.value]);

    const _isLastPage = useMemo(() => _page.value + 1 >= _totalPages, [_page.value, _totalPages]);

    const _handlePrevPage = useCallback(() => {
        if (_page.value > 0) _page.set((prev) => prev - 1);
    }, [_page]);

    const _handleNextPage = useCallback(() => {
        if (!_isLastPage) _page.set((prev) => prev + 1);
    }, [_page, _isLastPage]);

    const pagination = useMemo(
        () => ({
            _totalPages,
            _isLastPage,
            _handlePrevPage,
            _handleNextPage,
        }),
        [_handleNextPage, _handlePrevPage, _isLastPage, _totalPages]
    );

    useEffect(() => {
        if (_page.value + 1 > _totalPages) _page.set((prev) => prev - 1);
    }, [_page, _totalPages]);

    return pagination;
}

export default usePagination;
