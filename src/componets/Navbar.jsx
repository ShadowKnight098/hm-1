import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Fade,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Courses", id: "courses" },
    { name: "Roadmaps", id: "roadmaps" },
    { name: "Community", id: "community" },
    { name: "About", id: "about" },
  ];

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 80,
  });

  const handleLogin = () => setUser({ name: "Alex Rivera", avatar: "🌙" });
  const handleLogout = () => setUser(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: scrollTrigger ? "blur(24px)" : "blur(16px)",
        background: scrollTrigger
          ? "rgba(10, 12, 28, 0.96)"
          : "rgba(10, 12, 28, 0.85)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        transition: "all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)",
        py: scrollTrigger ? 0.8 : 1.2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", maxWidth: "1420px", mx: "auto", width: "100%" }}>
        
        {/* Logo - Deep Purple/Indigo Gradient */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.06)",
              filter: "brightness(1.15)",
            },
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Hm's Academy
        </Typography>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 6,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {menuItems.map((item) => (
            <Typography
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
              sx={{
                color: "#cbd5e1",
                fontWeight: 500,
                fontSize: "1.05rem",
                cursor: "pointer",
                position: "relative",
                transition: "color 0.3s ease",
                "&:hover": { color: "#e0e7ff" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -6,
                  left: "50%",
                  width: 0,
                  height: "3px",
                  background: "linear-gradient(to right, #818cf8, #c084fc)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: "translateX(-50%)",
                },
                "&:hover::after": {
                  width: "85%",
                },
              }}
            >
              {item.name}
            </Typography>
          ))}
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          {user ? (
            <Box
              onClick={handleProfileMenuOpen}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                pr: 1,
                borderRadius: "9999px",
                "&:hover": { background: "rgba(139, 92, 246, 0.1)" },
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "#1e2937",
                  border: "2px solid #a78bfa",
                  fontSize: "1.35rem",
                }}
              >
                {user.avatar}
              </Avatar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#e0e7ff" }}>
                  {user.name.split(" ")[0]}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Button
              onClick={handleLogin}
              startIcon={<LoginIcon />}
              sx={{
                background: "linear-gradient(90deg, #6366f1, #a855f7, #d946ef)",
                backgroundSize: "200% auto",
                color: "#fff",
                px: 4,
                py: 1.25,
                borderRadius: "9999px",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 10px 30px -10px #a855f7",
                transition: "all 0.4s ease",
                "&:hover": {
                  backgroundPosition: "right center",
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 35px -10px #c026d3",
                },
              }}
            >
              Get Started
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { md: "none" }, color: "#e0e7ff" }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu */}
      {mobileOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            bgcolor: "rgba(10, 12, 28, 0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(139, 92, 246, 0.2)",
            py: 4,
            px: 5,
            display: { md: "none" },
            boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.5)",
          }}
        >
          {menuItems.map((item, i) => (
            <Typography
              key={item.id}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                setMobileOpen(false);
              }}
              sx={{
                py: 2.2,
                fontSize: "1.15rem",
                color: "#cbd5e1",
                borderBottom: i !== menuItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                "&:hover": { color: "#e0e7ff", pl: 2 },
                transition: "all 0.3s ease",
              }}
            >
              {item.name}
            </Typography>
          ))}

          {!user && (
            <Button
              fullWidth
              onClick={() => { handleLogin(); setMobileOpen(false); }}
              sx={{
                mt: 4,
                py: 1.8,
                borderRadius: "9999px",
                background: "linear-gradient(90deg, #6366f1, #d946ef)",
              }}
              variant="contained"
            >
              Get Started
            </Button>
          )}
        </Box>
      )}
    </AppBar>
  );
}

export default Navbar;