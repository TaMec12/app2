import React, { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Container } from "@mui/material";
import MovieList2 from "./MovieList";
import InfiniteScrollDataDisplay from "./InfiniteScrollDataDisplay";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid(props) {
  return (
    <Box bgcolor="black" sx={{ display: "flex" }}>
      {/* <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}> */}
      <Container
        sx={{
          marginTop: "45px",
          minHeight: "100vh",
        }}
      >
        (
        <Grid container spacing={3}>
          <MovieList2 searchTerm={props.searchTerm} />
          {/* {<InfiniteScrollDataDisplay searchTerm={props.searchTerm}/>} */}
        </Grid>
        )
      </Container>
      {/* </Box> */}
    </Box>
  );
}
