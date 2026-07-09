// Controlador Principal de "100 MINEROS DIJERON - EDICIÓN GRUPO BACIS"
// Autor: Antigravity AI - Edición Robo de Turno automático al 3er Strike

class MiningGameShow {
    constructor() {
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
        this.stealMode = false; // true cuando alcanzan 3 strikes
        this.currentStrikes = 0;
        
        this.soundEnabled = true;

        // Temporizador
        this.timerInterval = null;
        this.timeLeft = 10;

        // Elementos de audio
        this.sounds = {
            intro: new Audio('a-jugar-100-mexicanos-dijeron_uzh3r4B.mp3'),
            button: new Audio('boton-10-mexicanos-digieron.mp3'),
            correct: new Audio('correcto-100-mexicanos-dijeron.mp3'),
            incorrect: new Audio('incorrecto-100-mexicanos-dijeron.mp3'),
            win: new Audio('triunfo-100-mexicanos-dijeron.mp3')
        };

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
    }

    bindEvents() {
        document.getElementById('btnStartShow').addEventListener('click', () => {
            this.introScreen.classList.add('hidden');
            this.playSound('intro');
            this.currentMatchRound = 1;
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

        document.getElementById('btnRestartMatch').addEventListener('click', () => {
            this.team1RoundsWon = 0;
            this.team2RoundsWon = 0;
            this.currentMatchRound = 1;
            this.updateRoundStars();
            this.championOverlay.classList.remove('active');
            this.showRoundAnnouncement(1);
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
        } else if (cmd.action === 'REQUEST_SYNC') {
            this.broadcastSyncState();
        }
    }

    setActiveTeam(team) {
        this.activeTeam = team; // 'team1', 'team2', o null
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
            currentStrikes: this.currentStrikes
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

                    // Si estábamos en modo de robo y aciertan, el equipo contrario roba con éxito
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
            // Si ya estábamos en modo de robo y fallan el robo, el equipo activo original gana la ronda
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
            
            // Si llega a 3 strikes, se activa la oportunidad de robo para el contrario
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
}

window.addEventListener('DOMContentLoaded', () => {
    window.miningGame = new MiningGameShow();
});
