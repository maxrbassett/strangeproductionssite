import React from "react";
import VideoGrid from "../components/VideoGrid";
import { strangeWandererVideos } from "../data/videos";

const StrangeWanderer = () => (
  <div className="page">
    <div className="page-header">
      <h1 className="page-title">The Strange Wanderer</h1>
      <p className="page-subtitle">
        A series that follows the journey of the unexpected.
      </p>
    </div>
    <VideoGrid
      videos={strangeWandererVideos}
      showSearch
      placeholder="Search The Strange Wanderer…"
    />
  </div>
);

export default StrangeWanderer;
