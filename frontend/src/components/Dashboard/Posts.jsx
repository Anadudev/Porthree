import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HTMLRenderer from '../HtmlRender';
import Limiter from '../Limiter';

const PostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [unpublishedPosts, setUnpublishedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    publish: false,
    tags: [],
  });
  const [editingPost, setEditingPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const userId = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId.id}/posts/`);
      setPosts(response.data.results);
      setPublishedPosts(response.data.results.filter(post => post.publish));
      setUnpublishedPosts(response.data.results.filter(post => !post.publish));
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const postData = { ...newPost, user: userId.url };
      const response = await axios.post(`http://localhost:8000/api/posts/`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '', publish: false, tags: [] });
      setOpenDialog(false);
      fetchPosts();
    } catch (error) {
      // console.log(error);

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(posts.filter(post => post.id !== postId));
      fetchPosts();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setNewPost(post);
    setOpenDialog(true);
  };

  const handleUpdatePost = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const postData = { ...newPost, user: userId.url };
      const response = await axios.put(`http://localhost:8000/api/posts/${editingPost.id}/`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setPosts(posts.map(post => post.id === editingPost.id ? response.data : post));
      setEditingPost(null);
      setNewPost({ title: '', content: '', publish: false, tags: [] });
      setOpenDialog(false);
      fetchPosts();
    } catch (error) {
      // console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      handleUpdatePost();
    } else {
      handleAddPost();
    }
  };

  return (
    <div>
      {error ? (
        <Typography variant="error">{error.message}</Typography>
      ) : isLoading ? (
        <Typography variant="body2">Loading posts...</Typography>
      ) : (
        <>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} textAlign="center">
              <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                Add Post
              </Button>
              <Typography variant="h6">Published Posts</Typography><hr></hr>
              <List>
                {publishedPosts.map((post, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={post.title} secondary={(<HTMLRenderer htmlContent={Limiter(post.content, 50)} />)} />
                    <Button variant="contained" color="secondary" onClick={() => handleEditPost(post)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleDeletePost(post.id)}>
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">Draft Posts</Typography><hr></hr>
              <List>
                {unpublishedPosts.map((post, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText primary={post.title} secondary={(<HTMLRenderer htmlContent={Limiter(post.content, 50)} />)} />
                      <Button variant="contained" color="secondary" onClick={() => handleEditPost(post)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDeletePost(post.id)}>
                        Delete
                      </Button>
                    </ListItem>
                  </div>
                ))}
              </List>
            </Grid>
          </Grid>
          <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{editingPost ? 'Edit Post' : 'Add Post'}</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  name="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  required
                  fullWidth
                />
                <CKEditor
                  editor={ClassicEditor}
                  data={newPost.content}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setNewPost({ ...newPost, content: data });
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newPost.publish}
                      onChange={(e) => setNewPost({ ...newPost, publish: e.target.checked })}
                      name="publish"
                      color="primary"
                    />
                  }
                  label="Publish"
                />
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    {editingPost ? 'Update Post' : 'Add Post'}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}

export default PostsComponent;
