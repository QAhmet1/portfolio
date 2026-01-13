/**
 * AHMED DEMIR - PORTFOLIO LOGIC v3
 * Automation for Certifications & Projects included.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU LOGIC
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

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
            tag: "E2E Ecosystem",
            title: "Advanced Playwright Suite",
            borderColor: "border-l-blue-500",
            challenge: "Legacy regression took 3+ hours with high flakiness.",
            solution: "Implemented parallel POM architecture & custom fixtures.",
            impact: "Reduced execution time to 15 mins (92% improvement).",
            link: "https://github.com/QAhmet1/Playwright_project",
            image: "images/playwright.png",
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
            image: "images/k6-performance-testing.png",
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

    // 7. 3D TILT EFFECT
    function initTiltEffect() {
        document.querySelectorAll('.cert-card').forEach(card => {
            const inner = card.querySelector('.cert-card-inner');
            if(!inner) return;
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = (e.clientX - centerX) / (rect.width / 2);
                const mouseY = (e.clientY - centerY) / (rect.height / 2);
                inner.style.transform = `rotateX(${-mouseY * 8}deg) rotateY(${mouseX * 8}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                inner.style.transition = 'transform 0.5s ease';
                inner.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    // FINAL EXECUTION CALLS
    renderCertificates();
    renderProjects();
    renderArticles();
    initTiltEffect();
});