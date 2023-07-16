"use client";

import {
  AppBar,
  Box,
  IconButton,
  Link as LinkUI,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const navBarStyles = {
  backgroundColor: "#4FAEE3",
  border: 0,
  display: "flex",
  flexDirection: "row",
  width: "100%",
};

const fontBecker = {
  fontFamily: "becker-wood-type",
  fontSize: "1.3rem",
  color: "primary.main",
};

const barItem = {
  flexDirection: "row",
  alignItems: "baseline",
};

const buttonTickets = {
  backgroundColor: "common.black",
  color: "common.white",
  textAlign: "center",
  borderRadius: "30px",
  px: "1rem",
  py: "0.4rem",
  ml: 3,
  display: {
    xs: "none",
    sm: "block",
  },
  textOverflow: "ellipsis",
  minWidth: "150px",
};

const ItemLocale = ({ text, href = "", selected = false }: any) => {
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const activeLocales = href.charAt(0) === "#" ? false : href;
  return (
    <Box
      sx={{
        mx: 1,
        ...(activeLocale === href && {
          textDecoration: "underline",
        }),
      }}
    >
      <Link href={href} locale={activeLocales} scroll={!activeLocales}>
        {text}
      </Link>
    </Box>
  );
};
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const ItemNav = ({ text, to = "" }: any) => {
  const isExternalLink = to.indexOf("http") >= 0;

  if (isExternalLink) {
    return (
      <Box
        sx={{
          mx: 1,
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        <LinkUI
          href={to}
          rel="noopener"
          target="_blank"
          style={{ cursor: "pointer" }}
          underline="hover"
        >
          {text}
        </LinkUI>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        mx: 1,
        "&:hover": {
          textDecoration: "underline",
        },
      }}
      onClick={() => scrollToSection(to)}
    >
      {text}
    </Box>
  );
};

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation("home");
  const hideElement = useMediaQuery("(max-width:700px)");

  const { push } = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    {
      text: t("apply"),
      to: "apply",
    },
    {
      text: t("buildathon"),
      to: "buildathon",
    },
    {
      text: t("agenda"),
      to: "agenda",
    },
    {
      text: "Challenge",
      to: "https://github.com/ethereum-argentina/coding-challenge",
    },
    {
      text: t("faqs"),
      to: "faqs",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    handleDrawerToggle();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={fontBecker}>
      <List sx={fontBecker}>
        <ListItem />
        {navItems.map((item) => {
          const isExternalLink = item.to.indexOf("http") >= 0;
          return (
            <ListItem key={item.text} disablePadding sx={fontBecker}>
              <ListItemButton
                sx={{ textAlign: "left", ...fontBecker }}
                onClick={() =>
                  isExternalLink ? push(item.to) : scrollToSection(item.to)
                }
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    textAlign: "left",
                    ...fontBecker,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="static" elevation={0} sx={{ ...navBarStyles }}>
        <Toolbar
          sx={{
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "primary.main" }}
          >
            <MenuIcon style={{ color: "primary.dark" }} />
          </IconButton>
          <Box
            component={"nav"}
            sx={{ ...barItem, ...fontBecker }}
            display={{ xs: "none", sm: "flex" }}
          >
            {navItems.map((item) => (
              <ItemNav text={item.text} to={item.to} key={item.text} />
            ))}
          </Box>
          <Box
            component={"nav"}
            sx={{ ...barItem, ...fontBecker }}
            display={"flex"}
          >
            <ItemLocale text={"EN"} href={"en"} />
            <ItemLocale text={"ES"} href={"es"} />
            <Box
              sx={buttonTickets}
              style={{ display: hideElement ? "none" : "block" }}
            >
              <LinkUI
                href="https://welook.io/t/ethereum-argentina"
                rel="noopener"
                target="_blank"
                color={"common.white"}
                style={{ cursor: "pointer" }}
                underline="hover"
              >
                {t("buttonTicketText")}
              </LinkUI>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <SwipeableDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          disableScrollLock
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#4FAEE3",
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Box>
    </Box>
  );
}
