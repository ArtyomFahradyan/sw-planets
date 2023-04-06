import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getPlanets } from "../../requests/swapi";
import { GetPlanetsRes, Planet } from "../../types";
import Spinner from "../../components/Spinner";
import GridList from "./components/GridList";
import HeaderRow from "./components/HeaderRow";
import { SpinnerContainer, Wrapper } from "./styles";

function Planets() {
  const [page, setPage] = useState(1);
  const [res, setRes] = useState<Planet[]>([]);
  const [columnWidth, setColumnWidth] = useState(200);
  const { data, isLoading, error } = useQuery(["planets", page], () =>
    getPlanets(page)
  );

  useEffect(() => {
    const onCompleted = (data?: GetPlanetsRes) => {
      if (data) {
        setRes((res) => [...res, ...data.results]);
      }
    };
    const onError = (error: unknown) => {
      console.error(error);
    };
    if (onCompleted || onError) {
      if (onCompleted && !isLoading && !error) {
        onCompleted(data);
      } else if (onError && !isLoading && error) {
        onError(error);
      }
    }
  }, [isLoading, data, error]);

  const changePage = () => {
    const count = data?.count || 0;
    const resCount = data?.results?.length || 10;
    if (page === count / resCount) return;
    setPage(page + 1);
  };

  return (
    <Wrapper>
      <HeaderRow columnWidth={columnWidth} />
      <GridList
        columnWidth={columnWidth}
        setColumnWidth={setColumnWidth}
        isLoading={isLoading}
        changePage={changePage}
        dataCount={res.length}
        res={res}
      />
      {isLoading && (
        <SpinnerContainer>
          <Spinner relative />
        </SpinnerContainer>
      )}
    </Wrapper>
  );
}

export default Planets;
