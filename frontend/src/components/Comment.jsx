import React from 'react';
import {
  Button, Box, List
  , ListItem, Divider, ListItemText
  , ListItemAvatar, Typography, Avatar
  , Dialog, DialogActions, DialogContent
  , DialogContentText, DialogTitle, Slide
  , TextField,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

export function ReplyFormDialog({ actionType }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {actionType === 'comment' ?

        <CommentIcon onClick={handleClickOpen} /> : <Button size='small' onClick={handleClickOpen}>reply this</Button>}
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reply to users {actionType === 'comment' ? "post" : "comment"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            margin="dense"
            name="comment"
            label="Write reply"
            type="comment"
            fullWidth
            rows={4}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button type="submit">Reply</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export function CommentItemsList() {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Box sx={{ textAlign: 'right', pb: 0.1 }}>
        <FavoriteIcon sx={{ mx: 1, cursor: 'pointer', fontSize: 20 }} />
        <ReplyFormDialog />
      </Box>

      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Box sx={{ textAlign: 'right', pb: 0.1 }}>
        <FavoriteIcon sx={{ mx: 1, cursor: 'pointer', fontSize: 20 }} />
        <ReplyFormDialog />
      </Box>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
      <Box sx={{ textAlign: 'right', pb: 0.1 }}>
        <FavoriteIcon sx={{ mx: 1, cursor: 'pointer', fontSize: 20 }} />
        <ReplyFormDialog />
      </Box>
    </List>
  );
}

export function CommentListDialog({author, listTitle}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        All comments
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        scroll={'paper'}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{listTitle?`All comments on ${author}'s ${listTitle}`:"All Comments"}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="alert-dialog-slide-description">
            <CommentItemsList />
            <CommentItemsList />
            <CommentItemsList />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


function Comment({author  ,listTitle}) {
  return (
    <Box sx={{ padding: 1, }}>
      <CommentItemsList />
      {/* <Button>All Comments</Button> */}
      <CommentListDialog author={author} listTitle={listTitle}/>
    </Box>
  )
}

export default Comment;