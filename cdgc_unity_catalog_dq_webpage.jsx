export default function CDGCUnityCatalogDQPage() {
  const steps = [
    {
      number: '01',
      title: 'DQ Execution in CDGC',
      description:
        'CDGC profiles data, validates rules, and computes dataset and rule-level scores.',
      bullets: ['Profiling and validation', 'Dimension-level scores', 'Results stored in Informatica repositories'],
      icon: '🧪',
    },
    {
      number: '02',
      title: 'Score Extraction',
      description:
        'Extract results through APIs, CDI pipelines, or event-driven triggers for downstream processing.',
      bullets: ['REST API extraction', 'CDI push to storage', 'Optional event/webhook pattern'],
      icon: '📤',
    },
    {
      number: '03',
      title: 'Bronze Landing',
      description:
        'Land raw DQ payloads in cloud object storage for traceability and replayability.',
      bullets: ['ADLS / S3 / GCS', 'JSON or Parquet', 'Partition by run date and source'],
      icon: '🪣',
    },
    {
      number: '04',
      title: 'Databricks Standardization',
      description:
        'Normalize CDGC payloads into a standard enterprise score model.',
      bullets: ['Map score dimensions', 'Align domain semantics', 'Prepare silver and gold models'],
      icon: '⚙️',
    },
    {
      number: '05',
      title: 'Unity Catalog Persistence',
      description:
        'Persist curated score history into governed Delta tables inside Unity Catalog.',
      bullets: ['Delta tables in UC', 'Historical tracking', 'Reusable enterprise score layer'],
      icon: '🏛️',
    },
    {
      number: '06',
      title: 'Governance Enrichment',
      description:
        'Add tags, lineage, and metadata context to strengthen discoverability and trust.',
      bullets: ['Quality status tags', 'Lineage visibility', 'Stewardship-ready metadata'],
      icon: '🏷️',
    },
    {
      number: '07',
      title: 'Business Consumption',
      description:
        'Expose scorecards to business, governance, and engineering teams.',
      bullets: ['Databricks SQL dashboards', 'BI scorecards', 'Trend and SLA monitoring'],
      icon: '📊',
    },
  ];

  const infographicStats = [
    { label: 'Platforms', value: '3', caption: 'CDGC, Databricks, Unity Catalog' },
    { label: 'Layers', value: '4', caption: 'Source, ingest, govern, consume' },
    { label: 'Outputs', value: '5+', caption: 'Scores, tags, trends, dashboards, lineage' },
    { label: 'Pattern', value: 'API', caption: 'Most common enterprise integration' },
  ];

  const scoreDimensions = [
    { name: 'Completeness', short: 'C', note: 'Required data present' },
    { name: 'Accuracy', short: 'A', note: 'Matches expected truth' },
    { name: 'Validity', short: 'V', note: 'Conforms to standards' },
    { name: 'Uniqueness', short: 'U', note: 'No unintended duplicates' },
    { name: 'Freshness', short: 'F', note: 'Arrives on time' },
    { name: 'Consistency', short: 'CS', note: 'Aligned across systems' },
  ];

  const codeBlocks = {
    api: `import requests\n\nurl = "https://<informatica-instance>/api/v2/dq/results"\nheaders = {"Authorization": "Bearer <token>"}\nresponse = requests.get(url, headers=headers)\npayload = response.json()`,
    transform: `df_clean = df_raw.selectExpr(\n  "assetName as table_name",\n  "score as overall_score",\n  "dimensionScores.completeness as completeness_score",\n  "dimensionScores.accuracy as accuracy_score",\n  "runDate as score_date"\n)`,
    persist: `CREATE TABLE governance.dq.table_quality_scores (\n  catalog_name STRING,\n  schema_name STRING,\n  table_name STRING,\n  score_date DATE,\n  overall_score DECIMAL(5,2),\n  status STRING,\n  source_system STRING,\n  run_id STRING\n) USING DELTA;`,
    tags: `ALTER TABLE main.sales.customer\nSET TAGS (\n  'dq_status' = 'gold',\n  'dq_score' = '97'\n);`,
  };

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#07111f] via-[#0b1b32] to-[#123a63]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#13b5ea] blur-3xl" />
          <div className="absolute right-10 top-20 h-56 w-56 rounded-full bg-[#1f6feb] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/30 bg-[#13b5ea]/10 px-4 py-1 text-sm text-[#8fe7ff]">
              Informatica CDGC → Databricks → Unity Catalog
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Integrating Data Quality Scores from CDGC into Unity Catalog
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A DrivenByData-style view of how enterprise data quality signals flow from Informatica Cloud Data Governance and Catalog into Databricks and Unity Catalog for governed, trusted, and reusable consumption.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              {['Data as a product', 'Governed trust signals', 'Lakehouse-ready score history', 'Metadata-driven stewardship'].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.24em] text-[#7dd3fc]">Infographic overview</div>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">How trust signals move across the modern data stack</h2>
              </div>
              <div className="hidden rounded-2xl border border-[#13b5ea]/20 bg-[#13b5ea]/10 px-4 py-3 text-sm text-[#8fe7ff] md:block">
                DrivenByData.pro
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {infographicStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-400">{stat.label}</div>
                  <div className="mt-3 text-3xl font-bold text-white">{stat.value}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-300">{stat.caption}</div>
                </div>
              ))}
            </div>

            <div className="relative mt-8 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
              <div className="pointer-events-none absolute right-4 top-4 rotate-[-12deg] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
                DrivenByData.pro
              </div>
              <div className="grid gap-4 md:grid-cols-7">
                {steps.map((step, idx) => (
                  <div key={step.number} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#13b5ea]/20 bg-[#13b5ea]/10 text-2xl">
                      {step.icon}
                    </div>
                    <div className="mt-3 text-xs uppercase tracking-[0.22em] text-[#7dd3fc]">{step.number}</div>
                    <div className="mt-2 text-sm font-semibold leading-5 text-white">{step.title}</div>
                    {idx < steps.length - 1 && (
                      <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-cyan-400/60 lg:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1f6feb]/10 to-[#13b5ea]/10 p-7 shadow-2xl">
            <div className="pointer-events-none absolute right-4 top-4 rotate-[-12deg] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
              DrivenByData.pro
            </div>
            <div className="text-sm uppercase tracking-[0.24em] text-[#7dd3fc]">Score dimensions</div>
            <h3 className="mt-2 text-2xl font-semibold">Core data quality dimensions</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {scoreDimensions.map((item) => (
                <div key={item.name} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-sm font-bold text-[#8fe7ff]">
                    {item.short}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-sm text-slate-300">{item.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="relative rounded-[2rem] border border-[#13b5ea]/20 bg-gradient-to-r from-[#13b5ea]/10 via-[#0b1b32] to-[#1f6feb]/10 p-8 shadow-2xl">
            <div className="pointer-events-none absolute right-4 top-4 rotate-[-12deg] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
              DrivenByData.pro
            </div>
            <h2 className="text-2xl font-semibold sm:text-3xl">End-to-end flow</h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-7">
              {steps.map((step, idx) => (
                <div key={step.number} className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#13b5ea]/10 text-lg">
                      {step.icon}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.25em] text-[#7dd3fc]">Step {step.number}</div>
                  </div>
                  <div className="mt-3 text-lg font-semibold leading-6">{step.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                  {idx < steps.length - 1 && (
                    <div className="pointer-events-none absolute -right-3 top-1/2 hidden h-0.5 w-6 -translate-y-1/2 bg-cyan-400/60 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-7 shadow-2xl">
            <div className="pointer-events-none absolute right-4 top-4 rotate-[-12deg] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
              DrivenByData.pro
            </div>
            <div className="text-sm uppercase tracking-[0.24em] text-[#7dd3fc]">Infographic summary</div>
            <h3 className="mt-2 text-2xl font-semibold">Source → Standardize → Govern → Consume</h3>
            <div className="mt-6 space-y-4">
              {[
                ['Source system', 'CDGC runs rules and calculates scores'],
                ['Integration layer', 'APIs or CDI move results to the lakehouse'],
                ['Databricks layer', 'Transforms raw payloads into enterprise score models'],
                ['Governance layer', 'Unity Catalog stores governed Delta tables and tags'],
                ['Consumption layer', 'Dashboards and scorecards expose trust signals'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-300">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-3xl font-semibold">Detailed process</h2>
          <p className="mt-3 text-slate-300">
            The pattern below is designed for enterprise-scale implementations where Informatica remains the system of execution for quality rules,
            while Databricks and Unity Catalog provide standardization, governed persistence, and consumption.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#13b5ea]/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[#7dd3fc]">
                  {step.number}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Process block</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-200">
                {step.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
        <div className="relative rounded-[2rem] border border-[#1f6feb]/20 bg-gradient-to-r from-[#1f6feb]/10 via-[#07111f] to-[#13b5ea]/10 p-8 shadow-2xl">
          <div className="pointer-events-none absolute right-4 top-4 rotate-[-12deg] rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">
            DrivenByData.pro
          </div>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-fuchsia-300">DrivenByData infographic block</div>
              <h2 className="mt-2 text-3xl font-semibold">DrivenByData at a glance</h2>
              <p className="mt-4 text-slate-300">
                CDGC remains the execution engine for quality rules. Databricks becomes the integration and standardization layer. Unity Catalog becomes the governed trust layer for enterprise-wide visibility.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['CDGC', 'Run rules'],
                ['Databricks', 'Standardize scores'],
                ['Unity Catalog', 'Govern and publish'],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center">
                  <div className="text-lg font-semibold text-white">{title}</div>
                  <div className="mt-2 text-sm text-slate-300">{subtitle}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold">Example: Extract from CDGC API</h3>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200">
              <code>{codeBlocks.api}</code>
            </pre>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold">Example: Standardize in Databricks</h3>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200">
              <code>{codeBlocks.transform}</code>
            </pre>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold">Example: Persist in Unity Catalog</h3>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200">
              <code>{codeBlocks.persist}</code>
            </pre>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-semibold">Example: Apply tags</h3>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200">
              <code>{codeBlocks.tags}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-200">What CDGC owns</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Rule execution, profiling logic, score calculation, and source-level quality assessment.
            </p>
          </div>
          <div className="rounded-3xl border border-indigo-400/20 bg-indigo-400/10 p-6">
            <h3 className="text-xl font-semibold text-indigo-200">What Databricks owns</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Ingestion, transformation, standardization, historical persistence, and downstream analytics.
            </p>
          </div>
          <div className="rounded-3xl border border-[#13b5ea]/20 bg-[#13b5ea]/10 p-6">
            <h3 className="text-xl font-semibold text-[#8fe7ff]">What Unity Catalog owns</h3>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Governance, access control, discoverability, metadata context, and trust signaling across the lakehouse.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}
