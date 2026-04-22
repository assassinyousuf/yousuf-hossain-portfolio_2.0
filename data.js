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
      title: "Visiolock: Secure Image Transmission",
      role: "Developer & Researcher",
      description: "Engineered cross-media secure image transmission via audio-domain encoding and device-bound cryptography. Focused on data privacy in non-traditional channels.",
      tags: ["Dart", "Cryptography", "Audio-Encoding"],
      link: "https://github.com/assassinyousuf/visiolock"
    },
    {
      title: "Secure NFC: Mobile Ticketing",
      role: "Lead Researcher",
      description: "Investigated NFC frameworks using HCE. Implemented security protocols to mitigate Replay Attacks and ensure transactional integrity.",
      tags: ["NFC", "Security", "HCE"],
      link: "https://github.com/assassinyousuf/secure-nfc"
    },
    {
      title: "Sudoku Solver",
      role: "Java Developer",
      description: "Engineered a Java application using OOP principles and backtracking algorithms to solve complex puzzles with a step-by-step visualization UI.",
      tags: ["Java", "Algorithms", "Swing"],
      link: "https://github.com/assassinyousuf/sudoku-solver"
    },
    {
      title: "University Database Management",
      role: "Database Architect",
      description: "Architected a comprehensive solution for university informatics, records, and logistics. Optimized SQL queries for efficient relational management.",
      tags: ["PostgreSQL", "SQL", "Database Design"],
      link: "https://github.com/assassinyousuf/university-db"
    },
    {
      title: "Hostel Management System",
      role: "Coder & Planner",
      description: "Developed a C-based tool for room allocation and student lifecycle tracking in a collaborative environment.",
      tags: ["C", "System Dev", "Project Planning"],
      link: "https://github.com/assassinyousuf/hostel-management"
    },
    {
      title: "Adaptive Firewall AI",
      role: "Python Developer",
      description: "Designed an intelligent firewall system in Python to adaptively detect and mitigate sophisticated network threats using ML concepts.",
      tags: ["Python", "Network Security", "AI"],
      link: "https://github.com/assassinyousuf/adaptive-firewall"
    },
    {
      title: "DIU CPC Web Portal",
      role: "Frontend Lead",
      description: "Developed the dynamic web portal for the DIU Computer Programming Club with optimized UI interactions and member management.",
      tags: ["JavaScript", "Web Dev", "UI/UX"],
      link: "https://github.com/assassinyousuf/diu-cpc-portal"
    },
    {
      title: "Immersive 3D Portfolio",
      role: "Creator",
      description: "A high-performance full-screen immersive portfolio with 3D starfield, scroll-snapping, and real-time data integration.",
      tags: ["Three.js", "JavaScript", "GLSL"],
      link: "https://github.com/assassinyousuf/yousuf-hossain-portfolio_2.0"
    },
    {
      title: "SlapApp & Crypto Apps",
      role: "Flutter Developer",
      description: "Built responsive mobile applications focusing on dynamic states and cryptography in Dart.",
      tags: ["Flutter", "Dart", "Security"],
      link: "https://github.com/assassinyousuf/slap-app"
    },
    {
      title: "My Jarvis (AI Assistant)",
      role: "Python Developer",
      description: "Developed a localized, voice-activated AI desktop assistant in Python to automate computational tasks and system controls.",
      tags: ["Python", "Automation", "AI"],
      link: "https://github.com/assassinyousuf/jarvis"
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
