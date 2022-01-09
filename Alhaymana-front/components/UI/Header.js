import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar style={{ paddingLeft: 20 }}>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <div style={{ paddingRight: 7 }}>
          <Image width={45} height={45} src="/alhaymana2.png" />
        </div>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { sm: "block" } }}
        >
          <Link href="/">
            <a style={{ color: "inherit" }}>AL Haymana</a>
          </Link>
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { md: "flex" } }}>
          {user && (
            <>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={5} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </>
          )}
          {user ? (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={() => router.push("/profile")}
            >
              <div>
                <span>{user.user.username}</span>
                <AccountCircle />
              </div>
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <Link href="/auth/signin">
                <AccountCircle />
              </Link>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
