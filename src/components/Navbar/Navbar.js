import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserByID, logout } from "../../store/user";
import { useEffect } from "react";
import FitnessLogo from "./../../images/Fitness.jpg";
const pages = ["Food", "Exercise", "Trainer", "Activities", "Gyms"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElRegister, setAnchorElRegister] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClickRegister = (event) => {
    setAnchorElRegister(event.currentTarget);
  };
  const handleUserSign = () => {
    navigate("/signup");
    setAnchorElRegister(null);
  };
  const handleTrainerSignup = () => {
    navigate("/trainersignup");
    setAnchorElRegister(null);
  };
  const handleUserLogin = () => {
    navigate("/login");
    setAnchorElUser(null);
  };

  const token = useSelector((state) => state?.user?.token);

  const user = useSelector((state) => state?.user?.FindUserByID);
  console.log(user);
  useEffect(() => {}, [token, dispatch]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(UserByID());
    dispatch(logout());
  };
  return (
    <AppBar position="static" sx={{ background: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            onClick={() => {
              navigate("/");
            }}
            sx={{
              display: "flex",
              cursor: "pointer",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <img
              src={FitnessLogo}
              alt=""
              style={{
                height: "3rem",
                width: "8rem",
                margin: "0 1rem 0.5rem 0",
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(`/${page.toLowerCase()}`);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigate(`/${page.toLowerCase()}`)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {token !== null ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src={user?.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleProfileClick}>
                  <Typography textAlign="center">My Profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <div>
              <Button
                id="register-button"
                aria-controls={open ? "register-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickRegister}
                sx={{ color: "white" }}
              >
                Register
              </Button>
              <Menu
                id="register-menu"
                anchorEl={anchorElRegister}
                open={Boolean(anchorElRegister)}
                onClose={() => setAnchorElRegister(null)}
                MenuListProps={{
                  "aria-labelledby": "register-button",
                }}
              >
                <MenuItem onClick={handleUserSign}>User</MenuItem>
                <MenuItem onClick={handleTrainerSignup}>Trainer</MenuItem>
              </Menu>
              <Button
                id="login-button"
                aria-controls={open ? "login-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleUserLogin}
                sx={{ color: "white" }}
              >
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
