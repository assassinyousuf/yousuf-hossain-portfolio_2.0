const initialData = {
  profile: {
    name: "Md. Yousuf Hossain",
    title: "Aspiring Cybersecurity Specialist & App Developer",
    address: "Sayednagar Block-A, Vatara, Badda, Dhaka",
    email: "itsmemehrab369@gmail.com",
    phone: "01629-263618",
    avatar: "yousuf.jpeg",
    social: {
      github: "https://github.com/assassinyousuf",
      linkedin: "https://www.linkedin.com/in/yousuf-hossain-06089a328/",
      facebook: "https://www.facebook.com/yousufhossain.mehrab"
    }
  },
  summary: {
    title: "Professional Summary",
    content: [
      "Aspiring Cybersecurity Specialist and Computer Science undergraduate with a strong foundation in network security and ethical hacking. Proven track record in Capture The Flag (CTF) competitions and hands-on experience with security tools like Hack The Box and TryHackMe.",
      "Passionate about identifying vulnerabilities and researching secure transmission mechanisms. Eager to leverage technical skills in a professional environment to contribute to robust security solutions and innovative research."
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "Flutter (Dart)", "C", "Java", "SQL"]
    },
    {
      category: "Cybersecurity",
      items: ["CTF Basics", "Linux Fundamentals", "Ethical Hacking"]
    },
    {
      category: "Tools & Platforms",
      items: ["Hack The Box", "TryHackMe", "PicoCTF", "Git & GitHub", "VS Code", "Android Studio"]
    }
  ],
  projects: [
    {
      title: "Visiolock: Secure Image Transmission",
      description: "Developed a cross-media secure image transmission system utilizing audio-domain encoding and device-bound cryptography. Focused on enhancing data privacy and security during transmissions through non-traditional communication channels.",
      tags: ["Cryptography", "Data Privacy"]
    },
    {
      title: "Secure NFC: Mobile Ticketing System",
      description: "Investigated NFC-based mobile ticketing frameworks using Host Card Emulation (HCE). Implemented and analyzed security protocols to mitigate Replay Attacks and ensure transactional integrity.",
      tags: ["NFC", "Security Protocols"]
    },
    {
      title: "Sudoku Solver",
      description: "Engineered a Java-based application implementing OOP principles and backtracking algorithms to solve complex Sudoku puzzles. Designed an interactive UI to visualize the step-by-step backtracking process.",
      tags: ["Java", "OOP", "Algorithms"]
    },
    {
      title: "University Database Management System",
      description: "Architected a comprehensive database solution to manage university informatics, including student records, academic cycles, and department logistics. Optimized SQL queries for efficient data handling.",
      tags: ["SQL", "Relational Design"]
    },
    {
      title: "Hostel Management System",
      description: "Developed a C-based management tool for room allocation and student lifecycle tracking in a collaborative group environment.",
      tags: ["C", "Management Systems"]
    }
  ],
  publications: [
    {
      status: "Accepted",
      title: "Secure NFC-Based Mobile Ticketing System Using Host Card Emulation (HCE)",
      description: "Implementation and Analysis of Security Mechanisms Against Replay Attacks."
    },
    {
      status: "Under Review",
      title: "VisioLock: Cross-Media Secure Image Transmission",
      description: "via Audio-Domain Encoding and Device-Bound Cryptography."
    },
    {
      status: "Under Review",
      title: "SafeLink+: A Zero-Trust Mobile Link Execution Framework",
      description: "For Protecting Users from Malicious URLs."
    },
    {
      status: "Under Review",
      title: "A Real-Time Lightweight Intrusion Detection System",
      description: "For Smart City Networks Using Optimized Deep Learning."
    },
    {
      status: "Under Review",
      title: "AI-Driven Real-Time Reading Assessment and Assistance System",
      description: "For Dyslexia Using Speech and Behavioral Analytics."
    },
    {
      status: "Under Review",
      title: "A Multimodal, Infrastructure-Free Offline Emergency Communication System",
      description: "For Mobile Devices Using Adaptive Hybrid Mesh Networking."
    }
  ],
  education: [
    {
      date: "2023 – Present",
      title: "BSc in Computer Science and Engineering",
      description: "Dhaka International University (5th Semester). Expected Graduation: 2027."
    },
    {
      date: "2022",
      title: "Higher Secondary Certificate (HSC)",
      description: "GPA: 4.67 / 5.00"
    }
  ],
  leadership: [
    { role: "Treasurer", org: "DIU Computer Programming Club (DIU CPC)", year: "2025–2026" },
    { role: "Executive Member", org: "BASIS (Bangladesh Association of Software and Information Services)", year: "" },
    { role: "Organizer", org: "CSE Fest Fall 2024", year: "" },
    { role: "Volunteer", org: "3rd BIM 2025", year: "" },
    { role: "Executive Member", org: "DIU CPC", year: "2024–2025" }
  ]
};

// Handle data syncing with localStorage
window.PORTFOLIO_DATA = JSON.parse(localStorage.getItem('portfolio_config')) || initialData;

const saveData = (newData) => {
  localStorage.setItem('portfolio_config', JSON.stringify(newData));
  window.PORTFOLIO_DATA = newData;
  // Trigger re-render if function exists
  if (typeof renderPortfolio === 'function') renderPortfolio();
};
