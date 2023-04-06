import React from "react";
import { CircularProgress } from "@mui/material";
import { RelativeWrapper, SpinnerWrapper } from "./styles";

type Props = {
  relative?: boolean;
  size?: number;
};

function Spinner({ relative, size = 40 }: Props) {
  const Loading = (
    <SpinnerWrapper>
      <CircularProgress size={size} />
    </SpinnerWrapper>
  );

  if (relative) {
    return <RelativeWrapper>{Loading}</RelativeWrapper>;
  }
  return Loading;
}

export default Spinner;
