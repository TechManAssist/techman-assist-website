/* ==========================================================================
   CONFIG & STATE MANAGEMENT
   ========================================================================== */
const CONTACT_CONFIG = {
    phone: "+16418191430",
    email: "techmanassist1@outlook.com",
    whatsappBase: "https://wa.me/16418191430"
};

/* ==========================================================================
   EMAILJS CONFIG — Replace placeholders with your EmailJS credentials
   Sign up free at: https://www.emailjs.com
   ========================================================================== */
const EMAILJS_CONFIG = {
    publicKey:   "VAbHRFo64xDc0qJhZ",
    serviceId:   "service_g4m3415",
    templateId:  "template_lb7wm88"
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }
})();

// State Variables
let currentDomain = "SDE";
let currentSetupStep = 1;

/* ==========================================================================
   EXPORTS ROSTER DATA
   ========================================================================== */
const DEFAULT_EXPERT_DATA = {
    "SDE": [
        { name: "Rohan Sharma", role: "Software Engineer III", company: "Former Microsoft", tech: ["React", "Node.js", "C++", "System Design"] },
        { name: "Advait", role: "Senior Developer", company: "Former Netflix", tech: ["Java", "Distributed Systems", "Go"] },
        { name: "Vikram Malhotra", role: "Staff Engineer", company: "Former Amazon", tech: ["Python", "AWS", "DynamoDB", "API Design"] },
        { name: "Kabir Roy", role: "Mobile Engineer", company: "Former Meta", tech: ["React Native", "TypeScript", "GraphQL"] },
        { name: "Aravind Nair", role: "Backend Architect", company: "Former Uber", tech: ["Go", "Kafka", "Redis", "gRPC"] }
    ],
    "Backend": [
        { name: "Srinivas Rao", role: "Lead Engineer", company: "Former Oracle", tech: ["Java", "Spring Boot", "Microservices", "SQL"] },
        { name: "Madhavan Pillai", role: "Principal Dev", company: "Former Walmart Labs", tech: ["Scala", "Hadoop", "Spark", "Kafka"] },
        { name: "Alok Mishra", role: "Backend Developer", company: "Former Microsoft", tech: ["C#", ".NET Core", "Azure SQL", "WCF"] },
        { name: "Hari Krishnan", role: "SDE-2", company: "Former Flipkart", tech: ["Node.js", "PostgreSQL", "Redis", "Express"] },
        { name: "Riya Shah", role: "Kubernetes Expert", company: "Former Zomato", tech: ["Go", "Docker", "Kubernetes", "CI/CD"] },
        { name: "Yash Verma", role: "Senior Developer", company: "Former Swiggy", tech: ["Python", "Django", "FastAPI", "MongoDB"] }
    ],
    "Frontend": [
        { name: "Simran Kapoor", role: "Frontend Lead", company: "Former Atlassian", tech: ["React", "Webpack", "Design Systems", "Redux"] },
        { name: "Varun Saxena", role: "UI Engineer", company: "Former Adobe", tech: ["Vue.js", "Nuxt.js", "Tailwind CSS", "Vite"] },
        { name: "Megha Das", role: "Senior Web Developer", company: "Former Myntra", tech: ["Angular", "RxJS", "SASS", "TypeScript"] },
        { name: "Kunal Joshi", role: "Web Integrator", company: "Former Shopify", tech: ["HTML5", "CSS3", "JavaScript", "Liquid"] }
    ],
    "Mobile": [
        { name: "Dev Patel", role: "iOS Specialist", company: "Former PhonePe", tech: ["Swift", "SwiftUI", "iOS SDK", "Objective-C"] },
        { name: "Shreya Iyer", role: "Android Lead", company: "Former Freshworks", tech: ["Kotlin", "Android Jetpack", "Java", "Coroutines"] },
        { name: "Rajveer Singh", role: "Cross-Platform Dev", company: "Former Paytm", tech: ["Flutter", "Dart", "Firebase", "State Management"] },
        { name: "Anjali Menon", role: "Mobile Architect", company: "Former Ola", tech: ["React Native", "JavaScript", "Objective-C", "Android Studio"] }
    ],
    "QA": [
        { name: "Vijay Gupta", role: "SDET Manager", company: "Former Infosys", tech: ["Selenium", "Java", "TestNG", "Maven"] },
        { name: "Sunita Deshmukh", role: "QA Architect", company: "Former TCS", tech: ["Playwright", "JavaScript", "CI/CD", "Jest"] },
        { name: "Pankaj Tiwari", role: "Mobile Tester", company: "Former Wipro", tech: ["Appium", "Mobile QA", "JMeter", "API Testing"] }
    ],
    "DE": [
        { name: "Amanpreet Singh", role: "Data Engineer III", company: "Former Goldman Sachs", tech: ["PySpark", "Hadoop", "Airflow", "Redshift"] },
        { name: "Neil", role: "Analytics Lead", company: "Former Stripe", tech: ["Snowflake", "SQL", "DBT", "Python"] },
        { name: "Preeti Nair", role: "Big Data Architect", company: "Former Flipkart", tech: ["Scala", "Spark Streaming", "Hive", "Kafka"] }
    ],
    "DevOps": [
        { name: "Ishaan", role: "DevOps Engineer", company: "Former Zepto", tech: ["Terraform", "AWS", "Kubernetes", "Helm"] },
        { name: "Tarun Sharma", role: "CI/CD Specialist", company: "Former Razorpay", tech: ["Docker", "Jenkins", "Ansible", "Linux Shell"] },
        { name: "Kavya Reddy", role: "SRE", company: "Former Swiggy", tech: ["Prometheus", "Grafana", "Linux Systems", "Nginx"] }
    ],
    "AI/ML": [
        { name: "Divya Agarwal", role: "ML Researcher", company: "Former Amazon", tech: ["Python", "PyTorch", "Scikit-Learn", "NLP"] },
        { name: "Pranav Chauhan", role: "AI Engineer", company: "Former Google", tech: ["TensorFlow", "Keras", "Deep Learning", "CNN"] },
        { name: "Ishan Malhotra", role: "Computer Vision Dev", company: "Former Nvidia", tech: ["CUDA", "OpenCV", "C++", "PyTorch"] }
    ],
    "ERP": [
        { name: "Ramesh Pandey", role: "SAP Lead", company: "Former Deloitte", tech: ["SAP ABAP", "ERP Modules", "SAP HANA"] },
        { name: "Smita Bhat", role: "Salesforce Architect", company: "Former Accenture", tech: ["Salesforce APEX", "LWC", "Visualforce"] },
        { name: "Ashish Dubey", role: "Integration Lead", company: "Former Cognizant", tech: ["Workday HCM", "EIB", "Core Connectors"] },
        { name: "Ananya Kulkarni", role: "ERP Consultant", company: "Former EY", tech: ["Oracle Fusion", "Financials Cloud", "SQL"] }
    ],
    "Security": [
        { name: "Sandeep Thakur", role: "SecOps Specialist", company: "Former PwC", tech: ["Penetration Testing", "OWASP Top 10", "Kali Linux"] },
        { name: "Nupur Jain", role: "GRC Lead Auditor", company: "Former KPMG", tech: ["ISO 27001", "Risk Assessment", "SOC2 Compliance"] }
    ]
};
let EXPERT_DATA = null;
let PRICING_DATA = null;

const DEFAULT_SKILLS_DATA = {
    "SDE": ["Java", "Python", "React", "Angular", "Node.js", "AWS", "Android", "iOS", "Flutter", ".NET", "Go", "PHP", "Selenium", "Salesforce", "SAP", "Kubernetes", "Docker", "Terraform", "Tableau", "Power BI", "Django", "Spring Boot", "Vue.js", "Next.js", "TypeScript", "MongoDB", "PostgreSQL", "Redis", "Kafka", "Spark"],
    "Backend": ["Java", "Spring Boot", "Microservices", "Go", "Node.js", "Python", "Django", "FastAPI", "Express", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "GCP", "REST API", "GraphQL", "gRPC", "Kafka", "RabbitMQ"],
    "Frontend": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Angular", "Vue.js", "Next.js", "Svelte", "Tailwind CSS", "Bootstrap", "Webpack", "Vite", "Redux", "GraphQL", "Jest", "Cypress"],
    "Mobile": ["iOS", "Swift", "SwiftUI", "Android", "Kotlin", "Java", "Flutter", "React Native", "Dart", "Objective-C", "Xcode", "Android Studio"],
    "QA": ["Selenium", "Playwright", "Appium", "Cucumber", "TestNG", "JUnit", "JMeter", "Postman", "CI/CD", "JavaScript", "Python", "Java"],
    "DE": ["PySpark", "Hadoop", "Airflow", "Redshift", "Snowflake", "SQL", "DBT", "Hive", "Kafka", "Spark Streaming", "Scala"],
    "DevOps": ["Terraform", "AWS", "Kubernetes", "Docker", "Helm", "Jenkins", "Ansible", "Linux Shell", "Prometheus", "Grafana", "Nginx"],
    "AI/ML": ["Python", "PyTorch", "TensorFlow", "Keras", "Scikit-Learn", "NLP", "CUDA", "OpenCV", "Deep Learning", "CNN"],
    "ERP": ["SAP ABAP", "Salesforce APEX", "LWC", "Visualforce", "Workday HCM", "EIB", "Core Connectors", "Oracle Fusion", "Financials Cloud"],
    "Security": ["Penetration Testing", "OWASP Top 10", "Kali Linux", "ISO 27001", "Risk Assessment", "SOC2 Compliance", "SecOps", "Network Security", "Burp Suite", "Wireshark"]
};
let SKILLS_DATA = null;

const DOMAIN_METADATA = {
    "SDE": { title: "Software Engineers", subtitle: "SDE / Full-Stack / Backend Experts" },
    "Backend": { title: "Backend Engineers", subtitle: "Java, Python, Go, Node.js & Database Systems" },
    "Frontend": { title: "Frontend Engineers", subtitle: "React, Angular, Vue, and Modern Web UI Systems" },
    "Mobile": { title: "Mobile Engineers", subtitle: "iOS Swift, Android Kotlin & Cross-Platform Systems" },
    "QA": { title: "QA Automation Specialists", subtitle: "Selenium, Playwright, API Testing & QA Engineering" },
    "DE": { title: "Data Engineers", subtitle: "Big Data, Spark, SQL Pipelines & Cloud Warehouses" },
    "DevOps": { title: "DevOps & Cloud Architects", subtitle: "AWS, Kubernetes, CI/CD pipelines & Infrastructure" },
    "AI/ML": { title: "AI / ML Specialists", subtitle: "Python, TensorFlow, PyTorch & LLM engineering" },
    "ERP": { title: "ERP Developers", subtitle: "Salesforce, SAP, Dynamics & Business Integrations" },
    "Security": { title: "Security Specialists", subtitle: "SecOps, PenTesting, Application & Cyber Security" }
};

const DEFAULT_SETUP_STEP_DATA = [
  {
    "step": 1,
    "title": "Chrome Remote Desktop",
    "subtitle": "Remote Screen Interface Config",
    "text": "We utilize Chrome Remote Desktop for high-fidelity, secure visual connection. This allows our expert proxy to see your coding editor tab and write code answers in real-time with absolute precision and zero input delay.",
    "items": [
      { "label": "Software Extension", "desc": "Official Chrome remote extension from Google (zero install footprint)." },
      { "label": "Stealth Settings", "desc": "Configuring layout resolutions and locking OS notification panels." },
      { "label": "Network Bandwidth", "desc": "Broadband speeds over 25 Mbps recommended to prevent remote lag." }
    ]
  },
  {
    "step": 2,
    "title": "Otter.ai Voice Feed",
    "subtitle": "Stealth Audio Transcription Engine",
    "text": "Otter.ai monitors the interviewer's speech feed and transcribes questions in real-time. The text feed is displayed on your auxiliary screen for the expert, ensuring we match verbal queries immediately.",
    "items": [
      { "label": "Live Transcript", "desc": "Transcribes meeting conversations instantly onto local support displays." },
      { "label": "Audio Cable routing", "desc": "Virtual loops channel audio outputs straight to translation algorithms." },
      { "label": "Prompt Display", "desc": "Secondary monitor outputs prompt answers for immediate reading." }
    ]
  },
  {
    "step": 3,
    "title": "Meeting Tool Integration",
    "subtitle": "Screen Share Calibration",
    "text": "We optimize tab shares on Zoom, Google Meet, or Teams. Our system ensures you share only the specific compiler browser tab or code project window, keeping remote control software invisible.",
    "items": [
      { "label": "Tab-Level Sharing", "desc": "Only share a single window; remote inputs remain completely concealed." },
      { "label": "Stealth Browser skin", "desc": "Hides address bars, bookmarks, and remote indicators in Chrome." },
      { "label": "Audio routing", "desc": "Separates interviewer audio channels from support audio streams." }
    ]
  },
  {
    "step": 4,
    "title": "Wired Hardware Setup",
    "subtitle": "Stealth Sound Configurations",
    "text": "Connecting a physical wired headset is critical to hide communication profiles. We split the audio channels so you can converse naturally with the interviewer while getting discrete prompts through your inner earpiece.",
    "items": [
      { "label": "In-Ear Buds", "desc": "Flat profile wired earpieces that stay invisible to desktop webcams." },
      { "label": "Audio Splitter", "desc": "Separates meeting feeds from real-time prompt instruction signals." },
      { "label": "Camera Alignment", "desc": "Eye-level calibration to keep focus angles natural during proxy typing." }
    ]
  }
];
let SETUP_STEP_DATA = null;

/* ==========================================================================
   DOM INITIALIZATION & INTERACTIVITY
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Mobile Nav Toggle
    initMobileNav();
    
    // FAQ Accordions
    initFaqs();

    // Consult Form Handling
    initConsultForm();

    // Weather Theme Initialization
    initWeatherTheme();

    // Initialize databases and trigger gallery/team loads
    initDatabaseEngine();
});

/* Mobile navigation hamburger toggle */
function initMobileNav() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-item");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("open");
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("open");
            });
        });
    }
}

/* Dynamic domain experts rendering */
function initTeamSection() {
    const tabsContainer = document.getElementById("team-tabs");
    const expertsGrid = document.getElementById("experts-grid");

    if (!tabsContainer || !expertsGrid) return;

    // 1. Create Filter Tabs dynamically
    const domains = Object.keys(EXPERT_DATA);
    tabsContainer.innerHTML = domains.map((domain, index) => {
        const activeClass = domain === currentDomain ? 'active' : '';
        const count = EXPERT_DATA[domain] ? EXPERT_DATA[domain].length : 0;
        const activeBadgeStyle = domain === currentDomain 
            ? 'background: rgba(255,255,255,0.2); color: #fff;' 
            : 'background: rgba(255,255,255,0.06); color: var(--text-muted);';
        return `<button class="tab-btn ${activeClass}" data-domain="${domain}">${domain} <span class="tab-badge" style="border-radius: 10px; padding: 2px 6px; font-size: 0.72rem; margin-left: 6px; font-weight: 700; ${activeBadgeStyle}">${count}</span></button>`;
    }).join('');

    // Update the Admin Expert form datalist options with current domains
    const datalist = document.getElementById("expert-domain-list");
    if (datalist) {
        datalist.innerHTML = domains.map(d => `<option value="${d}">${d}</option>`).join('');
    }

    // 2. Initial rendering of cards
    renderExperts(currentDomain);

    // 3. Attach click event to tabs
    tabsContainer.addEventListener("click", (e) => {
        const targetBtn = e.target.closest(".tab-btn");
        if (!targetBtn) return;

        const newDomain = targetBtn.dataset.domain;
        if (newDomain === currentDomain) return;

        // Update active tab styling
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        targetBtn.classList.add("active");

        currentDomain = newDomain;
        renderExperts(currentDomain);
    });
}

function renderExperts(domain) {
    const expertsGrid = document.getElementById("experts-grid");
    if (!expertsGrid) return;

    const list = EXPERT_DATA[domain] || [];

    // Update Domain Summary Header
    const domainTitle = document.getElementById("team-domain-title");
    const domainSubtitle = document.getElementById("team-domain-subtitle");
    const domainCount = document.getElementById("team-domain-count");

    const meta = DOMAIN_METADATA[domain] || { title: `${domain} Specialists`, subtitle: `Expert support for ${domain} engineering` };
    if (domainTitle) domainTitle.textContent = meta.title;
    if (domainSubtitle) domainSubtitle.textContent = meta.subtitle;
    if (domainCount) domainCount.textContent = `${list.length} Expert${list.length !== 1 ? 's' : ''}`;

    // Fade out first
    expertsGrid.style.opacity = "0.2";
    expertsGrid.style.transform = "translateY(5px)";
    
    setTimeout(() => {
        expertsGrid.innerHTML = list.map(exp => {
            // Generate Avatar Letters
            const nameParts = exp.name.split(" ");
            const initials = nameParts.map(part => part[0]).join("").substring(0, 2);

            return `
                <article class="expert-card">
                    <div class="expert-header">
                        <div class="expert-avatar">${initials}</div>
                        <div class="expert-meta">
                            <h4>${exp.name}</h4>
                            <p>${exp.role}</p>
                        </div>
                    </div>
                    <div class="expert-company">
                        <span class="company-logo-text">${exp.company.replace("Former ", "").replace("former ", "")}</span>
                    </div>
                </article>
            `;
        }).join('');

        // Render Skills List
        const skillsContainer = document.getElementById("team-domain-skills");
        if (skillsContainer) {
            const skillsList = SKILLS_DATA ? (SKILLS_DATA[domain] || []) : [];
            if (skillsList.length > 0) {
                skillsContainer.style.display = "flex";
                skillsContainer.innerHTML = skillsList.map(s => `<span style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 6px; padding: 6px 14px; font-size: 0.85rem; color: var(--text-muted); cursor: default; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--color-primary-light)'; this.style.color='#fff';" onmouseout="this.style.borderColor='var(--border-color)'; this.style.color='var(--text-muted)';">${s}</span>`).join('');
            } else {
                skillsContainer.style.display = "none";
            }
        }

        // Fade in
        expertsGrid.style.opacity = "1";
        expertsGrid.style.transform = "translateY(0)";
    }, 150);
}

function renderSetupNav() {
    const stepsNav = document.getElementById("setup-steps-nav");
    if (!stepsNav || !SETUP_STEP_DATA) return;

    stepsNav.innerHTML = SETUP_STEP_DATA.map(item => {
        const activeClass = item.step === currentSetupStep ? 'active' : '';
        const stepNumStr = String(item.step).padStart(2, '0');
        return `
            <button class="setup-nav-btn ${activeClass}" data-step="${item.step}">
                <span class="step-num">${stepNumStr}</span>
                <span class="step-title">${item.title}</span>
            </button>
        `;
    }).join('');
}

/* Interactive multi-step setup guide */
function initSetupGuide() {
    const stepsNav = document.getElementById("setup-steps-nav");
    if (!stepsNav) return;

    // Initial load
    renderSetupNav();
    renderSetupStep(currentSetupStep);

    // Click handler for sidebar navigation
    stepsNav.addEventListener("click", (e) => {
        const button = e.target.closest(".setup-nav-btn");
        if (!button) return;

        const stepNum = parseInt(button.dataset.step);
        if (stepNum === currentSetupStep) return;

        // Toggle active button class
        document.querySelectorAll(".setup-nav-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentSetupStep = stepNum;
        renderSetupStep(currentSetupStep);
    });
}

function renderSetupStep(stepIndex) {
    const displayCard = document.getElementById("setup-details-card");
    if (!displayCard || !SETUP_STEP_DATA) return;

    const data = SETUP_STEP_DATA.find(s => s.step === stepIndex);
    if (!data) return;

    // Build the list of requirements items
    const itemsMarkup = data.items.map(item => `
        <div class="info-item">
            <h4>${item.label}</h4>
            <p>${item.desc}</p>
        </div>
    `).join('');

    // Determine the action buttons dynamically
    const sortedSteps = [...SETUP_STEP_DATA].sort((a, b) => a.step - b.step);
    const currentIdx = sortedSteps.findIndex(s => s.step === stepIndex);
    const nextStepObj = sortedSteps[currentIdx + 1];

    const nextBtnMarkup = nextStepObj
        ? `<button class="btn btn-primary" onclick="setNextStep(${nextStepObj.step})">Next Step →</button>`
        : `<a href="#contact" class="btn btn-primary">Start Stealth Setup</a>`;

    displayCard.style.opacity = "0.2";
    displayCard.style.transform = "translateY(5px)";

    setTimeout(() => {
        displayCard.innerHTML = `
            <h3>${data.title}</h3>
            <div class="setup-subtitle">${data.subtitle}</div>
            <p>${data.text}</p>
            <div class="setup-info-grid">
                ${itemsMarkup}
            </div>
            <div class="setup-action-footer">
                ${nextBtnMarkup}
            </div>
        `;
        displayCard.style.opacity = "1";
        displayCard.style.transform = "translateY(0)";
    }, 150);
}

// Global scope stepper trigger (so it can be clicked inline inside the card rendering)
window.setNextStep = function(nextIndex) {
    const navButtons = document.querySelectorAll(".setup-nav-btn");
    const targetButton = Array.from(navButtons).find(btn => parseInt(btn.dataset.step) === nextIndex);
    
    if (targetButton) {
        targetButton.click();
        
        // Scroll slightly into view on mobile
        if (window.innerWidth <= 991) {
            document.getElementById("setup").scrollIntoView({ behavior: 'smooth' });
        }
    }
};

/* Expandable FAQ items accordion */
function initFaqs() {
    const triggers = document.querySelectorAll(".faq-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".faq-item");
            const isOpen = item.classList.contains("active");

            // Close all open FAQs
            document.querySelectorAll(".faq-item").forEach(el => {
                el.classList.remove("active");
                const panel = el.querySelector(".faq-panel");
                panel.style.maxHeight = null;
            });

            // Toggle selected item
            if (!isOpen) {
                item.classList.add("active");
                const panel = item.querySelector(".faq-panel");
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
}

/* Consultation request form handling with WhatsApp redirection */
function initConsultForm() {
    const form = document.getElementById("consultation-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Extract Form Values
        const name = document.getElementById("form-name").value.trim();
        const email = document.getElementById("form-email").value.trim();
        const phone = document.getElementById("form-phone").value.trim();
        const service = document.getElementById("form-service").value;
        const details = document.getElementById("form-details").value.trim();

        // 1. Construct WhatsApp Pre-filled message
        const serviceName = {
            practice: "Practice Session (Free)",
            mock: "Mock Interview ($80)",
            proxy: "Interview Support ($130)",
            cert: "Certification Help ($70)",
            support: "Job Support ($750)",
            bgv: "Verification Help"
        }[service] || "General Enquiry";

        const textMessage =
            `*[ NEW LEAD - TechMan Assist ]*\n` +
            `-------------------------------\n` +
            `Name     : ${name}\n` +
            `Email    : ${email}\n` +
            `Phone    : ${phone}\n` +
            `Service  : ${serviceName}\n` +
            `Message  : ${details}\n` +
            `-------------------------------\n` +
            `_via website form_`;

        const encodedMessage = encodeURIComponent(textMessage);
        const waLink = `${CONTACT_CONFIG.whatsappBase}?text=${encodedMessage}`;

        // 2. Auto-open WhatsApp immediately so message arrives to admin instantly
        window.open(waLink, "_blank", "noopener,noreferrer");

        // 3. Send email notification via EmailJS (silent background send)
        sendEmailNotification({ name, email, phone, serviceName, details });

        // 4. Show success confirmation modal
        showSuccessModal(name, waLink);

        // 5. Clear the form
        form.reset();
    });
}

/* Send email notification to admin via EmailJS */
function sendEmailNotification({ name, email, phone, serviceName, details }) {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS not loaded — skipping email notification.');
        return;
    }
    if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        console.info('EmailJS not configured yet — skipping email notification.');
        return;
    }

    const templateParams = {
        from_name:    name,
        from_email:   email,
        phone:        phone,
        service_name: serviceName,
        message:      details,
        to_email:     CONTACT_CONFIG.email,
        reply_to:     email
    };

    emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(() => {
            console.log('Email notification sent successfully.');
        })
        .catch((err) => {
            console.error('EmailJS send failed:', err);
        });
}

function showSuccessModal(name, waLink) {
    // Create overlay container
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background-color: rgba(8, 9, 14, 0.92);
        backdrop-filter: blur(14px);
        display: flex; align-items: center; justify-content: center;
        z-index: 1000; opacity: 0; transition: opacity 0.3s ease;
    `;

    // Create dialog content
    const dialog = document.createElement("div");
    dialog.style.cssText = `
        background: linear-gradient(145deg, #0e111a, #121828);
        border: 1.5px solid rgba(37, 211, 102, 0.3);
        border-radius: 24px; padding: 48px 36px;
        max-width: 460px; width: 90%; text-align: center;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(37, 211, 102, 0.08);
        transform: scale(0.88) translateY(20px);
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    `;

    dialog.innerHTML = `
        <div style="width: 72px; height: 72px; border-radius: 50%;
            background: rgba(37, 211, 102, 0.12);
            border: 1.5px solid rgba(37, 211, 102, 0.4);
            display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px auto; position: relative;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25d366" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            <span style="position: absolute; top: -6px; right: -6px; font-size: 1.1rem;">✅</span>
        </div>

        <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #fff; margin-bottom: 8px; letter-spacing: -0.02em;">
            We Got Your Request!
        </h3>
        <p style="font-family: 'Outfit', sans-serif; color: #25d366; font-size: 0.85rem; font-weight: 600; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase;">
            📲 WhatsApp Opened Automatically
        </p>
        <p style="font-family: 'Outfit', sans-serif; color: #94a3b8; font-size: 0.92rem; margin-bottom: 28px; line-height: 1.7;">
            Hi <strong style="color: #f8fafc;">${name}</strong>, your details have been sent to our coordinator via WhatsApp.
            We'll respond within <strong style="color: #f8fafc;">2 hours</strong> to confirm your booking. 🚀
        </p>

        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button id="close-modal-btn" style="
                background: linear-gradient(135deg, #4f46e5, #6366f1);
                color: #fff; border: none; padding: 14px 28px;
                border-radius: 10px; font-weight: 600; font-size: 0.95rem;
                cursor: pointer; font-family: 'Outfit', sans-serif;
                box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
                transition: all 0.2s;
            ">Got it, Close ✓</button>

            <a href="${waLink}" target="_blank" rel="noopener" id="wa-modal-btn" style="
                display: inline-flex; align-items: center; justify-content: center;
                gap: 6px; color: #25d366; font-size: 0.82rem; font-weight: 500;
                padding: 8px; border-radius: 8px;
                border: 1px solid rgba(37, 211, 102, 0.15);
                background: rgba(37, 211, 102, 0.04);
                font-family: 'Outfit', sans-serif; transition: all 0.2s;
            ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 2.016 14.11 1.008 11.48 1.008c-5.442 0-9.87 4.372-9.874 9.802-.001 1.77.464 3.5 1.349 5.022L1.93 22.025l6.347-1.656c1.554.848 3.197 1.285 4.845 1.285zm12.336-7.85c-.32-.16-1.89-.933-2.185-1.04-.294-.108-.508-.16-.721.16-.214.32-.828 1.04-.1.16s-.535-.246-.906-.324c-.267-.056-.475-.24-.627-.478-.146-.226-.148-.567.042-.907.037-.066.079-.133.125-.2.247-.36.4-.64.444-.805.043-.165.022-.307-.01-.387-.033-.08-.321-.773-.44-1.058-.116-.28-.236-.241-.321-.245-.083-.004-.178-.004-.273-.004-.096 0-.251.036-.383.18-.132.144-.504.493-.504 1.201 0 .708.515 1.393.587 1.488.072.096 1.014 1.55 2.457 2.172.343.148.611.237.82.303.345.11.66.094.908.057.277-.041.89-.364 1.016-.716.126-.352.126-.654.088-.717-.038-.063-.14-.1-.46-.26z"/></svg>
                WhatsApp didn't open? Click here to retry
            </a>
        </div>
    `;

    document.body.appendChild(overlay);
    overlay.appendChild(dialog);

    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        dialog.style.transform = "scale(1) translateY(0)";
    });

    const closeModal = () => {
        overlay.style.opacity = "0";
        dialog.style.transform = "scale(0.9) translateY(10px)";
        setTimeout(() => overlay.remove(), 300);
    };

    dialog.querySelector("#close-modal-btn").addEventListener("click", closeModal);
    dialog.querySelector("#wa-modal-btn").addEventListener("click", () => {
        setTimeout(closeModal, 800);
    });
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal();
    });
}

/* ==========================================================================
   SUCCESS SCREENSHOTS GALLERY DATA, LOCALSTORAGE, & ADMIN PORTAL
   ========================================================================== */
const DEFAULT_GALLERY_DATA = {
    "offers": [
        { id: "off-1", title: "SDE-2 Offer Letter", desc: "Top-tier E-commerce company offer package, fully verified.", img: "offer_letter.png" },
        { id: "off-2", title: "Backend Architect Offer", desc: "Global fintech group remote contract and placement documentation.", img: "offer_letter.png" },
        { id: "off-3", title: "Senior DevOps Offer", desc: "Unicorn startup lead operations engineer offer details.", img: "offer_letter.png" }
    ],
    "assignments": [
        { id: "asn-1", title: "HackerRank Coding Task", desc: "Optimized graph traversals submitted for FAANG coding round.", img: "assignment.png" },
        { id: "asn-2", title: "Karat System Design Draft", desc: "Stealth system diagrams and API schemas for high-traffic servers.", img: "assignment.png" },
        { id: "asn-3", title: "Spring Boot Sprint Task", desc: "Clean MVC code structure solved for pre-onboarding assessment.", img: "assignment.png" }
    ],
    "certificates": [
        { id: "crt-1", title: "AWS Solutions Architect Pro", desc: "Verified Amazon Web Services Professional level certificate.", img: "certificate.png" },
        { id: "crt-2", title: "Microsoft Azure Dev Associate", desc: "Verified Azure Associate level developer certification.", img: "certificate.png" },
        { id: "crt-3", title: "Google Cloud Professional Architect", desc: "Verified Google Cloud Professional Cloud Architect certification.", img: "certificate.png" }
    ]
};

let GALLERY_DATA = null;

let currentGalleryCategory = "offers";
const ADMIN_PASSCODE = "admin"; // Passcode to log in

function initGallerySection() {
    const tabsContainer = document.getElementById("gallery-tabs");
    const galleryGrid = document.getElementById("gallery-grid");

    if (!tabsContainer || !galleryGrid) return;

    // Render initial category
    renderGallery(currentGalleryCategory);

    // Attach click events to tabs
    tabsContainer.addEventListener("click", (e) => {
        const button = e.target.closest(".gallery-tab-btn");
        if (!button) return;

        const category = button.dataset.category;
        if (category === currentGalleryCategory) return;

        document.querySelectorAll(".gallery-tab-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentGalleryCategory = category;
        renderGallery(currentGalleryCategory);
    });

    // Lightbox modal events
    initLightbox();

    // Admin Portal Activation Link
    const adminLink = document.getElementById("admin-portal-link");
    if (adminLink) {
        adminLink.addEventListener("click", (e) => {
            e.preventDefault();
            openAdminLogin();
        });
    }

    // Admin Forms Initialization
    initAdminForms();
}

function renderGallery(category) {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid) return;

    const list = GALLERY_DATA[category] || [];

    galleryGrid.style.opacity = "0.2";
    galleryGrid.style.transform = "translateY(5px)";

    setTimeout(() => {
        if (list.length === 0) {
            galleryGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--text-dim); padding: 40px;">
                    No screenshots uploaded in this category yet.
                </div>
            `;
        } else {
            galleryGrid.innerHTML = list.map(item => `
                <div class="gallery-card" onclick="openLightbox('${item.img}', '${item.title} - ${item.desc}')">
                    <div class="gallery-img-wrapper">
                        <img src="${item.img}" alt="${item.title}" class="gallery-img" loading="lazy">
                    </div>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `).join('');
        }
        galleryGrid.style.opacity = "1";
        galleryGrid.style.transform = "translateY(0)";
        initGalleryAutoScroll();
    }, 150);
}

let galleryScrollInterval = null;

function initGalleryAutoScroll() {
    const grid = document.getElementById("gallery-grid");
    if (!grid) return;

    if (galleryScrollInterval) {
        clearInterval(galleryScrollInterval);
    }

    let isPaused = false;

    // Toggle pause on hover to allow detailed inspection
    grid.addEventListener("mouseenter", () => { isPaused = true; });
    grid.addEventListener("mouseleave", () => { isPaused = false; });
    grid.addEventListener("touchstart", () => { isPaused = true; });
    grid.addEventListener("touchend", () => { setTimeout(() => { isPaused = false; }, 2000); });

    galleryScrollInterval = setInterval(() => {
        if (isPaused) return;

        const cards = grid.querySelectorAll(".gallery-card");
        if (cards.length <= 1) return;

        const cardWidth = cards[0].offsetWidth;
        const gap = 24;
        const step = cardWidth + gap;

        const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 20;

        if (isAtEnd) {
            grid.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            grid.scrollBy({ left: step, behavior: "smooth" });
        }
    }, 3000);
}

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".lightbox-close");

    if (!lightbox || !closeBtn) return;

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

window.openLightbox = function(imgSrc, captionText) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    if (lightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = captionText;
        lightbox.style.display = "block";
    }
};

/* ==========================================================================
   ADMIN PORTAL OPERATIONS LOGIC
   ========================================================================== */
// GitHub REST API Integration & Preferences Configuration
function getGitHubSettings() {
    return {
        username: localStorage.getItem("github_username") || "",
        repo: localStorage.getItem("github_repo") || "",
        branch: localStorage.getItem("github_branch") || "main",
        token: localStorage.getItem("github_token") || ""
    };
}

function getSupabaseSettings() {
    return {
        url: localStorage.getItem("supabase_url") || "https://otlgcerhbqwfcsddftcl.supabase.co",
        key: localStorage.getItem("supabase_key") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90bGdjZXJoYnF3ZmNzZGRmdGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MjU5MDMsImV4cCI6MjA5OTAwMTkwM30.gaCf4U_o6lmN9ZKw0J4vzaV_N9Kz0Gng391Bx8_tTgo"
    };
}

async function githubRequest(url, method = "GET", body = null) {
    const settings = getGitHubSettings();
    const headers = {
        "Authorization": `token ${settings.token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    };
    
    const config = { method, headers };
    if (body) {
        config.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, config);
    if (!response.ok) {
        const errInfo = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errInfo.message || `HTTP ${response.status}`);
    }
    return await response.json();
}

async function fetchFromGitHub(path) {
    const settings = getGitHubSettings();
    if (!settings.username || !settings.repo || !settings.token) return null;
    
    const url = `https://api.github.com/repos/${settings.username}/${settings.repo}/contents/${path}?ref=${settings.branch}`;
    try {
        const fileInfo = await githubRequest(url, "GET");
        const content = decodeURIComponent(escape(atob(fileInfo.content.replace(/\s/g, ""))));
        return {
            sha: fileInfo.sha,
            data: JSON.parse(content)
        };
    } catch (e) {
        console.error(`Failed to fetch ${path} from GitHub:`, e);
        return null;
    }
}

async function commitToGitHub(path, data, message, existingSha = null) {
    const settings = getGitHubSettings();
    if (!settings.username || !settings.repo || !settings.token) {
        throw new Error("GitHub integration settings are not configured.");
    }
    
    let sha = existingSha;
    if (!sha) {
        const currentFile = await fetchFromGitHub(path);
        if (currentFile) {
            sha = currentFile.sha;
        }
    }
    
    const url = `https://api.github.com/repos/${settings.username}/${settings.repo}/contents/${path}`;
    const stringified = JSON.stringify(data, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(stringified)));
    
    const body = {
        message: message,
        content: base64Content,
        branch: settings.branch
    };
    if (sha) {
        body.sha = sha;
    }
    
    return await githubRequest(url, "PUT", body);
}

async function uploadImageToGitHub(fileBlob, filename) {
    const settings = getGitHubSettings();
    if (!settings.username || !settings.repo || !settings.token) {
        throw new Error("GitHub integration settings are not configured.");
    }

    const url = `https://api.github.com/repos/${settings.username}/${settings.repo}/contents/images/${filename}`;
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64data = reader.result.split(',')[1];
            const body = {
                message: `admin: upload screenshot ${filename}`,
                content: base64data,
                branch: settings.branch
            };
            try {
                const res = await githubRequest(url, "PUT", body);
                resolve(res.content.download_url);
            } catch (e) {
                reject(e);
            }
        };
        reader.onerror = () => reject(new Error("Failed to read image blob"));
        reader.readAsDataURL(fileBlob);
    });
}

// Browser-Side Canvas Image Compression Utility
function compressImage(file, maxWidth = 1000, quality = 0.75) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round(height * (maxWidth / width));
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error("Canvas compression failed"));
                    }
                }, "image/webp", quality);
            };
            img.onerror = () => reject(new Error("Failed to load image"));
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
    });
}

// Supabase REST Helper
async function querySupabase(table, method = "GET", body = null) {
    const sbSettings = getSupabaseSettings();
    if (!sbSettings.url || !sbSettings.key) return null;

    // Clean leading/trailing slashes from url
    const baseUrl = sbSettings.url.replace(/\/+$/, "");
    const url = `${baseUrl}/rest/v1/${table}`;
    const headers = {
        "apikey": sbSettings.key,
        "Authorization": `Bearer ${sbSettings.key}`
    };

    const options = {
        method,
        headers
    };

    if (body) {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Supabase DB request failed: ${res.statusText}`);
    }

    if (method === "DELETE" || res.status === 204 || res.status === 201) {
        return true;
    }

    return await res.json();
}

async function uploadToSupabaseStorage(blob, filename) {
    const sbSettings = getSupabaseSettings();
    if (!sbSettings.url || !sbSettings.key) return null;

    const baseUrl = sbSettings.url.replace(/\/+$/, "");
    const uploadUrl = `${baseUrl}/storage/v1/object/gallery/screenshots/${filename}`;
    const headers = {
        "apikey": sbSettings.key,
        "Authorization": `Bearer ${sbSettings.key}`,
        "Content-Type": "image/webp"
    };

    const res = await fetch(uploadUrl, {
        method: "POST",
        headers,
        body: blob
    });

    if (!res.ok) {
        throw new Error(`Supabase Storage upload failed: ${res.statusText}`);
    }

    return `${baseUrl}/storage/v1/object/public/gallery/screenshots/${filename}`;
}

// Dynamic Database Initialization & Cache Strategy
async function initDatabaseEngine() {
    const settings = getGitHubSettings();
    const useGitHub = settings.username && settings.repo && settings.token;

    const sbSettings = getSupabaseSettings();
    const useSupabase = sbSettings.url && sbSettings.key;

    let galleryLoaded = false;
    let expertsLoaded = false;
    let pricingLoaded = false;
    let setupLoaded = false;

    // 0. Try to fetch from Supabase (Highest Priority for Database Storage)
    if (useSupabase) {
        try {
            const galleryRows = await querySupabase("gallery");
            if (galleryRows) {
                const grouped = { offers: [], assignments: [], certificates: [] };
                galleryRows.forEach(row => {
                    if (grouped[row.category]) {
                        grouped[row.category].push({
                            id: row.id,
                            title: row.title,
                            desc: row.desc,
                            img: row.img
                        });
                    }
                });
                GALLERY_DATA = grouped;
                localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
                galleryLoaded = true;
            }

            const expertsRows = await querySupabase("experts");
            if (expertsRows) {
                const grouped = {};
                expertsRows.forEach(row => {
                    if (!grouped[row.domain]) {
                        grouped[row.domain] = [];
                    }
                    grouped[row.domain].push({
                        name: row.name,
                        role: row.role,
                        company: row.company,
                        tech: row.tech
                    });
                });
                EXPERT_DATA = grouped;
                localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
                expertsLoaded = true;
            }

            const pricingRows = await querySupabase("pricing");
            if (pricingRows) {
                PRICING_DATA = pricingRows.map(row => ({
                    id: row.id,
                    title: row.title,
                    price: row.price,
                    period: row.period,
                    desc: row.desc,
                    benefits: row.benefits,
                    popular: row.popular,
                    whatsapp_text: row.whatsapp_text
                }));
                localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
                pricingLoaded = true;
            }

            const setupRows = await querySupabase("setup_steps");
            if (setupRows) {
                SETUP_STEP_DATA = setupRows.map(row => ({
                    step: row.step,
                    title: row.title,
                    subtitle: row.subtitle,
                    text: row.text,
                    items: row.items
                })).sort((a, b) => a.step - b.step);
                localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
                setupLoaded = true;
            }

            try {
                const skillsRows = await querySupabase("skills");
                if (skillsRows) {
                    const groupedSkills = {};
                    skillsRows.forEach(row => {
                        if (!groupedSkills[row.domain]) {
                            groupedSkills[row.domain] = [];
                        }
                        groupedSkills[row.domain].push(row.name);
                    });
                    SKILLS_DATA = groupedSkills;
                    localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
                }
            } catch (e) {
                console.warn("Failed to load skills from Supabase, using default fallback:", e.message);
            }
        } catch (e) {
            console.warn("Failed to load from Supabase on start. Falling back to GitHub or Local Cache.", e);
        }
    }

    // 1. Try to fetch from GitHub if integrated and not loaded via Supabase
    if (useGitHub && (!galleryLoaded || !expertsLoaded || !pricingLoaded || !setupLoaded)) {
        try {
            if (!galleryLoaded) {
                const githubGallery = await fetchFromGitHub("gallery.json");
                if (githubGallery) {
                    GALLERY_DATA = githubGallery.data;
                    localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
                    galleryLoaded = true;
                }
            }
            
            if (!expertsLoaded) {
                const githubExperts = await fetchFromGitHub("experts.json");
                if (githubExperts) {
                    EXPERT_DATA = githubExperts.data;
                    localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
                    expertsLoaded = true;
                }
            }

            if (!pricingLoaded) {
                const githubPricing = await fetchFromGitHub("pricing.json");
                if (githubPricing) {
                    PRICING_DATA = githubPricing.data;
                    localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
                    pricingLoaded = true;
                }
            }

            if (!setupLoaded) {
                const githubSetup = await fetchFromGitHub("setup.json");
                if (githubSetup) {
                    SETUP_STEP_DATA = githubSetup.data;
                    localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
                    setupLoaded = true;
                }
            }
        } catch (e) {
            console.warn("Failed to load from GitHub on start. Falling back to local cache/files.", e);
        }
    }

    // 2. Fallback to LocalStorage or Local Static Files
    if (!galleryLoaded) {
        const localGallery = localStorage.getItem("techman_gallery_data");
        if (localGallery) {
            GALLERY_DATA = JSON.parse(localGallery);
        } else {
            try {
                const res = await fetch("gallery.json");
                GALLERY_DATA = await res.json();
                localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
            } catch (e) {
                console.error("Failed to fetch gallery.json:", e);
                GALLERY_DATA = DEFAULT_GALLERY_DATA;
            }
        }
    }

    if (!expertsLoaded) {
        const localExperts = localStorage.getItem("techman_experts_data");
        if (localExperts) {
            EXPERT_DATA = JSON.parse(localExperts);
        } else {
            try {
                const res = await fetch("experts.json");
                EXPERT_DATA = await res.json();
                localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
            } catch (e) {
                console.error("Failed to fetch experts.json:", e);
                EXPERT_DATA = DEFAULT_EXPERT_DATA;
            }
        }
    }

    if (!pricingLoaded) {
        const localPricing = localStorage.getItem("techman_pricing_data");
        if (localPricing) {
            PRICING_DATA = JSON.parse(localPricing);
        } else {
            try {
                const res = await fetch("pricing.json");
                PRICING_DATA = await res.json();
                localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
            } catch (e) {
                console.error("Failed to fetch pricing.json:", e);
                PRICING_DATA = [];
            }
        }
    }

    if (!setupLoaded) {
        const localSetup = localStorage.getItem("techman_setup_data");
        if (localSetup && JSON.parse(localSetup).length > 0) {
            SETUP_STEP_DATA = JSON.parse(localSetup);
        } else {
            try {
                const res = await fetch("setup.json");
                SETUP_STEP_DATA = await res.json();
                if (!SETUP_STEP_DATA || SETUP_STEP_DATA.length === 0) {
                    SETUP_STEP_DATA = DEFAULT_SETUP_STEP_DATA;
                }
                localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
            } catch (e) {
                console.error("Failed to fetch setup.json:", e);
                SETUP_STEP_DATA = DEFAULT_SETUP_STEP_DATA;
                localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
            }
        }
    }

    if (!SKILLS_DATA) {
        const cachedSkills = localStorage.getItem("techman_skills_data");
        if (cachedSkills) {
            SKILLS_DATA = JSON.parse(cachedSkills);
        } else {
            SKILLS_DATA = DEFAULT_SKILLS_DATA;
            localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
        }
    }

    // Set active step to first loaded step ID
    if (SETUP_STEP_DATA && SETUP_STEP_DATA.length > 0) {
        currentSetupStep = SETUP_STEP_DATA[0].step;
    }

    // 3. Render Views
    initTeamSection();
    initGallerySection();
    renderPricingPlans();
    initSetupGuide();
}

async function syncDatabasesWithGitHub() {
    const settings = getGitHubSettings();
    if (!settings.username || !settings.repo || !settings.token) return;

    try {
        const cloudGallery = await fetchFromGitHub("gallery.json");
        if (cloudGallery) {
            GALLERY_DATA = cloudGallery.data;
            localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
        }

        const cloudExperts = await fetchFromGitHub("experts.json");
        if (cloudExperts) {
            EXPERT_DATA = cloudExperts.data;
            localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
        }

        const cloudPricing = await fetchFromGitHub("pricing.json");
        if (cloudPricing) {
            PRICING_DATA = cloudPricing.data;
            localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
        }

        const cloudSetup = await fetchFromGitHub("setup.json");
        if (cloudSetup) {
            SETUP_STEP_DATA = cloudSetup.data;
            localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
        }

        renderGallery(currentGalleryCategory);
        renderExperts(currentDomain);
        renderPricingPlans();
        initSetupGuide();
        renderAdminDashboardList();
        renderAdminExpertsList();
        renderAdminPricingList();
        renderAdminSetupList();
    } catch (e) {
        console.error("Failed to sync databases with GitHub:", e);
    }
}

// Admin Tab Controller
function initAdminTabs() {
    const tabButtons = document.querySelectorAll(".admin-tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.dataset.target;
            
            // Remove active status from all elements
            document.querySelectorAll(".admin-tab-btn").forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".admin-tab-content").forEach(c => c.classList.remove("active"));
            
            // Activate selected elements
            btn.classList.add("active");
            const targetEl = document.getElementById(targetId);
            if (targetEl) targetEl.classList.add("active");
        });
    });
}

// Admin Forms Handling
function initAdminForms() {
    // 1. Setup Tab switching logic
    initAdminTabs();

    // 2. Passcode Authentication Form
    const loginForm = document.getElementById("admin-login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const passVal = document.getElementById("admin-passcode").value;
            const errorMsg = document.getElementById("login-error-msg");

            if (passVal === ADMIN_PASSCODE) {
                closeAdminLogin();
                openAdminDashboard();
            } else {
                errorMsg.style.display = "block";
            }
        });
    }

    // 3. Upload Screenshot Form
    const uploadForm = document.getElementById("admin-upload-form");
    if (uploadForm) {
        uploadForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const category = document.getElementById("upload-category").value;
            const title = document.getElementById("upload-title").value;
            const desc = document.getElementById("upload-desc").value;
            const fileInput = document.getElementById("upload-file");
            const file = fileInput.files[0];

            if (!file) return;

            const submitBtn = uploadForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Compressing & Uploading...";

            const settings = getGitHubSettings();
            const useGitHub = settings.username && settings.repo && settings.token;

            const sbSettings = getSupabaseSettings();
            const useSupabase = sbSettings.url && sbSettings.key;

            try {
                // Compress image to WebP
                const compressedBlob = await compressImage(file);
                const originalGallery = JSON.parse(JSON.stringify(GALLERY_DATA));
                let imgUrl = "";

                if (useSupabase) {
                    const filename = `screenshot-${Date.now()}.webp`;
                    imgUrl = await uploadToSupabaseStorage(compressedBlob, filename);
                } else if (useGitHub) {
                    const filename = `screenshot-${Date.now()}.webp`;
                    imgUrl = await uploadImageToGitHub(compressedBlob, filename);
                } else {
                    imgUrl = await new Promise((resolve) => {
                        const r = new FileReader();
                        r.onload = () => resolve(r.result);
                        r.readAsDataURL(compressedBlob);
                    });
                }

                const newTile = {
                    id: "custom-" + Date.now(),
                    title: title,
                    desc: desc,
                    img: imgUrl
                };

                if (useSupabase) {
                    await querySupabase("gallery", "POST", {
                        id: newTile.id,
                        category: category,
                        title: newTile.title,
                        desc: newTile.desc,
                        img: newTile.img
                    });
                    GALLERY_DATA[category].unshift(newTile);
                    localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
                    alert("Screenshot uploaded and saved to Supabase successfully!");
                } else {
                    GALLERY_DATA[category].unshift(newTile);
                    if (useGitHub) {
                        await commitToGitHub("gallery.json", GALLERY_DATA, `admin: add screenshot ${title}`);
                        localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
                        alert("Screenshot added to GitHub successfully!");
                    } else {
                        localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
                        alert("Screenshot added locally (preview mode)!");
                    }
                }

                renderGallery(currentGalleryCategory);
                renderAdminDashboardList();
                uploadForm.reset();
            } catch (e) {
                console.error(e);
                alert(`Failed to add screenshot: ${e.message}`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // 4. Add Expert Form
    const expertForm = document.getElementById("admin-expert-form");
    if (expertForm) {
        expertForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const domain = document.getElementById("expert-domain").value;
            const name = document.getElementById("expert-name").value;
            const role = document.getElementById("expert-role").value;
            const company = document.getElementById("expert-company").value;

            const submitBtn = expertForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving expert...";

            const newExpert = { name, role, company, tech: [] };
            const originalList = JSON.parse(JSON.stringify(EXPERT_DATA));

            if (!EXPERT_DATA[domain]) {
                EXPERT_DATA[domain] = [];
            }
            EXPERT_DATA[domain].push(newExpert);

            const settings = getGitHubSettings();
            const useGitHub = settings.username && settings.repo && settings.token;

            const sbSettings = getSupabaseSettings();
            const useSupabase = sbSettings.url && sbSettings.key;

            try {
                if (useSupabase) {
                    await querySupabase("experts", "POST", {
                        domain: domain,
                        name: name,
                        role: role,
                        company: company
                    });
                    localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
                    alert("Expert added to Supabase successfully!");
                } else if (useGitHub) {
                    await commitToGitHub("experts.json", EXPERT_DATA, `admin: add expert ${name} to ${domain}`);
                    localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
                    alert("Expert added to GitHub repository successfully!");
                } else {
                    localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
                    alert("Expert added locally (preview mode)!");
                }

                currentDomain = domain;
                initTeamSection();
                renderAdminExpertsList();
                expertForm.reset();
            } catch (e) {
                console.error(e);
                EXPERT_DATA = originalList; // rollback
                alert(`Failed to save expert: ${e.message}`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // 4.5. Add Pricing Plan Form
    const pricingForm = document.getElementById("admin-pricing-form");
    if (pricingForm) {
        pricingForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("plan-title").value.trim();
            const price = document.getElementById("plan-price").value.trim();
            const period = document.getElementById("plan-period").value.trim();
            const desc = document.getElementById("plan-desc").value.trim();
            const benefitsStr = document.getElementById("plan-benefits").value.trim();
            const whatsappText = document.getElementById("plan-whatsapp").value.trim();
            const popular = document.getElementById("plan-popular").checked;

            const benefits = benefitsStr.split(",").map(b => b.trim()).filter(b => b !== "");

            const submitBtn = pricingForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving plan...";

            const newPlan = {
                id: "plan-" + Date.now(),
                title,
                price,
                period,
                desc,
                benefits,
                popular,
                whatsapp_text: whatsappText
            };

            const originalList = JSON.parse(JSON.stringify(PRICING_DATA));
            if (!PRICING_DATA) PRICING_DATA = [];
            PRICING_DATA.push(newPlan);

            const settings = getGitHubSettings();
            const useGitHub = settings.username && settings.repo && settings.token;

            const sbSettings = getSupabaseSettings();
            const useSupabase = sbSettings.url && sbSettings.key;

            try {
                if (useSupabase) {
                    await querySupabase("pricing", "POST", {
                        id: newPlan.id,
                        title: newPlan.title,
                        price: newPlan.price,
                        period: newPlan.period,
                        desc: newPlan.desc,
                        benefits: newPlan.benefits,
                        popular: newPlan.popular,
                        whatsapp_text: newPlan.whatsapp_text
                    });
                    localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
                    alert("Pricing plan saved to Supabase successfully!");
                } else if (useGitHub) {
                    await commitToGitHub("pricing.json", PRICING_DATA, `admin: add pricing plan ${title}`);
                    localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
                    alert("Pricing plan added to GitHub repository successfully!");
                } else {
                    localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
                    alert("Pricing plan added locally (preview mode)!");
                }

                renderPricingPlans();
                renderAdminPricingList();
                pricingForm.reset();
            } catch (e) {
                console.error(e);
                PRICING_DATA = originalList; // rollback
                alert(`Failed to save pricing plan: ${e.message}`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // 4.6. Add/Edit Setup Step Form
    const setupForm = document.getElementById("admin-setup-form");
    if (setupForm) {
        setupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const stepNum = parseInt(document.getElementById("setup-step-number").value);
            const title = document.getElementById("setup-title").value.trim();
            const subtitle = document.getElementById("setup-subtitle").value.trim();
            const desc = document.getElementById("setup-desc").value.trim();

            const items = [
                {
                    label: document.getElementById("setup-item1-label").value.trim(),
                    desc: document.getElementById("setup-item1-desc").value.trim()
                },
                {
                    label: document.getElementById("setup-item2-label").value.trim(),
                    desc: document.getElementById("setup-item2-desc").value.trim()
                },
                {
                    label: document.getElementById("setup-item3-label").value.trim(),
                    desc: document.getElementById("setup-item3-desc").value.trim()
                }
            ];

            const newStep = {
                step: stepNum,
                title: title,
                subtitle: subtitle,
                text: desc,
                items: items
            };

            const submitBtn = setupForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving step...";

            const originalList = JSON.parse(JSON.stringify(SETUP_STEP_DATA || []));
            if (!SETUP_STEP_DATA) SETUP_STEP_DATA = [];

            // Check if step exists to overwrite it, otherwise push
            const idx = SETUP_STEP_DATA.findIndex(s => s.step === stepNum);
            if (idx !== -1) {
                SETUP_STEP_DATA[idx] = newStep;
            } else {
                SETUP_STEP_DATA.push(newStep);
            }
            SETUP_STEP_DATA.sort((a, b) => a.step - b.step);

            const settings = getGitHubSettings();
            const useGitHub = settings.username && settings.repo && settings.token;

            const sbSettings = getSupabaseSettings();
            const useSupabase = sbSettings.url && sbSettings.key;

            try {
                if (useSupabase) {
                    await querySupabase("setup_steps?step=eq." + stepNum, "DELETE");
                    await querySupabase("setup_steps", "POST", newStep);
                    localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
                    alert("Setup step saved to Supabase successfully!");
                } else if (useGitHub) {
                    await commitToGitHub("setup.json", SETUP_STEP_DATA, `admin: add/update setup step ${stepNum}`);
                    localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
                    alert("Setup step saved to GitHub repository successfully!");
                } else {
                    localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
                    alert("Setup step saved locally (preview mode)!");
                }

                initSetupGuide();
                renderAdminSetupList();
                setupForm.reset();
            } catch (err) {
                console.error(err);
                SETUP_STEP_DATA = originalList; // rollback
                alert(`Failed to save setup step: ${err.message}`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // 4.7. Add Supported Skill Form
    const skillForm = document.getElementById("admin-skill-form");
    if (skillForm) {
        skillForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const domain = document.getElementById("skill-domain").value.trim();
            const name = document.getElementById("skill-name").value.trim();

            const submitBtn = skillForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving skill...";

            const originalList = JSON.parse(JSON.stringify(SKILLS_DATA || {}));
            if (!SKILLS_DATA) SKILLS_DATA = {};
            if (!SKILLS_DATA[domain]) {
                SKILLS_DATA[domain] = [];
            }
            if (!SKILLS_DATA[domain].includes(name)) {
                SKILLS_DATA[domain].push(name);
            }

            const settings = getGitHubSettings();
            const useGitHub = settings.username && settings.repo && settings.token;

            const sbSettings = getSupabaseSettings();
            const useSupabase = sbSettings.url && sbSettings.key;

            try {
                if (useSupabase) {
                    await querySupabase("skills", "POST", {
                        domain: domain,
                        name: name
                    });
                    localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
                    alert("Skill added to Supabase successfully!");
                } else if (useGitHub) {
                    await commitToGitHub("skills.json", SKILLS_DATA, `admin: add skill ${name} to ${domain}`);
                    localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
                    alert("Skill added to GitHub successfully!");
                } else {
                    localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
                    alert("Skill added locally (preview mode)!");
                }

                initTeamSection();
                renderAdminSkillsList();
                skillForm.reset();
            } catch (e) {
                console.error(e);
                SKILLS_DATA = originalList; // rollback
                alert(`Failed to save skill: ${e.message}`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    // 5. Settings Configuration Form
    const settingsForm = document.getElementById("admin-settings-form");
    if (settingsForm) {
        const settings = getGitHubSettings();
        document.getElementById("settings-github-username").value = settings.username;
        document.getElementById("settings-github-repo").value = settings.repo;
        document.getElementById("settings-github-branch").value = settings.branch;
        document.getElementById("settings-github-token").value = settings.token;

        const sbSettings = getSupabaseSettings();
        document.getElementById("settings-supabase-url").value = sbSettings.url;
        document.getElementById("settings-supabase-key").value = sbSettings.key;

        settingsForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("settings-github-username").value.trim();
            const repo = document.getElementById("settings-github-repo").value.trim();
            const branch = document.getElementById("settings-github-branch").value.trim();
            const token = document.getElementById("settings-github-token").value.trim();

            const sbUrl = document.getElementById("settings-supabase-url").value.trim();
            const sbKey = document.getElementById("settings-supabase-key").value.trim();

            const submitBtn = settingsForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Saving and syncing settings...";

            try {
                if (username) localStorage.setItem("github_username", username);
                else localStorage.removeItem("github_username");

                if (repo) localStorage.setItem("github_repo", repo);
                else localStorage.removeItem("github_repo");

                if (branch) localStorage.setItem("github_branch", branch);
                else localStorage.removeItem("github_branch");

                if (token) localStorage.setItem("github_token", token);
                else localStorage.removeItem("github_token");

                if (sbUrl) localStorage.setItem("supabase_url", sbUrl);
                else localStorage.removeItem("supabase_url");

                if (sbKey) localStorage.setItem("supabase_key", sbKey);
                else localStorage.removeItem("supabase_key");

                alert("Cloud settings saved! Syncing databases...");
                await initDatabaseEngine();
                alert("Database sync successful!");
            } catch (err) {
                console.error(err);
                alert(`Sync error: ${err.message}`);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }

    const clearSettingsBtn = document.getElementById("btn-clear-settings");
    if (clearSettingsBtn) {
        clearSettingsBtn.addEventListener("click", () => {
            if (!confirm("Are you sure you want to clear cloud integration settings? Updates will revert to local preview mode.")) return;
            
            localStorage.removeItem("github_username");
            localStorage.removeItem("github_repo");
            localStorage.removeItem("github_branch");
            localStorage.removeItem("github_token");
            localStorage.removeItem("supabase_url");
            localStorage.removeItem("supabase_key");

            if (settingsForm) settingsForm.reset();
            alert("Cloud settings cleared. Local preview mode enabled.");
            
            initDatabaseEngine();
        });
    }
}

window.openAdminLogin = function() {
    const modal = document.getElementById("admin-login-modal");
    if (modal) {
        modal.classList.add("open");
        const passcodeField = document.getElementById("admin-passcode");
        if (passcodeField) passcodeField.value = "";
        const errMsg = document.getElementById("login-error-msg");
        if (errMsg) errMsg.style.display = "none";
    }
};

window.closeAdminLogin = function() {
    const modal = document.getElementById("admin-login-modal");
    if (modal) {
        modal.classList.remove("open");
    }
};

window.closeAdminDashboard = function() {
    const modal = document.getElementById("admin-dashboard-modal");
    if (modal) {
        modal.classList.remove("open");
    }
};

function openAdminDashboard() {
    const modal = document.getElementById("admin-dashboard-modal");
    if (modal) {
        modal.classList.add("open");
        renderAdminDashboardList();
        renderAdminExpertsList();
        renderAdminSkillsList();
        renderAdminPricingList();
        renderAdminSetupList();
    }
}

function renderAdminDashboardList() {
    const listContainer = document.getElementById("admin-items-list");
    if (!listContainer) return;

    let itemsMarkup = "";
    const categories = ["offers", "assignments", "certificates"];

    categories.forEach(cat => {
        const list = GALLERY_DATA[cat] || [];
        const catName = {
            offers: "Offer Letter",
            assignments: "Assignment",
            certificates: "Certification"
        }[cat];

        list.forEach(item => {
            itemsMarkup += `
                <div class="admin-item-row" data-id="${item.id}">
                    <div class="admin-item-info">
                        <img src="${item.img}" class="admin-item-thumb" alt="Thumbnail">
                        <div class="admin-item-text">
                            <h5>${item.title}</h5>
                            <span>${catName}</span>
                        </div>
                    </div>
                    <button class="btn-delete-item" onclick="deleteGalleryItem('${cat}', '${item.id}')">Delete</button>
                </div>
            `;
        });
    });

    if (!itemsMarkup) {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">No custom tiles uploaded.</div>`;
    } else {
        listContainer.innerHTML = itemsMarkup;
    }
}

function renderAdminExpertsList() {
    const listContainer = document.getElementById("admin-experts-list");
    if (!listContainer) return;

    let itemsMarkup = "";
    const domains = Object.keys(EXPERT_DATA);

    domains.forEach(domain => {
        const list = EXPERT_DATA[domain] || [];
        list.forEach((exp, index) => {
            itemsMarkup += `
                <div class="admin-item-row" data-domain="${domain}" data-index="${index}">
                    <div class="admin-item-info">
                        <div class="admin-item-text">
                            <h5>${exp.name}</h5>
                            <span>${domain} — ${exp.role} (${exp.company})</span>
                        </div>
                    </div>
                    <button class="btn-delete-item" onclick="deleteExpertItem('${domain}', ${index})">Delete</button>
                </div>
            `;
        });
    });

    if (!itemsMarkup) {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">No support experts listed.</div>`;
    } else {
        listContainer.innerHTML = itemsMarkup;
    }
}

function renderAdminSkillsList() {
    const listContainer = document.getElementById("admin-skills-list");
    if (!listContainer) return;

    let itemsMarkup = "";
    if (SKILLS_DATA) {
        const domains = Object.keys(SKILLS_DATA);
        domains.forEach(domain => {
            const list = SKILLS_DATA[domain] || [];
            list.forEach((skill, index) => {
                itemsMarkup += `
                    <div class="admin-item-row" data-domain="${domain}" data-index="${index}">
                        <div class="admin-item-info">
                            <div class="admin-item-text">
                                <h5>${skill}</h5>
                                <span>${domain}</span>
                            </div>
                        </div>
                        <button class="btn-delete-item" onclick="deleteSkillItem('${domain}', ${index})">Delete</button>
                    </div>
                `;
            });
        });
    }

    if (!itemsMarkup) {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">No supported skills listed.</div>`;
    } else {
        listContainer.innerHTML = itemsMarkup;
    }
}

window.deleteSkillItem = async function(domain, index) {
    if (!confirm("Are you sure you want to delete this supported skill?")) return;

    const sbSettings = getSupabaseSettings();
    const useSupabase = sbSettings.url && sbSettings.key;

    const originalList = JSON.parse(JSON.stringify(SKILLS_DATA || {}));
    const targetSkill = originalList[domain] ? originalList[domain][index] : null;
    SKILLS_DATA[domain].splice(index, 1);

    if (SKILLS_DATA[domain].length === 0) {
        delete SKILLS_DATA[domain];
    }

    const settings = getGitHubSettings();
    const useGitHub = settings.username && settings.repo && settings.token;

    if (useSupabase && targetSkill) {
        try {
            await querySupabase(`skills?and=(name.eq.${targetSkill},domain.eq.${domain})`, "DELETE");
            localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
            alert("Skill deleted from Supabase successfully!");
        } catch (e) {
            console.error(e);
            SKILLS_DATA = originalList;
            alert(`Failed to delete from Supabase: ${e.message}`);
        }
    } else if (useGitHub) {
        try {
            await commitToGitHub("skills.json", SKILLS_DATA, `admin: delete skill ${domain} index ${index}`);
            localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
            alert("Skill deleted from repository successfully!");
        } catch (e) {
            console.error(e);
            SKILLS_DATA = originalList;
            alert(`Failed to delete skill from GitHub: ${e.message}`);
        }
    } else {
        localStorage.setItem("techman_skills_data", JSON.stringify(SKILLS_DATA));
        alert("Skill deleted locally (preview mode)!");
    }

    initTeamSection();
    renderAdminSkillsList();
};

window.deleteGalleryItem = async function(category, id) {
    if (!confirm("Are you sure you want to delete this screenshot tile?")) return;

    const sbSettings = getSupabaseSettings();
    const useSupabase = sbSettings.url && sbSettings.key;

    const originalGallery = JSON.parse(JSON.stringify(GALLERY_DATA));
    GALLERY_DATA[category] = GALLERY_DATA[category].filter(item => item.id !== id);

    const settings = getGitHubSettings();
    const useGitHub = settings.username && settings.repo && settings.token;

    if (useSupabase) {
        try {
            await querySupabase(`gallery?id=eq.${id}`, "DELETE");
            localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
            alert("Screenshot deleted from Supabase successfully!");
        } catch (e) {
            console.error(e);
            GALLERY_DATA = originalGallery;
            alert(`Failed to delete from Supabase: ${e.message}`);
        }
    } else if (useGitHub) {
        try {
            await commitToGitHub("gallery.json", GALLERY_DATA, `admin: delete screenshot ${id}`);
            localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
            alert("Screenshot deleted from GitHub successfully!");
        } catch (e) {
            console.error(e);
            GALLERY_DATA = originalGallery; // rollback
            alert(`Failed to delete from GitHub: ${e.message}`);
        }
    } else {
        localStorage.setItem("techman_gallery_data", JSON.stringify(GALLERY_DATA));
        alert("Screenshot deleted locally (preview mode)!");
    }

    renderGallery(currentGalleryCategory);
    renderAdminDashboardList();
};

window.deleteExpertItem = async function(domain, index) {
    if (!confirm("Are you sure you want to delete this support expert?")) return;

    const sbSettings = getSupabaseSettings();
    const useSupabase = sbSettings.url && sbSettings.key;

    const originalList = JSON.parse(JSON.stringify(EXPERT_DATA));
    const targetExpert = originalList[domain] ? originalList[domain][index] : null;
    EXPERT_DATA[domain].splice(index, 1);
    
    if (EXPERT_DATA[domain] && EXPERT_DATA[domain].length === 0) {
        delete EXPERT_DATA[domain];
    }
    
    const settings = getGitHubSettings();
    const useGitHub = settings.username && settings.repo && settings.token;

    if (useSupabase && targetExpert) {
        try {
            await querySupabase(`experts?and=(name.eq.${targetExpert.name},domain.eq.${domain})`, "DELETE");
            localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
            alert("Expert deleted from Supabase successfully!");
        } catch (e) {
            console.error(e);
            EXPERT_DATA = originalList;
            alert(`Failed to delete from Supabase: ${e.message}`);
        }
    } else if (useGitHub) {
        try {
            await commitToGitHub("experts.json", EXPERT_DATA, `admin: delete expert ${domain} index ${index}`);
            localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
            alert("Expert deleted from repository successfully!");
        } catch (e) {
            console.error(e);
            EXPERT_DATA = originalList; // rollback
            alert(`Failed to delete expert from GitHub: ${e.message}`);
        }
    } else {
        localStorage.setItem("techman_experts_data", JSON.stringify(EXPERT_DATA));
        alert("Expert deleted locally (preview mode)!");
    }

    const remainingDomains = Object.keys(EXPERT_DATA);
    if (remainingDomains.length > 0) {
        if (!remainingDomains.includes(currentDomain)) {
            currentDomain = remainingDomains[0];
        }
    } else {
        currentDomain = "";
    }

    initTeamSection();
    renderAdminExpertsList();
};

function renderPricingPlans() {
    const grid = document.getElementById("pricing-grid");
    if (!grid || !PRICING_DATA) return;

    grid.innerHTML = PRICING_DATA.map(plan => {
        const popularClass = plan.popular ? "popular" : "";
        const badgeMarkup = plan.popular ? `<div class="popular-badge">MOST POPULAR</div>` : "";
        const buttonClass = plan.popular ? "btn-primary" : "btn-secondary";
        const buttonText = {
            "plan-practice": "Test Setup",
            "plan-mock": "Book Session",
            "plan-proxy": "Hire Support",
            "plan-cert": "Pass Certification",
            "plan-support": "Select Plan"
        }[plan.id] || "Select Plan";

        const priceMarkup = plan.price === "FREE" 
            ? `<span class="price" style="font-size: 2.5rem;">FREE</span>`
            : `<span class="currency">$</span><span class="price">${plan.price}</span>`;

        const benefitsMarkup = plan.benefits.map(benefit => `
            <li>
                <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg> 
                ${benefit}
            </li>
        `).join("");

        const waLink = `https://wa.me/16418191430?text=${encodeURIComponent(plan.whatsapp_text)}`;

        return `
            <div class="pricing-card ${popularClass}">
                <div class="card-glow"></div>
                ${badgeMarkup}
                <div class="pricing-header">
                    <h3>${plan.title}</h3>
                    <div class="price-container">
                        ${priceMarkup}
                        <span class="period">${plan.period}</span>
                    </div>
                    <p>${plan.desc}</p>
                </div>
                <ul class="pricing-benefits">
                    ${benefitsMarkup}
                </ul>
                <a href="${waLink}" target="_blank" rel="noopener" class="btn ${buttonClass} pricing-cta">${buttonText}</a>
            </div>
        `;
    }).join("");
}

function renderAdminPricingList() {
    const listContainer = document.getElementById("admin-pricing-list");
    if (!listContainer) return;

    let itemsMarkup = "";
    if (PRICING_DATA) {
        PRICING_DATA.forEach(plan => {
            itemsMarkup += `
                <div class="admin-item-row" data-id="${plan.id}">
                    <div class="admin-item-info">
                        <div class="admin-item-text">
                            <h5>${plan.title}</h5>
                            <span>$${plan.price} ${plan.period}</span>
                        </div>
                    </div>
                    <button class="btn-delete-item" onclick="deletePricingItem('${plan.id}')">Delete</button>
                </div>
            `;
        });
    }

    if (!itemsMarkup) {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">No custom pricing plans.</div>`;
    } else {
        listContainer.innerHTML = itemsMarkup;
    }
}

window.deletePricingItem = async function(id) {
    if (!confirm("Are you sure you want to delete this pricing plan?")) return;

    const sbSettings = getSupabaseSettings();
    const useSupabase = sbSettings.url && sbSettings.key;

    const originalList = JSON.parse(JSON.stringify(PRICING_DATA));
    PRICING_DATA = PRICING_DATA.filter(plan => plan.id !== id);

    const settings = getGitHubSettings();
    const useGitHub = settings.username && settings.repo && settings.token;

    if (useSupabase) {
        try {
            await querySupabase(`pricing?id=eq.${id}`, "DELETE");
            localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
            alert("Pricing plan deleted from Supabase successfully!");
        } catch (e) {
            console.error(e);
            PRICING_DATA = originalList;
            alert(`Failed to delete plan from Supabase: ${e.message}`);
        }
    } else if (useGitHub) {
        try {
            await commitToGitHub("pricing.json", PRICING_DATA, `admin: delete pricing plan ${id}`);
            localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
            alert("Pricing plan deleted from GitHub successfully!");
        } catch (e) {
            console.error(e);
            PRICING_DATA = originalList; // rollback
            alert(`Failed to delete plan from GitHub: ${e.message}`);
        }
    } else {
        localStorage.setItem("techman_pricing_data", JSON.stringify(PRICING_DATA));
        alert("Pricing plan deleted locally (preview mode)!");
    }

    renderPricingPlans();
    renderAdminPricingList();
};

function renderAdminSetupList() {
    const listContainer = document.getElementById("admin-setup-list");
    if (!listContainer) return;

    let itemsMarkup = "";
    if (SETUP_STEP_DATA) {
        SETUP_STEP_DATA.forEach(item => {
            itemsMarkup += `
                <div class="admin-item-row" data-step="${item.step}">
                    <div class="admin-item-info">
                        <div class="admin-item-text">
                            <h5>Step ${item.step}: ${item.title}</h5>
                            <span>${item.subtitle}</span>
                        </div>
                    </div>
                    <button class="btn-delete-item" onclick="deleteSetupStep(${item.step})">Delete</button>
                </div>
            `;
        });
    }

    if (!itemsMarkup) {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 20px;">No setup steps configured.</div>`;
    } else {
        listContainer.innerHTML = itemsMarkup;
    }
}

window.deleteSetupStep = async function(stepNum) {
    if (!confirm(`Are you sure you want to delete Step ${stepNum}?`)) return;

    const sbSettings = getSupabaseSettings();
    const useSupabase = sbSettings.url && sbSettings.key;

    const originalList = JSON.parse(JSON.stringify(SETUP_STEP_DATA || []));
    SETUP_STEP_DATA = SETUP_STEP_DATA.filter(s => s.step !== stepNum);

    const settings = getGitHubSettings();
    const useGitHub = settings.username && settings.repo && settings.token;

    if (useSupabase) {
        try {
            await querySupabase("setup_steps?step=eq." + stepNum, "DELETE");
            localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
            alert("Setup step deleted from Supabase successfully!");
        } catch (e) {
            console.error(e);
            SETUP_STEP_DATA = originalList;
            alert(`Failed to delete setup step from Supabase: ${e.message}`);
        }
    } else if (useGitHub) {
        try {
            await commitToGitHub("setup.json", SETUP_STEP_DATA, `admin: delete setup step ${stepNum}`);
            localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
            alert("Setup step deleted from GitHub successfully!");
        } catch (e) {
            console.error(e);
            SETUP_STEP_DATA = originalList; // rollback
            alert(`Failed to delete setup step from GitHub: ${e.message}`);
        }
    } else {
        localStorage.setItem("techman_setup_data", JSON.stringify(SETUP_STEP_DATA));
        alert("Setup step deleted locally (preview mode)!");
    }

    if (SETUP_STEP_DATA.length > 0) {
        currentSetupStep = SETUP_STEP_DATA[0].step;
    } else {
        currentSetupStep = 1;
    }

    initSetupGuide();
    renderAdminSetupList();
};

/* ==========================================================================
   WEATHER-BASED AUTOMATIC THEME SWITCHER
   ========================================================================== */
const WEATHER_THEMES = [
    { name: "default", icon: "🌌", label: "Default" },
    { name: "cold", icon: "❄️", label: "Cold Theme" },
    { name: "spring", icon: "🌸", label: "Spring Theme" },
    { name: "summer", icon: "☀️", label: "Summer Theme" }
];
let activeThemeIndex = 0;

function initWeatherTheme() {
    const widget = document.getElementById("weather-widget");
    if (!widget) return;

    // 1. Manual Click Switcher
    widget.addEventListener("click", () => {
        activeThemeIndex = (activeThemeIndex + 1) % WEATHER_THEMES.length;
        const nextTheme = WEATHER_THEMES[activeThemeIndex];
        applyTheme(nextTheme.name, `Manual: ${nextTheme.label}`, nextTheme.icon);
        localStorage.setItem("techman_manual_theme", nextTheme.name);
    });

    // 2. Local Storage Preference Check
    const savedTheme = localStorage.getItem("techman_manual_theme");
    if (savedTheme) {
        const matchedIndex = WEATHER_THEMES.findIndex(t => t.name === savedTheme);
        if (matchedIndex !== -1) {
            activeThemeIndex = matchedIndex;
            applyTheme(savedTheme, `Saved: ${WEATHER_THEMES[matchedIndex].label}`, WEATHER_THEMES[matchedIndex].icon);
            return;
        }
    }

    // 3. Geolocation Weather Detection (via Open-Meteo)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
                    const weatherData = await res.json();
                    
                    if (weatherData && weatherData.current_weather) {
                        const temp = weatherData.current_weather.temperature;
                        
                        let detectedTheme = "spring";
                        let icon = "🌸";
                        if (temp < 15) {
                            detectedTheme = "cold";
                            icon = "❄️";
                        } else if (temp > 25) {
                            detectedTheme = "summer";
                            icon = "☀️";
                        }
                        
                        applyTheme(detectedTheme, `${temp}°C Local`, icon);
                        activeThemeIndex = WEATHER_THEMES.findIndex(t => t.name === detectedTheme);
                    } else {
                        fallbackSeasonalTheme("API Error");
                    }
                } catch (e) {
                    fallbackSeasonalTheme("Network Fallback");
                }
            },
            (err) => {
                fallbackSeasonalTheme("Geo Blocked");
            },
            { timeout: 4000 }
        );
    } else {
        fallbackSeasonalTheme("No Geolocation");
    }
}

function fallbackSeasonalTheme(reason) {
    const month = new Date().getMonth(); // 0 to 11
    let detectedTheme = "default";
    let icon = "🌌";
    let label = "Default";

    if (month === 11 || month === 0 || month === 1) { // Dec, Jan, Feb
        detectedTheme = "cold";
        icon = "❄️";
        label = "Cold Mode";
    } else if (month >= 2 && month <= 4) { // Mar, Apr, May
        detectedTheme = "spring";
        icon = "🌸";
        label = "Spring Mode";
    } else if (month >= 5 && month <= 7) { // Jun, Jul, Aug
        detectedTheme = "summer";
        icon = "☀️";
        label = "Summer Mode";
    } else { // Sep, Oct, Nov
        detectedTheme = "spring"; // Autumn
        icon = "🍁";
        label = "Autumn Mode";
    }

    applyTheme(detectedTheme, `${label} (${reason})`, icon);
    activeThemeIndex = WEATHER_THEMES.findIndex(t => t.name === detectedTheme);
}

function applyTheme(themeClass, displayLabel, icon) {
    // Clear previous theme body classes
    document.body.classList.remove("theme-cold", "theme-summer", "theme-spring");
    
    // Add active theme class
    if (themeClass !== "default") {
        document.body.classList.add(`theme-${themeClass}`);
    }

    // Update widget UI
    const iconEl = document.querySelector(".weather-icon");
    const tempEl = document.getElementById("weather-temp");
    if (iconEl) iconEl.textContent = icon;
    if (tempEl) tempEl.textContent = displayLabel;
}



