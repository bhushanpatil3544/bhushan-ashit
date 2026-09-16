/**
 * Practice Engine
 * 540-Question MCQ Practice Lab & CBT Mock Test Simulator
 */

window.PracticeEngine = (function() {
  let selectedSubject = 'ALL';
  let searchQuery = '';
  let currentPage = 1;
  const pageSize = 15;
  let currentMode = 'practice'; // 'practice' or 'exam'

  // Exam mode state
  let examQuestions = [];
  let examAnswers = {}; // qIndex -> optionIndex
  let examTimeRemaining = 0; // in seconds
  let examTimerInterval = null;
  let examSubmitted = false;

  function getSubjectsList() {
    const bank = window.MCQS_BANK || [];
    const subjects = new Set();
    bank.forEach(q => {
      if (q.subject) subjects.add(q.subject);
    });
    return Array.from(subjects);
  }

  function getFilteredQuestions() {
    const bank = window.MCQS_BANK || [];
    return bank.filter(q => {
      const matchSub = (selectedSubject === 'ALL' || q.subject === selectedSubject);
      const matchSearch = !searchQuery ||
        (q.q && q.q.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.subtopic && q.subtopic.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.exp && q.exp.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchSub && matchSearch;
    });
  }

  function renderPracticeView(containerElement) {
    const allSubjects = getSubjectsList();
    const filtered = getFilteredQuestions();
    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    if (currentPage > totalPages) currentPage = 1;

    const startIdx = (currentPage - 1) * pageSize;
    const pageQuestions = filtered.slice(startIdx, startIdx + pageSize);

    let html = `
      <div class="practice-container">
        <!-- Header -->
        <div class="card mb-4" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border: none; padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff; margin-bottom: 8px;">५४०+ गुणवत्तापूर्ण MCQs</span>
              <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 4px;">🎯 बहुपर्यायी प्रश्न सराव लॅब (MCQ Practice Lab)</h1>
              <p style="opacity: 0.9; font-size: 0.92rem;">
                MPSC व RRB NTPC परीक्षेसाठी सर्व विषयांचे स्पष्टीकरणासह सराव प्रश्न.
              </p>
            </div>
            <div style="display: flex; gap: 8px;">
              <button class="btn" style="background: ${currentMode === 'practice' ? '#fff' : 'rgba(255,255,255,0.2)'}; color: ${currentMode === 'practice' ? '#047857' : '#fff'}; font-weight: 700;" onclick="window.PracticeEngine.setMode('practice')">
                ✍️ सराव मोड
              </button>
              <button class="btn" style="background: ${currentMode === 'exam' ? '#fff' : 'rgba(255,255,255,0.2)'}; color: ${currentMode === 'exam' ? '#047857' : '#fff'}; font-weight: 700;" onclick="window.PracticeEngine.setMode('exam')">
                ⏱️ CBT मॉक टेस्ट
              </button>
            </div>
          </div>
        </div>
    `;

    if (currentMode === 'practice') {
      html += `
        <!-- Filters Bar -->
        <div class="card mb-4" style="padding: 16px;">
          <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            <!-- Subject Filter -->
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.88rem; font-weight: 700;">विषय निवडा:</span>
              <select class="form-control" style="width: auto;" onchange="window.PracticeEngine.filterSubject(this.value)">
                <option value="ALL" ${selectedSubject === 'ALL' ? 'selected' : ''}>🌐 सर्व विषय (${(window.MCQS_BANK || []).length})</option>
                ${allSubjects.map(s => `
                  <option value="${s}" ${selectedSubject === s ? 'selected' : ''}>${s}</option>
                `).join('')}
              </select>
            </div>

            <!-- Search -->
            <div style="flex: 1; max-width: 350px;">
              <input type="text" class="form-control" placeholder="प्रश्नातील शब्द शोधा..." value="${searchQuery}" oninput="window.PracticeEngine.handleSearch(this.value)">
            </div>
          </div>
        </div>

        <!-- Question Counter -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 0.9rem; color: var(--text-muted);">
          <span>एकूण <strong>${filtered.length}</strong> प्रश्न उपलब्ध (पान ${currentPage} / ${totalPages})</span>
        </div>

        <!-- Questions List -->
        <div style="display: grid; gap: 16px;">
          ${pageQuestions.map((q, idx) => {
            const globalIndex = startIdx + idx;
            return `
              <div class="card" id="bank-q-${q.id}" style="padding: 18px; border: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                  <span class="badge badge-primary">${q.subject}</span>
                  ${q.subtopic ? `<span class="badge" style="background: var(--bg-main); color: var(--text-muted);">${q.subtopic}</span>` : ''}
                  <span style="font-size: 0.8rem; color: var(--text-light); margin-left: auto;">#${q.id}</span>
                </div>

                <p style="font-size: 1.02rem; font-weight: 600; color: var(--text-main); margin-bottom: 12px; white-space: pre-line;">
                  ${globalIndex + 1}. ${q.q}
                </p>

                <div style="display: grid; gap: 8px;">
                  ${q.options.map((opt, oIdx) => `
                    <button class="option-btn" id="bank-opt-${q.id}-${oIdx}" onclick="window.PracticeEngine.checkAnswer(${q.id}, ${oIdx}, ${q.ans})" style="text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); cursor: pointer; font-size: 0.92rem; transition: all 0.2s;">
                      <strong>(${String.fromCharCode(65 + oIdx)})</strong> ${opt}
                    </button>
                  `).join('')}
                </div>

                <div id="bank-exp-${q.id}" style="display: none; margin-top: 14px; padding: 12px 14px; border-radius: var(--radius-sm); background: var(--secondary-subtle); border-left: 4px solid var(--secondary);">
                  <strong style="color: var(--secondary);">💡 शिक्षकांचे सविस्तर स्पष्टीकरण:</strong>
                  <p style="margin-top: 4px; font-size: 0.92rem; color: var(--text-main); line-height: 1.5;">${q.exp}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Pagination -->
        <div style="display: flex; justify-content: center; gap: 8px; margin-top: 24px; margin-bottom: 30px;">
          <button class="btn btn-outline" ${currentPage === 1 ? 'disabled' : ''} onclick="window.PracticeEngine.goToPage(${currentPage - 1})">
            ‹ मागील
          </button>
          <span style="display: flex; align-items: center; padding: 0 12px; font-weight: 600;">
            ${currentPage} / ${totalPages}
          </span>
          <button class="btn btn-outline" ${currentPage === totalPages ? 'disabled' : ''} onclick="window.PracticeEngine.goToPage(${currentPage + 1})">
            पुढील ›
          </button>
        </div>
      `;
    } else {
      // Exam Mode
      html += renderCBTExamView();
    }

    html += `</div>`;
    containerElement.innerHTML = html;
  }

  function renderCBTExamView() {
    if (examQuestions.length === 0 && !examSubmitted) {
      return `
        <div class="card p-4 text-center" style="max-width: 600px; margin: 30px auto; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 12px;">💻</div>
          <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 8px;">CBT कॉम्प्युटर आधारित मॉक टेस्ट</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.95rem;">
            खऱ्याखुऱ्या परीक्षेप्रमाणे २५ प्रश्नांची वेळबद्ध टेस्ट. निगेटिव्ह मार्किंगसह रिअल-टाइम स्कोअरकार्ड मिळेल.
          </p>
          <div style="background: var(--bg-main); padding: 14px; border-radius: var(--radius-md); text-align: left; margin-bottom: 20px; font-size: 0.9rem;">
            <div>⏱️ <strong>एकूण वेळ:</strong> २० मिनिटे</div>
            <div style="margin-top: 4px;">📝 <strong>एकूण प्रश्न:</strong> २५ प्रश्न (सर्व विषयांचे मिश्रण)</div>
            <div style="margin-top: 4px;">🎯 <strong>गुण पद्धत:</strong> प्रत्येक बरोबर उत्तरास +१ गुण, चुकीच्या उत्तरास -०.२५</div>
          </div>
          <button class="btn btn-primary" style="padding: 12px 28px; font-size: 1.05rem;" onclick="window.PracticeEngine.startExam()">
            🚀 परीक्षा सुरू करा
          </button>
        </div>
      `;
    }

    if (examSubmitted) {
      return renderExamResults();
    }

    // Live Exam
    const minutes = Math.floor(examTimeRemaining / 60);
    const seconds = examTimeRemaining % 60;
    const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return `
      <div class="cbt-exam-area">
        <!-- Timer Bar -->
        <div class="card mb-3" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 20px; background: var(--bg-card); position: sticky; top: 75px; z-index: 100; box-shadow: var(--shadow-md);">
          <div style="font-weight: 700; color: var(--primary);">MPSC / RRB NTPC Mini Mock Exam</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.9rem; color: var(--text-muted);">शिल्लक वेळ:</span>
            <span class="badge" style="font-size: 1.1rem; padding: 6px 12px; background: ${examTimeRemaining < 120 ? '#ef4444' : 'var(--primary)'}; color: white; font-weight: 800;">
              ⏳ ${timeDisplay}
            </span>
          </div>
          <button class="btn btn-primary" onclick="window.PracticeEngine.submitExam()">
            📤 परीक्षा सबमिट करा
          </button>
        </div>

        <!-- Exam Questions -->
        <div style="display: grid; gap: 16px;">
          ${examQuestions.map((q, idx) => `
            <div class="card" style="padding: 18px; border: 1px solid var(--border);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span class="badge badge-primary">${q.subject}</span>
                <span style="font-weight: 700; color: var(--text-light);">प्रश्न ${idx + 1} / ${examQuestions.length}</span>
              </div>
              <p style="font-size: 1.02rem; font-weight: 600; margin-bottom: 12px; white-space: pre-line;">
                ${idx + 1}. ${q.q}
              </p>
              <div style="display: grid; gap: 8px;">
                ${q.options.map((opt, oIdx) => `
                  <label style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; background: ${examAnswers[idx] === oIdx ? 'var(--primary-subtle)' : 'var(--bg-card)'};">
                    <input type="radio" name="exam_q_${idx}" value="${oIdx}" ${examAnswers[idx] === oIdx ? 'checked' : ''} onchange="window.PracticeEngine.recordExamAnswer(${idx}, ${oIdx})">
                    <span><strong>(${String.fromCharCode(65 + oIdx)})</strong> ${opt}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <button class="btn btn-primary" style="padding: 12px 32px; font-size: 1.1rem;" onclick="window.PracticeEngine.submitExam()">
            📤 संपूर्ण परीक्षा सबमिट करा
          </button>
        </div>
      </div>
    `;
  }

  function renderExamResults() {
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;

    examQuestions.forEach((q, idx) => {
      const userAns = examAnswers[idx];
      if (userAns === undefined) {
        unattempted++;
      } else if (userAns === q.ans) {
        correct++;
      } else {
        wrong++;
      }
    });

    const marks = (correct * 1) - (wrong * 0.25);
    const maxMarks = examQuestions.length;
    const percent = Math.max(0, Math.round((marks / maxMarks) * 100));

    return `
      <div class="card p-4" style="max-width: 700px; margin: 20px auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 3rem;">🎯</div>
          <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 4px;">परीक्षेचा सविस्तर निकाल</h2>
          <div style="font-size: 2.2rem; font-weight: 900; color: ${percent >= 60 ? 'var(--secondary)' : 'var(--danger)'}; margin: 10px 0;">
            ${marks.toFixed(2)} / ${maxMarks} गुण (${percent}%)
          </div>
        </div>

        <div class="stats-grid mb-4">
          <div class="stat-card">
            <div class="stat-value" style="color: var(--secondary);">✅ ${correct}</div>
            <div class="stat-label">बरोबर उत्तरे (+${correct})</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color: var(--danger);">❌ ${wrong}</div>
            <div class="stat-label">चुकीची उत्तरे (-${(wrong * 0.25).toFixed(2)})</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" style="color: var(--text-light);">⚪ ${unattempted}</div>
            <div class="stat-label">सोडून दिलेले</div>
          </div>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 14px;">सर्व प्रश्नांची अचूक उत्तरे व स्पष्टीकरण:</h3>
        <div style="display: grid; gap: 14px; max-height: 400px; overflow-y: auto; padding-right: 8px;">
          ${examQuestions.map((q, idx) => {
            const userAns = examAnswers[idx];
            const isCorrect = userAns === q.ans;
            const isUnattempted = userAns === undefined;
            return `
              <div style="padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: ${isCorrect ? '#f0fdf4' : (isUnattempted ? 'var(--bg-main)' : '#fef2f2')};">
                <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 4px;">
                  ${idx + 1}. ${q.q}
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                  तुमचे उत्तर: <strong>${userAns !== undefined ? q.options[userAns] : 'अनुत्तरित'}</strong> |
                  योग्य उत्तर: <strong style="color: #16a34a;">${q.options[q.ans]}</strong>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-main); margin-top: 6px; background: rgba(0,0,0,0.03); padding: 6px 8px; border-radius: 4px;">
                  ${q.exp}
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <button class="btn btn-primary" onclick="window.PracticeEngine.startExam()">
            🔄 नवीन मॉक टेस्ट सुरू करा
          </button>
        </div>
      </div>
    `;
  }

  return {
    render: function(containerElement) {
      renderPracticeView(containerElement);
    },

    setMode: function(mode) {
      currentMode = mode;
      const container = document.getElementById('main-content-view');
      if (container) renderPracticeView(container);
    },

    filterSubject: function(subj) {
      selectedSubject = subj;
      currentPage = 1;
      const container = document.getElementById('main-content-view');
      if (container) renderPracticeView(container);
    },

    handleSearch: function(val) {
      searchQuery = val;
      currentPage = 1;
      const container = document.getElementById('main-content-view');
      if (container) renderPracticeView(container);
    },

    goToPage: function(page) {
      currentPage = page;
      const container = document.getElementById('main-content-view');
      if (container) {
        renderPracticeView(container);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    checkAnswer: function(qId, selectedIdx, correctIdx) {
      const isCorrect = selectedIdx === correctIdx;
      for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`bank-opt-${qId}-${i}`);
        if (!btn) continue;
        btn.disabled = true;
        if (i === correctIdx) {
          btn.style.background = '#dcfce7';
          btn.style.borderColor = '#16a34a';
          btn.style.color = '#15803d';
          btn.style.fontWeight = 'bold';
        } else if (i === selectedIdx && !isCorrect) {
          btn.style.background = '#fee2e2';
          btn.style.borderColor = '#dc2626';
          btn.style.color = '#b91c1c';
        }
      }
      const expBox = document.getElementById(`bank-exp-${qId}`);
      if (expBox) expBox.style.display = 'block';

      window.DashboardEngine.recordMcqAttempt(isCorrect, `bank-${qId}`);
    },

    startExam: function() {
      const bank = (window.MCQS_BANK || []).slice();
      // Shuffle bank
      for (let i = bank.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bank[i], bank[j]] = [bank[j], bank[i]];
      }
      examQuestions = bank.slice(0, 25);
      examAnswers = {};
      examTimeRemaining = 20 * 60; // 20 mins
      examSubmitted = false;

      if (examTimerInterval) clearInterval(examTimerInterval);
      examTimerInterval = setInterval(() => {
        examTimeRemaining--;
        if (examTimeRemaining <= 0) {
          clearInterval(examTimerInterval);
          window.PracticeEngine.submitExam();
        } else {
          // Re-render only if in exam view
          const container = document.getElementById('main-content-view');
          if (container && currentMode === 'exam' && !examSubmitted) {
            renderPracticeView(container);
          }
        }
      }, 1000);

      const container = document.getElementById('main-content-view');
      if (container) renderPracticeView(container);
    },

    recordExamAnswer: function(qIdx, oIdx) {
      examAnswers[qIdx] = oIdx;
    },

    submitExam: function() {
      if (examTimerInterval) clearInterval(examTimerInterval);
      examSubmitted = true;
      const container = document.getElementById('main-content-view');
      if (container) renderPracticeView(container);
    }
  };
})();
