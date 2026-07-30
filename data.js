const initialData = {
  profile: {
    name: "Md. Yousuf Hossain",
    title: "Computer Science and Engineering Student | Networking & Cybersecurity Enthusiast",
    address: "Sayednagar Block-A, Vatara, Badda, Dhaka",
    email: "itsmemehrab369@gmail.com",
    phone: "01629263618",
    avatar: "yousuf.png",
    social: {
      github: "https://github.com/assassinyousuf",
      linkedin: "https://www.linkedin.com/in/mdyousufhossainmehrab/",
      website: "https://yousuf.surf"
    }
  },
  summary: {
    title: "Professional Summary",
    content: [
      "Computer Science and Engineering student at Dhaka International University with a strong interest in networking, cybersecurity, Linux systems, and IT infrastructure. Currently in the 6th semester and actively preparing for the Cisco CCNA certification through Jeremy's IT Lab.",
      "Passionate about learning network technologies, troubleshooting, and system administration. Hands-on experience with Python, Java, C, SQL, Git, Linux, and Flutter, developing software applications and conducting cybersecurity and networking research.",
      "Quick learner with strong analytical, problem-solving, and teamwork skills, seeking practical experience through an IT Networking Internship."
    ]
  },
  skills: [
    {
      category: "Programming",
      items: ["Python", "Java", "C", "SQL", "Dart (Flutter)"]
    },
    {
      category: "Networking (Learning)",
      items: ["Basic Networking Concepts", "LAN & WAN Fundamentals", "IPv4 Addressing", "Wi-Fi Networking", "OSI Model", "TCP/IP Fundamentals", "Router & Switch Basics", "Network Troubleshooting"]
    },
    {
      category: "Operating Systems",
      items: ["Linux (Ubuntu/Kali)", "Windows 10/11"]
    },
    {
      category: "Cybersecurity",
      items: ["Capture The Flag (CTF)"]
    },
    {
      category: "Tools",
      items: ["Git & GitHub", "VS Code", "Android Studio", "Microsoft Office", "VMware", "VirtualBox", "Cisco Packet Tracer", "ChatGPT", "Google Gemini"]
    },
    {
      category: "Currently Learning",
      items: ["Cisco CCNA (Jeremy's IT Lab)", "Cisco CCNA (200-301)", "Linux System Administration", "Network Troubleshooting"]
    },
    {
      category: "Soft Skills",
      items: ["Problem Solving", "Analytical Thinking", "Team Collaboration", "Communication", "Fast Learner", "Adaptability", "Time Management"]
    },
    {
      category: "Relevant Coursework",
      items: ["Computer Networks", "Operating Systems", "Data Structures & Algorithms", "Database Systems", "Microprocessor & Assembly Language"]
    }
  ],
  projects: [
    {
      title: "Adaptive Firewall AI",
      role: "Python",
      description: "Designed an intelligent firewall system in Python for adaptive detection and mitigation of network threats.",
      tags: ["Python", "Network Security", "AI"],
      link: "https://github.com/assassinyousuf"
    },
    {
      title: "Offline Emergency Comms",
      role: "Networking",
      description: "Designed an infrastructure-free communication system using adaptive hybrid mesh networking.",
      tags: ["Networking", "Mesh Networks"],
      link: "https://github.com/assassinyousuf"
    },
    {
      title: "DIU CPC Web Portal",
      role: "JavaScript",
      description: "Developed the official club website using JavaScript.",
      tags: ["JavaScript", "Web Dev"],
      link: "https://github.com/assassinyousuf"
    },
    {
      title: "My Jarvis",
      role: "Python",
      description: "Built a Python-based voice-controlled desktop assistant.",
      tags: ["Python", "Automation"],
      link: "https://github.com/assassinyousuf"
    },
    {
      title: "University Database",
      role: "PostgreSQL",
      description: "Designed a PostgreSQL database system for university management.",
      tags: ["PostgreSQL", "Database Design"],
      link: "https://github.com/assassinyousuf"
    },
    {
      title: "Flutter Applications",
      role: "Flutter/Dart",
      description: "Developed mobile applications using Flutter and Dart, including encryption-focused applications.",
      tags: ["Flutter", "Dart", "Mobile Dev"],
      link: "https://github.com/assassinyousuf"
    }
  ],
  publications: [
    {
      title: "SafeLink+: A Zero-Trust Mobile Link Execution Framework for Protecting Users from Malicious URLs",
      authors: "Sarkar Sifatullah Haque Sajeeb, Md. Yousuf Hossain, Md. Ifram Dewan, Md. Nazmul Huda Masud, Muhammad Tarik Akhter, and Md. Mahabubur Rahman",
      venue: "Taylor and Francis Book Chapter, Camera Ready",
      abstract: "Mobile phishing attacks often succeed because users lack actionable explanations when tapping links. This chapter presents SafeLink+, a zero-trust mobile link execution framework that intercepts URLs and executes them in an ephemeral in-app WebView sandbox for behavior analysis before navigation. SafeLink+ monitors redirect chains and domain changes while injecting JavaScript probes to detect phishing indicators. A heuristic risk engine then generates transparent, human-readable risk reports. We implement SafeLink+ as a Flutter application and evaluate it on 300 URLs, achieving precision 0.861 and recall 0.747 at the HIGH-risk threshold. Results show that SafeLink+ outperforms keyword-only baselines and performs comparably to ML classifiers while remaining fully interpretable. We address evaluation limitations with a structured threats-to-validity analysis and an adaptive ML integration roadmap.",
      bibtex: `@incollection{sajeeb2025safelink,
  title={SafeLink+: A Zero-Trust Mobile Link Execution Framework for Protecting Users from Malicious URLs},
  author={Sajeeb, Sarkar Sifatullah Haque and Hossain, Md. Yousuf and Dewan, Md. Ifram and Masud, Md. Nazmul Huda and Akhter, Muhammad Tarik and Rahman, Md. Mahabubur},
  booktitle={Taylor and Francis Book Chapter},
  year={2025}
}`
    },
    {
      title: "A Multimodal, Infrastructure-Free Offline Emergency Communication System for Mobile Devices Using Adaptive Hybrid Mesh Networking",
      authors: "Sarkar Sifatullah Haque Sajeeb, Md. Yousuf Hossain, S M Nabil Ausaf, Md. Nazmul Huda Masud, Md. Fazlay Rabby, and Md. Abdul Based",
      venue: "Camera Ready",
      abstract: "Communication infrastructure often fails exactly when disasters create peak demand. We present GetConnect, an infrastructure-free emergency communication system that enables text and voice messaging on smartphones without cellular or Internet access. The system combines Bluetooth Low Energy for energy-efficient peer discovery, Wi-Fi Direct for higher-throughput transfer, and store-and-forward multi-hop routing. Implemented in Flutter, it supports Android and iOS and secures payloads with AES-256-GCM. We further formalize an adaptive routing metric that jointly optimizes hop distance, link quality, and relay battery state. Physical experiments on 25 devices show 93.2% text delivery, 90.7% voice delivery, 1.8 s median two-hop latency, and 42 mAh/hr idle draw (approximately 24-hour operation on a 2500 mAh battery). To address scale, we run controlled trace-driven emulation up to 250 nodes under identical conditions for GetConnect, AODV, and OLSR. At 250 nodes, GetConnect reaches 92.6% packet delivery ratio, outperforming AODV (84.7%) and OLSR (81.9%) with lower energy per delivered message. These results indicate practical feasibility and improved robustness for large-scale emergency communication scenarios.",
      bibtex: `@article{sajeeb2025getconnect,
  title={A Multimodal, Infrastructure-Free Offline Emergency Communication System for Mobile Devices Using Adaptive Hybrid Mesh Networking},
  author={Sajeeb, Sarkar Sifatullah Haque and Hossain, Md. Yousuf and Ausaf, S M Nabil and Masud, Md. Nazmul Huda and Rabby, Md. Fazlay and Based, Md. Abdul},
  year={2025}
}`
    },
    {
      title: "A Real-Time Lightweight Intrusion Detection System for Smart City Networks Using Optimized Deep Learning",
      authors: "S M Nabil Ausaf, Md. Yousuf Hossain, Md. Alnoman Robin Mrida, Md Mosfiqur Rahman, Israt Zaman, Md. Shakil Sarker, and Md. Abdul Based",
      venue: "Taylor and Francis Book Chapter, Camera Ready",
      abstract: "Smart city networks are based on the interconnected Internet of Things (IoT) devices, cloud infrastructures, and the real-time communication systems. They are used to facilitate important services like intelligent transportation, intelligent surveillance, healthcare monitoring, and energy management. Nevertheless, due to the increasing complexity and size of smart city infrastructures, they are very susceptible to cyber threats, such as Distributed Denial-of-Service (DDoS), the spread of botnets, deception, and malicious intrusions. Conventional intrusion detection system (IDS) can not satisfy the smart city requirements because of high cost of computing, slow reaction time, and poor scalability. In this paper, a real-time and lightweight intrusion detector is suggested based on the smart city network grounded on an optimized deep learning model. The suggested solution would combine the feature reduction plans and effective neural networks like 1D-CNN and CNN-GRU in order to achieve high detection rates and low latency and less resource usage. Benchmark intrusion datasets of CIC-IDS2017, CIC-DDoS2019, TON-IoT, and UNSW-NB15 are used to conduct experiments. Findings indicate that, the proposed lightweight IDS is capable of attaining competitive detection performance and still is appropriate to be deployed on edge-based smart city gateways.",
      bibtex: `@incollection{ausaf2025smartcityids,
  title={A Real-Time Lightweight Intrusion Detection System for Smart City Networks Using Optimized Deep Learning},
  author={Ausaf, S M Nabil and Hossain, Md. Yousuf and Mrida, Md. Alnoman Robin and Rahman, Md Mosfiqur and Zaman, Israt and Sarker, Md. Shakil and Based, Md. Abdul},
  booktitle={Taylor and Francis Book Chapter},
  year={2025}
}`
    },
    {
      title: "Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE): Implementation and Analysis of Security Mechanisms Against Replay Attacks",
      authors: "Sarkar Sifatullah Haque Sajeeb, Md. Yousuf Hossain, Md. Shihab Hassan Naim, and Md. Mahabubur Rahman",
      venue: "Camera Ready",
      abstract: "Near Field Communication (NFC) technology has revolutionized contactless payment and ticketing systems, offering convenience and speed. However, security vulnerabilities, particularly replay attacks and unauthorized data access, pose significant threats to NFC-based mobile ticketing systems. This paper presents a secure mobile ticketing system leveraging Host Card Emulation (HCE) on Android devices with a multi-layered security framework incorporating AES-256-CBC encryption with random initialization vectors, SHA-256 hash-based message authentication codes, and timestamp-based replay attack prevention using a 60-second validity window with session timeout management. Performance evaluation across 38 Android devices (API 21-34) demonstrates 100% HCE functionality, 97.8% write success rate, and 100% replay attack detection effectiveness with transaction times of 4.7s for writes and 3.9s for reads, with minimal encryption overhead (6.6ms).",
      bibtex: `@article{sajeeb2025nfc,
  title={Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE): Implementation and Analysis of Security Mechanisms Against Replay Attacks},
  author={Sajeeb, Sarkar Sifatullah Haque and Hossain, Md. Yousuf and Naim, Md. Shihab Hassan and Rahman, Md. Mahabubur},
  year={2025}
}`
    },
    {
      title: "VisioLock: Cross-Media Secure Image Transmission via Audio-Domain Encoding and Device-Bound Cryptography",
      authors: "Md. Yousuf Hossain, Sarkar Sifatullah Haque Sajeeb, S M Nabil Ausaf, Md Mosfiqur Rahman, Nur Hamim Saharaz, and Md. Abdul Based",
      venue: "Taylor and Francis Book Chapter, Camera Ready",
      abstract: "Conventional image encryption preserves file-format metadata, leaving encrypted payloads identifiable by content-filtering pipelines and forensic tools. We present VisioLock, a cross-media secure transmission framework that transforms encrypted image data into noise-resembling audio signals. The system introduces SAIC-ACT, a three-layer encryption pipeline combining chaotic byte permutation, adaptive bit-level diffusion with ciphertext chaining, and noise-aware binary shaping (NABS) optimized for frequency-shift keying (FSK) demodulation. Payloads are protected by Reed–Solomon RS(255, 239) with triple repetition (code rate ≈ 0.31) and modulated via binary FSK (f0 = 1500 Hz, f1 = 3000 Hz) at 8 kHz with 2 ms symbol duration. Device-bound key derivation fuses biometric authentication with hardware-anchored secrets, while a cross-device passphrase mode provides interoperability. Evaluation across 50 test images demonstrates near-ideal entropy (H ≥ 7.992 bits/byte), histogram uniformity (χ2 = 248.3, p = 0.53), negligible ciphertext correlation (ρ ≈ 0.021), strong key sensitivity (NPCR > 99.6%, UACI ≈ 33.4%), and noise resilience (BER < 0.05 at SNR = 10 dB). VisioLock is implemented as a production-grade Flutter/Android application and deployed on 200+ devices.",
      bibtex: `@incollection{hossain2025visiolock,
  title={VisioLock: Cross-Media Secure Image Transmission via Audio-Domain Encoding and Device-Bound Cryptography},
  author={Hossain, Md. Yousuf and Sajeeb, Sarkar Sifatullah Haque and Ausaf, S M Nabil and Rahman, Md Mosfiqur and Saharaz, Nur Hamim and Based, Md. Abdul},
  booktitle={Taylor and Francis Book Chapter},
  year={2025}
}`
    }
  ],
  education: [
    {
      date: "2023 – Present",
      title: "Bachelor of Science in Computer Science and Engineering (CSE)",
      description: "Dhaka International University, Dhaka, Bangladesh. Expected 2027. Current Status: 6th Semester."
    },
    {
      date: "2022",
      title: "Higher Secondary Certificate (HSC)",
      description: "GPA: 4.67 / 5.00"
    }
  ],
  leadership: [
    { role: "General Secretary", org: "DIU Computer Programming Club (DIU CPC)", year: "2026 – Present" },
    { role: "Treasurer", org: "DIU Computer Programming Club (DIU CPC)", year: "2025 – 2026" },
    { role: "Executive Member", org: "DIU Computer Programming Club (DIU CPC)", year: "2024 – 2025" },
    { role: "Executive Member", org: "BASIS Students' Forum", year: "" },
    { role: "Volunteer", org: "3rd International Conference on Big Data, IoT & Machine Learning (BIM 2025)", year: "" },
    { role: "Lead Organizer", org: "CSE Fest Fall 2024", year: "" }
  ],
  affiliations: [
    { role: "Student Member", org: "IEEE (Institute of Electrical and Electronics Engineers)", year: "Valid through 2026" },
    { role: "Member", org: "IEEE Computer Society (CS)", year: "Valid through 2026" }
  ]
};

// Handle data syncing with localStorage
// Force a refresh of the localStorage to match the new code data
window.PORTFOLIO_DATA = initialData;
localStorage.setItem('portfolio_config', JSON.stringify(initialData));

// Update CV and Avatar for the new assets
window.PORTFOLIO_DATA.profile.avatar = "yousuf.png";
window.PORTFOLIO_DATA.profile.cv = "documents/Md. Yousuf Hossain CV.pdf"; 

const saveData = (newData) => {
  localStorage.setItem('portfolio_config', JSON.stringify(newData));
  window.PORTFOLIO_DATA = newData;
  if (typeof renderPortfolio === 'function') renderPortfolio();
};
