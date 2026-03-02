// ──────────────────────────────────────────────
// COA Presentation Data Spec
// Instruction Scheduling to Reduce Pipeline Stalls in RISC-V (RIPES Project)
// ──────────────────────────────────────────────

const presentationData = {
  // ── META ──────────────────────────────────────
  meta: {
    title: "Instruction Scheduling to Reduce Pipeline Stalls in RISC-V (RIPES Project)",
    description:
      "Interactive B.Tech COA project presentation using RIPES to study instruction scheduling and pipeline stalls.",
    theme: {
      colors: {
        background: "#FFFFFF",
        text: "#222222",
        primary: "#007ACC",
        accent: "#FF7F50",
        secondary: "#6C5CE7",
        surface: "#F8F9FA",
        muted: "#6B7280",
      },
      fonts: {
        heading: "'Inter', 'Segoe UI', sans-serif",
        body: "'Inter', 'Segoe UI', sans-serif",
      },
    },
    navigation: {
      showProgressBar: true,
      homeSlideId: "slide-1",
    },
  },

  // ── SLIDES ────────────────────────────────────
  slides: [
    // ── SLIDE 1 ─ Title & Project Overview ──────
    {
      id: "slide-1",
      title:
        "Instruction Scheduling to Reduce Pipeline Stalls in RISC‑V (RIPES Project)",
      layout: "title+content",
      bullets: [
        "B.Tech COA mini‑project using RIPES RISC‑V simulator",
        "Focus: instruction scheduling to reduce pipeline stalls and improve CPI",
        "Team / Guide / College (placeholder)",
      ],
      visuals: [
        {
          type: "pipeline",
          stages: ["IF", "ID", "EX", "MEM", "WB"],
          showToken: true,
        },
      ],
      interactions: [
        {
          type: "button",
          label: "View Outline",
          action: { type: "goToSlide", targetId: "slide-2" },
        },
      ],
      notes:
        "Introduce the project, team, and pipeline visualization. Mention this is an interactive Canvas presentation.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 2 ─ Problem Statement & Motivation ─
    {
      id: "slide-2",
      title: "Problem Statement & Motivation",
      layout: "title+content",
      bullets: [
        "Pipelined RISC‑V CPUs suffer stalls due to data and control hazards",
        "Stalls insert bubbles, increase CPI, and reduce performance",
        "Aim: reorder instructions (scheduling) to reduce stalls without changing program output",
      ],
      visuals: [
        {
          type: "diagram",
          variant: "beforeAfterSpeed",
          labels: ["More stalls / High CPI", "Less stalls / Low CPI"],
        },
      ],
      interactions: [],
      notes:
        "Emphasize rubric 'Clear problem statement'. Explain why stalls hurt performance.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 3 ─ Project Objectives ────────────
    {
      id: "slide-3",
      title: "Project Objectives",
      layout: "title+content",
      bullets: [
        "Study pipeline hazards and stalls in a 5‑stage RISC‑V pipeline using RIPES",
        "Design RISC‑V test programs that create data and control hazards",
        "Apply instruction scheduling and observe stall and CPI reduction",
        "Present CPI, stall counts, tables, graphs, and RIPES screenshots",
      ],
      visuals: [
        {
          type: "iconSet",
          icons: ["target", "cpu", "code", "chart"],
        },
      ],
      interactions: [],
      notes: "Map each objective to a rubric item for the evaluator.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 4 ─ RIPES Setup & Configuration ───
    {
      id: "slide-4",
      title: "RIPES Setup & Configuration",
      layout: "two-column",
      bullets: [
        "Simulator: RIPES RISC‑V processor simulator",
        "Core: 5‑stage pipelined RISC‑V (IF, ID, EX, MEM, WB)",
        "Views used: code, register file, pipeline diagram, memory",
      ],
      visuals: [
        {
          type: "placeholder",
          label: "RIPES CPU view (screenshot later)",
        },
        {
          type: "placeholder",
          label: "RIPES pipeline view (screenshot later)",
        },
      ],
      interactions: [
        {
          type: "hoverReveal",
          target: "placeholder-0",
          text: "CPU view shows register file and ALU operations",
        },
        {
          type: "hoverReveal",
          target: "placeholder-1",
          text: "Pipeline view shows instruction flow through stages",
        },
      ],
      notes:
        "Show RIPES interface. Mention free & open‑source simulator for RISC-V education.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 5 ─ Pipelining & Hazards (COA Basics)
    {
      id: "slide-5",
      title: "Pipelining & Hazards (COA Basics)",
      layout: "two-column",
      bullets: [
        "Pipelining overlaps instructions across stages to increase throughput",
        "Ideal case: one instruction completed per cycle when no hazards",
        "Data, control, and structural hazards cause stalls (bubbles) and increase CPI",
      ],
      visuals: [
        {
          type: "pipeline",
          stages: ["IF", "ID", "EX", "MEM", "WB"],
          showBubble: true,
        },
      ],
      interactions: [
        {
          type: "hoverReveal",
          target: "bubble",
          text: "Stall = wasted cycle (bubble inserted into pipeline)",
        },
      ],
      notes:
        "Explain pipelining basics for COA audience. Show bubble concept visually.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 6 ─ Instruction Scheduling Concept ─
    {
      id: "slide-6",
      title: "Instruction Scheduling Concept",
      layout: "title+content",
      bullets: [
        "Instruction scheduling = reordering instructions to reduce hazards and stalls",
        "Must preserve program correctness and final result",
        "Uses independent instructions to fill delay slots and hide latency",
      ],
      visuals: [
        {
          type: "diagram",
          variant: "sequenceCompare",
          sequences: ["Original", "Scheduled"],
        },
      ],
      interactions: [
        {
          type: "toggle",
          label: "Original / Scheduled",
          states: ["original", "scheduled"],
        },
      ],
      notes:
        "Show how reordering hides latency without changing output. Toggle between views.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 7 ─ RISC-V Example: Before Scheduling
    {
      id: "slide-7",
      title: "RISC‑V Example: Before Scheduling",
      layout: "two-column",
      bullets: [
        "RAW dependencies between load and ALU instructions",
        "Load‑use and ALU dependencies create stall cycles in RIPES",
      ],
      visuals: [
        {
          type: "code",
          language: "riscv",
          label: "Baseline code with hazards",
          code: [
            "lw   x1, 0(x10)    # Load word",
            "add  x2, x1, x3    # RAW hazard on x1",
            "sub  x4, x2, x5    # RAW hazard on x2",
            "lw   x6, 4(x10)    # Load word",
            "and  x7, x6, x8    # RAW hazard on x6",
          ],
        },
        {
          type: "pipeline",
          variant: "timingDiagram",
          showBubbles: true,
          instructions: ["lw", "add", "sub", "lw", "and"],
        },
      ],
      interactions: [
        {
          type: "hoverReveal",
          target: "instruction",
          text: "Hover to see hazard path and bubble locations",
        },
      ],
      notes:
        "Walk through each instruction and show where stalls occur due to RAW dependencies.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 8 ─ RISC-V Example: After Scheduling ─
    {
      id: "slide-8",
      title: "RISC‑V Example: After Scheduling",
      layout: "two-column",
      bullets: [
        "Independent instructions moved between dependent ones",
        "Fewer bubbles, better pipeline utilization in RIPES",
      ],
      visuals: [
        {
          type: "code",
          language: "riscv",
          label: "Scheduled code with reduced stalls",
          code: [
            "lw   x1, 0(x10)    # Load word",
            "lw   x6, 4(x10)    # Moved up (independent)",
            "add  x2, x1, x3    # x1 now ready",
            "and  x7, x6, x8    # x6 now ready",
            "sub  x4, x2, x5    # x2 now ready",
          ],
        },
        {
          type: "pipeline",
          variant: "timingDiagram",
          showFewerBubbles: true,
          instructions: ["lw", "lw", "add", "and", "sub"],
        },
      ],
      interactions: [
        {
          type: "toggle",
          label: "Before / After",
          states: ["before", "after"],
        },
      ],
      notes:
        "Compare with Slide 7. Show reduced bubbles after scheduling. Toggle to compare.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 9 ─ Experimental Methodology ──────
    {
      id: "slide-9",
      title: "Experimental Methodology in RIPES",
      layout: "title+content",
      bullets: [
        "Write baseline RISC‑V programs with hazards (loops, loads, branches)",
        "Run in RIPES; record cycles, stall cycles, CPI; capture pipeline screenshots",
        "Apply instruction scheduling to create optimized versions",
        "Re‑run and compare stalls and CPI before vs after scheduling",
      ],
      visuals: [
        {
          type: "diagram",
          variant: "flow",
          steps: [
            "Code",
            "RIPES run",
            "Metrics",
            "Scheduling",
            "Re‑run",
            "Comparison",
          ],
        },
      ],
      interactions: [],
      notes:
        "Supports 'Execution & Implementation' and 'RISC-V test programs' rubric items.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },

    // ── SLIDE 10 ─ Results: Demo Stall Graph ────
    {
      id: "slide-10",
      title: "Results: Stall Cycles Comparison (Demo Data)",
      layout: "title+chart",
      bullets: [
        "Sample visualization of stall cycles for multiple programs",
        "Real project will replace demo values with RIPES measurements",
        "Expect stall cycles to reduce after scheduling",
      ],
      visuals: [],
      chartConfig: {
        type: "bar-grouped",
        title: "Sample Stall Cycles: Before vs After Scheduling",
        xLabel: "Program",
        yLabel: "Number of Stall Cycles",
        xCategories: ["Prog 1", "Prog 2", "Prog 3"],
        series: [
          {
            id: "before",
            label: "Before",
            color: "#FF7F50",
            randomRange: { min: 10, max: 25 },
          },
          {
            id: "after",
            label: "After",
            color: "#007ACC",
            randomRange: { min: 2, max: 15 },
          },
        ],
        randomizeOn: "mount",
      },
      interactions: [
        {
          type: "button",
          label: "Randomize demo data",
          action: { type: "randomizeChart" },
        },
      ],
      notes:
        "Demo data only. Will be replaced by actual RIPES measurements in final submission.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: true,
      },
    },

    // ── SLIDE 11 ─ Results: CPI Table ───────────
    {
      id: "slide-11",
      title: "Results: CPI & Comparison Table (Demo Data)",
      layout: "title+table",
      bullets: [
        "CPI (cycles per instruction) is a key COA performance measure",
        "Instruction scheduling should reduce CPI for most test programs",
      ],
      visuals: [],
      tableConfig: {
        columns: ["Program", "CPI Before", "CPI After", "% Improvement"],
        rowsRandomSpec: {
          rowCount: 3,
          programNames: ["Prog 1", "Prog 2", "Prog 3"],
          cpiBeforeRange: { min: 1.8, max: 3.0, decimals: 2 },
          cpiAfterRange: { min: 1.1, max: 2.2, decimals: 2 },
        },
      },
      interactions: [
        {
          type: "button",
          label: "Randomize CPI demo",
          action: { type: "randomizeTable" },
        },
      ],
      notes:
        "Demo data only. CPI = Total cycles / Total instructions. % Improvement = (Before-After)/Before * 100.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: true,
      },
    },

    // ── SLIDE 12 ─ Conclusion, Timeline & Future ─
    {
      id: "slide-12",
      title: "Conclusion, Timeline & Future Work",
      layout: "two-column",
      bullets: [
        "Instruction scheduling reduces pipeline stalls and improves CPI in a 5‑stage RISC‑V pipeline",
        "RIPES clearly visualizes hazards, stalls, and scheduling impact",
        "Project covers: problem, objectives, RIPES setup, RISC‑V code, CPI, graphs, analysis, conclusion",
      ],
      bulletsRight: [
        "Week 1–2: Theory (COA hazards) and RIPES familiarization",
        "Week 3–4: Baseline programs and initial measurements",
        "Week 5–6: Scheduling, optimization, final experiments",
        "Week 7: Report writing and final PPT",
        "Future: test with/without forwarding, explore advanced pipelines",
      ],
      visuals: [
        {
          type: "timeline",
          segments: ["W1–2", "W3–4", "W5–6", "W7"],
          labels: [
            "Study & Setup",
            "Baseline Experiments",
            "Scheduling & Optimization",
            "Report & PPT",
          ],
        },
      ],
      interactions: [],
      notes:
        "Summarize all rubric items covered. Mention future work and extensions.",
      pdfExport: {
        keepOnSinglePage: true,
        hideInteractions: true,
        showSampleData: false,
      },
    },
  ],

  // ── EXPORT ────────────────────────────────────
  export: {
    pdf: {
      enabled: true,
      fileName:
        "Instruction_Scheduling_Pipeline_Stalls_RIPES_Project.pdf",
      layout: "one-slide-per-page",
      includeSpeakerNotes: false,
      pageSize: "16:9",
      margin: "standard",
    },
  },
};

export default presentationData;
