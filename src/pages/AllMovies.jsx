import React from "react";
import VideoGrid from "../components/VideoGrid";
import { allVideos } from "../data/videos";

const AllMovies = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">All Movies</h1>
      <p className="page-subtitle">
        The complete Strange Productions archive — every film, every era.
      </p>
    </div>
    <VideoGrid
      videos={allVideos}
      showSearch
      placeholder="Search the full archive…"
    />
  </div>
);

export default AllMovies;
