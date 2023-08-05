import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";

const InfiniteScrollDataDisplay = (props) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://test.create.diagnal.com/data/page${+page}.json`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        const d = response.data["page"]["content-items"]["content"];
        console.log(d);
        setMovies((prevData) => [...prevData, ...d]);
        setCurrentPage((prevPage) => prevPage + 1);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (hasMore && !isLoading) {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop === clientHeight) {
        console.log(currentPage);
        fetchData(currentPage);
      }
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading]);

  const imageErrorHandler = (event) => {
    event.target.src =
      "https://safesendsoftware.com/wp-content/uploads/2016/06/Human-Error.jpg";
  };
  var filteredList = [];
  if (props.searchTerm === "") {
    filteredList = movies;
  } else {
    filteredList = movies.filter((movie) =>
      movie["name"].toLowerCase().includes(props.searchTerm.toLowerCase())
    );
  }

  return filteredList.map((movie, index) => (
   
    <Grid item xs={4} md={4} key={index} /*minWidth="240px" maxWidth="240px"*/>
      <Paper
        key={index}
        elevation={5}
        sx={{
          // borderRadius: "25px",
          overflow: "hidden",
          backgroundColor: "lightgray",
        }}
        
      >
        {
          <img
            src={`https://test.create.diagnal.com/images/${movie["poster-image"]}`}
            onError={imageErrorHandler}
            alt="placeholder"
            width="100%"
            height="100%"
          />
        }

        <Box
          display={"flex"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent="space-between"
          bgcolor="black"
        >
          <p
            style={{
              fontFamily: "Titillium Web",
              fontSize: "1em",
              color: "white",
              minWidth: "100%",
            }}
          >
            {movie["name"]}
          </p>
        </Box>
      </Paper>
    </Grid>
  ));
};

export default InfiniteScrollDataDisplay;
