/* global React, Icon */
function Hero({ onPrimary }) {
  return (
    <section className="surf-hero surf-container">
      <div className="surf-hero-grid">
        <div>
          <h1>
            Samen aanjagen<br /><span className="accent">van vernieuwing.</span>
          </h1>
          <p className="lead">
            Duik in onze richtlijnen, communicatiemiddelen en templates en draag bij aan een herkenbare en consistente huisstijl van SURF.
          </p>
          <div className="surf-hero-cta">
            <a className="btn btn-primary btn-lg" onClick={onPrimary}>
              Bekijk richtlijnen <Icon name="arrow-right" size={18} />
            </a>
            <a className="btn btn-outline btn-lg">
              <Icon name="download" size={18} /> Templates downloaden
            </a>
          </div>
        </div>
        <div className="basiskader">
          <img className="hero-photo"
               src="https://www.surf.nl/files/styles/scrollable_item/public/2025-12/surf_eur_dec2025_98.jpg?h=a5f3641b&itok=VwFCJl1I"
               alt="Studenten aan het werk op campus" />
          <div className="corner-accent">
            <img src="../../assets/logo/SURF_diap.svg" alt="SURF" />
          </div>
          <div className="label">Studenten · Erasmus Universiteit Rotterdam</div>
        </div>
      </div>
    </section>
  );
}
Object.assign(window, { Hero });
