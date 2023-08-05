import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";

export default function ButtonAppBar2(props) {
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  // const [searchTerm, setSearchTerm] = React.useState("");
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const searchIconClickHandler = () => {
    setShowSearchBar((prev) => !prev);
  };

  const searchItemHandler = (event) => {
    props.searchHandleFun(event.target.value);
    console.log(event.target.value);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define the height at which the gradient starts (adjust as needed)
  const gradientStartHeight = 65; // in pixels
  // Calculate the opacity for the gradient based on the scroll position
  const gradientOpacity = Math.min(scrollPosition / gradientStartHeight, 1);

  // Calculate the greyish color for the gradient at the bottom
  const greyishColor = "#f0f0f0";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        // sx={{
        //   backgroundColor: "black",
        //   maxHeight: "100px",
        //   // backdropFilter: `blur(${blurIntensity}px)`,
        //   backgroundColor: `rgba(0, 0, 0, ${
        //     blurIntensity / maxBlurIntensity
        //   })`,
        // }}
        sx={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, ${gradientOpacity}), ${greyishColor})`,
        }}
        position="fixed"
      >
        <Toolbar sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            fontFamily="Titillium Web"
            component="div"
            fontSize="1.5em"
            sx={{ flexGrow: 1 }}
          >
            Romantic Comedy
          </Typography>
          {showSearchBar && (
            <Input
              sx={{ backgroundColor: "white", maxWidth: "30%" }}
              // defaultValue="Enter Data"
              placeholder="Enter Data"
              onChange={searchItemHandler}
            />
          )}
          <Button onClick={searchIconClickHandler}>
            <SearchIcon style={{ color: "white" }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    // CustomAppBar
  );
}
