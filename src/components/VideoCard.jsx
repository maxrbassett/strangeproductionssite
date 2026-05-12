import React, { useState } from "react";

const VideoCard = ({ video, title, onPlay }) => {
  const [imgError, setImgError] = useState(false);
  const displayTitle = title || "Loading…";

  return (
    <div className="video-card" onClick={() => onPlay(video)}>
      <div className="card-thumb">
        {!imgError ? (
          <img
            src={video.thumbnail}
            alt={displayTitle}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="thumb-fallback">
            <span>▶</span>
          </div>
        )}
        <div className="card-overlay">
          <div className="play-btn">▶</div>
        </div>
        {video.section && (
          <div className="card-badge">{video.section}</div>
        )}
      </div>
      <div className="card-info">
        <p className="card-title">{displayTitle}</p>
      </div>
    </div>
  );
};

export default VideoCard;
