import { useCallback, useMemo, useState } from "react";

function useDisclosure(initialValue = false) {
    const [isOpen, setIsOpen] = useState(initialValue);

    const toggle = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
    const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
    const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

    const disclosure = useMemo(() => {
        return {
            isOpen,
            toggle,
            onOpen,
            onClose,
        };
    }, [isOpen, toggle, onOpen, onClose]);

    return disclosure;
}

export default useDisclosure;
