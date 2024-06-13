import { Dialog, DialogTitle } from '@mui/material'
import {
    Close as CloseIcon,
} from "@mui/icons-material";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';


import BeachAccessIcon from '@mui/icons-material/BeachAccess';
const StoreFronturl = ({ open, onClose }) => {

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 20,
                    maxwidth: 1000,
                    width:500
                }}
            >
                Storefront URL
                <CloseIcon sx={{ cursor: "pointer" }} onClick={onClose} />
            </DialogTitle>
            <hr/>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LooksOneIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText fontSize primary='Go to your Amazon Seller Central Account'/>
                </ListItem>
                
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <LooksTwoIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='Click on Settings (top right)' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Looks3Icon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='Click on Account Info' />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Looks4Icon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='Click on Seller Profile'/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Looks5Icon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary='Scroll all the way down, there’s your seller link!' />
                </ListItem>
            </List>
        </Dialog>
    )
}

export default StoreFronturl