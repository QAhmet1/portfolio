/**
 * AHMED DEMIR - PORTFOLIO LOGIC v3
 * Automation for Certifications & Projects included.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. THEME TOGGLE (Dark/Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Smooth transition
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }
    
    function updateThemeIcon(theme) {
        const iconLight = document.getElementById('theme-icon-light');
        const iconDark = document.getElementById('theme-icon-dark');
        const iconLightMobile = document.getElementById('theme-icon-light-mobile');
        const iconDarkMobile = document.getElementById('theme-icon-dark-mobile');
        
        if (theme === 'light') {
            if (iconLight) iconLight.classList.add('hidden');
            if (iconDark) iconDark.classList.remove('hidden');
            if (iconLightMobile) iconLightMobile.classList.add('hidden');
            if (iconDarkMobile) iconDarkMobile.classList.remove('hidden');
        } else {
            if (iconLight) iconLight.classList.remove('hidden');
            if (iconDark) iconDark.classList.add('hidden');
            if (iconLightMobile) iconLightMobile.classList.remove('hidden');
            if (iconDarkMobile) iconDarkMobile.classList.add('hidden');
        }
    }
    
    // Mobile theme toggle
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // 1. MOBILE MENU LOGIC
    const mobileMenuBtn = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 2. FORM SUBMISSION (FORMSPREE)
    const contactForm = document.getElementById("contact-form");
    const contactSubmitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            contactSubmitBtn.disabled = true;
            contactSubmitBtn.innerHTML = '<i class="fas fa-sync fa-spin mr-2"></i> ENCRYPTING...';

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    document.getElementById("success-message").style.display = "block";
                    contactSubmitBtn.innerHTML = 'TRANSMISSION COMPLETE';
                    contactSubmitBtn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        document.getElementById("success-message").style.display = "none";
                        contactSubmitBtn.disabled = false;
                        contactSubmitBtn.innerHTML = 'EXECUTE SEND';
                        contactSubmitBtn.style.background = '#6366f1';
                    }, 5000);
                }
            } catch (error) {
                contactSubmitBtn.innerHTML = 'CONNECTION ERROR';
                contactSubmitBtn.disabled = false;
            }
        });
    }

    // 3. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });

                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // 4. TERMINAL LOGIC
    const terminalModal = document.getElementById('terminal-modal');
    const triggerBtn = document.getElementById('terminal-trigger');
    const closeBtn = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalScreen = document.getElementById('terminal-screen');

    const simulationSteps = [
        { text: "Loading automation engine...", color: "text-slate-400", delay: 400 },
        { text: "Scanning project directories...", color: "text-slate-400", delay: 600 },
        { text: "Running health check on Playwright...", color: "text-yellow-500", delay: 500 },
        { text: "Status: READY ✅", color: "text-green-500 font-bold", delay: 300 }
    ];

    async function runSimulation() {
        if(!terminalOutput) return;
        terminalOutput.innerHTML = "";
        for (const step of simulationSteps) {
            await new Promise(resolve => setTimeout(resolve, step.delay));
            const div = document.createElement('div');
            div.className = step.color;
            div.innerText = `› ${step.text}`;
            terminalOutput.appendChild(div);
            terminalScreen.scrollTop = terminalScreen.scrollHeight;
        }
    }

    if (triggerBtn) {
        triggerBtn.addEventListener('click', () => {
            terminalModal.classList.remove('hidden');
            runSimulation();
            setTimeout(() => terminalInput.focus(), 300);
        });
    }

    const closeAction = () => {
        if (terminalModal) {
            terminalModal.classList.add('hidden');
            terminalOutput.innerHTML = "";
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeAction);

    if (terminalModal) {
        terminalModal.addEventListener('click', (e) => {
            if (e.target === terminalModal) closeAction();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalModal && !terminalModal.classList.contains('hidden')) {
            closeAction();
        }
    });

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const fullInput = terminalInput.value;
                const cmd = fullInput.trim().toLowerCase();
                
                if (cmd !== 'clear') {
                    const userCmd = document.createElement('div');
                    userCmd.innerHTML = `<span class="text-green-500">➜</span> <span class="text-blue-400">~/sdet</span> <span class="text-white">${fullInput}</span>`;
                    terminalOutput.appendChild(userCmd);
                }

                let response = "";
                switch(cmd){
                    case 'help': response = "Available: skills, experience, projects, articles, certification, clear"; break;
                    case 'skills': response = "Core Stack: Java, Python, JS, TS, Selenium, Playwright, SQL."; break;
                    case 'experience': response = "Latest: QA Engineer @ Amega | Prev: SDET @ BDSwiss."; break;
                    case 'projects': response = "All automation projects loaded in the Projects section."; break;
                    case 'articles':response = "6 articles loaded. Check 'Technical Insights' section for details."; break;
                    case 'certification': response = "ISTQB, GenAI, SQL Mastery (Udemy) loaded."; break;
                    case 'clear': terminalOutput.innerHTML = ""; terminalInput.value = ""; return;
                    default: response = `Command not found: ${cmd}. Type 'help'.`;
                }

                if (response) {
                    const resDiv = document.createElement('div');
                    resDiv.className = "text-slate-500 pl-4 border-l border-slate-800 my-1";
                    resDiv.innerHTML = response;
                    terminalOutput.appendChild(resDiv);
                }
                terminalInput.value = "";
                terminalScreen.scrollTop = terminalScreen.scrollHeight;
            }
        });
    }

    // 5. CERTIFICATION DATA & RENDERER
    const certData = [
        {
            title: "ISTQB Foundation Level",
            issuer: "Turkish Testing Board",
            id: "0224 CTFL 6532",
            date: "Feb 2023",
            description: "Comprehensive mastery of software testing lifecycle, risk management, and testing techniques.",
            tags: ["Black-Box", "Risk Analysis", "SDLC"],
            verifyLink: "istqb-foundation-level.pdf",
            icon: "fa-shield-alt"
        },
        {
            title: "Generative AI in Testing",
            issuer: "ShiftSync Community",
            id: "0746dc6e1...",
            date: "Jan 2026",
            description: "Mastered AI-powered testing techniques and prompt engineering to optimize QA workflows.",
            tags: ["Prompt Eng.", "LLM Testing", "AI Strategy"],
            verifyLink: "genai_certificate.pdf",
            icon: "fa-brain"
        },
        {
            title: "SQL Mastery",
            issuer: "Udemy",
            id: "UC-5d615f39...", 
            date: "Jan 2026", 
            description: "Advanced SQL certification covering relational DB management and complex querying.",
            tags: ["SQL", "DatabaseTesting", "DBeaver"],
            verifyLink: "sql_certificate.pdf",
            icon: "fa-database"
        }
    ];

    function renderCertificates() {
        const container = document.getElementById('certifications-container');
        if (!container) return;
        container.innerHTML = certData.map(cert => `
            <div class="cert-card group">
                <div class="cert-card-inner p-8 rounded-2xl h-full flex flex-col relative overflow-hidden">
                    <div class="flex items-start justify-between mb-8">
                        <div class="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                            <i class="fas ${cert.icon} text-2xl text-blue-400"></i>
                        </div>
                        <div class="text-right">
                            <span class="text-[9px] font-mono text-slate-500 uppercase tracking-tighter block">Verified ID</span>
                            <span class="text-[10px] font-mono text-blue-400">${cert.id}</span>
                        </div>
                    </div>
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">${cert.title}</h3>
                    <p class="text-slate-400 text-sm font-medium mb-4">${cert.issuer}</p>
                    <p class="text-slate-300 text-xs leading-relaxed opacity-80 mb-6">${cert.description}</p>
                    <div class="flex flex-wrap gap-2 mb-8">
                        ${cert.tags.map(tag => `<span class="cert-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center">
                        <span class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">${cert.date}</span>
                        <a href="${cert.verifyLink}" target="_blank" class="cert-verify-btn">Verify</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 6. PROJECTS DATA & RENDERER
    const featuredProjects = [
        {
            tag: "🚀 Case Study:",
            title: "Elite-Playwright-Pytest",
            borderColor: "border-l-blue-500",
            challenge: "Legacy test suites were slow and flaky due to environment inconsistencies, leading to unreliable CI/CD feedback and high maintenance costs.",
            solution: "Architected a Dockerized automation ecosystem using Python and Playwright. Key features include a scalable Page Object Model (POM), parallel execution via pytest-xdist, and seamless GitHub Actions integration with dynamic secret management.",
            impact: "This transformation resulted in a 90% reduction in execution time, shifting the feedback loop from hours to minutes. By achieving total environment isolation, I effectively eliminated 'it works on my machine' errors and stabilized the CI/CD pipeline.",
            link: "https://github.com/QAhmet1/playwright-python-allure-framework",
            image: "images/pytest-playwright.png",
            themeColor: "text-blue-400"
        },
        {
            tag: "Performance Engineering",
            title: "K6 & Grafana Monitoring Stack",
            borderColor: "border-l-yellow-500",
            challenge: "Unpredictable crashes during peak user traffic.",
            solution: "Containerized load tests with real-time observability.",
            impact: "Identified 3 memory leaks before production release.",
            link: "https://github.com/QAhmet1/K6-Performance-Testing",
            image: "images/k6-performance-testing.png ",
            themeColor: "text-yellow-500"
        },
        {
            tag: "Data Analysis",
            title: "3.2M+ User Activity Analysis",
            borderColor: "border-l-green-500",
            challenge: "Correlating massive datasets for churn patterns.",
            solution: "Optimized PostgreSQL queries using CTEs & indexing.",
            impact: "Extracted engagement metrics for 3M+ users.",
            link: "https://github.com/QAhmet1/PostgreSQL-Activity-Analysis",
            image: "images/sql.png",
            themeColor: "text-green-400"
        }
    ];

    const repoHub = [
        { title: "Cypress Test Suite", desc: "E2E coverage for demo apps with custom fixtures.", link: "https://github.com/QAhmet1/cypress" },
        { title: "Postman & Newman", desc: "Automated API validation with GitHub Actions.", link: "https://github.com/QAhmet1/api-automation" },
        { title: "WebDriverIO Mobile", desc: "Cross-platform mobile automation with POM.", link: "https://github.com/QAhmet1/wdio-appium" },
        { title: "Pytest & Appium", desc: "Scalable Python mobile automation.", link: "https://github.com/QAhmet1/Pytest-Appium" },
        { title: "REST API Engine", desc: "Professional-grade API framework with Allure.", link: "https://github.com/QAhmet1/pytest_api" }
    ];

    function renderProjects() {
        const featuredContainer = document.getElementById('featured-projects-container');
        const repoContainer = document.getElementById('repo-hub-container');

        if (featuredContainer) {
            featuredContainer.innerHTML = featuredProjects.map(proj => `
                <div class="card-modern p-8 border-l-4 ${proj.borderColor}">
                    <div class="flex flex-col md:flex-row gap-8">
                        <div class="md:w-3/5">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="tag-modern">${proj.tag}</span>
                                <h3 class="text-2xl font-bold text-white leading-tight">${proj.title}</h3>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 text-xs">
                                <div class="bg-red-500/5 p-3 rounded-xl border border-red-500/10"><p class="text-red-400 font-bold mb-1 uppercase">Challenge</p><p class="text-slate-300">${proj.challenge}</p></div>
                                <div class="bg-blue-500/5 p-3 rounded-xl border border-blue-500/10"><p class="text-blue-400 font-bold mb-1 uppercase">Solution</p><p class="text-slate-300">${proj.solution}</p></div>
                                <div class="bg-green-500/5 p-3 rounded-xl border border-green-500/10"><p class="text-green-400 font-bold mb-1 uppercase">Impact</p><p class="text-slate-300">${proj.impact}</p></div>
                            </div>
                            <div class="flex gap-4">
                                <a href="${proj.link}" target="_blank" class="${proj.themeColor} font-bold flex items-center gap-1 hover:underline">View Code <i class="fab fa-github"></i></a>
                            </div>
                        </div>
                        <div class="md:w-2/5"><img src="${proj.image}" class="rounded-xl opacity-80 border border-white/10" alt="${proj.title}"></div>
                    </div>
                </div>
            `).join('');
        }

        if (repoContainer) {
            repoContainer.innerHTML = repoHub.map(repo => `
                <div class="card-modern p-6 flex flex-col">
                    <h3 class="text-white font-bold mb-2">${repo.title}</h3>
                    <p class="text-xs text-slate-400 mb-4 flex-grow">${repo.desc}</p>
                    <div class="flex gap-4"><a href="${repo.link}" target="_blank" class="text-xs text-blue-400 hover:text-white">Repo <i class="fab fa-github"></i></a></div>
                </div>
            `).join('');
        }
    }

    // 8. ARTICLES DATA & RENDERER
const articleData = [
    {
        title: "e2e API Performance Testing with k6 and Grafana",
        link: "https://medium.com/@ahmetdem6325/from-zero-to-dashboard-end-to-end-api-performance-testing-with-k6-and-grafana-6b7c9a6dd4ac",
        description: "Performance testing is often treated as a “nice-to-have” until something fails in production.",
        readTime: "5 Min Read",
        index: "01",
        isItalic: true
    },
    {
        title: "The Silent Test Killer: How One import Hijacked My WebdriverIO before Hook",
        link: "https://medium.com/javascript-in-plain-english/the-silent-test-killer-how-one-import-hijacked-my-webdriverio-before-hook-d88f3e328348",
        description: "Debugging a ghost: My journey into why my Appium tests were ignoring the setup block, and the one-line fix that solved it all.",
        readTime: "5 Min Read",
        index: "02"
    },
    {
        title: "Common Bug: Why isDisplayed() Might Drive You Crazy",
        link: "https://medium.com/@ahmetdem6325/webdriverio-appiums-most-common-bug-why-isdisplayed-might-drive-you-crazy-928b68be6637",
        description: "If you’ve spent time writing mobile automation tests using WebdriverIO and Appium, chances are you’ve stumbled upon this frustrating error.",
        readTime: "2 Min Read",
        index: "03"
    },
    {
        title: "Cypress -- API Testing",
        link: "https://medium.com/javascript-in-plain-english/cypress-api-testing-a-guide-to-all-http-methods-9bd64d10edc2",
        description: "While Cypress is often celebrated for UI testing, it also excels in API testing. Its robust commands allow you to interact with APIs directly.",
        readTime: "4 Min Read",
        index: "04"
    },
    {
        title: "What is Cypress, and Why Use It?",
        link: "https://medium.com/@ahmetdem6325/getting-started-with-cypress-your-first-step-in-end-to-end-testing-1bdca8df0712",
        description: "Cypress is a modern end-to-end testing framework tailored for web applications, built with a focus on speed, reliability, and simplicity.",
        readTime: "3 Min Read",
        index: "05"
    },
    {
        title: "Cypress Fixtures for Efficient Testing",
        link: "https://medium.com/@ahmetdem6325/cypress-fixtures-for-efficient-testing-d629a065e1a8",
        description: "In the context of Cypress, fixtures refer to external files (usually JSON) that hold mock data.",
        readTime: "3 Min Read",
        index: "06"
    }
];

function renderArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;

    container.innerHTML = articleData.map(art => `
        <a href="${art.link}" target="_blank" class="group relative bg-slate-900/30 border border-white/5 p-8 rounded-3xl hover:border-blue-500/50 transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <i class="fab fa-medium-m text-lg"></i>
                </div>
                <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Article // ${art.index}</span>
            </div>
            <h4 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">${art.title}</h4>
            <p class="text-slate-400 text-sm mt-4 line-clamp-3 ${art.isItalic ? 'italic' : ''}">${art.description}</p>
            <div class="mt-auto pt-8 flex items-center justify-between">
                <span class="text-[10px] font-mono text-slate-600 uppercase italic">${art.readTime}</span>
                <span class="text-blue-500 font-mono text-[10px] font-bold">EXECUTE_READ();</span>
            </div>
        </a>
    `).join('');
}

/**
 * EXPERIENCE DATA & RENDERER
 * Optimized with CV details and professional highlights.
 */
const experienceData = [
    {
        role: "QA Engineer",
        company: "Amega",
        location: "Limassol, Cyprus",
        period: "Jan 2025 — Present",
        icon: "fa-microchip",
        colorClass: "blue",
        highlights: [
            { label: "Framework & Automation", text: "Established foundational frameworks from scratch using <span class='tech-highlight'>WDIO, Appium, and Cypress</span>; integrated <span class='tech-highlight'>K6</span> for performance and <span class='tech-highlight'>SQL</span> for data validation." },
            { label: "End-to-End Testing", text: "Conducted rigorous manual and automated testing for functionality, security, and scalability, adhering to stringent quality standards." },
            { label: "Lifecycle Management", text: "Partnered with cross-functional teams to analyze requirements, ensuring 100% test coverage and proactive defect tracking from discovery to resolution." },
            { label: "QA Innovation", text: "Designed and maintained scalable test environments and tools, keeping pace with emerging technologies to drive excellence in QA practices." }
        ]
    },
    {
        role: "Software QA Engineer / SDET",
        company: "BDSwiss",
        location: "Nicosia, Cyprus",
        period: "Feb 2023 — Feb 2025",
        icon: "fa-chart-line",
        colorClass: "green",
        highlights: [
            { label: "Hybrid Testing Mastery", text: "Performed manual and automation testing across <span class='tech-highlight'>Android, iOS, and Web</span> platforms using <span class='tech-highlight'>Appium (Python)</span> and <span class='tech-highlight'>Cypress</span>." },
            { label: "Strategic Planning", text: "Thoroughly reviewed technical design documents and developed structured Test Plans to identify risks in early development stages." },
            { label: "Regression & Stability", text: "Executed thorough regression suites to validate bug fixes, ensuring new deployments had zero negative impact on existing core functionalities." },
            { label: "Collaborative QA", text: "Liaised with Product Managers and Developers to refine requirements and apply testing processes that aligned with complex business objectives." }
        ]
    },
    {
        role: "Mentor & QA Strategist",
        company: "Techno Study",
        location: "USA (Remote)",
        period: "Apr 2022 — Oct 2023",
        icon: "fa-user-graduate",
        colorClass: "purple",
        highlights: [
            { label: "Hands-on Training", text: "Provided mentorship on best practices in coding, test automation frameworks, and effective execution techniques to over 100+ mentees." },
            { label: "Skill Refinement", text: "Delivered actionable feedback on real-world testing scenarios, empowering mentees to build confidence in professional QA environments." },
            { label: "Structured Learning", text: "Ensured adherence to established methodologies and milestones, fostering a high-standard learning ecosystem for future SDETs." }
        ]
    },
    {
        role: "Test Automation Engineer",
        company: "Mersys",
        location: "Frankfurt, Germany (Remote)",
        period: "Aug 2020 — Feb 2023",
        icon: "fa-laptop-code",
        colorClass: "yellow",
        highlights: [
            { label: "Tech Stack Excellence", text: "Designed and executed automation scripts using <span class='tech-highlight'>Java, Selenium, TestNG, and RestAssured</span>; managed data with <span class='tech-highlight'>MySQL</span> and <span class='tech-highlight'>Postman</span>." },
            { label: "Performance & API", text: "Monitored debugging results and conducted API/Performance testing using <span class='tech-highlight'>JMeter</span>, ensuring backend stability." },
            { label: "Metrics & Tracking", text: "Tracked critical QA metrics such as defect densities and open defect counts to coordinate and prioritize high-impact testing activities." },
            { label: "Agile Triage", text: "Reviewed specifications to provide meaningful feedback and performed thorough regression testing once bugs were resolved." }
        ]
    },
    {
        role: "QA / Intern",
        company: "Mersys",
        location: "Frankfurt, Germany (Remote)",
        period: "Jan 2020 — Aug 2020",
        icon: "fa-seedling",
        colorClass: "orange",
        highlights: [
            { label: "Test Engineering", text: "Developed fundamental skills in <span class='text-white'>Test Engineering</span> and testing processes under professional supervision." },
            { label: "Quality Assurance", text: "Assisted in the identification and documentation of software defects, contributing to the overall product quality." },
            { label: "Process Learning", text: "Gained hands-on experience in the software development lifecycle (SDLC) and participated in cross-functional team meetings." }
        ]
    },
    {
        role: "Physics Teacher",
        company: "PI Analitik",
        location: "Cyprus",
        period: "Aug 2013 — Jun 2019",
        icon: "fa-atom",
        colorClass: "orange",
        highlights: [
            { label: "Analytical Logic", text: "Applied <span class='text-white'>Systematic Problem-Solving</span> to complex scientific models, a direct precursor to the <span class='text-white'>Structured Thinking</span>." },
            { label: "Root Cause Mindset", text: "Utilized theoretical physics principles to develop a high-level <span class='text-white'>Root Cause Analysis</span> mindset for identifying failures." },
            { label: "Mentorship & Lead", text: "Developed strong presentation and <span class='text-white'>Mentorship Skills</span> later utilized in training." }
        ]
    }
];

/**
 * REFINED EXPERIENCE RENDERER
 * Creates a compact, high-impact layout.
 */
function renderExperience() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    container.innerHTML = experienceData.map((exp, index) => {
        // Dynamic color for borders and highlights
        const themeColor = exp.colorClass === 'blue' ? '#3b82f6' : 
                          exp.colorClass === 'green' ? '#10b981' : '#8b5cf6';

        return `
            <div class="experience-wrapper mb-16 relative pl-8 md:pl-0">
                <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
                
                <div class="experience-card group relative p-1 bg-gradient-to-b from-slate-800/50 to-transparent rounded-[2rem]">
                    <div class="bg-slate-950/90 rounded-[1.9rem] p-6 md:p-10 backdrop-blur-xl">
                        
                        <div class="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                            <div class="flex items-center gap-5">
                                <div class="p-4 bg-${exp.colorClass}-500/10 rounded-2xl border border-${exp.colorClass}-500/20">
                                    <i class="fas ${exp.icon} text-3xl text-${exp.colorClass}-400"></i>
                                </div>
                                <div>
                                    <h4 class="text-3xl font-extrabold text-white tracking-tight">${exp.role}</h4>
                                    <p class="text-slate-400 font-medium">${exp.company} <span class="mx-2 text-slate-700">•</span> ${exp.location}</p>
                                </div>
                            </div>
                            <span class="px-4 py-2 rounded-full border border-slate-800 bg-slate-900 text-slate-400 font-mono text-sm">
                                ${exp.period}
                            </span>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            ${exp.highlights.map(h => `
                                <div class="experience-item-box group/item" style="--highlight-color: ${themeColor}">
                                    <div class="flex gap-3">
                                        <span class="text-${exp.colorClass}-500 font-mono mt-1">//</span>
                                        <div>
                                            <h5 class="text-white font-bold text-sm uppercase tracking-wider mb-2 group-hover/item:text-${exp.colorClass}-400 transition-colors">
                                                ${h.label}
                                            </h5>
                                            <p class="text-slate-400 text-sm leading-relaxed">
                                                ${h.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');
}
    /** * SDET Assistant Logic for existing HTML Terminal 
 * No HTML changes required.
 */
const GEMINI_API_KEY = "AIzaSyBkhPKDQWWHk25PPF-Ac29PY6YFmXOK9_8";
let isAiMode = false;

// Context for Gemini based on your CV
const AHMET_CONTEXT = `
  You are Ahmet Demir's Digital Twin. 
  [cite_start]Background: Senior SDET with 5+ years of experience[cite: 5].
  [cite_start]Key Wins: 50% reduction in regression time (from 2 days to 1)[cite: 6].
  [cite_start]Stack: WDIO, Cypress, Appium, Playwright, Selenium, K6[cite: 14, 17].
  [cite_start]Work History: Amega, BDSwiss, Techno Study, Mersys[cite: 32, 41, 50, 57].
`;

// const tInput = document.getElementById('terminal-input');
// const tOutput = document.getElementById('terminal-output');
// The core terminal logic
document.addEventListener('DOMContentLoaded', () => {
    const tInput = document.getElementById('terminal-input');
    const tOutput = document.getElementById('terminal-output');
    const tScreen = document.getElementById('terminal-screen');

    if (!tInput) return; // Guard clause

    tInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const val = tInput.value.trim();
            const cmd = val.toLowerCase();
            tInput.value = ""; // Clear immediately

            // 1. Show User Input
            const userLine = document.createElement('div');
            userLine.className = "text-blue-400 font-bold";
            userLine.innerHTML = `➜ ~/sdet ${val}`;
            tOutput.appendChild(userLine);

            // 2. Logic Controller
            if (cmd === 'ai') {
                isAiMode = true;
                renderSystemMsg("SDET AI Mode: ACTIVE. Talk to Ahmet's twin.");
            } else if (cmd === 'exit') {
                isAiMode = false;
                renderSystemMsg("Standard Mode restored.");
            } else if (isAiMode) {
                await askGemini(val);
            } else {
                handleStandardCommands(cmd);
            }

            // Auto-scroll
            tScreen.scrollTop = tScreen.scrollHeight;
        }
    });

    function renderSystemMsg(msg) {
        const div = document.createElement('div');
        div.className = "text-green-500 italic py-1";
        div.innerText = `› ${msg}`;
        tOutput.appendChild(div);
    }

    function handleStandardCommands(cmd) {
        let resp = "";
        if (cmd === 'help') resp = "Try: ai, clear, about, exit";
        else if (cmd === 'about') resp = "Ahmet Demir is a Senior SDET with 5+ years of experience.";
        else if (cmd === 'clear') { tOutput.innerHTML = ""; return; }
        else resp = `Command '${cmd}' not found. Type 'ai' to start.`;

        const div = document.createElement('div');
        div.className = "text-slate-400 py-1";
        div.innerText = resp;
        tOutput.appendChild(div);
    }
});

async function askGemini(prompt) {
    renderLine("› Thinking...", "text-slate-500 italic", "loading-msg");
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Context: ${AHMET_CONTEXT}\nUser: ${prompt}` }] }]
            })
        });
        const data = await response.json();
        const aiMsg = data.candidates[0].content.parts[0].text;
        
        document.getElementById('loading-msg').remove();
        renderLine(`[AI]: ${aiMsg}`, "text-blue-200 pl-4 border-l border-blue-900");
    } catch (e) {
        renderLine("› Error: Could not connect to Gemini API.", "text-red-500");
    }
}

function renderLine(text, className, id = "") {
    const div = document.createElement('div');
    if (id) div.id = id;
    div.className = className;
    div.innerHTML = text;
    tOutput.appendChild(div);
    document.getElementById('terminal-screen').scrollTop = tOutput.scrollHeight;
}

    // FINAL EXECUTION CALLS
    renderCertificates();
    renderProjects();
    renderArticles();
    renderExperience();
    initTiltEffect();
});