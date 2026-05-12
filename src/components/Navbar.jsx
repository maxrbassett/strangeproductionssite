import React, { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  { id: "all",      label: "All Movies" },
  { id: "recent",   label: "Recent Movies" },
  { id: "early",    label: "Early Movies" },
  { id: "wanderer", label: "The Strange Wanderer" },
  { id: "guyguy",   label: "Guy Guy World" },
  { id: "max",      label: "maxbassettcreative" },
];

const Navbar = ({ activePage, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeItem = NAV_ITEMS.find((n) => n.id === activePage) || NAV_ITEMS[0];

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleNav = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNav("all")}>
        <span className="logo-text">THE STRANGE</span>
        <span className="logo-sub">PRODUCTIONS</span>
      </div>

      <div className="nav-dropdown" ref={dropdownRef}>
        <button
          className={"nav-trigger" + (open ? " open" : "")}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="nav-trigger-label">{activeItem.label}</span>
          <span className={"nav-caret" + (open ? " open" : "")}>▾</span>
        </button>

        {open && (
          <ul className="nav-menu" role="listbox">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} role="option" aria-selected={activePage === item.id}>
                <button
                  className={"nav-menu-item" + (activePage === item.id ? " active" : "")}
                  onClick={() => handleNav(item.id)}
                >
                  {activePage === item.id && <span className="nav-check">▸</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
