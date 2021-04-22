import React,{useCallback,useState} from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/Common/Button";
import {
    Form,
    FormFeedback,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    FormText,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "reactstrap";

// const useStyles = makeStyles((theme) => ({
//     dialog: {
//         padding: theme.spacing(2),
//         position: "absolute",
//         top: theme.spacing(5),
//     },
//     dialogTitle: {
//         textAlign: "center",
//     },
//     dialogContent: {
//         textAlign: "center",
//     },
//     dialogAction: {
//         justifyContent: "center",
//     },
//     titleIcon: {
//         backgroundColor: theme.palette.secondary.light,
//         color: theme.palette.secondary.main,
//         "&:hover": {
//             backgroundColor: theme.palette.secondary.light,
//             cursor: "default",
//         },
//         "& .MuiSvgIcon-root": {
//             fontSize: "8rem",
//         },
//     },
// }));

function Confirmation({isOpen, toggle,onDelete, confirmDialog, setConfirmDialog,isDeleting}) {
    




    const toggleModal = useCallback(() => {
        if (!isDeleting) toggle();
    }, [isDeleting, toggle]);

    //const classes = useStyles();

    return (
        // <Dialog open={confirmDialog.isOpen}>
        //     <DialogTitle></DialogTitle>
        //     <DialogContent
        //     // className={classes.dialogContent}
        //     >
        //         <Typography variant="h6">{confirmDialog.title}</Typography>
        //         <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
        //     </DialogContent>
        //     <DialogActions
        //     // className={classes.dialogAction}
        //     >
        //         <Button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>No</Button>
        //         <Button w="48px" onClick={confirmDialog.onConfirm}>
        //             Yes
        //         </Button>
        //     </DialogActions>
        // </Dialog>
        <Modal isOpen={confirmDialog.isOpen} centered>
             <ModalHeader>Delete User</ModalHeader>
             <ModalBody>
                 <Label>
                     Are you sure you want to Delete this user?
                 </Label>
             </ModalBody>
             <ModalFooter>
                        <Button color="light"  w="55.5px" size="sm" onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>
                            No
                        </Button>
                        <Button  w="55.5px" color="primary" size="sm" onClick={confirmDialog.onConfirm} loading={isDeleting}>
                            Yes
                        </Button>
                    </ModalFooter>
        </Modal>
    );
}

export default Confirmation;
