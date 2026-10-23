import './research-tracker.css'

export default function RealtimeInteractiveVideo() {
  return (
    <div className="research-tracker">
      <p><strong>{"Last Updated: October 23, 2026"}</strong><br /><strong>{"Version: 2.0 — Expanded Research Edition"}</strong><br /><strong>{"Coverage: 56 products, model generations, open-source projects, technical papers, and benchmarks"}</strong></p>
      <h3>{"How to Read This Tracker"}</h3>
      <p>{"Each entry includes:"}</p>
      <ul>
        <li><strong>{"Released:"}</strong>{" First public announcement, product release, or paper publication."}</li>
        <li><strong>{"Latest Update:"}</strong>{" Most recent dated milestone identified during this review, not necessarily the latest code commit."}</li>
        <li><strong>{"Category:"}</strong>{" Interactive Avatar, World Model, Video Editing, Streaming Foundation Model, or Research."}</li>
        <li><strong>{"Access:"}</strong>{" Public demo, sign-up, API, research preview, or self-hosted."}</li>
        <li><strong>{"Technology / Capabilities:"}</strong>{" Main features and technical approach."}</li>
        <li><strong>{"Research Focus:"}</strong>{" What makes it worth comparing."}</li>
      </ul>
      <p>{"All dates are approximate unless a specific date is provided. Unknown release dates and unverified updates are explicitly marked."}</p>
      <p>{"Performance figures and prices are vendor-reported unless otherwise specified. Availability can change."}</p>
      <hr />
      <nav className="research-tracker-toc" aria-label="Article contents">
        <p><strong>Contents</strong></p>
        <ol>
          <li><a href="#interactive-video-commercial-products">{"Commercial products & live demos"}</a></li>
          <li><a href="#interactive-video-commercial-models">{"Other commercial models & companies"}</a></li>
          <li><a href="#interactive-video-open-source">{"Open-source & research models"}</a></li>
          <li><a href="#interactive-video-papers-benchmarks">{"Papers, reports & benchmarks"}</a></li>
          <li><a href="#interactive-video-benchmarking">{"Competitive benchmarking"}</a></li>
          <li><a href="#interactive-video-timeline">{"Industry timeline"}</a></li>
          <li><a href="#interactive-video-methodology">{"Tracking methodology"}</a></li>
        </ol>
      </nav>
      <h3 id="interactive-video-commercial-products">{"PART I — COMMERCIAL PRODUCTS & LIVE DEMOS"}</h3>
      <h4>{"1. Vidu S2-Avatar — ShengShu Technology"}</h4>
      <p><strong>{"Released:"}</strong>{" September 15, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" September 2026 — S2 launch and technical paper"}<br /><strong>{"Category:"}</strong>{" Real-Time Interactive Avatar"}<br /><strong>{"Access:"}</strong>{" Online demo and API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time, voice-controlled AI characters."}</li>
        <li>{"720p or higher video generation."}</li>
        <li>{"Full-body movements, including dancing."}</li>
        <li>{"Character-object interaction using reference images."}</li>
        <li>{"Change clothing, objects, and backgrounds during interaction."}</li>
        <li>{"Supports interruptions and dynamic references."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Real-time generative video with dynamic multimodal conditioning."}</p>
      <p><strong>{"Research Focus:"}</strong>{" One of the most relevant direct competitors for interactive character products. Test instruction-following reliability, response latency, and whether object interactions persist."}</p>
      <p>{"Website: "}<a href={"https://www.vidu.com/vidu-stream"} target="_blank" rel="noopener noreferrer">{"https://www.vidu.com/vidu-stream"}</a><br />{"API: "}<a href={"https://platform.vidu.com/docs/digital-human"} target="_blank" rel="noopener noreferrer">{"https://platform.vidu.com/docs/digital-human"}</a><br />{"Paper: "}<a href={"https://arxiv.org/abs/2609.11638"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2609.11638"}</a></p>
      <h4>{"2. Vidu S2-Editing — ShengShu Technology"}</h4>
      <p><strong>{"Released:"}</strong>{" September 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" September 2026"}<br /><strong>{"Category:"}</strong>{" Real-Time Video-to-Video Editing"}<br /><strong>{"Access:"}</strong>{" Demo and API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time style transfer on incoming video."}</li>
        <li>{"Character replacement and outfit changes."}</li>
        <li>{"Background modification."}</li>
        <li>{"Reference-image-controlled editing."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Understand the difference between generating a video entirely from scratch and modifying an existing video stream, which already provides motion and temporal context."}</p>
      <p>{"Website: "}<a href={"https://www.vidu.com/vidu-stream"} target="_blank" rel="noopener noreferrer">{"https://www.vidu.com/vidu-stream"}</a></p>
      <h4>{"3. Vivix-A1 — Vivix"}</h4>
      <p><strong>{"Research Report:"}</strong>{" June 2026"}<br /><strong>{"Product Availability:"}</strong>{" Public product and playground available by October 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 2026 — Product and pricing pages reviewed"}<br /><strong>{"Category:"}</strong>{" Real-Time Full-Body Interactive Avatar"}<br /><strong>{"Access:"}</strong>{" Playground, API, paid plans"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Full-body character movement: walking, dancing, turning, gestures."}</li>
        <li>{"Simultaneous listening, speaking, and motion."}</li>
        <li>{"Environmental audio perception."}</li>
        <li>{"Reference-image-driven object interaction."}</li>
        <li>{"Full-duplex conversational behavior."}</li>
        <li>{"Director Agent for behavioral planning."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Native multimodal streaming generation with joint distillation and reference conditioning."}</p>
      <p><strong>{"Public Pricing:"}</strong>{" Starter plan lists $19/month for 60 minutes, approximately $0.32/minute."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Particularly relevant to PopVid and Vidu. Investigate whether the model can perform coherent object manipulation while maintaining conversation and continuous motion."}</p>
      <p>{"Demo: "}<a href={"https://www.vivix.ai/vivix-a1"} target="_blank" rel="noopener noreferrer">{"https://www.vivix.ai/vivix-a1"}</a><br />{"Playground: "}<a href={"https://platform.vivix.ai/vivix-a1-model/"} target="_blank" rel="noopener noreferrer">{"https://platform.vivix.ai/vivix-a1-model/"}</a><br />{"Technical Report: "}<a href={"https://vivix.ai/research/tech-report-vivix-a1"} target="_blank" rel="noopener noreferrer">{"https://vivix.ai/research/tech-report-vivix-a1"}</a><br />{"Pricing: "}<a href={"https://www.vivix.ai/pricing"} target="_blank" rel="noopener noreferrer">{"https://www.vivix.ai/pricing"}</a></p>
      <h4>{"4. Vivix-W1 — Vivix"}</h4>
      <p><strong>{"Research Report:"}</strong>{" June 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 8, 2026 — Updated model comparisons and pricing"}<br /><strong>{"Category:"}</strong>{" Real-Time Generative Video / World Model"}<br /><strong>{"Access:"}</strong>{" Playground and API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Continuous generative video."}</li>
        <li>{"Text, voice, motion, and other multimodal conditioning."}</li>
        <li>{"Scene transformations and camera movement."}</li>
        <li>{"Interactive world-generation applications."}</li>
      </ul>
      <p><strong>{"Public Pricing:"}</strong>{" Official page advertised a temporary $0.003/output-second rate through October 31, 2026."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Distinguish continuous interactive generation from rapid reference-to-video generation. The published latency benchmarks and promotional pricing do not automatically establish end-to-end interactive responsiveness."}</p>
      <p>{"Playground: "}<a href={"https://platform.vivix.ai/vivix-w1-model/"} target="_blank" rel="noopener noreferrer">{"https://platform.vivix.ai/vivix-w1-model/"}</a></p>
      <h4>{"5. Visko Orbis 1.0 — Visko"}</h4>
      <p><strong>{"Research Paper:"}</strong>{" July 29, 2026"}<br /><strong>{"Public Launch:"}</strong>{" September 1, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" September 2026 — Public access announcement"}<br /><strong>{"Category:"}</strong>{" Real-Time Interactive World Model"}<br /><strong>{"Access:"}</strong>{" Login-based online demo"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Continuous text-to-video and image-to-video generation."}</li>
        <li>{"Prompt changes during generation."}</li>
        <li>{"Long-duration video continuation."}</li>
        <li>{"Persistent multiscale memory."}</li>
        <li>{"Streaming video upscaling."}</li>
        <li>{"Multilingual prompt support."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" 4K at 24 FPS, with hour-scale generation using its optimized serving system."}</p>
      <p><strong>{"Technology:"}</strong>{" Distilled chunk-wise streaming generation with bounded multiscale memory."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Particularly interesting for long-horizon consistency, prompt responsiveness, and video-serving infrastructure."}</p>
      <p>{"Demo: "}<a href={"https://www.visko.ai/models/orbis"} target="_blank" rel="noopener noreferrer">{"https://www.visko.ai/models/orbis"}</a><br />{"Paper: "}<a href={"https://arxiv.org/abs/2607.26694"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2607.26694"}</a><br />{"Company: "}<a href={"https://www.visko.ai/"} target="_blank" rel="noopener noreferrer">{"https://www.visko.ai/"}</a></p>
      <h4>{"6. LemonSlice CWM-1"}</h4>
      <p><strong>{"Released:"}</strong>{" September 23, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 2, 2026 — CWM-1 Lite announced"}<br /><strong>{"Category:"}</strong>{" Interactive Character World Model"}<br /><strong>{"Access:"}</strong>{" Public live demo; API on qualifying plans"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Interactive characters from reference images."}</li>
        <li>{"Face, body, hands, and surrounding scene generation."}</li>
        <li>{"Causal video diffusion."}</li>
        <li>{"Action and emotion conditioning."}</li>
        <li>{"Continuous character generation."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Few-step causal Video Diffusion Transformer."}</p>
      <p><strong>{"Research Focus:"}</strong>{" A strong architecture comparison against Runway Characters, Vivix-A1, and Vidu S2-Avatar."}</p>
      <p>{"Demo: "}<a href={"https://lemonslice.com/cwm-1"} target="_blank" rel="noopener noreferrer">{"https://lemonslice.com/cwm-1"}</a></p>
      <h4>{"7. LemonSlice CWM-1 Lite"}</h4>
      <p><strong>{"Released:"}</strong>{" October 2, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 2, 2026"}<br /><strong>{"Category:"}</strong>{" Lower-Cost Interactive Avatar Model"}<br /><strong>{"Access:"}</strong>{" Ultra / Enterprise plans at launch"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Lower-cost real-time character video."}</li>
        <li>{"Built-in action and emotion controls."}</li>
        <li>{"Programmatic emotional expression."}</li>
      </ul>
      <p><strong>{"Public Pricing:"}</strong>{" As low as $0.048/minute, according to the launch announcement; eligibility and usage conditions apply."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Inference economics and model-size-versus-quality tradeoffs. Particularly useful when estimating the cost of operating a consumer video companion."}</p>
      <p>{"Announcement: "}<a href={"https://lemonslice.com/i/2026-week40"} target="_blank" rel="noopener noreferrer">{"https://lemonslice.com/i/2026-week40"}</a></p>
      <h4>{"8. Runway Characters — Runway"}</h4>
      <p><strong>{"Released:"}</strong>{" March 9, 2026"}<br /><strong>{"Latest Verified Technical Update:"}</strong>{" May 4, 2026 — Engineering breakdown"}<br /><strong>{"Category:"}</strong>{" Real-Time Conversational Video Agent"}<br /><strong>{"Access:"}</strong>{" Runway product and developer API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Generate a conversational character from one reference image."}</li>
        <li>{"Photorealistic, cartoon, and fictional character styles."}</li>
        <li>{"Speech synchronization, facial expressions, and gestures."}</li>
        <li>{"Custom voice, personality, knowledge, and tool calling."}</li>
        <li>{"LiveKit and React integration."}</li>
      </ul>
      <p><strong>{"Reported Performance"}</strong></p>
      <ul>
        <li>{"720p, 24 FPS."}</li>
        <li>{"37ms effective model time per frame."}</li>
        <li>{"Approximately 1.75 seconds server-side conversational turnaround."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Autoregressive video generation based on Runway GWM-1."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Excellent comparison of video-model performance versus complete conversational-agent latency."}</p>
      <p>{"Demo: "}<a href={"https://app.runwayml.com/"} target="_blank" rel="noopener noreferrer">{"https://app.runwayml.com/"}</a><br />{"Product: "}<a href={"https://runway.com/product/characters"} target="_blank" rel="noopener noreferrer">{"https://runway.com/product/characters"}</a><br />{"Engineering: "}<a href={"https://runway.com/news/engineering/building-runway-characters"} target="_blank" rel="noopener noreferrer">{"https://runway.com/news/engineering/building-runway-characters"}</a></p>
      <h4>{"9. PopVid — Reverie AI"}</h4>
      <p><strong>{"First Public Release:"}</strong>{" Exact month not independently verified"}<br /><strong>{"Latest Verified Status:"}</strong>{" Active website reviewed October 23, 2026"}<br /><strong>{"Category:"}</strong>{" Consumer Interactive Video Entertainment"}<br /><strong>{"Access:"}</strong>{" Consumer web application"}</p>
      <p><strong>{"Company:"}</strong>{" Reverie AI"}<br /><strong>{"Product:"}</strong>{" PopVid"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time AI video roleplay."}</li>
        <li>{"Conversational characters."}</li>
        <li>{"Text, voice, touch, gestures, and other interactive inputs."}</li>
        <li>{"Dynamic video stories."}</li>
        <li>{"Character creation and community content."}</li>
        <li>{"Video remixing and user-directed story changes."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Reverie AI describes proprietary real-time interaction and world-generation models."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Consumer retention, interaction depth, content creation, and the advantages of owning both a foundational interaction model and the end-user application."}</p>
      <p>{"Product: "}<a href={"https://www.reverie-ai.com/"} target="_blank" rel="noopener noreferrer">{"https://www.reverie-ai.com/"}</a><br />{"Company: "}<a href={"https://reverie-ai.com/"} target="_blank" rel="noopener noreferrer">{"https://reverie-ai.com/"}</a><br />{"Roleplay: "}<a href={"https://www.reverie-ai.com/roleplay"} target="_blank" rel="noopener noreferrer">{"https://www.reverie-ai.com/roleplay"}</a></p>
      <h4>{"10. Tavus CVI — Tavus"}</h4>
      <p><strong>{"Released:"}</strong>{" August 15, 2024"}<br /><strong>{"Latest Verified Product Milestone:"}</strong>{" August 2025 — Conversational memory and portal capabilities"}<br /><strong>{"Status:"}</strong>{" Commercial platform active as of October 2026"}<br /><strong>{"Category:"}</strong>{" Conversational Video AI Infrastructure"}<br /><strong>{"Access:"}</strong>{" Live demo and developer API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time video conversations with AI replicas."}</li>
        <li>{"Audio and visual perception."}</li>
        <li>{"Turn-taking, interruptions, and conversational memory."}</li>
        <li>{"Personalized personas and external LLM integrations."}</li>
        <li>{"Developer-oriented conversation infrastructure."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Modular real-time perception, conversational intelligence, speech, and video rendering."}</p>
      <p><strong>{"Research Focus:"}</strong>{" A useful baseline for conversational latency and production reliability, although its product architecture should not be assumed equivalent to an end-to-end streaming world model."}</p>
      <p>{"Live Demo: "}<a href={"https://experience.tavus.io/"} target="_blank" rel="noopener noreferrer">{"https://experience.tavus.io/"}</a><br />{"Product: "}<a href={"https://www.tavus.io/cvi"} target="_blank" rel="noopener noreferrer">{"https://www.tavus.io/cvi"}</a><br />{"Updates: "}<a href={"https://www.tavus.io/updates"} target="_blank" rel="noopener noreferrer">{"https://www.tavus.io/updates"}</a></p>
      <h4>{"11. Decart Lucy 2.5 — Decart"}</h4>
      <p><strong>{"Released:"}</strong>{" July 16, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" July 2026"}<br /><strong>{"Category:"}</strong>{" Real-Time Video Editing"}<br /><strong>{"Access:"}</strong>{" Online demo"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Live video-to-video transformation."}</li>
        <li>{"Visual effects on incoming camera streams."}</li>
        <li>{"Physically aware editing."}</li>
        <li>{"Temporal consistency improvements."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" 30 FPS live editing."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Camera-conditioned generation, scene preservation, and the tradeoff between latency and editing quality."}</p>
      <p>{"Demo: "}<a href={"https://lucy.decart.ai/"} target="_blank" rel="noopener noreferrer">{"https://lucy.decart.ai/"}</a><br />{"Company: "}<a href={"https://decart.ai/"} target="_blank" rel="noopener noreferrer">{"https://decart.ai/"}</a></p>
      <h4>{"12. Krea Realtime Edit — Krea"}</h4>
      <p><strong>{"Latest Verified Product Announcement:"}</strong>{" January 20, 2026"}<br /><strong>{"Category:"}</strong>{" Interactive Creative Video Editing"}<br /><strong>{"Access:"}</strong>{" Krea web application"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time visual transformation."}</li>
        <li>{"Interactive drawing and editing."}</li>
        <li>{"Creative exploration with immediate feedback."}</li>
        <li>{"Reference- and instruction-driven modifications."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Different user experience from conversational avatars: the interaction loop is an artist continuously modifying visual conditions."}</p>
      <p>{"Product: "}<a href={"https://www.krea.ai/"} target="_blank" rel="noopener noreferrer">{"https://www.krea.ai/"}</a><br />{"Updates: "}<a href={"https://www.krea.ai/blog/"} target="_blank" rel="noopener noreferrer">{"https://www.krea.ai/blog/"}</a></p>
      <h4>{"13. Character.AI / AvatarFX"}</h4>
      <p><strong>{"Initial Public Product Period:"}</strong>{" 2025"}<br /><strong>{"Latest Relevant Research Milestone:"}</strong>{" July 3, 2025 — TalkingMachines announcement"}<br /><strong>{"Category:"}</strong>{" AI Character Entertainment / Video Creation"}<br /><strong>{"Access:"}</strong>{" Consumer application"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Character-driven content."}</li>
        <li>{"AI-generated character videos."}</li>
        <li>{"Interactive character ecosystem."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Distribution, user retention, established character communities, and the potential transition from text-based characters to real-time video."}</p>
      <p>{"Website: "}<a href={"https://character.ai/"} target="_blank" rel="noopener noreferrer">{"https://character.ai/"}</a></p>
      <h4>{"14. Google Project Genie"}</h4>
      <p><strong>{"Launched:"}</strong>{" January 29, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" May 19, 2026 — Expanded availability and Street View integration"}<br /><strong>{"Category:"}</strong>{" Interactive World Generation"}<br /><strong>{"Access:"}</strong>{" Eligible Google AI Ultra subscribers"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Create and explore generated environments."}</li>
        <li>{"Generate worlds based on reference descriptions."}</li>
        <li>{"Navigate interactive environments."}</li>
        <li>{"Create worlds influenced by real-world Street View imagery."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Powered by Google's Genie 3 research."}</p>
      <p><strong>{"Research Focus:"}</strong>{" General-purpose world exploration and limitations of consumer-facing generated environments."}</p>
      <p>{"Product Announcement: "}<a href={"https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/"} target="_blank" rel="noopener noreferrer">{"https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie/"}</a><br />{"May Update: "}<a href={"https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie-expands/"} target="_blank" rel="noopener noreferrer">{"https://blog.google/innovation-and-ai/models-and-research/google-deepmind/project-genie-expands/"}</a></p>
      <h4>{"15. Odyssey-2 Pro — Odyssey"}</h4>
      <p><strong>{"Released:"}</strong>{" January 23, 2026"}<br /><strong>{"Latest Generation:"}</strong>{" Odyssey-3, October 2026"}<br /><strong>{"Category:"}</strong>{" Interactive World Model"}<br /><strong>{"Access:"}</strong>{" Developer API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time interactive simulation."}</li>
        <li>{"Continuous world generation."}</li>
        <li>{"Physics and motion modeling."}</li>
        <li>{"Developer integration."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Learned dynamical systems and autoregressive world simulation."}</p>
      <p><strong>{"Research Focus:"}</strong>{" How a general world model can be offered as infrastructure instead of a single end-user product."}</p>
      <p>{"Announcement: "}<a href={"https://odyssey.systems/the-gpt-2-moment-for-world-models"} target="_blank" rel="noopener noreferrer">{"https://odyssey.systems/the-gpt-2-moment-for-world-models"}</a></p>
      <h4>{"16. Runway Game Worlds"}</h4>
      <p><strong>{"Public Beta Period:"}</strong>{" 2026"}<br /><strong>{"Exact Initial Release Month:"}</strong>{" Not verified"}<br /><strong>{"Latest Related Research Update:"}</strong>{" September 2026 — GWM Worlds 2"}<br /><strong>{"Category:"}</strong>{" Interactive Generative Worlds"}<br /><strong>{"Access:"}</strong>{" Beta login"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Interactive generated environments."}</li>
        <li>{"World exploration and game-like interactions."}</li>
        <li>{"Generative simulation and storytelling."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" User control, gameplay responsiveness, and whether neural video generation can support persistent game environments."}</p>
      <p>{"Beta: "}<a href={"https://play.runwayml.com/login"} target="_blank" rel="noopener noreferrer">{"https://play.runwayml.com/login"}</a></p>
      <h4>{"17. Krea Realtime"}</h4>
      <p><strong>{"Public Development:"}</strong>{" 2025"}<br /><strong>{"Latest Verified Related Product Update:"}</strong>{" January 20, 2026 — Realtime Edit"}<br /><strong>{"Category:"}</strong>{" Real-Time Creative Generation"}<br /><strong>{"Access:"}</strong>{" Online application"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Visual feedback during creation."}</li>
        <li>{"Drawing- and prompt-conditioned generation."}</li>
        <li>{"Live creative workflows."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Human-in-the-loop visual generation and latency-sensitive creative interfaces."}</p>
      <p>{"Website: "}<a href={"https://www.krea.ai/"} target="_blank" rel="noopener noreferrer">{"https://www.krea.ai/"}</a></p>
      <hr />
      <h3 id="interactive-video-commercial-models">{"PART II — OTHER COMMERCIAL MODELS & COMPANIES"}</h3>
      <h4>{"18. Philo AI"}</h4>
      <p><strong>{"Release Date:"}</strong>{" Unconfirmed"}<br /><strong>{"Latest Verified Status:"}</strong>{" Website reviewed October 2026"}<br /><strong>{"Category:"}</strong>{" Persistent Digital Life / World Life Model"}<br /><strong>{"Access:"}</strong>{" Public website; no verified self-service live demo"}</p>
      <p><strong>{"Capabilities / Vision"}</strong></p>
      <ul>
        <li>{"Continuously existing digital characters."}</li>
        <li>{"Long-term personal and world memory."}</li>
        <li>{"Autonomous behavior beyond direct prompts."}</li>
        <li>{"Real-time video interaction."}</li>
        <li>{"Persistent personality and storytelling."}</li>
      </ul>
      <p><strong>{"Important Distinction:"}</strong>{" Its website includes a development roadmap. Roadmap features and target latency figures should not be treated as shipped capabilities."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Persistent companions and the distinction between continuously generating video and maintaining a genuine long-lived world state."}</p>
      <p>{"Website: "}<a href={"https://philoai.com/"} target="_blank" rel="noopener noreferrer">{"https://philoai.com/"}</a></p>
      <h4>{"19. Visko Morphe"}</h4>
      <p><strong>{"Release Date:"}</strong>{" Unverified"}<br /><strong>{"Latest Update:"}</strong>{" No independently dated model release verified"}<br /><strong>{"Category:"}</strong>{" Real-Time Video Transformation"}</p>
      <p><strong>{"Focus:"}</strong>{" Person and character transformations within existing video, including maintaining continuity during modifications."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Identity preservation and transformation stability."}</p>
      <p>{"Website: "}<a href={"https://www.visko.ai/models"} target="_blank" rel="noopener noreferrer">{"https://www.visko.ai/models"}</a></p>
      <h4>{"20. Visko Kinesis"}</h4>
      <p><strong>{"Release Date:"}</strong>{" Unverified"}<br /><strong>{"Latest Update:"}</strong>{" No independently dated model release verified"}<br /><strong>{"Category:"}</strong>{" Controllable Video Editing"}</p>
      <p><strong>{"Focus:"}</strong>{" Object-level manipulation and interactive changes to generated or existing video."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Fine-grained object controllability rather than whole-scene prompt changes."}</p>
      <p>{"Website: "}<a href={"https://www.visko.ai/models"} target="_blank" rel="noopener noreferrer">{"https://www.visko.ai/models"}</a></p>
      <h4>{"21. Decart Oasis"}</h4>
      <p><strong>{"Released:"}</strong>{" October 2024"}<br /><strong>{"Latest Major Generation:"}</strong>{" Oasis 3, June 2026"}<br /><strong>{"Category:"}</strong>{" Interactive World Model"}<br /><strong>{"Access:"}</strong>{" Product and research demonstrations"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Generative playable environments."}</li>
        <li>{"Real-time world simulation."}</li>
        <li>{"Interactive control."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" One of the early demonstrations of neural world generation as an interactive product."}</p>
      <p>{"Website: "}<a href={"https://decart.ai/"} target="_blank" rel="noopener noreferrer">{"https://decart.ai/"}</a></p>
      <h4>{"22. Decart Oasis 3"}</h4>
      <p><strong>{"Released:"}</strong>{" June 10, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" June 2026"}<br /><strong>{"Category:"}</strong>{" Physical AI World Model"}<br /><strong>{"Access:"}</strong>{" Developer API"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Continuous driving-environment simulation."}</li>
        <li>{"Interactive changes to simulated environments."}</li>
        <li>{"Long-running physically motivated world generation."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Simulation for autonomous driving and robotics, not conversational characters."}</p>
      <p>{"Website: "}<a href={"https://decart.ai/"} target="_blank" rel="noopener noreferrer">{"https://decart.ai/"}</a></p>
      <h4>{"23. Odyssey-1"}</h4>
      <p><strong>{"Released:"}</strong>{" May 28, 2025"}<br /><strong>{"Latest Major Generation:"}</strong>{" Odyssey-3, October 2026"}<br /><strong>{"Category:"}</strong>{" Early Playable World Model"}</p>
      <p><strong>{"Focus:"}</strong>{" Early interactive, generated environments and user-directed simulation."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Starting point for studying Odyssey's model evolution."}</p>
      <p>{"Research Archive: "}<a href={"https://odyssey.systems/writing"} target="_blank" rel="noopener noreferrer">{"https://odyssey.systems/writing"}</a></p>
      <h4>{"24. Odyssey-2"}</h4>
      <p><strong>{"Released:"}</strong>{" October 27, 2025"}<br /><strong>{"Latest Major Generation:"}</strong>{" Odyssey-3, October 2026"}<br /><strong>{"Category:"}</strong>{" General-Purpose Interactive World Model"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time streamed worlds."}</li>
        <li>{"Text-controlled interaction."}</li>
        <li>{"Generated physics and environmental behavior."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Shift from playable demonstrations to general-purpose world simulation."}</p>
      <p>{"Announcement: "}<a href={"https://odyssey.systems/introducing-odyssey-2"} target="_blank" rel="noopener noreferrer">{"https://odyssey.systems/introducing-odyssey-2"}</a></p>
      <h4>{"25. Odyssey-2 Max"}</h4>
      <p><strong>{"Released:"}</strong>{" April 21, 2026"}<br /><strong>{"Latest Major Generation:"}</strong>{" Odyssey-3, October 2026"}<br /><strong>{"Category:"}</strong>{" Scaled World Model"}</p>
      <p><strong>{"Focus:"}</strong>{" Improved simulation quality, environmental dynamics, and physical accuracy through increased model capacity."}</p>
      <p><strong>{"Research Focus:"}</strong>{" World-model scaling laws and how quality changes with model size."}</p>
      <p>{"Announcement: "}<a href={"https://odyssey.systems/introducing-odyssey-2-max"} target="_blank" rel="noopener noreferrer">{"https://odyssey.systems/introducing-odyssey-2-max"}</a></p>
      <h4>{"26. Odyssey-3"}</h4>
      <p><strong>{"Initially Introduced:"}</strong>{" September 15, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 8, 2026 — Odyssey-3 launch announcement"}<br /><strong>{"Category:"}</strong>{" Foundation World Model / Physical Intelligence"}<br /><strong>{"Access:"}</strong>{" Research preview; developer access subject to availability"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time interactive world simulation."}</li>
        <li>{"Physical dynamics and object interaction."}</li>
        <li>{"Applications across robotics, driving, agents, and gaming."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Autoregressive diffusion transformer for learned world dynamics."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Compare physical reasoning and interaction fidelity against visually impressive but less controllable streaming models."}</p>
      <p>{"Announcement: "}<a href={"https://odyssey.systems/meet-odyssey-3"} target="_blank" rel="noopener noreferrer">{"https://odyssey.systems/meet-odyssey-3"}</a></p>
      <h4>{"27. Runway GWM-1"}</h4>
      <p><strong>{"Released:"}</strong>{" December 11, 2025"}<br /><strong>{"Latest Related Model Generation:"}</strong>{" GWM Worlds 2, September 2026"}<br /><strong>{"Category:"}</strong>{" General World Model Foundation"}</p>
      <p><strong>{"Model Family"}</strong></p>
      <ul>
        <li>{"GWM Worlds: Generated interactive environments."}</li>
        <li>{"GWM Avatars: Conversational characters."}</li>
        <li>{"GWM Robotics: Robotic manipulation."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Autoregressive world modeling based on Runway's generative video foundation."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Shared foundation models across video, interactive environments, and robotics."}</p>
      <p>{"Research: "}<a href={"https://runway.com/research/introducing-runway-gwm-1"} target="_blank" rel="noopener noreferrer">{"https://runway.com/research/introducing-runway-gwm-1"}</a></p>
      <h4>{"28. Runway GWM Worlds 2"}</h4>
      <p><strong>{"Released:"}</strong>{" September 3, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" September 2026"}<br /><strong>{"Category:"}</strong>{" Interactive Audio-Video World Model"}<br /><strong>{"Access:"}</strong>{" Research preview"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time generated environments."}</li>
        <li>{"Continuous camera movement."}</li>
        <li>{"Text actions directed at subjects or scenes."}</li>
        <li>{"Environment and visual-style control."}</li>
        <li>{"Generated environmental audio."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" 720p at 24 FPS and 48kHz audio."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Native joint audio-video world generation rather than video-only generation."}</p>
      <p>{"Research: "}<a href={"https://runway.com/research/introducing-gwm-worlds-2"} target="_blank" rel="noopener noreferrer">{"https://runway.com/research/introducing-gwm-worlds-2"}</a></p>
      <h4>{"29. Google Genie 3"}</h4>
      <p><strong>{"Research Preview:"}</strong>{" August 2025"}<br /><strong>{"Latest Related Product Update:"}</strong>{" May 19, 2026 — Project Genie expansion"}<br /><strong>{"Category:"}</strong>{" Interactive World Foundation Model"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Real-time explorable environments."}</li>
        <li>{"Prompt-conditioned world creation."}</li>
        <li>{"Navigation and environmental simulation."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Spatial persistence, scene memory, and generated world consistency."}</p>
      <p>{"Research: "}<a href={"https://deepmind.google/models/genie/"} target="_blank" rel="noopener noreferrer">{"https://deepmind.google/models/genie/"}</a></p>
      <h4>{"30. Vivix IVI"}</h4>
      <p><strong>{"Technical Report:"}</strong>{" June 2026"}<br /><strong>{"Latest Dated Update:"}</strong>{" No newer technical release independently verified"}<br /><strong>{"Category:"}</strong>{" Interactive Video Infrastructure"}</p>
      <p><strong>{"Focus"}</strong></p>
      <ul>
        <li>{"Combining offline control with real-time generation."}</li>
        <li>{"Managing interactive video execution."}</li>
        <li>{"Coordinating user instructions and generated content."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" The serving and application infrastructure necessary to turn streaming models into production experiences."}</p>
      <p>{"Research: "}<a href={"https://vivix.ai/research"} target="_blank" rel="noopener noreferrer">{"https://vivix.ai/research"}</a></p>
      <h4>{"31. MiniMax H3"}</h4>
      <p><strong>{"Released:"}</strong>{" July 31, 2026"}<br /><strong>{"Open Weights Announced:"}</strong>{" August 3, 2026"}<br /><strong>{"Latest Related Acceleration Report:"}</strong>{" October 2026 — FastH3-Omni"}<br /><strong>{"Category:"}</strong>{" General-Purpose Multimodal Video Model"}<br /><strong>{"Access:"}</strong>{" Hosted generation and downloadable weights"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Text, image, video, and audio conditioning."}</li>
        <li>{"Native stereo-audio video generation."}</li>
        <li>{"Up to 2K output and 15-second generated clips."}</li>
        <li>{"Video editing and motion transfer."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" H3-VAE, H3-Omni Transformer, multimodal conditioning."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Understand how a high-quality general-purpose video model can be distilled and optimized for near-real-time continuous generation."}</p>
      <p>{"Research: "}<a href={"https://www.minimax.io/blog/minimax-h3"} target="_blank" rel="noopener noreferrer">{"https://www.minimax.io/blog/minimax-h3"}</a><br />{"Open Weights: "}<a href={"https://www.minimax.io/news/minimax-h3-open-source"} target="_blank" rel="noopener noreferrer">{"https://www.minimax.io/news/minimax-h3-open-source"}</a></p>
      <h4>{"32. Character.AI TalkingMachines"}</h4>
      <p><strong>{"Released as Research:"}</strong>{" July 3, 2025"}<br /><strong>{"Latest Verified Research Announcement:"}</strong>{" July 2025"}<br /><strong>{"Category:"}</strong>{" Real-Time Audio-Driven Character Generation"}<br /><strong>{"Access:"}</strong>{" Research demonstration; general API availability unverified"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Image- and audio-conditioned conversational video."}</li>
        <li>{"Autoregressive diffusion."}</li>
        <li>{"Character animation across visual styles."}</li>
      </ul>
      <p><strong>{"Technology:"}</strong>{" Asymmetric knowledge distillation, sparse causal attention, accelerated diffusion."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Real-time avatar generation efficiency and the combination of generative video with a large character-companion user base."}</p>
      <p>{"Research: "}<a href={"https://blog.character.ai/character-ais-real-time-video-breakthrough/"} target="_blank" rel="noopener noreferrer">{"https://blog.character.ai/character-ais-real-time-video-breakthrough/"}</a></p>
      <hr />
      <h3 id="interactive-video-open-source">{"PART III — OPEN-SOURCE & RESEARCH MODELS"}</h3>
      <h4>{"33. CausVid"}</h4>
      <p><strong>{"Paper:"}</strong>{" December 2024"}<br /><strong>{"Latest Dated Major Update:"}</strong>{" Not independently verified"}<br /><strong>{"Category:"}</strong>{" Foundational Streaming Video Diffusion"}<br /><strong>{"Access:"}</strong>{" Open-source research"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Converts bidirectional video diffusion into a causal generator."}</li>
        <li>{"Student-teacher distillation."}</li>
        <li>{"Autoregressive streaming inference."}</li>
      </ul>
      <p><strong>{"Why It Matters:"}</strong>{" An important early foundation for the modern streaming video diffusion research direction."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/tianweiy/CausVid"} target="_blank" rel="noopener noreferrer">{"https://github.com/tianweiy/CausVid"}</a></p>
      <h4>{"34. Self Forcing"}</h4>
      <p><strong>{"Paper:"}</strong>{" June 2025"}<br /><strong>{"Latest Major Research Release:"}</strong>{" Not independently verified"}<br /><strong>{"Category:"}</strong>{" Autoregressive Video Diffusion"}<br /><strong>{"Access:"}</strong>{" Open-source code and model weights"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"On-policy diffusion distillation."}</li>
        <li>{"Training on self-generated histories."}</li>
        <li>{"Reduced train-inference mismatch."}</li>
        <li>{"KV cache support for causal generation."}</li>
      </ul>
      <p><strong>{"Deployment Relevance:"}</strong>{" Good starting point for independently deploying a streaming video diffusion model."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/guandeh17/Self-Forcing"} target="_blank" rel="noopener noreferrer">{"https://github.com/guandeh17/Self-Forcing"}</a><br />{"Paper: "}<a href={"https://arxiv.org/abs/2506.08009"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2506.08009"}</a></p>
      <h4>{"35. Matrix-Game 2.0 — Skywork AI"}</h4>
      <p><strong>{"Released:"}</strong>{" August 12, 2025"}<br /><strong>{"Latest Generation:"}</strong>{" Matrix-Game 4.0, October 2026"}<br /><strong>{"Category:"}</strong>{" Action-Conditioned World Model"}<br /><strong>{"Access:"}</strong>{" Open-source"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Real-time interactive video world generation."}</li>
        <li>{"Keyboard and mouse controls."}</li>
        <li>{"Action-conditioned video diffusion."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" How discrete or continuous user actions become conditions for the next generated video frames."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/SkyworkAI/Matrix-Game"} target="_blank" rel="noopener noreferrer">{"https://github.com/SkyworkAI/Matrix-Game"}</a></p>
      <h4>{"36. Matrix-Game 3.0"}</h4>
      <p><strong>{"Released:"}</strong>{" March 27, 2026"}<br /><strong>{"Latest Generation:"}</strong>{" Matrix-Game 4.0, October 2026"}<br /><strong>{"Category:"}</strong>{" Long-Horizon Interactive World Model"}<br /><strong>{"Access:"}</strong>{" Open-source"}</p>
      <p><strong>{"Technical Focus"}</strong></p>
      <ul>
        <li>{"Improved real-time world generation."}</li>
        <li>{"Longer-running interaction."}</li>
        <li>{"Memory and consistency across generated video."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Evolution beyond short-term action-conditioned generation."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/SkyworkAI/Matrix-Game"} target="_blank" rel="noopener noreferrer">{"https://github.com/SkyworkAI/Matrix-Game"}</a></p>
      <h4>{"37. Matrix-Game 4.0"}</h4>
      <p><strong>{"Released:"}</strong>{" October 15, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 16, 2026 — Optimized consumer GPU inference"}<br /><strong>{"Category:"}</strong>{" Game-Engine-Grounded Streaming Neural Rendering"}<br /><strong>{"Access:"}</strong>{" Open-source inference, model weights, game assets, browser demo"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Combines conventional game-engine state with generative neural rendering."}</li>
        <li>{"Engine handles game logic and physics."}</li>
        <li>{"Causal video generator renders enhanced visuals."}</li>
        <li>{"Supports multiple environments, including castle, Egyptian, and racing scenes."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" Optimized steady-state inference up to 67 FPS on RTX 5080 under specified conditions, excluding video I/O."}</p>
      <p><strong>{"Why It Matters:"}</strong>{" A significant alternative to entirely neural world simulation. The engine can preserve hard game state while the model handles visual generation."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/SkyworkAI/Matrix-Game"} target="_blank" rel="noopener noreferrer">{"https://github.com/SkyworkAI/Matrix-Game"}</a></p>
      <h4>{"38. LongLive 1.0 — NVIDIA"}</h4>
      <p><strong>{"Released:"}</strong>{" September 29, 2025"}<br /><strong>{"Latest Generation:"}</strong>{" LongLive 2.0"}<br /><strong>{"Category:"}</strong>{" Interactive Long-Form Video Diffusion"}<br /><strong>{"Access:"}</strong>{" Open-source code and weights"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Long-video autoregressive generation."}</li>
        <li>{"Frame sink and KV-recache."}</li>
        <li>{"Dynamic prompt switching."}</li>
        <li>{"Improved long-horizon consistency."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Video generation analogous to streaming token inference, including the reuse and management of historical context."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/NVlabs/LongLive"} target="_blank" rel="noopener noreferrer">{"https://github.com/NVlabs/LongLive"}</a></p>
      <h4>{"39. LongLive 2.0"}</h4>
      <p><strong>{"Released:"}</strong>{" May 13, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" July 8, 2026 — FP8 inference support"}<br /><strong>{"Category:"}</strong>{" Streaming Video Model Infrastructure"}<br /><strong>{"Access:"}</strong>{" Open-source"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"NVFP4 and FP8 inference paths."}</li>
        <li>{"Autoregressive training and distillation."}</li>
        <li>{"Multi-shot video generation."}</li>
        <li>{"Parallelism and more efficient KV-cache processing."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" 45.7 FPS in the official release configuration."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Serving efficiency and model optimization for continuous generative video."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/NVlabs/LongLive"} target="_blank" rel="noopener noreferrer">{"https://github.com/NVlabs/LongLive"}</a></p>
      <h4>{"40. LongLive-Plug"}</h4>
      <p><strong>{"Released:"}</strong>{" September 28, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" September 2026"}<br /><strong>{"Category:"}</strong>{" Streaming Video Training & Inference Recipes"}<br /><strong>{"Access:"}</strong>{" Open-source"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Training and inference recipes."}</li>
        <li>{"Classifier-free guidance configurations."}</li>
        <li>{"Few-step video distillation."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Reusable tooling for adapting foundation video models to streaming generation, including work related to MiniMax-H3."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/NVlabs/LongLive"} target="_blank" rel="noopener noreferrer">{"https://github.com/NVlabs/LongLive"}</a></p>
      <h4>{"41. Rolling Forcing"}</h4>
      <p><strong>{"Paper:"}</strong>{" September 29, 2025"}<br /><strong>{"Latest Dated Major Update:"}</strong>{" Not independently verified"}<br /><strong>{"Category:"}</strong>{" Long-Form Streaming Video Diffusion"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Joint denoising over multiple temporal frames."}</li>
        <li>{"Attention sinks for stable historical context."}</li>
        <li>{"Reduced autoregressive error accumulation."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" How to prevent video quality and identity consistency from degrading during long-running generation."}</p>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2509.25161"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2509.25161"}</a></p>
      <h4>{"42. Krea Realtime 14B"}</h4>
      <p><strong>{"Released:"}</strong>{" October 20, 2025"}<br /><strong>{"Latest Verified Major Release:"}</strong>{" October 2025"}<br /><strong>{"Category:"}</strong>{" Open-Source Large Streaming Video Model"}<br /><strong>{"Access:"}</strong>{" Code and weights"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"14B video model distilled from Wan 2.1."}</li>
        <li>{"Self-Forcing-based autoregressive generation."}</li>
        <li>{"Prompt changes during generation."}</li>
        <li>{"WebSocket streaming server."}</li>
        <li>{"Video-to-video support."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" Approximately 11 FPS on a single NVIDIA B200, using four inference steps."}</p>
      <p><strong>{"Deployment Relevance:"}</strong>{" Particularly interesting because its public repository includes serving infrastructure, not merely offline sampling scripts."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/krea-ai/realtime-video"} target="_blank" rel="noopener noreferrer">{"https://github.com/krea-ai/realtime-video"}</a><br />{"Research: "}<a href={"https://www.krea.ai/blog/krea-realtime-14b"} target="_blank" rel="noopener noreferrer">{"https://www.krea.ai/blog/krea-realtime-14b"}</a></p>
      <h4>{"43. Live Avatar — Alibaba"}</h4>
      <p><strong>{"Paper:"}</strong>{" December 4, 2025"}<br /><strong>{"Code and Weights:"}</strong>{" December 8, 2025"}<br /><strong>{"Latest Verified Research Milestone:"}</strong>{" June 18, 2026 — ECCV 2026 Spotlight acceptance"}<br /><strong>{"Latest Named Model Update:"}</strong>{" January 20, 2026 — v1.1 optimization"}<br /><strong>{"Category:"}</strong>{" Real-Time Audio-Driven Avatar"}<br /><strong>{"Access:"}</strong>{" Open-source code and weights"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"14B diffusion model."}</li>
        <li>{"Block-wise autoregressive generation."}</li>
        <li>{"Infinite-duration video objectives."}</li>
        <li>{"Timestep-forcing pipeline parallelism."}</li>
        <li>{"FP8 quantization and streaming VAE."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" Over 45 FPS on multi-H800 configurations."}</p>
      <p><strong>{"Deployment Note:"}</strong>{" Single-GPU inference exists, but it should not be equated with the demonstrated multi-GPU real-time performance."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/Alibaba-Quark/LiveAvatar"} target="_blank" rel="noopener noreferrer">{"https://github.com/Alibaba-Quark/LiveAvatar"}</a></p>
      <h4>{"44. StreamAvatar"}</h4>
      <p><strong>{"Paper:"}</strong>{" December 2025"}<br /><strong>{"Latest Update:"}</strong>{" No newer dated model release independently verified"}<br /><strong>{"Category:"}</strong>{" Streaming Conversational Avatar"}</p>
      <p><strong>{"Technical Focus"}</strong></p>
      <ul>
        <li>{"Real-time avatar generation."}</li>
        <li>{"Talking and listening behavior."}</li>
        <li>{"Gesture and motion consistency."}</li>
        <li>{"Long-running conversational video."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Natural non-speaking behavior, which is important because realistic avatars must remain alive while listening."}</p>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2512.22065"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2512.22065"}</a><br />{"Project: "}<a href={"https://streamavatar.github.io/"} target="_blank" rel="noopener noreferrer">{"https://streamavatar.github.io/"}</a></p>
      <h4>{"45. LiveTalk"}</h4>
      <p><strong>{"Paper:"}</strong>{" December 2025"}<br /><strong>{"Latest Verified Release:"}</strong>{" Open-source repository available; newer dated major release not established"}<br /><strong>{"Category:"}</strong>{" Real-Time Multimodal Interactive Avatar"}<br /><strong>{"Access:"}</strong>{" Open-source code and weights"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Image, text, and audio conditioning."}</li>
        <li>{"Streaming avatar video diffusion."}</li>
        <li>{"On-policy distillation."}</li>
        <li>{"Low-latency generation."}</li>
      </ul>
      <p><strong>{"Reported Research Performance:"}</strong>{" Approximately 24.82 FPS and 0.33-second first-frame latency under the authors' test conditions."}</p>
      <p><strong>{"Deployment Relevance:"}</strong>{" One of the best projects to explore if the goal is personally deploying a real-time diffusion-generated avatar."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/GAIR-NLP/LiveTalk"} target="_blank" rel="noopener noreferrer">{"https://github.com/GAIR-NLP/LiveTalk"}</a><br />{"Paper: "}<a href={"https://arxiv.org/abs/2512.23576"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2512.23576"}</a></p>
      <h4>{"46. InteractAvatar"}</h4>
      <p><strong>{"Project Release:"}</strong>{" January 2026, approximately"}<br /><strong>{"Latest Update:"}</strong>{" No newer dated release independently verified"}<br /><strong>{"Category:"}</strong>{" Human-Object Interactive Avatar Generation"}<br /><strong>{"Access:"}</strong>{" Research code"}</p>
      <p><strong>{"Capabilities"}</strong></p>
      <ul>
        <li>{"Text-conditioned character actions."}</li>
        <li>{"Human-object interaction generation."}</li>
        <li>{"Reference-driven character control."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Whether generated characters can obey complex physical interaction instructions instead of only producing natural-looking speech animation."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/angzong/InteractAvatar"} target="_blank" rel="noopener noreferrer">{"https://github.com/angzong/InteractAvatar"}</a></p>
      <h4>{"47. SoulX-LiveAct"}</h4>
      <p><strong>{"Code and Weights Released:"}</strong>{" March 16, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" May 27, 2026 — FP4 GEMM support for additional GPUs"}<br /><strong>{"Category:"}</strong>{" Long-Duration Human Animation"}<br /><strong>{"Access:"}</strong>{" Open-source inference and weights"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Neighbor Forcing."}</li>
        <li>{"ConvKV memory compression."}</li>
        <li>{"Multimodal-controlled animation."}</li>
        <li>{"Extended continuous generation."}</li>
      </ul>
      <p><strong>{"Reported Performance"}</strong></p>
      <ul>
        <li>{"20 FPS with two H100/H200 GPUs."}</li>
        <li>{"Around 6 FPS on one RTX 5090 under the published configuration."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Combining long-horizon character consistency with affordable inference."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/Soul-AILab/SoulX-LiveAct"} target="_blank" rel="noopener noreferrer">{"https://github.com/Soul-AILab/SoulX-LiveAct"}</a><br />{"Paper: "}<a href={"https://arxiv.org/abs/2603.11746"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2603.11746"}</a></p>
      <h4>{"48. StreamChar"}</h4>
      <p><strong>{"Paper:"}</strong>{" May 2026"}<br /><strong>{"Latest Update:"}</strong>{" No newer dated major release independently verified"}<br /><strong>{"Category:"}</strong>{" Streaming Character Audio-Video Generation"}</p>
      <p><strong>{"Technical Focus"}</strong></p>
      <ul>
        <li>{"Continuous audio-video character synthesis."}</li>
        <li>{"Long-duration character consistency."}</li>
        <li>{"Streaming generation and temporal coordination."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Joint audio-video generation and consistency across extended conversations."}</p>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2605.25659"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2605.25659"}</a></p>
      <h4>{"49. OmniMate"}</h4>
      <p><strong>{"Paper:"}</strong>{" July 2026"}<br /><strong>{"Latest Update:"}</strong>{" No newer dated major release independently verified"}<br /><strong>{"Category:"}</strong>{" Joint Real-Time Audio-Video Generation"}</p>
      <p><strong>{"Technical Focus"}</strong></p>
      <ul>
        <li>{"Simultaneous speech and video generation."}</li>
        <li>{"Sound effects and audiovisual coordination."}</li>
        <li>{"Multimodal character interaction."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Native audiovisual models versus separate speech and video generation pipelines."}</p>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2607.23023"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2607.23023"}</a></p>
      <h4>{"50. Zing-0.5"}</h4>
      <p><strong>{"Paper:"}</strong>{" September 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" September 2026"}<br /><strong>{"Category:"}</strong>{" Real-Time Playable World Model"}<br /><strong>{"Access:"}</strong>{" Released model weights, inference code, and serving implementation"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"5B autoregressive world model."}</li>
        <li>{"Joint keyboard action and text conditioning."}</li>
        <li>{"Four-step generation."}</li>
        <li>{"Event-scale supervision."}</li>
        <li>{"Zing-SGLang serving integration."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" 832×480 at 24 FPS, with estimated serving cost around $0.009 per stream-minute in the paper's assumptions."}</p>
      <p><strong>{"Research Focus:"}</strong>{" A particularly strong reference for low-cost, controllable streaming video deployment."}</p>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2609.17909"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2609.17909"}</a></p>
      <h4>{"51. Autoregressive Adversarial Post-Training (AAPT)"}</h4>
      <p><strong>{"Paper:"}</strong>{" June 11, 2025"}<br /><strong>{"Latest Update:"}</strong>{" No newer dated major release independently verified"}<br /><strong>{"Category:"}</strong>{" Real-Time Autoregressive Video Diffusion"}</p>
      <p><strong>{"Technical Contributions"}</strong></p>
      <ul>
        <li>{"Adversarial post-training."}</li>
        <li>{"One neural function evaluation per generated latent frame."}</li>
        <li>{"Streaming video with causal context."}</li>
        <li>{"Reduced autoregressive error accumulation."}</li>
      </ul>
      <p><strong>{"Reported Performance:"}</strong>{" 24 FPS at 736×416 using an 8B model on a single H100, under the authors' experimental configuration."}</p>
      <p><strong>{"Research Focus:"}</strong>{" Alternative approaches to few-step distillation for real-time video generation."}</p>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2506.09350"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2506.09350"}</a></p>
      <hr />
      <h3 id="interactive-video-papers-benchmarks">{"PART IV — IMPORTANT PAPERS, REPORTS & BENCHMARKS"}</h3>
      <h4>{"52. Visko Orbis 1.0 Technical Paper"}</h4>
      <p><strong>{"Published:"}</strong>{" July 29, 2026"}<br /><strong>{"Latest Related Product Milestone:"}</strong>{" September 1, 2026 — Orbis public release"}<br /><strong>{"Type:"}</strong>{" Foundation Model Research"}</p>
      <p><strong>{"Core Topics"}</strong></p>
      <ul>
        <li>{"Chunk-wise streaming generation."}</li>
        <li>{"Long-horizon memory."}</li>
        <li>{"Video upscaling."}</li>
        <li>{"Continuous prompt interaction."}</li>
        <li>{"4K real-time serving architecture."}</li>
      </ul>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2607.26694"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2607.26694"}</a></p>
      <h4>{"53. Vidu S2 Technical Paper"}</h4>
      <p><strong>{"Published:"}</strong>{" September 10, 2026"}<br /><strong>{"Latest Related Product Milestone:"}</strong>{" September 15, 2026 — Product announcement"}<br /><strong>{"Type:"}</strong>{" Technical Research Paper"}</p>
      <p><strong>{"Core Topics"}</strong></p>
      <ul>
        <li>{"Interactive character video."}</li>
        <li>{"Dynamic reference updates."}</li>
        <li>{"Real-time editing."}</li>
        <li>{"Spatial video generation."}</li>
        <li>{"Multimodal control."}</li>
      </ul>
      <p>{"Paper: "}<a href={"https://arxiv.org/abs/2609.11638"} target="_blank" rel="noopener noreferrer">{"https://arxiv.org/abs/2609.11638"}</a></p>
      <h4>{"54. StreamEval Benchmark"}</h4>
      <p><strong>{"First Submitted:"}</strong>{" October 20, 2026"}<br /><strong>{"Last Verified Paper Update:"}</strong>{" October 21, 2026"}<br /><strong>{"Type:"}</strong>{" Benchmark / Evaluation Framework"}<br /><strong>{"Access:"}</strong>{" Open-source evaluation tools"}</p>
      <p><strong>{"Coverage"}</strong></p>
      <ul>
        <li>{"Digital-human dialogue."}</li>
        <li>{"Avatar performance."}</li>
        <li>{"Text-conditioned world generation."}</li>
        <li>{"Video instruction editing."}</li>
        <li>{"Reference-driven editing."}</li>
      </ul>
      <p><strong>{"Evaluation Dimensions"}</strong></p>
      <ul>
        <li>{"Task execution."}</li>
        <li>{"Temporal and state consistency."}</li>
        <li>{"Visual fidelity."}</li>
        <li>{"Audiovisual coordination."}</li>
      </ul>
      <p><strong>{"Scale:"}</strong>{" 37 evaluated models across 300 test cases, according to the paper."}</p>
      <p><strong>{"Research Focus:"}</strong>{" One of the most directly relevant public benchmarks for comparing interactive video models beyond subjective visual quality."}</p>
      <p>{"GitHub: "}<a href={"https://github.com/StreamEval/StreamEval"} target="_blank" rel="noopener noreferrer">{"https://github.com/StreamEval/StreamEval"}</a><br />{"Leaderboard: "}<a href={"https://streameval.ai/"} target="_blank" rel="noopener noreferrer">{"https://streameval.ai/"}</a></p>
      <h4>{"55. FastH3-Omni — Reactor"}</h4>
      <p><strong>{"Technical Article:"}</strong>{" October 21, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" October 21, 2026"}<br /><strong>{"Type:"}</strong>{" Video Diffusion Inference Optimization"}</p>
      <p><strong>{"Core Topics"}</strong></p>
      <ul>
        <li>{"MiniMax-H3 inference acceleration."}</li>
        <li>{"Parallel Decoding Distillation."}</li>
        <li>{"Reduction from 49 to 8 denoising steps."}</li>
        <li>{"Video Sparse Attention."}</li>
        <li>{"Clip continuation and latent reuse."}</li>
        <li>{"Faster-than-playback video generation."}</li>
      </ul>
      <p><strong>{"Important Distinction:"}</strong>{" Continuous clip generation and immediate action-responsive streaming are not identical."}</p>
      <p><strong>{"Research Focus:"}</strong>{" How expensive general video diffusion systems can be optimized into continuously serving video generators."}</p>
      <p>{"Technical Report: "}<a href={"https://www.reactor.inc/blog/fast-h3-omni"} target="_blank" rel="noopener noreferrer">{"https://www.reactor.inc/blog/fast-h3-omni"}</a></p>
      <h4>{"56. Building Runway Characters — Engineering Report"}</h4>
      <p><strong>{"Published:"}</strong>{" May 4, 2026"}<br /><strong>{"Latest Verified Update:"}</strong>{" May 2026"}<br /><strong>{"Type:"}</strong>{" Production System Engineering"}</p>
      <p><strong>{"Core Topics"}</strong></p>
      <ul>
        <li>{"Single-image avatar generation."}</li>
        <li>{"Streaming diffusion optimization."}</li>
        <li>{"Video decoder parallelism."}</li>
        <li>{"Real-time voice interaction."}</li>
        <li>{"End-to-end conversational latency."}</li>
      </ul>
      <p><strong>{"Research Focus:"}</strong>{" Particularly useful for understanding the difference between raw model speed and total user-perceived latency."}</p>
      <p>{"Engineering Report: "}<a href={"https://runway.com/news/engineering/building-runway-characters"} target="_blank" rel="noopener noreferrer">{"https://runway.com/news/engineering/building-runway-characters"}</a></p>
      <hr />
      <h3 id="interactive-video-benchmarking">{"PART V — RECOMMENDED COMPETITIVE BENCHMARKING"}</h3>
      <h4>{"Tier 1 — Interactive Character Models"}</h4>
      <p><strong>{"Priority Companies"}</strong></p>
      <ul>
        <li>{"Vidu S2-Avatar"}</li>
        <li>{"Vivix-A1"}</li>
        <li>{"LemonSlice CWM-1"}</li>
        <li>{"Runway Characters"}</li>
        <li>{"Reverie AI / PopVid"}</li>
        <li>{"Tavus"}</li>
        <li>{"Character.AI TalkingMachines"}</li>
        <li>{"Philo AI"}</li>
      </ul>
      <p><strong>{"Key Evaluation Questions"}</strong></p>
      <ul>
        <li>{"Can the character be interrupted naturally?"}</li>
        <li>{"Can it move its entire body, not just its face?"}</li>
        <li>{"Can it manipulate new objects?"}</li>
        <li>{"Does it accurately follow unexpected instructions?"}</li>
        <li>{"Does character identity remain stable?"}</li>
        <li>{"Does it remain visually active while listening?"}</li>
        <li>{"Can it handle long conversations?"}</li>
        <li>{"What is the actual action-to-visual response latency?"}</li>
      </ul>
      <h4>{"Tier 2 — Interactive Worlds"}</h4>
      <p><strong>{"Priority Projects"}</strong></p>
      <ul>
        <li>{"Visko Orbis"}</li>
        <li>{"Odyssey-3"}</li>
        <li>{"Decart Oasis 3"}</li>
        <li>{"Google Genie 3"}</li>
        <li>{"Runway GWM Worlds 2"}</li>
        <li>{"Vivix-W1"}</li>
        <li>{"Matrix-Game 4.0"}</li>
        <li>{"Zing-0.5"}</li>
      </ul>
      <p><strong>{"Key Evaluation Questions"}</strong></p>
      <ul>
        <li>{"How accurately does the world respond to controls?"}</li>
        <li>{"Does the system maintain object permanence?"}</li>
        <li>{"Can users change instructions without restarting generation?"}</li>
        <li>{"Does the world maintain spatial consistency?"}</li>
        <li>{"Does the model represent persistent world state or mainly visual history?"}</li>
        <li>{"How long can it generate before quality deteriorates?"}</li>
      </ul>
      <h4>{"Tier 3 — Streaming Foundation Models"}</h4>
      <p><strong>{"Priority Projects"}</strong></p>
      <ul>
        <li>{"Self Forcing"}</li>
        <li>{"LongLive 2.0"}</li>
        <li>{"LongLive-Plug"}</li>
        <li>{"Rolling Forcing"}</li>
        <li>{"CausVid"}</li>
        <li>{"Krea Realtime 14B"}</li>
        <li>{"MiniMax H3 / FastH3-Omni"}</li>
        <li>{"LiveTalk"}</li>
        <li>{"SoulX-LiveAct"}</li>
      </ul>
      <p><strong>{"Key Evaluation Questions"}</strong></p>
      <ul>
        <li>{"How many diffusion steps are required?"}</li>
        <li>{"Does the model generate frames or chunks?"}</li>
        <li>{"Is generation causal or bidirectional?"}</li>
        <li>{"How is historical context stored?"}</li>
        <li>{"Is KV cache supported?"}</li>
        <li>{"What is the first-frame latency?"}</li>
        <li>{"What is the sustained generated FPS?"}</li>
        <li>{"How many GPUs are required?"}</li>
        <li>{"Can inference run on a consumer GPU?"}</li>
        <li>{"Are the weights, inference code, and training code available?"}</li>
      </ul>
      <hr />
      <h3 id="interactive-video-timeline">{"PART VI — INDUSTRY TIMELINE"}</h3>
      <h4>{"2024"}</h4>
      <ul>
        <li><strong>{"August:"}</strong>{" Tavus CVI launches."}</li>
        <li><strong>{"October:"}</strong>{" Decart Oasis demonstrates early real-time generated worlds."}</li>
        <li><strong>{"December:"}</strong>{" CausVid contributes to causal streaming video diffusion research."}</li>
      </ul>
      <h4>{"2025"}</h4>
      <ul>
        <li><strong>{"May:"}</strong>{" Odyssey-1."}</li>
        <li><strong>{"June:"}</strong>{" Self Forcing and AAPT."}</li>
        <li><strong>{"July:"}</strong>{" Character.AI TalkingMachines."}</li>
        <li><strong>{"August:"}</strong>{" Matrix-Game 2.0 and Google Genie 3."}</li>
        <li><strong>{"September:"}</strong>{" LongLive and Rolling Forcing."}</li>
        <li><strong>{"October:"}</strong>{" Odyssey-2 and Krea Realtime 14B."}</li>
        <li><strong>{"December:"}</strong>{" Runway GWM-1, Live Avatar, LiveTalk, and StreamAvatar."}</li>
      </ul>
      <h4>{"2026"}</h4>
      <ul>
        <li><strong>{"January:"}</strong>{" Odyssey-2 Pro, Project Genie, and Live Avatar v1.1."}</li>
        <li><strong>{"March:"}</strong>{" Runway Characters, SoulX-LiveAct, and Matrix-Game 3.0."}</li>
        <li><strong>{"April:"}</strong>{" Odyssey-2 Max."}</li>
        <li><strong>{"May:"}</strong>{" LongLive 2.0 and Runway Characters engineering report."}</li>
        <li><strong>{"June:"}</strong>{" Vivix research reports and Decart Oasis 3."}</li>
        <li><strong>{"July:"}</strong>{" Visko Orbis paper, MiniMax H3, and Decart Lucy 2.5."}</li>
        <li><strong>{"August:"}</strong>{" MiniMax H3 open weights."}</li>
        <li><strong>{"September:"}</strong>{" Vidu S2, Visko Orbis public launch, LemonSlice CWM-1, Runway GWM Worlds 2, Zing-0.5, and LongLive-Plug."}</li>
        <li><strong>{"October:"}</strong>{" Odyssey-3, LemonSlice CWM-1 Lite, Matrix-Game 4.0, StreamEval, and FastH3-Omni."}</li>
      </ul>
      <hr />
      <h3 id="interactive-video-methodology">{"PART VII — TRACKING METHODOLOGY"}</h3>
      <h4>{"Recommended Fields for Future Updates"}</h4>
      <p>{"For each company or model, maintain:"}</p>
      <div className="research-tracker-table" role="region" aria-label="Recommended tracking fields" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">{"Field"}</th>
              <th scope="col">{"Purpose"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{"Company"}</td>
              <td>{"Legal or operating entity"}</td>
            </tr>
            <tr>
              <td>{"Product / Model"}</td>
              <td>{"Exact product or generation"}</td>
            </tr>
            <tr>
              <td>{"Category"}</td>
              <td>{"Avatar / World / Editing / Foundation"}</td>
            </tr>
            <tr>
              <td>{"Initial Release"}</td>
              <td>{"First documented date"}</td>
            </tr>
            <tr>
              <td>{"Latest Release"}</td>
              <td>{"Most recent confirmed version"}</td>
            </tr>
            <tr>
              <td>{"Last Verified"}</td>
              <td>{"Date information was last checked"}</td>
            </tr>
            <tr>
              <td>{"Access"}</td>
              <td>{"Public / Signup / API / Research / Open Source"}</td>
            </tr>
            <tr>
              <td>{"Architecture"}</td>
              <td>{"Causal DiT / AR Diffusion / Other"}</td>
            </tr>
            <tr>
              <td>{"Input Modalities"}</td>
              <td>{"Text / Audio / Image / Video / Actions"}</td>
            </tr>
            <tr>
              <td>{"Output Modalities"}</td>
              <td>{"Video / Audio / State"}</td>
            </tr>
            <tr>
              <td>{"Frame Rate"}</td>
              <td>{"Measured or reported FPS"}</td>
            </tr>
            <tr>
              <td>{"Resolution"}</td>
              <td>{"Reported output resolution"}</td>
            </tr>
            <tr>
              <td>{"Interaction Latency"}</td>
              <td>{"Action-to-visual or conversational response"}</td>
            </tr>
            <tr>
              <td>{"Hardware"}</td>
              <td>{"GPU model and quantity"}</td>
            </tr>
            <tr>
              <td>{"Cost"}</td>
              <td>{"Price per generated or streamed minute"}</td>
            </tr>
            <tr>
              <td>{"Open Source"}</td>
              <td>{"Code, weights, training availability"}</td>
            </tr>
            <tr>
              <td>{"Main Differentiator"}</td>
              <td>{"Most distinctive demonstrated capability"}</td>
            </tr>
            <tr>
              <td>{"Evidence"}</td>
              <td>{"Official announcement, paper, code, or independent test"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>{"Evaluation Rule:"}</strong>{" Never compare reported FPS, latency, or costs without checking hardware, resolution, inference precision, sampling steps, concurrent sessions, and whether video encoding and network transmission are included."}</p>
      <p><strong>{"Research Snapshot:"}</strong>{" October 23, 2026"}<br /><strong>{"Next Suggested Review:"}</strong>{" November 2026"}</p>
      <p><strong>{"End of Tracker — Version 2.0"}</strong></p>
    </div>
  )
}
