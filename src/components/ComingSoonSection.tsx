export function ComingSoonSection() {
  return (
    <section
      aria-labelledby="agenda-title"
      className="max-w-[1120px] w-[calc(100%-40px)] mx-auto py-16 md:py-20 border-b border-line"
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,0.75fr)_minmax(0,1.25fr)] gap-6 md:gap-10 items-start">
        <div>
          <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-moss rounded-[2px] text-moss text-[0.74rem] font-bold tracking-[0.08em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-moss animate-pulse" />
            Segera Hadir
          </span>
          <h2
            id="agenda-title"
            className="mt-3.5 text-[clamp(1.9rem,4vw,2.75rem)] font-serif font-normal text-ink tracking-tight"
          >
            Agenda Playdate &amp; Meet Up
          </h2>
        </div>
        <p className="text-muted text-[1.05rem] leading-relaxed md:pt-4">
          Nantikan jadwal pertemuan tatap muka dan playdate untuk anak-anak kita.
          Ruang bersosialisasi secara langsung di sekitar Cipanas sedang dalam tahap persiapan.
        </p>
      </div>
    </section>
  );
}
