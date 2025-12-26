import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Upcoming", path: "/movies/upcoming" },
    // Only show Playlists when logged in
    ...(context.isAuthenticated ? [{ label: "Playlists", path: "/movies/playlists" }] : [])
  ];

  const authMenuOptions = [
    { label: "My Reviews", path: "/reviews/my-reviews" }
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
            TMDB Client
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{
              position: 'relative',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
              marginRight: theme.spacing(2),
              width: 'auto',
              flexGrow: 1,
              maxWidth: '600px'
            }}
          >
            <Box sx={{ 
              padding: theme.spacing(0, 2), 
              height: '100%', 
              position: 'absolute', 
              display: 'flex', 
              alignItems: 'center' 
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              sx={{
                color: 'inherit',
                width: '100%',
                '& .MuiInputBase-input': {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  width: '100%',
                },
              }}
              placeholder="Search movies, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                  {context.isAuthenticated && authMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                  {context.isAuthenticated ? (
                    <MenuItem onClick={() => { setAnchorEl(null); context.signout(); }}>
                      Log Out
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem onClick={() => { setAnchorEl(null); navigate('/login'); }}>
                        Log In
                      </MenuItem>
                      <MenuItem onClick={() => { setAnchorEl(null); navigate('/signup'); }}>
                        Sign Up
                      </MenuItem>
                    </>
                  )}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex' }}>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{ ml: 2 }}
                  >
                    {opt.label}
                  </Button>
                ))}
                {context.isAuthenticated && authMenuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{ ml: 2 }}
                  >
                    {opt.label}
                  </Button>
                ))}
                {context.isAuthenticated ? (
                  <Button color="inherit" onClick={() => context.signout()}>
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                      Log In
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/signup')} sx={{ ml: 2 }}>
                      Sign Up
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
