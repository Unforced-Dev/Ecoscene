import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  Favorite,
  Nature,
  WbSunny,
  Comment,
  Share,
  MoreVert,
  Add,
  Image,
  Event,
  LocationOn,
  Feed as FeedIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { mockPosts, mockUsers } from '../../mocks/data';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

interface PostCardProps {
  post: typeof mockPosts[0];
}

const PostCard = ({ post }: PostCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  const handleReaction = (_type: 'hearts' | 'leaves' | 'suns') => {
    setLiked(!liked);
    // In real app, would dispatch action to update post reactions
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar src={post.author.avatar} sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" component="div">
              {post.author.fullName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" color="text.secondary">
                @{post.author.username} • {new Date(post.timestamp).toLocaleString()}
              </Typography>
              {post.location && (
                <>
                  <LocationOn sx={{ fontSize: 14 }} color="action" />
                  <Typography variant="caption" color="text.secondary">
                    {post.location}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          {post.guild && (
            <Chip label={post.guild} size="small" color="primary" variant="outlined" sx={{ mr: 1 }} />
          )}
          <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem>Save Post</MenuItem>
            <MenuItem>Follow {post.author.fullName}</MenuItem>
            <MenuItem>Report</MenuItem>
          </Menu>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>

        {post.media && post.media.length > 0 && (
          <ImageList sx={{ width: '100%', height: post.media.length > 1 ? 450 : 300, mb: 2 }} cols={post.media.length > 1 ? 2 : 1}>
            {post.media.map((image, index) => (
              <ImageListItem key={index}>
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  loading="lazy"
                  style={{ borderRadius: 8, objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <IconButton onClick={() => handleReaction('hearts')} color={liked ? 'error' : 'default'}>
          <Favorite />
        </IconButton>
        <Typography variant="caption">{post.reactions.hearts}</Typography>
        
        <IconButton onClick={() => handleReaction('leaves')} color="success">
          <Nature />
        </IconButton>
        <Typography variant="caption">{post.reactions.leaves}</Typography>
        
        <IconButton onClick={() => handleReaction('suns')} color="warning">
          <WbSunny />
        </IconButton>
        <Typography variant="caption">{post.reactions.suns}</Typography>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <IconButton onClick={() => setShowComments(!showComments)}>
          <Comment />
        </IconButton>
        <Typography variant="caption">{post.comments}</Typography>
        
        <IconButton>
          <Share />
        </IconButton>
      </CardActions>

      {showComments && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              maxRows={3}
            />
            <Button variant="contained" size="small">
              Post
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default function Feed() {
  const [tabValue, setTabValue] = useState(0);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    type: 'text',
    tags: [] as string[],
  });
  const [loading] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.user) || mockUsers[0];

  // Filter posts based on tab
  const filteredPosts = mockPosts.filter((post) => {
    if (tabValue === 0) return true; // All
    if (tabValue === 1) return currentUser.guilds.includes(post.guild || ''); // My Guilds
    if (tabValue === 2) return post.author.id === currentUser.id; // My Posts
    return true;
  });

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} variant="fullWidth">
          <Tab label="All Posts" />
          <Tab label="My Guilds" />
          <Tab label="My Posts" />
        </Tabs>
      </Paper>

      {loading ? (
        <LoadingSpinner message="Loading posts..." />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          icon={<FeedIcon />}
          title="No posts yet"
          description="Be the first to share something with the community!"
          actionLabel="Create Post"
          onAction={() => setCreatePostOpen(true)}
        />
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setCreatePostOpen(true)}
      >
        <Add />
      </Fab>

      {/* Create Post Dialog */}
      <Dialog open={createPostOpen} onClose={() => setCreatePostOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
            <Button
              variant={newPost.type === 'text' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setNewPost({ ...newPost, type: 'text' })}
            >
              Text
            </Button>
            <Button
              variant={newPost.type === 'image' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<Image />}
              onClick={() => setNewPost({ ...newPost, type: 'image' })}
            >
              Image
            </Button>
            <Button
              variant={newPost.type === 'event' ? 'contained' : 'outlined'}
              size="small"
              startIcon={<Event />}
              onClick={() => setNewPost({ ...newPost, type: 'event' })}
            >
              Event
            </Button>
          </Box>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Share your regenerative story..."
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            size="small"
            placeholder="Add tags (comma separated)"
            sx={{ mb: 2 }}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value.split(',').map(t => t.trim()) })}
          />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {newPost.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" onDelete={() => {
                setNewPost({ ...newPost, tags: newPost.tags.filter((_, i) => i !== index) });
              }} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreatePostOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setCreatePostOpen(false)}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}