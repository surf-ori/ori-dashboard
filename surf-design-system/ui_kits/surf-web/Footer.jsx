/* global React, Icon */
function Footer() {
  return (
    <footer className="surf-footer">
      <div className="surf-container">
        <div className="surf-footer-top">
          <div>
            <img src="../../assets/logo/SURF_diap.svg" alt="SURF"
                 style={{ height: 56, filter: "invert(1)", marginBottom: 24, display: "block" }} />
            <div className="tagline">Samen aanjagen van <span className="accent">vernieuwing.</span></div>
          </div>
          <div>
            <h4>Algemeen</h4>
            <ul>
              <li><a>Over SURF</a></li>
              <li><a>Contact</a></li>
              <li><a>Downloads</a></li>
              <li><a>Vacatures</a></li>
            </ul>
          </div>
          <div>
            <h4>Volg ons</h4>
            <ul>
              <li><a><Icon name="globe" size={14} />&nbsp;&nbsp;social.edu.nl/@SURF</a></li>
              <li><a><Icon name="linkedin" size={14} />&nbsp;&nbsp;LinkedIn</a></li>
              <li><a><Icon name="youtube" size={14} />&nbsp;&nbsp;YouTube</a></li>
              <li><a><Icon name="mail" size={14} />&nbsp;&nbsp;communicatie@surf.nl</a></li>
            </ul>
          </div>
        </div>
        <div className="surf-footer-bottom">
          <div>© Coöperatie SURF U.A. · Hoog Overborch · Utrecht</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a>Privacy</a><a>Toegankelijkheid</a><a>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
Object.assign(window, { Footer });
