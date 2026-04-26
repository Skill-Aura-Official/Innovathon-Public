export const themeOrder = [
  'thunderstorm',
  'ice-storm',
  'sci-fi',
  'hellish-fire',
  'ai',
  'anime',
  'windy',
] as const;

export type ThemeId = (typeof themeOrder)[number];

export type ThemeConfig = {
  id: ThemeId;
  name: string;
  label: string;
  tokens: Record<string, string>;
  fx: {
    background: string;
    ui: string;
    card: string;
    heroVisual: string;
    cta: string;
  };
  copy: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    sections: Array<{
      title: string;
      intro: string;
      cards: Array<{ title: string; body: string; stat: string }>;
    }>;
    ctaTitle: string;
    ctaBody: string;
  };
};

export const themes: Record<ThemeId, ThemeConfig> = {
  thunderstorm: {
    id: 'thunderstorm',
    name: 'Thunderstorm',
    label: 'Thunderstorm',
    tokens: {
      '--bg': '#01030d',
      '--bg-2': '#05102e',
      '--surface': 'rgba(5, 12, 30, 0.75)',
      '--surface-strong': 'rgba(2, 6, 18, 0.9)',
      '--text': '#f0f8ff',
      '--muted': '#8a9ec2',
      '--accent': '#4da6ff',
      '--accent-2': '#e6f2ff',
      '--glow': 'rgba(77, 166, 255, 0.8)',
      '--border': 'rgba(77, 166, 255, 0.4)',
      '--shadow': '0 0 40px rgba(77, 166, 255, 0.4)',
      '--font-display': 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
    },
    fx: {
      background: 'thunderstorm-bg',
      ui: 'thunderstorm-ui-flicker',
      card: 'thunderstorm-edge-glow',
      heroVisual: 'thunderstorm-edge-glow',
      cta: 'thunderstorm-ui-flicker',
    },
    copy: {
      eyebrow: 'Tempest build arena',
      headline: 'Ship through the storm.',
      subhead: 'A high-voltage hackathon site with lightning flashes, rain streaks, and charged interface edges.',
      primaryCta: 'Join the strike',
      secondaryCta: 'View tracks',
      sections: [
        {
          title: 'Storm Cells',
          intro: 'Teams move through escalating challenge fronts with live checkpoints and mentor calls.',
          cards: [
            { title: 'Lightning Sprints', body: 'Short, intense build rounds designed for rapid validation.', stat: '07 fronts' },
            { title: 'Signal Tower', body: 'Centralized judging updates cut through noisy hackathon logistics.', stat: '24h live' },
            { title: 'Surge Lab', body: 'Hardware, AI, and web stacks get a dedicated debugging lane.', stat: '3 zones' },
          ],
        },
        {
          title: 'Impact Field',
          intro: 'Every submission is pressure-tested against usefulness, technical depth, and clarity.',
          cards: [
            { title: 'Reliability', body: 'Projects must stay usable when the demo room gets chaotic.', stat: '99% aim' },
            { title: 'Demo Voltage', body: 'Stage moments are short, sharp, and built for audience recall.', stat: '5 min' },
            { title: 'Final Surge', body: 'Top teams present with polished visuals and working prototypes.', stat: '12 picks' },
          ],
        },
      ],
      ctaTitle: 'Charge the next prototype.',
      ctaBody: 'Register your team, claim a storm cell, and turn rough energy into a finished build.',
    },
  },
  'ice-storm': {
    id: 'ice-storm',
    name: 'Ice Storm',
    label: 'Ice Storm',
    tokens: {
      '--bg': '#f0fbff',
      '--bg-2': '#cceeff',
      '--surface': 'rgba(240, 251, 255, 0.4)',
      '--surface-strong': 'rgba(204, 238, 255, 0.7)',
      '--text': '#003366',
      '--muted': '#336699',
      '--accent': '#00aaff',
      '--accent-2': '#ffffff',
      '--glow': 'rgba(0, 170, 255, 0.8)',
      '--border': 'rgba(255, 255, 255, 0.8)',
      '--shadow': '0 0 40px rgba(0, 170, 255, 0.4)',
      '--font-display': 'Georgia, Cambria, Times New Roman, serif',
    },
    fx: {
      background: 'ice-storm-bg',
      ui: 'ice-storm-ice-glow',
      card: 'ice-storm-frost-glass ice-storm-ice-glow',
      heroVisual: 'ice-storm-frost-glass ice-storm-ice-glow',
      cta: 'ice-storm-ice-glow',
    },
    copy: {
      eyebrow: 'Glacial innovation field',
      headline: 'Freeze the problem. Break it open.',
      subhead: 'A crystalline hackathon interface with falling snow, translucent frost, and pulsing cyan ice borders.',
      primaryCta: 'Enter the glacier',
      secondaryCta: 'See prizes',
      sections: [
        {
          title: 'Frozen Tracks',
          intro: 'Calm structure, sharp constraints, and clean judging criteria for teams that think clearly.',
          cards: [
            { title: 'Cryo Design', body: 'Prototype humane interfaces for cold-start user problems.', stat: '4 briefs' },
            { title: 'Snowpack Data', body: 'Work with layered datasets and reveal hidden patterns.', stat: '18 sets' },
            { title: 'Ice Bench', body: 'Validation slots help teams harden fragile product assumptions.', stat: '30 slots' },
          ],
        },
        {
          title: 'Crystal Review',
          intro: 'Judging favors clarity, precision, and a finished artifact that feels carved rather than rushed.',
          cards: [
            { title: 'Clarity', body: 'Every demo must communicate the problem in seconds.', stat: '10 sec' },
            { title: 'Craft', body: 'Interface decisions are scored alongside technical execution.', stat: '25 pts' },
            { title: 'Resilience', body: 'Prototype flows are tested on mobile and desktop screens.', stat: '2 views' },
          ],
        },
      ],
      ctaTitle: 'Lock in your cold start.',
      ctaBody: 'Bring the idea, sharpen the edges, and leave with something that holds its form.',
    },
  },
  'sci-fi': {
    id: 'sci-fi',
    name: 'Sci-Fi',
    label: 'Sci-Fi',
    tokens: {
      '--bg': '#010508',
      '--bg-2': '#031520',
      '--surface': 'rgba(3, 21, 32, 0.8)',
      '--surface-strong': 'rgba(1, 10, 16, 0.95)',
      '--text': '#ccffcc',
      '--muted': '#66b2a3',
      '--accent': '#00ffcc',
      '--accent-2': '#ff00ff',
      '--glow': 'rgba(0, 255, 204, 0.8)',
      '--border': 'rgba(0, 255, 204, 0.5)',
      '--shadow': '0 0 40px rgba(0, 255, 204, 0.4)',
      '--font-display': 'Consolas, Monaco, Courier New, monospace',
    },
    fx: {
      background: 'sci-fi-bg sci-fi-grid-bg',
      ui: 'sci-fi-neon-glow',
      card: 'sci-fi-neon-glow',
      heroVisual: 'sci-fi-hud-pulse sci-fi-neon-glow',
      cta: 'sci-fi-hud-pulse',
    },
    copy: {
      eyebrow: 'Orbital systems hack',
      headline: 'Compile the future in neon.',
      subhead: 'A cockpit-grade event page with moving scanlines, luminous panels, and a live HUD pulse.',
      primaryCta: 'Open airlock',
      secondaryCta: 'Read protocol',
      sections: [
        {
          title: 'Mission Modules',
          intro: 'Every team docks into a mission path with constraints, telemetry, and rapid review loops.',
          cards: [
            { title: 'Orbital AI', body: 'Build agents, copilots, or automation systems with measurable lift.', stat: '6 labs' },
            { title: 'Deep Stack', body: 'Infra, security, and data pipelines for teams that like hard edges.', stat: '9 ops' },
            { title: 'Interface Bay', body: 'Design displays that feel operational, not ornamental.', stat: '12 rigs' },
          ],
        },
        {
          title: 'Launch Criteria',
          intro: 'The final round rewards operational reliability and a demo that looks like it belongs on a bridge.',
          cards: [
            { title: 'Telemetry', body: 'Teams must show meaningful metrics during judging.', stat: '3 KPIs' },
            { title: 'Protocol', body: 'Submissions include architecture, tradeoffs, and failure modes.', stat: '1 dossier' },
            { title: 'Launch', body: 'Finalists run a live mission sequence with no static decks.', stat: '8 crews' },
          ],
        },
      ],
      ctaTitle: 'Request launch clearance.',
      ctaBody: 'Choose a module, sync your crew, and put a working system into orbit.',
    },
  },
  'hellish-fire': {
    id: 'hellish-fire',
    name: 'Hellish Fire',
    label: 'Hellish Fire',
    tokens: {
      '--bg': '#0a0000',
      '--bg-2': '#330000',
      '--surface': 'rgba(26, 0, 0, 0.8)',
      '--surface-strong': 'rgba(13, 0, 0, 0.95)',
      '--text': '#ffe6cc',
      '--muted': '#cc7755',
      '--accent': '#ff3300',
      '--accent-2': '#ffaa00',
      '--glow': 'rgba(255, 51, 0, 0.9)',
      '--border': 'rgba(255, 51, 0, 0.5)',
      '--shadow': '0 0 40px rgba(255, 51, 0, 0.5)',
      '--font-display': 'Arial Black, Impact, sans-serif',
    },
    fx: {
      background: 'hellish-fire-bg',
      ui: 'hellish-fire-heat-distort',
      card: 'hellish-fire-fire-glow',
      heroVisual: 'hellish-fire-fire-glow hellish-fire-heat-distort',
      cta: 'hellish-fire-fire-glow',
    },
    copy: {
      eyebrow: 'Inferno prototype pit',
      headline: 'Build it hot. Demo it hotter.',
      subhead: 'A volcanic hackathon page with ember fields, pulsing firelight, and heat distortion on the interface.',
      primaryCta: 'Enter the pit',
      secondaryCta: 'Meet judges',
      sections: [
        {
          title: 'Forge Tracks',
          intro: 'Teams refine raw ideas under pressure and leave with products that can survive scrutiny.',
          cards: [
            { title: 'Forge Core', body: 'Turn rough concepts into running software before the first review.', stat: '12 hrs' },
            { title: 'Ash Test', body: 'Mentors burn down weak assumptions before judging begins.', stat: '4 rounds' },
            { title: 'Lava Lane', body: 'Rapid UI, API, and deployment support for urgent blockers.', stat: '24/7' },
          ],
        },
        {
          title: 'Trial By Demo',
          intro: 'Every team proves the prototype works live, under heat, with visible user value.',
          cards: [
            { title: 'Friction', body: 'Judges look for the problem that hurts and the fix that sticks.', stat: '30 pts' },
            { title: 'Flame', body: 'Stage presence matters when a demo needs to be remembered.', stat: '10 pts' },
            { title: 'Fuel', body: 'Winning teams explain what happens after the weekend.', stat: '90 days' },
          ],
        },
      ],
      ctaTitle: 'Throw your idea into the forge.',
      ctaBody: 'Bring a hard problem, a fearless team, and a prototype worth lighting up.',
    },
  },
  ai: {
    id: 'ai',
    name: 'AI',
    label: 'AI',
    tokens: {
      '--bg': '#02030a',
      '--bg-2': '#071533',
      '--surface': 'rgba(4, 10, 26, 0.8)',
      '--surface-strong': 'rgba(2, 5, 13, 0.95)',
      '--text': '#e6ffff',
      '--muted': '#80cccc',
      '--accent': '#00ffff',
      '--accent-2': '#9933ff',
      '--glow': 'rgba(0, 255, 255, 0.8)',
      '--border': 'rgba(0, 255, 255, 0.4)',
      '--shadow': '0 0 40px rgba(0, 255, 255, 0.3)',
      '--font-display': 'Inter, ui-sans-serif, system-ui, sans-serif',
    },
    fx: {
      background: 'ai-bg ai-grid-bg',
      ui: 'ai-data-stream',
      card: 'ai-data-stream',
      heroVisual: 'ai-data-stream',
      cta: 'ai-data-stream',
    },
    copy: {
      eyebrow: 'Neural build network',
      headline: 'Train ideas into working intelligence.',
      subhead: 'A neural hackathon surface with pulsing nodes, flowing links, matrix grid motion, and moving data streams.',
      primaryCta: 'Join the network',
      secondaryCta: 'Explore agents',
      sections: [
        {
          title: 'Model Tracks',
          intro: 'Teams build with models, data, evaluation loops, and human-centered product judgment.',
          cards: [
            { title: 'Agent Ops', body: 'Create task agents that can act, verify, and recover.', stat: '5 flows' },
            { title: 'Eval Lab', body: 'Measure correctness, latency, cost, and user trust.', stat: '4 scores' },
            { title: 'Data Mesh', body: 'Connect private knowledge to useful product experiences.', stat: '16 nodes' },
          ],
        },
        {
          title: 'Intelligence Review',
          intro: 'Judges reward responsible automation and clear proof that the system improves outcomes.',
          cards: [
            { title: 'Grounding', body: 'Show source-aware output and graceful uncertainty handling.', stat: 'required' },
            { title: 'Feedback', body: 'Teams include a path for users to correct the system.', stat: '1 loop' },
            { title: 'Lift', body: 'Measure a real workflow before and after the prototype.', stat: '2x aim' },
          ],
        },
      ],
      ctaTitle: 'Connect your team to the network.',
      ctaBody: 'Build AI that helps people move faster, think clearer, and trust the result.',
    },
  },
  anime: {
    id: 'anime',
    name: 'Anime',
    label: 'Anime',
    tokens: {
      '--bg': '#fff0f5',
      '--bg-2': '#ffcce6',
      '--surface': 'rgba(255, 240, 245, 0.8)',
      '--surface-strong': 'rgba(255, 204, 230, 0.95)',
      '--text': '#330033',
      '--muted': '#993366',
      '--accent': '#ff1493',
      '--accent-2': '#ffeb3b',
      '--glow': 'rgba(255, 20, 147, 0.7)',
      '--border': 'rgba(255, 20, 147, 0.8)',
      '--shadow': '0 8px 30px rgba(255, 20, 147, 0.4)',
      '--font-display': 'Trebuchet MS, Arial Black, sans-serif',
    },
    fx: {
      background: 'anime-bg anime-sky-gradient',
      ui: 'anime-cel-glow',
      card: 'anime-cel-glow',
      heroVisual: 'anime-character-frame anime-cel-glow',
      cta: 'anime-character-frame',
    },
    copy: {
      eyebrow: 'Neo-panel creator jam',
      headline: 'Turn your build arc into a finale.',
      subhead: 'A vibrant anime-styled event page with gradient skies, speed lines, bold cel glows, and a framed hero panel.',
      primaryCta: 'Start the arc',
      secondaryCta: 'Open manga map',
      sections: [
        {
          title: 'Story Tracks',
          intro: 'Every project gets a clear protagonist, conflict, transformation, and final reveal.',
          cards: [
            { title: 'Hero Problem', body: 'Frame a real user struggle with memorable stakes.', stat: '1 quest' },
            { title: 'Power-Up', body: 'Prototype a feature that visibly changes the outcome.', stat: '3 beats' },
            { title: 'Final Panel', body: 'Prepare a demo flow with clean reveals and punchy timing.', stat: '6 scenes' },
          ],
        },
        {
          title: 'Judging Arc',
          intro: 'Winners balance expressive presentation with a product that genuinely works.',
          cards: [
            { title: 'Emotion', body: 'Does the team make the audience care about the user?', stat: '20 pts' },
            { title: 'Action', body: 'Does the prototype move through a complete workflow?', stat: '30 pts' },
            { title: 'Style', body: 'Does the interface have a deliberate visual identity?', stat: '15 pts' },
          ],
        },
      ],
      ctaTitle: 'Claim your finale slot.',
      ctaBody: 'Bring the team, choose the arc, and make the demo feel like the moment everything clicks.',
    },
  },
  windy: {
    id: 'windy',
    name: 'Windy',
    label: 'Windy',
    tokens: {
      '--bg': '#f5ffff',
      '--bg-2': '#ccffff',
      '--surface': 'rgba(245, 255, 255, 0.7)',
      '--surface-strong': 'rgba(204, 255, 255, 0.9)',
      '--text': '#004c66',
      '--muted': '#338c99',
      '--accent': '#00bfff',
      '--accent-2': '#00fa9a',
      '--glow': 'rgba(0, 191, 255, 0.5)',
      '--border': 'rgba(0, 191, 255, 0.3)',
      '--shadow': '0 16px 44px rgba(0, 191, 255, 0.3)',
      '--font-display': 'Verdana, Geneva, sans-serif',
    },
    fx: {
      background: 'windy-bg windy-bg-flow',
      ui: 'windy-smooth-ease',
      card: 'windy-smooth-ease',
      heroVisual: 'windy-smooth-ease',
      cta: 'windy-smooth-ease',
    },
    copy: {
      eyebrow: 'Aero systems sprint',
      headline: 'Let better ideas move.',
      subhead: 'A light, kinetic hackathon page with drifting particles, curved wind lines, shifting sky tones, and smooth easing.',
      primaryCta: 'Catch the current',
      secondaryCta: 'See schedule',
      sections: [
        {
          title: 'Airflow Tracks',
          intro: 'Teams move through a calm event system built for momentum, collaboration, and quick pivots.',
          cards: [
            { title: 'Current Map', body: 'Find the next checkpoint without losing build rhythm.', stat: '6 stops' },
            { title: 'Lift Sessions', body: 'Mentors help unblock, refine, and redirect ideas fast.', stat: '45 min' },
            { title: 'Open Sky', body: 'Teams can switch lanes when evidence points elsewhere.', stat: '2 pivots' },
          ],
        },
        {
          title: 'Flow Review',
          intro: 'Judging looks for products that feel effortless to understand and smooth to use.',
          cards: [
            { title: 'Ease', body: 'Reduce friction in the first complete user journey.', stat: '1 flow' },
            { title: 'Reach', body: 'Show why the solution matters beyond the room.', stat: '10x aim' },
            { title: 'Motion', body: 'Tell a story that moves from problem to proof cleanly.', stat: '5 min' },
          ],
        },
      ],
      ctaTitle: 'Move with the next current.',
      ctaBody: 'Join a hackathon flow built for calm focus, polished prototypes, and visible progress.',
    },
  },
};

export const DEFAULT_THEME: ThemeId = 'thunderstorm';
