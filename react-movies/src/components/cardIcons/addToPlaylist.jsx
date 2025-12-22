import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePlaylistSelect = (playlistName) => {
    context.addToPlaylist(movie, playlistName);
    handleMenuClose();
  };

  const handleCreateNewPlaylist = () => {
    const name = prompt("Enter new playlist name:");
    if (name) {
      context.createPlaylist(name);
      context.addToPlaylist(movie, name);
    }
    handleMenuClose();
  };

  return (
    <>
      <IconButton
        aria-label="Add to playlist"
        onClick={handleMenuClick}
      >
        <PlaylistAddIcon color="primary" fontSize="large" />
      </IconButton>
      <Menu
        id="playlist-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {Object.keys(context.playlists).map((playlistName) => (
          <MenuItem 
            key={playlistName}
            onClick={() => handlePlaylistSelect(playlistName)}
          >
            {playlistName}
          </MenuItem>
        ))}
        <MenuItem onClick={handleCreateNewPlaylist}>
          + Create New Playlist
        </MenuItem>
      </Menu>
    </>
  );
};

export default AddToPlaylistIcon;