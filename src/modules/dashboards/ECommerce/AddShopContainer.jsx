import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Typography, Slide, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import announce from '/assets/images/announce.png'; // Import image correctly

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '&.MuiDialogTitle-root': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'pace-between',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
    '&.MuiDialogContent-root': {
        padding: theme.spacing(6),
        backgroundColor: theme.palette.background.paper,
    },
    '&.MuiDialogActions-root': {
        padding: theme.spacing(3),
        justifyContent: 'center',
    },
    '&.MuiButton-containedPrimary': {
        backgroundColor: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
}));


const AddShopContainer = ({ open, handleCloseShopPopup }) => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/shops');
    };

    return (
        <StyledDialog open={open} onClose={handleCloseShopPopup} TransitionComponent={Transition} fullWidth >
            <Box  >

                <DialogTitle>
                    <Box sx={{ justifyContent: 'end', display: 'flex' }}>
                        <IconButton onClick={handleCloseShopPopup} color="inherit">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <img src={announce} alt="Notification Icon" width="200" height="200" />
                        <Box>
                            <Typography variant="h2" sx={{ ml:14}}>Welcome to Any Profit set your Online Platform Now!</Typography>
                            <Typography variant="body1" color="textSecondary" sx={{ mt: 9, ml:14 }}>
                                Get ready to start selling online! To integrate your shop with our platform, please add your shop details. This will enable you to manage your products, track sales, and reach more customers.
                            </Typography>
                        </Box>
                    </Box>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleRedirect} variant="contained" color="primary" size="large" sx={{margin:'10px 10px'}}>
                        Add Shop Now
                    </Button>
                </DialogActions>
            </Box>
        </StyledDialog>
    );
};

export default AddShopContainer;