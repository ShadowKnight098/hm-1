import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Dialog,
  Slide
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Navbar() {

  // 🔐 Fake auth (replace later)
  const [user, setUser] = useState(null);

  const [openMenu, setOpenMenu] = useState(false);

  // Role-based menu (if logged in)
  const studentMenu = ["Home", "Courses", "Progress"];
  const adminMenu = ["Dashboard", "Users", "Analytics"];

  const menuItems = user?.role === "admin" ? adminMenu : studentMenu;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backdropFilter: "blur(10px)",
          background: "rgba(15, 23, 42, 0.9)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>

          {/* Logo */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            SkillShine
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>

          {/* Right Side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

            {/* Login / Logout */}
            {user ? (
              <Button
                onClick={() => setUser(null)}
                sx={{ color: "#fff", textTransform: "none" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setUser({ name: "Moon", role: "student" })
                }
                sx={{ color: "#fff", textTransform: "none" }}
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { md: "none" }, color: "#fff" }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>

      {/* 📱 Mobile Fullscreen Menu */}
      <Dialog
        fullScreen
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            height: "100%",
            background: "#0f172a",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >

          {/* Close Button */}
          <Button
            onClick={() => setOpenMenu(false)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "white"
            }}
          >
            ✕
          </Button>

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <Typography
              key={item}
              onClick={() => setOpenMenu(false)} // ✅ closes menu
              variant="h4"
              sx={{
                cursor: "pointer",
                opacity: 0,
                animation: `fadeIn 0.4s ease forwards`,
                animationDelay: `${index * 0.1}s`,
                "@keyframes fadeIn": {
                  from: { opacity: 0, transform: "translateX(30px)" },
                  to: { opacity: 1, transform: "translateX(0)" }
                },
                "&:hover": {
                  transform: "scale(1.1)",
                  color: "#6366f1",
                },
              }}
            >
              {item}
            </Typography>
          ))}

        </Box>
      </Dialog>
    </>
  );
}

export default Navbar;