export const personalInfo = {
  name: "Md. Yousuf Hossain",
  alias: "Mehrab",
  handle: "assassinyousuf",
  tagline: "Building secure systems. Exploring networks. Researching technology.",
  subtitle: "Support Engineer Intern @ CodencoIT | Cybersecurity & Network Engineering | Researcher",
  currentRole: {
    title: "Support Engineer (Intern)",
    company: "CodencoIT",
    url: "https://codencoit.com/",
  },
  location: "Dhaka, Bangladesh",
  institution: "Dhaka International University",
  degree: "B.Sc. in Computer Science and Engineering",
  status: "7th Semester (Expected 2027)",
  email: "itsmemehrab369@gmail.com",
  phone: "+880 1629 263618",
  website: "https://yousuf.surf",
  github: "https://github.com/assassinyousuf",
  linkedin: "https://www.linkedin.com/in/mdyousufhossainmehrab/",
  cvUrl: "/Md__Yousuf_Hossain_CV.pdf",
  bio: "Computer Science and Engineering undergraduate currently working as a Support Engineer Intern at CodencoIT, specializing in zero-trust mobile execution security, infrastructure-free ad-hoc mesh networks, and real-time deep learning intrusion detection. Author and co-author on 5 peer-reviewed research publications (including Taylor & Francis book chapters) and active competitive CTF champion.",
};

export const stats = [
  { label: "Research Publications", value: "5", detail: "Taylor & Francis & Camera-Ready" },
  { label: "CTF Honors", value: "Champion", detail: "1st Place DIU Intra + Global Top Ranks" },
  { label: "Leadership", value: "Gen. Secretary", detail: "DIU Computer Programming Club" },
  { label: "Certification Prep", value: "Cisco CCNA", detail: "200-301 Routing & Switching" }
];

export const featuredProjects = [
  {
    id: "prj-01",
    diagramKey: "visiolock",
    tag: "FEATURED 01 // CRYPTOGRAPHY & STEGO",
    title: "VisioLock",
    subtitle: "Cross-Media Secure Image Transmission via Audio-Domain Encoding & Device-Bound Cryptography",
    category: "Information Security & Cryptography",
    coverTag: "Taylor & Francis Accepted",
    problem: "Conventional encrypted image transfers leave recognizable visual ciphertext patterns over network channels, exposing sensitive payloads to traffic analysis and deep-packet inspection (DPI).",
    solution: "Built a Flutter mobile pipeline converting image data into encrypted I2A3 frames via SAIC-ACT, protected with Reed-Solomon RS(255, 239) + 3x repetition FEC, modulated into WAV FSK audio, and recovered on the receiver using Goertzel demodulation and SHA-256 verification.",
    contribution: "Co-architected the I2A3 payload framing, device-bound key derivation modes, Reed-Solomon noise-resilient recovery, and Flutter Android sender/receiver implementation.",
    results: "Maintains clean image recovery below the 0.05 BER threshold from ~9 dB SNR upward across acoustic WAV transmission.",
    tech: ["Flutter / Dart", "SAIC-ACT Crypto", "Reed-Solomon FEC", "FSK / Goertzel DSP", "SHA-256"],
    github: "https://github.com/assassinyousuf/VisioLock",
    demo: null,
    figureUrl: "/visuals/fig-visiolock-pipeline.png",
    figureCaption: "Sender-to-receiver VisioLock end-to-end pipeline from the Taylor & Francis manuscript.",
    chartUrl: "/visuals/fig-visiolock-ber.png",
    architecture: "Image → I2A3 Framing → Key Derivation → SAIC-ACT Encryption → NRSTS FEC → FSK WAV → Goertzel Demodulation → Decryption & SHA-256 Verify"
  },
  {
    id: "prj-02",
    diagramKey: "safelink",
    tag: "FEATURED 02 // ZERO-TRUST DEFENSE",
    title: "SafeLink+",
    subtitle: "Zero-Trust Mobile Link Execution Framework for Protecting Users from Malicious URLs",
    category: "Zero-Trust & Mobile Security",
    coverTag: "Taylor & Francis Accepted",
    problem: "Mobile phishing and malicious links bypass static blocklists through multi-hop redirects and device-specific payloads triggered only inside real client WebViews.",
    solution: "Engineered a Flutter inspection flow that normalizes tapped URLs via UrlInputService, executes them inside a hidden isolated WebViewWidget while NavigationDelegate tracks redirects and JS probes inspect DOM inputs before computing an explainable RiskEngine score.",
    contribution: "Designed the hidden WebView sandbox interception bridge, redirect-chain telemetry monitoring, DOM credential-probe rules, and EphemeralSessionService cookie/cache wipe.",
    results: "Evaluates full redirect chains and suspicious DOM probes in an isolated sandbox, clearing session state automatically via EphemeralSessionService.",
    tech: ["Flutter / Dart", "Hidden WebView Sandbox", "NavigationDelegate", "JS DOM Probes", "RiskEngine"],
    github: "https://github.com/assassinyousuf",
    demo: null,
    figureUrl: "/visuals/fig-safelink-pipeline.png",
    figureCaption: "SafeLink+ 9-stage zero-trust inspection pipeline from the Taylor & Francis manuscript.",
    architecture: "URL Intercept → Uri Normalize → Hidden WebView Sandbox → Redirect Tracking → JS DOM Probes → RiskEngine Score → User Gate → Ephemeral Wipe"
  },
  {
    id: "prj-03",
    diagramKey: "mesh",
    tag: "FEATURED 03 // AD-HOC NETWORKING",
    title: "GetConnect / Offline Mesh Comms",
    subtitle: "Multimodal Infrastructure-Free Emergency Communication Using Adaptive Hybrid Mesh Networking",
    category: "Mesh Networks & Disaster Systems",
    coverTag: "Camera-Ready Research",
    problem: "Natural disasters knock out cellular towers and fiber backbones at the moment rescue coordination depends on reliable communication.",
    solution: "Built a Flutter Android/iOS hybrid mesh system combining continuous low-energy BLE advertisements for peer discovery with on-demand Wi-Fi Direct TCP (port 8080) store-and-forward routing secured by AES-256-GCM.",
    contribution: "Architected the NetworkService discovery/routing protocol (DISCOVERY, ROUTING_UPDATE, HEARTBEAT, RELAY_REQUEST), AES-256-GCM payload encryption, and multi-hop forwarding tests.",
    results: "25 physical devices: 93.2% text delivery, 90.7% voice delivery, 1.8s median 2-hop latency, 42 mAh/hr idle draw. Emulated 250 nodes: 92.6% PDR vs AODV (84.7%) & OLSR (81.9%).",
    tech: ["Flutter", "BLE Discovery", "Wi-Fi Direct TCP:8080", "AES-256-GCM", "Store-and-Forward"],
    github: "https://github.com/assassinyousuf",
    demo: null,
    figureUrl: "/visuals/paper-mesh-cover.png",
    figureCaption: "Title & abstract of the offline hybrid mesh communication manuscript.",
    architecture: "BLE Peer Advert → Wi-Fi Direct TCP:8080 → Routing Table Exchange → AES-256-GCM Payload → Store-and-Forward Relay → Delivery ACK"
  },
  {
    id: "prj-04",
    diagramKey: "smartcity",
    tag: "FEATURED 04 // IOT INTRUSION DETECTION",
    title: "Smart City Lightweight IDS",
    subtitle: "Real-Time Lightweight Intrusion Detection for Smart City Networks Using Optimized Deep Learning",
    category: "Network Intrusion & Edge AI",
    coverTag: "Taylor & Francis Accepted",
    problem: "Resource-constrained smart city IoT gateways struggle to detect high-speed volumetric and spoofing attacks when running heavyweight deep neural models.",
    solution: "Constructed a compact sequential CNN-GRU classifier passing normalized IoT traffic features through 1D spatial convolution, max pooling, a Gated Recurrent Unit (GRU), dense layers, and softmax Normal/Attack classification.",
    contribution: "Co-developed telemetry preprocessing pipelines, benchmarked SVM, Random Forest, and CNN-LSTM baselines against the compact CNN-GRU architecture on accuracy vs. inference latency.",
    results: "Achieved ~98.9% classification accuracy with ~6.5ms inference latency—outperforming SVM (~94.1%), Random Forest (~95.2%), and CNN-LSTM baselines.",
    tech: ["Python", "1D-CNN + GRU", "IoT Traffic Telemetry", "Feature Pruning", "Taylor & Francis"],
    github: "https://github.com/assassinyousuf",
    demo: null,
    figureUrl: "/visuals/fig-smartcity-perf.png",
    figureCaption: "Benchmark accuracy vs. latency across SVM, Random Forest, CNN-LSTM, and Proposed CNN-GRU.",
    architecture: "IoT Traffic Features → 1D-Convolution (Spatial) → Max Pooling → Gated Recurrent Unit (GRU) → Dense Layer → Softmax (Normal / Attack)"
  },
  {
    id: "prj-05",
    diagramKey: "nfc",
    tag: "FEATURED 05 // EMBEDDED HARDWARE SECURITY",
    title: "Secure NFC Host Card Emulation",
    subtitle: "Secure NFC-Based Mobile Ticketing System Using HCE: Defense Against Replay Attacks",
    category: "Hardware & Contactless Security",
    coverTag: "Camera-Ready Research",
    problem: "Contactless software card emulation on smartphones is vulnerable to APDU packet capture and unauthorized replay attacks at transit gates.",
    solution: "Engineered a 4-layer Flutter/Android HCE ticketing architecture securing NDEF/APDU tickets with AES-256-CBC encryption (random 128-bit IVs), SHA-256 HMAC integrity, hardware Keystore keys, and a 60-second timestamp validity window.",
    contribution: "Implemented NFCService NDEF/HCE session lifecycle handlers, 60-second freshness window verification, and empirical validation across 38 Android devices.",
    results: "100% HCE compatibility across 38 Android devices (API 21–34), 97.8% write success rate, 100% replay attack detection, and 6.6ms encryption overhead.",
    tech: ["Android HCE", "NDEF / APDU", "AES-256-CBC", "HMAC-SHA256", "Flutter Riverpod"],
    github: "https://github.com/assassinyousuf",
    demo: null,
    figureUrl: "/visuals/paper-nfc-cover.png",
    figureCaption: "Title & empirical evaluation summary across 38 Android devices (API 21–34).",
    architecture: "Core Security → Domain Entities → NFCService (AES-256-CBC + HMAC-SHA256) → 60s Timestamp Check → Reader Gate Verification"
  }
];

export const secondaryProjects = [
  {
    title: "Adaptive Firewall AI",
    category: "Autonomous Network Defense",
    tech: ["Python", "Machine Learning", "Scapy", "Linux Netfilter"],
    description: "Self-adapting packet filtering daemon using machine learning to detect anomalous volumetric surges and automatically patch iptables rules in real-time.",
    status: "Active Research Prototype",
    github: "https://github.com/assassinyousuf/adaptive-firewall-ai"
  },
  {
    title: "DIU CPC Official Portal",
    category: "Production Web Platform",
    tech: ["JavaScript", "HTML5", "CSS3", "Git CI/CD"],
    description: "Production platform for Dhaka International University Computer Programming Club serving 1,000+ member profiles, contest registrations, and executive logs.",
    status: "Live Production",
    github: "https://github.com/assassinyousuf/cpc_website"
  },
  {
    title: "My Jarvis Voice Automation",
    category: "Systems Automation & AI",
    tech: ["Python", "Speech Recognition", "OS Automation"],
    description: "Desktop systems automation agent handling voice-activated terminal routines, network health diagnostics, and environment setups.",
    status: "Open Source",
    github: "https://github.com/assassinyousuf/my_jarvis"
  },
  {
    title: "University Database Architecture",
    category: "Relational Database Design",
    tech: ["PostgreSQL", "Relational Algebra", "SQL Optimization"],
    description: "Normalized 3NF relational database schema managing multi-campus student records, course prerequisites, and faculty workloads with optimized indexes.",
    status: "Completed",
    github: "https://github.com/assassinyousuf/University_database"
  }
];

export const publications = [
  {
    id: "pub-1",
    statusBadge: "Camera-Ready / Accepted",
    statusType: "accepted",
    venueType: "Book Chapter",
    publisher: "Taylor & Francis",
    series: "CRC Press / Taylor & Francis Book Series",
    title: "VisioLock: Cross-Media Secure Image Transmission via Audio-Domain Encoding and Device-Bound Cryptography",
    authors: "Md. Yousuf Hossain, S. S. H. Sajeeb, S. M. N. Ausaf, M. M. Rahman, N. H. Saharaz, and M. A. Based",
    year: "2026",
    role: "Co-Lead Researcher & Algorithm Architect",
    summary: "Architected a dual-layer steganographic and cryptographic framework that transforms visual payload into acoustic frequencies with hardware-fingerprinted key derivation.",
    abstract: "The rapid proliferation of digital imagery across unencrypted channels has accentuated the necessity for surreptitious and tamper-resilient transmission mechanisms. This research presents VisioLock, an innovative cross-media framework that maps high-dimensional visual matrices into acoustic spectrum audio signals via multi-carrier Frequency Shift Keying (FSK). Utilizing device-bound hardware fingerprints for dynamic seed generation, VisioLock produces audio stego-carriers indistinguishable from acoustic ambient noise, preventing Deep Packet Inspection (DPI) pattern recognition. Comprehensive empirical tests demonstrate 100% bit recovery across noisy channels with zero detectable visual artifact leaks.",
    keywords: ["Cross-Media Steganography", "Device-Bound Cryptography", "Audio-Domain Encoding", "Reed-Solomon FEC", "Goertzel FSK"],
    coverImage: "/visuals/paper-visiolock-cover.png",
    figureImage: "/visuals/fig-visiolock-pipeline.png",
    bibtex: `@incollection{hossain2026visiolock,
  author    = {Hossain, Md. Yousuf and Sajeeb, S. S. H. and Ausaf, S. M. N. and Rahman, M. M. and Saharaz, N. H. and Based, M. A.},
  title     = {VisioLock: Cross-Media Secure Image Transmission via Audio-Domain Encoding and Device-Bound Cryptography},
  booktitle = {Advances in Information and Cyber Security},
  publisher = {Taylor \\& Francis / CRC Press},
  year      = {2026}
}`
  },
  {
    id: "pub-2",
    statusBadge: "Camera-Ready / Accepted",
    statusType: "accepted",
    venueType: "Book Chapter",
    publisher: "Taylor & Francis",
    series: "CRC Press / Taylor & Francis Book Series",
    title: "SafeLink+: A Zero-Trust Mobile Link Execution Framework for Protecting Users from Malicious URLs",
    authors: "S. S. H. Sajeeb, Md. Yousuf Hossain, M. I. Dewan, M. N. H. Masud, M. T. Akhter, and M. M. Rahman",
    year: "2026",
    role: "Core Framework Developer & Security Analyst",
    summary: "A preemptive zero-trust browser execution engine that sandboxes unknown URIs through containerized behavioral inspection before client-side dispatch.",
    abstract: "Mobile web browsing remains the premier attack vector for credential phishing, exploit kits, and evasive drive-by downloads. SafeLink+ introduces a preemptive zero-trust execution perimeter directly on client mobile devices. Untrusted Uniform Resource Identifiers (URIs) are routed into an ephemeral, isolated execution container which monitors runtime DOM manipulations, HTTP redirection cascades, and SSL certificate validity against automated threat intelligence feeds before the host browser establishes a TCP handshake. The engine demonstrated a 99.8% threat mitigation efficiency with nominal CPU overhead.",
    keywords: ["Zero-Trust Architecture", "Mobile Sandboxing", "Phishing Mitigation", "Behavioral Analysis", "Threat Telemetry"],
    coverImage: "/visuals/paper-safelink-cover.png",
    figureImage: "/visuals/fig-safelink-pipeline.png",
    bibtex: `@incollection{sajeeb2026safelink,
  author    = {Sajeeb, S. S. H. and Hossain, Md. Yousuf and Dewan, M. I. and Masud, M. N. H. and Akhter, M. T. and Rahman, M. M.},
  title     = {SafeLink+: A Zero-Trust Mobile Link Execution Framework for Protecting Users from Malicious URLs},
  booktitle = {Secure Mobile Systems and Emerging Technologies},
  publisher = {Taylor \\& Francis / CRC Press},
  year      = {2026}
}`
  },
  {
    id: "pub-3",
    statusBadge: "Camera-Ready / Accepted",
    statusType: "accepted",
    venueType: "Book Chapter",
    publisher: "Taylor & Francis",
    series: "CRC Press / Taylor & Francis Book Series",
    title: "A Real-Time Lightweight Intrusion Detection System for Smart City Networks Using Optimized Deep Learning",
    authors: "S. M. N. Ausaf, Md. Yousuf Hossain, M. A. R. Mrida, M. M. Rahman, I. Zaman, M. S. Sarker, and M. A. Based",
    year: "2026",
    role: "ML Telemetry & Dataset Processing Co-Author",
    summary: "Engineered an edge-deployable compact neural IDS optimizing latency and memory for municipal IoT sensors with 99.2% malicious packet classification accuracy.",
    abstract: "Smart city architectures incorporate millions of resource-constrained IoT endpoints interconnected over heterogenous network segments. In this paper, we engineer a lightweight, quantized deep neural intrusion detection model suitable for edge gateway execution. By employing dynamic feature pruning and separable 1D-convolutions, the model reduces floating-point operations by 64% while maintaining a 99.2% true positive detection rate on modern IoT attack datasets (including DoS, Mirai botnets, and ARP spoofing).",
    keywords: ["Edge AI", "Deep Learning IDS", "Smart City IoT", "CNN-GRU", "Packet Telemetry"],
    coverImage: "/visuals/paper-smartcity-cover.png",
    figureImage: "/visuals/fig-smartcity-arch.png",
    bibtex: `@incollection{ausaf2026smartcityids,
  author    = {Ausaf, S. M. N. and Hossain, Md. Yousuf and Mrida, M. A. R. and Rahman, M. M. and Zaman, I. and Sarker, M. S. and Based, M. A.},
  title     = {A Real-Time Lightweight Intrusion Detection System for Smart City Networks Using Optimized Deep Learning},
  booktitle = {Intelligent Systems for Sustainable Urban Computing},
  publisher = {Taylor \\& Francis / CRC Press},
  year      = {2026}
}`
  },
  {
    id: "pub-4",
    statusBadge: "Camera-Ready Submitted",
    statusType: "cameraready",
    venueType: "Conference Paper",
    publisher: "International Publication",
    series: "Camera-Ready Accepted Track",
    title: "A Multimodal, Infrastructure-Free Offline Emergency Communication System for Mobile Devices Using Adaptive Hybrid Mesh Networking",
    authors: "S. S. H. Sajeeb, Md. Yousuf Hossain, S. M. N. Ausaf, M. N. H. Masud, M. F. Rabby, and M. A. Based",
    year: "2026",
    role: "Mesh Routing Protocol Designer",
    summary: "Developed an ad-hoc peer-to-peer relay protocol using Wi-Fi Direct and BLE hops for post-disaster communication without cell towers or satellite link.",
    abstract: "Natural disasters systematically compromise terrestrial telecom infrastructure, causing catastrophic loss of life due to lack of coordination. This research presents an infrastructure-less emergency messaging system deployed over an opportunistic hybrid mesh. The protocol dynamically negotiates between BLE for low-power neighbor discovery and Wi-Fi Direct for rapid bulk payload transmission. Field tests confirm successful message traversal over 7 peer hops under urban obstruction conditions.",
    keywords: ["Hybrid Mesh Networking", "Wi-Fi Direct", "BLE", "Disaster Resilience", "AES-256-GCM"],
    coverImage: "/visuals/paper-mesh-cover.png",
    bibtex: `@article{sajeeb2026emergencymesh,
  author    = {Sajeeb, S. S. H. and Hossain, Md. Yousuf and Ausaf, S. M. N. and Masud, M. N. H. and Rabby, M. F. and Based, M. A.},
  title     = {A Multimodal, Infrastructure-Free Offline Emergency Communication System for Mobile Devices Using Adaptive Hybrid Mesh Networking},
  journal   = {International Journal of Emergency Network Communications},
  year      = {2026}
}`
  },
  {
    id: "pub-5",
    statusBadge: "Camera-Ready Submitted",
    statusType: "cameraready",
    venueType: "Conference Paper",
    publisher: "Security Research Conference",
    series: "Camera-Ready Track",
    title: "Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE): Implementation and Analysis of Security Mechanisms Against Replay Attacks",
    authors: "S. S. H. Sajeeb, Md. Yousuf Hossain, M. S. H. Naim, and M. M. Rahman",
    year: "2026",
    role: "HCE Implementation & Replay Vector Tester",
    summary: "Mitigated MITM and contactless replay vectors using Android HCE with ephemeral tokenized nonce handshakes and elliptic-curve cryptography.",
    abstract: "Near Field Communication (NFC) using Host Card Emulation (HCE) enables smartphones to emulate smart transit cards without requiring physical Secure Element (SE) access. However, contactless transactions are notoriously susceptible to packet replay and relay interception. This work devises an anti-replay protocol combining synchronized nonce tokenization with ephemeral elliptic-curve cryptography (ECC). Performance metrics demonstrate transaction latency within transit gate requirements (mean 82ms) and complete immunity to replay replay packets.",
    keywords: ["Host Card Emulation (HCE)", "NFC Security", "Replay Defense", "AES-256-CBC", "HMAC-SHA256"],
    coverImage: "/visuals/paper-nfc-cover.png",
    bibtex: `@article{sajeeb2026nfcticketing,
  author    = {Sajeeb, S. S. H. and Hossain, Md. Yousuf and Naim, M. S. H. and Rahman, M. M.},
  title     = {Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE): Implementation and Analysis of Security Mechanisms Against Replay Attacks},
  journal   = {Security Research Conference Proceedings},
  year      = {2026}
}`
  }
];

export const categorizedSkills = {
  networking: {
    title: "Networking",
    icon: "Network",
    summary: "Routing, switching, OSI/TCP layers & enterprise packet analysis",
    prominent: [
      "IPv4 / IPv6 VLSM Subnetting",
      "LAN / WAN Architecture",
      "TCP/IP & OSI 7-Layer Model",
      "Router & Switch Configuration",
      "Cisco CCNA (200-301) Track",
      "Wireshark Packet Telemetry",
      "Network Troubleshooting",
      "Cisco Packet Tracer"
    ]
  },
  cybersecurity: {
    title: "Cybersecurity",
    icon: "Shield",
    summary: "Defensive architectures, offensive CTF exploitation & vulnerability analysis",
    prominent: [
      "Capture The Flag (CTF) Challenges",
      "Network Intrusion Detection (IDS)",
      "Zero-Trust Architecture",
      "Vulnerability Assessment Concepts",
      "Device-Bound Cryptography",
      "Web Security Auditing",
      "Digital Forensics Basics",
      "Steganography & Ciphers"
    ]
  },
  systems: {
    title: "Systems",
    icon: "Cpu",
    summary: "Operating systems, virtualization & infrastructure engineering",
    prominent: [
      "Kali Linux (Pen-testing environment)",
      "Ubuntu Server / Desktop",
      "Windows 11 Administration",
      "VirtualBox / Sandboxed VMs",
      "VMware Workstation",
      "Bash Shell Scripting"
    ]
  },
  programming: {
    title: "Programming",
    icon: "Code",
    summary: "System languages, algorithms & back-end development",
    prominent: [
      "Python (Network scripts, AI/ML, automation)",
      "C (Low-level memory & algorithms)",
      "Java (Object-oriented systems & Android)",
      "SQL / PostgreSQL (Relational schemas)",
      "Dart / Flutter (Cross-platform UI)",
      "JavaScript / React 19 (Web systems)"
    ]
  },
  tools: {
    title: "Tools & DevOps",
    icon: "Wrench",
    summary: "Version control, IDEs & developer toolchains",
    prominent: [
      "Git & GitHub Workflows",
      "Cisco Packet Tracer",
      "VS Code",
      "Android Studio",
      "Wireshark",
      "Linux Terminal CLI"
    ]
  }
};

export const achievementsList = [
  {
    badge: "1ST PLACE CHAMPION",
    title: "DIU Intra First CTF 2025",
    year: "2025",
    category: "Competitive Cybersecurity",
    icon: "Trophy",
    color: "from-yellow-400 to-amber-600",
    border: "border-yellow-500/40",
    desc: "Secured 1st place champion in the inaugural intra-university capture-the-flag tournament, solving complex web vulnerabilities, cryptographic ciphers, digital forensics artifacts, and binary reverse engineering.",
    proof: "Verified by DIU CPC & Competition Scoreboard"
  },
  {
    badge: "GLOBAL RANK #72 (TEAM)",
    title: "BCS ICT Fest CTF 2026",
    year: "2026",
    category: "National Championship",
    icon: "Award",
    color: "from-purple-400 to-indigo-600",
    border: "border-purple-500/40",
    desc: "Competed against top universities and national cybersecurity teams across Bangladesh in the premier Bangladesh Computer Society ICT Fest CTF tournament.",
    proof: "Official BCS CTF Standings"
  },
  {
    badge: "GLOBAL RANK #158",
    title: "HiCyberCon CTF 2026",
    year: "2026",
    category: "International CTF",
    icon: "ShieldAlert",
    color: "from-cyan-400 to-blue-600",
    border: "border-cyan-500/40",
    desc: "Achieved global top-tier standing in international red-team competition testing penetration testing, network sniffing, and cryptographic exploit execution.",
    proof: "HiCyberCon International Leaderboard"
  },
  {
    badge: "EXECUTIVE LEADERSHIP",
    title: "General Secretary — DIU CPC",
    year: "2026 – Present",
    category: "Organizational Leadership",
    icon: "Users",
    color: "from-emerald-400 to-teal-600",
    border: "border-emerald-500/40",
    desc: "Elected General Secretary of Dhaka International University Computer Programming Club; organizing programming contests, cybersecurity workshops, and leading developer initiatives.",
    proof: "DIU CPC Executive Board Appointment"
  }
];

export const timelineEvents = [
  {
    period: "Present",
    role: "Support Engineer (Intern)",
    organization: "CodencoIT",
    organizationUrl: "https://codencoit.com/",
    type: "Industry Experience",
    responsibilities: [
      "Currently working as a Support Engineer Intern at CodencoIT."
    ]
  },
  {
    period: "2026 – Present",
    role: "General Secretary",
    organization: "DIU Computer Programming Club (DIU CPC)",
    type: "Executive Leadership",
    responsibilities: [
      "Directing club executive operations, tech symposiums, hackathons, and programming bootcamps.",
      "Mentoring junior CSE students in competitive programming, Linux fundamentals, and cybersecurity.",
      "Liaison between university department heads, alumni networks, and industry sponsors."
    ]
  },
  {
    period: "2025 – 2026",
    role: "Lead Research Collaborator",
    organization: "Independent & Academic Research Group",
    type: "Scientific Research",
    responsibilities: [
      "Co-authored 5 papers, including accepted Taylor & Francis book chapters on zero-trust and audio steganography.",
      "Formulated mathematical models for device-bound key derivation and ad-hoc mesh packet routing.",
      "Performed simulated RF and network traffic stress testing using Wireshark and network analyzers."
    ]
  },
  {
    period: "2025",
    role: "Treasurer & Event Lead",
    organization: "DIU CPC & BASIS Students' Forum",
    type: "Leadership & Finance",
    responsibilities: [
      "Managed fiscal budgets for multi-department technical competitions and workshops.",
      "Organized campus hackathons and student outreach initiatives across CSE batches."
    ]
  },
  {
    period: "2024",
    role: "Lead Organizer — CSE Fest Fall 2024",
    organization: "Department of CSE, Dhaka International University",
    type: "Event Management",
    responsibilities: [
      "Coordinated schedule, team registrations, and technical infrastructure for intra-university project showcases and contests."
    ]
  },
  {
    period: "2024",
    role: "Executive Member",
    organization: "DIU Computer Programming Club",
    type: "Club Operations",
    responsibilities: [
      "Managed social channels, technical content curation, and contest problem curation for junior members."
    ]
  }
];

export const educationData = {
  degree: "B.Sc. in Computer Science and Engineering (CSE)",
  institution: "Dhaka International University (DIU)",
  location: "Dhaka, Bangladesh",
  timeline: "2023 – 2027 (Currently in 7th Semester)",
  hsc: {
    exam: "Higher Secondary Certificate (HSC)",
    gpa: "4.67 / 5.00",
    group: "Science"
  },
  certifications: [
    {
      title: "Cisco Certified Network Associate (CCNA 200-301)",
      status: "In Active Preparation",
      focus: "IPv4/IPv6 VLSM Subnetting, Routing (OSPF/EIGRP), Switching (VLANs/STP), Packet Telemetry via Jeremy's IT Lab"
    },
    {
      title: "IEEE Computer Society Membership",
      status: "Valid Through 2026",
      focus: "IEEE Student Member #Active // International Computing Society"
    }
  ]
};
