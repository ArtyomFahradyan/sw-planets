import React from "react";
import { useQuery } from "react-query";
import { getPlanet } from "../../requests/swapi";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Info from "./components/Info";
import Spinner from "../../components/Spinner";
function Planet() {
  const { id } = useParams();

  const { data, isLoading } = useQuery(["planet", id], () => getPlanet(id));

  return (
    <Box sx={{ flexGrow: 1 }} padding={4}>
      {isLoading ? <Spinner /> : <Info planet={data} />}
    </Box>
  );
}

export default Planet;
