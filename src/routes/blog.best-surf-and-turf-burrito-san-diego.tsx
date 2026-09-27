import { createFileRoute, Link } from "@tanstack/react-router";
import { PLACES, PUBLIC_STARS } from "@/lib/blog-places";

const CANONICAL = "https://surfandturfburrito.com/blog/best-surf-and-turf-burrito-san-diego";
const TITLE = "Best Surf and Turf Burrito in San Diego";
const DESCRIPTION =
  "Where to find the best surf and turf burrito in San Diego. Steak and shrimp burritos compared from what people are actually saying — JV's, Lucha Libre, Vallarta Express, Chuy's, and the rest of the board.";

export const Route = createFileRoute("/blog/best-surf-and-turf-burrito-san-diego")({
  head: () => ({
    meta: [
      { title: `${TITLE} | Surf & Turf Burrito` },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: "2026-09-27",
          dateModified: "2026-09-27",
          author: { "@type": "Organization", name: "Surf & Turf Burrito" },
          mainEntityOfPage: CANONICAL,
          about: PLACES.map((place) => ({
            "@type": "Restaurant",
            name: place.name,
            address: place.address,
            servesCuisine: "Mexican",
          })),
        }),
      },
    ],
  }),
  component: Article,
});

function Stars({ id }: { id: string }) {
  const rating = PUBLIC_STARS[id];
  if (!rating) return null;
  const width = `${Math.max(0, Math.min(100, (rating.stars / 5) * 100))}%`;
  return (
    <p className="rating">
      <span className="stars" aria-label={`${rating.stars} out of 5`}>
        <span className="stars-base" aria-hidden="true">
          ★★★★★
        </span>
        <span className="stars-fill" style={{ width }} aria-hidden="true">
          ★★★★★
        </span>
      </span>
      <span>
        {rating.stars.toFixed(1)} · {rating.source} · {rating.reviews}
      </span>
    </p>
  );
}

function Article() {
  return (
    <article className="essay">
      <p className="mark">
        <Link to="/">Surf & Turf Burrito</Link>
      </p>
      <h1>Best surf and turf burrito in San Diego</h1>
      <p className="dek">
        Steak and shrimp, in a tortilla, somewhere in this city. The expensive one is not automatically the best one.
      </p>

      <h2>Why this is the place to look</h2>
      <p>
        Search “best surf and turf burrito San Diego,” “surf and turf burrito near me,” or “steak and shrimp burrito San Diego” and you get restaurant stars, delivery apps, and a $27 harbor plate sitting next to a $15 taco-shop monument. Those are different meals. A Google rating is what people think of the room. It is not what they think of this burrito.
      </p>
      <p>
        This is the page that separates those two things. The places below are real San Diego counters and dining rooms that actually come up when the city talks about steak and shrimp in a tortilla. Each note is an opinion formed from what is already public — Eater, San Diego Reader, Thrillist, Yelp, Google, Uber Eats, DoorDash, Toast menus, and a 2026 local thread that asked this exact question. Nothing here is a personal bite score. Those get added after the burrito is eaten. Until then, the job is to read the chorus without letting the most famous shop, or the most expensive one, win by default.
      </p>
      <p>
        If you only remember one rule: size, shrimp, tortilla, sauce, ratio, and price are different votes. A forearm burrito can still be a muddy one. A $27 wet burrito on the pier can be excellent and still be the wrong answer to “best.” Vallarta Express keeps getting named when the brief is big shrimp and a taco-shop price. JV’s is the two-tortilla classic people drive back for. Lucha Libre is the California version the city already knows by name. Chuy’s is the one delivery customers agree on in large numbers. The Craft Taco is the one reviewers describe as composed. Start with the question you actually have. Then read what people are saying.
      </p>

      <h2>What people are saying</h2>
      <p>
        The stars are the restaurant’s overall rating on other sites. They are not a score of the surf and turf burrito.
      </p>
      <nav className="index" aria-label="Places">
        {PLACES.map((place) => (
          <a key={place.id} href={`#${place.id}`}>
            {place.name}
          </a>
        ))}
      </nav>

      {PLACES.map((place) => (
        <section key={place.id} id={place.id} className="place">
          <h3>{place.name}</h3>
          <Stars id={place.id} />
          <p className="meta">
            {place.neighborhood}
            <span>{place.burrito}</span>
          </p>
          <p className="where">{place.address}</p>
          <p className="price">{place.price}</p>
          <h4>What people are saying</h4>
          <p>{place.saying}</p>
        </section>
      ))}

      <h2>Where to start</h2>
      <p>
        The public record does not crown a single winner, and this page will not invent one. It does point. For the classic San Diego surf and turf burrito, start at JV’s in Bay Park. For steak, shrimp, and a price that still feels like a taco shop, start at Vallarta Express on Garnet. For the fry-and-chipotle California that people already argue about, start at Lucha Libre. For shrimp that reviewers say are actually large, detour to The Craft Taco in Sorrento Valley. For the delivery-app landslide, Chuy’s. For the harbor version that makes the price obvious, Miguel’s at Portside Pier — and split it.
      </p>
      <p>
        Adrian’s stays listed so a grill named surf and turf does not get mistaken for a burrito it may not sell. Several other shops are on the board because the item exists and the essays do not. That is an honest gap, not a soft score.
      </p>
      <p className="back">
        <Link to="/">Back to the burrito</Link>
      </p>
    </article>
  );
}
