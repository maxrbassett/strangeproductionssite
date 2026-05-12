import React, { useState, useMemo, useRef, useCallback } from "react";
import VideoCard from "./VideoCard";
import SearchBar from "./SearchBar";
import VideoModal from "./VideoModal";
import { useVideoTitles } from "../hooks/useVideoTitles";

// Fisher-Yates shuffle
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// prefetchedTitles: optional { [videoId]: string } — skips oEmbed for these
const VideoGrid = ({ videos, showSearch = true, placeholder, prefetchedTitles = {} }) => {
  const [query, setQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);
  const shuffleQueue = useRef([]);

  const needsOembed = useMemo(
    () => videos.filter((v) => !prefetchedTitles[v.id]),
    [videos, prefetchedTitles]
  );
  const oembedTitles = useVideoTitles(needsOembed);

  const titles = useMemo(
    () => ({ ...oembedTitles, ...prefetchedTitles }),
    [oembedTitles, prefetchedTitles]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return videos;
    const q = query.toLowerCase();
    return videos.filter((v) => {
      const t = (titles[v.id] || "").toLowerCase();
      return t.includes(q) || (v.section || "").toLowerCase().includes(q);
    });
  }, [videos, query, titles]);

  // Pull next video from queue, refilling when exhausted
  const nextShuffleVideo = useCallback((excludeId = null) => {
    if (shuffleQueue.current.length === 0) {
      shuffleQueue.current = shuffle(videos).filter((v) => v.id !== excludeId);
    }
    return shuffleQueue.current.shift() || videos[0];
  }, [videos]);

  const startShuffle = () => {
    shuffleQueue.current = [];
    const first = nextShuffleVideo();
    setIsShuffle(true);
    setActiveVideo(first);
  };

  const handleNext = () => {
    const next = nextShuffleVideo(activeVideo?.id);
    setActiveVideo(next);
  };

  const handleClose = () => {
    setActiveVideo(null);
    setIsShuffle(false);
    shuffleQueue.current = [];
  };

  return (
    <div className="video-grid-section">
      {showSearch && (
        <div className="grid-toolbar">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={placeholder || "Search videos…"}
          />
          <button className="shuffle-btn" onClick={startShuffle} title="Shuffle Play">
            <span className="shuffle-icon">⇄</span>
            Shuffle Play
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="no-results">
          <p>No videos found for "<strong>{query}</strong>"</p>
        </div>
      ) : (
        <div className="video-grid">
          {filtered.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              title={titles[video.id]}
              onPlay={(v) => { setIsShuffle(false); setActiveVideo(v); }}
            />
          ))}
        </div>
      )}

      {activeVideo && (
        <VideoModal
          video={activeVideo}
          title={titles[activeVideo.id]}
          onClose={handleClose}
          isShuffle={isShuffle}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default VideoGrid;
