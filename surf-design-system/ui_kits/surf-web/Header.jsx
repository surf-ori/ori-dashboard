/* global React */
const { useState } = React;

function Icon({ name, size = 20, stroke = 2, color = "currentColor" }) {
  // Render via Lucide. Lucide is globally available via UMD.
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) {
      ref.current.setAttribute("data-lucide", name);
      window.lucide.createIcons({
        attrs: { "stroke-width": stroke, width: size, height: size, stroke: color },
        nameAttr: "data-lucide",
        elements: [ref.current],
      });
    }
  }, [name, size, stroke, color]);
  return <i ref={ref} data-lucide={name} style={{ display: "inline-flex" }} />;
}

function Wordmark({ variant = "fc", height = 42 }) {
  const src = variant === "diap"
    ? "../../assets/logo/SURF_diap.svg"
    : "../../assets/logo/SURF_fc.svg";
  return (
    <a className="surf-wordmark" href="#" aria-label="SURF">
      <img src={src} alt="SURF" style={{ height, display: "block" }} />
    </a>
  );
}

function Header({ active = "Basiselementen", onNavigate }) {
  const items = ["Richtlijnen", "Basiselementen", "Downloads", "Over SURF"];
  return (
    <header className="surf-header">
      <div className="surf-container surf-header-inner">
        <Wordmark />
        <nav className="surf-nav">
          {items.map((it) => (
            <a
              key={it}
              className={it === active ? "active" : ""}
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(it); }}
            >{it}</a>
          ))}
        </nav>
        <div className="surf-header-actions">
          <button className="surf-search" aria-label="Zoeken">
            <Icon name="search" size={16} /> Zoeken op merkportaal…
          </button>
          <a className="btn btn-primary btn-sm">Inloggen</a>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Header, Wordmark, Icon });
