import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getHistory } from "~/lib/history";
import { sendContact } from "~/lib/contact";
import { validateContactInput } from "~/lib/contact-schema";
import ShinyText from "~/components/reactbits/ShinyText";

const worshipReasons = [
  {
    title: "말씀에 순종하는 예배",
    description:
      "찬양은 감정의 표현을 넘어 말씀에 대한 순종입니다. 우리는 찬양을 통해 하나님이 누구신지 다시 고백합니다.",
  },
  {
    title: "공동체를 살리는 예배",
    description:
      "함께 부르는 한 곡이 서로의 믿음을 붙듭니다. 같은 고백을 반복할 때 공동체는 더 단단해집니다.",
  },
  {
    title: "감사를 배우는 예배",
    description:
      "찬양은 상황의 결론이 아니라 믿음의 시작입니다. 감사는 사역의 중심 태도이며 우리의 일상으로 이어집니다.",
  },
];

const feedCards = [
  { label: "Open Worship", title: "Beloved", color: "tone-wine" },
  { label: "Card News", title: "Partakers Card News", color: "tone-paper" },
  { label: "Monthly Worship", title: "공동체의 향기", color: "tone-sky" },
  { label: "Rebuilding", title: "만들어지는 아름다운 공동체", color: "tone-stone" },
  { label: "Discipleship", title: "가르치고 지키는 제자", color: "tone-cloud" },
  { label: "Identity", title: "Partakers Ministry", color: "tone-moss" },
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
        <h1>
          함께 예배하고
          <br />
          함께 자라갑니다
        </h1>
        <p className="hero-copy">
          우리는 말씀 중심의 청년 예배팀입니다. 매달의 예배와 기록을 통해
          하나님을 알아가고, 감사의 언어를 공동체 안에 남깁니다.
        </p>
        <div className="hero-actions">
          <a href="#worship" className="btn btn-primary">
            예배 이야기 보기
          </a>
          <a href="#join" className="btn btn-secondary">
            팀과 함께하기
          </a>
        </div>
      </section>

      <section className="js-reveal section-block" id="why">
        <div className="section-head">
          <p className="eyebrow">WHY WE WORSHIP</p>
          <h2>하나님을 찬양하는 이유</h2>
        </div>
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
          <h2>우리의 예배 히스토리</h2>
        </div>
        <article className="next-event">
          <p className="next-label">다음 모임</p>
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
          <h2>예배와 카드뉴스 기록</h2>
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
          <h2>우리 팀과 함께해 주세요</h2>
        </div>
        <p className="join-copy">
          사역 초청, 연합예배, 팀 참여 문의를 기다립니다. 함께 찬양하고 함께
          세워지는 공동체를 만들고 싶다면 지금 메시지를 남겨 주세요.
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
