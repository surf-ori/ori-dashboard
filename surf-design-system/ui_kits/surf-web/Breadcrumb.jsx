/* global React */
function Breadcrumb({ items, onNavigate }) {
  return (
    <nav className="surf-breadcrumb surf-container" aria-label="Kruimelpad">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="crumb-sep">/</span>}
          {i === items.length - 1
            ? <span className="current">{it.label}</span>
            : <a onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(it); }}>{it.label}</a>}
        </React.Fragment>
      ))}
    </nav>
  );
}
Object.assign(window, { Breadcrumb });
