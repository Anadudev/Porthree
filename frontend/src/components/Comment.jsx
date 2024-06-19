import React, { useState, useEffect } from 'react';
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Button, Box, List
  , ListItem, ListItemText
  , ListItemAvatar, Typography, Avatar
  , Dialog, DialogActions, DialogContent
  , DialogContentText, DialogTitle, Slide
  , TextField, Card, Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  GetRelation, PostData,
  isAuthenticated, deleteData,
  updateData, currAuthUser
} from '../data/GetUser';
import { useNavigate } from 'react-router-dom';
import Limiter from './Limiter';
import { useSelector, useDispatch } from 'react-redux';
import { updater, setPageUpdate } from '../features/DataUpdate/DataUpdateSlice';
import TimeAgo from 'react-timeago';

export function ConfirmDeletionDialog({ comment, title, body }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteComment = () => {
    deleteData(comment.url);
    dispatch(updater());
    dispatch(setPageUpdate(true));
    handleClose();
  }

  return (
    <React.Fragment>
      <DeleteForeverIcon sx={{ mx: 1, cursor: 'pointer', fontSize: 20 }} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title || ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body || ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteComment} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


export function ReplyFormDialog({ type = '', replyType = '', parent = '', editData, owner }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [formData, setFormData] = useState({
    comment: null,
    user: null,
  });

  const handleClickOpen = () => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    setOpen(true);
  };

  const editOpen = () => {
    handleClickOpen();
    setToEdit(true)
    if (editData) { setFormData(editData) }
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setFormData({
      comment: null,
      user: null,
    })
    toEdit && setToEdit(false);
  };

  const realTimeUpdate = () => {
    handleClose();
    dispatch(updater())
    dispatch(setPageUpdate(true))
  }

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      [replyType]: parent,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    if (formData.comment) {
      const user = JSON.parse(localStorage.getItem("user"))
      formData.user = user.url;
      PostData(`http://127.0.0.1:8000/api/${type}_comments/`, formData);
    }
    toEdit && setToEdit(false);
    realTimeUpdate();
  }
  const handleEdit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated()) return navigate('/login');
    if (!formData.comment) return;
    const user = JSON.parse(localStorage.getItem("user"));
    formData.user = user.url;
    try {
      await updateData(`${editData.url}`, {
        user: formData.user,
        comment: formData.comment
      });
      toEdit && setToEdit(false);
      realTimeUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      {owner && editData ? <EditIcon sx={{ cursor: 'pointer', fontSize: 20 }} onClick={editOpen} /> : ''}
      <CommentIcon fontSize='medium' sx={{ cursor: 'pointer' }} onClick={handleClickOpen} />
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: toEdit ? handleEdit : handleSubmit
        }}
      >
        <DialogTitle>Reply this {type}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            margin="dense"
            id="comment"
            name="comment"
            label="Write reply"
            type="comment"
            value={formData.comment}
            onChange={handleChange}
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


function HandleReply({ type, id }) {
  const [data, setData] = useState([]);
  const [result, setResult] = useState({});
  const [page, setPage] = useState(1);
  const update_reply = useSelector((state) => state.dataUpdate.value)
  const dispatch = useDispatch();

  const handleMorePage = () => {
    setPage(page + 1);
  }

  const handleLessPage = () => {
    setPage(1);
  }

  useEffect(() => {
    /* reset the page back to 1 to reduce server api calls */
    if (update_reply.pageRestValue) {
      console.log(update_reply.pageRestValue);
      setPage(1);
      dispatch(setPageUpdate(false));
    }
    async function fetchData() {
      setResult(await GetRelation(`http://127.0.0.1:8000/api/${type}_comments/?reply=${id}&page=${page}`));
    }
    fetchData();
  }, [id, type, page, update_reply]);

  useEffect(() => {
    if (result.results) {
      page > 1 ? setData(data.concat(result.results)) : setData(result.results);
    }
  }, [result]); // Only update `data` when `result` changes

  return (
    data.length > 0 ? (
      <div>
        <Accordion elevation={3}>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>{result.count} {result.count > 1 ? ' Replies' : ' Reply'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <CommentItemsList comments={data} type={type} />
              {page == 1 && result.count == data.length ? '' : (<span>
                {result.next && <Button size='small' onClick={handleMorePage}>Load more</Button>}
                {result.previous && <Button size='small' onClick={handleLessPage}>Load few</Button>}
              </span>)}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    ) : <div></div>
  )
}


export function CommentItem({ data, type }) {
  const limit = 100;
  const [user, setUser] = useState([]);
  const [more, setMore] = useState(limit);
  useEffect(() => {
    async function FetchUser() {
      setUser(await GetRelation(data.user));
    }
    FetchUser();
  }, [data])
  const owner = currAuthUser(user?.username);
  const handleMore = () => {
    more <= limit ? setMore(data.comment.length) : setMore(limit);
  }

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user.username} src={user.picture} />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.first_name || ''} ${user.last_name || ''}`}
          secondary={
            <Box>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.username || ''}
              </Typography>
              <small>
                {new Date(data.created_at) < new Date(data.updated_at) ?
                  <span> <br />Edited - </span> : <br />}
              </small>
              {`${Limiter(data.comment, more)}`}
              {data.comment.length > limit && <Box
                sx={{ textAlign: 'right', mb: 1 }}>
                <Chip
                  size='small'
                  onClick={handleMore}
                  variant={more <= limit ? "contained" : "outlined"}
                  label={`See ${more <= limit ? 'more' : 'less'}`} />
              </Box>
              }
            </Box>
          }
        />
      </ListItem>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', pb: 0.1, pr: 1 }}>
        {owner && <ConfirmDeletionDialog comment={data} title={"Are you sure you want to delete this comment?"}
          body={`This will delete the current comment and all replies under it.  This action cannot be undone.`} />}
        <ReplyFormDialog type={type} replyType={'reply'} parent={data.url} editData={data} owner={owner} />
        <FavoriteIcon sx={{ cursor: 'pointer', fontSize: 20 }} />
      </Box>
      <HandleReply type={type} id={data.id} />
    </React.Fragment>
  )
}


export function CommentItemsList({ comments, type }) {
  return (
    comments && comments.length > 0 ? <React.Fragment>
      {comments?.map((comment, index) => (
        <List key={index} sx={{ width: '100%' }}>
          <CommentItem data={comment} type={type} />
        </List>
      ))}
    </React.Fragment> : ''
  );
}


export default function Comment({ author, listTitle, parent }) {
  const update_comment = useSelector((state) => state.dataUpdate.value)
  const dispatch = useDispatch();

  const [requestValue, setRequestValue] = useState({});
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);

  const handleMorePage = () => {
    setPage(page + 1);
  }

  const handleLessPage = () => {
    setPage(1);
  }

  useEffect(() => {
    async function AsyncCommentsFetch() {
      const response = await GetRelation(`http://127.0.0.1:8000/api/${listTitle}_comments/?${listTitle}=${parent}&page=${page}`);
      setRequestValue(response);
      /* reset the page back to 1 to reduce server api calles */
      if (update_comment.pageRestValue) {
        console.log(update_comment.pageRestValue);
        setPage(1);
        dispatch(setPageUpdate(false));
      }
      /* handle more comments display */
      if (response.results) {
        page > 1 ? setComments(comments.concat(response.results)) : setComments(response.results);
      }

    }
    AsyncCommentsFetch();
  }, [listTitle, parent, page, update_comment.updaterValue]);

  return (
    comments && (<React.Fragment>
      <Typography
        variant='h5'
        sx={{
          fontWeight: '900',
          color: `${author?.secondary_color || ''}`,
          textAlign: 'center',
          my: 2
        }}>{requestValue.count}{requestValue.count > 1 ? ` Comments` : ` Comment`}</Typography>
      <Card>
        {requestValue.count > 0 ? <Box sx={{ padding: 1, }}>
          <CommentItemsList comments={comments} type={listTitle} />
          {page == 1 && requestValue.count == comments.length ? '' : (<span>
            {requestValue.next && <Button onClick={handleMorePage}>Load more</Button>}
            {requestValue.previous && <Button onClick={handleLessPage}>Load few</Button>}
          </span>)}
        </Box> : ''}
      </Card>
    </React.Fragment>)
  )
}
