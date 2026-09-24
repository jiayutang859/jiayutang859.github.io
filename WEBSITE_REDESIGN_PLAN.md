# Website Redesign Plan: from "career path" to "research mindset"


## Context

The site was rebuilt two days ago (commits b380035, b246192) as a narrative-first
"research hub". That rebuild fixed the structure (six pages, CV separated from story)
but it still tells the story as a **sequence of topics** (food science → nutrition →
microbiome → clinical trials → AI → antibodies). A faculty reader or computational
biologist comes away with "this person has changed fields several times and is
enthusiastic about AI". The intended message is different: **one consistent way of
thinking about biological evidence, applied at progressively finer scales, now
pointed at molecular recognition and design.**

This plan audits every page against that goal, defines the narrative architecture,
and supplies replacement copy. It optimizes for PhD/postdoc collaborators, faculty,
AI-for-biology researchers, biotech collaborators, and students, not for SEO.

Site facts that constrain the plan: plain HTML/CSS/JS on GitHub Pages, header and
footer duplicated in all seven HTML files (`index`, `about`, `research`, `notes`,
`cv`, `contact`, `notes/_template`), design tokens in `style.css` `:root`, `noindex`
on every page (keep until told otherwise), `Local_Agents/` private and gitignored.

---

## 1. Executive diagnosis

The current site has four structural problems. Each recurs on several pages.

### 1.1 The identity is stated as a list of fields, not as a way of working

**What it communicates now.** Tab title and brand tagline: *"AI for Science,
Computational Biology & Human Health"*. Hero: *"I bridge computational and
experimental approaches, harnessing AI to investigate questions in biomedical
science."* Home themes section: five cards headed "What ties my work together",
including *"AI-assisted biomedical discovery: less time on repetitive work, more on
meaningful questions."*

**Why it is weak.** Every phrase here could sit on the homepage of thousands of
people. "Harnessing AI" and "AI for science" are the exact generic-enthusiast
signals the brief warns against. None of it names a biological question, a scale,
or a stance on evidence. A faculty reader gets no hook to disagree or agree with.

**What it should communicate.** A scientific object (biological interactions), a
verb ladder (understand, predict, engineer), a current focus (antibody–antigen
recognition, protein design), and one distinguishing stance (experimental thinking
carried into computation).

### 1.2 Chronology is doing the work that intellectual development should do

**Now.** Home "In short" heading: *"From functional foods, gut microbiome, and
clinical trials to antibody design"*, beside a six-stop vertical path labelled by
topic. About h1: *"From the food lab to antibody design"*; timeline titled "Five
chapters, and the people who shaped them". Notes lead essay: *"From Food Science to
Antibody Design"*. Open Graph description on About is literally the arrow chain.

**Why it is weak.** Six topic labels in a row read as six switches. The one sentence
that claims continuity (*"zooming in on the same curiosity"*) is asserted after the
fact rather than shown by what each stage taught. Nothing on the site says
*controls*, *confounding*, *provenance*, *replicates*, *applicability domain*, or
*uncertainty*, which are the actual through-line.

**Should communicate.** Four intellectual stages (observe → understand → predict →
design) and, for each past project, the specific habit of mind it produced. Topics
become evidence for the mindset, not the plot.

### 1.3 Previous work competes with current work instead of supporting it

**Now.** Home "Featured projects" gives the antibody project, the pulse trial, and
"AI-assisted research workflows" equal cards. Research page gives the pulse trial a
full Question / Why / Approach / Tools / Status block identical to the current
project. The AI-workflows "project" carries logos for ASReview, Gemini, Claude Code,
and Cursor.

**Why it is weak.** Three co-equal projects in three unrelated fields is the
"random jumping" reading. Listing coding assistants as research tools reads as
"AI enthusiast" or "ML engineer". The trial's genuine contribution (design,
controls, human variability, provenance) is buried in a "What I'm learning" footnote.

**Should communicate.** One current research program, clearly labelled. Previous
research grouped as **Research foundations**, each described by what it
contributed to how the current work is done. Literature-screening automation becomes
a *method*, not a project.

### 1.4 Categories are mixed within sections

**Now.** The home "themes" grid mixes domains (antibody engineering), methods
(reproducible workflows), background (human health), and slogans (AI-assisted
discovery). About's "How I think about science" has three soft cards ("Learn across
fields… ask naive questions"). The CV Skills section leads with a
"Computational Antibody Engineering" feature box (DeepMind logo, one month of work)
and then a wall of tool logos including an "AI Tools" group.

**Why it is weak.** A reader cannot tell what is a research area, what is a method,
what is a belief, and what is a résumé line. The skills wall implies proficiency
that has not been built and omits the strongest real skills (experimental design,
clinical operations, statistics).

**Should communicate.** Seven separated layers (§3), one per section, never mixed.
Skills in layers with honest proficiency labels.

### 1.5 Smaller issues (fix in passing)

| Location | Now | Problem |
|---|---|---|
| Home hero | "Welcome to Jiayu Tang's Website!" | Personal-blog register; wastes the first line |
| Home "Open to connect" | "Builders interested in the future of entrepreneurial biomedical science" | LinkedIn-networking tone on a research homepage; belongs on Contact only |
| Home | CTA band text is identical to Contact lede; quick-links duplicate the nav; notes preview shows two unpublished drafts | Redundancy; drafts on the homepage signal unfinished |
| Home path | "AI for science" as a *stage* between clinical trials and antibodies | AI is a method, not a biological stage; reinforces tool-first reading |
| About | Culinary-school pullquote is the most prominent element after the h1 | Anecdote occupies identity real estate |
| About "Meeting AI for science" | "future biomedical scientists need to understand… AI-assisted workflows"; "make science more creative, less repetitive" | Generic; slogan |
| Research §1 | Question framed as "how much does the framework change…" | Single-factor framing; the interaction framing (framework × CDR × epitope × model) is the distinctive idea and is absent |
| Research §1 | No mention of uncertainty, replicates, or applicability domain except one good line in "What I'm learning" | The strongest idea on the page is in the smallest box |
| Notes | "Why AI Makes Science More Creative, Not Less Human" | Slogan title; AI-enthusiast register |
| Nav | Studio (photography) in the main nav; no route to Publications | Dilutes; publications are two clicks away |
| CV header pill | "Research Assistant · incoming PhD student"; hero says the same | Brief says "PhD trainee"; wording must be settled once (see §17) |
| All pages | Title/OG/JSON-LD still describe "AI for science, computational biology & human health" | Metadata contradicts any new hero |

---

## 2. Proposed scientific identity

**Who.** An early-stage biomedical researcher (PhD trainee, Wang Lab, Department of
Infectious Diseases and Immunology, University of Florida) working in computational
immunology and protein design.

**What.** Studying how biological interactions can be understood, predicted, and
eventually engineered, using structure prediction, statistics, and AI-based models
as tools, and using experimental controls and uncertainty estimates to decide when
those tools can be trusted.

**Why this person.** Trained in experimental food science, human clinical trials,
and gut microbiome research before moving to computation. Brings experimental
design, data provenance, systems thinking, and human-health context into
computational biology, where those habits are often missing.

**Not.** Not "an antibody researcher"; not an AI generalist; not an ML engineer;
not a structural biologist by training; not yet an independent investigator.

## 3. One-sentence positioning statement

> I study how biological interactions can be understood, predicted, and engineered,
> currently through computational immunology, antibody–antigen recognition, and
> protein design, with an experimental and human-health perspective carried over
> from clinical and microbiome research.

Short form (brand tagline, 60 characters): **Computational immunology & protein
design · Wang Lab, UF**

## 4. Long-term research vision

Three horizons, stated as trajectory, not as achievement:

| Horizon | Wording for the site |
|---|---|
| **Now** | Computational immunology and antibody engineering: how framework, CDR, and epitope context together shape predicted antigen recognition, and when structure-prediction outputs are trustworthy enough to design from. |
| **Developing** | AI-enabled molecular biology: structural modeling, protein design, biological foundation models, and the controls and uncertainty estimates needed to use them as evidence. |
| **Long-term** | Understanding and engineering biological interactions across scales, from molecular recognition to physiological and translational context, using quantitative and AI-based approaches. |

Compressed arc for visuals: **observe → understand → predict → design.**

## 5. Distinguishing attributes (six; four shown on Home)

Written in scientific, not motivational, language. Home shows 1, 3, 4, 5. About
shows all six as "How I approach research".

1. **Experimental rigor in computational work.** Structure predictions are treated as
   assay outputs: they need native-structure controls, defined failure modes, and
   provenance from input sequence to reported metric before biological interpretation.
2. **Cross-scale context.** Training spanned human physiology, microbial ecology, and
   now molecular structure. A molecular prediction is most useful when its
   physiological or translational meaning can be stated.
3. **Interaction-driven thinking.** Microbiome and physiology research showed that
   phenotypes come from interacting components. In antibody work this means
   asking how framework, CDRs, epitope, and model behaviour interact, not which
   framework is "best".
4. **Question-first, tool-agnostic.** Computation entered the toolkit because
   experimental workflows hit limits of time, scale, and reproducibility. The
   biological question selects the method; statistics, structure prediction,
   clinical trials, and wet-lab validation are all candidate methods.
5. **Uncertainty-aware modeling.** Predictions are reported with replicates,
   distributions, confidence, robustness checks, and an explicit applicability
   domain. A confident prediction is evidence, not a result.
6. **Research-system building.** Experience running a clinical trial (protocol,
   consent, SOPs, QC, data pipeline) and building computational pipelines. Interest
   in turning ambiguous questions into reproducible systems: question → protocol →
   controls → data → QC → computation → analysis → interpretation → validation.

---

## 6. Narrative architecture

Seven layers, each with one home. No section mixes layers.

| Layer | Question answered | Primary home | Secondary |
|---|---|---|---|
| Identity | Who am I scientifically? | Home hero, brand tagline, metadata | About lede |
| Current research | What am I working on now? | Research §1 | Home "Now" block |
| Research questions | What biological questions interest me? | Research §2 (now vs growing toward) | Home "Now" block (3 bullets) |
| Methods | What approaches am I using and learning? | Research §3 (layered, with proficiency) | CV Skills (same layers, more detail) |
| Mindset | How do I think about evidence? | About "How I approach research" | Home "How I work" (4 cards) |
| Background | Where did this perspective come from? | About "Where this perspective came from" | Research §4 "Research foundations"; CV |
| Long-term vision | Where is this heading? | Home "Where this is heading" | About closing; Research §2 |

Cross-links replace duplication: Home teases each layer in ≤ 4 lines and links to
its primary page. About does not repeat project details; Research does not retell
the biography.

---

## 7. Page-by-page redesign

### 7.1 Home (`index.html`)

- **Purpose.** Research identity in 15–20 seconds; route to depth.
- **Audience.** Faculty, collaborators, AI-bio researchers arriving from LinkedIn,
  a conference, or a paper.
- **Main message.** One mindset, applied from observing biology to designing it;
  currently antibody–antigen recognition; unusually experimental perspective.
- **Keep.** Hero layout with 3D IgG1 model; `.rise` / `.reveal` motion; buttons;
  affiliation line; footer.
- **Remove.** "Welcome…" line; "In short" biography paragraphs; six-stop topic
  path; "Research themes" grid; "Open to connect" card; notes preview; quick-links
  grid; CTA band's duplicated paragraph.
- **Merge.** "Currently exploring" → into the new "Now" block as three questions.
- **Add.** Trajectory band (observe → understand → predict → design); "Now" block
  with current research and "Where this is heading"; four attribute cards;
  "Selected work" (current project + one foundation project + publications link);
  short background paragraph.
- **Order.** Hero → Trajectory → Now + Heading → How I work → Selected work →
  Background in brief → Contact strip.
- **Copy.** §8.
- **Visual.** §12.

### 7.2 About (`about.html`)

- **Purpose.** Intellectual development and mindset.
- **Audience.** Faculty and collaborators deciding whether to talk; students.
- **Main message.** Each stage changed *how* I think, and the habits transferred.
- **Keep.** Headshot + Gainesville caption; journey timeline component (restyled to
  four conceptual stages); institution logo row; "Beyond research" (shortened);
  principles grid (expanded from 3 to 6 cards).
- **Remove.** Culinary-school pullquote from the top (move a shortened version into
  the "Observe" stage as one sentence); "Meeting AI for science" as its own stop.
- **Rewrite.** h1, ledes, every timeline card (organized by stage and by "what it
  taught"), principles.
- **Add.** Compact trajectory strip under the lede; "How I approach research" (six
  pillars); "Where this is heading" closing paragraph.
- **Order.** Lede + photo → Trajectory strip → Where this perspective came from
  (four stages) → How I approach research → Where this is heading → Beyond research.
- **Copy.** §9.

### 7.3 Research (`research.html`)

- **Purpose.** Current research, research questions, methods, and foundations,
  clearly separated.
- **Audience.** Computational biologists, immunologists, potential collaborators.
- **Main message.** One active program framed as an interaction question with
  explicit controls and uncertainty; honest distinction between what is being done
  and what is being grown toward.
- **Keep.** Question / Why / Approach / Tools / Status / Learning grid for the
  current project; page TOC; metrics line; institution logos on foundation cards.
- **Remove.** "AI-assisted research workflows" as a project (fold into §3 Methods
  and into the systematic-review foundation card); Claude Code / Cursor / Gemini
  logos.
- **Rewrite.** Current project question and "why it matters" in interaction and
  uncertainty terms; pulse trial and fermentation cards as foundations ("what it
  contributed").
- **Add.** §2 Research questions (now vs growing toward); §3 Methods and approaches
  (layered summary with proficiency labels, linking to CV); §5 pointer to
  publications and presentations.
- **Order.** Current research → Research questions → Methods & approaches → Research
  foundations → Publications & presentations → Contact strip.
- **Copy.** §10.

### 7.4 Notes (`notes.html`)

- Keep page and template. Retitle two drafts (§14). Add one sentence to the lede
  that these are working notes on evidence and methods. No other change.

### 7.5 CV (`cv.html`)

- Keep every entry (education, research, publications, presentations, funding,
  teaching, service, certifications). Rewrite only **Skills** (§11) and the current
  position pill/advisor line wording (§17). Consider removing the DeepMind logo from
  the skills header (it is a company logo, not a proficiency).

### 7.6 Publications

- No separate page. Add a `Publications` link to the footer and to Home "Selected
  work" pointing at `cv.html#publications`. Rationale: two published, three in
  preparation; a standalone page would look thin.

### 7.7 Contact (`contact.html`)

- Keep. Move the "Open to connect" audiences here (already partially present as
  "Good reasons to write"). Change lede topics from "antibody design, AI for
  biology, computational biology, translational health, or interdisciplinary
  biomedical science" to "antibody–antigen recognition, protein design, structure
  prediction and its validation, microbiome and clinical research, or moving
  between experimental and computational biology". Remove "Builders" wording.

### 7.8 Navigation and footer (all seven files)

- Nav order: **Home · Research · About · Notes · CV · Contact.** Research moves
  before About so the research identity is the first click.
- Move **Studio** out of the main nav into the footer only (it stays linked from
  About "Beyond research").
- Brand tagline → `Computational immunology & protein design · Wang Lab, UF`.
- Footer: add `Publications` link; keep social icons.
- Metadata on all pages: new `<title>`, description, OG description, JSON-LD
  `description`/`knowsAbout` to match §3.

---

## 8. Proposed homepage copy

### Hero

**Eyebrow (replaces "Welcome to Jiayu Tang's Website!"):**
> Jiayu Tang · PhD trainee, Wang Lab, University of Florida

**Headline (current: "I bridge computational and experimental approaches, harnessing AI to investigate questions in biomedical science."):**
> Understanding, predicting, and <span class="text-accent">designing</span> biological interactions.

**Identity statement (current: "I'm a researcher at the University of Florida, soon starting my PhD in the Wang Lab… working on structure prediction and protein design to study how antibodies recognize their targets."):**
> I work in computational immunology in Dr. Yiquan Wang's lab, studying how antibody
> frameworks, binding loops, and epitopes together shape antigen recognition, and
> when AI-based structure predictions are trustworthy enough to design from. I came
> to computation from experimental food science, human clinical trials, and gut
> microbiome research, and that experimental, human-health perspective shapes how I
> approach models.

**Buttons:** Research (solid) · About (outline) · CV (ghost). "Reach out" moves to
the contact strip at the bottom; the header nav already carries Contact.

**Affiliation line:** `Wang Lab · Dept. of Infectious Diseases & Immunology · University of Florida` (one line; drop "Research Assistant, incoming PhD student" pending §17).

**3D model caption:** keep, add one clause: `Human IgG1 · PDB 1HZH · the kind of molecule whose recognition I study`.

### Trajectory band (replaces the six-stop path)

Eyebrow: **One way of thinking, at finer and finer scales**

| Stage | Line | Fields |
|---|---|---|
| **Observe** | Measuring biological effects with validated assays and controls | Food science · fermentation · human nutrition |
| **Understand** | Studying interaction-driven systems and quantifying uncertainty | Gut microbiome · clinical trials · statistics · systematic review |
| **Predict** | Modeling molecular recognition and testing when models can be trusted | Structure prediction · computational immunology |
| **Design** *(now, building)* | Using validated predictions to propose new molecules | Antibody engineering · protein design |

One-line footer under the band:
> The subjects changed. The questions about evidence did not: what is the control,
> what is the confounder, how variable is the result, and what would validate it.

### Now + where this is heading (two columns)

**Left, "Current research":**
> **How framework context shapes predicted antibody–antigen recognition.**
> Holding the binding loops and the epitope fixed while varying the human VH–VL
> framework, I am testing how much structure-prediction and design tools respond to
> framework choice, using native antibody structures as controls and replicate
> predictions to separate signal from model noise.
>
> Three questions I am working on:
> - How do framework, CDR, and epitope geometry interact in predicted binding?
> - When is a confident prediction actually a correct one for antibody–antigen complexes?
> - Which generative design tools produce candidates worth testing, and how would we know?
>
> → Read the project

**Right, "Where this is heading":**
> **Now** · Computational immunology and antibody engineering
> **Developing** · AI-enabled molecular biology: structural modeling, protein design, biological foundation models, and the controls needed to use them as evidence
> **Long-term** · Understanding and engineering biological interactions across molecular and biomedical scales

### How I work (four cards; replaces "Research themes")

Eyebrow: **How I approach research** · link "All six, with the background behind them → About"

- **Experimental thinking, in silico.** Predictions get native controls, replicates, and provenance before they get a biological interpretation.
- **Interaction, not ranking.** I ask how components interact in context rather than which one is universally best.
- **Uncertainty is part of the result.** Distributions, confidence, and applicability domains are reported alongside point predictions.
- **Molecules in context.** A structural prediction earns its place when its physiological or translational meaning can be stated.

### Selected work (replaces "Featured projects")

Two cards plus a link row.

1. **Current · Wang Lab, UF** — *Framework context in antibody–antigen recognition.* Structure prediction at scale with controls and replicates; benchmarking generative antibody design tools. → Research
2. **Foundation · Deehan Lab, UNL, 2024–2026** — *A randomized crossover trial of dietary pulses and the gut microbiome.* Protocol, consent, SOPs, 200+ visits, biospecimens: where I learned that study design determines what a result can mean. → Research foundations
3. Link row: Publications (cv.html#publications) · Presentations · Full CV

### Background in brief (replaces "In short")

> I trained in food science at Northwest A&F University, where fermentation
> experiments were my first lesson in measurement and controls. At the University of
> Nebraska–Lincoln I moved to human nutrition and the gut microbiome, coordinated a
> randomized clinical trial, led a systematic review, and added a statistics minor.
> Those years taught me that biological outcomes come from interacting components
> and that good evidence depends on design, provenance, and honest uncertainty.
> Reaching the limits of what experimental workflows alone could answer led me to
> computation, and to the Wang Lab at the University of Florida.
> → The longer story

### Contact strip (replaces CTA band + quick links)

> **Working on antibody design, structure prediction, or bridging experimental and computational biology?** I would be glad to hear from you.
> Email · LinkedIn · Google Scholar · GitHub

---

## 9. Proposed About-page copy

**h1 (current: "From the food lab to antibody design"):**
> How I came to think about biology this way

**Lede 1:**
> I am a PhD trainee in Dr. Yiquan Wang's lab at the University of Florida, working
> in computational immunology, antibody–antigen recognition, and protein design.

**Lede 2:**
> Before computation I did experimental research: fermentation chemistry, a human
> clinical trial, a systematic review, gut microbiome work. This page is about what
> each of those stages changed in how I approach a research question, because that,
> more than any single topic, is what I bring to computational biology.

**Compact trajectory strip:** Observe → Understand → Predict → Design (same four
labels as Home, one line each, current stage highlighted).

### Where this perspective came from

Eyebrow: **Four stages, one set of questions**

**1. Observe · Measuring biological effects** — Northwest A&F University, 2022–2023, with Dr. Chunxia Xiao
> Food science is often mistaken for culinary training; for me it was an
> introduction to chemistry, microbiology, and the question of how what we eat acts
> on the body. In Dr. Xiao's lab I fermented proso millet with three lactic acid
> bacteria and measured changes in phenolic profile, antioxidant activity, and starch
> digestibility. It was my first experience of a biological effect that only existed
> relative to a control, of replicate variability, and of an assay that had to be
> trusted before the number it produced could be. Two co-authored papers came out of
> that lab.
>
> **What it left me with:** measurement discipline; the habit of asking what the assay is actually reporting.

**2. Understand · Complex systems and human variability** — University of Nebraska–Lincoln, 2023–2026, with Dr. Edward Deehan
> Clinical nutrition put food, microbes, metabolism, and human health inside one
> rigorous framework. As a master's student I coordinated a 12-week randomized
> crossover trial of dietary pulses and the gut microbiome: co-writing the protocol
> and consent, authoring SOPs, running more than 200 clinic visits, and handling
> stool, blood, blood-pressure, and dietary data from consent form to analysis. The
> gut microbiome taught me that phenotypes are produced by interacting communities,
> that the same intervention can produce different responders, and that context
> decides the outcome. A statistics minor and a 1,800-reference systematic review
> taught me to think in effect sizes, heterogeneity, and risk of bias rather than in
> single results.
>
> **What it left me with:** design determines conclusions; confounding, selection, and adherence are real; data provenance is a scientific issue, not an administrative one; biological behaviour is interaction-driven.

**3. Predict · Reaching the limits of the workflow** — 2025–2026
> Running a trial and a systematic review made the limits of purely experimental
> and manual workflows concrete: time, scale, cost, and reproducibility. I began
> using machine-learning screening tools and a large language model for literature
> screening and data extraction, and validated them against human reviewers before
> relying on them. That was my first computational assay with a control, and the
> point at which I decided that the questions I cared about needed quantitative
> modeling as well as measurement. Dr. Wang's approach to AI-assisted biomedical
> research matched that conclusion, and I joined his new lab at the University of
> Florida.
>
> **What it left me with:** computation as a way to extend which questions are askable, on the condition that it is validated like any other method.

**4. Design · Modeling molecular recognition** — University of Florida, 2026–now, with Dr. Yiquan Wang
> My current work is in computational immunology: how antibody framework, binding
> loops, and epitope geometry interact in predicted antigen recognition, and when
> structure-prediction and generative design outputs are reliable enough to act on.
> Antibodies are my entry point rather than my boundary. They are a tractable system
> for learning to model, predict, and eventually design biological interactions,
> which is the larger question I want to keep working on.
>
> **What I am building now:** structural intuition, pipeline engineering on an HPC cluster, and the habit of treating a model output as evidence with uncertainty.

### How I approach research (six cards)

- **Experimental rigor in computational work.** A structure prediction is an assay output. Before interpreting it biologically I want native-structure controls, replicate runs, defined failure modes, and a record of every input and parameter that produced it.
- **Cross-scale context.** I have worked on human physiology, microbial communities, and now molecular structure. I try to state what a molecular prediction would mean one or two scales up, because that is where it becomes useful.
- **Interaction-driven thinking.** Microbiome research showed me that outcomes come from interacting components. In antibody work I ask how framework, CDRs, epitope, and model behaviour interact, rather than which framework is best in general.
- **Question-first, tool-agnostic.** I came to computation because experimental workflows hit limits, not because a method was fashionable. The biological question selects the method; statistics, structure prediction, clinical experiments, and wet-lab validation are all candidates.
- **Uncertainty-aware modeling.** I report distributions and confidence alongside point predictions, and try to state the applicability domain of a model before using it outside the data it was trained on.
- **Research-system building.** I have run a clinical study and built computational pipelines. What interests me is the whole chain: question, protocol, controls, data generation, QC, computation, analysis, interpretation, validation. Trustworthy conclusions come from the chain, not from one clever step.

### Where this is heading

> In the near term I am building expertise in computational immunology and antibody
> engineering. Over the PhD I want to broaden that into AI-enabled molecular
> biology: structural modeling, protein design, and biological foundation models,
> together with the controls and uncertainty estimates needed to use them as
> evidence. The long-term question is how biological interactions can be understood,
> predicted, and engineered across molecular and biomedical scales. I expect the
> systems I study to change; I expect the questions about evidence to stay the same.

### Beyond research

Keep the three interests; shorten the intro to one sentence: *Philosophy, photography, and cooking. Food science is still not culinary school.*

---

## 10. Proposed Research-page structure and copy

**h1 (current: "Questions I'm working on"):** keep, or `Current research, open questions, and foundations`.

**Lede:**
> One active research program, the questions it is part of, the methods I am using
> and learning, and the earlier research that shaped how I do this work. I try to be
> explicit about what is in progress versus what I am growing toward.

TOC: Current research · Research questions · Methods & approaches · Research foundations · Publications

### §1 Current research

Pill: **Current · Wang Lab · University of Florida · with Dr. Yiquan Wang · Aug 2026 – present**

**Title:** How framework context shapes predicted antibody–antigen recognition

**The question (current: "how much does the antibody framework… change what structure-prediction and design tools say about binding?"):**
> When the binding loops, antigen, and epitope are held fixed, how do the human
> VH–VL framework, the CDRs, and the epitope geometry *interact* to shape what
> structure-prediction and design tools predict about binding? And how much of any
> observed effect is biology rather than model behaviour?

**Why it matters:**
> Frameworks are often treated as passive scaffolds, but they influence CDR
> conformation and VH–VL packing. If prediction and design tools are sensitive to
> framework context, that changes how grafting, humanization, and de novo design
> should be done, and how far in-silico results can be trusted. Separating a real
> framework effect from model uncertainty is itself part of the question.

**Approach (rewrite bullets):**
- Assemble a provenance-tracked dataset of paired human VH–VL frameworks, parent antibody structures, and epitope definitions
- Graft fixed CDRs onto alternative frameworks; keep native antibodies as positive controls and include negative controls
- Run replicate structure predictions with AlphaFold 3 / ColabFold on HiPerGator; report distributions, not single runs
- Evaluate with epitope-masked structural analysis (confidence metrics, pose and CDR RMSD, epitope recovery, interface contacts, VH–VL orientation)
- Benchmark generative antibody design tools (RFantibody, Germinal) against the same controls

**Tools & methods:** AlphaFold 3 · ColabFold · RFantibody · Germinal · Python · HiPerGator HPC. (Drop tool logos other than institution logos.)

**Status:**
> In progress. Dataset and evaluation pipeline built; large-scale predictions and
> early design-tool benchmarks under way. Results are preliminary and unpublished.

**What I am learning:**
> A confident prediction is not a correct one. The controls and the replicate
> structure matter as much as the model, and much of the work is deciding what a
> given metric is entitled to mean. I am also building the structural intuition
> this field depends on.

### §2 Research questions

**What I am working on now**
- How do framework, CDR, and epitope geometry interact in predicted antibody–antigen binding?
- When are structure-prediction confidence metrics trustworthy for antibody–antigen complexes, and what controls expose their failure modes?
- Which generative design outputs are worth experimental testing, and by what criteria?

**Questions I am growing toward** *(explicitly labelled as directions, not programs)*
- How does molecular context shape immune recognition more broadly, beyond antibodies?
- How can sequence–structure–function relationships guide protein and antibody design under uncertainty?
- How should experimental controls, replicates, and applicability domains be built into AI-driven biology as standard practice?
- How can molecular predictions be connected to physiological and translational outcomes, the scale I worked at before?

### §3 Methods & approaches

Four layers, each a short list with a proficiency tag: **working** / **developing** / **foundational**. Link to CV Skills for detail.

- **Biological domains** — human clinical & nutrition research *(working)* · gut microbiome *(working)* · antibody biology *(developing)* · structural biology *(developing)* · immunology *(developing)*
- **Computational methods** — statistical modeling *(working)* · ML-assisted literature workflows *(working)* · protein structure prediction *(developing)* · structural analysis *(developing)* · computational pipelines & HPC *(developing)* · generative protein design *(early)*
- **Research design** — experimental & clinical trial design *(working)* · protocols, SOPs, controls, QC *(working)* · systematic review *(working)* · uncertainty analysis *(developing)*
- **Technical environment** — Python, R *(working)* · SAS *(foundational)* · REDCap, EndNote, ASReview · AlphaFold 3, ColabFold, RFantibody, Germinal · HiPerGator

### §4 Research foundations

Eyebrow: **Previous research and what each stage contributed**

Compact cards (institution logo, dates, one paragraph, one "Contributed" line). No full Q/Why/Approach grid.

**Human clinical trial and biobank · Deehan Lab, UNL · 2024–2026**
> Coordinated a 12-week, three-phase randomized crossover trial on dietary pulse
> market classes, the gut microbiome, and cardiometabolic markers (IRB-approved,
> ClinicalTrials.gov-registered), plus a human biobank study. Co-developed an
> NIH-style protocol and consent, authored 4 SOPs and 2 workflows, led 200+ clinic
> visits, and collected and processed stool, blood, 24-hour blood pressure, and
> dietary data. Manuscript in preparation; presented at ASM Missouri Valley Branch
> and Nebraska Research Days.
> **Contributed:** experimental design, controls, participant variability, data provenance, GCP-level operations.

**Systematic review with ML-assisted screening · Deehan Lab, UNL · 2024–2026**
> Led a PICOS-based systematic review of pulse intervention trials; screened 1,800+
> references with machine-learning tools and used a large language model for
> preliminary extraction, validated against human reviewers. Gave three guest
> lectures on search strategy, PICOS design, and AI/ML screening tools.
> **Contributed:** quantitative reasoning about heterogeneity and bias; first validated computational assay; habits for documenting and checking automated steps.

**Gut microbiome and dietary fiber · UNL · 2023–2026**
> Thesis and trial work on how dietary pulses shape gut microbial communities and host markers.
> **Contributed:** interaction-driven, context-dependent view of biological systems.

**Fermentation and functional foods · Xiao Lab, NWAFU · 2022–2023**
> In vitro fermentation of proso millet with three lactic acid bacteria; phenolic
> profile, antioxidant activity, starch digestibility; spectrophotometric colour
> analysis; contribution to a review on coarse grains and type 2 diabetes. Two
> co-authored publications (*Foods*; *J. Sci. Food Agric.*, 2023).
> **Contributed:** measurement discipline; assays, replicates, and controls.

### §5 Publications & presentations

One line linking to `cv.html#publications`, `cv.html#presentations`, Google Scholar.

---

## 11. Skills restructuring (CV page)

Replace the "Computational Antibody Engineering" feature box, the four logo groups,
and the two mini boxes with four layered lists. Keep small logos only where they aid
recognition (Python, R); no company or AI-assistant logos.

**Proficiency legend:** Working = used independently in completed research ·
Developing = in active use, still building · Foundational = coursework or limited use.

| Layer | Working | Developing | Foundational |
|---|---|---|---|
| **Biological domains** | Human nutrition & clinical research; gut microbiome; food chemistry & fermentation | Antibody biology; structural biology; immunology | — |
| **Computational methods** | Statistical modeling (experimental design, multiple regression, multivariate analysis); ML-assisted literature screening & extraction with human validation | Protein structure prediction (AlphaFold 3, ColabFold); structural analysis (RMSD, interface contacts, epitope recovery, VH–VL orientation); computational pipelines with provenance; HPC (HiPerGator) | Generative protein design (RFantibody, Germinal) |
| **Research design & operations** | Randomized crossover trial coordination; protocol, consent & SOP development; IRB & ClinicalTrials.gov processes; GCP; participant recruitment & biospecimen handling; systematic review (PICOS) | Uncertainty and robustness analysis for model outputs | — |
| **Technical environment** | Python, R; REDCap; EndNote; ASReview | — | SAS; BioRender, Illustrator, Canva |
| **Languages** | Mandarin (native), English (fluent) | | |

Note: AI coding assistants (Claude Code, Cursor, Gemini) are dropped from Skills.
If wanted, a single line under Technical environment: *"Use LLM-based tools for
coding and literature work, with outputs checked against references or human review."*

---

## 12. Visual storytelling recommendations

**Replace** the six-stop `.path` (Home) and the five-chapter `.journey` (About)
with one **Trajectory** component used at two sizes.

- **Home, full size, directly under the hero.** Horizontal stepper at ≥ 900 px,
  vertical at narrower widths. Four cells: verb (serif, large), one-line
  description, small muted field tags. Existing colour logic reused: warm tokens
  (`--warm`, `--warm-lt`) for Observe/Understand, accent tokens for Predict/Design,
  the Design cell filled `--accent` with a "now" marker, mirroring `.path li.now`.
  A thin gradient connector (`--warm-bd` → `--accent-bd`) already exists in
  `.path::before` and can be reused horizontally. One-sentence footer about the
  constant questions (controls, confounders, variability, validation).
- **About, compact strip** under the lede: same four verbs in a single row of pills;
  the four stage cards below are numbered 1–4 to match.
- **Not on Research.** Research stays about content.
- **Hero 3D antibody:** keep. It is the one concrete molecule on the site and it is
  the current system. The new headline frames it as an example of "biological
  interactions", so it no longer reads as "antibody researcher only".
- **Remove** logo walls (CV Skills, Research tools chips for software). Keep
  institution and journal logos; they carry information.
- **Attribute cards:** reuse `.principles` grid at 2×2 on Home and 3×2 on About.
- **Proficiency tags:** small pills reusing `.pill`, `.pill.green` (working),
  `.pill` accent (developing), `.pill.muted` (foundational).

---

## 13. Navigation changes

| Item | Now | Proposed |
|---|---|---|
| Order | Home · About · Research · Notes · CV · Contact · Studio | Home · Research · About · Notes · CV · Contact |
| Studio | Main nav (separated by border) | Footer only, plus About "Beyond research" |
| Publications | None | Footer link → `cv.html#publications`; Home "Selected work" link row |
| Brand tagline | AI for science · computational biology · human health | Computational immunology & protein design · Wang Lab, UF |
| Title tag (Home) | Jiayu Tang \| AI for Science, Computational Biology & Human Health | Jiayu Tang \| Computational Immunology & Protein Design, University of Florida |
| Meta description | "early-stage scientist working at the intersection of AI for science…" | "PhD trainee in the Wang Lab at the University of Florida studying how biological interactions can be understood, predicted, and engineered, currently through computational immunology, antibody–antigen recognition, and protein design." |

Legacy redirects in `script.js` stay unchanged.

## 14. Content to remove or merge

**Remove**
- Home: "Welcome to Jiayu Tang's Website!"; three "In short" biography paragraphs; six-stop path; "Research themes" grid; "Open to connect" card; notes preview; quick-links grid; CTA band paragraph.
- About: pullquote block (one clause survives inside stage 1); "Meeting AI for science" stop; the three current principle cards (superseded by six).
- Research: "AI-assisted research workflows" project; software logos (ASReview, Gemini, Claude Code, Cursor, DeepMind).
- CV: "Computational Antibody Engineering" skill feature box; "AI Tools" group; "Design & Visualization" logo group (content survives as a Foundational line).

**Merge**
- "Currently exploring" (Home) → "Now" block three questions.
- "Open to connect" (Home) → Contact "Good reasons to write".
- AI-workflows project → Research §3 Methods + systematic-review foundation card.
- Pulse trial full project → Research §4 foundation card + Home "Selected work" card.

**Retitle (Notes drafts)**
- "From Food Science to Antibody Design" → "What a Clinical Trial Taught Me About Computational Biology"
- "Why AI Makes Science More Creative, Not Less Human" → "Prediction Is Not Validation: Using AI Tools as Evidence"
- Others keep their titles.

## 15. Content to preserve from the current site

- Every CV entry and all publication, presentation, funding, teaching, service, and
  certification data (`cv.html` lines 80–475); the Google Scholar link.
- The Question / Why / Approach / Tools / Status / Learning project template (for
  the current project).
- Hero layout, 3D IgG1 viewer and its data file, `.rise`/`.reveal` motion,
  reduced-motion handling, design tokens and typography.
- Institution logos (UF, UNL, NWAFU) and journal/society logos on the CV.
- `noindex, nofollow` on all pages, preview-mode comments, README section.
- Notes page, `notes/_template.html`, and the publishing instructions.
- Contact page cards and the "met me at a conference" tip.
- Legacy anchor redirects, mobile nav, back-to-top, CV TOC highlighting
  (`script.js`).
- The sentence "A confident prediction is not the same as a correct one" (promoted,
  not removed).
- Research "metrics" line (confidence, pose/CDR RMSD, epitope recovery, contacts,
  VH–VL orientation).

## 16. Implementation checklist

0. Save this document as `WEBSITE_REDESIGN_PLAN.md` in the repo root.
1. **Shared chrome (7 files):** nav order, remove Studio from nav, brand tagline,
   footer Publications + Studio links, title/description/OG/JSON-LD text.
2. **style.css:** add `.trajectory` (horizontal ≥ 900 px, vertical below),
   `.trajectory-strip` (About), `.now-grid` (two columns), `.foundation` compact
   card, `.skill-layers` table/list, proficiency pill variants; remove `.path`,
   `.theme-grid`, `.duo`, `.quick-links` if unused; extend `.principles` to 2×2
   variant. Keep tokens.
3. **index.html:** rewrite `<main>` per §7.1/§8; keep hero figure and scripts.
4. **about.html:** rewrite per §7.2/§9; four `.stop` cards, six `.principles` cards.
5. **research.html:** restructure per §7.3/§10; new TOC anchors
   `#current`, `#questions`, `#methods`, `#foundations`, `#publications-link`;
   keep `#antibody-frameworks` and `#pulses-microbiome` as anchors (Home and old
   links point at them).
6. **cv.html:** replace Skills section per §11; update current-position wording
   per §17.
7. **notes.html:** retitle two drafts; adjust lede.
8. **contact.html:** lede topics; drop "Builders".
9. **script.js:** extend the reveal selector list with `.trajectory li`,
   `.foundation`; no logic changes.
10. **README.md:** update the Pages table descriptions and note the trajectory
    component.
11. **Verification:** start the `site` preview server (`.claude/launch.json`,
    port 8765); check Home, About, Research, CV at 1440 px and 375 px in the
    browser pane; confirm no console errors; run the existing internal-link and
    tag-balance checks over all seven files; confirm `noindex` present on every
    page; confirm legacy redirects still resolve; confirm `git status` shows no
    `Local_Agents/` changes.
12. Commit as one commit ("Reframe site around research mindset and trajectory"),
    push to `main`, poll the live site for the new hero text.

Estimated size: ~600 lines of HTML changed across five pages, ~120 lines of CSS
added, ~80 removed.

## 17. Claims and inconsistencies to verify personally

1. **Position wording.** The brief says "PhD trainee". Two days ago the instruction
   was "RA now, PhD soon", and the site, CV page, and JSON-LD say "Research
   Assistant, incoming PhD student". If PhD enrollment has not formally started,
   "PhD trainee" may be read as enrolled. Choose one of: *PhD trainee* /
   *PhD student* / *Research Assistant and incoming PhD student*, and it will be
   applied identically on Home, About, Research, CV, footer, and structured data.
2. **Project start and status.** Research page says "Aug 2026 – present" and
   "dataset and evaluation pipeline are built"; today is 24 Sep 2026. Confirm both
   are accurate, or soften to "being built".
3. **Negative controls.** The proposed Approach bullet mentions negative controls.
   Confirm they exist in the pipeline; otherwise the bullet keeps only native
   positive controls.
4. **Replicate predictions.** The proposed copy states replicate runs and reported
   distributions. Confirm this is current practice, not intent.
5. **"Gemini 3"** appears on the CV page as the LLM used for extraction. Confirm
   model name/version.
6. **Publications in preparation:** author orders and co-first-author marks for the
   three manuscripts; the "Grimaldo C, Tang J…" body-composition study is
   observational and unrelated to pulses; confirm it should stay listed.
7. **Public GPAs and dollar amounts** on `cv.html` (4.00, 3.33, 3.57, 3.52; $25,500,
   $24,500, $3,000, $400, ¥ amounts). Common on résumés, less common on academic
   web CVs for a faculty audience. Not a positioning issue; decide whether to keep.
8. **Statistics minor** is cited as evidence of quantitative training in About and
   Skills. Confirm it is complete/official.
9. **Junior Reviewer, *Clinical Nutrition* (Nov 2024)** stays on the CV; the
   Research page does not claim reviewing experience.
10. **"Aug 2023 – May 2024" academic advisor role at NWAFU** overlaps the UNL 3+1
    year; presumably remote. Fine on the CV; not used elsewhere.
11. **Studio (photography) link** moves to footer only. Confirm you are happy with
    it being less prominent.
12. **Antibody caption phrase** "the kind of molecule whose recognition I study" is
    accurate for IgG1 only in a general sense; drop if it feels loose.
13. Everything on the site remains `noindex`. Say when to switch to `index, follow`.
