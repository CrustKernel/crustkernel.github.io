/* ==========================================================================
   PORTFÓLIO WINDOWS 95 - GERENCIADOR DE JANELAS E SISTEMA INTERATIVO (VANILLA JS)
   Desenvolvedor: Ademir Júnior (github.com/CrustKernel)
   ========================================================================== */

// 1. ÁUDIO DO SISTEMA
const audioMap = {
  startup: new Audio('audio/startup.wav'),
  tada: new Audio('audio/tada.wav'),
  chord: new Audio('audio/chord.wav'),
  ding: new Audio('audio/ding.wav'),
  chimes: new Audio('audio/chimes.wav')
};

function playAudio(name) {
  try {
    if (audioMap[name]) {
      audioMap[name].currentTime = 0;
      audioMap[name].play().catch(e => console.log('Audio autoplay prevented:', e));
    }
  } catch (err) {
    console.warn('Audio play error:', err);
  }
}
window.playAudio = playAudio;

// 2. DADOS DOS PROJETOS REAIS
const PROJECTS = {
  codecon: {
    title: 'CODECON - Sistema de Reclamações & Relatórios [RELATORIO.EXE]',
    icon: 'assets/icons/computer_explorer-4.png',
    subtitle: 'Comissão de Defesa do Consumidor • Câmara Municipal de São Gonçalo',
    mockup: 'assets/mockups/mockup_relatorio_dashboard.png',
    description: 'Solução oficial desenvolvida para modernizar o atendimento ao cidadão em São Gonçalo. Abrange cadastramento com autocompletar via API ViaCEP, validação rigorosa de CPF/telefone, geração automática de Termos Oficiais DOCX de conciliação e motor analítico em Pandas/OpenPyXL.',
    stats: [
      { label: 'Atendimentos Processados', value: '4.005' },
      { label: 'Bairros Cobertos', value: '49 Bairros' },
      { label: 'Motor de Exportação', value: 'DOCX / XLSX / CSV' },
      { label: 'Arquitetura', value: 'Python Flask / SQLite' }
    ],
    tags: ['Python', 'Flask', 'Pandas', 'OpenPyXL', 'API ViaCEP', 'Geração DOCX', 'SQLite ACID'],
    repo: 'https://github.com/CrustKernel/relatorio'
  },
  cmsg_eleicao: {
    title: 'Eleição da Mesa Diretora: Telão LED em Tempo Real [TELAO_CMSG.EXE]',
    icon: 'assets/icons/windows-0.png',
    subtitle: 'Palácio 22 de Setembro • Sessão Solene Regimental',
    mockup: 'assets/mockups/cmsg_telao_votacao.png',
    description: 'Sistema oficial que operou a eleição da Mesa Diretora transmitida diretamente para telões de LED de grande porte no plenário. Sincronização contínua via WebSockets nativos com latência inferior a 30ms, validação estrita contra voto duplo e geração instantânea de Ata Oficial.',
    stats: [
      { label: 'Parlamentares Aptos', value: '27 Vereadores' },
      { label: 'Latência no Telão', value: '< 30ms' },
      { label: 'Disponibilidade', value: '100% Offline-First' },
      { label: 'Tolerância a Falhas', value: 'Zero Falhas no Plenário' }
    ],
    tags: ['FastAPI', 'WebSockets', 'Python Assíncrono', 'Offline-First', 'SQLite ACID', 'Hardware LED'],
    repo: 'https://github.com/CrustKernel'
  },
  cmsg_pdfkit: {
    title: 'CMSGPDFKit: Motor de Paginação & Layout Normatizado [PDFKIT.EXE]',
    icon: 'assets/icons/write_wordpad-0.png',
    subtitle: 'Automação Documental e Compilação em Lote de Atas Oficiais',
    mockup: 'assets/mockups/mockup_cmsg_pdfkit.png',
    description: 'Motor de geração e padronização automatizada de relatórios e documentos jurídicos de centenas de páginas. Transforma dados brutos em PDFs com rigor tipográfico institucional, cabeçalhos dinâmicos, quebra inteligente de tabelas e numeração contínua.',
    stats: [
      { label: 'Velocidade', value: '142 páginas em 1.1s' },
      { label: 'Padrão Gráfico', value: 'Norma Jurídica ABNT' },
      { label: 'Redução de Peso', value: '-87% sem perda 300 DPI' },
      { label: 'Motor', value: 'PyMuPDF / ReportLab' }
    ],
    tags: ['Python', 'PyMuPDF', 'ReportLab', 'WeasyPrint', 'Automação em Lote', 'ABNT'],
    repo: 'https://github.com/CrustKernel/CMSGPDFKit'
  },
  cmsg_cloud: {
    title: 'CMSG Cloud: Repositório & Sincronização Segura [CLOUD.EXE]',
    icon: 'assets/icons/network_drive_world-0.png',
    subtitle: 'Nuvem Privada Institucional e Cadeia de Custódia de Arquivos',
    mockup: 'assets/mockups/mockup_cmsg_cloud.png',
    description: 'Nuvem privada institucional que centralizou todo o ecossistema de documentos, gravações de áudio de plenário e minutas de projetos de lei em uma nuvem segura e auditável com controle granular de acesso (RBAC) e backup automatizado.',
    stats: [
      { label: 'Protocolo Seguro', value: 'WebDAV sobre TLS 1.3' },
      { label: 'Cadeia de Custódia', value: 'Hash SHA-256 Verificado' },
      { label: 'Segurança', value: 'Criptografia AES-256' },
      { label: 'Arquitetura', value: 'Django + PostgreSQL' }
    ],
    tags: ['Django', 'PostgreSQL', 'WebDAV', 'AES-256', 'RBAC', 'Auditoria de Logs', 'LGPD'],
    repo: 'https://github.com/CrustKernel/CMSG_cloud'
  },
  estoque_remedios: {
    title: 'Controle de Estoque de Remédios & Raspagem CMSG [FARMACIA.EXE]',
    icon: 'assets/icons/gears-0.png',
    subtitle: 'Gestão de Insumos Críticos e Automação de Consulta Pública',
    mockup: 'assets/mockups/mockup_raspagem_remedios.png',
    description: 'Sistema desenhado para controle de medicamentos em farmácias públicas e dispensários. Elimina filas ao cruzar receitas médicas com lotes e prazos de validade, integrando robôs de raspagem autônomos para checagem diária de disponibilidade.',
    stats: [
      { label: 'Monitoramento', value: '24/7 Autônomo' },
      { label: 'Taxa de Erro', value: '0% de Medicamento Vencido' },
      { label: 'Rastreabilidade', value: 'Controle por Lote e Validade' },
      { label: 'Automação', value: 'Scrapy / BeautifulSoup' }
    ],
    tags: ['Python', 'FastAPI', 'Scrapy', 'BeautifulSoup', 'SQLite', 'Alertas Automáticos'],
    repo: 'https://github.com/CrustKernel/controle-de-estoque-remedio'
  }
};

// 3. WINDOW MANAGER (GERENCIADOR DE JANELAS)
let highestZIndex = 200;
const openWindows = new Set();
const windowPositions = {};

function initWindowManager() {
  document.querySelectorAll('.win-window').forEach(win => {
    // Make window focusable on mousedown/touchstart
    win.addEventListener('mousedown', () => focusWindow(win.id));
    win.addEventListener('touchstart', () => focusWindow(win.id), { passive: true });

    // Titlebar dragging
    const titlebar = win.querySelector('.win-titlebar');
    if (titlebar) {
      setupDraggable(win, titlebar);
    }
  });

  // Taskbar button Start
  const btnStart = document.getElementById('btn-start');
  const startMenu = document.getElementById('start-menu');
  if (btnStart && startMenu) {
    btnStart.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = startMenu.classList.toggle('open');
      btnStart.classList.toggle('active', isOpen);
      if (isOpen) playAudio('ding');
    });

    document.addEventListener('click', (e) => {
      if (!startMenu.contains(e.target) && !btnStart.contains(e.target)) {
        startMenu.classList.remove('open');
        btnStart.classList.remove('active');
      }
    });
  }

  // Live Clock
  updateClock();
  setInterval(updateClock, 1000);
}

function updateClock() {
  const clockEl = document.getElementById('tray-clock');
  if (!clockEl) return;
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12
  clockEl.textContent = `${hours}:${minutes} ${ampm}`;
}


// SMART WINDOW POSITIONING ALGORITHM (EVITA SOBREPOSIÇÃO E ENCAIXA NA TELA)
function findSmartPosition(win) {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    win.style.left = '4px';
    win.style.top = '4px';
    win.style.width = 'calc(100vw - 8px)';
    win.style.maxWidth = 'calc(100vw - 8px)';
    return;
  }

  // Obter dimensões estimadas da janela
  win.style.visibility = 'hidden';
  win.style.display = 'flex';
  const rect = win.getBoundingClientRect();
  const winW = (rect.width > 50) ? rect.width : (parseInt(win.style.width) || 540);
  const winH = (rect.height > 50) ? rect.height : (parseInt(win.style.height) || 380);
  win.style.visibility = 'visible';

  const minX = 96; // Deixa os ícones do desktop da esquerda sempre visíveis
  const maxX = Math.max(minX + 20, window.innerWidth - winW - 20);
  const minY = 16;
  const maxY = Math.max(minY + 20, window.innerHeight - winH - 46); // Deixa a barra de tarefas visível

  // Coleta todas as outras janelas visíveis atualmente
  const visibleWins = [];
  openWindows.forEach(id => {
    if (id !== win.id) {
      const other = document.getElementById(id);
      if (other && other.style.display !== 'none' && !other.classList.contains('minimized')) {
        const r = other.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          visibleWins.push({
            id: id,
            left: r.left,
            top: r.top,
            right: r.right,
            bottom: r.bottom,
            width: r.width,
            height: r.height
          });
        }
      }
    }
  });

  // Se for a única janela aberta, posiciona na área nobre inicial
  if (visibleWins.length === 0) {
    win.style.left = `${Math.min(maxX, minX + 20)}px`;
    win.style.top = `${Math.min(maxY, minY + 20)}px`;
    return;
  }

  // Gera candidatos estratégicos de posicionamento
  const candidates = [];

  // 1. Lado a lado (à direita das janelas existentes)
  visibleWins.forEach(vw => {
    const candRight = vw.right + 14;
    if (candRight + winW <= window.innerWidth - 10) {
      candidates.push({ x: candRight, y: vw.top });
      candidates.push({ x: candRight, y: minY });
    }
  });

  // 2. Empilhado abaixo (caso caiba na vertical)
  visibleWins.forEach(vw => {
    const candBottom = vw.bottom + 14;
    if (candBottom + winH <= window.innerHeight - 44) {
      candidates.push({ x: vw.left, y: candBottom });
      candidates.push({ x: minX, y: candBottom });
    }
  });

  // 3. Quadrantes abertos da tela (canto superior direito, inferior direito, etc.)
  candidates.push({ x: maxX, y: minY });
  candidates.push({ x: maxX, y: maxY });
  candidates.push({ x: minX, y: maxY });
  candidates.push({ x: Math.floor((minX + maxX) / 2), y: minY });
  candidates.push({ x: Math.floor((minX + maxX) / 2), y: maxY });

  // 4. Cascata progressiva (escadinha) como fallback
  const lastWin = visibleWins[visibleWins.length - 1];
  for (let i = 1; i <= 6; i++) {
    candidates.push({ x: lastWin.left + 35 * i, y: lastWin.top + 30 * i });
  }

  // Avalia qual candidato tem ZERO sobreposição ou a MENOR área de sobreposição
  let bestCandidate = null;
  let minOverlapArea = Infinity;

  for (const cand of candidates) {
    const cx = Math.max(minX, Math.min(maxX, cand.x));
    const cy = Math.max(minY, Math.min(maxY, cand.y));

    const candRect = {
      left: cx,
      top: cy,
      right: cx + winW,
      bottom: cy + winH
    };

    let overlapArea = 0;
    let titlebarObscured = false;

    for (const vw of visibleWins) {
      const xOverlap = Math.max(0, Math.min(candRect.right, vw.right) - Math.max(candRect.left, vw.left));
      const yOverlap = Math.max(0, Math.min(candRect.bottom, vw.bottom) - Math.max(candRect.top, vw.top));
      const area = xOverlap * yOverlap;
      overlapArea += area;

      // Penalidade severa se a barra de título (primeiros 25px) cobrir ou for coberta
      if (Math.abs(cx - vw.left) < 25 && Math.abs(cy - vw.top) < 25) {
        titlebarObscured = true;
      }
    }

    if (titlebarObscured) {
      overlapArea += 2000000;
    }

    // Se encontrou espaço completamente livre (zero colisão), escolhe imediatamente!
    if (overlapArea === 0) {
      bestCandidate = { x: cx, y: cy };
      break;
    }

    if (overlapArea < minOverlapArea) {
      minOverlapArea = overlapArea;
      bestCandidate = { x: cx, y: cy };
    }
  }

  if (bestCandidate) {
    win.style.left = `${bestCandidate.x}px`;
    win.style.top = `${bestCandidate.y}px`;
  }
}

function openWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;

  win.classList.remove('minimized');
  win.style.display = 'flex';
  openWindows.add(winId);

  // Aplica posicionamento inteligente que evita cobrir janelas abertas
  if (!windowPositions[winId]) {
    findSmartPosition(win);
  }

  focusWindow(winId);
  updateTaskbar();
  playAudio('ding');
}

function closeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;

  // Se a janela estiver maximizada, remove a maximização
  win.classList.remove('maximized');

  // Se o navegador estiver em modo fullscreen, sai imediatamente
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }

  // Encerra imediatamente qualquer iframe de jogo (Pinball, Paciência, SkiFree),
  // finalizando o processo WebAssembly e parando todos os sons na hora!
  const iframe = win.querySelector('iframe');
  if (iframe) {
    iframe.src = 'about:blank';
  }

  win.style.display = 'none';
  win.classList.remove('active');
  openWindows.delete(winId);
  updateTaskbar();
}

function minimizeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  win.classList.add('minimized');
  win.classList.remove('active');
  updateTaskbar();
}

function maximizeWindow(winId) {
  const win = document.getElementById(winId);
  if (!win) return;
  win.classList.toggle('maximized');
  focusWindow(winId);
}

function focusWindow(winId) {
  highestZIndex += 2;
  document.querySelectorAll('.win-window').forEach(w => {
    w.classList.remove('active');
  });

  const win = document.getElementById(winId);
  if (win) {
    win.style.zIndex = highestZIndex;
    win.classList.add('active');
  }

  updateTaskbar();
}

function updateTaskbar() {
  const taskList = document.getElementById('task-list');
  if (!taskList) return;
  taskList.innerHTML = '';

  openWindows.forEach(winId => {
    const win = document.getElementById(winId);
    if (!win) return;

    const titleEl = win.querySelector('.win-titlebar-left span');
    const title = titleEl ? titleEl.textContent : winId;
    const imgEl = win.querySelector('.win-titlebar-left img');
    const iconSrc = imgEl ? imgEl.src : 'assets/icons/windows-0.png';

    const item = document.createElement('div');
    item.className = `task-item ${win.classList.contains('active') && !win.classList.contains('minimized') ? 'active' : ''}`;
    item.innerHTML = `<img src="${iconSrc}" alt=""><span>${title}</span>`;
    
    item.addEventListener('click', () => {
      if (win.classList.contains('minimized')) {
        win.classList.remove('minimized');
        focusWindow(winId);
      } else if (win.classList.contains('active')) {
        minimizeWindow(winId);
      } else {
        focusWindow(winId);
      }
    });

    taskList.appendChild(item);
  });
}

function setupDraggable(win, handle) {
  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  const onStart = (e) => {
    if (window.innerWidth <= 768) return; // Em smartphone, mantém a janela estática e perfeitamente enquadrada
    if (win.classList.contains('maximized')) return;
    if (e.target.closest('.win-titlebar-controls')) return;

    isDragging = true;
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;
    const rect = win.getBoundingClientRect();
    initialLeft = rect.left;
    initialTop = rect.top;

    focusWindow(win.id);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    win.style.left = `${Math.max(0, Math.min(window.innerWidth - 60, initialLeft + dx))}px`;
    win.style.top = `${Math.max(0, Math.min(window.innerHeight - 70, initialTop + dy))}px`;
    windowPositions[win.id] = true;
  };

  const onEnd = () => {
    isDragging = false;
  };

  handle.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);

  handle.addEventListener('touchstart', onStart, { passive: true });
  document.addEventListener('touchmove', onMove, { passive: true });
  document.addEventListener('touchend', onEnd);
}

// 4. CARREGADOR DE PROJETOS OFICIAIS
function openProject(projectId) {
  const p = PROJECTS[projectId];
  if (!p) return;

  const viewer = document.getElementById('win-project-viewer');
  if (!viewer) return;

  viewer.querySelector('.project-title').textContent = p.title;
  viewer.querySelector('.project-header-title').textContent = p.title.split('[')[0];
  viewer.querySelector('.project-subtitle').textContent = p.subtitle;
  viewer.querySelector('.project-mockup').src = p.mockup;
  viewer.querySelector('.project-mockup').alt = p.title;
  viewer.querySelector('.project-description').textContent = p.description;

  // Stats
  const statsContainer = viewer.querySelector('.project-stats');
  statsContainer.innerHTML = p.stats.map(s => `
    <div style="background: #ffffff; border: 1px solid #808080; padding: 6px 10px; border-radius: 2px;">
      <div style="font-size: 10px; color: #666; font-weight: bold; text-transform: uppercase;">${s.label}</div>
      <div style="font-size: 14px; font-weight: bold; color: #000080; margin-top: 2px;">${s.value}</div>
    </div>
  `).join('');

  // Tags
  const tagsContainer = viewer.querySelector('.project-tags');
  tagsContainer.innerHTML = p.tags.map(t => `<span class="win-tag">${t}</span>`).join('');

  // Action links (WhatsApp direto com mensagem contextual)
  const repoBtn = viewer.querySelector('.project-repo-btn');
  if (repoBtn) repoBtn.style.display = 'none';

  const waBtn = viewer.querySelector('.project-wa-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/5521981568906?text=${encodeURIComponent('Olá Ademir! Vi seu portfólio Windows 95 e quero conversar sobre o projeto: ' + p.title.split('[')[0].trim())}`;
  }

  openWindow('win-project-viewer');
}

// 5. CARREGADOR DE JOGOS
function openGame(gameId) {
  if (gameId === 'pinball') {
    const win = document.getElementById('win-pinball');
    const frame = win.querySelector('iframe');
    frame.src = 'https://alula.github.io/SpaceCadetPinball/';
    openWindow('win-pinball');
  } else if (gameId === 'minesweeper') {
    openWindow('win-minesweeper');
    if (window.minesweeper) {
      window.minesweeper.reset();
    }
  } else if (gameId === 'solitaire') {
    const win = document.getElementById('win-solitaire');
    const frame = win.querySelector('iframe');
    frame.src = 'https://online-solitaire.com/';
    openWindow('win-solitaire');
  } else if (gameId === 'skifree') {
    const win = document.getElementById('win-skifree');
    const frame = win.querySelector('iframe');
    frame.src = 'https://basicallydan.github.io/skifree.js/';
    openWindow('win-skifree');
  }
}

// ============================================================================
// 6. RÁDIO NIGHTWAVE PLAZA (WIDGET OFICIAL & API AO VIVO)
// ============================================================================
let radioAudio = null;
let isRadioPlaying = false;
let currentVolume = 0.25; // 25% volume inicial confortável e claramente audível
let currentSongData = null;
let currentSongPosition = 0;
let currentSongDuration = 0;
let timerTickerInterval = null;
let plazaStatusInterval = null;

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

async function fetchPlazaStatus() {
  try {
    const res = await fetch('https://api.plaza.one/status?t=' + Date.now());
    if (!res.ok) return;
    const data = await res.json();
    if (!data || !data.song) return;

    currentSongData = data.song;
    currentSongPosition = data.song.position || 0;
    currentSongDuration = data.song.length || 0;

    const artEl = document.getElementById('plaza-artwork');
    const artistEl = document.getElementById('plaza-artist');
    const titleEl = document.getElementById('plaza-title');
    const timerEl = document.getElementById('plaza-timer');
    const reactionsEl = document.getElementById('plaza-reactions');
    const listenersEl = document.getElementById('plaza-listeners');

    if (artEl && data.song.artwork_src) {
      artEl.src = data.song.artwork_src;
    }
    if (artistEl) artistEl.textContent = data.song.artist || 'Nightwave Plaza';
    if (titleEl) titleEl.textContent = data.song.title || 'Vaporwave Radio';
    if (timerEl) {
      timerEl.textContent = `${formatTime(currentSongPosition)} / ${formatTime(currentSongDuration)}`;
    }
    if (reactionsEl) reactionsEl.textContent = data.song.reactions || '1';
    if (listenersEl) listenersEl.textContent = `${data.listeners || 180} ouvinte(s).`;
  } catch (err) {
    console.warn('Erro ao consultar status da rádio Plaza.one:', err);
  }
}

function startTimerTicker() {
  if (timerTickerInterval) clearInterval(timerTickerInterval);
  timerTickerInterval = setInterval(() => {
    if (currentSongDuration > 0) {
      currentSongPosition++;
      const timerEl = document.getElementById('plaza-timer');
      if (timerEl) {
        timerEl.textContent = `${formatTime(currentSongPosition)} / ${formatTime(currentSongDuration)}`;
      }
      if (currentSongPosition >= currentSongDuration) {
        fetchPlazaStatus();
      }
    }
  }, 1000);
}

function startRadioStream() {
  if (!radioAudio) {
    radioAudio = new Audio();
    radioAudio.crossOrigin = 'anonymous';
    radioAudio.preload = 'auto';

    radioAudio.addEventListener('playing', () => {
      isRadioPlaying = true;
      updatePlayBtn(true);
    });
    radioAudio.addEventListener('pause', () => {
      isRadioPlaying = false;
      updatePlayBtn(false);
    });
    radioAudio.addEventListener('error', (e) => {
      console.warn('Radio stream error:', e);
      if (isRadioPlaying) {
        setTimeout(() => {
          radioAudio.src = 'https://radio.plaza.one/mp3?' + Date.now();
          radioAudio.play().catch(console.warn);
        }, 1500);
      }
    });
  }

  radioAudio.src = 'https://radio.plaza.one/mp3?' + Date.now();
  radioAudio.volume = currentVolume;

  const playPromise = radioAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isRadioPlaying = true;
      updatePlayBtn(true);
    }).catch(err => {
      console.warn('Playback prevented by browser:', err);
    });
  }
}

function toggleRadio(forceState) {
  if (forceState === true) {
    startRadioStream();
    return;
  }
  if (forceState === false) {
    if (radioAudio) radioAudio.pause();
    isRadioPlaying = false;
    updatePlayBtn(false);
    return;
  }

  if (isRadioPlaying) {
    if (radioAudio) radioAudio.pause();
    isRadioPlaying = false;
    updatePlayBtn(false);
  } else {
    startRadioStream();
  }
}
window.toggleRadio = toggleRadio;

function updatePlayBtn(playing) {
  const btn = document.getElementById('plaza-btn-play');
  const dot = document.getElementById('tray-radio-dot');
  const statusBadge = document.getElementById('plaza-audio-status');
  if (btn) btn.textContent = playing ? 'Pausar' : 'Tocar';
  if (dot) dot.style.background = playing ? '#00ff00' : '#888888';
  if (statusBadge) {
    statusBadge.textContent = playing ? '● AO VIVO' : '○ PAUSADO';
    statusBadge.style.color = playing ? '#008000' : '#808080';
  }
}

function likeCurrentSong() {
  const icon = document.getElementById('plaza-heart-icon');
  const count = document.getElementById('plaza-reactions');
  if (icon) icon.src = 'assets/plaza_icons/heart.png';
  if (count) {
    const curr = parseInt(count.textContent) || 1;
    count.textContent = curr + 1;
  }
  playAudio('ding');
}
window.likeCurrentSong = likeCurrentSong;

function initCDPlayer() {
  fetchPlazaStatus();
  startTimerTicker();

  if (plazaStatusInterval) clearInterval(plazaStatusInterval);
  plazaStatusInterval = setInterval(fetchPlazaStatus, 8000);

  const slider = document.getElementById('plaza-vol-slider');
  if (slider) {
    slider.value = currentVolume;
    slider.addEventListener('input', (e) => {
      currentVolume = parseFloat(e.target.value);
      if (radioAudio) radioAudio.volume = currentVolume;
    });
  }
}

// 7. DESLIGAR O COMPUTADOR
function triggerShutdown() {
  const overlay = document.getElementById('shutdown-overlay');
  if (overlay) {
    closeWindow('win-shutdown');
    overlay.style.display = 'flex';
    playAudio('chord');
  }
}

function restartSystem() {
  const overlay = document.getElementById('shutdown-overlay');
  if (overlay) overlay.style.display = 'none';
  const boot = document.getElementById('boot-screen');
  if (boot) {
    boot.classList.remove('fade-out');
    setTimeout(() => {
      boot.classList.add('fade-out');
      playAudio('startup');
      openWindow('win-welcome');
    }, 1800);
  }
}

// 8. INICIALIZAÇÃO GERAL
document.addEventListener('DOMContentLoaded', () => {
  initWindowManager();
  initCDPlayer();

  // Instantiate Minesweeper
  if (typeof MinesweeperGame !== 'undefined') {
    window.minesweeper = new MinesweeperGame('minesweeper-container');
  }

  // Boot screen timeout (1.8s) or instant if #noboot / #preview_all
  const bootScreen = document.getElementById('boot-screen');

  function dismissBoot() {
    if (!bootScreen || bootScreen.classList.contains('fade-out')) return;
    bootScreen.classList.add('fade-out');

    // 1. Toca o som oficial de inicialização do Windows 95
    playAudio('startup');

    // 2. Inicia a rádio Nightwave Plaza IMEDIATAMENTE (no clique/toque síncrono)
    startRadioStream();

    // 3. Abre a janela de Boas-Vindas (e o Player lado a lado em desktop)
    setTimeout(() => {
      openWindow('win-welcome');
      if (window.innerWidth > 768) {
        setTimeout(() => {
          openWindow('win-cdplayer');
        }, 150);
      }
    }, 250);
  }
  window.dismissBoot = dismissBoot;

  if (window.location.hash === '#noboot') {
    bootScreen.style.display = 'none';
    openWindow('win-welcome');
    openWindow('win-cdplayer');
  } else if (window.location.hash === '#preview_solitaire') {
    bootScreen.style.display = 'none';
    openGame('solitaire');
  } else if (window.location.hash === '#preview_pinball') {
    bootScreen.style.display = 'none';
    openGame('pinball');
  } else if (window.location.hash === '#preview_radio') {
    bootScreen.style.display = 'none';
    openWindow('win-cdplayer');
  } else if (window.location.hash === '#preview_project') {
    bootScreen.style.display = 'none';
    openProject('codecon');
  } else if (window.location.hash === '#preview_minesweeper') {
    bootScreen.style.display = 'none';
    openGame('minesweeper');
  } else if (window.location.hash === '#preview_all') {
    bootScreen.style.display = 'none';
    openWindow('win-welcome');
    openWindow('win-cdplayer');
    openWindow('win-projects-folder');
    openGame('minesweeper');
  } else {
    // Requer clique, toque ou tecla do usuário para destravar áudio e rádio com 100% de garantia
    bootScreen.addEventListener('click', dismissBoot);
    bootScreen.addEventListener('touchstart', dismissBoot, { passive: true });
    bootScreen.addEventListener('pointerdown', dismissBoot);
    document.addEventListener('keydown', (e) => {
      if (!bootScreen.classList.contains('fade-out')) dismissBoot();
    }, { once: true });
  }
});
