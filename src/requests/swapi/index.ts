import axios from "axios";
import { GetPlanetsRes, Planet } from "../../types";

export async function getPlanets(page: number): Promise<GetPlanetsRes> {
  const res = await axios.get(
    `https://swapi.dev/api/planets?page=${page}&pageSize=60`
  );

  return res.data;
}

export async function getPlanet(planet?: string): Promise<Planet> {
  const res = await axios.get(`https://swapi.dev/api/planets/${planet}`);

  return res.data;
}
