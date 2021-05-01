import React, { useCallback, useMemo } from "react";
import { getLoggedInUser } from "./auth";

function usePermissions(route) {
    const loggedInUser = useMemo(() => getLoggedInUser(), []);

    const findInRoute = useCallback(
        (permission) => {
            if (!permission) return null;
            return loggedInUser.permissions?.[route]?.includes?.(permission);
        },
        [loggedInUser]
    );

    return findInRoute;
}

export default usePermissions;
