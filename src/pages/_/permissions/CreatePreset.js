import { Modal, ModalHeader } from "reactstrap";

function CreatePreset({ permissions }) {
    return (
        <Modal isOpen={isOpen} toggle={toggleModal} centered>
            <ModalHeader>Delete User</ModalHeader>
            <ModalBody>
                <Label>Are you sure you want to delete this user?</Label>
            </ModalBody>
            <ModalFooter>
                <Button color="light" w="55.5px" size="sm" onClick={toggle}>
                    No
                </Button>
                <Button w="55.5px" color="primary" size="sm" onClick={toggle} loading={isDeletingUser}>
                    Yes
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CreatePreset;
