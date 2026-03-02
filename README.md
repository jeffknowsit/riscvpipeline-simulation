# Instruction Scheduling Visual Lab (RIPES · RISC‑V · COA Project)

A modern, interactive **visual lab** for B.Tech **Computer Organization & Architecture** that demonstrates how **instruction scheduling** reduces **pipeline stalls** and improves **CPI** in a 5‑stage **RISC‑V** pipeline, inspired by the RIPES simulator.

Deployed Link :- https://riscvpipeline-simulation.vercel.app/
---

## 🚀 Purpose

This project is built as a teaching and presentation tool for a B.Tech COA mini‑project:

- Illustrate **5‑stage pipelining** (IF → ID → EX → MEM → WB).
- Visualize **pipeline hazards** (data, control, structural) and **stall cycles**.
- Show **before vs after** instruction scheduling on RISC‑V code.
- Display changes in **stalls**, **CPI**, and **throughput** using charts and timeline views.
- Align with typical COA project requirements (planning, RIPES usage, CPI analysis, graphs, and conclusions).

It is designed to help students, teammates, and faculty **see** how scheduling transforms pipeline behavior—rather than just reading about it in slides.

---

## 🧩 Tech Stack

**Core:**

- **React** (SPA / multi‑section interactive page)
- **TypeScript** (type‑safe components and utilities)
- **Tailwind CSS** (utility‑first styling)
- **shadcn/ui** (headless, accessible UI primitives)
- **Framer Motion** (animations and scroll‑based motion)
- **Lucide Icons** (clean vector icons, no emojis)

**Design System Highlights:**

- Modern, **vector‑driven** visuals (pipelines, timelines, graphs).
- Light/Dark theme support using CSS variables (e.g. `--background`, `--primary`).
- Clay‑inspired soft UI for cards, metric tiles, and interactive panels.

---

## 🌐 Key Features

- **Hero Section**  
  - Professional landing view for “Instruction Scheduling for RISC‑V Pipelines”.  
  - Animated 5‑stage pipeline illustration with flowing instruction tokens.

- **Pipelining & Hazards Module**  
  - Visual explanation of stages, hazards, and stall bubbles.  
  - Small timelines that show where NOPs and bubbles appear.

- **Instruction Scheduling Playground**  
  - **Before/After** toggles for RISC‑V code snippets.  
  - Pipeline timing diagrams comparing stall cycles.  
  - Quick metrics: stalls and CPI for each version.

- **RIPES‑Style Simulation Panel**  
  - Mock RIPES layout: code pane, register file, pipeline view.  
  - “Run Simulation” and “Apply Scheduling” actions with animated pipeline steps.  
  - Demo metrics (stalls, CPI, cycles, instruction count) clearly marked as illustrative.

- **Dynamic Results & Charts**  
  - Auto‑generated demo charts for stalls and CPI across multiple programs.  
  - Tables summarizing before/after performance and % improvement.

- **Project Planning & Rubric Mapping**  
  - Simple project timeline (Weeks 1–7).  
  - Clear mapping to COA project rubric: planning, execution, presentation, innovation.

---

## 🛠️ Notable Components

- `FallingPattern` – animated background pattern using radial gradients and motion.  
- Interactive **pipeline**, **timeline**, and **chart** components (React + Tailwind + motion).  
- Theme‑aware layout that adapts vector visuals and code blocks for light and dark modes.

---

## 📦 Setup (High‑Level)

> These are the typical pieces you’ll see in this project; adjust paths/commands to your environment.

- **TypeScript** configured via `tsconfig.json`.
- **Tailwind CSS** wired into the main stylesheet (e.g. `index.css` / `globals.css`) with custom variables:
  - `--background`, `--foreground`, `--primary`, etc.
- **shadcn/ui** components located under `./components` (commonly `./components/ui`).
- Animated and visual components in `./components/ui` and feature sections under `./components/sections`.

---

## 🎯 Intended Audience & Use

- **Students**: to understand instruction scheduling and pipeline stalls visually.  
- **Faculty**: as a dynamic demonstration during project evaluations.  
- **Teams**: to present COA/RISC‑V mini‑projects with a modern, interactive interface instead of static PPTs.

---

## 📚 Keywords

`COA` · `RISC‑V` · `RIPES` · `Pipelining` · `Pipeline Hazards` · `Instruction Scheduling` · `CPI` · `B.Tech Project` · `React` · `TypeScript` · `Tailwind` · `shadcn/ui` · `Framer Motion`

---
