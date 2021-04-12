import Button from "components/Common/Button";
import api, { generateErrorMessage } from "helpers/query";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import React, { useCallback, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toggleDeleteProductDisclosure } from "store/routes/products/actions";

function DeleteProduct() {
  const { deleteDisclosure, deleteProductId } = useSelector(
    (state) => state.Products
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  const focusRef = useRef();

  const toggleDisclosure = useCallback(() => {
    if (!isDeletingProduct) dispatch(toggleDeleteProductDisclosure());
  }, [dispatch, isDeletingProduct]);

  const handleDeleteProduct = useCallback(async () => {
    setIsDeletingProduct(true);
    try {
      await api.delete("/products/id/" + deleteProductId);
      await queryClient.invalidateQueries("products");
      showSuccessToast({ message: "Product has been deleted" });
    } catch (err) {
      const message = generateErrorMessage(err);
      showErrorToast({ message: "Cannot delete product: " + message });
    }
    setIsDeletingProduct(false);
    toggleDisclosure();
  }, [deleteProductId, queryClient, toggleDisclosure]);

  const handleOpen = useCallback(() => {
    if (focusRef.current.focus) focusRef.current.focus();
  }, []);

  return (
    <Modal
      isOpen={deleteDisclosure}
      toggle={toggleDisclosure}
      onOpened={handleOpen}
      centered
    >
      <ModalHeader toggle={toggleDisclosure}>Delete Product</ModalHeader>
      <ModalBody>
        <p className="mb-0">Are you sure you want to delete this product?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="light" size="sm" onClick={toggleDisclosure}>
          Cancel
        </Button>
        <Button
          w="55.5px"
          loading={isDeletingProduct}
          color="primary"
          size="sm"
          onClick={handleDeleteProduct}
          ref={focusRef}
        >
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default DeleteProduct;
