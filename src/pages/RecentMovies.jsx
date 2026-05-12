import React from "react";
import VideoGrid from "../components/VideoGrid";
import { recentMoviesVideos } from "../data/videos";

const RecentMovies = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">Recent Movies</h1>
      <p className="page-subtitle">
        The latest chapter — fresh productions from the Strange studio.
      </p>
    </div>
    <VideoGrid
      videos={recentMoviesVideos}
      showSearch
      placeholder="Search Recent Movies…"
    />
  </div>
);

export default RecentMovies;
