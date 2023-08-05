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
// import { makeStyles } from "@mui/st";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ButtonAppBar(props) {
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  // const [searchTerm, setSearchTerm] = React.useState("");
  const searchIconClickHandler = () => {
    setShowSearchBar((prev) => !prev);
  };

  const searchItemHandler = (event) => {
    props.searchHandleFun(event.target.value);
    console.log(event.target.value);
  };

  const [scrollPosition, setScrollPosition] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Define your maximum blur intensity (adjust as needed)
  // const maxBlurIntensity = 20;
  const maxBlurIntensity = 1;

  // Calculate the blur intensity based on the scroll position and maximum blur intensity
  // const blurIntensity = Math.min(scrollPosition / 10, maxBlurIntensity);
  const blurIntensity = 0.;

  // const useStyles = makeStyles((theme) => ({
  //   appBar: {
  //     height: 80, // Change the height value as per your requirement
  //   },
  //   title: {
  //     flexGrow: 1,
  //   },
  // }));

  // const CustomAppBar = () => {
  //   const classes = useStyles();

  //   return (
  //     <Box sx={{ flexGrow: 1 }}>
  //       <AppBar
  //         sx={{
  //           backgroundColor: "black",
  //           // backdropFilter: `blur(${blurIntensity}px)`,
  //           // backgroundColor: `rgba(255, 255, 255, ${
  //           //   blurIntensity / maxBlurIntensity
  //           // maxHeight:"3px"
  //           // })`,
  //         }}
  //         position="fixed"
  //       >
  //         <Toolbar sx={{ flexGrow: 1 }}>
  //           <IconButton
  //             size="large"
  //             edge="start"
  //             color="inherit"
  //             aria-label="menu"
  //             sx={{ mr: 2 }}
  //           >
  //             <ArrowBackIcon />
  //           </IconButton>
  //           <Typography
  //             variant="h6"
  //             fontFamily="Titillium Web"
  //             component="div"
  //             fontSize="1.5em"
  //             sx={{ flexGrow: 1 }}
  //           >
  //             Romantic Comedy
  //           </Typography>
  //           {showSearchBar && (
  //             <Input
  //               sx={{ backgroundColor: "white", maxWidth: "30%" }}
  //               // defaultValue="Enter Data"
  //               placeholder="Enter Data"
  //               onChange={searchItemHandler}
  //             />
  //           )}
  //           <Button onClick={searchIconClickHandler}>
  //             <SearchIcon style={{ color: "white" }} />
  //           </Button>
  //         </Toolbar>
  //       </AppBar>
  //     </Box>
  //   );
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "black",
          maxHeight: "100px",
          // backdropFilter: `blur(${blurIntensity}px)`,
          backgroundColor: `rgba(0, 0, 0, ${
            blurIntensity / maxBlurIntensity
          })`,
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
