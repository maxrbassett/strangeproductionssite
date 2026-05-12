import React from "react";
import VideoGrid from "../components/VideoGrid";
import { earlyMoviesVideos } from "../data/videos";

const EarlyMovies = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">Early Movies</h1>
      <p className="page-subtitle">
        Where it all began — the founding films of Strange Productions.
      </p>
    </div>
    <VideoGrid
      videos={earlyMoviesVideos}
      showSearch
      placeholder="Search Early Movies…"
    />
  </div>
);

export default EarlyMovies;
