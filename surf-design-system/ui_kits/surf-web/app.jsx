/* global React, Header, Hero, CardGrid, Footer, Breadcrumb, Icon */
const { useState } = React;

const RICHTLIJNEN = [
  { tag: "Richtlijn", icon: "feather", title: "Schrijfwijzer", body: "Hoe schrijven we bij SURF? Tone, casing en taalkeuze in één gids." },
  { tag: "Richtlijn", icon: "video",   title: "Video",        body: "Richtlijnen voor video — van interviews tot motion graphics." },
  { tag: "Richtlijn", icon: "camera",  title: "Fotografie",   body: "Beeldtaal, fotografiekeuzes en hoe je SURF in beeld brengt." },
  { tag: "Richtlijn", icon: "accessibility", title: "Digitale toegankelijkheid", body: "Maak je communicatie bruikbaar voor iedereen." },
];

const BASISELEMENTEN = [
  { tag: "Basis", icon: "type",         title: "Logo",         body: "Het SURF-logo, varianten, witruimte en wanneer welke versie." },
  { tag: "Basis", icon: "text",         title: "Lettertype",   body: "Nunito voor koppen, Source Sans Pro voor bodytekst." },
  { tag: "Basis", icon: "palette",      title: "Kleuren",      body: "Oranje en zwart als basis, met een rijk palet aan steunkleuren." },
  { tag: "Basis", icon: "shapes",       title: "Iconen",       body: "Vlakke lijniconen — open, rond en altijd in één kleur." },
  { tag: "Basis", icon: "square-dashed",title: "SURF basiskader", body: "Het zwarte kader dat onze beeldcomposities samenbrengt." },
];

const COLORS_DOC = [
  { name: "Oranje",        hex: "#E67300", dark: true },
  { name: "Zwart",         hex: "#000000", dark: true },
  { name: "Grijs",         hex: "#CCCCCC", dark: false },
  { name: "Rood",          hex: "#DF3226", dark: true },
  { name: "Geel",          hex: "#FEDB00", dark: false },
  { name: "Blauw",         hex: "#0077C0", dark: true },
  { name: "Donker groen",  hex: "#008942", dark: true },
  { name: "Licht groen",   hex: "#B8E3C9", dark: false },
  { name: "Paars",         hex: "#772583", dark: true },
];

function HomePage({ go }) {
  return (
    <main>
      <Hero onPrimary={() => go({ page: "list", topic: "Richtlijnen" })} />
      <CardGrid
        eyebrow="Onze richtlijnen"
        title="Voor herkenbare communicatie"
        items={RICHTLIJNEN}
        onItemClick={(c) => go({ page: "detail", topic: c.title, parent: "Richtlijnen" })}
      />
      <CardGrid
        eyebrow="Basiselementen"
        title="De bouwstenen van de huisstijl"
        items={BASISELEMENTEN}
        onItemClick={(c) => go({ page: "detail", topic: c.title, parent: "Basiselementen" })}
      />
    </main>
  );
}

function ListPage({ topic, go }) {
  const items = topic === "Richtlijnen" ? RICHTLIJNEN : BASISELEMENTEN;
  return (
    <main>
      <Breadcrumb
        items={[{ label: "Home", key: "home" }, { label: topic, key: topic }]}
        onNavigate={(it) => go(it.key === "home" ? { page: "home" } : { page: "list", topic })}
      />
      <section className="surf-container" style={{ padding: "16px 0 8px" }}>
        <h1 style={{ font: "900 56px/1.05 var(--font-display)", letterSpacing: "-0.02em", margin: "12px 0 8px" }}>
          {topic}
        </h1>
        <p style={{ font: "400 19px/1.55 var(--font-body)", color: "var(--fg-2)", maxWidth: "44em", margin: 0 }}>
          {topic === "Richtlijnen"
            ? "Hoe we communiceren namens SURF — van tekst tot video, van fotografie tot toegankelijkheid."
            : "De visuele bouwstenen van het SURF-merk: logo, lettertype, kleuren, iconen en het basiskader."}
        </p>
      </section>
      <CardGrid
        title="Onderwerpen"
        items={items}
        onItemClick={(c) => go({ page: "detail", topic: c.title, parent: topic })}
      />
    </main>
  );
}

function DetailPage({ topic, parent, go }) {
  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", key: "home" },
          { label: parent, key: parent },
          { label: topic },
        ]}
        onNavigate={(it) => go(
          it.key === "home" ? { page: "home" }
          : it.key === parent ? { page: "list", topic: parent }
          : { page: "home" }
        )}
      />
      <div className="surf-container">
        <div className="surf-detail-grid">
          <aside className="surf-side-nav">
            {(parent === "Basiselementen" ? BASISELEMENTEN : RICHTLIJNEN).map((it) => (
              <a key={it.title}
                 className={it.title === topic ? "active" : ""}
                 onClick={() => go({ page: "detail", topic: it.title, parent })}>
                {it.title}
              </a>
            ))}
          </aside>
          <article className="surf-prose">
            {topic === "Kleuren" ? <ColorsArticle /> : <GenericArticle topic={topic} />}
          </article>
        </div>
      </div>
    </main>
  );
}

function ColorsArticle() {
  const basics = COLORS_DOC.slice(0, 3);
  const support = COLORS_DOC.slice(3);
  return (
    <>
      <h1>Kleuren</h1>
      <p className="lead">
        Ons kleurenpallet bepaalt de visuele hiërarchie voor het ontwerp. Bij SURF gaan we uit van twee basiskleuren, daarnaast vullen we dit aan met steunkleuren.
      </p>
      <h2>Basiskleuren</h2>
      <p>De basiskleuren van SURF zijn oranje en zwart. Van hieruit zijn er een aantal lichtere varianten zoals licht grijs en lichtere kleuren oranje.</p>
      <div className="surf-color-row">
        {basics.map((c) => (
          <div key={c.hex} className={`surf-color-chip ${c.dark ? "dark" : ""}`} style={{ background: c.hex }}>
            <div className="nm">{c.name}</div><div className="hx">{c.hex}</div>
          </div>
        ))}
      </div>
      <h2>Steunkleuren</h2>
      <p>Deze steunkleuren laten de diversiteit van SURF zien. Daarnaast worden deze kleuren gebruikt om iets te benadrukken voor de kijker.</p>
      <div className="surf-color-row">
        {support.map((c) => (
          <div key={c.hex} className={`surf-color-chip ${c.dark ? "dark" : ""}`} style={{ background: c.hex }}>
            <div className="nm">{c.name}</div><div className="hx">{c.hex}</div>
          </div>
        ))}
      </div>
      <h2>Kleuren met transparante versies</h2>
      <p>De transparante kleuren zijn 80% transparant en worden gebruikt om kleurvlakken over fotografie te leggen.</p>
    </>
  );
}

function GenericArticle({ topic }) {
  return (
    <>
      <h1>{topic}</h1>
      <p className="lead">
        Hier vind je de richtlijnen en assets voor <b>{topic.toLowerCase()}</b> bij SURF. Volg deze om een herkenbare en consistente huisstijl te bewaren.
      </p>
      <h2>Wat is het?</h2>
      <p>Een korte beschrijving van het onderwerp en hoe het zich verhoudt tot de rest van het SURF-merk. Deze pagina is een placeholder in het UI-kit; de echte tekst staat op het merkportaal.</p>
      <h2>Hoe gebruik je het?</h2>
      <p>Praktische tips, do's en don'ts en links naar templates die je direct kunt downloaden.</p>
      <p>Heb je vragen? Stuur je vraag per e-mail naar <a style={{ color: "var(--surf-orange)" }}>communicatie@surf.nl</a>.</p>
    </>
  );
}

function App() {
  const [route, setRoute] = useState({ page: "home" });
  const navigateTopBar = (it) => {
    if (it === "Richtlijnen" || it === "Basiselementen") setRoute({ page: "list", topic: it });
    else setRoute({ page: "home" });
  };
  return (
    <div className="surf-page">
      <Header
        active={route.page === "home" ? "" : (route.parent || route.topic)}
        onNavigate={navigateTopBar}
      />
      {route.page === "home"   && <HomePage   go={setRoute} />}
      {route.page === "list"   && <ListPage   topic={route.topic} go={setRoute} />}
      {route.page === "detail" && <DetailPage topic={route.topic} parent={route.parent} go={setRoute} />}
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
