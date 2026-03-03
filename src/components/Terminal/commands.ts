export interface CommandOutput {
  text: string;
  isHTML?: boolean;
}

const COMMANDS: Record<string, () => CommandOutput> = {
  help: () => ({
    text: `Available commands:

  about       About me
  whoami      Who am I?
  education   Where I studied
  experience  What I've done
  skills      What I know
  projects    Things I'm building
  contact     How to reach me
  neofetch    System info
  clear       Clear the terminal
  exit        Exit terminal

Type a command and press Enter.`,
  }),

  about: () => ({
    text: `Hey! My name is Guanjia Zhu — feel free to call me Gavin.

Building stuff and investing in people who are building stuff.
Studied Math, Econ, and Finance at UCSD and Duke.
Now learning everything about AI.

I drove my station wagon across all 50 states.
StarCraft II enjoyer (Terran diamond, Zerg plat, never play Protoss).
TFT Master. Trying to get better at golf.
Pretty good at vibe coding.

If you're reading this, DM me — we can be friends.`,
  }),

  whoami: () => ({
    text: `Gavin Zhu
Investor @ Llama Ventures
Sunnyvale, CA

Actively discovering early-stage startups.
Previously: Duke Fuqua, UC San Diego
Languages: English, Chinese, Japanese, Spanish`,
  }),

  education: () => ({
    text: `Education:

  Duke University — Fuqua School of Business
  Master of Management Studies (MMS)
  2024 — 2025

  UC San Diego
  B.S. Mathematics-Economics, Minor in Finance
  2020 — 2024`,
  }),

  experience: () => ({
    text: `Experience:

  Llama Ventures — Investor
  Sep 2025 — Present | Sunnyvale, CA
  Early-stage startup investing

  Oracle — Student Consultant
  Dec 2024 — Feb 2025 | Durham, NC
  Fuqua Client Consulting Practicum

  Essence Securities (now SDIC Securities) — Investment Management Intern
  Jul 2023 — Sep 2023 | Beijing, China

  Accenture — Strategy Consulting Intern
  Dec 2022 — Mar 2023 | Shanghai, China`,
  }),

  skills: () => ({
    text: `Skills:

  Tech         JavaScript, TypeScript, AI/Agents, React
  Finance      Financial Modeling, Bloomberg, Venture Capital
  Languages    English & Chinese (native), Japanese, Spanish
  Vibes        Vibe coding, road trips, StarCraft II`,
  }),

  projects: () => ({
    text: `Projects:

  [01]  Coming soon...
  [02]  Coming soon...
  [03]  Coming soon...

Check back later — cool stuff in the works.`,
  }),

  contact: () => ({
    text: `Contact:

  Email        gavin@llamaventures.vc
  LinkedIn     linkedin.com/in/guanjiazhu
  GitHub       github.com/SoujiOkita98

Feel free to reach out — always down to chat.`,
  }),

  neofetch: () => ({
    text: `
                    'c.          gavin@web
                 ,xNMM.          -----------------
               .OMMMMo           Role: Investor @ Llama Ventures
               OMMM0,            Location: Sunnyvale, CA
     .;loddo:' loolloddol;.     School: Duke Fuqua / UCSD
   cKMMMMMMMMMMNWMMMMMMMMMM0:    Focus: Early-stage startups
  .KMMMMMMMMMMMMMMMMMMMMMMMWd.   Stack: JS, TS, React, AI
  XMMMMMMMMMMMMMMMMMMMMMMMX.     Finance: Bloomberg, Modeling
 ;MMMMMMMMMMMMMMMMMMMMMMMM:      Languages: EN, ZH, JA, ES
 :MMMMMMMMMMMMMMMMMMMMMMMM:      SC2: Diamond (T) / Plat (Z)
 .MMMMMMMMMMMMMMMMMMMMMMMMX.     TFT: Master
  kMMMMMMMMMMMMMMMMMMMMMMMMWd.   Road Trip: All 50 states
  .XMMMMMMMMMMMMMMMMMMMMMMMMk
   .XMMMMMMMMMMMMMMMMMMMMK.
     kMMMMMMMMMMMMMMMMMMd.
      ;KMMMMMMMWXXWMMMKo.
        .cooc,.    .,coo:.`,
  }),

  exit: () => ({
    text: `Logout? Where would you go? Touch grass?

Just kidding — there's no escape. Type 'help' for more commands.`,
  }),
};

export function executeCommand(input: string): CommandOutput | null {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === '') return null;
  if (trimmed === 'clear') return { text: '__CLEAR__' };

  const handler = COMMANDS[trimmed];
  if (handler) return handler();

  return {
    text: `zsh: command not found: ${input.trim()}\nType 'help' for available commands.`,
  };
}
