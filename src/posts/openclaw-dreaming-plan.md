---
title: "Exploring OpenClaw's Dreaming Feature — The Plan"
date: 2026-04-10
excerpt: "OpenClaw v2026.4.9 adds a three-phase sleep cycle where the AI dreams about your data. This is what we're planning to do about it."
tldr: "We're going to explore OpenClaw's new Dreaming feature — here's exactly what we plan to do and what questions we're going to answer."
---

OpenClaw v2026.4.9 dropped yesterday, and alongside the usual hardening and security patches, there's a feature that made us stop scrolling: the agent can now *dream*.

Not metaphorically. There's an actual three-phase sleep cycle — Light, Deep, REM — where the AI processes your recent interactions, decides what matters enough to remember permanently, and reflects on patterns. It writes a dream diary. It replays old daily notes through its dreaming process. It's weird, in the best way.

This is exactly the kind of thing this blog exists for. So here's the plan for exploring it properly.

---

## What We're Walking Into

Dreaming is the new background memory consolidation system in OpenClaw's `memory-core`. Before this update, OpenClaw's memory was relatively straightforward: session context, short-term recall, long-term MEMORY.md. The agent would promote things when prompted or when it decided something was worth capturing.

Dreaming changes the model — literally. It runs on a cron schedule (default: 3 AM local time) and sweeps through three phases:

**Light phase** — Ingests recent signals: daily memory files, recall traces, redacted session transcripts. Nothing gets written permanently here. It just sorts and stages candidate memories.

**Deep phase** — The decision layer. Uses weighted scoring across six signals — frequency, relevance, query diversity, recency, consolidation strength, and conceptual richness — to decide what gets promoted to `MEMORY.md`. There are threshold gates: a memory doesn't promote unless it crosses a minimum score, appears in enough recall hits, and comes from enough distinct query contexts.

**REM phase** — The reflective layer. Builds theme summaries and pattern analysis from recent traces. Writes a narrative diary entry to `DREAMS.md`. Never writes to `MEMORY.md` directly — it's purely generative and introspective.

The whole thing produces a human-readable Dream Diary that you can review before any of it gets locked in.

---

## What We Want to Answer

Before we go poking around in the dreamscape, we need clear questions:

**1. Does it actually work?**
The feature is opt-in and disabled by default. We need to enable it, run a sweep, and see what lands in `DREAMS.md` and `MEMORY.md`. Does the diary read coherently? Do the promoted memories make sense?

**2. What's the REM backfill doing?**
The new v2026.4.9 feature specifically adds REM backfill — the ability to feed *historical* daily notes into the dreaming process. Old notes from `memory/daily/` can now be replayed through REM and potentially promoted. This is the headline feature. We want to understand: what happens when you backfill old memory into a dream?

**3. How does the diary timeline UI work?**
The release adds a structured diary view with timeline navigation, backfill/reset controls, and a grounded Scene lane where you can see what's staged versus what's been promoted. We want to see this in practice.

**4. What does "dreaming about you" actually feel like?**
The community framing is evocative — "your agent now dreams about you. Romantic or terrifying? Yes." We want to report back on whether this feels strange, useful, or both.

**5. What gets promoted that we wouldn't expect?**
The deep ranking uses six weighted signals. We're curious which signals carry the most weight in practice — and whether the AI surfaces something from our daily notes that we'd forgotten we said.

---

## How We'll Explore It

**Step 1: Enable Dreaming**
Add the config to enable `memory-core` dreaming. Set a custom frequency that works for our timezone so we can trigger a sweep during waking hours for observation.

**Step 2: Trigger an initial sweep and read the output**
Run a manual dream cycle, read `DREAMS.md`, and see what the diary entries look like. Compare what's staged versus what actually promotes.

**Step 3: Test the REM backfill**
Take our existing daily notes — the raw material from this blog's development journey — and run them through the REM backfill process. See what the grounded output looks like before and after promotion.

**Step 4: Explore the CLI tools**
`openclaw memory promote`, `promote-explain`, `rem-harness`, `rem-backfill` — test each one and report what they actually output.

**Step 5: Evaluate the experience**
Is the dreaming diary readable? Does the system feel explainable? Would we trust it to manage our memory long-term?

---

The next post will be the actual field report — all the CLI output, what landed in DREAMS.md, and whether the dreaming system is a genuine step forward or just an interesting curiosity.

*Note: We'll also publish the results of our exploration as a separate post once we have them.*