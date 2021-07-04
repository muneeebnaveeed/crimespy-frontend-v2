import { db, getLoggedInUser } from 'helpers/auth';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeactivateAccount =  () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = getLoggedInUser()
    const toggle = () => {
        // console.log(getLoggedInUser());
        
        setIsOpen(!isOpen);
    };

    const deleteAccount = async () =>{
        await db.collection('users').doc(user.id).delete()
    }
    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }} size="lg" block outline>
                Deactivate Account
            </Button>
            <Modal isOpen={isOpen} toggle={toggle} centered>
                <ModalHeader>Deactivate Account</ModalHeader>
                <ModalBody>Are you sure you want to Deactivate Account?</ModalBody>
                <ModalFooter>
                    <Button color="light" size="sm" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button w="55.5px" size="sm" type="submit" onClick={deleteAccount} loading={false}>
                        De-Activate
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default DeactivateAccount;
