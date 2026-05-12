import React from "react";
import VideoGrid from "../components/VideoGrid";
import { guyGuyWorldVideos } from "../data/videos";

const GuyGuyWorld = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">Guy Guy World</h1>
      <p className="page-subtitle">
        A universe of its own — all Guy Guy World Studios films.
      </p>
    </div>
    <VideoGrid
      videos={guyGuyWorldVideos}
      showSearch
      placeholder="Search Guy Guy World…"
    />
  </div>
);

export default GuyGuyWorld;
