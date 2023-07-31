import { useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function ISSTracker({ fetcher }) {
  const { data, isLoading, error, mutate } = useSWR(URL, fetcher);

  if (isLoading) {
    return <h1>Loading data...</h1>;
  }

  if (error) {
    return <h1>An error occurred: {error.status}</h1>;
  }

  return (
    <main>
      <Map longitude={data.longitude} latitude={data.latitude} />
      <Controls
        longitude={data.longitude}
        latitude={data.latitude}
        onRefresh={() => mutate()}
      />
    </main>
  );
}
