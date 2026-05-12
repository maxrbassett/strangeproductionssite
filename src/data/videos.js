// Extracts YouTube video ID from various URL formats
export const getVideoId = (url) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

export const getThumbnail = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const getEmbedUrl = (id) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

// ─── RAW DATA ────────────────────────────────────────────────────────────────

const strangeWandererUrls = [
  "https://youtu.be/PXhqBfKKkF4?si=SZh35IzfvPzXeuGE",
  "https://youtu.be/skuZXK5ZJCM?si=oDjZkRVAlnArOdKA",
  "https://youtu.be/JCx9WP6DGp0?si=hnUXS1XPc-ceX_4i",
];

const earlyMoviesUrls = [
  "https://youtu.be/PXhqBfKKkF4?si=SZh35IzfvPzXeuGE",
  "https://youtu.be/aR9bFjwxyiU?si=PcAkfcgDTE_D6NQP",
  "https://youtu.be/SR2LJqHzmcQ?si=NfB-KcFovrWvbAva",
  "https://youtu.be/bxY9-F0ouZM?si=kU655FyLe7ydCqFS",
  "https://youtu.be/BoOua3AFmUw?si=r0IbFfFvffiL98CA",
  "https://youtu.be/QpN_0vDhNlw?si=_KWoNLsnLcC6-k7A",
  "https://youtu.be/hdQsdsgBxk4?si=xYOarJNVsFNBcStI",
  "https://youtu.be/sxUXDKWEE5I?si=dyqAACi0sB0sJ9Wn",
  "https://youtu.be/5cr4Ckvwcr0?si=1jRkFxx3QddYl0zq",
  "https://youtu.be/9rMRAnLig9w?si=7nJgp24Iku-kcZvV",
  "https://youtu.be/q1-1PWd0vYU?si=iaIsGuh4I7gJiX_C",
  "https://youtu.be/Rx00ix9tyBI?si=09EUr04ydhJIVkwG",
];

const recentMoviesUrls = [
  "https://youtu.be/1qE5tWuvYzQ?si=t_hVeX8rGdDYVU9-",
  "https://youtu.be/x6-EWniy9FM?si=p613M_WFq_oxDQK3",
  "https://youtu.be/PJtE9S_gNjM?si=zkLPjbAZDVGfLtPF",
  "https://youtu.be/JCx9WP6DGp0?si=6JBmlBStpjWEYzA7",
  "https://youtu.be/NHwAZtPPPSQ?si=YnM21daz9GdIyR2s",
  "https://youtu.be/ymJo-Qk2v_g?feature=shared",
  "https://youtu.be/gc-n3fZfkUg?si=IgRb5es1Kp8Dy_Lc",
  "https://youtu.be/Kv6q51mOfOE?si=WJSBF6c_MCcZsn9B",
];

// Convert URL arrays → video objects
const toVideoObj = (url, section) => {
  const id = getVideoId(url);
  return {
    id,
    url,
    section,
    embedUrl: getEmbedUrl(id),
    thumbnail: getThumbnail(id),
    // Title will be loaded asynchronously via oEmbed
    title: null,
  };
};

export const strangeWandererVideos = strangeWandererUrls.map((u) =>
  toVideoObj(u, "The Strange Wanderer")
);

export const earlyMoviesVideos = earlyMoviesUrls.map((u) =>
  toVideoObj(u, "Early Movies")
);

export const recentMoviesVideos = recentMoviesUrls.map((u) =>
  toVideoObj(u, "Recent Movies")
);

const guyGuyWorldUrls = [
  "https://youtu.be/TQgcGvrH9lE",
  "https://youtu.be/204jbUEWDFQ",
  "https://youtu.be/5SHNiUoMcYc",
  "https://youtu.be/N8t-7jry3Q0",
  "https://youtu.be/TsRV9v_SEEE",
  "https://youtu.be/g1u9X-_JvXM",
  "https://youtu.be/iiNo08mqVmg",
  "https://youtu.be/Smr8abi9yu8",
  "https://youtu.be/tDxEk0fI-GY",
  "https://youtu.be/khYmnvQnY4c",
];

export const guyGuyWorldVideos = guyGuyWorldUrls.map((u) =>
  toVideoObj(u, "Guy Guy World")
);

// De-duplicate by video ID across all sections for the "All Movies" page
const allRaw = [
  ...recentMoviesVideos,
  ...strangeWandererVideos,
  ...earlyMoviesVideos,
  ...guyGuyWorldVideos,
];

const seen = new Set();
export const allVideos = allRaw.filter(({ id }) => {
  if (seen.has(id)) return false;
  seen.add(id);
  return true;
});

export const GUY_GUY_CHANNEL = "https://www.youtube.com/@guyguyworldstudios";
