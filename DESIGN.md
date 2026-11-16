# DESIGN.md — Chicken Souse for Life redesign spec

Implementers: build exactly this. Do not make design decisions. If something is unspecified, choose the plainest option that uses the tokens below, and never add gradients, blur, pills, emoji, icon fonts or card shadows.

Source of truth for content is the current `index.html` (read it before starting). Every fact, quote, link, form field, hidden input and photo in it must survive.

---

## 1. Concept

**"The Sunday table."** The page reads like a well-made island cookbook: a warm paper ground, a single serif family doing the real typographic work, hairline rules instead of boxes, and photos given room. Teal (from the logo lettering) carries all structure, links and the big colour blocks; logo gold appears only as an accent — the sun rays, thin ticks, one underline. The logo's sunburst is the one recurring hand-made device: a half-sun rising behind the book cover, behind the foundation scripture, and at the foot of the page. Layouts are left-aligned and asymmetric on a 12-column grid; only the two scripture moments are centred.

---

## 2. Tokens

### Fonts (replace the existing Google Fonts link with this)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Karla:ital,wght@0,400;0,500;0,700;1,400&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap" rel="stylesheet">
```

- **Newsreader** — all headings, body copy, quotes, numerals.
- **Karla** — eyebrows, nav, buttons, form labels/inputs, captions, footer lists.
- **Alex Brush** — exactly two uses: the word "Life" in the hero H1 and in the footer wordmark. Nowhere else.

### CSS (paste as the top of `style.css`)

```css
:root {
  /* Teal — leads */
  --teal-900: #0A3D46;   /* deep blocks, footer, headings on paper */
  --teal-700: #0F6E7C;   /* primary: buttons, links, colour blocks, text-safe */
  --teal-600: #107584;   /* exact logo teal — graphics/large type only */
  --teal-200: #C9E3E4;   /* secondary text on teal-900 */
  --teal-100: #E3F1F1;   /* tinted section ground */
  /* Gold — accent only */
  --gold-500: #F2AF19;   /* exact logo gold — rays, ticks, underlines, never body text on light */
  --gold-700: #7A5400;   /* gold for small text on light grounds */
  --gold-100: #FCEFC9;   /* note/callout ground */
  /* Neutrals */
  --paper: #FBF8F1;      /* page ground */
  --sand: #F3EEE2;       /* alternate section ground */
  --white: #FFFFFF;      /* form fields, recipe page */
  --ink: #16303A;        /* body text */
  --ink-soft: #4A5F66;   /* secondary text */
  --rule: #D8D9D2;       /* hairlines on light */
  --rule-strong: #16303A;/* 1px ink rules (editorial double rules) */
  --rule-dark: rgba(251,248,241,.24); /* hairlines on teal */
  --field-border: #6F8288;
  --error: #B3261E;

  /* Type */
  --font-serif: 'Newsreader', Georgia, 'Times New Roman', serif;
  --font-sans: 'Karla', 'Helvetica Neue', Arial, sans-serif;
  --font-script: 'Alex Brush', 'Snell Roundhand', cursive;
  --fs-eyebrow: 0.75rem;                       /* 12 */
  --fs-small: 0.875rem;                        /* 14 */
  --fs-ui: 0.9375rem;                          /* 15 */
  --fs-body: 1.0625rem;                        /* 17 */
  --fs-lead: clamp(1.1875rem, 1.5vw, 1.375rem);
  --fs-h3: clamp(1.375rem, 2.1vw, 1.75rem);
  --fs-h2: clamp(2rem, 4.4vw, 3.5rem);
  --fs-quote: clamp(1.5rem, 3.2vw, 2.625rem);
  --fs-stat: clamp(2.75rem, 6vw, 4.5rem);
  --fs-display: clamp(2.875rem, 8.6vw, 7.25rem);
  --lh-tight: 1.02; --lh-head: 1.12; --lh-body: 1.65;
  --measure: 62ch;

  /* Space (4px base) */
  --s-1: 4px; --s-2: 8px; --s-3: 12px; --s-4: 16px; --s-5: 24px;
  --s-6: 32px; --s-7: 48px; --s-8: 64px; --s-9: 96px; --s-10: 128px;
  --gutter: clamp(20px, 5vw, 64px);
  --section-y: clamp(64px, 10vw, 128px);
  --max: 1240px;
  --nav-h: 72px;

  /* Shape */
  --r: 2px;                                    /* the only radius; images are square (0) */
  --shadow-hard: 10px 10px 0 var(--teal-900);  /* book cover ONLY. No other shadows anywhere. */

  /* Motion */
  --ease: cubic-bezier(.2,.7,.2,1);
  --dur-fast: .18s;
  --dur-reveal: .6s;
}
@media (max-width: 719px) { :root { --nav-h: 60px; } }
```

Breakpoints (mobile-first): **M** = `min-width: 720px`, **L** = `min-width: 1040px`. "Mobile" below means <720, "desktop" means ≥1040; between the two use the mobile stack with desktop paddings unless stated.

Base type: `body` Newsreader 400, `--fs-body`, `--lh-body`, `--ink` on `--paper`, `font-optical-sizing: auto`, antialiased. `h1–h3` Newsreader 500, `--teal-900`, `--lh-head`, `letter-spacing: -0.01em`, `text-wrap: balance`. Paragraphs `max-width: var(--measure)`, `text-wrap: pretty`. `em` in headings = Newsreader italic 400 in `--teal-700`.

---

## 3. Shared contract (class names — all three chunks must use these exactly)

| Class | Owner (CSS) | Meaning |
|---|---|---|
| `.wrap` | A | `max-width: var(--max); margin-inline:auto; padding-inline: var(--gutter)` |
| `.grid12` | A | `display:grid; gap: var(--s-6)`; at L: `grid-template-columns: repeat(12, 1fr)` |
| `.section` | A | `padding-block: var(--section-y)` |
| `.bg-sand` `.bg-teal-100` `.bg-teal-700` `.bg-teal-900` | A | section grounds |
| `.on-dark` | A | set on teal-700/900 sections: text `--paper`, headings `--paper`, secondary `--teal-200`, rules `--rule-dark`, links underline gold, focus ring gold |
| `.eyebrow` | A | section label |
| `.h-display` `.h2` `.h3` `.lead` `.small` | A | type roles |
| `.btn` `.btn--gold` `.btn--small` | A | button |
| `.link-arrow` | A | secondary text link with gold underline |
| `.rule` `.rule--double` | A | dividers |
| `.rays` (+ `.rays--gold` `.rays--teal`) | A | the sun-ray SVG motif |
| `.field` `.field__label` `.field__input` `.field-row` `.form` `.form__title` `.form__note` `.form-success` `.form-error` | A | forms |
| `.reveal` / `.is-visible` | A (CSS), C (JS) | scroll reveal |
| `.site-nav…` `.nav-panel…` `.site-footer…` | A | nav + footer |
| everything prefixed `.hero` `.stats` `.devotion` `.verse` `.inside` `.journey` `.recipe` `.authors` `.editor` `.seminars` `.order` | **B** | section layouts |

IDs that must not change (anchors + JS + form handler): `#devotion #whats-inside #book-sections #recipe #authors #editor #seminars #order #devotion-expanded #order-form #form-success #seminar-form #seminar-success` and every form control `id`/`name`, both hidden `access_key` and `subject` inputs.

### Sun-ray motif (C pastes this once, directly after `<body>`)

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <symbol id="rays" viewBox="0 0 400 200">
    <path d="M100.3,192.7 L42.0,200.0 L100.3,207.3Z M107.4,162.2 L13.6,139.4 L102.9,176.1Z M123.6,135.5 L72.2,107.1 L115.0,147.3Z M147.3,115.0 L84.8,41.4 L135.5,123.6Z M176.1,102.9 L151.2,49.7 L162.2,107.4Z M207.3,100.3 L200.0,4.0 L192.7,100.3Z M237.8,107.4 L248.8,49.7 L223.9,102.9Z M264.5,123.6 L315.2,41.4 L252.7,115.0Z M285.0,147.3 L327.8,107.1 L276.4,135.5Z M297.1,176.1 L386.4,139.4 L292.6,162.2Z M299.7,207.3 L358.0,200.0 L299.7,192.7Z"/>
  </symbol>
</svg>
```

Use: `<svg class="rays rays--gold" viewBox="0 0 400 200" aria-hidden="true"><use href="#rays"/></svg>`. CSS (A): `.rays{display:block;width:100%;height:auto;fill:currentColor;pointer-events:none}` `.rays--gold{color:var(--gold-500)}` `.rays--teal{color:var(--teal-200)}`. It is a half-sun: flat edge is the bottom; always sit it on a bottom edge or a rule. Used in exactly four places (hero panel, verse band, order section, footer) plus the tiny eyebrow tick. Do not sprinkle it elsewhere.

---

## 4. Page order and sections

New order (reordered for flow: meet the book → taste it → meet the people → act):

1. Nav · 2. Hero · 3. Stats strip · 4. Devotion sample `#devotion` · 5. Foundation scripture band · 6. What's Inside `#whats-inside` · 7. The Journey `#book-sections` · 8. Recipe `#recipe` · 9. Authors `#authors` · 10. Editor `#editor` · 11. Seminars `#seminars` · 12. Waitlist `#order` (moved to last, the closing action) · 13. Footer

Remove all `<hr class="divider">` elements; section grounds and rules below replace them. Wrap 2–12 in `<main id="main">`. Add a skip link as the first focusable element: `<a class="skip-link" href="#main">Skip to content</a>`.

Grounds, in order: hero paper (+teal panel) → stats paper → devotion paper → verse **teal-700** → inside paper → journey **sand** → recipe **teal-100** → authors paper → editor **teal-900** → seminars **sand** → order paper → footer **teal-900**.

### 4.1 Hero — `<section class="hero">`

Content (all existing): eyebrow "A Devotional Journey"; H1 "Chicken Souse for Life"; subtitle "A Taxi Driver's Story"; tagline quote; description paragraph; two CTAs ("Join the Waitlist for Early Access" → `#order`, "Read a Devotion" → `#devotion`); support line "Be among the first to experience 50 devotions from the road."; the typeset book cover (Coming Soon / title / A Taxi Driver's Story / both author names). Drop the faded background logo image and the old circle-cross cover SVG.

```
section.hero
  div.hero__text
    p.eyebrow                      A Devotional Journey
    h1.hero__title.h-display
      span.hero__title-main        Chicken Souse
      span.hero__title-sub         <span class="hero__for">for</span> <span class="hero__life">Life</span>
    p.hero__subtitle               A Taxi Driver's Story
    div.hero__body                 (2-col at L)
      p.hero__tagline              "Nourishment for the soul, strength for the journey."
      p.hero__desc                 A devotional journey of real-life stories…
    div.hero__actions
      a.btn                        Join the Waitlist for Early Access
      a.link-arrow                 Read a Devotion
    p.hero__support.small          Be among the first…
  div.hero__panel
    svg.rays.rays--gold.hero__rays
    div.book-cover
      p.book-cover__label          Coming Soon
      p.book-cover__title          Chicken Souse <span>for Life</span>
      p.book-cover__edition        A Taxi Driver's Story
      svg.rays.rays--gold.book-cover__rays
      p.book-cover__author         Cleveland Maxwell Rolle &amp; Karenda Samantha Rolle
```

**Desktop (L):** `display:grid; grid-template-columns: minmax(0,7fr) minmax(0,5fr); min-height: calc(100svh - var(--nav-h)); max-height: 900px`. No `.wrap` — the teal panel bleeds to the right viewport edge and from under the nav to the section bottom.
- `.hero__text`: `padding: var(--s-9) var(--s-8) var(--s-8) max(var(--gutter), calc((100vw - var(--max)) / 2 + var(--gutter)))`; `display:flex; flex-direction:column; justify-content:flex-end` (text sits low, magazine-cover style, not vertically centred).
- `.hero__title`: `--fs-display`, weight 500, `line-height:.92`, `letter-spacing:-0.02em`, `--teal-900`. `.hero__title-main` is `display:block; text-transform:uppercase; letter-spacing:.01em; font-size:.82em` (echoes the logo caps). `.hero__title-sub` is `display:block; margin-top:-.08em; padding-left:.9em` (indented — deliberate asymmetry). `.hero__for`: Karla 700, `font-size:.16em`, uppercase, `letter-spacing:.2em`, `--ink`, vertical-align middle, with a 40px 2px gold line before it (`::before`, inline-block). `.hero__life`: `--font-script`, `font-size:1.35em`, `--teal-700`, `line-height:.8`, `font-weight:400`.
- `.hero__subtitle`: Newsreader italic 400, `--fs-h3`, `--ink-soft`, `margin-top: var(--s-5)`.
- `.hero__body`: `margin-top: var(--s-7); padding-top: var(--s-5); border-top: 1px solid var(--rule-strong); display:grid; grid-template-columns: 5fr 7fr; gap: var(--s-6)`. Tagline: Newsreader italic `--fs-lead` `--teal-700`. Desc: `--fs-body` `--ink`.
- `.hero__actions`: `margin-top: var(--s-6); display:flex; align-items:center; gap: var(--s-6); flex-wrap:wrap`. One solid button + one text link (never two buttons).
- `.hero__support`: `margin-top: var(--s-4)`, `--ink-soft`.
- `.hero__panel`: `background: var(--teal-700); position:relative; overflow:hidden; display:grid; place-items:center; padding: var(--s-8)`. `.hero__rays`: `position:absolute; left:50%; bottom:0; width:150%; transform:translateX(-50%); opacity:.95`. The rays rise from the bottom edge behind the cover.
- `.book-cover`: `position:relative; z-index:1; width:min(320px, 70%); aspect-ratio: 2/3; background: var(--paper); color: var(--teal-900); padding: var(--s-6) var(--s-5); display:flex; flex-direction:column; align-items:center; text-align:center; transform: rotate(-2.5deg); box-shadow: var(--shadow-hard); border-radius: 0 var(--r) var(--r) 0; border-left: 6px solid var(--teal-900)` (the spine). Label: Karla 700 11px uppercase `.2em` `--gold-700`. Title: Newsreader 500 `clamp(1.5rem,2.4vw,2rem)` uppercase `line-height:1.05`, `margin-top: var(--s-5)`; its inner `span` is `display:block; font-style:italic; text-transform:none; color: var(--teal-700)`. Edition: Newsreader italic `--fs-small`, `margin-top: var(--s-3)`. `.book-cover__rays`: `width:62%; margin-top:auto` with a `1px solid var(--teal-900)` line directly under it (`border-bottom` on a wrapper or `::after`). Author: Karla 500 11px uppercase `.12em`, `margin-top: var(--s-4)`, `line-height:1.5`.

**Mobile:** single column. Text first with `padding: var(--s-7) var(--gutter) var(--s-7)`; `.hero__body` stacks (tagline then desc); the button is full width, the text link sits under it left-aligned. Then `.hero__panel` as a full-bleed block, `padding: var(--s-8) var(--gutter) var(--s-9)`, cover `width: min(240px, 64%)`. No min-height.

### 4.2 Stats strip — `<section class="stats" aria-label="The book in numbers">`

Content: 50 / Devotions from the Road · 25+ / Years of Stories · ∞ / Miles of Grace. Markup: `.wrap > dl.stats__list > div.stats__item > dt.stats__num + dd.stats__label` (write `dt` first for visual order; fine semantically reversed — keep `dt` = number).

Not a coloured band. `.stats__list`: `border-top: 3px double var(--rule-strong); border-bottom: 1px solid var(--rule-strong); display:grid; grid-template-columns: repeat(3,1fr)`. Items: `padding: var(--s-6) var(--s-5)`, left-aligned, `border-left: 1px solid var(--rule)` except first (first has `padding-left:0`). Number: Newsreader 500 `--fs-stat` `--teal-700` `line-height:1`. Label: Karla 700 `--fs-eyebrow` uppercase `.14em` `--ink-soft`, `margin-top: var(--s-2)`.
Mobile: keep 3 columns, `padding: var(--s-5) var(--s-3)`; labels wrap to 2 lines; number `2.5rem`.

### 4.3 Devotion sample — `<section id="devotion" class="devotion section">`

Content: eyebrow "From the Introduction"; meta "Come and Taste"; H2 "A Bowl of Warmth, a Word for the Journey"; the opening question; 2 story paragraphs; Continue Reading toggle revealing 2 more paragraphs + Closing Prayer; sidebar: "Today's Scripture" Psalm 34:8 card and "Each Devotion Includes" list.

```
.wrap.grid12
  header.devotion__head            (L: grid-column 1 / 9)
    p.eyebrow  From the Introduction
    p.devotion__kicker  Come and Taste
    h2.h2
  div.devotion__main               (L: grid-column 1 / 8)
    p.devotion__question
    div.devotion__story            (2 <p>; first gets drop cap)
    button.link-arrow.devotion__toggle  aria-expanded="false" aria-controls="devotion-expanded"
    div#devotion-expanded hidden
      div.devotion__story (2 <p>)
      div.devotion__prayer > p.eyebrow "Closing Prayer" + p
  aside.devotion__aside            (L: grid-column 9 / 13; position:sticky; top: calc(var(--nav-h) + var(--s-6)); align-self:start)
    figure.devotion__scripture > p.eyebrow "Today's Scripture" + blockquote + figcaption "Psalm 34:8"
    div.devotion__includes > p.eyebrow "Each Devotion Includes" + ul (4 li)
```

- Kicker: Newsreader italic `--fs-h3` `--teal-700`, sits between eyebrow and H2.
- Question: Newsreader italic `--fs-lead`, `--teal-900`, `padding-left: var(--s-5); border-left: 3px solid var(--gold-500)`; `margin-block: var(--s-6)`.
- Story `p + p { margin-top: var(--s-4) }`. Drop cap on the first story paragraph only: `::first-letter { float:left; font-size: 4.2em; line-height:.82; padding: .06em .1em 0 0; color: var(--teal-700); font-weight:500 }`.
- Toggle: `.link-arrow` styled as a button (reset `background/border`), `margin-top: var(--s-5)`; label switches "Continue Reading" ⇄ "Close"; JS toggles the `hidden` attribute and `aria-expanded`. No height animation.
- Prayer: `margin-top: var(--s-6); padding: var(--s-5) 0; border-block: 1px solid var(--rule)`; text Newsreader italic `--fs-lead`.
- Scripture figure: `background: var(--teal-700); color: var(--paper); padding: var(--s-6)`; eyebrow in `--gold-100`; blockquote Newsreader italic `1.375rem/1.4`; figcaption Karla 700 `--fs-eyebrow` uppercase `.14em`, `margin-top: var(--s-4)`. Square corners, no shadow.
- Includes: `margin-top: var(--s-5); padding-top: var(--s-5); border-top: 1px solid var(--rule-strong)`. Turn the dot-separated sentence into a `ul` with 4 `li`s (same words), each `padding-block: var(--s-2); border-bottom: 1px solid var(--rule)`; Karla `--fs-ui`.

Mobile: single column, aside after main, not sticky.

### 4.4 Foundation scripture — `<section class="verse bg-teal-700 on-dark" aria-label="Foundation scripture">`

Content: eyebrow "Foundation Scripture"; the Colossians quote; "Colossians 3:23 · The Road Verse of Every Mile".

Markup: `.wrap > figure.verse__fig > p.eyebrow + blockquote.verse__text + figcaption.verse__ref`, then `svg.rays.rays--gold.verse__rays` as a direct child of the section.
Centred (one of two centred moments). `padding: var(--s-9) 0 0`. Blockquote: Newsreader italic 400 `--fs-quote`, `line-height:1.25`, `max-width: 44ch`, `margin-inline:auto`, `--paper`. Eyebrow `--gold-100` (centred, `justify-content:center`). Ref: Karla 700 `--fs-eyebrow` uppercase `.14em` `--teal-200`, `margin-top: var(--s-5)`. `.verse__rays`: `width: min(520px, 80%); margin: var(--s-7) auto 0` — the half-sun sits on the section's bottom edge like a sunrise on the horizon. Section has `overflow:hidden`.

### 4.5 What's Inside — `<section id="whats-inside" class="inside section">`

Content: eyebrow "What's Inside"; H2 "Four Elements. Fifty Devotions."; intro paragraph; four elements (01 The Question, 02 The Story, 03 The Scripture, 04 The Prayer, each with its description); "Also Included" callout (Max's Traditional Bahamian Chicken Souse Recipe / Plus: Authentic Bahamian Johnny Bread / link "See the Recipe" → `#recipe`).

**No cards and no icons** (delete the Phosphor icons and inline icon SVGs — numerals do the job).

```
.wrap.grid12
  header.inside__head              (L: grid-column 1 / 6; sticky like devotion aside)
    p.eyebrow, h2.h2 (keep the <br>), p.lead
  ol.inside__list                  (L: grid-column 7 / 13)
    li.inside__item ×4 > span.inside__num "01" + div > h3.h3 + p
  aside.inside__also               (L: grid-column 1 / 13)
    div > p.eyebrow "Also Included" + p.inside__also-title + p.inside__also-sub
    a.btn.btn--gold  See the Recipe
```

- `.inside__list`: `list-style:none; border-top: 1px solid var(--rule-strong)`. `.inside__item`: `display:grid; grid-template-columns: 4.5rem 1fr; gap: var(--s-5); padding-block: var(--s-6); border-bottom: 1px solid var(--rule)`. `.inside__num`: Newsreader italic 400 `3rem`, `line-height:1`, `--gold-700`. Item `p`: `--ink-soft`, `margin-top: var(--s-2)`.
- `.inside__also`: `margin-top: var(--s-8); background: var(--teal-900); color: var(--paper); padding: var(--s-7); display:flex; justify-content:space-between; align-items:center; gap: var(--s-6); flex-wrap:wrap`. Add class `on-dark`. Title: Newsreader italic `--fs-h3`. Sub: Karla `--fs-ui` `--teal-200`. Drop the "↓" character from the link text; `.btn` supplies its own arrow.

Mobile: stack; `.inside__item` columns `3rem 1fr`; `.inside__also` padding `var(--s-6) var(--s-5)`, button full width.

### 4.6 The Journey — `<section id="book-sections" class="journey section bg-sand">`

Content: eyebrow "The Journey"; H2 "Five Sections. One Road."; intro paragraph; five entries each with "Section N", title, full quote, cite "— Cleveland Maxwell Rolle".

```
.wrap.grid12
  header.journey__head             (L: grid-column 1 / 5; sticky)
  ol.journey__list                 (L: grid-column 6 / 13)
    li.journey__stop ×5
      p.journey__no   Section 1
      h3.h3           The Beginning
      blockquote.journey__quote > p + cite
```

The device is a **road centre-line**: `.journey__list { list-style:none; position:relative; padding-left: var(--s-7) }` with `::before { content:""; position:absolute; left:7px; top:8px; bottom:8px; width:2px; background: repeating-linear-gradient(to bottom, var(--teal-700) 0 14px, transparent 14px 26px) }`. Each `.journey__stop { position:relative; padding-bottom: var(--s-7) }` (last: 0) with `::before { content:""; position:absolute; left: calc(var(--s-7) * -1); top:6px; width:16px; height:16px; border-radius:50%; background: var(--gold-500); border: 3px solid var(--sand); box-shadow: 0 0 0 2px var(--teal-900) }` (a ring, not a drop shadow — this is the one permitted circle).
- `.journey__no`: Karla 700 `--fs-eyebrow` uppercase `.14em` `--gold-700`.
- Quote `p`: Newsreader italic `--fs-lead` `--ink`, `margin-top: var(--s-3)`; keep the quotation marks in the text. `cite`: `display:block; margin-top: var(--s-3)`; Karla 500 `--fs-small` normal style `--ink-soft`.

Mobile: stack; list `padding-left: var(--s-6)`.

### 4.7 Recipe — `<section id="recipe" class="recipe section bg-teal-100">`

Content: eyebrow "Straight from Bimini"; H2 "Max's Chicken Souse"; intro; 11 ingredients with amounts; 6 method steps; Johnny Bread (attribution "Adapted from Karenda's sister, Leona Hylton", 7 ingredients, method paragraph); aside "An Invitation" (second paragraph only — its first paragraph is a word-for-word duplicate of the intro, so show that sentence once, as the intro) and the "On Johnny Bread" note.

**Tabs are removed.** Everything is visible, laid out as a cookbook spread. Delete `switchTab` and the tab buttons. (The Tweaks "show recipe" toggle goes away with the Tweaks panel — see §8.)

```
.wrap
  header.recipe__head.grid12
    div (L: 1 / 8)   p.eyebrow, h2.h2, p.lead (intro)
    aside.recipe__invite (L: 9 / 13)  p.eyebrow "An Invitation" + p ("In The Bahamas, chicken souse is more than a meal…")
  article.recipe__page
    div.recipe__cols.grid12
      section.recipe__ingredients (L: 1 / 6)   h3.recipe__label "Ingredients" + ul.ingredients > li > span.ingredients__name + span.ingredients__dots + span.ingredients__amt
      section.recipe__method (L: 7 / 13)       h3.recipe__label "Method" + ol.steps > li
  article.recipe__page.recipe__page--bread
    header  h3.h3 "Johnny Bread" + p.recipe__credit "Adapted from Karenda's sister, Leona Hylton"
    div.recipe__cols.grid12
      section (L: 1 / 6)   h4.recipe__label "Ingredients" + ul.ingredients
      section (L: 7 / 13)  h4.recipe__label "Method" + p (the baking paragraph) + p.recipe__note ("On Johnny Bread: …")
```

- `.recipe__page`: `background: var(--white); border: 1px solid var(--teal-900); padding: clamp(24px, 5vw, 64px); margin-top: var(--s-7)`. Second page `margin-top: var(--s-5)`. Square corners, no shadow.
- `.recipe__label`: Karla 700 `--fs-eyebrow` uppercase `.14em` `--teal-700`; `padding-bottom: var(--s-3); border-bottom: 2px solid var(--teal-900); margin-bottom: var(--s-3)`.
- `.ingredients`: `list-style:none`. `li`: `display:flex; align-items:baseline; gap: var(--s-2); padding-block: 10px` with **no** bottom border; instead a dotted leader joins name to amount: put `<span class="ingredients__dots" aria-hidden="true"></span>` between the two spans, styled `flex:1; min-width: 16px; border-bottom: 2px dotted #B9BDB6; transform: translateY(-4px)`. Name: Newsreader `--fs-body`. Amount: Karla 500 `--fs-ui` `--ink-soft`, `white-space:nowrap` (allow wrap <720).
- `.steps`: `list-style:none; counter-reset: step`. `li`: `counter-increment: step; display:grid; grid-template-columns: 3rem 1fr; gap: var(--s-4); padding-block: var(--s-4); border-bottom: 1px solid var(--rule)`; `li::before { content: counter(step); font: italic 400 2.25rem/1 var(--font-serif); color: var(--gold-700) }`.
- `.recipe__credit`: Newsreader italic `--fs-small` `--ink-soft`.
- `.recipe__invite`: `border-top: 3px solid var(--gold-500); padding-top: var(--s-4)`; text `--fs-ui` Karla `--ink-soft`; align-self end.
- `.recipe__note`: `margin-top: var(--s-5); background: var(--gold-100); padding: var(--s-4) var(--s-5); border-left: 3px solid var(--gold-500)`; `--fs-ui`; keep the bold "On Johnny Bread:" lead-in.

Mobile: single column; method follows ingredients with `margin-top: var(--s-7)`.

### 4.8 Authors — `<section id="authors" class="authors section">`

Content: eyebrow "The Authors"; Max — name, role line, full bio; Karenda — name, role line, bio; photo `author-photo-4.jpeg` (existing). Add `author-photo-3.jpeg` as a small second photo (asset already in the repo; adds the candid shot).

```
.wrap.grid12
  div.authors__photos              (L: grid-column 1 / 7)
    img.authors__photo-main        assets/author-photo-4.jpeg  (width=1086 height=1448)
    img.authors__photo-inset       assets/author-photo-3.jpeg  (width=1200 height=1600)
  div.authors__text                (L: grid-column 8 / 13; align-self:center)
    p.eyebrow  The Authors
    article.authors__bio ×2 > h3.h2 (Max) / h3.h3 (Karenda) + p.authors__role + p
```

- `.authors__photos`: `position:relative; padding-bottom: var(--s-8); padding-right: var(--s-8)`. Main: `width:100%; aspect-ratio:4/5; object-fit:cover; object-position: center top`. Inset: `position:absolute; right:0; bottom:0; width:38%; aspect-ratio:3/4; object-fit:cover; object-position:center top; border: 8px solid var(--paper)`. Behind the main photo, a flat `--teal-100` block: `.authors__photos::before { content:""; position:absolute; left: calc(var(--s-5) * -1); top: var(--s-7); width:60%; bottom:0; background: var(--teal-100); z-index:-1 }` (section needs `isolation:isolate`).
- Alt text: main keeps the existing alt; inset `alt="Max and Karenda Rolle smiling together"`.
- `.authors__bio + .authors__bio { margin-top: var(--s-7); padding-top: var(--s-6); border-top: 1px solid var(--rule) }`. Role: Karla 700 `--fs-eyebrow` uppercase `.12em` `--gold-700`, `margin: var(--s-2) 0 var(--s-4)`. Keep the " · " separators.

Mobile: photos first (`padding-right: var(--s-6); padding-bottom: var(--s-7)`; no `::before` offset left — set `left:0`), then text.

### 4.9 Editor — `<section id="editor" class="editor section bg-teal-900 on-dark">`

Content: eyebrow "The Editor"; name "Cassandra Nasha Isidore"; "The Grow and Glow Tribe Ministry"; the blockquote; bio paragraph; photo `editor-photo-2.jpeg` (1090×1600). Move **all** inline styles into CSS. Remove the gradient overlay div.

```
.wrap.grid12
  div.editor__text  (L: 1 / 8)   p.eyebrow, h2.h2 ("Cassandra Nasha <em>Isidore</em>", keep the <br>), p.editor__org, blockquote.editor__quote, p.editor__bio
  figure.editor__photo (L: 9 / 13; align-self:center)  img
```

- `.editor__org`: Karla 700 `--fs-eyebrow` uppercase `.14em` `--gold-500`. `h2 em` here is `--teal-200`.
- `.editor__quote`: Newsreader italic `--fs-h3` `line-height:1.45` `--paper`; `margin-block: var(--s-6); padding-left: var(--s-5); border-left: 3px solid var(--gold-500)`; no background.
- `.editor__bio`: `--teal-200`.
- `.editor__photo`: `position:relative`; `img { width:100%; aspect-ratio:3/4; object-fit:cover; object-position:center top }`; offset outline frame `::after { content:""; position:absolute; inset: var(--s-4) calc(var(--s-4) * -1) calc(var(--s-4) * -1) var(--s-4); border: 1px solid var(--gold-500); z-index:-1 }` (figure needs `isolation:isolate`).

Mobile: text first, then photo at `max-width: 280px`, left-aligned, `margin-top: var(--s-7)`.

### 4.10 Seminars — `<section id="seminars" class="seminars section bg-sand">`

Content: eyebrow "Book a Seminar"; H2 "Bring the Road to Your Event"; intro; "Max speaks on…" paragraph; four engagement types with descriptions; WhatsApp line; the full booking form (all 7 controls + both hidden inputs + success state). Add `authors-photo.png` (Max and Karenda at the podium — existing asset) as a supporting photo.

```
.wrap
  header.seminars__head.grid12 > div (L: 1 / 8)  p.eyebrow, h2.h2, p.lead
  div.grid12.seminars__body
    div.seminars__info (L: 1 / 7)
      img.seminars__photo   assets/authors-photo.png (width=1024 height=535) alt="Max speaking at a podium with Karenda beside him"
      p  (Max speaks on faith…)
      ul.seminars__types > li ×4 > h3.seminars__type-name + p
      p.contact-line  WhatsApp: <a href="https://wa.me/12424422629">+1 (242) 442-2629</a>
    div.seminars__form (L: 8 / 13)
      div.form#seminar-form-container > h3.form__title "Book an Event" + form#seminar-form + div.form-success#seminar-success
```

- `.seminars__photo`: `width:100%; aspect-ratio: 16/9; object-fit:cover; margin-bottom: var(--s-6)`. It is only 1024px wide — never let it render wider than 620px.
- `.seminars__types`: `list-style:none; margin-top: var(--s-6); border-top: 1px solid var(--rule-strong)`. `li`: `padding: var(--s-4) 0 var(--s-4) var(--s-6); border-bottom: 1px solid var(--rule); position:relative`; `li::before { content:""; position:absolute; left:0; top: 1.55em; width:16px; height:2px; background: var(--gold-500) }` (gold tick replaces the ✦ glyph). Name: Newsreader 500 `1.1875rem` `--teal-900`. Desc: `--fs-ui` Karla `--ink-soft`.
- `.contact-line` (owned by A, reused in order): Karla `--fs-ui`; link `--teal-700` 700 with gold underline. Remove the WhatsApp/email icon SVGs; the words "WhatsApp:" / "Email:" are the labels.
- Form column: `position:sticky; top: calc(var(--nav-h) + var(--s-5)); align-self:start` at L.

Mobile: info then form.

### 4.11 Waitlist — `<section id="order" class="order section">`

Content: eyebrow "Coming Soon"; H2 "The Journey is Just Beginning"; intro (fix typo, see §6); "This is a small, independent devotional…" paragraph; WhatsApp + Email lines; "When it launches" block; the waitlist form (4 controls + both hidden inputs + success state).

```
.wrap.grid12
  div.order__info (L: 1 / 7)
    p.eyebrow, h2.h2, p.lead, p
    p.contact-line ×2 (WhatsApp, Email)
    div.order__launch > h3.eyebrow "When it launches" + p
    svg.rays.rays--gold.order__rays
  div.order__form (L: 8 / 13)
    div.form.form--feature#order-form-container > h3.form__title "Get Notified" + form#order-form + div.form-success#form-success
```

- `.order__launch`: `margin-top: var(--s-6); background: var(--gold-100); padding: var(--s-5); border-left: 3px solid var(--gold-500)`.
- `.order__rays`: `width: 220px; margin-top: var(--s-7)` with `border-bottom: 1px solid var(--rule-strong)` on a wrapping element the width of the column — a small sunrise on a horizon line. Hide <720.
- `.form--feature` (A): the one filled form — `background: var(--teal-700)`, text `--paper`, labels `--paper`, inputs keep white ground with `border-color: transparent`, submit is `.btn--gold`, focus ring gold. This is the page's closing colour moment.

Mobile: info then form.

---

## 5. Components (Chunk A)

**Eyebrow** `.eyebrow`: Karla 700, `--fs-eyebrow`, uppercase, `letter-spacing:.14em`, `--gold-700` (`--gold-500` inside `.on-dark`), `display:flex; align-items:center; gap: var(--s-3); margin-bottom: var(--s-4)`; `::before { content:""; width:28px; height:2px; background: var(--gold-500) }`. Not centred except inside `.verse`.

**Type roles**: `.h2` = `--fs-h2`/`--lh-head`; `.h3` = `--fs-h3`/1.2; `.lead` = `--fs-lead`/1.5 `--ink-soft`, `margin-top: var(--s-4)`; `.small` = Karla `--fs-small`.

**Button** `.btn`: `display:inline-flex; align-items:center; gap: var(--s-3); min-height:52px; padding: 0 var(--s-5); background: var(--teal-700); color: var(--paper); font: 700 var(--fs-ui)/1 var(--font-sans); letter-spacing:.02em; border:0; border-radius: var(--r); cursor:pointer; transition: background var(--dur-fast) var(--ease)`. Sentence case, **not** uppercase. `::after { content:"\2192"; transition: transform var(--dur-fast) var(--ease) }`; hover/focus-visible: `background: var(--teal-900)` and arrow `translateX(4px)`. Active: `translateY(1px)`. Disabled: `opacity:.6; cursor:wait`.
- `.btn--gold`: `background: var(--gold-500); color: var(--ink)`; hover `background:#FFC53D`.
- `.btn--small`: `min-height:40px; padding: 0 var(--s-4); font-size: var(--fs-small)`; no arrow.
- No outline/ghost button exists in this system.

**Text link** `.link-arrow`: Karla 700 `--fs-ui` `--teal-700`; `padding-bottom:4px; background: linear-gradient(var(--gold-500), var(--gold-500)) 0 100% / 100% 2px no-repeat`; `::after { content:" \2192" }`; hover: colour → `--teal-900` and the arrow moves `translateX(4px)` (the underline does not animate). For the devotion toggle, when `aria-expanded="true"` the arrow is `\2191`.

**Inline links** in prose (`main p a`, `.contact-line a`): `--teal-700`, `text-decoration: underline; text-decoration-color: var(--gold-500); text-decoration-thickness: 2px; text-underline-offset: 3px`; hover `--teal-900`.

**Rules**: `.rule { border:0; border-top: 1px solid var(--rule) }`; `.rule--double { border-top: 3px double var(--rule-strong) }`.

**Nav** `header.site-nav` (replace `<nav id="main-nav">`; keep `id="main-nav"` on the header):

```
header.site-nav#main-nav
  div.wrap.site-nav__bar
    a.site-nav__logo href="#"  > img src="assets/logo-horizontal.svg" alt="Chicken Souse for Life" height=40
    nav.site-nav__links aria-label="Primary" > a ×5  (The Book #devotion · Inside #whats-inside · Recipe #recipe · Authors #authors · Seminars #seminars)
    a.btn.btn--small.site-nav__cta href="#order"  Join the Waitlist
    button.site-nav__toggle aria-expanded="false" aria-controls="nav-panel"  Menu
  div.nav-panel#nav-panel hidden
    nav aria-label="Mobile" > a ×7 (The Book, What's Inside, The Journey #book-sections, The Recipe, The Authors, Seminars, Join the Waitlist #order)
    p.nav-panel__contact  WhatsApp +1 (242) 442-2629 · chickensouseforlife@gmail.com (both linked)
```

- `position: sticky; top:0; z-index:50; height: var(--nav-h); background: var(--paper); border-bottom: 1px solid var(--rule)`. **No blur, no translucency, no shadow.** When scrolled (`.is-scrolled`, set by JS past 20px): `border-bottom-color: var(--rule-strong)`.
- Bar: `display:flex; align-items:center; justify-content:space-between; height:100%`. Logo `img { height:40px; width:auto }` (32px mobile). Drop the text wordmark next to it (the SVG carries it).
- Links: `display:flex; gap: var(--s-6)`; Karla 500 `--fs-ui` `--ink`, sentence case; hover/`[aria-current]`: `--teal-700` with a 2px gold underline at `text-underline-offset: 8px`.
- The nav CTA text changes from "Coming Soon" to "Join the Waitlist" ("Coming Soon" stays on the book cover and the order eyebrow). "Order" link is dropped from the list because the CTA is the same destination; "Recipe" is added.
- `html { scroll-padding-top: calc(var(--nav-h) + 16px); scroll-behavior: smooth }`.
- **Below L (1040px):** hide `.site-nav__links` and `.site-nav__cta`; show `.site-nav__toggle` — a **text** button, not a hamburger icon: Karla 700 `--fs-ui` `--teal-900`, `min-height:44px; padding: 0 var(--s-3); border: 1px solid var(--teal-900); border-radius: var(--r); background:none`. Label switches "Menu" ⇄ "Close".
- `.nav-panel`: `position:fixed; inset: var(--nav-h) 0 0 0; background: var(--teal-900); color: var(--paper); padding: var(--s-6) var(--gutter) var(--s-7); overflow-y:auto; display:flex; flex-direction:column`. Links: Newsreader 500 `1.875rem/1.1`, `padding-block: var(--s-4); border-bottom: 1px solid var(--rule-dark)`, `--paper`; the last ("Join the Waitlist") is `--gold-500`. Contact: `margin-top:auto; padding-top: var(--s-6)`; Karla `--fs-small` `--teal-200`. Opening: remove `hidden`, add `body.nav-open { overflow:hidden }`; fade in `opacity 0→1` over `--dur-fast`. Close on link click, Esc, or resize ≥1040. Return focus to the toggle on close.

**Forms**: `.form { background: var(--white); border: 1px solid var(--teal-900); border-top: 6px solid var(--teal-700); padding: clamp(24px, 4vw, 40px) }` (`.form--feature` overrides: see 4.11, and `border:0`). `.form__title`: Newsreader 500 `--fs-h3`, `margin-bottom: var(--s-5)`.
- `.field { display:flex; flex-direction:column; gap: var(--s-2); margin-bottom: var(--s-4) }`. `.field-row { display:grid; gap: 0 var(--s-4) }`; at M: `grid-template-columns: 1fr 1fr`.
- `.field__label`: Karla 700 `--fs-small` `--ink` (sentence case, not tracked caps). Required fields get a visible " (required)" suffix in `--ink-soft` weight 400 — add `<span class="field__req">(required)</span>` for first name, last name, email in both forms.
- `.field__input` (input, select, textarea): `width:100%; min-height:48px; padding: 12px 14px; font: 400 1rem/1.4 var(--font-sans); color: var(--ink); background: var(--white); border: 1px solid var(--field-border); border-radius: var(--r)`. Font-size must stay 16px (prevents iOS zoom). Textarea `min-height:120px; resize:vertical`. Placeholder `#5E7278` (5.0 on white). Hover `border-color: var(--teal-700)`. Focus: `outline: 2px solid var(--teal-700); outline-offset: 2px; border-color: var(--teal-700)`. Select: `appearance:none; padding-right:40px;` chevron via `background: var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%2316303A' stroke-width='2'/%3E%3C/svg%3E") right 14px center no-repeat`.
- Submit: `.btn` full width (`width:100%; justify-content:center`), `margin-top: var(--s-2)`. Keep `data-label` and the exact labels ("Notify Me When It's Ready", "Send Booking Inquiry").
- `.form__note`: Karla `--fs-small` `--ink-soft`, `margin-top: var(--s-3)`.
- `.form-error`: `display:none`; when `.is-shown`: block, Karla 500 `--fs-small`, `color: var(--error)` (on `.form--feature`: `--gold-100` text on teal), `margin-top: var(--s-3)`; element has `role="alert"`. Replaces both `alert()` calls — same two messages.
- `.form-success`: `display:none`; `.show` → block. Newsreader italic `--fs-h3` `--teal-900` (`--paper` in feature form) for the first line; second line is a `<p>` in Karla `--fs-ui`. Replace the "✦" glyph with a small `svg.rays.rays--gold` at `width:72px; margin-bottom: var(--s-4)`. Keep the class name `show` (JS uses it). Add `tabindex="-1"` and move focus to it on success.

**Footer** `footer.site-footer.bg-teal-900.on-dark`:

```
div.wrap.site-footer__sun > svg.rays.rays--gold   (svg width 180px, left-aligned; the wrapper has border-bottom: 1px solid var(--rule-dark) so the sun sits on a horizon line; margin-bottom: var(--s-7))
div.wrap.grid12.site-footer__top
  div.site-footer__brand (L: 1 / 6)   img assets/logo-mark.svg (48px, alt="") + p.site-footer__name "Chicken Souse for <span>Life</span>" + p.site-footer__tagline + p.site-footer__desc
  nav (L: 7 / 9)  aria-label="Footer"  h2.eyebrow "Navigate" + ul (7 links, unchanged)
  div (L: 9 / 11)  h2.eyebrow "Contact" + ul (4 items)
  div (L: 11 / 13) h2.eyebrow "From Bimini" + ul (3 items)
div.wrap.site-footer__bottom   p (copyright) + p (Colossians line)
```

- `border-top: 4px solid var(--gold-500); padding-top: var(--s-7)`. Name: Newsreader 500 `1.75rem` uppercase `.02em`; its `span` is `--font-script`, `text-transform:none`, `font-size:1.5em`, `--gold-500`. Tagline: Newsreader italic `--fs-lead` `--teal-200`. Desc: Karla `--fs-ui` `--teal-200`, `max-width: 38ch`.
- Lists: `list-style:none`; items Karla `--fs-ui`, `padding-block: 6px`; links `--paper`, underline only on hover (gold). Minimum tap height 32px desktop / 44px mobile.
- Link fixes (currently dead `#` links): "WhatsApp Us" → `https://wa.me/12424422629`; "Bulk Orders" → `#order`; "Churches & Groups" → `#seminars`; "Bimini, Bahamas" and "Amazon" become plain text `<li>`s (no link — nothing to link to yet); "Coming Soon" stays → `#order`.
- Bottom: `margin-top: var(--s-8); padding-block: var(--s-5); border-top: 1px solid var(--rule-dark); display:flex; justify-content:space-between; gap: var(--s-4); flex-wrap:wrap`; Karla `--fs-small` `--teal-200`. Text unchanged.
- Mobile: brand full width, then the three lists in a 2-column grid (Navigate spans its own column full height; Contact and From Bimini stack in the second).

**Skip link**: visually hidden until focus; on focus `position:fixed; top:8px; left:8px; z-index:100` styled as `.btn.btn--small`.

**Reveal**: `.reveal { opacity:0; transform: translateY(16px); transition: opacity var(--dur-reveal) var(--ease), transform var(--dur-reveal) var(--ease) }` `.reveal.is-visible { opacity:1; transform:none }`. Apply `.reveal` to section headers, photos, and form containers only (≈ 2–3 per section) — not to every paragraph. No stagger, no parallax, no hover lifts. Wrap the hidden state in `html.js` (C adds `document.documentElement.classList.add('js')` inline in `<head>`) so content is visible without JS.

---

## 6. Copy guidance

Keep wording, facts, names, numbers, scripture text, quotes, recipe quantities and steps **exactly** as they are. Allowed changes, and only these:

1. Fix the typo in the waitlist intro: "Chicken Souse for the Life when it's released" → "Chicken Souse for Life when it's released".
2. Nav CTA "Coming Soon" → "Join the Waitlist"; nav gains "Recipe", loses "Order" (same target as CTA).
3. "See the Recipe ↓" → "See the Recipe" (arrow comes from the button).
4. Recipe: show the "This recipe is shared not only as an instruction…" sentence once (it appears twice today). Add the plain headings "Ingredients" / "Method" / "Johnny Bread" where the tab labels used to be.
5. "Each Devotion Includes" becomes a 4-item list with the same four phrases.
6. Footer dead links repaired as listed in §5.
7. Typographic cleanup only: curly quotes/apostrophes, real en/em dashes, non-breaking space in "+1 (242) 442-2629".

Do not write new marketing lines. Do not add words like "discover", "unlock", "elevate", "journey awaits". Do not change the `<title>`. Do not change "© 2024". Do not "correct" the recipe (the method mentions bay leaves, thyme and pepper that are not in the ingredient list — leave as is; it is flagged for the owner in §9).

---

## 7. Accessibility + performance

**Contrast (WCAG ratios, all checked):**

| Foreground | Background | Ratio | Use |
|---|---|---|---|
| `--ink` #16303A | `--paper` | 13.0 | body |
| `--ink` | `--teal-100` | 11.9 | recipe ground |
| `--ink-soft` #4A5F66 | `--paper` / `--sand` / `--teal-100` | 6.4 / 5.8 / 5.8 | secondary text |
| `--teal-700` #0F6E7C | `--paper` / `--white` / `--sand` / `--teal-100` | 5.6 / 5.9 / 5.1 / 5.1 | links, kickers |
| `--paper` | `--teal-700` | 5.6 | verse band, buttons, feature form |
| `--paper` | `--teal-900` | 11.2 | editor, footer |
| `--teal-200` | `--teal-900` | 8.8 | secondary on dark |
| `--gold-500` | `--teal-900` | 6.2 | eyebrows on dark |
| `--gold-500` | `--teal-700` | 3.1 | **graphics only** (rays, ticks, borders) |
| `--gold-100` #FCEFC9 | `--teal-700` | 5.2 | eyebrows on teal-700 |
| `--ink` | `--gold-500` | 7.2 | gold button |
| `--gold-700` #7A5400 | `--paper` / `--sand` / `--gold-100` | 6.4 / 5.9 / 5.9 | eyebrows, numerals on light |
| `--error` | `--paper` | 6.2 | form errors |

Rule: `--gold-500` is never used for text on a light ground. On `--teal-700` grounds, small eyebrow text uses `--gold-100`, not `--gold-500` (override in `.bg-teal-700 .eyebrow`, `.devotion__scripture .eyebrow`, `.form--feature`).

- **Focus**: `:focus-visible { outline: 2px solid var(--teal-700); outline-offset: 3px }`; inside `.on-dark` and `.form--feature`: `outline-color: var(--gold-500)`. Never remove outlines.
- **Semantics**: one `h1`; section titles `h2`; items `h3`. Real `<button>`s for toggles with `aria-expanded`/`aria-controls`. `figure/blockquote/figcaption` for scripture. Lists are real lists. Decorative SVG `aria-hidden="true"`. `lang="en"` stays.
- **Targets**: all interactive elements ≥44×44px on touch widths.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce) { html { scroll-behavior:auto } *, *::before, *::after { transition-duration: .01ms !important; animation: none !important } .reveal { opacity:1; transform:none } }`.
- **Images**: every `<img>` gets explicit `width`/`height` (values in §4), `decoding="async"`, and `loading="lazy"` (all are below the fold). Always `object-fit: cover` inside a fixed `aspect-ratio`. Display caps: `author-photo-4` ≤ 620px wide, `author-photo-3` ≤ 260px, `editor-photo-2` ≤ 400px, `authors-photo.png` ≤ 620px. Do not use `assets/logo.png` (2.6 MB, old orange logo) anywhere; favicon becomes `<link rel="icon" type="image/svg+xml" href="assets/logo-mark.svg">`.
- **Weight**: remove React, ReactDOM, Babel, `tweaks-panel.jsx`, the Tweaks `<script type="text/babel">` block, `#tweaks-root`, and the Phosphor icon script from `index.html` (dev-only tooling; ~1.5 MB of blocking JS). Leave the `tweaks-panel.jsx` file on disk. Fonts: the single `<link>` above with `display=swap`; no other font requests. `main.js` loads with `defer`.
- Add `<meta name="description" content="A devotional journey of real-life stories, faith, and Bahamian culture — designed to nourish your soul and strengthen your walk with God.">` (existing hero sentence) and `<meta name="theme-color" content="#0F6E7C">`.
- No horizontal scroll at 320px. Test at 320, 375, 768, 1040, 1440.

---

## 8. Implementation split (three parallel chunks, no shared files)

All three agents read this whole document first. The class contract in §3 and the markup outlines in §4–5 are the interface; do not rename anything.

**Chunk A — `style.css` (full rewrite; owns this file only).**
Delete all existing rules. Write, in this order: `:root` tokens (§2) → reset + base element styles → layout utilities (`.wrap .grid12 .section .bg-* .on-dark`) → type roles + `.eyebrow` → `.btn`, `.link-arrow`, inline links, `.contact-line`, rules → `.rays` → `.skip-link` → nav + `.nav-panel` → forms (incl. `.form--feature`, success, error) → footer → `.reveal` → reduced-motion block. Nothing section-specific.

**Chunk B — `sections.css` (new file; owns this file only).**
One commented block per section in page order: hero (incl. `.book-cover`), stats, devotion, verse, inside, journey, recipe (incl. `.ingredients`, `.steps`), authors, editor, seminars, order. Mobile-first with M/L media queries inside each block. Use only tokens via `var(--…)`; define no new custom properties and no selectors from Chunk A's list.

**Chunk C — `index.html` (rewrite in place) + `main.js` (new).**
- `<head>`: new font link, meta additions, favicon, `<link rel="stylesheet" href="style.css">` then `<link rel="stylesheet" href="sections.css">`, inline `<script>document.documentElement.classList.add('js')</script>`, `<script src="main.js" defer></script>`. Remove the scripts listed in §7.
- `<body>`: rays symbol, skip link, header, `<main>` with sections in the §4 order using the outlined markup, footer. **Zero inline `style=""` attributes and zero inline `on*=""` handlers** in the result. Copy all text from the current file per §6; diff the old and new text afterwards to confirm nothing was dropped.
- `main.js`: (1) nav `.is-scrolled` toggle; (2) mobile menu open/close + focus return + Esc; (3) IntersectionObserver adding `.is-visible` to `.reveal` (threshold .1, rootMargin `0px 0px -40px 0px`, unobserve after); (4) devotion toggle (`hidden` + `aria-expanded` + label); (5) `submitToWeb3Forms` kept as-is (same endpoint, FormData, "Sending…" state, `data-label` restore) but bound with `addEventListener('submit')` on `#order-form` → `#form-success` and `#seminar-form` → `#seminar-success`, and the two `alert()` calls replaced by showing the form's `.form-error` with the same message text. Each form gets one `<p class="form-error" role="alert"></p>` after its submit button.

Integration check (whoever finishes last): load the page, confirm no unstyled class names (grep every class in `index.html` against both CSS files), test both forms' validation without submitting, test the menu at 375px, tab through the whole page.

---

## 9. Flags for the owner (not for implementers to resolve)

- The site content describes a **devotional** co-authored by Cleveland Maxwell "Max" Rolle and Karenda Samantha Rolle; the brief called it a food/culture book by Karenda Swain-Rolle. This spec follows the site content.
- Recipe method mentions bay leaves, thyme and pepper that are missing from the ingredient list.
- Copyright line says 2024.
- There is no food photo and no real book-cover image; the design uses a typeset cover and works without them, but a souse photo in the recipe header and a real cover in the hero would both drop in cleanly later.
- Web3Forms access key stays in the HTML as today (public by design).
