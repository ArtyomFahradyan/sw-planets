import React from "react";
import { Typography } from "@mui/material";
import { Header } from "./styles";

const CELLS = [
  "Name",
  "Rotation period",
  "Orbital period",
  "Diameter",
  "Climate",
  "Gravity",
  "Terrain",
];

type Props = {
  columnWidth: number;
};

function HeaderRow({ columnWidth }: Props) {
  return (
    <Header>
      {CELLS.map((name) => (
        <div style={{ width: columnWidth }} key={name}>
          <Typography
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {name}
          </Typography>
        </div>
      ))}
    </Header>
  );
}

export default HeaderRow;
