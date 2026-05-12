import React, { useEffect } from "react";

const VideoModal = ({ video, title, onClose, isShuffle, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && isShuffle) onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, isShuffle, onNext]);

  if (!video) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        <div className="modal-topbar">
          <div className="modal-title">{title || "Playing…"}</div>
          <div className="modal-controls">
            {isShuffle && (
              <button className="modal-next" onClick={onNext} title="Next random video (→)">
                <span className="shuffle-icon">⇄</span> Next
              </button>
            )}
            <button className="modal-close" onClick={onClose} title="Close (Esc)">✕</button>
          </div>
        </div>

        <div className="modal-iframe-wrap">
          <iframe
            key={video.id}
            src={video.embedUrl}
            title={title || "Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {isShuffle && (
          <div className="modal-shuffle-hint">
            Shuffle mode — press <kbd>→</kbd> or click Next for a random video
          </div>
        )}

      </div>
    </div>
  );
};

export default VideoModal;
