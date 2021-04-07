import { Box } from "@chakra-ui/layout";
import { useCallback, useMemo } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const SortingIcon = ({ icon, ...props }) => (
    <Box as="span">
        <Box
            {...props}
            as={icon}
            display="inline"
            ml="8px"
            fontSize="md"
            cursor="pointer"
            color="gray.600"
            _hover={{ color: "gray.900" }}
        />
    </Box>
);

function useSorting({ _sort, _order }) {
    const _resetSorting = useCallback(() => {
        _sort.set("created_at");
        _order.set("ASC");
    }, [_order, _sort]);

    const _handleSort = useCallback(
        (field) => {
            if (_sort.value === field) {
                if (_order.value === "DESC") {
                    _resetSorting();
                    return;
                }

                _order.set("DESC");
                return;
            }

            _sort.set(field);
            _order.set("ASC");
        },
        [_order, _resetSorting, _sort]
    );

    const _getSortingIcon = useCallback(
        (field) => {
            if (_sort.value !== field || (_sort.value === "created_at" && _order.value === "ASC"))
                return null;
            return <SortingIcon icon={_order.value === "ASC" ? FiChevronUp : FiChevronDown} />;
        },
        [_sort, _order]
    );

    const sorting = useMemo(
        () => ({
            _handleSort,
            _getSortingIcon,
        }),
        [_getSortingIcon, _handleSort]
    );

    return sorting;
}

export default useSorting;
