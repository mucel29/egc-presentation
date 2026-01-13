// ==========================================
// CONFIGURATION
// ==========================================

const SKIP_BOOT = false;

const STUDENT_NAME = "Student: Asavoae Cosmin-Ștefan";
const STUDENT_GROUP = "Grupa:   331CD";
const GITHUB_LABEL = "GitHub:  ";
const GITHUB_TEXT = "github.com/mucel29";
const GITHUB_URL = "https://github.com/mucel29";

const ASCII_HEADER = `
  _____   _____   _   _           __  __   ______   __  __    ____    _____    ___   ______ 
 |  __ \\ |_   _| | \\ | |         |  \\/  | |  ____| |  \\/  |  / __ \\  |  __ \\  |_ _| |  ____|
 | |  | |  | |   |  \\| |         | \\  / | | |__    | \\  / | | |  | | | |__) |  | |  | |__   
 | |  | |  | |   | . \` |         | |\\/| | |  __|   | |\\/| | | |  | | |  _  /   | |  |  __|  
 | |__| | _| |_  | |\\  |         | |  | | | |____  | |  | | | |__| | | | \\ \\  _| |_ | |____ 
 |_____/ |_____| |_| \\_|         |_|  |_| |______| |_|  |_|  \\____/  |_|  \\_\\|_____||______|
                                                                                            
  _____    ______           ______    _____   _____               _   _ 
 |  __ \\  |  ____|         |  ____|  / ____| |  __ \\      /\\     | \\ | |
 | |__) | | |__            | |__    | |      | |__) |    /  \\    |  \\| |
 |  ___/  |  __|           |  __|   | |      |  _  /    / /\\ \\   | . \` |
 | |      | |____          | |____  | |____  | | \\ \\   / ____ \\  | |\\  |
 |_|      |______|         |______|  \\_____| |_|  \\_\\ /_/    \\_\\ |_| \\_|
`;

const BOOT_LOG = [
    "Initializing CosminOS Kernel v6.7...",
    "Loading memory modules... [OK]",
    "Mounting Virtual File System... [OK]",
    "Checking GPU capabilities... RTX detected.",
    "Loading 'Student_Anxiety_Level.sys'... [CRITICAL HIGH]",
    "Allocating heap memory for presentation slides...",
    "Compiling shaders...",
    "Linking Entity Component System...",
    "System Ready."
];

// ==========================================
// DATA: SCENES
// ==========================================

const SCENES = {
    'start': {
        options: [
            { key: '1', label: 'Arhitectură (ECS)', next: 'architecture_menu' },
            { key: '2', label: 'Optimizări', next: 'optimization_menu' },
            { key: '3', label: 'Efecte Vizuale', next: 'effects_menu' },
            { key: '4', label: 'Ray Tracing', next: 'raytracing_menu' },
            { key: '5', label: 'Magie Neagră', next: 'magic_menu' },
            { key: '0', label: 'Ignoră-l.', next: 'exit_ignore' }
        ]
    },
    'optimization_menu': {
        options: [
            { key: '1', label: 'Batch Rendering', action: 'present', file: 'batching' },
            { key: '2', label: 'Frustum Culling', action: 'present', file: 'batching' },
            { key: '0', label: 'Întoarce-te', next: 'start' }
        ]
    },
    'architecture_menu': {
        options: [
            { key: '1', label: 'Entity Component System', action: 'present', file: 'ecs' },
            { key: '0', label: 'Întoarce-te', next: 'start' }
        ]
    },
    'effects_menu': {
        options: [
            { key: '1', label: 'Bloom & Post-Processing', action: 'present', file: 'bloom' },
            { key: '0', label: 'Întoarce-te', next: 'start' }
        ]
    },
    'raytracing_menu': {
        options: [
            { key: '1', label: 'Introducere in Path Tracing', action: 'present', file: 'raytracing' },
            { key: '2', label: 'Partitionare Spatiala', action: 'present', file: 'space_part' },
            { key: '0', label: 'Întoarce-te', next: 'start' }
        ]
    },
    'magic_menu': {
        options: [
            { key: '1', label: 'Fast Inverse Square Root', action: 'present', file: 'hacks' },
            { key: '0', label: 'Întoarce-te', next: 'start' }
        ]
    },
    'exit_ignore': {
        options: [
            { key: 'r', label: 'Restart System', action: 'reboot' }
        ]
    },
    'post_presentation': {
        options: []
    }
};

// ==========================================
// ENGINE: FLAVOR TEXT
// ==========================================

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getSceneText(sceneId, lastId) {
    if (sceneId === 'start') {
        if (!hasBooted) {
            return `SYSTEM BOOT... OK.\n\nTe afli într-o pădure randată procedural. În fața ta a apărut Cosmin (Entity ID: 0x01).\n\nPare nerăbdător să îți explice cum funcționează lumea din jurul tău.\n\nDespre ce vrei să îți vorbească?`;
        } else {
            return getRandom([
                "Cosmin te vede întorcându-te la `main()`. 'Mai ai întrebări sau dăm shutdown?'",
                "Cosmin verifică ceasul sistemului. 'Încă avem timp de randare înainte să vină deadline-ul.'",
                "Cosmin resetează starea entităților. 'Ce mai vrei să știi? Stau bine cu memoria.'",
                "Cosmin arată spre arborele de decizie. 'Suntem din nou la rădăcină.'",
                "Cosmin curăță Stack-ul cu o mătură virtuală. 'Suntem înapoi la funcția principală.'"
            ]);
        }
    }

    if (sceneId === 'optimization_menu') return getRandom([
        "Cosmin își șterge transpirația de pe frunte. 'Optimizarea e treabă serioasă, nu e loc de greșeli.'",
        "Cosmin deschide profiler-ul și se încruntă la zonele roșii. 'Trebuie să tăiem din milisecunde...'",
        "Cosmin bate nervos din picior: 'Nu e vorba de cât de frumos arată, e vorba de cât de repede se mișcă.'"
    ]);

    if (sceneId === 'architecture_menu') return getRandom([
        "Cosmin scoate o diagramă de memorie din buzunar. 'Totul e despre Data Locality, prietene.'",
        "Cosmin aranjează pointeri pe masă ca pe cărți de joc. 'Dacă memoria e varză, totul e varză.'",
        "Cosmin te trage într-un colț întunecat al codului. 'Ai grijă, aici nu folosim Garbage Collector.'"
    ]);

    if (sceneId === 'effects_menu') return getRandom([
        "Lumina se schimbă brusc. Cosmin zâmbește larg: 'Asta e partea artistică, unde păcălim ochiul.'",
        "Cosmin compilează un shader în timp real. Ecranul pâlpâie verde. 'Ups, cred că am împărțit la zero.'",
        "Cosmin își pune ochelari de soare pixelati. 'Să vorbim despre Bloom și cum să orbești jucătorul.'"
    ]);

    if (sceneId === 'raytracing_menu') return getRandom([
        "Cosmin scoate o riglă și începe să măsoare raze de lumină în aer. 'Asta e fizică pură.'",
        "Cosmin ascultă ventilatoarele GPU-ului cum urlă. 'Intrăm în zona grea. Sper că ai răcire bună.'",
        "Cosmin dă din mână a lehamite: 'Rasterizarea e o minciună. Ray tracing-ul e realitatea.'"
    ]);

    if (sceneId === 'magic_menu') return getRandom([
        "Cosmin se uită în stânga și în dreapta, paranoic. 'Astea nu sunt în manualul profului.'",
        "Cosmin scoate o carte de vrăji C++. 'Aici vorbim despre bit shifting și pointer casting ilegal.'",
        "Cosmin zâmbește viclean. 'Uneori matematica e doar o sugestie, dacă știi cum să o convingi.'"
    ]);

    if (sceneId === 'post_presentation') {
        if (lastPresentedFile === 'ecs') return getRandom([
            "Cosmin aranjează datele în linii drepte. 'Vezi? Cache-ul procesorului plânge de fericire acum.'",
            "Cosmin se uită la Entitatea #405. 'Nu mai ești un obiect, ești doar un index într-un array,' îi șoptește el.",
            "Cosmin se laudă: 'Acum că datele sunt contigue, CPU-ul poate ghici viitorul (Prefetching).'",
            "Cosmin aruncă spaghetele la gunoi. 'Adio Object Oriented Spaghetti. Bun venit Data Oriented Speed.'"
        ]);

        if (lastPresentedFile === 'batching') return getRandom([
            "Cosmin pune urechea pe procesor. 'Auzi? E liniște. Driverul video îți mulțumește.'",
            "Cosmin îți arată pădurea: 'Ai desenat 10.000 de copaci într-un singur apel. Ești un erou.'",
            "Cosmin rânjește satisfăcut: 'Draw Calls sunt inamicul. Tu tocmai i-ai învins.'",
            "Cosmin verifică task manager-ul: 'Memoria VRAM e plină, dar FPS-ul zboară. Worth it.'"
        ]);

        if (lastPresentedFile === 'bloom') return getRandom([
            "Cosmin își freacă ochii. 'Ești sigur că nu e prea mult glow? Mă doare capul puțin.'",
            "Cosmin își ajustează ochelarii. 'Gaussian Blur face totul mai cinematic, chiar dacă geometria e urâtă.'",
            "Cosmin arată spre zonele luminoase. 'Acum totul arată ca un joc AAA din 2010. Succes!'",
            "Cosmin se uită la ceas: 'Frame-ul durează mai mult, dar măcar arată scump.'"
        ]);

        if (lastPresentedFile === 'raytracing') return getRandom([
            "Cosmin numără pe degete. '4 bounces per rază... Încă e zgomot în imagine, dar arată realist.'",
            "Cosmin își șterge fruntea. 'Placa video a ajuns la 80 de grade. Asta înseamnă că funcționează.'",
            "Cosmin stinge lumina în cameră. 'Cine are nevoie de becuri când ai Global Illumination?'",
            "Cosmin se pierde uitându-se într-o oglindă care reflectă o oglindă. 'Recursivitatea e infinită...'"
        ]);

        if (lastPresentedFile === 'space_part') return getRandom([
            "Cosmin desenează un arbore în aer. 'De la O(N) la O(log N)... e ca și cum ai primi timp cadou.'",
            "Cosmin ia o cutie de pantofi și pune o altă cutie mai mică în ea. 'BVH în viața reală.'",
            "Cosmin râde: 'Să verifici 1 milion de triunghiuri? Niciodată. Verifici 20 de cutii și gata.'",
            "Cosmin se uită la Octree-ul din colț: 'E bun pentru Minecraft, dar noi facem artă aici, nu cuburi.'"
        ]);

        if (lastPresentedFile === 'hacks') return getRandom([
            "Cosmin scrie 0x5f3759df pe tablă. 'Nu întreba de ce funcționează. Doar bucură-te că e rapid.'",
            "Cosmin se spală repede pe mâini. 'Bit shifting-ul ăla a fost ilegal, să nu ne vadă nimeni.'",
            "Cosmin mângâie manualul de matematică. 'Șt, șt, nu plânge. Rezultatul e suficient de precis.'",
            "Cosmin ridică din umeri: 'E un hack oribil, dar l-am copiat din Quake III, deci e legendar.'"
        ]);

        return "Cosmin se uită la tine: 'Prezentarea s-a terminat. Buffer-ul a fost curățat. Ce facem acum?'";
    }

    if (sceneId === 'exit_ignore') {
        return `Te îndepărtezi de origine (0,0,0).\nDeoarece ai ieșit din "View Frustum"-ul camerei, Cosmin a fost eliminat din memorie.\n\nSystem Halted.`;
    }

    return "Cosmin a întâlnit o eroare critică: Text not found in heap.";
}

function getEasterEggResponse(cmd) {
    cmd = cmd.toLowerCase();
    const techResponses = {
        'sudo': "Cosmin se încruntă: 'Nu ai drepturi de root în această simulare.'",
        'ls': "Am listat deja opțiunile mai sus. Nu fi leneș.",
        'cd': "Nu poți schimba directorul. Ești blocat în `presentation_folder`.",
        'rm': "Ești periculos. Cosmin face un pas în spate.",
        'exit': "Nu există scăpare. Doar `return 0;`.",
        'help': "Cosmin zâmbește: 'Nu există help. Doar alege o cifră.'",
        '?': "? Voiai sa pui o întrebare? Cosmin nu are răspunsuri pentru toate.",
        '67': "Cosmin se oprește din randat. Nu înțelege de ce tot dai din mâini și repeți '67'. E vreo constantă magică pe care a uitat să o declare?"
    };

    if (techResponses[cmd]) return techResponses[cmd];

    const randomVariations = [
        `Cosmin nu înțelege de ce tot vorbești despre Eggs Benedict, dar sigur i s-a făcut foame acum.`,
        `Cosmin oftează prelung. N-a mai dormit de 30 de ore și cuvântul "${cmd}" îi dă flashback-uri din sesiune.`,
        `Cosmin nu știe ce e aia "${cmd}", dar dacă nu are normale și coordonate de textură, nu-l interesează.`,
        `Cosmin încearcă să compileze "${cmd}" ca shader, dar primește 'Syntax Error'.`,
        `Te rog nu-l distrage pe Cosmin. Încearcă să calculeze mental un produs vectorial.`,
        `Cosmin clipește lent: "Asta e o metaforă pentru pointers? Că m-ai pierdut."`,
        `Segmentation fault. (Glumesc, dar nu mai scrie "${cmd}").`,
        `Unknown command. Integritatea sistemului a scăzut la 96%.`
    ];
    return getRandom(randomVariations);
}

// ==========================================
// ENGINE: CORE LOGIC
// ==========================================

const outputDiv = document.getElementById('output-area');

// State Management
let appState = 'BOOTING';
let currentSceneId = 'start';
let lastMenuId = 'start';
let currentOptions = [];
let selectedOptionIndex = -1;
let inputBuffer = "";
let slides = [];
let currentSlideIdx = 0;
let isTyping = false;
let hasBooted = false;
let lastPresentedFile = "";

// --- UTILS ---
function clearOutput() { outputDiv.innerHTML = ''; }
function scrollToBottom() { outputDiv.scrollTop = outputDiv.scrollHeight; }

function typeText(text, callback) {
    if (!text) { if (callback) callback(); return; }
    isTyping = true;
    const p = document.createElement('div');
    p.style.whiteSpace = 'pre-wrap';
    outputDiv.appendChild(p);

    let i = 0;
    const speed = 2;
    function charLoop() {
        if (i < text.length) {
            p.textContent += text.charAt(i);
            i++;
            scrollToBottom();
            setTimeout(charLoop, speed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    charLoop();
}

function renderOptions(options) {
    currentOptions = options;

    selectedOptionIndex = 0;

    if (options.length > 0) {
        inputBuffer = options[0].key;
    } else {
        inputBuffer = "";
    }

    const listContainer = document.createElement('div');
    listContainer.id = 'active-options-list';
    listContainer.style.marginTop = '1rem';

    options.forEach((opt, index) => {
        const div = document.createElement('div');
        div.className = 'choice';
        div.dataset.index = index;
        div.innerHTML = `<span style="font-weight:bold; margin-right:10px;">[${opt.key}]</span>${opt.label}`;
        div.onmouseenter = () => { selectedOptionIndex = index; updateSelectionVisuals(); };
        div.onclick = () => { inputBuffer = opt.key; submitCommand(); };
        listContainer.appendChild(div);
    });
    outputDiv.appendChild(listContainer);

    updateSelectionVisuals();
    scrollToBottom();
}

function createPrompt() {
    document.querySelectorAll('.cursor').forEach(c => c.remove());
    const promptDiv = document.createElement('div');
    promptDiv.className = 'prompt-line';
    let path = (appState === 'PRESENTATION') ? 'presentation' : currentSceneId;
    promptDiv.innerHTML = `<span class="prompt-path">user@graphics:~/${path} $</span><span class="user-typing">${inputBuffer}</span><div class="cursor"></div>`;
    outputDiv.appendChild(promptDiv);
    scrollToBottom();
}

function updatePromptText() {
    const prompts = document.querySelectorAll('.prompt-line');
    if (prompts.length > 0) {
        prompts[prompts.length - 1].querySelector('.user-typing').innerText = inputBuffer;
    }
}

function updateSelectionVisuals() {
    const list = document.getElementById('active-options-list');
    if (!list) return;
    const children = list.children;
    for (let i = 0; i < children.length; i++) {
        if (i === selectedOptionIndex) {
            children[i].classList.add('active-selection');
            // Sync input buffer with keyboard navigation visual
            inputBuffer = currentOptions[i].key;
            updatePromptText();
        } else {
            children[i].classList.remove('active-selection');
        }
    }
}

// --- BOOT SEQUENCE LOGIC ---

async function runBootSequence() {
    appState = 'BOOTING';
    clearOutput();

    if (SKIP_BOOT) {
        initGame();
        return;
    }

    for (const line of BOOT_LOG) {
        const p = document.createElement('div');
        p.innerText = line;
        outputDiv.appendChild(p);
        scrollToBottom();
        await new Promise(r => setTimeout(r, Math.random() * 200 + 50));
    }

    const header = document.createElement('pre');
    header.className = 'ascii-art';
    header.innerText = ASCII_HEADER;
    outputDiv.appendChild(header);
    scrollToBottom();

    const nameLine = document.createElement('div');
    nameLine.innerText = STUDENT_NAME;
    outputDiv.appendChild(nameLine);
    await new Promise(r => setTimeout(r, 100));

    const groupLine = document.createElement('div');
    groupLine.innerText = STUDENT_GROUP;
    outputDiv.appendChild(groupLine);
    await new Promise(r => setTimeout(r, 100));

    const githubLine = document.createElement('div');
    const labelSpan = document.createElement('span');
    labelSpan.innerText = GITHUB_LABEL;
    const linkA = document.createElement('a');
    linkA.href = GITHUB_URL;
    linkA.innerText = GITHUB_TEXT;
    linkA.target = "_blank";
    linkA.style.color = "#fff";
    linkA.style.textDecoration = "none";
    linkA.style.borderBottom = "1px solid #fff";

    githubLine.appendChild(labelSpan);
    githubLine.appendChild(linkA);
    outputDiv.appendChild(githubLine);

    scrollToBottom();

    const startLine = document.createElement('div');
    startLine.innerText = "PRESS ANY KEY TO INITIALIZE...";
    outputDiv.appendChild(startLine);

    outputDiv.appendChild(document.createElement('div'));
    outputDiv.appendChild(document.createElement('div'));

    scrollToBottom();

    appState = 'WAIT_FOR_START';
}

function initGame() {
    appState = 'MENU';
    loadScene('start');
}

function loadScene(sceneId) {
    const previousId = lastMenuId;
    currentSceneId = sceneId;
    inputBuffer = "";
    selectedOptionIndex = -1;

    let sceneData = SCENES[sceneId];
    if (sceneId === 'post_presentation') {
        sceneData = { ...SCENES['post_presentation'] };
        sceneData.options = SCENES[lastMenuId].options;
    }
    else if (sceneId.includes('menu') || sceneId === 'start') {
        lastMenuId = sceneId;
    }

    const dynamicText = getSceneText(sceneId, previousId);

    if (sceneId === 'start') {
        if (!hasBooted) {
            hasBooted = true;
        } else {
            clearOutput();
        }
    } else {
        clearOutput();
    }

    typeText(dynamicText, () => {
        if (sceneData.options) renderOptions(sceneData.options);
        createPrompt();
    });
}

function submitCommand() {
    const cmd = inputBuffer.trim().toLowerCase();
    const lastCursor = document.querySelector('.cursor');
    if (lastCursor) lastCursor.remove();

    if (cmd === 'clear' || cmd === 'cls') {
        clearOutput();
        loadScene(currentSceneId);
        return;
    }

    const match = currentOptions.find(o => o.key === cmd);

    if (match) {
        if (match.action === 'present') {
            startPresentation(match.file);
        } else if (match.next) {
            loadScene(match.next);
        } else if (match.action === 'reboot') {
            hasBooted = false;
            runBootSequence();
        }
    } else {
        const response = getEasterEggResponse(cmd);
        const errorMsg = document.createElement('div');
        errorMsg.style.color = '#ff9999';
        errorMsg.style.marginTop = '5px';
        errorMsg.style.marginBottom = '15px';
        errorMsg.style.whiteSpace = 'pre-wrap';
        errorMsg.innerText = `>> ${response}`;
        outputDiv.appendChild(errorMsg);
        inputBuffer = "";
        createPrompt();
    }
}

async function startPresentation(filename) {
    appState = 'PRESENTATION';
    lastPresentedFile = filename;
    clearOutput();
    inputBuffer = "";

    const loadingMsg = document.createElement('div');
    loadingMsg.className = 'hint';
    loadingMsg.innerText = `FETCHING DATA FROM ./slides/${filename}.md ...`;
    outputDiv.appendChild(loadingMsg);

    try {
        const response = await fetch(`./slides/${filename}.md`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const rawMarkdown = await response.text();
        loadingMsg.remove();

        const html = marked.parse(rawMarkdown);
        const splitSlides = html.split('<hr>');

        outputDiv.innerHTML = splitSlides.map((content, i) =>
            `<div class="slide" id="slide-${i}">${content}</div>`
        ).join('');

        // Apply syntax highlighting
        hljs.highlightAll();

        // Render MathJax formulas
        if (window.MathJax && window.MathJax.typesetPromise) {
            await window.MathJax.typesetPromise();
        }

        const hint = document.createElement('div');
        hint.className = 'hint';
        hint.innerText = "-- SCROLL to read | ARROW DOWN at bottom to Advance | ESC to Quit --";
        outputDiv.appendChild(hint);

        slides = document.querySelectorAll('.slide');
        currentSlideIdx = 0;

        if (slides.length > 0) {
            slides[0].classList.add('active');
            slides[0].classList.add('current');
        }

        createPrompt();

    } catch (error) {
        loadingMsg.style.color = 'red';
        loadingMsg.innerText = `ERROR LOADING FILE: ${error.message}\nEnsure you are running a local server.`;
        setTimeout(() => {
            appState = 'MENU';
            loadScene(lastMenuId);
        }, 3000);
    }
}

function nextSlide() {
    if (currentSlideIdx < slides.length - 1) {
        slides[currentSlideIdx].classList.remove('current');
        currentSlideIdx++;
        const nextSlideEl = slides[currentSlideIdx];
        nextSlideEl.classList.add('active');
        nextSlideEl.classList.add('current');
        nextSlideEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        exitPresentation();
    }
}

function prevSlide() {
    if (currentSlideIdx > 0) {
        slides[currentSlideIdx].classList.remove('current');
        currentSlideIdx--;
        const prevSlideEl = slides[currentSlideIdx];
        prevSlideEl.classList.add('current');
        prevSlideEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function exitPresentation() {
    appState = 'MENU';
    loadScene('post_presentation');
}

// --- CONTROLS ---

document.addEventListener('keydown', (e) => {

    if (appState === 'BOOTING') return;

    if (appState === 'WAIT_FOR_START') {
        initGame();
        return;
    }

    if (isTyping) return;

    if (appState === 'PRESENTATION') {

        if (e.key === 'Escape') {
            e.preventDefault();
            exitPresentation();
            return;
        }

        const currentSlideEl = slides[currentSlideIdx];

        // GOING DOWN
        if (['ArrowDown', ' ', 'Enter'].includes(e.key)) {
            e.preventDefault();
            const slideBottomPos = currentSlideEl.offsetTop + currentSlideEl.offsetHeight;
            const currentViewBottom = outputDiv.scrollTop + outputDiv.clientHeight;

            if (currentViewBottom >= slideBottomPos - 5) {
                nextSlide();
            } else {
                const scrollAmount = outputDiv.clientHeight - 80;
                outputDiv.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            }
        }
        else if (e.key === 'ArrowUp' || e.key === 'Backspace' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const slideTopPos = currentSlideEl.offsetTop;
            const currentScroll = outputDiv.scrollTop;

            if (currentScroll <= slideTopPos + 5) {
                prevSlide();
            } else {
                const scrollAmount = outputDiv.clientHeight - 80;
                outputDiv.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            }
        }
        return;
    }

    if (appState === 'MENU') {
        if (e.key === 'Escape') {
            const backOption = currentOptions.find(o => o.key === '0');
            if (backOption) { inputBuffer = '0'; submitCommand(); }
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentOptions.length > 0) {
                if (selectedOptionIndex === -1) selectedOptionIndex = currentOptions.length - 1;
                else selectedOptionIndex = Math.max(0, selectedOptionIndex - 1);
                updateSelectionVisuals();
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentOptions.length > 0) {
                if (selectedOptionIndex === -1) selectedOptionIndex = 0;
                else selectedOptionIndex = Math.min(currentOptions.length - 1, selectedOptionIndex + 1);
                updateSelectionVisuals();
            }
        }
        else if (e.key === 'Enter') { submitCommand(); }
        else if (e.key === 'Backspace') {
            inputBuffer = inputBuffer.slice(0, -1);
            updatePromptText();
        } else if (e.key.length === 1) {
            inputBuffer += e.key;
            updatePromptText();
        }
    }
});

// STARTUP
window.onload = () => {
    runBootSequence();
};