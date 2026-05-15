/* global React, Icon */
function CardGrid({ eyebrow, title, items, onItemClick }) {
  return (
    <section className="surf-section">
      <div className="surf-container">
        <div className="surf-section-head">
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h2>{title}</h2>
          </div>
          <a className="btn btn-text">Alles bekijken <Icon name="arrow-right" size={16} /></a>
        </div>
        <div className="surf-card-grid">
          {items.map((c) => (
            <a key={c.title} className="surf-card" onClick={(e) => { e.preventDefault(); onItemClick && onItemClick(c); }}>
              <div className="icon"><Icon name={c.icon} size={24} stroke={2} /></div>
              <span className="eyebrow">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="more">Lees meer <Icon name="arrow-right" size={14} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { CardGrid });
