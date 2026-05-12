import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AllMovies from "./pages/AllMovies";
import StrangeWanderer from "./pages/StrangeWanderer";
import EarlyMovies from "./pages/EarlyMovies";
import RecentMovies from "./pages/RecentMovies";
import GuyGuyWorld from "./pages/GuyGuyWorld";
import MaxBassett from "./pages/MaxBassett";
import "./App.css";

const PAGES = {
  all:      AllMovies,
  recent:   RecentMovies,
  early:    EarlyMovies,
  wanderer: StrangeWanderer,
  guyguy:   GuyGuyWorld,
  max:      MaxBassett,
};

function App() {
  const [activePage, setActivePage] = useState("all");
  const PageComponent = PAGES[activePage] || AllMovies;

  return (
    <div className="app">
      <Navbar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        <PageComponent />
      </main>
      <footer className="site-footer">
        <p>© The Strange Productions — All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
