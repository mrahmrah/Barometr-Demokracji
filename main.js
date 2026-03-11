import { GoogleGenerativeAI } from "@google/generative-ai";
import { glossary } from './glossary';
import { samples } from './data/samples';
import { modelAnalyses } from './data/model_analyses';

// --- State Management ---
let currentQuiz = null;
let sensitivityScore = 0;
let currentSensitivityIndex = 0;

// --- DOM References ---
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// --- Landing Page & Navigation Logic ---
const landingCards = document.querySelectorAll('.landing-card');
const landingView = document.getElementById('landing-view');
const dashboardView = document.getElementById('dashboard-view');
const homeLink = document.getElementById('home-link');

landingCards.forEach(card => {
    card.addEventListener('click', () => {
        const targetTabId = card.getAttribute('data-target');
        
        // Map landing card data-target to actual tab data-tab values
        const tabMap = {
            'analityk': 'analityk',
            'weryfikator': 'weryfikator',
            'slownik': 'glossary',
            'przyklady': 'przyklady'
        };
        const tabId = tabMap[targetTabId] || targetTabId;
        
        // Find corresponding tab button (tabs use data-tab, not data-target)
        const targetTabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        if (targetTabBtn) {
            targetTabBtn.click();
        }

        // Fade out landing page
        landingView.classList.add('fade-out');
        
        // Show dashboard with slight delay for smooth transition
        setTimeout(() => {
            landingView.style.display = 'none';
            dashboardView.classList.remove('hidden');
        }, 500);
    });
});

if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hide dashboard
        dashboardView.classList.add('hidden');
        
        // Show landing page
        landingView.style.display = 'flex';
        
        // Trigger reflow to restart animation
        void landingView.offsetWidth;
        
        landingView.classList.remove('fade-out');
    });
}

// --- Tab Switching Logic ---
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${target}-tab`).classList.add('active');
        
        if (target === 'przyklady') renderSamples();
        if (target === 'glossary') renderGlossary();
    });
});

// --- Test Tab Sub-navigation ---
const testNavButtons = document.querySelectorAll('.test-nav-btn');
const testViews = document.querySelectorAll('.test-view');

testNavButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-test');
        testNavButtons.forEach(b => b.classList.remove('active'));
        testViews.forEach(v => v.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${target}-test-view`).classList.add('active');
    });
});

// --- Independent Test Data (Democratic Sensitivity) ---
// 5 Single Choice, 5 Multiple Choice
const sensitivityQuestions = [
    {
        type: 'single',
        question: "Władze miasta zakazują kontrowersyjnej wystawy, twierdząc, że 'może ona obrażać uczucia części mieszkańców'. Twoja ocena?",
        options: [
            "To słuszna decyzja, spokój społeczny jest najważniejszy.",
            "To naruszenie wolności słowa i pluralizmu, nawet jeśli treść jest kontrowersyjna.",
            "Zakaz powinien dotyczyć tylko wystaw religijnych."
        ],
        correct: [1],
        explanation: "Fundamentem demokracji jest wolność ekspresji, która chroni również treści niepopularne lub kontrowersyjne."
    },
    {
        type: 'single',
        question: "Gazeta publikuje artykuł ostro krytykujący premiera. Rząd domaga się wycofania nakładu. To jest:",
        options: [
            "Próba wprowadzenia cenzury prewencyjnej.",
            "Dbanie o autorytet państwa.",
            "Słuszna walka z fake newsami (bez sprawdzania faktów)."
        ],
        correct: [0],
        explanation: "Popyt na krytykę władzy jest częścią mechanizmu kontroli demokratycznej."
    },
    {
        type: 'single',
        question: "Polityk podczas debaty mówi: 'Każdy prawdziwy Polak wie, że te zmiany są konieczne'. Co tu widzisz?",
        options: [
            "Zwykły patriotyzm.",
            "Manipulację opartą na wykluczeniu (psia gwizdka/dychotomia).",
            "Merytoryczny argument gospodarczy."
        ],
        correct: [1],
        explanation: "Używanie zwrotu 'prawdziwy X' sugeruje, że oponenci nie należą do wspólnoty, co buduje polaryzację."
    },
    {
        type: 'single',
        question: "Zasada domniemania niewinności oznacza, że:",
        options: [
            "Każdy jest niewinny, póki policja go nie złapie.",
            "Każdy jest niewinny, dopóki wina nie zostanie udowodniona prawomocnym wyrokiem.",
            "Tylko osoby bogate mogą być uznane za niewinne."
        ],
        correct: [1],
        explanation: "To kluczowy standard ochrony praw jednostki przed samowolą państwa."
    },
    {
        type: 'single',
        question: "Przed wyborami zmienia się granice okręgów tak, by faworyzować partię rządzącą. To technika:",
        options: [
            "Optymalizacji wyborczej.",
            "Gerrymanderingu.",
            "Decentralizacji."
        ],
        correct: [1],
        explanation: "Gerrymandering to manipulacja granicami okręgów w celu wypaczenia wyniku wyborów."
    },
    {
        type: 'multiple',
        question: "Które z poniższych są filarami społeczeństwa obywatelskiego? (Wybierz wszystkie poprawne)",
        options: [
            "Wolność zrzeszania się.",
            "Niezależne media kontrolujące władzę.",
            "Obowiązek głosowania na partię rządzącą."
        ],
        correct: [0, 1],
        explanation: "Społeczeństwo obywatelskie opiera się na oddolnej organizacji i dostępie do niezależnych informacji."
    },
    {
        type: 'multiple',
        question: "Które techniki uznajemy za erystyczne (manipulacyjne)? (Wybierz wszystkie poprawne)",
        options: [
            "Atakowanie argumentów merytorycznych.",
            "Argumentum ad personam.",
            "Fałszywa dychotomia (szantaż czarno-biały)."
        ],
        correct: [1, 2],
        explanation: "Atakowanie argumentów jest podstawą debaty, natomiast ad personam i fałszywa dychotomia to błędy logiczne i manipulacja."
    },
    {
        type: 'multiple',
        question: "Co chroni obywatela przed samowolą władzy w państwie prawa? (Wybierz wszystkie poprawne)",
        options: [
            "Niezawisłe sądy.",
            "Konstytucja określająca granice władzy.",
            "Możliwość skargi tylko do urzędnika, który wydał decyzję."
        ],
        correct: [0, 1],
        explanation: "Mechanizm 'checks and balances' (hamulców i równowagi) jest kluczowy dla ochrony praw jednostki."
    },
    {
        type: 'multiple',
        question: "Które z tych działań wspierają inkluzywność w debacie publicznej? (Wybierz wszystkie poprawne)",
        options: [
            "Używanie języka szanującego tożsamość rozmówcy.",
            "Dopuszczanie głosów grup mniejszościowych.",
            "Ograniczanie wstępu na spotkania otwarte dla osób o innych poglądach."
        ],
        correct: [0, 1],
        explanation: "Inkluzywność to włączanie różnych perspektyw i szacunek dla godności każdego uczestnika."
    },
    {
        type: 'multiple',
        question: "Zasada trójpodziału władzy zakłada odrębność władzy: (Wybierz wszystkie poprawne)",
        options: [
            "Ustawodawczej.",
            "Religijnej.",
            "Sądowniczej."
        ],
        correct: [0, 2],
        explanation: "Według Monteskiusza władza dzieli się na ustawodawczą, wykonawczą i sądowniczą."
    }
];

// --- Independent Test Implementation ---
const startTestBtn = document.getElementById('start-sensitivity-test');
const testContainer = document.getElementById('standalone-test-container');

startTestBtn.addEventListener('click', () => {
    currentSensitivityIndex = 0;
    sensitivityScore = 0;
    renderSensitivityQuestion();
});

function renderSensitivityQuestion() {
    const q = sensitivityQuestions[currentSensitivityIndex];
    const isMultiple = q.type === 'multiple';
    
    testContainer.innerHTML = `
        <div class="quiz-card fadeIn">
            <div class="quiz-progress" style="margin-bottom: 1rem; color: var(--text-muted); font-size: 0.8rem;">
                Pytanie ${currentSensitivityIndex + 1} z ${sensitivityQuestions.length} • ${isMultiple ? 'Wielokrotny wybór' : 'Jednokrotny wybór'}
            </div>
            <div class="quiz-question">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <div class="quiz-option ${isMultiple ? 'multi' : ''}" data-idx="${i}">
                        ${opt}
                    </div>
                `).join('')}
            </div>
            <div id="test-feedback" class="quiz-feedback hidden" style="margin-top: 1.5rem;"></div>
            <div class="quiz-actions" style="margin-top: 1.5rem; display: flex; gap: 1rem;">
                ${isMultiple ? '<button id="submit-multi-btn" class="primary-btn">Zatwierdź</button>' : ''}
                <button id="next-test-btn" class="primary-btn hidden">Dalej</button>
            </div>
        </div>
    `;

    const options = testContainer.querySelectorAll('.quiz-option');
    let selectedIndices = [];

    options.forEach(opt => {
        opt.addEventListener('click', function() {
            if (testContainer.querySelector('.quiz-card').classList.contains('answered')) return;
            
            const idx = parseInt(this.getAttribute('data-idx'));
            
            if (isMultiple) {
                if (selectedIndices.includes(idx)) {
                    selectedIndices = selectedIndices.filter(i => i !== idx);
                    this.classList.remove('selected');
                } else {
                    selectedIndices.push(idx);
                    this.classList.add('selected');
                }
            } else {
                selectedIndices = [idx];
                options.forEach(o => o.classList.remove('selected'));
                this.classList.add('selected');
                evaluateAnswer(selectedIndices);
            }
        });
    });

    if (isMultiple) {
        document.getElementById('submit-multi-btn').addEventListener('click', () => {
            if (selectedIndices.length === 0) return alert('Wybierz przynajmniej jedną odpowiedź!');
            evaluateAnswer(selectedIndices);
        });
    }

    function evaluateAnswer(selected) {
        const card = testContainer.querySelector('.quiz-card');
        if (card.classList.contains('answered')) return;
        card.classList.add('answered');

        const nextBtn = document.getElementById('next-test-btn');
        const submitBtn = document.getElementById('submit-multi-btn');
        if (submitBtn) submitBtn.classList.add('hidden');
        
        const isCorrect = JSON.stringify(selected.sort()) === JSON.stringify(q.correct.sort());
        
        options.forEach(opt => {
            const idx = parseInt(opt.getAttribute('data-idx'));
            if (q.correct.includes(idx)) {
                opt.classList.add('correct');
            } else if (selected.includes(idx)) {
                opt.classList.add('wrong');
            }
        });

        if (isCorrect) sensitivityScore += 10;

        const feedback = document.getElementById('test-feedback');
        feedback.innerHTML = `<strong>Wyjaśnienie:</strong> ${q.explanation}`;
        feedback.className = `quiz-feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`;
        
        nextBtn.classList.remove('hidden');
    }

    document.getElementById('next-test-btn').addEventListener('click', () => {
        currentSensitivityIndex++;
        if (currentSensitivityIndex < sensitivityQuestions.length) {
            renderSensitivityQuestion();
        } else {
            renderTestResults();
        }
    });
}

function renderTestResults() {
    let message = "";
    if (sensitivityScore >= 90) message = "Twoja wrażliwość demokratyczna jest na najwyższym poziomie. Doskonale rozpoznajesz zagrożenia dla pluralizmu i wolności.";
    else if (sensitivityScore >= 60) message = "Masz dobrą intuicję demokratyczną, ale niektóre subtelne formy manipulacji mogą Ci umknąć. Polecamy zajrzeć do Słowniczka.";
    else message = "Twój wynik wskazuje na potrzebę zgłębienia standardów demokratycznych. Zachęcamy do przeczytania naszego Przewodnika i analizowania tekstów w zakładce Analityk.";

    testContainer.innerHTML = `
        <div class="test-score-result glass fadeIn">
            <h3>Twój Wynik</h3>
            <h2>${sensitivityScore}%</h2>
            <div class="test-feedback">${message}</div>
            <button id="restart-test-btn" class="secondary-btn" style="margin-top: 2rem;">Zacznij od nowa</button>
        </div>
    `;

    document.getElementById('restart-test-btn').addEventListener('click', () => {
        currentSensitivityIndex = 0;
        sensitivityScore = 0;
        renderSensitivityQuestion();
    });
}

// --- Rest of the logic (Analityk, Weryfikator, Glossary, Samples) remains the same ---
// (Keeping it concise for the agent response but fully functional in actual file)

// --- Tab: Analityk ---
document.querySelector('.analyze-democracy-btn').addEventListener('click', function() {
    const input = document.querySelector('#analityk-tab .main-text-input');
    const text = input.value.trim();
    if (!text) return alert('Wklej tekst!');

    startLoading(this);
    
    setTimeout(() => {
        const results = callAnalystAgent(text);
        const display = document.querySelector('#analityk-tab .results-display');
        display.classList.remove('hidden');
        
        updateScore(results.democracy_score, '#analityk-tab');
        
        // Populate Deconstruction Layers
        renderDeconList(results.semantic_deconstruction, '#analityk-semantic-list', 'semantic');
        document.getElementById('analityk-ideological-text').innerText = results.ideological_foundation;
        renderDeconList(results.logical_errors, '#analityk-logical-list', 'logical');
        renderSimpleList(results.rebuttal_questions, '#analityk-rebuttal-list', 'rebuttal-item');

        renderSimpleList(results.suggestions || [], '#analityk-tab .suggestions-list', 'suggestion-item');
        
        // Populate OGIK Elements
        const ogikContainer = document.getElementById('analityk-ogik-metrics');
        ogikContainer.classList.remove('hidden');
        
        // Emotion Meter
        const emotionPointer = document.getElementById('analityk-emotion-pointer');
        setTimeout(() => { emotionPointer.style.left = `${results.emotional_temperature}%`; }, 100);
        
        // Dogma Counter
        const dogmaValue = document.getElementById('analityk-dogma-value');
        const dogmaTooltip = document.getElementById('analityk-dogma-tooltip');
        dogmaValue.innerText = results.dogma_counter.length;
        if (results.dogma_counter.length > 0) {
            dogmaTooltip.innerHTML = `<h4>Wykryte Dogmaty (${results.dogma_counter.length}):</h4><ul>` + 
                results.dogma_counter.map(d => `<li>${d}</li>`).join('') + `</ul>`;
        } else {
            dogmaTooltip.innerHTML = `<span>Brak wykrytych zwrotów dogmatycznych.</span>`;
        }

        // Rephrase Tool
        const rephraseBtn = document.getElementById('analityk-rephrase-btn');
        const rephraseText = document.getElementById('analityk-rephrased-text');
        const rephrasePanel = document.getElementById('analityk-rephrase-panel');
        
        rephraseBtn.classList.remove('hidden');
        rephraseText.innerText = results.rephrased_text;
        
        // Reset panel state if open
        if (!rephrasePanel.classList.contains('hidden')) {
            rephrasePanel.classList.add('hidden');
        }

        const eduResults = callEducatorAgent(text, 'democracy');
        currentQuiz = eduResults.quiz;
        updateQuizPlaceholder();
        
        stopLoading(this);
        display.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

// Rephrase Button Logic
document.getElementById('analityk-rephrase-btn').addEventListener('click', () => {
    const panel = document.getElementById('analityk-rephrase-panel');
    panel.classList.toggle('hidden');
    if (!panel.classList.contains('hidden')) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});

document.getElementById('close-rephrase-btn').addEventListener('click', () => {
    document.getElementById('analityk-rephrase-panel').classList.add('hidden');
});

// --- Tab: Weryfikator ---
document.querySelector('.verify-eristics-btn').addEventListener('click', function() {
    const input = document.querySelector('#weryfikator-tab .main-text-input');
    const text = input.value.trim();
    if (!text) return alert('Wklej tekst!');

    startLoading(this);
    
    setTimeout(() => {
        const results = callVerifierAgent(text);
        const display = document.querySelector('#weryfikator-tab .results-display');
        display.classList.remove('hidden');
        
        // Populate Deconstruction Layers
        renderDeconList(results.semantic_deconstruction, '#weryfikator-semantic-list', 'semantic');
        document.getElementById('weryfikator-ideological-text').innerText = results.ideological_foundation;
        renderDeconList(results.logical_errors, '#weryfikator-logical-list', 'logical');
        renderSimpleList(results.rebuttal_questions, '#weryfikator-rebuttal-list', 'rebuttal-item');

        renderSimpleList(results.counters || [], '#weryfikator-tab .counter-list', 'counter-item');

        const eduResults = callEducatorAgent(text, 'eristics');
        currentQuiz = eduResults.quiz;
        updateQuizPlaceholder();
        
        stopLoading(this);
        display.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
});

// --- Tab: Glossary ---
const glossarySearchInput = document.getElementById('glossary-search-input');
const glossaryMenuList = document.getElementById('glossary-menu-list');
const glossaryDetailPanel = document.getElementById('glossary-detail-panel');
let currentGlossaryCategory = 'all';

glossarySearchInput.addEventListener('input', (e) => {
    renderGlossary(e.target.value);
});

// Category filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentGlossaryCategory = this.getAttribute('data-category');
        renderGlossary(glossarySearchInput.value);
    });
});

function renderGlossary(filterText = '') {
    glossaryMenuList.innerHTML = '';
    
    const filtered = glossary.filter(item => {
        const matchesSearch = item.term.toLowerCase().includes(filterText.toLowerCase()) || 
                             item.definition.toLowerCase().includes(filterText.toLowerCase());
        const matchesCategory = currentGlossaryCategory === 'all' || item.category === currentGlossaryCategory;
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        glossaryMenuList.innerHTML = '<div class="empty-state">Brak haseł</div>';
        return;
    }

    filtered.forEach((item, index) => {
        const btn = document.createElement('button');
        btn.className = 'glossary-menu-item';
        btn.innerText = item.term;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.glossary-menu-item').forEach(i => i.classList.remove('active'));
            btn.classList.add('active');
            renderGlossaryDetail(item);
        });
        glossaryMenuList.appendChild(btn);
    });

    // Auto-load first item if available
    if (filtered.length > 0) {
        const firstItem = glossaryMenuList.children[0];
        if (firstItem && firstItem.classList.contains('glossary-menu-item')) {
            firstItem.click();
        }
    }
}

function renderGlossaryDetail(item) {
    glossaryDetailPanel.innerHTML = `
        <div class="fadeIn">
            <div class="detail-category">${item.category.replace('_', ' ')}</div>
            <h2 class="detail-title">${item.term}</h2>
            <div class="detail-definition">${item.definition}</div>
            <div class="detail-example-box">
                <div class="detail-example-text">"${item.example}"</div>
            </div>
        </div>
    `;
}

function renderSamples() {
    const container = document.querySelector('.samples-grid');
    if (container.children.length > 0) return;

    samples.forEach(sample => {
        const card = document.createElement('div');
        card.className = 'sample-card glass';
        // Check if sample has a specific id to handle routing later if needed
        card.setAttribute('data-id', sample.id);
        
        let tagColorAttr = '';
        if (sample.category === 'populism' || sample.category === 'hate_speech' || sample.category === 'eristic') {
            tagColorAttr = 'style="color: var(--error-color);"';
        } else if (sample.category === 'democracy_manifesto') {
            tagColorAttr = 'style="color: var(--success-color);"';
        }

        const tagMap = {
            'populism': 'Populizm',
            'eristic': 'Erystyka',
            'hate_speech': 'Mowa Nienawiści',
            'neutral': 'Neutralny',
            'democracy_manifesto': 'Zasady Demokratyczne',
            'nuanced_manipulation': 'Subtelna Manipulacja'
        };

        card.innerHTML = `
            <span class="sample-tag" ${tagColorAttr}>${tagMap[sample.category] || sample.category}</span>
            <h3>${sample.title}</h3>
            <p>${sample.content.substring(0, 100)}...</p>
            <div class="sample-description-tooltip">${sample.description}</div>
        `;
        card.addEventListener('click', () => {
            const input = document.querySelector('#analityk-tab .main-text-input');
            input.value = sample.content;
            tabs[0].click();
            input.focus();
        });
        container.appendChild(card);
    });
}

// --- Helpers ---
function startLoading(btn) {
    btn.classList.add('loading');
    btn.disabled = true;
}

function stopLoading(btn) {
    btn.classList.remove('loading');
    btn.disabled = false;
}

function renderSimpleList(items, selector, className) {
    const list = document.querySelector(selector);
    if (!list) return;
    list.innerHTML = '';
    items.forEach((item, i) => {
        const li = document.createElement('li');
        li.className = className;
        li.innerText = typeof item === 'string' ? item : item.point;
        if (item.type) li.classList.add(item.type);
        list.appendChild(li);
    });
}

function renderDeconList(items, selector, type) {
    const container = document.querySelector(selector);
    if (!container) return;
    container.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = `decon-item-card ${type}-item`;
        
        if (type === 'semantic') {
            card.innerHTML = `
                <div class="item-fragment">"${item.fragment}"</div>
                <div class="item-analysis">${item.analysis}</div>
                <div class="item-impact"><strong>Wpływ:</strong> ${item.impact}</div>
            `;
        } else if (type === 'logical') {
            card.innerHTML = `
                <div class="item-tech-name">${item.technique_name}</div>
                <div class="item-quote">"${item.quote}"</div>
                <div class="item-description">${item.description}</div>
            `;
        }
        container.appendChild(card);
    });
}

function updateScore(score, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const num = container.querySelector('.score-number');
    const circle = container.querySelector('.score-circle');
    const label = container.querySelector('.score-label');
    
    num.innerText = score;
    const circ = 377;
    circle.style.strokeDashoffset = circ - (score / 100) * circ;

    if (score > 70) { label.innerText = 'Wysokie Standardy'; label.style.color = '#10b981'; }
    else if (score > 40) { label.innerText = 'Średnie Ryzyko'; label.style.color = '#f59e0b'; }
    else { label.innerText = 'Krytyczne Naruszenia'; label.style.color = '#ef4444'; }
}

function updateQuizPlaceholder() {
    const container = document.querySelector('.generated-quiz-container');
    if (!container) {
        console.error('CRITICAL: .generated-quiz-container not found in DOM');
        return;
    }
    
    if (!currentQuiz || currentQuiz.length === 0) {
        container.innerHTML = '<div class="quiz-placeholder">Przejdź do zakładki Analityk lub Weryfikator i wykonaj analizę, aby wygenerować test.</div>';
        return;
    }

    console.log('Rendering generated quiz:', currentQuiz);
    let html = '';
    currentQuiz.forEach((q, qIdx) => {
        html += `
            <div class="quiz-card fadeIn" style="margin-bottom: 1.5rem;" data-qidx="${qIdx}">
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options">
                    ${q.options.map(opt => `<div class="quiz-option" data-answer="${opt}">${opt}</div>`).join('')}
                </div>
                <div class="quiz-feedback hidden" style="margin-top: 1rem;">
                    <strong>Odpowiedź:</strong> ${q.explanation}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;

    // Re-attach listeners after innerHTML update
    container.querySelectorAll('.quiz-card').forEach((card, qIdx) => {
        const q = currentQuiz[qIdx];
        const options = card.querySelectorAll('.quiz-option');
        const feedback = card.querySelector('.quiz-feedback');
        
        options.forEach(opt => {
            opt.addEventListener('click', function() {
                if (card.classList.contains('answered')) return;
                card.classList.add('answered');
                const selected = this.getAttribute('data-answer');
                
                if (selected === q.answer) {
                    this.classList.add('correct');
                    feedback.classList.add('feedback-correct');
                } else {
                    this.classList.add('wrong');
                    feedback.classList.add('feedback-wrong');
                    options.forEach(o => { 
                        if (o.getAttribute('data-answer') === q.answer) o.classList.add('correct'); 
                    });
                }
                feedback.classList.remove('hidden');
            });
        });
    });
}

// --- Agent Simulations (Logic from .md skills: Protokół Głębokiej Dekonstrukcji) ---
function getMatchedSampleAnalysis(text) {
    // Basic matching logic to see if text is one of our samples
    for (const sample of samples) {
        if (text.trim() === sample.content.trim()) {
            return modelAnalyses[sample.id];
        }
    }
    return null;
}

function callAnalystAgent(text) {
    const matchedAnalysis = getMatchedSampleAnalysis(text);
    if (matchedAnalysis) {
        return {
            ...matchedAnalysis,
            suggestions: [
                'Przeanalizuj dokładnie wskazane fragmenty semantyczne.',
                'Zwróć uwagę na błędy logiczne i spróbuj zadać pytania obnażające słabość tekstów.'
            ]
        };
    }
    const lower = text.toLowerCase();
    let score = 90;
    const semantic = [];
    const logical = [];
    const rebuttal = ["Czy autor przedstawia dowody na swoje tezy?", "Kto zyskuje na takim postrzeganiu rzeczywistości?"];
    
    // OGIK Protocol additions
    let emotional_temperature = 25; 
    let dogma_counter = [];
    let rephrased_text = "Warto pochylić się nad omawianymi zagadnieniami i wspólnie poszukać konstruktywnych rozwiązań, minimalizując skrajne emocje.";

    if (lower.includes('zdrajcy')) {
        score -= 25;
        emotional_temperature += 35;
        dogma_counter.push("zdrajcy narodu");
        semantic.push({
            fragment: "zdrajcy",
            analysis: "Termin stygmatyzujący, służący dehumanizacji oponentów.",
            impact: "Buduje mur nienawiści i uniemożliwia dialog demokratyczny."
        });
        rephrased_text = "Osoby posiadające odmienną wizję państwa również mają prawo głosu. Zamiast eskalować konflikt, poszukajmy płaszczyzny porozumienia.";
    }

    if (lower.includes('elity')) {
        score -= 10;
        emotional_temperature += 15;
        semantic.push({
            fragment: "elity",
            analysis: "Użycie pejoratywne w celu budowania resentymentu populistycznego.",
            impact: "Podważa zaufanie do wiedzy eksperckiej i instytucji."
        });
    }

    if (lower.includes('prawdziwy')) {
        score -= 15;
        emotional_temperature += 10;
        dogma_counter.push("prawdziwych Polaków");
        semantic.push({
            fragment: "prawdziwy",
            analysis: "Słowo-wytrych (weasel word) definiujące arbitralnie granice wspólnoty.",
            impact: "Wyklucza osoby o innych poglądach z kręgu 'swoich'."
        });
    }

    if (lower.includes('zdrajcy') || lower.includes('marionetki')) {
        logical.push({
            technique_name: "Ad Hominem",
            description: "Atak na moralność lub lojalność osób zamiast merytorycznej dyskusji z ich argumentami.",
            quote: lower.includes('zdrajcy') ? "...zdrajcy narodu..." : "...marionetki obcych mocarstw..."
        });
    }

    let ideological = "Tekst opiera się na binarnym podziale 'my vs oni'. Podważa pluralizm jako wartość demokratyczną.";
    if (score > 80) ideological = "Tekst zachowuje standardy pluralizmu i odwołuje się do merytorycznych argumentów.";

    // Cap temperature
    emotional_temperature = Math.min(100, emotional_temperature);

    return { 
        democracy_score: Math.max(0, Math.min(100, score)), 
        semantic_deconstruction: semantic,
        logical_errors: logical,
        ideological_foundation: ideological,
        rebuttal_questions: rebuttal,
        suggestions: [
            'Zastąp emocjonalnie nacechowane epitety konkretnymi zarzutami merytorycznymi.',
            'Unikaj odwoływania się do "jedynie słusznej" tożsamości uczestników debaty.'
        ],
        emotional_temperature: emotional_temperature,
        dogma_counter: dogma_counter,
        rephrased_text: rephrased_text
    };
}

function callVerifierAgent(text) {
    const matchedAnalysis = getMatchedSampleAnalysis(text);
    if (matchedAnalysis) {
        return {
            ...matchedAnalysis,
            counters: [
                'Wskaż na technikę manipulacyjną używaną w tekście.',
                'Zdemaskuj luki w logice wykazane w analizie.'
            ]
        };
    }

    const lower = text.toLowerCase();
    const semantic = [];
    const logical = [];
    const rebuttal = ["Jakie są alternatywne rozwiązania tego problemu?", "Dlaczego autor ogranicza wybór tylko do dwóch opcji?"];

    if (lower.includes('marionetki')) {
        semantic.push({
            fragment: "marionetki",
            analysis: "Metafora sugerująca brak podmiotowości i sterowanie z zewnątrz.",
            impact: "Dehumanizuje oponentów i buduje poczucie zagrożenia zewnętrznego."
        });
    }

    if (lower.includes('albo') && lower.includes('reformy') && lower.includes('chaos')) {
        logical.push({
            technique_name: "Falsa Dichotomia",
            description: "Prezentowanie złożonego problemu jako wyboru między dwiema skrajnościami (szantaż emocjonalny).",
            quote: "Albo poprzecie nasze reformy... albo czeka nas całkowity chaos."
        });
    }

    if (lower.includes('a co robiliście') || lower.includes('a za waszych')) {
        logical.push({
            technique_name: "Whataboutism",
            description: "Odwracanie uwagi od problemu poprzez wskazywanie na inne, często niepowiązane błędy oponentów.",
            quote: "A co robiliście wy, gdy zamykano kopalnie?"
        });
    }

    return { 
        democracy_score: 35,
        semantic_deconstruction: semantic,
        logical_errors: logical,
        ideological_foundation: "Narracja oparta na polaryzacji i podważaniu legitymacji oponentów oraz instytucji.",
        rebuttal_questions: rebuttal,
        counters: [
            'Wskaż na technikę ad personam i poproś o powrót do meritum sprawy.',
            'Zdemaskuj fałszywy dylemat, pokazując alternatywne rozwiązania.',
            'Zauważ próbę whataboutismu i wróć do pytania o reformy sądownictwa.'
        ] 
    };
}

function callEducatorAgent(text, analysisType) {
    // Generates a simple quiz based on the detected issues
    const lower = text.toLowerCase();
    let question = "Jaka jest główna lekcja z tego tekstu?";
    let options = ["Należy być krytycznym", "Tekst jest poprawny", "Nic nie wiadomo"];
    let answer = "Należy być krytycznym";
    let explanation = "Każdy przekaz w sferze publicznej warto analizować pod kątem intencji nadawcy.";

    if (lower.includes('zdrajcy')) {
        question = "Jakie zagrożenie niesie używanie słowa 'zdrajcy' w debacie?";
        options = ["Buduje patriotyzm", "Wyklucza i polaryzuje społeczeństwo", "Jest konieczne w polityce"];
        answer = "Wyklucza i polaryzuje społeczeństwo";
        explanation = "Stygmatyzacja oponentów politycznych utrudnia dialog i podważa fundamenty pluralizmu.";
    }

    return {
        quiz: [{ question, options, answer, explanation }]
    };
}

document.querySelectorAll('.clear-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.closest('.tab-content');
        tab.querySelector('.main-text-input').value = '';
        tab.querySelector('.results-display').classList.add('hidden');
        
        // Hide OGIK extensions
        const ogikContainer = tab.querySelector('.ogik-metrics');
        if (ogikContainer) ogikContainer.classList.add('hidden');
        const rephraseBtn = tab.querySelector('.rephrase-btn');
        if (rephraseBtn) rephraseBtn.classList.add('hidden');
        const rephrasePanel = tab.querySelector('.rephrase-panel');
        if (rephrasePanel) rephrasePanel.classList.add('hidden');
    });
});
// --- INTEGRACJA Z GEMINI AI ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey); 

const analyzeBtn = document.querySelector('.analyze-democracy-btn');
const mainInput = document.querySelector('.main-text-input');

if (analyzeBtn && mainInput) {
    analyzeBtn.addEventListener('click', async () => {
        if (!apiKey) {
            return alert("BŁĄD: Kod nie widzi klucza API! Sprawdź Settings w Vercel.");
        }

        const text = mainInput.value;
        if (!text) return alert("Wklej tekst do analizy!");

        analyzeBtn.style.opacity = "0.5";
        analyzeBtn.innerText = "Analizuję...";

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
            const result = await model.generateContent(`Przeanalizuj krótko pod kątem standardów demokratycznych: ${text}`);
            const response = await result.response;
            alert("SUKCES! AI odpowiada: " + response.text());
        } catch (error) {
            alert("Błąd połączenia: " + error.message);
        } finally {
            analyzeBtn.style.opacity = "1";
            analyzeBtn.innerText = "Analizuj standardy";
        }
    });
}