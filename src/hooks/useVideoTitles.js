import { useState, useEffect } from "react";

const cache = {};

export const useVideoTitles = (videos) => {
  const [titles, setTitles] = useState({});

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const missing = videos.filter(
      (v) => v.id && !cache[v.id]
    );

    if (missing.length === 0) {
      const cached = {};
      videos.forEach((v) => {
        if (v.id && cache[v.id]) cached[v.id] = cache[v.id];
      });
      setTitles(cached);
      return;
    }

    const fetches = missing.map((v) =>
      fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v.id}&format=json`
      )
        .then((r) => r.json())
        .then((data) => {
          cache[v.id] = data.title || `Video ${v.id}`;
          return { id: v.id, title: cache[v.id] };
        })
        .catch(() => {
          cache[v.id] = `Video ${v.id}`;
          return { id: v.id, title: cache[v.id] };
        })
    );

    Promise.all(fetches).then((results) => {
      const newTitles = { ...titles };
      results.forEach(({ id, title }) => {
        newTitles[id] = title;
      });
      // also fill in already-cached
      videos.forEach((v) => {
        if (v.id && cache[v.id]) newTitles[v.id] = cache[v.id];
      });
      setTitles(newTitles);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos]);

  return titles;
};
