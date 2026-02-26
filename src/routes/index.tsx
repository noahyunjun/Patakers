import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getHistory } from "~/lib/history";
import { sendContact } from "~/lib/contact";
import { validateContactInput } from "~/lib/contact-schema";
import ShinyText from "~/components/reactbits/ShinyText";

const worshipReasons = [
  {
    title: "말씀 중심",
    description: "하나님의 성품을 기준으로 예배를 준비합니다.",
  },
  {
    title: "공동체 중심",
    description: "함께 부르는 고백으로 서로의 믿음을 붙듭니다.",
  },
  {
    title: "지속 가능한 기록",
    description: "예배와 메시지를 남겨 다음 세대와 공유합니다.",
  },
];

const feedCards = [
  { label: "Open Worship", title: "Beloved", color: "tone-wine" },
  { label: "Card News", title: "Partakers Card News", color: "tone-paper" },
  { label: "Monthly Worship", title: "공동체의 향기", color: "tone-sky" },
];

export const Route = createFileRoute("/")({
  loader: () => ({ history: getHistory() }),
  component: Home,
});

function Home() {
  const { history } = Route.useLoaderData();
  const heroRef = useRef<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".js-reveal");
    document.documentElement.classList.add("motion-ready");

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("in-view"));
      return () => {
        document.documentElement.classList.remove("motion-ready");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    let raf = 0;

    const updateParallax = () => {
      if (!heroRef.current) return;
      const shift = Math.min(window.scrollY * 0.12, 36);
      heroRef.current.style.setProperty("--hero-shift", `${shift.toFixed(2)}px`);
      raf = 0;
    };

    const handleScroll = () => {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = validateContactInput({ name, email, message });
    if (!parsed.ok) {
      setResultMessage(parsed.message);
      return;
    }

    setIsSubmitting(true);
    setResultMessage(null);

    try {
      const result = await sendContact({ data: parsed.data });
      if (result.ok) {
        setResultMessage("문의가 접수되었습니다. 3일 내로 회신드릴게요.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setResultMessage(result.message);
      }
    } catch {
      setResultMessage("전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="landing-shell">
      <section ref={heroRef} className="hero js-reveal in-view" id="top">
        <p className="eyebrow hero-eyebrow">PARTAKERS MINISTRY</p>
        <div className="hero-brand">
          <ShinyText className="hero-brand-text" shimmerWidth={220} speed={3.4}>
            Partakers
          </ShinyText>
        </div>
        <p className="hero-kicker">ONE TEAM. ONE WORSHIP.</p>
        <h1 className="hero-title">함께 예배하고, 함께 자랍니다.</h1>
        <p className="hero-copy">
          말씀 중심의 청년 예배팀이 매달 예배와 기록으로 공동체를 세웁니다.
        </p>
        <p className="hero-subline">
          한 번의 모임이 끝나도, 고백은 계속 남아 다음 예배를 준비합니다.
        </p>
        <div className="hero-metrics" aria-label="Partakers 핵심 지표">
          <div className="metric">
            <strong>Monthly</strong>
            <span>Open Worship</span>
          </div>
          <div className="metric">
            <strong>Word-Driven</strong>
            <span>Message First</span>
          </div>
          <div className="metric">
            <strong>Community</strong>
            <span>Grow Together</span>
          </div>
        </div>
        <div className="hero-actions">
          <a href="#worship" className="btn btn-primary">
            예배 흐름 보기
          </a>
          <a href="#join" className="btn btn-secondary">
            지금 함께하기
          </a>
        </div>
      </section>

      <section className="js-reveal section-block spotlight-block" id="why">
        <div className="section-head">
          <p className="eyebrow">WHY WE WORSHIP</p>
          <h2>우리는 예배를 사역의 중심에 둡니다</h2>
        </div>
        <p className="section-statement">
          감정보다 기준을 먼저 세우고, 한 곡의 고백이 공동체를 세우도록 만듭니다.
        </p>
        <div className="reason-grid">
          {worshipReasons.map((reason, index) => (
            <article key={reason.title} className="reason-card" style={{ transitionDelay: `${index * 90}ms` }}>
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="js-reveal section-block" id="worship">
        <div className="section-head">
          <p className="eyebrow">WORSHIP HISTORY</p>
          <h2>최근 예배의 흐름</h2>
        </div>
        <article className="next-event">
          <p className="next-label">Next Gathering</p>
          <h3>Open Worship · BELOVED</h3>
          <p>2026.02.21 (토) 6:00 PM · 예능교회 비전홀</p>
          <small>1 John 5:3-4 · This is love for God: to obey his commands.</small>
        </article>
        <div className="history-track">
          {history.map((item, index) => (
            <article key={item.year} className="history-item" style={{ transitionDelay: `${index * 80}ms` }}>
              <span className="history-year">{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="js-reveal section-block" id="archive">
        <div className="section-head">
          <p className="eyebrow">MESSAGE ARCHIVE</p>
          <h2>남겨진 기록이 다음 예배를 만듭니다</h2>
        </div>
        <div className="feed-grid">
          {feedCards.map((card, index) => (
            <article key={card.title} className={`feed-card ${card.color}`} style={{ transitionDelay: `${index * 70}ms` }}>
              <span>{card.label}</span>
              <h3>{card.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="js-reveal section-block join-block" id="join">
        <div className="section-head">
          <p className="eyebrow">JOIN US</p>
          <h2>한 번의 문의가 다음 예배를 시작합니다</h2>
        </div>
        <p className="join-copy">
          사역 초청, 연합예배, 팀 참여 문의를 기다립니다. 함께 세워질 준비가
          되었다면 지금 메시지를 남겨 주세요.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">이름</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="홍길동"
          />

          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />

          <label htmlFor="message">메시지</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="사역/협력/초청 관련 내용을 남겨주세요"
          />

          <button type="submit" disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? "전송 중..." : "함께하기 문의 보내기"}
          </button>
        </form>
        {resultMessage ? <p className="result-message">{resultMessage}</p> : null}
      </section>
    </main>
  );
}
