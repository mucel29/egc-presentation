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
            { key: '3', label: 'Tehnici', next: 'techniques_menu' },
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
    'techniques_menu': {
        options: [
            { key: '1', label: 'Mouse Picking (Color)', action: 'present', file: 'mouse_picking_color' },
            { key: '2', label: 'Mouse Picking (Ray Casting)', action: 'present', file: 'mouse_picking_ray' },
            { key: '3', label: 'Text Rendering', action: 'present', file: 'text_rendering' },
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
// THEME LOGIC
// ==========================================

function setTheme(mode) {
    const highlightLink = document.getElementById('highlight-style');

    if (mode === 'light') {
        document.body.classList.add('light-mode');
        // Swap to Solarized Light theme
        if (highlightLink) highlightLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/solarized-light.min.css";
    } else {
        document.body.classList.remove('light-mode');
        // Swap back to Monokai Sublime
        if (highlightLink) highlightLink.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/monokai-sublime.min.css";
    }
}

// ==========================================
// ENGINE: FLAVOR TEXT
// ==========================================

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getSceneText(sceneId, lastId) {
    if (sceneId === 'start') {
        if (!hasBooted) {
            if (sysRebootCount === 0) {
                return `SYSTEM BOOT... OK.\n\nTe afli într-o pădure randată procedural. În fața ta a apărut Cosmin (Entity ID: 0x01).\n\nPare nerăbdător să îți explice cum funcționează lumea din jurul tău.\n\nDespre ce vrei să îți vorbească?`;
            } else {
                if (sysLastCrashType === 'MEM_DUMP') {
                    return `SYSTEM RECOVERED FROM CRITICAL ERROR 0xDEADBEEF.\n\nCosmin se reasamblează din fragmente de memorie. Arată puțin corupt, un braț îi trece prin torace, dar zâmbește.\n\n'M-au scos din heap, dar m-am întors în stack. Ce mai vrei să știi?'`;
                }
                if (sysLastCrashType === 'GPU') {
                    return `GPU DRIVER RESTORED.\n\nCosmin suflă fum din placa video. 'Era cât pe ce să prăjim tranzistorii. Hai să vorbim despre ceva mai puțin solicitant, te rog.'`;
                }
                if (sysLastCrashType === 'NULL_PTR') {
                    return `POINTERS REALIGNED.\n\nCosmin verifică dacă picioarele îi ating pământul. 'N-am mai simțit așa un gol în stomac de la ultimul Segmentation Fault. Ești periculos.'`;
                }
                if (sysLastCrashType === 'GC') {
                    return `MEMORY LEAKS PATCHED.\n\nCosmin scutură praful de pe el. 'Garbage Collector-ul ăla e agresiv. M-am ascuns într-o variabilă globală ca să scap.'`;
                }

                // Fallback generic
                return `SYSTEM REBOOTED (Count: ${sysRebootCount}).\n\nCosmin se uită la tine suspect: 'Ai încercat să îl oprești și să îl pornești iar? A, stai, fix asta ai făcut.'`;
            }
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

    if (sceneId === 'techniques_menu') return getRandom([
        // General / Intro
        "Cosmin deschide o trusă de scule virtuală. 'Aici transformăm matematica abstractă în ceva utilizabil. Fără astea, e doar un screensaver scump.'",

        // Mouse Picking
        "Cosmin urmărește cursorul cu privirea. 'Ecranul e 2D, lumea e 3D. Să afli pe ce ai dat click e o problemă de geometrie analitică sau... o șmecherie cu culori.'",

        // Text Rendering
        "Cosmin oftează uitându-se la un atlas de fonturi. 'Toată lumea crede că să randezi text e simplu. Până când vezi cum arată kerning-ul și SDF-urile.'",
        "Cosmin aranjează litere într-o textură. 'Să desenezi un dragon cu 1 milion de poligoane? Ușor. Să scrii \"Hello World\" clar la orice rezoluție? Asta e adevărata provocare.'",

        // Model Animations (Collada/Skeletal)
        "Cosmin se luptă cu un fișier `.dae` (Collada). 'Un XML de 5000 de linii doar ca să miște mâna stângă. Skinning-ul e magie neagră cu matrici.'",
        "Cosmin verifică osatura unui model 3D. 'Vertex Shader-ul trebuie să știe de care os aparține fiecare vârf. Un calcul greșit și personajul arată ca o pungă de spaghete.'",

        // Mix
        "Cosmin: 'Avem text, avem animații, avem mouse. Practic, avem un engine. Mai rămâne doar să facem jocul... cândva.'"
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

        if (lastPresentedFile === 'mouse_picking_color') return getRandom([
            "Cosmin rânjește: 'De ce să faci matematică de clasa a 12-a când poți doar să desenezi culori?'",
            "Cosmin aprobă: 'E pixel perfect. Dacă dai click pe un pixel transparent, nu selectezi nimic. Ray casting-ul ar fi plâns aici.'",
            "Cosmin se încruntă puțin: 'glReadPixels... Acel moment când CPU-ul stă și așteaptă după GPU. Dar pentru un editor, merge.'",
            "Ai transformat ecranul într-un tabel uriaș de ID-uri. O soluție elegantă pentru oameni leneși... pardon, eficienți."
        ]);

        if (lastPresentedFile === 'mouse_picking_ray') return getRandom([
            "Cosmin aprobă: 'Așa se face profesionist. Ții GPU-ul liber pentru randare, nu pentru citit pixeli.'",
            "Cosmin verifică formulele: 'Inversa proiecției înmulțită cu inversa view-ului... Da, raza pleacă din ochiul camerei.'",
            "Cosmin te avertizează: 'Ai grijă la Bounding Box-uri. Dacă sunt prea mari, o să dai click pe aer și o să selectezi copacul din spate.'",
            "Cosmin: 'Matematică pură. Dacă combini asta cu BVH-ul de mai devreme, ai un sistem de fizică în toată regula.'"
        ]);

        if (lastPresentedFile === 'text_rendering') return getRandom([
            "Cosmin își freacă ochii: 'Dacă mai aud de Kerning o dată, mă las de meserie și mă fac olar.'",
            "Cosmin aprobă SDF-ul: 'Valve a schimbat lumea cu paper-ul ăla. Să poți scala textul infinit fără pixelare? Genial.'",
            "Cosmin: 'Ai implementat bin-packing pentru atlas? Curajos. Majoritatea oamenilor cedează nervos și folosesc stb_rect_pack.'",
            "Cosmin se uită la litera 'g': 'Descender-ul ăla îmi dă bătăi de cap la aliniere verticală...'"
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
        const hexDump = Array.from({ length: 6 }, (_, i) => {
            const addr = (0x00400000 + i * 16).toString(16).toUpperCase();
            const bytes = Array.from({ length: 4 }, () => Math.floor(Math.random() * 255).toString(16).padStart(2, '0').toUpperCase()).join(' ');
            return `0x00${addr}   ${bytes} ${bytes} ${bytes} ${bytes}`;
        }).join('\n');

        // SCENARIILE POSIBILE
        const scenarios = [
            {
                type: 'MEM_DUMP',
                text: `Te îndepărtezi de origine (0,0,0).\n\n` +
                    `Deoarece a ieșit din "View Frustum"-ul camerei, motorul grafic a decis să facă culling pe Cosmin.\n` +
                    `Din păcate, Cosmin era o dependență hard-coded în main.cpp.\n\n` +
                    `*** CRITICAL PROCESS DIED ***\n` +
                    `Generare raport eroare...\n\n` +
                    `${hexDump}\n*\n` +
                    `0xDEADBEEF   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00\n\n` +
                    `>> Se pare că eliminarea lui Cosmin din memorie a dus la închiderea jocului.`
            },
            {
                type: 'GPU',
                text: `Te întorci cu spatele și încerci să pleci.\n\n` +
                    `Cosmin se plictisește așteptând input-ul tău și decide să-și ocupe timpul recompilând toate cele 50.000 de shadere din cache.\n` +
                    `Pe thread-ul principal.\n\n` +
                    `[CPU Usage: 100%]\n[GPU Temp: 98°C]\n[System: Not Responding]\n\n` +
                    `>> PC-ul tău a înghețat din solidaritate cu Cosmin.`
            },
            {
                type: 'NULL_PTR',
                text: `Încerci să îl ignori pe Cosmin, dar pointerul 'student' a devenit NULL.\n\n` +
                    `Încercare de accesare a memoriei la adresa 0x00000000...\n` +
                    `Segmentation fault (core dumped).\n\n` +
                    `Cosmin strigă din buffer-ul de eroare: "Ți-am zis să nu dereferențiezi pointeri nuli!"\n\n` +
                    `>> Sistemul s-a oprit pentru a preveni daune permanente.`
            },
            {
                type: 'GC',
                text: `Stai nemișcat, sperând că va pleca.\n\n` +
                    `Deoarece nu există referințe active către tine în Scena curentă, Garbage Collector-ul din JavaScript te-a marcat ca "Unreachable Code".\n\n` +
                    `Mark-and-Sweep a început.\n` +
                    `Ștergere obiecte... [OK]\n` +
                    `Eliberare memorie... [OK]\n\n` +
                    `>> Ai fost colectat de gunoierul automat. La revedere.`
            }
        ];

        let selectedScenario;

        if (sysRebootCount === 0) {
            selectedScenario = scenarios[0];
        } else {
            selectedScenario = getRandom(scenarios);
        }

        sysPendingCrashType = selectedScenario.type;

        return selectedScenario.text;
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

// --- PERSISTENCE STATE ---
let sysRebootCount = 0;
let sysLastCrashType = "NONE"; // 'MEM_DUMP', 'GPU', 'NULL_PTR', 'GC'
let sysPendingCrashType = "NONE"; // Ce eroare tocmai s-a afișat pe ecran

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

    if (cmd === 'light') {
        if (document.body.classList.contains('light-mode')) {
            // Already light -> Use Warning/Error Style (Reddish in CSS)
            const msg = document.createElement('div');
            msg.className = 'msg-error'; // Uniform "fail/warn" color
            msg.innerText = ">> Te uiți la soare? Deja e lumină peste tot. Cosmin își pune ochelarii de soare.";
            outputDiv.appendChild(msg);
        } else {
            // Switch to light
            setTheme('light');
            const msg = document.createElement('div');
            msg.className = 'msg-success'; // Uniform success color
            msg.innerText = ">> Cosmin a găsit prin pădure o sursă de lumină punctiformă.\n>> Știa că o să ai nevoie de niște lumină ca să citești de pe proiector.";
            outputDiv.appendChild(msg);
        }
        inputBuffer = "";
        createPrompt();
        return;
    }

    if (cmd === 'dark') {
        if (!document.body.classList.contains('light-mode')) {
            // Already dark -> Use Warning/Error Style
            const msg = document.createElement('div');
            msg.className = 'msg-error'; // Uniform "fail/warn" color
            msg.innerText = ">> E deja întuneric. Dacă stingi lumina mai mult de atât, o să randezi pixeli negri pe fundal negru.";
            outputDiv.appendChild(msg);
        } else {
            // Switch to dark
            setTheme('dark');
            const msg = document.createElement('div');
            msg.className = 'msg-success'; // Uniform success color
            msg.innerText = ">> Se pare că developerul a creat sursele de lumină pe bază de baterii.\n>> Tu și Cosmin sunteți acum în beznă.";
            outputDiv.appendChild(msg);
        }
        inputBuffer = "";
        createPrompt();
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

            // --- STATE UPDATE FOR REBOOT ---
            sysRebootCount++;
            sysLastCrashType = sysPendingCrashType;
            sysPendingCrashType = "NONE";
            // -------------------------------

            runBootSequence();
        }
    } else {
        const response = getEasterEggResponse(cmd);
        const errorMsg = document.createElement('div');
        errorMsg.style.color = '#ff9999';
        if (document.body.classList.contains('light-mode'))
            errorMsg.style.color = '#cc0000';

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

        // Force all links to open in new tab
        outputDiv.querySelectorAll('a').forEach(a => a.target = '_blank');

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


function attemptNextSlide() {
    if (slides.length === 0) return;
    const currentSlideEl = slides[currentSlideIdx];
    const slideBottomPos = currentSlideEl.offsetTop + currentSlideEl.offsetHeight;
    const currentViewBottom = outputDiv.scrollTop + outputDiv.clientHeight;

    if (currentViewBottom >= slideBottomPos - 5) {
        nextSlide();
    } else {
        const scrollAmount = outputDiv.clientHeight - 80;
        outputDiv.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
}

function attemptPrevSlide() {
    if (slides.length === 0) return;
    const currentSlideEl = slides[currentSlideIdx];
    const slideTopPos = currentSlideEl.offsetTop;
    const currentScroll = outputDiv.scrollTop;

    if (currentScroll <= slideTopPos + 5) {
        prevSlide();
    } else {
        const scrollAmount = outputDiv.clientHeight - 80;
        outputDiv.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
    }
}

// --- CONTROLS ---

let touchStartY = 0;
let touchStartX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    // 1. BOOT PHASE
    if (appState === 'WAIT_FOR_START') {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;

        // Prevent boot on scroll
        if (Math.abs(touchEndY - touchStartY) > 10 || Math.abs(touchEndX - touchStartX) > 10) return;

        initGame();
        return;
    }

    // 2. PRESENTATION PHASE
    if (appState === 'PRESENTATION') {
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndX = e.changedTouches[0].clientX;

        // DETECTION: If moved significant amount, it's a SCROLL/SWIPE -> Ignore
        if (Math.abs(touchEndY - touchStartY) > 10 || Math.abs(touchEndX - touchStartX) > 10) {
            return;
        }

        // Check if user tapped a link - if so, DO NOT Navigate
        if (e.target.closest('a')) return;

        // It was a TAP
        const windowHeight = window.innerHeight;

        if (touchEndY < windowHeight / 2) {
            // Upper half -> Go Back
            attemptPrevSlide();
        } else {
            // Lower half -> Advance
            attemptNextSlide();
        }
    }
}, { passive: true });

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

        // GOING DOWN
        if (['ArrowDown', ' ', 'Enter'].includes(e.key)) {
            e.preventDefault();
            attemptNextSlide();
        }
        else if (e.key === 'ArrowUp' || e.key === 'Backspace' || e.key === 'ArrowLeft') {
            e.preventDefault();
            attemptPrevSlide();
        }
        return;
    }

    if (appState === 'MENU') {
        if (currentSceneId === 'exit_ignore') {
            const k = e.key.toLowerCase();

            if (k === 'r') {
                inputBuffer = 'r';
                updatePromptText();
            }
            // else if (e.key === 'Backspace') {
            //     inputBuffer = '';
            //     updatePromptText();
            // }
            else if (e.key === 'Enter') {
                if (inputBuffer === 'r') {
                    submitCommand();
                }
            }

            return;
        }

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
    // 1. Check System Preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    // 2. Listen for system changes (optional dynamic switch)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
        setTheme(event.matches ? 'light' : 'dark');
    });

    runBootSequence();
};