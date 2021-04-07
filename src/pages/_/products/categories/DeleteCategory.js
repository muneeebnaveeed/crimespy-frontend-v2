import Button from "components/Common/Button";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toggleDeleteCategoryDisclosure } from "store/routes/categories/actions";

function DeleteCategory() {
    const { deleteDisclosure, deleteCategoryId } = useSelector((state) => ({
        ...state.Categories,
    }));
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isDeletingCategory, setIsDeletingCategory] = useState(false);

    const focusRef = useRef();

    const toggleDisclosure = useCallback(() => {
        if (!isDeletingCategory) dispatch(toggleDeleteCategoryDisclosure());
    }, [dispatch, isDeletingCategory]);

    const handleDeleteCategory = useCallback(async () => {
        setIsDeletingCategory(true);
        try {
            await api.delete("/categories/" + deleteCategoryId);
            await queryClient.invalidateQueries("categories");
            showSuccessToast({ message: "Category has been deleted" });
        } catch (err) {
            const message = generateErrorMessage(err);
            showErrorToast({ message: "Cannot delete category: " + message });
        }
        setIsDeletingCategory(false);
        toggleDisclosure();
    }, [deleteCategoryId, queryClient, toggleDisclosure]);

    const handleOpen = useCallback(() => {
        if (focusRef.current.focus) focusRef.current.focus();
    }, []);

    return (
        <Modal isOpen={deleteDisclosure} toggle={toggleDisclosure} onOpened={handleOpen} centered>
            <ModalHeader toggle={toggleDisclosure}>Delete Category</ModalHeader>
            <ModalBody>
                <p className="mb-0">Are you sure you want to delete this category?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="light" size="sm" onClick={toggleDisclosure}>
                    Cancel
                </Button>
                <Button
                    w="55.5px"
                    loading={isDeletingCategory}
                    color="primary"
                    size="sm"
                    onClick={handleDeleteCategory}
                    ref={focusRef}
                >
                    Delete
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteCategory;
