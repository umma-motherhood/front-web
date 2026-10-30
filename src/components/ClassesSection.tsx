import { siteConfig } from "@/config/site";

export function ClassesSection() {
  return (
    <section
      id="kelas"
      aria-labelledby="kelas-title"
      className="py-[clamp(64px,9vw,110px)] border-t border-line/60"
    >
      <div className="max-w-[1120px] w-[calc(100%-40px)] mx-auto">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2.5 text-rosewood text-[0.76rem] font-bold tracking-[0.12em] uppercase before:content-[''] before:w-7 before:h-px before:bg-current">
            01 / Belajar &amp; berbagi
          </span>
          <h2
            id="kelas-title"
            className="mt-3.5 mb-2 text-[clamp(2.2rem,5vw,3.6rem)] font-serif font-normal text-ink tracking-tight"
          >
            Kelas &amp; Ruang Berbagi
          </h2>
        </div>

        <div className="border-t border-line">
          {siteConfig.classes.map((item, index) => {
            const indentClass =
              index === 1
                ? "md:pl-16 lg:pl-24"
                : index === 2
                ? "md:pl-8 lg:pl-12"
                : "";

            return (
              <article
                key={item.number}
                className={`grid grid-cols-[36px_1fr] sm:grid-cols-[48px_1fr] md:grid-cols-[70px_minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-3 sm:gap-5 md:gap-7 py-7 border-b border-line transition-colors hover:bg-warm-sand/20 ${indentClass}`}
              >
                <span className="text-rosewood font-serif text-[1.2rem] font-semibold">
                  {item.number}
                </span>
                <h3 className="text-ink font-serif text-[clamp(1.25rem,2.5vw,1.65rem)] font-medium leading-tight">
                  {item.title}
                </h3>
                <p className="col-start-2 md:col-start-3 text-muted text-[1.02rem] leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
