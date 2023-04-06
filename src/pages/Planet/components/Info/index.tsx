import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import { Planet } from "../../../../types";

type Props = {
  planet: Planet;
};

function Info({ planet }: Props) {
  const list = Object.entries(planet);
  return (
    <Box sx={{ minWidth: 275, boxShadow: 3 }}>
      <Card>
        <CardContent>
          <List>
            {list.map((item) => {
              if (typeof item[1] !== "string") {
                return (
                  <ListItem key={item[0]}>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            textTransform: "uppercase",
                          }}
                        >
                          {item[0].replace("_", " ")}
                        </Typography>
                      }
                      secondary={item[1].map((link) => (
                        <Typography key={link}>{link}</Typography>
                      ))}
                    />
                  </ListItem>
                );
              }

              return (
                <ListItem key={item[0]}>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                      >
                        {item[0].replace("_", " ")}
                      </Typography>
                    }
                  />
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        {item[1]}
                      </Typography>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Info;
