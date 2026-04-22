const initialData = {
  profile: {
    name: "Md. Yousuf Hossain",
    title: "Aspiring Cybersecurity Specialist & Computer Science Undergraduate",
    address: "Sayednagar Block-A, Vatara, Badda, Dhaka",
    email: "itsmemehrab369@gmail.com",
    phone: "01629-263618",
    avatar: "yousuf.png",
    social: {
      github: "https://github.com/assassinyousuf",
      linkedin: "https://www.linkedin.com/in/md-yousuf-hossain-06089a328/",
      facebook: "https://www.facebook.com/yousufhossain.mehrab"
    }
  },
  summary: {
    title: "Personal Brand & Vision",
    content: [
      "I am a Computer Science and Engineering student at Dhaka International University, currently in my 6th semester, with a strong focus on cybersecurity, application development, and bug bounty practices.",
      "My work revolves around building practical and research-driven solutions. I have contributed to multiple projects spanning intrusion detection systems, secure NFC-based mobile systems, offline emergency communication networks, and zero-trust security frameworks. Several of my research works have been accepted in academic venues, reflecting my strong interest in solving real-world security challenges through innovation.",
      "I am proficient in Python, Flutter (Dart), C, Java, and SQL, and actively use platforms like Hack The Box, TryHackMe, and PicoCTF to sharpen my cybersecurity skills. Alongside research, I build applications ranging from AI-based assistants to secure mobile apps and dynamic web systems.",
      "Beyond technical work, I actively contribute to the tech community. I currently serve as the General Secretary of the DIU Computer Programming Club (DIU CPC), after previously holding roles as Treasurer and Executive Member. I have also led and organized major university-level events, including CSE Fest Fall 2024.",
      "I am particularly interested in the intersection of machine learning and cybersecurity, and I am currently working on an adaptive AI-based firewall system. My long-term goal is to pursue advanced studies in cybersecurity and contribute to the development of intelligent, secure systems."
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "Flutter (Dart)", "C", "Java", "SQL"]
    },
    {
      category: "Cybersecurity & Ethical Hacking",
      items: ["CTF Methodologies", "Linux Administration", "Ethical Hacking Principles", "Network Defensive Security"]
    },
    {
      category: "Tools & Platforms",
      items: ["Hack The Box", "TryHackMe", "PicoCTF", "Git/GitHub", "VS Code", "Android Studio"]
    }
  ],
  projects: [
    {
      title: "Visiolock",
      role: "Dart",
      description: "Engineered cross-media secure image transmission via audio-domain encoding and cryptography.",
      tags: ["Dart", "Cryptography", "Audio-Encoding"]
    },
    {
      title: "Secure NFC",
      role: "Lead Researcher",
      description: "Investigated Host Card Emulation (HCE) for mobile ticketing ecosystems to defend against Replay Attacks.",
      tags: ["NFC", "Security Analytics", "HCE"]
    },
    {
      title: "Intrusion Detection System",
      role: "Researcher",
      description: "Developed a real-time lightweight intrusion detection system utilizing optimized Deep Learning.",
      tags: ["Deep Learning", "Real-Time Systems", "Smart City"]
    },
    {
      title: "Dyslexia Assessment System",
      role: "Researcher",
      description: "Engineered a real-time assessment/assistance system using Speech and Behavioral Analytics.",
      tags: ["AI", "Speech Analytics", "Behavioral Tech"]
    },
    {
      title: "Offline Emergency Comms",
      role: "Researcher",
      description: "Developed an infrastructure-free offline emergency system using adaptive hybrid mesh networking.",
      tags: ["Networking", "Hybrid Mesh", "Infrastructure-free"]
    },
    {
      title: "SafeLink+ Framework",
      role: "Researcher",
      description: "Designed a framework to protect users from malicious URLs via zero-trust execution models.",
      tags: ["Zero-Trust", "Web Security", "URL Protection"]
    },
    {
      title: "Adaptive Firewall AI",
      role: "Python",
      description: "Designed an intelligent firewall system in Python to adaptively detect and mitigate sophisticated network threats.",
      tags: ["Python", "Firewall", "Network Security"]
    },
    {
      title: "DIU CPC Web Portal",
      role: "JavaScript",
      description: "Developed the dynamic web portal for the DIU Computer Programming Club using JavaScript and optimized UI interactions.",
      tags: ["JavaScript", "Web Dev", "UI/UX"]
    },
    {
      title: "Personal Portfolio Website",
      role: "JavaScript",
      description: "Designed and deployed a responsive, modern web portfolio utilizing complex JavaScript and dynamic CSS styling.",
      tags: ["JavaScript", "CSS", "Frontend"]
    },
    {
      title: "SlapApp & Crypto Apps",
      role: "Flutter / Dart",
      description: "Built responsive mobile applications (\"SlapApp\" and \"image-encryption\") focusing on dynamic states and cryptography in Dart.",
      tags: ["Flutter", "Dart", "Cryptography"]
    },
    {
      title: "My Jarvis (AI Assistant)",
      role: "Python",
      description: "Developed a localized, voice-activated AI desktop assistant in Python to automate computational tasks.",
      tags: ["Python", "AI Desktop", "Automation"]
    },
    {
      title: "University Database",
      role: "PostgreSQL",
      description: "Designed a PostgreSQL-backed structure to streamline university informatics and optimize query workloads.",
      tags: ["PostgreSQL", "Database Design", "SQL"]
    }
  ],
  publications: [
    {
      status: "Accepted",
      title: "Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE)",
      description: "Implementation and Analysis of Security Mechanisms Against Replay Attacks."
    },
    {
      status: "Accepted",
      title: "VisioLock: Cross-Media Secure Image Transmission",
      description: "Via Audio-Domain Encoding and Device-Bound Cryptography."
    },
    {
      status: "Accepted",
      title: "A Multimodal, Infrastructure-Free Offline Emergency Communication System",
      description: "For Mobile Devices Using Adaptive Hybrid Mesh Networking."
    },
    {
      status: "Accepted",
      title: "SafeLink+: A Zero-Trust Mobile Link Execution Framework",
      description: "For Protecting Users from Malicious URLs."
    },
    {
      status: "Accepted",
      title: "A Real-Time Lightweight Intrusion Detection System",
      description: "For Smart City Networks Using Optimized Deep Learning."
    },
    {
      status: "Under Review",
      title: "AI-Driven Real-Time Reading Assessment and Assistance System",
      description: "For Dyslexia Using Speech and Behavioral Analytics."
    }
  ],
  education: [
    {
      date: "2023 – Present",
      title: "Bachelor of Science in Computer Science and Engineering (CSE)",
      description: "Dhaka International University, Dhaka, Bangladesh. Expected 2027. Current Status: 6th Semester, 3rd Year. Focused Specialization: Application Development, App Bug Bounty, Cybersecurity."
    },
    {
      date: "2022",
      title: "Higher Secondary Certificate (HSC)",
      description: "GPA: 4.67 / 5.00"
    }
  ],
  leadership: [
    { role: "General Secretary", org: "DIU Computer Programming Club (DIU CPC)", year: "April 2026 – Present" },
    { role: "Treasurer", org: "DIU Computer Programming Club (DIU CPC)", year: "March 2025 – April 2026" },
    { role: "Executive Member", org: "DIU Computer Programming Club (DIU CPC)", year: "2024 – 2025" },
    { role: "Executive Member", org: "BASIS (Bangladesh Association of Software and Information Services)", year: "" },
    { role: "Lead Organizer", org: "CSE Fest Fall 2024", year: "(Coordinated logistics and technical events)" },
    { role: "Volunteer", org: "3rd BIM 2025", year: "" }
  ]
};

// Handle data syncing with localStorage
// Force a refresh of the localStorage to match the new code data
window.PORTFOLIO_DATA = initialData;
localStorage.setItem('portfolio_config', JSON.stringify(initialData));

// Update CV and Avatar for the new assets
window.PORTFOLIO_DATA.profile.avatar = "yousuf.png";
window.PORTFOLIO_DATA.profile.cv = "youusf_cv.pdf";

const saveData = (newData) => {
  localStorage.setItem('portfolio_config', JSON.stringify(newData));
  window.PORTFOLIO_DATA = newData;
  if (typeof renderPortfolio === 'function') renderPortfolio();
};
