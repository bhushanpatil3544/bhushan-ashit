/**
 * Main Application Controller & Router
 * Coordinates taxonomy sidebar, view routing, search, dark mode, font scaling, and global interactions.
 */

window.AppRouter = (function() {
  let currentExamId = 'mpsc';
  let currentView = 'dashboard';
  let currentTopicId = null;
  let sidebarSearch = '';
  let collapsedSubjects = {}; // subjectId -> boolean
  let currentFontSize = 16;

  function init() {
    // Load theme preference
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Load font size preference
    const savedFontSize = localStorage.getItem('app_font_size');
    if (savedFontSize) {
      currentFontSize = parseInt(savedFontSize);
      document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
    }

    renderSidebar();
    renderMainView();
  }

  function getTopicMeta(topicId) {
    const taxonomy = window.PLATFORM_TAXONOMY;
    if (!taxonomy || !taxonomy.exams) return { topicName: topicId, chapterName: '', subjectName: '', examName: '' };

    for (const ex of taxonomy.exams) {
      for (const sub of (ex.subjects || [])) {
        for (const chap of (sub.chapters || [])) {
          for (const top of (chap.topics || [])) {
            if (top.id === topicId) {
              return {
                topicId: top.id,
                topicName: top.name,
                hasLesson: !!top.hasLesson,
                chapterId: chap.id,
                chapterName: chap.name,
                subjectId: sub.id,
                subjectName: sub.name,
                examId: ex.id,
                examName: ex.name
              };
            }
          }
        }
      }
    }
    return { topicName: topicId, chapterName: '', subjectName: '', examName: '' };
  }

  function renderSidebar() {
    const sidebarEl = document.getElementById('syllabus-sidebar-tree');
    if (!sidebarEl) return;

    const taxonomy = window.PLATFORM_TAXONOMY;
    if (!taxonomy || !taxonomy.exams) return;

    const currentExam = taxonomy.exams.find(e => e.id === currentExamId) || taxonomy.exams[0];
    const query = sidebarSearch.toLowerCase().trim();

    let html = `
      <div class="sidebar-header-section" style="padding: 16px 14px; border-bottom: 1px solid var(--border);">
        <!-- Exam Switcher Pills -->
        <div style="display: flex; gap: 6px; margin-bottom: 12px; background: var(--bg-main); padding: 4px; border-radius: var(--radius-md);">
          ${taxonomy.exams.map(ex => `
            <button class="btn" style="flex: 1; padding: 8px 10px; font-size: 0.85rem; font-weight: 700; border-radius: var(--radius-sm); border: none; background: ${currentExamId === ex.id ? 'var(--primary)' : 'transparent'}; color: ${currentExamId === ex.id ? '#fff' : 'var(--text-muted)'}; cursor: pointer;" onclick="window.AppRouter.switchExam('${ex.id}')">
              ${ex.shortName}
            </button>
          `).join('')}
        </div>

        <!-- Sidebar Syllabus Search Filter -->
        <div style="position: relative;">
          <input type="text" class="form-control" style="font-size: 0.85rem; padding: 8px 12px; border-radius: var(--radius-sm);" placeholder="घटक / विषय शोधा..." value="${sidebarSearch}" oninput="window.AppRouter.handleSidebarSearch(this.value)">
          ${sidebarSearch ? `
            <button style="position: absolute; right: 8px; top: 8px; border: none; background: transparent; cursor: pointer; color: var(--text-light);" onclick="window.AppRouter.handleSidebarSearch('')">✕</button>
          ` : ''}
        </div>
      </div>

      <!-- Quick Nav Buttons -->
      <div style="padding: 10px 14px; border-bottom: 1px solid var(--border); display: flex; gap: 8px;">
        <button class="btn btn-outline" style="flex: 1; font-size: 0.82rem; padding: 6px 8px;" onclick="window.AppRouter.openDashboard()">
          🏠 डॅशबोर्ड
        </button>
        <button class="btn btn-outline" style="flex: 1; font-size: 0.82rem; padding: 6px 8px;" onclick="window.AppRouter.openPractice()">
          ✍️ सराव प्रश्न
        </button>
      </div>

      <!-- Syllabus Tree -->
      <div class="syllabus-tree" style="padding: 10px 8px; max-height: calc(100vh - 220px); overflow-y: auto;">
    `;

    currentExam.subjects.forEach(sub => {
      // Filter logic
      const chaptersMatching = (sub.chapters || []).filter(chap => {
        if (!query) return true;
        const chapMatch = chap.name.toLowerCase().includes(query);
        const topMatch = (chap.topics || []).some(t => t.name.toLowerCase().includes(query));
        return chapMatch || topMatch;
      });

      if (query && chaptersMatching.length === 0 && !sub.name.toLowerCase().includes(query)) {
        return; // Skip subject if no matches
      }

      const isCollapsed = query ? false : (collapsedSubjects[sub.id] || false);

      html += `
        <div class="subject-group" id="sub-group-${sub.id}" style="margin-bottom: 8px;">
          <!-- Subject Title Accordion -->
          <div class="subject-header" onclick="window.AppRouter.toggleSubjectCollapse('${sub.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: var(--bg-main); border-radius: var(--radius-sm); cursor: pointer; user-select: none;">
            <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.92rem; color: var(--text-main);">
              <span>${sub.icon || '📁'}</span>
              <span>${sub.name}</span>
            </div>
            <span style="font-size: 0.8rem; color: var(--text-light); transition: transform 0.2s; transform: rotate(${isCollapsed ? '0deg' : '90deg'});">›</span>
          </div>

          <!-- Chapters Container -->
          <div class="chapters-container" style="display: ${isCollapsed ? 'none' : 'block'}; padding-left: 10px; margin-top: 4px;">
            ${chaptersMatching.map(chap => {
              const filteredTopics = (chap.topics || []).filter(t => !query || t.name.toLowerCase().includes(query) || chap.name.toLowerCase().includes(query));
              return `
                <div class="chapter-item" style="margin-bottom: 6px;">
                  <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-light); padding: 4px 6px; text-transform: uppercase;">
                    ${chap.name}
                  </div>
                  <div class="topics-list" style="display: grid; gap: 2px;">
                    ${filteredTopics.map(top => {
                      const isActive = currentTopicId === top.id && currentView === 'lesson';
                      const isCompleted = window.DashboardEngine.isTopicCompleted(top.id);
                      const isInProgress = window.DashboardEngine.isTopicInProgress(top.id);

                      return `
                        <div class="topic-nav-item ${isActive ? 'active' : ''}" onclick="window.AppRouter.openLesson('${top.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-radius: var(--radius-sm); cursor: pointer; font-size: 0.86rem; background: ${isActive ? 'var(--primary-subtle)' : 'transparent'}; color: ${isActive ? 'var(--primary)' : 'var(--text-main)'}; font-weight: ${isActive ? '700' : 'normal'};">
                          <div style="display: flex; align-items: center; gap: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                            <span style="font-size: 0.85rem;">
                              ${isCompleted ? '✅' : (isInProgress ? '📖' : '▫️')}
                            </span>
                            <span title="${top.name}">${top.name}</span>
                          </div>
                          ${top.hasLesson ? `
                            <span class="badge badge-success" style="font-size: 0.68rem; padding: 2px 6px; flex-shrink: 0;" title="१४ सखोल विभाग उपलब्ध">पाठ</span>
                          ` : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    sidebarEl.innerHTML = html;
  }

  function renderMainView() {
    const mainEl = document.getElementById('main-content-view');
    if (!mainEl) return;

    if (currentView === 'dashboard') {
      window.DashboardEngine.renderDashboardView(mainEl, currentExamId);
    } else if (currentView === 'lesson') {
      const meta = getTopicMeta(currentTopicId);
      window.LessonEngine.renderLessonView(mainEl, currentTopicId, meta);
    } else if (currentView === 'practice') {
      window.PracticeEngine.render(mainEl);
    }
  }

  return {
    init: init,

    openDashboard: function() {
      currentView = 'dashboard';
      currentTopicId = null;
      renderSidebar();
      renderMainView();
      closeMobileSidebar();
    },

    openLesson: function(topicId) {
      currentTopicId = topicId;
      currentView = 'lesson';

      // Auto expand parent subject
      const meta = getTopicMeta(topicId);
      if (meta && meta.subjectId) {
        collapsedSubjects[meta.subjectId] = false;
      }
      if (meta && meta.examId) {
        currentExamId = meta.examId;
      }

      renderSidebar();
      renderMainView();
      closeMobileSidebar();
    },

    openPractice: function() {
      currentView = 'practice';
      currentTopicId = null;
      renderSidebar();
      renderMainView();
      closeMobileSidebar();
    },

    switchExam: function(examId) {
      currentExamId = examId;
      renderSidebar();
      if (currentView === 'dashboard') {
        renderMainView();
      }
    },

    toggleSubjectCollapse: function(subId) {
      collapsedSubjects[subId] = !collapsedSubjects[subId];
      renderSidebar();
    },

    filterSidebarSubject: function(subId) {
      collapsedSubjects[subId] = false;
      renderSidebar();
      const el = document.getElementById(`sub-group-${subId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    },

    handleSidebarSearch: function(val) {
      sidebarSearch = val;
      renderSidebar();
    },

    updateSidebarProgress: function() {
      renderSidebar();
    },

    getTopicMeta: getTopicMeta,

    // Global Search Header
    handleGlobalSearch: function(query) {
      const dropdown = document.getElementById('global-search-results');
      if (!dropdown) return;

      const q = query.toLowerCase().trim();
      if (!q || q.length < 2) {
        dropdown.style.display = 'none';
        return;
      }

      const results = [];
      const taxonomy = window.PLATFORM_TAXONOMY;
      if (taxonomy && taxonomy.exams) {
        taxonomy.exams.forEach(ex => {
          (ex.subjects || []).forEach(sub => {
            (sub.chapters || []).forEach(chap => {
              (chap.topics || []).forEach(top => {
                if (top.name.toLowerCase().includes(q) || chap.name.toLowerCase().includes(q) || sub.name.toLowerCase().includes(q)) {
                  results.push({
                    type: 'topic',
                    id: top.id,
                    title: top.name,
                    sub: `${ex.shortName} › ${sub.name} › ${chap.name}`,
                    hasLesson: top.hasLesson
                  });
                }
              });
            });
          });
        });
      }

      // Also search MCQs
      (window.MCQS_BANK || []).forEach(mcq => {
        if (results.length < 25 && (mcq.q.toLowerCase().includes(q) || (mcq.subtopic && mcq.subtopic.toLowerCase().includes(q)))) {
          results.push({
            type: 'mcq',
            id: mcq.id,
            title: mcq.q.slice(0, 80) + '...',
            sub: `MCQ: ${mcq.subject}`
          });
        }
      });

      if (results.length === 0) {
        dropdown.innerHTML = `<div style="padding: 12px; font-size: 0.88rem; color: var(--text-muted);">काहीही सापडले नाही. दुसरा शब्द शोधा.</div>`;
      } else {
        dropdown.innerHTML = results.slice(0, 10).map(r => `
          <div style="padding: 10px 14px; border-bottom: 1px solid var(--border); cursor: pointer;" onclick="window.AppRouter.selectSearchResult('${r.type}', '${r.id}')">
            <div style="font-weight: 700; font-size: 0.92rem; color: var(--primary); display: flex; align-items: center; justify-content: space-between;">
              <span>${r.title}</span>
              ${r.hasLesson ? '<span class="badge badge-success" style="font-size: 0.7rem;">सखोल पाठ</span>' : ''}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-light); margin-top: 2px;">${r.sub}</div>
          </div>
        `).join('');
      }

      dropdown.style.display = 'block';
    },

    selectSearchResult: function(type, id) {
      const dropdown = document.getElementById('global-search-results');
      if (dropdown) dropdown.style.display = 'none';
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) searchInput.value = '';

      if (type === 'topic') {
        this.openLesson(id);
      } else if (type === 'mcq') {
        this.openPractice();
      }
    },

    // Theme & Font Tools
    toggleTheme: function() {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
    },

    adjustFontSize: function(delta) {
      currentFontSize = Math.max(13, Math.min(22, currentFontSize + delta));
      document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
      localStorage.setItem('app_font_size', currentFontSize.toString());
    },

    toggleMobileSidebar: function() {
      const sidebar = document.getElementById('sidebar-panel');
      if (sidebar) sidebar.classList.toggle('open');
    }
  };
})();

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar-panel');
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
}

// Global click to close search dropdown
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('global-search-results');
  const searchInput = document.getElementById('global-search-input');
  if (dropdown && !dropdown.contains(e.target) && e.target !== searchInput) {
    dropdown.style.display = 'none';
  }
});

// Boot app on DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  window.AppRouter.init();
});
