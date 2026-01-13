/**
 * AHMED DEMIR - PORTFOLIO LOGIC
 * Includes: Menu, Form, Terminal, Certifications, and 3D Effects.
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
        terminalModal.classList.add('hidden');
        terminalOutput.innerHTML = "";
    };

    if (closeBtn) closeBtn.addEventListener('click', closeAction);

    // Modal backdrop
if (terminalModal) {
    terminalModal.addEventListener('click', (e) => {
        
        if (e.target === terminalModal) {
            closeAction();
        }
    });
}

// ESC 
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !terminalModal.classList.contains('hidden')) {
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
                    case 'help':
                    response = "Available: <span class='text-blue-400'>skills</span>, <span class='text-blue-400'>experience</span>, <span class='text-blue-400'>projects</span>,<span class='text-blue-400'> articles</span>,<span class='text-blue-400'> certification</span>,<span class='text-blue-400'>clear</span>";
                    break;
                case 'skills':
                    response = "Core Stack: Java, Python, JavaScript, TS, Selenium, Playwright, Cypress, K6, Jenkins, SQL.";
                    break;
                case 'experience':
                    response = "Latest: QA Engineer @ Amega | Prev: SDET @ BDSwiss, Mersys.";
                    break;
                case 'projects':
                    response = "8 Featured Projects loaded. Check 'Projects' section for details.";
                    break;
                case 'articles':
                    response = "6 articles loaded. Check 'Technical Insights' section for details.";
                    break;
                case 'certification':
                   response = "ISTQB, SDET, Jmeter, Cypress ,Python"
                    break;
                  case 'clear':
                    terminalOutput.innerHTML = "";
                terminalInput.value = "";
                return;
                case '': response = ""; break;
                default:
                    response = `Command not found: ${cmd}. Type <span class='text-yellow-400'>'help'</span>.`;
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

    // 5. CERTIFICATION RENDERER
    const certData = [
        {
            title: "ISTQB Foundation Level",
            issuer: "Turkish Testing Board",
            id: "0224 CTFL 6532",
            date: "Feb 2023",
            description: "Comprehensive mastery of software testing lifecycle.",
            tags: ["Black-Box", "Risk Analysis", "SDLC"],
            verifyLink: "istqb-foundation-level.pdf",
            icon: "fa-shield-alt"
        },
        {
        title: "Generative AI in Testing",
        issuer: "ShiftSync Community",
        id: "0746dc6e1...",
        date: "Jan 2026",
        description: "Mastered AI-powered testing techniques and prompt engineering to optimize QA workflows and model evaluations.",
        tags: ["Prompt Eng.", "LLM Testing", "AI Strategy"],
        verifyLink: "genai_certificate.pdf",
        icon: "fa-brain"
        },
        {
            title: "SQL Mastery",
            issuer: "Udemy",
            id: "UC-5d615f39...", 
            date: "Jan 2026", 
            description: "Advanced SQL certification for backend testing.",
            tags: ["SQL", "DatabaseTesting"],
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
        
        // Initialize 3D Tilt after rendering
        initTiltEffect();
    }

    // 6. 3D TILT EFFECT
    function initTiltEffect() {
        document.querySelectorAll('.cert-card').forEach(card => {
            const inner = card.querySelector('.cert-card-inner');
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

    renderCertificates();
});