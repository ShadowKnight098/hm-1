import React, { useState, useEffect, useRef } from "react";
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
  Divider,
  Badge,
  Tooltip,
  Collapse,
  InputBase,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    color: "#f87171",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.3)",
  },
  instructor: {
    label: "Instructor",
    color: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    border: "rgba(52,211,153,0.3)",
  },
  student: {
    label: "Student",
    color: "#a78bfa",
    bg: "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.3)",
  },
};

const MENU_ITEMS = {
  admin: [
    { name: "Dashboard", id: "dashboard" },
    { name: "Users", id: "users" },
    { name: "Courses", id: "courses" },
    { name: "Analytics", id: "analytics" },
  ],
  instructor: [
    { name: "My Courses", id: "my-courses" },
    { name: "Students", id: "students" },
    { name: "Earnings", id: "earnings" },
  ],
  student: [
    { name: "Home", id: "home" },
    { name: "Courses", id: "courses" },
    { name: "Roadmaps", id: "roadmaps" },
    { name: "Community", id: "community" },
    { name: "My Learning", id: "my-learning" },
  ],
};

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Navbar() {
  const [user, setUser] = useState({
    name: "Alex Rivera",
    email: "alex@skillshine.io",
    role: "student",
    avatar: null, // set to null to use initials fallback
  });

  const [activeSection, setActiveSection] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 60,
  });

  // Track active section on scroll
  useEffect(() => {
    const menuIds = (MENU_ITEMS[user?.role] || []).map((i) => i.id);
    const handleScroll = () => {
      for (const id of [...menuIds].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user?.role]);

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchValue("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [searchOpen]);

  const menuItems = MENU_ITEMS[user?.role] || [];
  const roleConfig = ROLE_CONFIG[user?.role] || ROLE_CONFIG.student;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Inject Sora font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');`}</style>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          fontFamily: "'Sora', sans-serif",
          backdropFilter: "blur(20px)",
          background: scrollTrigger
            ? "rgba(8, 10, 22, 0.97)"
            : "rgba(8, 10, 22, 0.82)",
          borderBottom: scrollTrigger
            ? "1px solid rgba(139,92,246,0.25)"
            : "1px solid rgba(139,92,246,0.1)",
          boxShadow: scrollTrigger
            ? "0 4px 32px rgba(99,102,241,0.08)"
            : "none",
          transition: "all 0.35s ease",
          py: scrollTrigger ? 0.5 : 1,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            maxWidth: "1400px",
            mx: "auto",
            width: "100%",
            px: { xs: 2, md: 4 },
            minHeight: { xs: 56, md: 64 },
          }}
        >
          {/* ── Logo ── */}
          <Box
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer", flexShrink: 0 }}
          >
            {/* Logo mark */}
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "8px",
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                flexShrink: 0,
              }}
            >
              SS
            </Box>
            <Typography
              sx={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 800,
                fontSize: "1.15rem",
                letterSpacing: "-0.04em",
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                userSelect: "none",
              }}
            >
              SkillShine
            </Typography>
          </Box>

          {/* ── Desktop Nav ── */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 0.5,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Box
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    px: 2,
                    py: 0.9,
                    borderRadius: "10px",
                    cursor: "pointer",
                    position: "relative",
                    color: isActive ? "#e0e7ff" : "#94a3b8",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9rem",
                    background: isActive ? "rgba(139,92,246,0.12)" : "transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#e0e7ff",
                      background: "rgba(139,92,246,0.08)",
                    },
                  }}
                >
                  {item.name}
                  {isActive && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 16,
                        height: 2,
                        borderRadius: 2,
                        background: "linear-gradient(to right, #818cf8, #c084fc)",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          {/* ── Right Side ── */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search */}
            <Box
              ref={searchRef}
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "10px",
                border: searchOpen
                  ? "1px solid rgba(139,92,246,0.4)"
                  : "1px solid transparent",
                background: searchOpen ? "rgba(30,41,59,0.8)" : "transparent",
                transition: "all 0.25s ease",
                width: searchOpen ? 200 : 36,
                height: 36,
              }}
            >
              <Tooltip title="Search">
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearchOpen(true);
                    setTimeout(() => searchRef.current?.querySelector("input")?.focus(), 50);
                  }}
                  sx={{ color: "#94a3b8", flexShrink: 0, width: 36, height: 36 }}
                >
                  <SearchIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              {searchOpen && (
                <InputBase
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search…"
                  onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  sx={{
                    color: "#e0e7ff",
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "0.85rem",
                    flex: 1,
                    pr: 1,
                    "& input::placeholder": { color: "#475569" },
                  }}
                />
              )}
            </Box>

            {/* Notifications — students only */}
            {user?.role === "student" && (
              <Tooltip title="Notifications">
                <IconButton
                  size="small"
                  sx={{
                    color: "#94a3b8",
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    "&:hover": { background: "rgba(139,92,246,0.1)", color: "#e0e7ff" },
                  }}
                >
                  <Badge
                    badgeContent={3}
                    sx={{
                      "& .MuiBadge-badge": {
                        background: "linear-gradient(135deg, #6366f1, #a855f7)",
                        color: "#fff",
                        fontSize: "0.6rem",
                        minWidth: 16,
                        height: 16,
                        padding: "0 4px",
                      },
                    }}
                  >
                    <NotificationsOutlinedIcon sx={{ fontSize: 19 }} />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            {user ? (
              <>
                {/* Role badge */}
                <Box
                  sx={{
                    display: { xs: "none", lg: "flex" },
                    alignItems: "center",
                    px: 1.5,
                    py: 0.4,
                    borderRadius: "8px",
                    background: roleConfig.bg,
                    border: `1px solid ${roleConfig.border}`,
                    color: roleConfig.color,
                    fontSize: "0.7rem",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {roleConfig.label}
                </Box>

                {/* Avatar + dropdown */}
                <Tooltip title="Account">
                  <Box
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      cursor: "pointer",
                      px: 0.5,
                      py: 0.3,
                      borderRadius: "10px",
                      border: Boolean(anchorEl)
                        ? "1px solid rgba(139,92,246,0.4)"
                        : "1px solid transparent",
                      "&:hover": { background: "rgba(139,92,246,0.08)" },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Avatar
                      src={user.avatar || undefined}
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: "rgba(99,102,241,0.25)",
                        border: "1.5px solid rgba(139,92,246,0.5)",
                        fontSize: "0.7rem",
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 700,
                        color: "#a78bfa",
                      }}
                    >
                      {!user.avatar && getInitials(user.name)}
                    </Avatar>
                    <Typography
                      sx={{
                        display: { xs: "none", lg: "block" },
                        color: "#cbd5e1",
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        lineHeight: 1,
                      }}
                    >
                      {user.name.split(" ")[0]}
                    </Typography>
                  </Box>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  disableScrollLock
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 1,
                        minWidth: 220,
                        bgcolor: "rgba(13,17,36,0.98)",
                        backdropFilter: "blur(20px)",
                        color: "#e0e7ff",
                        border: "1px solid rgba(139,92,246,0.2)",
                        borderRadius: "14px",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                        overflow: "hidden",
                      },
                    },
                  }}
                >
                  {/* User info header */}
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#e0e7ff" }}>
                      {user.name}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Sora', sans-serif", fontSize: "0.75rem", color: "#64748b", mt: 0.3 }}>
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />

                  {[
                    { icon: <DashboardIcon sx={{ fontSize: 16 }} />, label: "Dashboard" },
                    { icon: <PersonOutlineIcon sx={{ fontSize: 16 }} />, label: "Profile" },
                    { icon: <SettingsOutlinedIcon sx={{ fontSize: 16 }} />, label: "Settings" },
                  ].map(({ icon, label }) => (
                    <MenuItem
                      key={label}
                      onClick={() => setAnchorEl(null)}
                      sx={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "0.85rem",
                        color: "#cbd5e1",
                        gap: 1.5,
                        py: 1.2,
                        "&:hover": { bgcolor: "rgba(139,92,246,0.1)", color: "#e0e7ff" },
                      }}
                    >
                      {icon} {label}
                    </MenuItem>
                  ))}

                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />
                  <MenuItem
                    onClick={() => { setUser(null); setAnchorEl(null); }}
                    sx={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: "0.85rem",
                      color: "#f87171",
                      gap: 1.5,
                      py: 1.2,
                      "&:hover": { bgcolor: "rgba(239,68,68,0.08)" },
                    }}
                  >
                    <LogoutIcon sx={{ fontSize: 16 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={() =>
                  setUser({ name: "Alex Rivera", email: "alex@skillshine.io", role: "student", avatar: null })
                }
                sx={{
                  fontFamily: "'Sora', sans-serif",
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  px: 3,
                  py: 0.9,
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
                    boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
                  },
                }}
              >
                Get Started
              </Button>
            )}

            {/* Mobile hamburger */}
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{
                display: { md: "none" },
                color: "#94a3b8",
                width: 36,
                height: 36,
                borderRadius: "10px",
                "&:hover": { background: "rgba(139,92,246,0.1)", color: "#e0e7ff" },
              }}
            >
              {mobileOpen ? <CloseIcon sx={{ fontSize: 20 }} /> : <MenuIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* ── Mobile Drawer ── */}
        <Collapse in={mobileOpen}>
          <Box
            sx={{
              bgcolor: "rgba(8,10,22,0.98)",
              backdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(139,92,246,0.15)",
              px: 3,
              py: 2,
              display: { md: "none" },
            }}
          >
            {/* Mobile search */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 0.8,
                mb: 2,
                borderRadius: "10px",
                background: "rgba(30,41,59,0.6)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <SearchIcon sx={{ fontSize: 16, color: "#475569" }} />
              <InputBase
                placeholder="Search courses, topics…"
                sx={{
                  flex: 1,
                  color: "#e0e7ff",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "0.85rem",
                  "& input::placeholder": { color: "#475569" },
                }}
              />
            </Box>

            {menuItems.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <Box
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.4,
                    px: 1,
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: isActive ? "#e0e7ff" : "#94a3b8",
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: "0.95rem",
                    background: isActive ? "rgba(139,92,246,0.1)" : "transparent",
                    borderBottom: i !== menuItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    "&:hover": { color: "#e0e7ff", background: "rgba(139,92,246,0.07)", px: 2 },
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.name}
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #818cf8, #c084fc)",
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </AppBar>
    </>
  );
}

export default Navbar;