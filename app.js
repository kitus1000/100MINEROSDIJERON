// Controlador Principal de "100 MINEROS DIJERON - EDICIÓN GRUPO BACIS"
// Autor: Antigravity AI - Edición Completa con Dinero Rápido y Fuegos Artificiales en Canvas

class FireworkParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 3.5 + 1;
        this.velocity = {
            x: (Math.random() - 0.5) * 9,
            y: (Math.random() - 0.5) * 9
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += 0.06; // Gravedad
        this.alpha -= this.decay;
    }
}

class MiningGameShow {
    constructor() {
        this.selectedPackage = 'all';
        this.questions = this.loadQuestions();
        this.playedIds = this.loadPlayedIds();
        this.currentQuestionIndex = this.findNextUnplayedIndex(0);

        // Canal local BroadcastChannel
        this.syncChannel = new BroadcastChannel('bacis_game_channel');

        // Código de Sala para sincronización remota
        this.roomCode = localStorage.getItem('bacis_room_code') || 'BACIS100';

        // Inicializar sincronización en la nube (ntfy.sh)
        this.setupCloudSyncSSE();

        // Ciclo del Partido (Ronda 1 a 5)
        this.currentMatchRound = 1;
        this.roundPot = 0;
        this.team1RoundsWon = 0;
        this.team2RoundsWon = 0;
        this.team1Name = 'LOS BARRETEROS';
        this.team2Name = 'LOS GAMBUSINOS';
        
        // Control de turnos y strikes
        this.activeTeam = null; // 'team1', 'team2', o null
        this.stealMode = false;
        this.currentStrikes = 0;
        
        this.soundEnabled = true;

        // Temporizador normal
        this.timerInterval = null;
        this.timeLeft = 10;

        // ==========================================
        // VARIABLES DE DINERO RÁPIDO (FAST MONEY)
        // ==========================================
        this.fastMoneyMode = false;
        this.fastQuestions = FAST_MONEY_QUESTIONS;
        
        // Inicializar respuestas y puntos vacíos para ambos jugadores
        this.fastAnswers = {
            player1: ["", "", "", "", ""],
            player2: ["", "", "", "", ""]
        };
        this.fastPoints = {
            player1: [0, 0, 0, 0, 0],
            player2: [0, 0, 0, 0, 0]
        };
        // Control de si ya se revelaron visualmente en el tablero de TV
        this.fastRevealed = {
            player1: [false, false, false, false, false],
            player2: [false, false, false, false, false]
        };
        this.fastPointsRevealed = {
            player1: [false, false, false, false, false],
            player2: [false, false, false, false, false]
        };

        this.fastTimerInterval = null;
        this.fastTimeLeft = 20;

        // Elementos de audio
        this.sounds = {
            intro: new Audio('a-jugar-100-mexicanos-dijeron_uzh3r4B.mp3'),
            button: new Audio('boton-10-mexicanos-digieron.mp3'),
            correct: new Audio('correcto-100-mexicanos-dijeron.mp3'),
            incorrect: new Audio('incorrecto-100-mexicanos-dijeron.mp3'),
            win: new Audio('triunfo-100-mexicanos-dijeron.mp3')
        };

        this.processedCommandIds = new Set();
        this.initDOM();
        this.bindEvents();
        this.setupRemoteListener();
        this.createFloatingParticles();
        this.renderQuestion();
    }

    setupCloudSyncSSE() {
        if (this.eventSource) {
            this.eventSource.close();
        }

        const topicCommands = `bacis_100mineros_cmd_${this.roomCode.toLowerCase()}`;
        console.log(`🔌 Conectando a comandos en la nube: ntfy.sh/${topicCommands}`);

        this.eventSource = new EventSource(`https://ntfy.sh/${topicCommands}/sse`);
        
        this.eventSource.onopen = () => {
            const badge = document.getElementById('cloudStatusBadge');
            if (badge) {
                badge.style.borderColor = '#00ff88';
                badge.style.color = '#00ff88';
                badge.textContent = `🟢 NUBE ACTIVA (SALA: ${this.roomCode})`;
            }
        };

        this.eventSource.onerror = () => {
            const badge = document.getElementById('cloudStatusBadge');
            if (badge) {
                badge.style.borderColor = '#ff4e62';
                badge.style.color = '#ff4e62';
                badge.textContent = `🔴 ERROR DE CONEXIÓN`;
            }
        };

        this.eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data && data.message) {
                    const cmd = JSON.parse(data.message);
                    if (cmd && cmd.type === 'REMOTE_COMMAND') {
                        this.handleRemoteCommand(cmd);
                    }
                }
            } catch (e) {}
        };

        setTimeout(() => this.broadcastSyncState(), 1000);
    }

    shuffleQuestions(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    filterQuestionsByPackage() {
        const rawQuestions = this.loadQuestions();
        if (this.selectedPackage === 'all') {
            this.questions = this.shuffleQuestions([...rawQuestions]);
        } else {
            const pkg = Number(this.selectedPackage);
            // Dividir las 65 preguntas en 5 paquetes de 13 preguntas cada uno
            const startIdx = (pkg - 1) * 13;
            const endIdx = startIdx + 13;
            const filtered = rawQuestions.slice(startIdx, endIdx);
            this.questions = this.shuffleQuestions([...filtered]);
        }
        this.currentQuestionIndex = 0; // Iniciar en el primer elemento del paquete filtrado
    }

    loadQuestions() {
        const saved = localStorage.getItem('bacis_100_mineros_questions');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) {}
        }
        return MINING_QUESTIONS;
    }

    saveQuestions() {
        localStorage.setItem('bacis_100_mineros_questions', JSON.stringify(this.questions));
    }

    loadPlayedIds() {
        const saved = localStorage.getItem('bacis_played_ids');
        if (saved) {
            try { return JSON.parse(saved); } catch (e) {}
        }
        return [];
    }

    savePlayedIds() {
        localStorage.setItem('bacis_played_ids', JSON.stringify(this.playedIds));
    }

    findNextUnplayedIndex(startIdx) {
        for (let i = 0; i < this.questions.length; i++) {
            const idx = (startIdx + i) % this.questions.length;
            if (!this.playedIds.includes(this.questions[idx].id)) {
                return idx;
            }
        }
        return startIdx;
    }

    playSound(key) {
        if (!this.soundEnabled) return;
        const sound = this.sounds[key];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio autoplay info:', e));
        }
    }

    initDOM() {
        this.introScreen = document.getElementById('introScreen');
        this.boardGrid = document.getElementById('answersGrid');
        this.questionText = document.getElementById('questionText');
        this.surpriseBadge = document.getElementById('surpriseBadge');
        this.roundPotDisplay = document.getElementById('roundPotPoints');
        this.strikeOverlay = document.getElementById('strikeOverlay');
        this.strikeContainer = document.getElementById('strikeContainer');
        this.miniStrikes = document.querySelectorAll('.mini-strike');
        this.timerDigits = document.getElementById('timerDigits');
        this.curtainTransition = document.getElementById('curtainTransition');
        this.championOverlay = document.getElementById('championOverlay');
        this.roundAnnouncementOverlay = document.getElementById('roundAnnouncementOverlay');
        this.bigRoundNumberText = document.getElementById('bigRoundNumberText');
        this.bigRoundSubText = document.getElementById('bigRoundSubText');
        this.hostCheatSheet = document.getElementById('hostCheatSheet');
        this.cheatSheetItems = document.getElementById('cheatSheetItems');
        this.podiumTeam1 = document.getElementById('podiumTeam1');
        this.podiumTeam2 = document.getElementById('podiumTeam2');
        
        // Elementos Dinero Rápido
        this.fastMoneyArena = document.getElementById('fastMoneyArena');
        this.normalGameArena = document.getElementById('normalGameArena');
        this.normalGameStrip = document.getElementById('normalGameStrip');
        this.fastTimerDigits = document.getElementById('fastTimerDigits');
        this.fastTotalPointsBox = document.getElementById('fastTotalPointsBox');
    }

    bindEvents() {
        const pkgSelect = document.getElementById('packageSelect');
        if (pkgSelect) {
            pkgSelect.addEventListener('change', (e) => {
                this.selectedPackage = e.target.value;
            });
        }

        document.getElementById('btnStartShow').addEventListener('click', () => {
            const t1NameInput = document.getElementById('inputTeam1Name').value.trim();
            const t2NameInput = document.getElementById('inputTeam2Name').value.trim();
            
            this.team1Name = t1NameInput !== "" ? t1NameInput.toUpperCase() : "BARRETEROS";
            this.team2Name = t2NameInput !== "" ? t2NameInput.toUpperCase() : "GAMBUSINOS";

            // Actualizar textos en los podios de la TV
            document.querySelector('#podiumTeam1 .team-name').textContent = this.team1Name;
            document.querySelector('#podiumTeam2 .team-name').textContent = this.team2Name;

            this.introScreen.classList.add('hidden');
            this.playSound('intro');
            this.currentMatchRound = 1;
            
            // Filtrar preguntas por paquete antes de barajar y renderizar
            this.filterQuestionsByPackage();
            
            this.renderQuestion();
            this.showRoundAnnouncement(1);
        });

        document.getElementById('btnOpenConfigFromIntro').addEventListener('click', () => {
            document.getElementById('modalConfig').classList.add('active');
        });

        document.getElementById('btnOpenConfigMenu').addEventListener('click', () => {
            document.getElementById('modalConfig').classList.add('active');
        });

        document.getElementById('btnCloseConfig').addEventListener('click', () => {
            document.getElementById('modalConfig').classList.remove('active');
        });

        document.getElementById('btnResetPlayedHistory').addEventListener('click', () => {
            this.playedIds = [];
            this.savePlayedIds();
            this.currentMatchRound = 1;
            this.currentQuestionIndex = 0;
            this.renderQuestion();
            alert('¡Listo! Todas las preguntas marcadas como jugadas han sido restablecidas.');
        });

        document.getElementById('btnOpenAddModal').addEventListener('click', () => {
            document.getElementById('modalConfig').classList.remove('active');
            document.getElementById('modalAddQuestion').classList.add('active');
        });

        document.getElementById('btnPlayIntro').addEventListener('click', () => {
            this.playSound('intro');
        });

        document.getElementById('btnToggleSound').addEventListener('click', (e) => {
            this.soundEnabled = !this.soundEnabled;
            e.currentTarget.innerHTML = this.soundEnabled ? '🔊 SONIDO: ON' : '🔇 SONIDO: OFF';
        });

        document.getElementById('btnToggleCheatSheet').addEventListener('click', () => {
            this.hostCheatSheet.classList.toggle('active');
            this.playSound('button');
        });

        document.getElementById('btnStartTimer10').addEventListener('click', () => {
            this.startTimer(10);
            this.playSound('button');
        });
        document.getElementById('btnStartTimer5').addEventListener('click', () => {
            this.startTimer(5);
            this.playSound('button');
        });
        document.getElementById('btnStopTimer').addEventListener('click', () => {
            this.stopTimer();
            this.playSound('button');
        });

        document.getElementById('btnNextQuestion').addEventListener('click', () => {
            this.nextQuestionAction();
        });

        document.getElementById('btnPrevQuestion').addEventListener('click', () => {
            this.prevQuestionAction();
        });

        document.getElementById('btnRevealAll').addEventListener('click', () => {
            this.revealAllAnswersWithoutAddingPoints();
        });

        document.getElementById('btnStrike').addEventListener('click', () => {
            this.triggerStrike();
        });

        document.getElementById('t1AwardRound').addEventListener('click', () => {
            this.awardRoundTeam1();
        });

        document.getElementById('t2AwardRound').addEventListener('click', () => {
            this.awardRoundTeam2();
        });

        // Alternar Dinero Rápido
        document.getElementById('btnToggleFastMoney').addEventListener('click', () => {
            this.toggleFastMoneyMode();
        });

        // Controles de tiempo Dinero Rápido
        document.getElementById('btnFastStart20').addEventListener('click', () => this.startFastTimer(20));
        document.getElementById('btnFastStart25').addEventListener('click', () => this.startFastTimer(25));
        document.getElementById('btnFastStop').addEventListener('click', () => this.stopFastTimer());

        document.getElementById('btnRestartMatch').addEventListener('click', () => {
            this.team1RoundsWon = 0;
            this.team2RoundsWon = 0;
            this.currentMatchRound = 1;
            this.updateRoundStars();
            this.championOverlay.classList.remove('active');
            if (this.fastMoneyMode) {
                this.toggleFastMoneyMode();
            }
            this.showRoundAnnouncement(1);
        });

        document.getElementById('btnLaunchFastMoneyFromChampion').addEventListener('click', () => {
            this.championOverlay.classList.remove('active');
            if (!this.fastMoneyMode) {
                this.toggleFastMoneyMode();
            }
        });

        document.querySelectorAll('.team-name').forEach(el => {
            el.addEventListener('click', (e) => {
                const newName = prompt('Nombre del equipo minero:', e.currentTarget.textContent);
                if (newName && newName.trim() !== '') {
                    e.currentTarget.textContent = newName.trim().toUpperCase();
                }
            });
        });

        document.getElementById('btnCloseModal').addEventListener('click', () => {
            document.getElementById('modalAddQuestion').classList.remove('active');
        });
        document.getElementById('formAddQuestion').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCustomQuestionSubmit();
        });

        const cloudBadge = document.getElementById('cloudStatusBadge');
        if (cloudBadge) {
            cloudBadge.addEventListener('click', () => {
                const newCode = prompt('Introduce un código de sala único para conectar con tu celular:', this.roomCode);
                if (newCode && newCode.trim() !== '') {
                    this.roomCode = newCode.trim().toUpperCase();
                    localStorage.setItem('bacis_room_code', this.roomCode);
                    this.setupCloudSyncSSE();
                    alert(`Sala cambiada a: ${this.roomCode}. Asegúrate de poner el mismo código en tu celular.`);
                }
            });
        }
    }

    setupRemoteListener() {
        this.syncChannel.onmessage = (event) => {
            const data = event.data;
            if (data.type === 'REQUEST_SYNC') {
                this.broadcastSyncState();
            } else if (data.type === 'REMOTE_COMMAND') {
                this.handleRemoteCommand(data);
            }
        };
    }

    handleRemoteCommand(cmd) {
        if (cmd && cmd.id) {
            if (this.processedCommandIds.has(cmd.id)) {
                return; // Ignorar comando duplicado
            }
            this.processedCommandIds.add(cmd.id);
            if (this.processedCommandIds.size > 100) {
                const first = this.processedCommandIds.values().next().value;
                this.processedCommandIds.delete(first);
            }
        }

        if (cmd.action === 'REQUEST_SYNC') {
            this.broadcastSyncState();
            return;
        }

        if (cmd.action === 'TEST_SOUND') {
            this.playSound('button');
            const badge = document.getElementById('cloudStatusBadge');
            if (badge) {
                const prevText = badge.textContent;
                badge.style.background = '#ffd800';
                badge.style.color = '#000';
                badge.textContent = '⚡ ¡COMANDO REMOTO RECIBIDO!';
                setTimeout(() => {
                    badge.style.background = '#0b1836';
                    badge.style.color = '#00ff88';
                    badge.textContent = prevText;
                }, 1500);
            }
        } else if (cmd.action === 'REVEAL_CARD') {
            const cardEl = this.boardGrid.querySelectorAll('.flip-card')[cmd.cardIndex];
            if (cardEl && cardEl.dataset.revealed === 'false') {
                cardEl.click();
            }
        } else if (cmd.action === 'TRIGGER_STRIKE') {
            this.triggerStrike();
        } else if (cmd.action === 'NEXT_QUESTION') {
            this.nextQuestionAction();
        } else if (cmd.action === 'PREV_QUESTION') {
            this.prevQuestionAction();
        } else if (cmd.action === 'START_TIMER') {
            this.startTimer(cmd.seconds || 10);
        } else if (cmd.action === 'AWARD_ROUND_T1') {
            this.awardRoundTeam1();
        } else if (cmd.action === 'AWARD_ROUND_T2') {
            this.awardRoundTeam2();
        } else if (cmd.action === 'SET_ACTIVE_TEAM') {
            this.setActiveTeam(cmd.team);
        } else if (cmd.action === 'SKIP_QUESTION') {
            this.skipCurrentQuestion();
        } else if (cmd.action === 'REQUEST_SYNC') {
            this.broadcastSyncState();
        }
        
        // Comandos Dinero Rápido
        else if (cmd.action === 'TOGGLE_FAST_MONEY') {
            this.toggleFastMoneyMode();
        } else if (cmd.action === 'SET_FAST_DATA') {
            this.fastAnswers = cmd.answers;
            this.fastPoints = cmd.points;
            this.renderFastMoneyBoard();
            this.checkFastTotalPoints();
        } else if (cmd.action === 'REVEAL_FAST_CELL') {
            this.revealFastCell(cmd.playerKey, cmd.qIdx, cmd.cellType);
        } else if (cmd.action === 'START_FAST_TIMER') {
            this.startFastTimer(cmd.seconds);
        } else if (cmd.action === 'STOP_FAST_TIMER') {
            this.stopFastTimer();
        } else if (cmd.action === 'PLAY_BUZZER') {
            this.playSound('incorrect');
        }
    }

    setActiveTeam(team) {
        this.activeTeam = team;
        this.updateActiveTeamUI();
        this.broadcastSyncState();
    }

    updateActiveTeamUI() {
        if (this.podiumTeam1 && this.podiumTeam2) {
            this.podiumTeam1.classList.remove('active-turn');
            this.podiumTeam2.classList.remove('active-turn');
            
            if (this.activeTeam === 'team1') {
                this.podiumTeam1.classList.add('active-turn');
            } else if (this.activeTeam === 'team2') {
                this.podiumTeam2.classList.add('active-turn');
            }
        }
    }

    broadcastSyncState() {
        const revealed = [];
        this.boardGrid.querySelectorAll('.flip-card').forEach((card, idx) => {
            if (card.dataset.revealed === 'true') {
                revealed.push(idx);
            }
        });

        const stateObj = {
            round: this.currentMatchRound,
            question: this.questions[this.currentQuestionIndex],
            revealedIndexes: revealed,
            activeTeam: this.activeTeam,
            stealMode: this.stealMode,
            currentStrikes: this.currentStrikes,
            team1Name: this.team1Name,
            team2Name: this.team2Name,
            
            // Estado Dinero Rápido
            fastMoneyMode: this.fastMoneyMode,
            fastQuestions: this.fastQuestions,
            fastAnswers: this.fastAnswers,
            fastPoints: this.fastPoints,
            fastRevealed: this.fastRevealed,
            fastPointsRevealed: this.fastPointsRevealed
        };

        this.syncChannel.postMessage({
            type: 'SYNC_STATE',
            ...stateObj
        });

        const topicState = `bacis_100mineros_state_${this.roomCode.toLowerCase()}`;
        fetch(`https://ntfy.sh/${topicState}`, {
            method: 'POST',
            body: JSON.stringify({ type: 'SYNC_STATE', ...stateObj })
        }).catch(() => {});
    }

    nextQuestionAction() {
        this.triggerQuestionTransition(() => {
            this.currentMatchRound = (this.currentMatchRound % 5) + 1;
            const nextIdx = this.findNextUnplayedIndex((this.currentQuestionIndex + 1) % this.questions.length);
            this.currentQuestionIndex = nextIdx;
            this.activeTeam = null;
            this.stealMode = false;
            this.currentStrikes = 0;
            this.updateActiveTeamUI();
            this.renderQuestion();
            this.showRoundAnnouncement(this.currentMatchRound);
        });
    }

    prevQuestionAction() {
        this.triggerQuestionTransition(() => {
            this.currentMatchRound = Math.max(1, this.currentMatchRound - 1);
            this.currentQuestionIndex = (this.currentQuestionIndex - 1 + this.questions.length) % this.questions.length;
            this.activeTeam = null;
            this.stealMode = false;
            this.currentStrikes = 0;
            this.updateActiveTeamUI();
            this.renderQuestion();
            this.showRoundAnnouncement(this.currentMatchRound);
        });
    }

    skipCurrentQuestion() {
        this.triggerQuestionTransition(() => {
            const nextIdx = this.findNextUnplayedIndex((this.currentQuestionIndex + 1) % this.questions.length);
            this.currentQuestionIndex = nextIdx;
            this.activeTeam = null;
            this.stealMode = false;
            this.currentStrikes = 0;
            this.updateActiveTeamUI();
            this.renderQuestion();
        });
    }

    awardRoundTeam1() {
        this.team1RoundsWon++;
        this.playSound('win');
        this.updateRoundStars();
        this.checkMatchChampion();
    }

    awardRoundTeam2() {
        this.team2RoundsWon++;
        this.playSound('win');
        this.updateRoundStars();
        this.checkMatchChampion();
    }

    showRoundAnnouncement(roundNum) {
        const roundNames = {
            1: { title: "🌟 RONDA 1", sub: "¡PRIMERA PREGUNTA SORPRESA!" },
            2: { title: "🌟 SEGUNDA RONDA", sub: "¡DOBLE PUNTUACIÓN Y EMOCIÓN!" },
            3: { title: "🌟 TERCERA RONDA", sub: "¡A MITAD DEL CAMINO!" },
            4: { title: "🌟 CUARTA RONDA", sub: "¡SE DECIDE TODO EN BACIS!" },
            5: { title: "🌟 QUINTA RONDA", sub: "¡RONDA FINAL DE CAMPEONES!" }
        };

        const info = roundNames[roundNum] || { title: `🌟 RONDA ${roundNum}`, sub: "¡RONDA SORPRESA!" };
        this.bigRoundNumberText.textContent = info.title;
        this.bigRoundSubText.textContent = info.sub;

        this.roundAnnouncementOverlay.classList.add('active');
        this.playSound('button');

        setTimeout(() => {
            this.roundAnnouncementOverlay.classList.remove('active');
        }, 2200);
    }

    triggerQuestionTransition(callback) {
        this.curtainTransition.classList.add('active');
        setTimeout(() => {
            callback();
        }, 350);
        setTimeout(() => {
            this.curtainTransition.classList.remove('active');
        }, 800);
    }

    startTimer(seconds) {
        this.stopTimer();
        this.timeLeft = seconds;
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();

            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.triggerStrike();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timerDigits.classList.remove('warning', 'danger');
    }

    updateTimerDisplay() {
        this.timerDigits.textContent = `${this.timeLeft}s`;
        this.timerDigits.classList.remove('warning', 'danger');
        if (this.timeLeft <= 3 && this.timeLeft > 0) {
            this.timerDigits.classList.add('danger');
        } else if (this.timeLeft <= 5 && this.timeLeft > 3) {
            this.timerDigits.classList.add('warning');
        }
    }

    createFloatingParticles() {
        const bg = document.getElementById('particlesBg');
        if (!bg) return;
        bg.innerHTML = '';
        for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = `${Math.random() * 100}vw`;
            p.style.animationDelay = `${Math.random() * 8}s`;
            p.style.animationDuration = `${7 + Math.random() * 6}s`;
            bg.appendChild(p);
        }
    }

    renderQuestion() {
        const questionObj = this.questions[this.currentQuestionIndex];
        if (!questionObj) return;

        if (!this.playedIds.includes(questionObj.id)) {
            this.playedIds.push(questionObj.id);
            this.savePlayedIds();
        }

        this.roundPot = 0;
        this.currentStrikes = 0;
        this.stealMode = false;
        this.stopTimer();
        this.timerDigits.textContent = '--s';
        this.roundPotDisplay.textContent = '0';
        this.updateMiniStrikes();

        this.questionText.textContent = questionObj.question;
        this.surpriseBadge.innerHTML = `<span>🎁</span> RONDA ${this.currentMatchRound} DE 5`;

        this.boardGrid.innerHTML = '';
        this.cheatSheetItems.innerHTML = '';

        questionObj.answers.forEach((ans, idx) => {
            const card = document.createElement('div');
            card.className = 'flip-card';
            card.dataset.points = ans.points;
            card.dataset.revealed = 'false';
            card.title = `Respuesta #${idx + 1}: ${ans.text} (${ans.points} pts)`;

            card.innerHTML = `
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <div class="card-number-badge">${idx + 1}</div>
                    </div>
                    <div class="flip-card-back">
                        <span class="answer-text">${ans.text}</span>
                        <span class="answer-points">${ans.points}</span>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => {
                if (card.dataset.revealed === 'false') {
                    card.dataset.revealed = 'true';
                    card.classList.add('revealed');
                    this.roundPot += Number(ans.points);
                    this.roundPotDisplay.textContent = this.roundPot;
                    this.playSound('correct');
                    this.stopTimer();

                    if (this.stealMode) {
                        const stealingTeam = this.activeTeam === 'team1' ? 'team2' : 'team1';
                        const stealingName = stealingTeam === 'team1' ? this.team1Name : this.team2Name;
                        this.showBigTemporaryBanner(`🎉 ¡ROBO EXITOSO!`, `${stealingName} se lleva esta ronda`);
                        if (stealingTeam === 'team1') {
                            this.awardRoundTeam1();
                        } else {
                            this.awardRoundTeam2();
                        }
                        this.stealMode = false;
                    }

                    this.broadcastSyncState();
                }
            });

            this.boardGrid.appendChild(card);

            const cheatItem = document.createElement('div');
            cheatItem.className = 'cheat-item';
            cheatItem.innerHTML = `
                <div style="display:flex; align-items:center;">
                    <div class="cheat-item-num">${idx + 1}</div>
                    <span style="font-weight:700;">${ans.text}</span>
                </div>
                <span style="color:#00ff88; font-weight:800; margin-left:0.5rem;">${ans.points} pts</span>
            `;
            this.cheatSheetItems.appendChild(cheatItem);
        });

        this.broadcastSyncState();
    }

    revealAllAnswersWithoutAddingPoints() {
        const unrevealedCards = this.boardGrid.querySelectorAll('.flip-card[data-revealed="false"]');
        unrevealedCards.forEach(card => {
            card.dataset.revealed = 'true';
            card.classList.add('revealed');
        });
        this.playSound('correct');
        this.broadcastSyncState();
    }

    triggerStrike() {
        if (this.stealMode) {
            this.playSound('incorrect');
            const originalTeamName = this.activeTeam === 'team1' ? this.team1Name : this.team2Name;
            this.showBigTemporaryBanner(`❌ ROBO FALLIDO`, `${originalTeamName} mantiene sus puntos y gana la ronda`);
            if (this.activeTeam === 'team1') {
                this.awardRoundTeam1();
            } else {
                this.awardRoundTeam2();
            }
            this.stealMode = false;
            this.broadcastSyncState();
            return;
        }

        this.currentStrikes++;
        this.playSound('incorrect');

        this.strikeContainer.innerHTML = '';
        for (let i = 0; i < Math.min(this.currentStrikes, 3); i++) {
            const xEl = document.createElement('div');
            xEl.className = 'big-strike-x';
            xEl.textContent = 'X';
            this.strikeContainer.appendChild(xEl);
        }

        this.strikeOverlay.classList.add('active');
        setTimeout(() => {
            this.strikeOverlay.classList.remove('active');
            
            if (this.currentStrikes === 3 && !this.stealMode) {
                this.stealMode = true;
                const opposingTeamName = this.activeTeam === 'team1' ? this.team2Name : this.team1Name;
                this.showBigTemporaryBanner(`❌ 3 STRIKES!`, `Oportunidad de robo para ${opposingTeamName}`);
                this.broadcastSyncState();
            }
        }, 1500);

        this.updateMiniStrikes();
    }

    showBigTemporaryBanner(title, subtitle) {
        this.bigRoundNumberText.textContent = title;
        this.bigRoundSubText.textContent = subtitle;
        this.roundAnnouncementOverlay.classList.add('active');
        setTimeout(() => {
            this.roundAnnouncementOverlay.classList.remove('active');
        }, 2500);
    }

    updateMiniStrikes() {
        this.miniStrikes.forEach((el, idx) => {
            if (idx < this.currentStrikes) {
                el.classList.add('active');
                el.textContent = 'X';
            } else {
                el.classList.remove('active');
                el.textContent = '';
            }
        });
    }

    updateRoundStars() {
        const t1Stars = document.querySelectorAll('#team1RoundStars .round-star');
        t1Stars.forEach((star, i) => {
            if (i < this.team1RoundsWon) star.classList.add('won');
            else star.classList.remove('won');
        });

        const t2Stars = document.querySelectorAll('#team2RoundStars .round-star');
        t2Stars.forEach((star, i) => {
            if (i < this.team2RoundsWon) star.classList.add('won');
            else star.classList.remove('won');
        });

        const pod1 = document.getElementById('podiumTeam1');
        const pod2 = document.getElementById('podiumTeam2');

        if (pod1 && pod2) {
            pod1.classList.remove('leading-team');
            pod2.classList.remove('leading-team');

            if (this.team1RoundsWon > this.team2RoundsWon) {
                pod1.classList.add('leading-team');
            } else if (this.team2RoundsWon > this.team1RoundsWon) {
                pod2.classList.add('leading-team');
            }
        }
    }

    checkMatchChampion() {
        if (this.team1RoundsWon >= 3) {
            this.showChampionOverlay(this.team1Name);
        } else if (this.team2RoundsWon >= 3) {
            this.showChampionOverlay(this.team2Name);
        }
    }

    showChampionOverlay(teamWinner) {
        document.getElementById('championTeamName').textContent = teamWinner;
        this.championOverlay.classList.add('active');
        this.playSound('win');
    }

    handleCustomQuestionSubmit() {
        const qText = document.getElementById('inputQuestionText').value;

        const answers = [];
        for (let i = 1; i <= 6; i++) {
            const txt = document.getElementById(`ansText${i}`).value.trim();
            const pts = document.getElementById(`ansPts${i}`).value;
            if (txt && pts) {
                answers.push({ text: txt.toUpperCase(), points: Number(pts) });
            }
        }

        if (answers.length === 0) {
            alert('Agrega al menos una respuesta con sus puntos.');
            return;
        }

        const newQuestion = {
            id: Date.now(),
            question: qText,
            answers: answers
        };

        this.questions.unshift(newQuestion);
        this.saveQuestions();
        this.currentQuestionIndex = 0;
        this.renderQuestion();

        document.getElementById('modalAddQuestion').classList.remove('active');
        document.getElementById('formAddQuestion').reset();
        alert('¡Pregunta minera sorpresa agregada con éxito!');
    }

    // ==========================================
    // MÉTODOS DE DINERO RÁPIDO (FAST MONEY)
    // ==========================================
    toggleFastMoneyMode() {
        this.fastMoneyMode = !this.fastMoneyMode;
        
        if (this.fastMoneyMode) {
            this.normalGameArena.style.display = 'none';
            this.normalGameStrip.style.display = 'none';
            this.fastMoneyArena.style.display = 'block';
            document.getElementById('btnToggleFastMoney').textContent = '📺 VOLVER AL JUEGO';
            this.renderFastMoneyBoard();
        } else {
            this.normalGameArena.style.display = 'grid';
            this.normalGameStrip.style.display = 'flex';
            this.fastMoneyArena.style.display = 'none';
            document.getElementById('btnToggleFastMoney').textContent = '🔥 RONDA FINAL';
        }
        
        this.playSound('button');
        this.broadcastSyncState();
    }

    renderFastMoneyBoard() {
        const body = document.getElementById('fastMoneyTableBody');
        body.innerHTML = '';

        this.fastQuestions.forEach((q, idx) => {
            const row = document.createElement('tr');
            
            // Celdas de Jugador 1
            const p1AnsRevealed = this.fastRevealed.player1[idx];
            const p1PtsRevealed = this.fastPointsRevealed.player1[idx];
            const p1AnsText = p1AnsRevealed ? (this.fastAnswers.player1[idx] || "---") : "";
            const p1PtsText = p1PtsRevealed ? this.fastPoints.player1[idx] : "";

            // Celdas de Jugador 2
            const p2AnsRevealed = this.fastRevealed.player2[idx];
            const p2PtsRevealed = this.fastPointsRevealed.player2[idx];
            const p2AnsText = p2AnsRevealed ? (this.fastAnswers.player2[idx] || "---") : "";
            const p2PtsText = p2PtsRevealed ? this.fastPoints.player2[idx] : "";

            row.innerHTML = `
                <td style="padding: 1rem; font-weight:800; color:#fff;">${idx + 1}. ${q.question}</td>
                
                <td style="padding: 0.6rem;">
                    <div class="fast-ans-cell ${p1AnsRevealed ? 'revealed' : 'empty'}">${p1AnsText}</div>
                </td>
                <td style="padding: 0.6rem; text-align:center;">
                    <div class="fast-pts-cell ${p1PtsRevealed ? 'revealed' : ''}">${p1PtsText}</div>
                </td>
                
                <td style="padding: 0.6rem;">
                    <div class="fast-ans-cell ${p2AnsRevealed ? 'revealed' : 'empty'}">${p2AnsText}</div>
                </td>
                <td style="padding: 0.6rem; text-align:center;">
                    <div class="fast-pts-cell ${p2PtsRevealed ? 'revealed' : ''}">${p2PtsText}</div>
                </td>
            `;
            body.appendChild(row);
        });
    }

    revealFastCell(playerKey, qIdx, cellType) {
        if (cellType === 'answer') {
            this.fastRevealed[playerKey][qIdx] = true;
            this.playSound('button');
        } else if (cellType === 'points') {
            this.fastPointsRevealed[playerKey][qIdx] = true;
            const pts = Number(this.fastPoints[playerKey][qIdx]) || 0;
            if (pts > 0) {
                this.playSound('correct');
            } else {
                this.playSound('incorrect');
            }
        }
        
        this.renderFastMoneyBoard();
        this.checkFastTotalPoints();
        this.broadcastSyncState();
    }

    checkFastTotalPoints() {
        let total = 0;
        
        // Sumar puntos revelados del Jugador 1
        this.fastPoints.player1.forEach((pts, i) => {
            if (this.fastPointsRevealed.player1[i]) {
                total += (Number(pts) || 0);
            }
        });

        // Sumar puntos revelados del Jugador 2
        this.fastPoints.player2.forEach((pts, i) => {
            if (this.fastPointsRevealed.player2[i]) {
                total += (Number(pts) || 0);
            }
        });

        this.fastTotalPointsBox.textContent = total;

        // Si llega a 200 puntos y no se ha celebrado aún
        if (total >= 200 && !this.fastMoneyCelebrated) {
            this.fastMoneyCelebrated = true;
            this.triggerVictoryCelebration();
        } else if (total < 200) {
            this.fastMoneyCelebrated = false;
        }
    }

    triggerVictoryCelebration() {
        this.playSound('win');
        this.showBigTemporaryBanner(`💥 ¡200 PUNTOS ALCANZADOS! 💥`, `🏆 ¡HISTÓRICO! EL PREMIO MAYOR ES SUYO 🏆`);
        this.startFireworks();
    }

    startFireworks() {
        const canvas = document.getElementById('fireworksCanvas');
        if (!canvas) return;
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const colors = ['#ffd800', '#ff0055', '#00ff88', '#00e1ff', '#ffaa00', '#ffffff'];

        const loop = () => {
            if (canvas.style.display === 'none') return;
            requestAnimationFrame(loop);
            ctx.fillStyle = 'rgba(4, 9, 22, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Crear explosiones
            if (Math.random() < 0.12) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * (canvas.height * 0.6);
                const color = colors[Math.floor(Math.random() * colors.length)];
                for (let i = 0; i < 45; i++) {
                    particles.push(new FireworkParticle(x, y, color));
                }
            }

            particles.forEach((p, index) => {
                if (p.alpha <= 0) {
                    particles.splice(index, 1);
                } else {
                    p.update();
                    p.draw(ctx);
                }
            });
        };
        loop();

        setTimeout(() => {
            canvas.style.display = 'none';
        }, 15000);
    }

    startFastTimer(seconds) {
        this.stopFastTimer();
        this.fastTimeLeft = seconds;
        this.updateFastTimerDisplay();

        this.fastTimerInterval = setInterval(() => {
            this.fastTimeLeft--;
            this.updateFastTimerDisplay();

            if (this.fastTimeLeft <= 0) {
                this.stopFastTimer();
                this.playSound('incorrect');
            }
        }, 1000);
    }

    stopFastTimer() {
        if (this.fastTimerInterval) {
            clearInterval(this.fastTimerInterval);
            this.fastTimerInterval = null;
        }
    }

    updateFastTimerDisplay() {
        this.fastTimerDigits.textContent = `${this.fastTimeLeft}s`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.miningGame = new MiningGameShow();
});
