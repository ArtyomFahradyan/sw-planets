import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const Planet = lazy(
  () => import(/* webpackChunkName: "Planet" */ "../../pages/Planet")
);

const Planets = lazy(
  () => import(/* webpackChunkName: "Planets" */ "../../pages/Planets")
);

function Router() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Planets />} />
        <Route path="planets/:id" element={<Planet />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
