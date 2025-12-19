import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  dish: { name: string; image: string };
};

const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + "/";

const withBase = (path: string) => `${base}${path.replace(/^\/+/, "")}`;


const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcos Antonio",
    date: "15 de abril, 2024",
    rating: 5,
    comment:
      "Muy bien atendidos, la comida excelente. Porciones abundantes. El lugar onda bodegón, hambiente familiar… ¡lo recomiendo! 👍",
    dish: { name: "Vacio al horno", image: withBase("img/vacio-horno.jpg") },
  },
  {
    id: 2,
    name: "Karen Chernak",
    date: "3 de mayo, 2023",
    rating: 5,
    comment:
      "Siempre vamos con mi familia. Tanto la atención como la comida es espectacular… Su flan es una delicia.",
    dish: { name: "Flan con dulce de leche", image: withBase("img/flan-porcion.jpg") },
  },
  {
    id: 3,
    name: "Ricardo Gabriel Silva",
    date: "28 de enero, 2022",
    rating: 5,
    comment:
      "Excelente atención!!! La comida una delicia, manjar!!! Recomendable 100%.",
    dish: { name: "Canelones", image: withBase("img/canelones.jpg") },
  },
];

export function TestimonialsCarousel() {
  // Elegí tu modo:
  // - true  => carrusel infinito (1-2-3-1-2-3...)
  // - false => finito y se ocultan flechas en los extremos
  const INFINITE = true;

  const trackRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const lastIndex = Math.max(0, testimonials.length - 1);

  const getStep = () => {
    const el = trackRef.current;
    if (!el) return 0;

    const slideWidth = firstSlideRef.current?.clientWidth ?? el.clientWidth;

    // en flex con gap, la distancia real entre inicios es width + gap
    const styles = getComputedStyle(el);
    const gapStr = (styles.columnGap || styles.gap || "0").toString();
    const gap = Number.parseFloat(gapStr) || 0;

    return slideWidth + gap;
  };

  const getCurrentIndex = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const step = getStep();
    if (!step) return 0;
    return Math.round(el.scrollLeft / step);
  };

  const go = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;

    const step = getStep();
    if (!step) return;

    const current = getCurrentIndex();
    let next = dir === "next" ? current + 1 : current - 1;

    if (INFINITE) {
      if (next > lastIndex) next = 0;
      if (next < 0) next = lastIndex;
    } else {
      next = Math.max(0, Math.min(lastIndex, next));
    }

    el.scrollTo({ left: next * step, behavior: "smooth" });
    setIndex(next);
  };

  // Mantener index sincronizado si el usuario hace scroll con mouse/touchpad/touch
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = getCurrentIndex();
        // clamp por si el usuario scrollea raro
        const clamped = Math.max(0, Math.min(lastIndex, i));
        setIndex(clamped);
      });
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [lastIndex]);

  const showPrev = INFINITE || index > 0;
  const showNext = INFINITE || index < lastIndex;

  return (
    <div className="container-max">
      <h2 className="section-title">Lo que dice nuestra familia</h2>
      <p className="muted-center">
        Historias de nuestros queridos clientes que nos han acompañado durante generaciones.
      </p>

      <div className="relative">
        {/* pista: 1 slide por vez */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2
                     [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={i === 0 ? firstSlideRef : undefined}
              className="snap-start shrink-0 basis-full min-w-full"
            >
              {/* tarjeta grande */}
              <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden bg-white border border-black/10 shadow-mdx">
                {/* imagen izquierda */}
                <div className="relative h-[300px] md:h-full min-h-[300px]">
                  <img
                    src={t.dish.image}
                    alt={t.dish.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <h3 className="text-white font-semibold text-lg drop-shadow">{t.dish.name}</h3>
                  </div>
                </div>

                {/* texto derecha */}
                <div className="p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* estrellas */}
                    <div className="flex gap-1 text-primary" role="img" aria-label={`${t.rating} estrellas de 5`}>
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" width="18" height="18" className="fill-current">
                          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="text-[1.05rem] leading-relaxed italic">
                      “{t.comment}”
                    </blockquote>
                  </div>

                  <hr className="border-line my-6" />

                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* flechas */}
        {showPrev && (
          <button
            onClick={() => go("prev")}
            className="grid place-items-center absolute left-2 md:-left-12 top-1/2 -translate-y-1/2
                     w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 border border-black/10 shadow-md hover:bg-white"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M15 18l-6-6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {showNext && (
          <button
            onClick={() => go("next")}
            className="grid place-items-center absolute right-2 md:-right-12 top-1/2 -translate-y-1/2
                     w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 border border-black/10 shadow-md hover:bg-white"
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M9 6l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}