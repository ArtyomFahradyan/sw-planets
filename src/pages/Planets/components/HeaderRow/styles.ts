import { styled } from "@mui/material/styles";
export const Header = styled("div")`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
  background-color: rgb(238, 238, 238);
  position: fixed;
  opacity: 1;
  z-index: 10;

  > div {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
