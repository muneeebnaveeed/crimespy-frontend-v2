import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/Common/Button";

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

function Confirmation(props) {
    const { title, subTitle, color, confirmDialog, setConfirmDialog } = props;
    //const classes = useStyles();

    return (
        <Dialog open={confirmDialog.isOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent
            // className={classes.dialogContent}
            >
                <Typography variant="h6">{confirmDialog.title}</Typography>
                <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
            </DialogContent>
            <DialogActions
            // className={classes.dialogAction}
            >
                <Button onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}>No</Button>
                <Button w="48px" onClick={confirmDialog.onConfirm}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirmation;
