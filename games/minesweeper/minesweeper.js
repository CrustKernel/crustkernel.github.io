/* ==========================================================================
   CAMPO MINADO (WINMINE.EXE) - JAVASCRIPT NATIVO RETRÔ WINDOWS 95
   ========================================================================== */

class MinesweeperGame {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.difficulty = options.difficulty || 'beginner';
    this.configs = {
      beginner: { rows: 9, cols: 9, mines: 10 },
      intermediate: { rows: 16, cols: 16, mines: 40 },
      expert: { rows: 16, cols: 30, mines: 99 }
    };
    this.timer = 0;
    this.timerInterval = null;
    this.gameStarted = false;
    this.gameOver = false;
    this.grid = [];
    this.minesLeft = 10;
    this.revealedCount = 0;
    
    this.initDOM();
    this.reset();
  }

  initDOM() {
    this.container.innerHTML = `
      <div class="mine-wrapper" style="padding: 6px; background: #c0c0c0; display: inline-block;">
        <div class="win-menubar" style="margin-bottom: 4px; padding: 2px 4px;">
          <span class="win-menu-item" onclick="minesweeper.setDifficulty('beginner')"><u>I</u>niciante</span>
          <span class="win-menu-item" onclick="minesweeper.setDifficulty('intermediate')"><u>M</u>édio</span>
          <span class="win-menu-item" onclick="minesweeper.setDifficulty('expert')"><u>E</u>xpert</span>
          <span class="win-menu-item" onclick="minesweeper.reset()"><u>N</u>ovo</span>
        </div>
        <div class="win-inset" style="padding: 4px 6px; display: flex; justify-content: space-between; align-items: center; background: #c0c0c0; margin-bottom: 6px;">
          <div class="lcd-box" id="mine-count">010</div>
          <button id="mine-face" class="win-btn" style="padding: 1px 6px; font-size: 16px; line-height: 1.1;" onclick="minesweeper.reset()">🙂</button>
          <div class="lcd-box" id="mine-time">000</div>
        </div>
        <div class="win-inset" id="mine-board" style="padding: 3px; background: #808080; display: grid; gap: 1px; user-select: none;">
        </div>
      </div>
    `;

    this.faceBtn = this.container.querySelector('#mine-face');
    this.countEl = this.container.querySelector('#mine-count');
    this.timeEl = this.container.querySelector('#mine-time');
    this.boardEl = this.container.querySelector('#mine-board');
  }

  setDifficulty(diff) {
    if (this.configs[diff]) {
      this.difficulty = diff;
      this.reset();
    }
  }

  reset() {
    clearInterval(this.timerInterval);
    this.timer = 0;
    this.gameStarted = false;
    this.gameOver = false;
    this.revealedCount = 0;
    
    const { rows, cols, mines } = this.configs[this.difficulty];
    this.rows = rows;
    this.cols = cols;
    this.mines = mines;
    this.minesLeft = mines;

    this.faceBtn.textContent = '🙂';
    this.timeEl.textContent = '000';
    this.updateMineCountDisplay();

    this.boardEl.style.gridTemplateColumns = `repeat(${cols}, 18px)`;
    this.boardEl.style.gridTemplateRows = `repeat(${rows}, 18px)`;
    this.boardEl.innerHTML = '';

    this.grid = [];
    for (let r = 0; r < rows; r++) {
      this.grid[r] = [];
      for (let c = 0; c < cols; c++) {
        this.grid[r][c] = {
          row: r,
          col: c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
          el: null
        };

        const cell = document.createElement('div');
        cell.className = 'mine-cell';
        cell.style.width = '18px';
        cell.style.height = '18px';
        cell.style.fontSize = '11px';
        cell.style.fontWeight = 'bold';
        cell.style.display = 'flex';
        cell.style.alignItems = 'center';
        cell.style.justifyContent = 'center';
        cell.style.cursor = 'pointer';
        cell.style.background = '#c0c0c0';
        cell.style.borderTop = '2px solid #ffffff';
        cell.style.borderLeft = '2px solid #ffffff';
        cell.style.borderRight = '2px solid #808080';
        cell.style.borderBottom = '2px solid #808080';

        // Mouse down face reaction
        cell.addEventListener('mousedown', (e) => {
          if (!this.gameOver && e.button === 0) {
            this.faceBtn.textContent = '😮';
          }
        });

        cell.addEventListener('mouseup', () => {
          if (!this.gameOver) this.faceBtn.textContent = '🙂';
        });

        // Click handlers
        cell.addEventListener('click', () => this.handleCellClick(r, c));
        cell.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.handleRightClick(r, c);
        });

        // Touch support for mobile (long press for flag)
        let touchTimer = null;
        cell.addEventListener('touchstart', (e) => {
          touchTimer = setTimeout(() => {
            this.handleRightClick(r, c);
            touchTimer = null;
          }, 450);
        });

        cell.addEventListener('touchend', (e) => {
          if (touchTimer) {
            clearTimeout(touchTimer);
            this.handleCellClick(r, c);
          }
        });

        this.grid[r][c].el = cell;
        this.boardEl.appendChild(cell);
      }
    }
  }

  updateMineCountDisplay() {
    const val = Math.max(0, Math.min(999, this.minesLeft));
    this.countEl.textContent = String(val).padStart(3, '0');
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer++;
      if (this.timer > 999) this.timer = 999;
      this.timeEl.textContent = String(this.timer).padStart(3, '0');
    }, 1000);
  }

  plantMines(safeRow, safeCol) {
    let placed = 0;
    while (placed < this.mines) {
      const r = Math.floor(Math.random() * this.rows);
      const c = Math.floor(Math.random() * this.cols);
      // Ensure safe area around first clicked cell
      if (!this.grid[r][c].isMine && (Math.abs(r - safeRow) > 1 || Math.abs(c - safeCol) > 1)) {
        this.grid[r][c].isMine = true;
        placed++;
      }
    }

    // Calculate neighboring mines count
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (!this.grid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                if (this.grid[nr][nc].isMine) count++;
              }
            }
          }
          this.grid[r][c].neighborMines = count;
        }
      }
    }
  }

  handleCellClick(r, c) {
    if (this.gameOver) return;
    const cell = this.grid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    if (!this.gameStarted) {
      this.gameStarted = true;
      this.plantMines(r, c);
      this.startTimer();
    }

    if (window.playAudio) window.playAudio('ding');

    if (cell.isMine) {
      this.triggerLoss(cell);
      return;
    }

    this.revealCell(r, c);

    // Check Win
    const totalCells = this.rows * this.cols;
    if (this.revealedCount === totalCells - this.mines) {
      this.triggerWin();
    }
  }

  revealCell(r, c) {
    const cell = this.grid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    cell.isRevealed = true;
    this.revealedCount++;
    cell.el.style.background = '#c0c0c0';
    cell.el.style.border = '1px solid #7b7b7b';

    if (cell.neighborMines > 0) {
      cell.el.textContent = cell.neighborMines;
      const colors = ['', 'blue', '#007b00', 'red', '#00007b', '#7b0000', '#007b7b', 'black', '#7b7b7b'];
      cell.el.style.color = colors[cell.neighborMines] || 'black';
    } else {
      cell.el.textContent = '';
      // Flood fill reveal 0-mine neighbors
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
            if (!this.grid[nr][nc].isRevealed) {
              this.revealCell(nr, nc);
            }
          }
        }
      }
    }
  }

  handleRightClick(r, c) {
    if (this.gameOver || !this.gameStarted) return;
    const cell = this.grid[r][c];
    if (cell.isRevealed) return;

    cell.isFlagged = !cell.isFlagged;
    if (cell.isFlagged) {
      cell.el.textContent = '🚩';
      this.minesLeft--;
    } else {
      cell.el.textContent = '';
      this.minesLeft++;
    }
    this.updateMineCountDisplay();
  }

  triggerLoss(hitCell) {
    this.gameOver = true;
    clearInterval(this.timerInterval);
    this.faceBtn.textContent = '😵';
    hitCell.el.style.background = '#ff0000';
    hitCell.el.textContent = '💣';

    if (window.playAudio) window.playAudio('chord');

    // Reveal all mines
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const item = this.grid[r][c];
        if (item.isMine && item !== hitCell) {
          item.el.textContent = '💣';
          item.el.style.border = '1px solid #7b7b7b';
        }
      }
    }
  }

  triggerWin() {
    this.gameOver = true;
    clearInterval(this.timerInterval);
    this.faceBtn.textContent = '😎';
    this.minesLeft = 0;
    this.updateMineCountDisplay();
    if (window.playAudio) window.playAudio('tada');
  }
}
