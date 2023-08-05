import React, { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Container } from "@mui/material";
import { Padding } from "@mui/icons-material";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  var hasMore = true;
  var fetchedList = [];

  useEffect(() => {
    if (hasMore) {
      fetchData(currentPage);
    }
  }, [currentPage]);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 500;

    if (bottom && currentPage <= 2 && !isLoading && hasMore) {
      // console.log("at the bottom");
      // fetchData(p++);
      if (currentPage <= 2) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = async () => {
    console.log(currentPage);
    try {
      setIsLoading(true);
      if (currentPage <= 3 && !fetchedList.find((p) => p == currentPage)) {
        fetchedList.push(currentPage);
        const response = await fetch(
          `https://test.create.diagnal.com/data/page${+currentPage}.json`
        );
        var res = await response.json();
        var d = res["page"]["content-items"]["content"];
        setMovies((prev) => [...prev, ...d]);

        // const response1 = await fetch(
        //   `https://test.create.diagnal.com/data/page1.json`
        // );
        // var res1 = await response1.json();
        // const response2 = await fetch(
        //   `https://test.create.diagnal.com/data/page2.json`
        // );
        // var res2 = await response2.json();
        // const response3 = await fetch(
        //   `https://test.create.diagnal.com/data/page3.json`
        // );
        // var res3 = await response3.json();
        // var d1 = res1["page"]["content-items"]["content"];
        // var d2 = res2["page"]["content-items"]["content"];
        // var d3 = res3["page"]["content-items"]["content"];
        // var d = [...d1, ...d2, ...d3];
        // console.log(d);
        // setMovies(d);
        setIsLoading(false);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleScroll1 = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

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
          backgroundColor: "black",
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
          {/* <div> */}
          <p
            style={{
              fontFamily: "Titillium Web",
              fontSize: "1.2em",
              color: "white",
              minWidth: "100%",
              marginTop: "3px",
              height: "100%",
            }}
          >
            {movie["name"]}
          </p>
          {/* </div> */}
        </Box>
      </Paper>
    </Grid>
  ));
};

export default MovieList;
