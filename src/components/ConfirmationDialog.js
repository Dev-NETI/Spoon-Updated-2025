import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

function ConfirmationDialog({
    open = false,
    title = 'Confirmation',
    children = 'Are you sure?',
    submitButtonSlot,
    closeDialog,
}) {
    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth='xs'
            open={open}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeDialog}>
                    Cancel
                </Button>
                {submitButtonSlot}
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
