import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { mountBurrito } from "./engine";

const PLACES = [
  "JV's",
  "Lucha Libre",
  "Craft Taco",
  "Taco Surf",
  "Chacho's",
  "California Burritos",
  "Harry's",
  "Chuy's",
  "La Perla",
  "Adrian's",
  "Crack",
  "Burros & Fries",
  "El Papas Fritas",
  "Stars and Stripes",
  "El Viejón",
  "Casa de Maria",
  "Miguel's",
  "Vallarta Express",
  "La Puerta",
  "Mike's",
  "Tacos Tortas & More",
];

const RATE_KEY = "satb-place-rates";

export function Studio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [place, setPlace] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({});
  const api = useRef<Awaited<ReturnType<typeof mountBurrito>> | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    let alive = true;
    let started = false;
    const start = () => {
      if (!alive) return;
      const pending = audio.play();
      if (pending) pending.catch(() => {});
    };
    start();
    const mark = () => {
      started = true;
    };
    const keep = () => {
      if (alive && started && audio.paused) start();
    };
    audio.addEventListener("playing", mark);
    audio.addEventListener("pause", keep);
    audio.addEventListener("ended", start);
    const onVisible = () => {
      if (document.visibilityState === "visible") start();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pointerdown", start, true);
    window.addEventListener("keydown", start, true);
    return () => {
      alive = false;
      audio.removeEventListener("playing", mark);
      audio.removeEventListener("pause", keep);
      audio.removeEventListener("ended", start);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pointerdown", start, true);
      window.removeEventListener("keydown", start, true);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RATE_KEY);
      if (saved) setRates(JSON.parse(saved) as Record<string, number>);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dead = false;
    mountBurrito(canvas)
      .then((handle) => {
        if (dead) {
          handle.dispose();
          return;
        }
        api.current = handle;
        setReady(true);
      })
      .catch(() => setFailed(true));
    return () => {
      dead = true;
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  function rate(score: number) {
    if (!place) return;
    const next = { ...rates, [place]: score };
    setRates(next);
    localStorage.setItem(RATE_KEY, JSON.stringify(next));
  }

  return (
    <main className="studio">
      <audio
        ref={audioRef}
        className="track"
        src="/surf-and-turf.mp3"
        autoPlay
        loop
        preload="auto"
      />
      <h1>one of the most delicious items in san diego, rated.</h1>
      <p className="blog-link">
        <Link to="/blog/best-surf-and-turf-burrito-san-diego">blog</Link>
      </p>

      <section className="stage" aria-label="Burrito">
        <canvas ref={canvasRef} className="view" />
        {!ready && !failed && <p className="loading" aria-hidden="true" />}
        {failed && <img className="fallback" src="/anatomy/assembled.jpg" alt="" />}
        <div className="zoom">
          <button type="button" aria-label="Zoom out" onClick={() => api.current?.nudgeZoom(0.45)}>
            <Minus />
          </button>
          <button type="button" aria-label="Zoom in" onClick={() => api.current?.nudgeZoom(-0.45)}>
            <Plus />
          </button>
        </div>
      </section>

      <section className="invite">
        <h2>Rate the places.</h2>
        <div className="builds" role="list">
          {PLACES.map((name) => (
            <button
              key={name}
              type="button"
              className={place === name ? "on" : ""}
              onClick={() => setPlace(name)}
            >
              {name}
              {rates[name] ? ` ${rates[name]}` : ""}
            </button>
          ))}
        </div>
        {place && (
          <div className="scores" role="group" aria-label={`Rate ${place}`}>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={rates[place] === n ? "on" : ""}
                onClick={() => rate(n)}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
