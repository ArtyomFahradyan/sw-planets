import React from "react";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { Planet } from "../../../../types";

type Props = {
  planet?: Planet;
  style: any;
};
function ListItem({ planet, style }: Props) {
  return (
    <div className="Row" style={style}>
      <ListItemAvatar>
        <Avatar>{planet?.name[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={planet?.name} secondary="Jan 9, 2014" />
    </div>
  );
}

export default ListItem;
