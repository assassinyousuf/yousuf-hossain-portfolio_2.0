export const personalInfo = {
  name: "Md. Yousuf Hossain",
  alias: "Mehrab",
  handle: "assassinyousuf",
  title: "Cybersecurity & Network Systems Researcher",
  subtitle: "General Secretary @ DIU CPC | IEEE CS Member | CTF Champion",
  location: "Dhaka, Bangladesh",
  email: "itsmemehrab369@gmail.com",
  phone: "+880 1629 263618",
  website: "https://yousuf.surf",
  github: "https://github.com/assassinyousuf",
  linkedin: "https://www.linkedin.com/in/mdyousufhossainmehrab/",
  cvUrl: "/Md__Yousuf_Hossain_CV.pdf",
  bio: "Computer Science & Engineering scholar specializing in infrastructure-free mesh networks, zero-trust mobile execution security, and real-time deep learning intrusion detection. Proven research track record with multiple published Taylor & Francis book chapters and top-tier national CTF titles.",
  education: {
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Dhaka International University",
    status: "7th Semester (Expected 2027)",
    hscGpa: "4.67 / 5.00"
  }
};

export const stats = [
  { label: "Research Publications", value: "5", suffix: " Papers" },
  { label: "CTF Competition Titles", value: "Champion", suffix: " + Global Ranks" },
  { label: "Leadership Role", value: "Gen. Secretary", suffix: " DIU CPC" },
  { label: "Certification Prep", value: "Cisco CCNA", suffix: " 200-301" }
];

export const publications = [
  {
    id: "p1",
    tag: "BOOK CHAPTER • CAMERA READY",
    publisher: "Taylor & Francis",
    title: "VisioLock: Cross-Media Secure Image Transmission via Audio-Domain Encoding and Device-Bound Cryptography",
    authors: "Md. Yousuf Hossain, S. S. H. Sajeeb, S. M. N. Ausaf, M. M. Rahman, N. H. Saharaz, and M. A. Based",
    year: "2026",
    summary: "Architected a dual-layer steganographic and cryptographic framework that transforms visual payload into acoustic frequencies with hardware-fingerprinted key derivation.",
    topics: ["Cross-Media Steganography", "Device-Bound Crypto", "Audio-Domain Encoding", "Information Security"]
  },
  {
    id: "p2",
    tag: "BOOK CHAPTER • CAMERA READY",
    publisher: "Taylor & Francis",
    title: "SafeLink+: A Zero-Trust Mobile Link Execution Framework for Protecting Users from Malicious URLs",
    authors: "S. S. H. Sajeeb, Md. Yousuf Hossain, M. I. Dewan, M. N. H. Masud, M. T. Akhter, and M. M. Rahman",
    year: "2026",
    summary: "A preemptive zero-trust browser execution engine that sandboxes unknown URIs through containerized behavioral inspection before client-side dispatch.",
    topics: ["Zero-Trust Architecture", "Malware Defense", "Mobile Link Sandboxing", "Behavioral Analysis"]
  },
  {
    id: "p3",
    tag: "BOOK CHAPTER • CAMERA READY",
    publisher: "Taylor & Francis",
    title: "A Real-Time Lightweight Intrusion Detection System for Smart City Networks Using Optimized Deep Learning",
    authors: "S. M. N. Ausaf, Md. Yousuf Hossain, M. A. R. Mrida, M. M. Rahman, I. Zaman, M. S. Sarker, and M. A. Based",
    year: "2026",
    summary: "Engineered an edge-deployable compact neural IDS optimizing latency and memory for municipal IoT sensors with 99.2% malicious packet classification accuracy.",
    topics: ["Edge AI IDS", "Deep Learning", "Smart City IoT", "Packet Telemetry"]
  },
  {
    id: "p4",
    tag: "RESEARCH PAPER • CAMERA READY",
    publisher: "International Publication",
    title: "A Multimodal, Infrastructure-Free Offline Emergency Communication System for Mobile Devices Using Adaptive Hybrid Mesh Networking",
    authors: "S. S. H. Sajeeb, Md. Yousuf Hossain, S. M. N. Ausaf, M. N. H. Masud, M. F. Rabby, and M. A. Based",
    year: "2026",
    summary: "Developed an ad-hoc peer-to-peer relay protocol using Wi-Fi Direct and BLE hops for post-disaster communication without cell towers or satellite link.",
    topics: ["Hybrid Mesh Networking", "Wi-Fi Direct / BLE", "Disaster Resilience", "Ad-hoc Routing"]
  },
  {
    id: "p5",
    tag: "RESEARCH PAPER • CAMERA READY",
    publisher: "Security Research",
    title: "Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE): Implementation and Analysis of Security Mechanisms Against Replay Attacks",
    authors: "S. S. H. Sajeeb, Md. Yousuf Hossain, M. S. H. Naim, and M. M. Rahman",
    year: "2026",
    summary: "Mitigated MITM and contactless replay vectors using Android HCE with ephemeral tokenized nonce handshakes and elliptic-curve cryptography.",
    topics: ["Host Card Emulation (HCE)", "NFC Security", "Replay Defense", "Tokenization"]
  }
];

export const achievements = [
  {
    title: "Champion — DIU Intra First CTF",
    year: "2025",
    category: "Cybersecurity Championship",
    description: "Secured 1st place solving complex binary exploitation, web vulnerabilities, digital forensics, and cryptographic challenges."
  },
  {
    title: "Global Rank #72 (Team)",
    year: "2026",
    category: "BCS ICT Fest CTF",
    description: "Competed internationally in Bangladesh Computer Society's premier national capture-the-flag tournament."
  },
  {
    title: "Global Rank #158",
    year: "2026",
    category: "HiCyberCon CTF",
    description: "Ranked among top global cybersecurity researchers in red-teaming and reverse engineering challenges."
  }
];

export const projects = [
  {
    title: "Offline Emergency Comms System",
    category: "Ad-hoc Mesh Network",
    tech: ["Python", "Wi-Fi Direct", "BLE", "Mesh Protocols"],
    description: "Engineered an infrastructure-independent peer-to-peer messaging mesh for emergency and disaster response zones.",
    status: "Published Research Prototype",
    github: "https://github.com/assassinyousuf"
  },
  {
    title: "DIU CPC Web Portal",
    category: "Club Production Platform",
    tech: ["JavaScript", "HTML5/CSS3", "Git"],
    description: "Official interactive web portal for Dhaka International University Computer Programming Club managing events and registrations.",
    status: "Live Production",
    github: "https://github.com/assassinyousuf/cpc_website"
  },
  {
    title: "My Jarvis Voice Assistant",
    category: "Desktop Automation AI",
    tech: ["Python", "Speech Recognition", "Automation"],
    description: "Voice-activated desktop system assistant for automated workflow execution, system telemetry, and voice-command operations.",
    status: "Open Source",
    github: "https://github.com/assassinyousuf/my_jarvis"
  },
  {
    title: "University Database Management System",
    category: "Relational Architecture",
    tech: ["PostgreSQL", "SQL", "Database Design"],
    description: "Complete relational database architecture managing academic transcripts, student enrollment, faculty, and departments.",
    status: "Completed",
    github: "https://github.com/assassinyousuf/University_database"
  }
];

export const skills = {
  networking: [
    "Cisco CCNA (200-301)",
    "OSI & TCP/IP Model",
    "IPv4 / IPv6 Subnetting",
    "LAN / WAN Architecture",
    "Router & Switch Config",
    "Packet Tracer",
    "Wireshark Packet Analysis"
  ],
  security: [
    "Capture The Flag (CTF)",
    "Network Intrusion Detection",
    "Kali Linux Tooling",
    "Zero-Trust Protocols",
    "Reverse Engineering Basics",
    "Device-Bound Cryptography"
  ],
  development: [
    "Python",
    "Java",
    "C",
    "SQL / PostgreSQL",
    "Dart / Flutter",
    "JavaScript / React",
    "Git & GitHub Workflows"
  ],
  infrastructure: [
    "Linux (Kali, Ubuntu)",
    "Windows 11 Systems",
    "VirtualBox / Hypervisors",
    "Android Studio",
    "VS Code"
  ]
};

export const leadership = [
  {
    role: "General Secretary",
    org: "DIU Computer Programming Club (DIU CPC)",
    period: "2026 – Present",
    desc: "Directing technical workshops, hackathons, programming contests, and executive affairs for university developers."
  },
  {
    role: "Student Member",
    org: "IEEE & IEEE Computer Society (CS)",
    period: "Valid 2026",
    desc: "Active member contributing to international computing research, conferences, and student chapters."
  },
  {
    role: "Lead Organizer",
    org: "CSE Fest Fall 2024",
    period: "2024",
    desc: "Led coordination for technical symposium, project showcases, and student competitive programming contests."
  },
  {
    role: "Treasurer & Executive Member",
    org: "DIU CPC & BASIS Students' Forum",
    period: "2024 – 2026",
    desc: "Managed club logistics, sponsor relations, and university tech outreach initiatives."
  }
];
