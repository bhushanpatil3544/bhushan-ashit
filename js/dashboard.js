/**
 * Dashboard & Student Progress Tracker
 * Manages real student study analytics, completion tracking, streak, and localStorage persistence.
 */

window.DashboardEngine = (function() {
  const STORAGE_KEY = 'exam_platform_progress_v2';

  function getInitialState() {
    return {
      completedTopics: [],
      inProgressTopics: [],
      bookmarks: [],
      mcqStats: {
        totalAttempted: 0,
        correctCount: 0,
        history: [] // { questionId, date, isCorrect }
      },
      testScores: {}, // topicId -> { score, total, date, percent }
      streakDays: 1,
      lastStudyDate: new Date().toISOString().split('T')[0],
      currentExam: 'mpsc'
    };
  }

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getInitialState();
      const parsed = JSON.parse(raw);
      // Check streak
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastStudyDate) {
        const lastDate = new Date(parsed.lastStudyDate);
        const currDate = new Date(today);
        const diffDays = Math.floor((currDate - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          // Continuous day streak
          parsed.streakDays = (parsed.streakDays || 1) + 1;
          parsed.lastStudyDate = today;
          saveData(parsed);
        } else if (diffDays > 1) {
          // Streak broken
          parsed.streakDays = 1;
          parsed.lastStudyDate = today;
          saveData(parsed);
        }
      } else {
        parsed.lastStudyDate = today;
        parsed.streakDays = 1;
        saveData(parsed);
      }
      return parsed;
    } catch (e) {
      console.error("Error loading progress:", e);
      return getInitialState();
    }
  }

  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Error saving progress:", e);
    }
  }

  return {
    getState: function() {
      return loadData();
    },

    isTopicCompleted: function(topicId) {
      const data = loadData();
      return (data.completedTopics || []).includes(topicId);
    },

    isTopicInProgress: function(topicId) {
      const data = loadData();
      return (data.inProgressTopics || []).includes(topicId);
    },

    isBookmarked: function(topicId) {
      const data = loadData();
      return (data.bookmarks || []).includes(topicId);
    },

    setTopicStatus: function(topicId, status) {
      const data = loadData();
      data.completedTopics = data.completedTopics || [];
      data.inProgressTopics = data.inProgressTopics || [];

      data.completedTopics = data.completedTopics.filter(id => id !== topicId);
      data.inProgressTopics = data.inProgressTopics.filter(id => id !== topicId);

      if (status === 'completed') {
        data.completedTopics.push(topicId);
      } else if (status === 'in_progress') {
        data.inProgressTopics.push(topicId);
      }
      saveData(data);
    },

    toggleBookmark: function(topicId) {
      const data = loadData();
      data.bookmarks = data.bookmarks || [];
      const index = data.bookmarks.indexOf(topicId);
      let isBookmarked = false;
      if (index > -1) {
        data.bookmarks.splice(index, 1);
        isBookmarked = false;
      } else {
        data.bookmarks.push(topicId);
        isBookmarked = true;
      }
      saveData(data);
      return isBookmarked;
    },

    recordMcqAttempt: function(isCorrect, questionId) {
      const data = loadData();
      data.mcqStats = data.mcqStats || { totalAttempted: 0, correctCount: 0, history: [] };
      data.mcqStats.totalAttempted += 1;
      if (isCorrect) data.mcqStats.correctCount += 1;
      data.mcqStats.history.push({
        qId: questionId || null,
        date: new Date().toISOString(),
        correct: !!isCorrect
      });
      // Keep history max 500 items
      if (data.mcqStats.history.length > 500) {
        data.mcqStats.history.shift();
      }
      saveData(data);
    },

    recordTestScore: function(topicId, score, total) {
      const data = loadData();
      data.testScores = data.testScores || {};
      const percent = total > 0 ? Math.round((score / total) * 100) : 0;
      data.testScores[topicId] = {
        score: score,
        total: total,
        percent: percent,
        date: new Date().toISOString()
      };
      if (percent >= 70) {
        if (!data.completedTopics.includes(topicId)) {
          data.completedTopics.push(topicId);
        }
      }
      saveData(data);
    },

    computeOverallStats: function(examId) {
      const data = loadData();
      const taxonomy = window.PLATFORM_TAXONOMY;
      if (!taxonomy || !taxonomy.exams) {
        return { totalTopics: 0, completedCount: 0, percent: 0 };
      }

      const exam = taxonomy.exams.find(e => e.id === examId) || taxonomy.exams[0];
      let totalTopics = 0;
      let completedTopicsCount = 0;
      const subjectBreakdown = [];

      (exam.subjects || []).forEach(sub => {
        let subTotal = 0;
        let subCompleted = 0;
        (sub.chapters || []).forEach(chap => {
          (chap.topics || []).forEach(top => {
            subTotal++;
            totalTopics++;
            if ((data.completedTopics || []).includes(top.id)) {
              subCompleted++;
              completedTopicsCount++;
            }
          });
        });
        const subPercent = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;
        subjectBreakdown.push({
          id: sub.id,
          name: sub.name,
          icon: sub.icon,
          total: subTotal,
          completed: subCompleted,
          percent: subPercent
        });
      });

      const overallPercent = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;
      const accuracy = data.mcqStats.totalAttempted > 0
        ? Math.round((data.mcqStats.correctCount / data.mcqStats.totalAttempted) * 100)
        : 0;

      return {
        examId: exam.id,
        examName: exam.name,
        totalTopics: totalTopics,
        completedCount: completedTopicsCount,
        inProgressCount: (data.inProgressTopics || []).length,
        overallPercent: overallPercent,
        streakDays: data.streakDays || 1,
        totalAttempted: data.mcqStats.totalAttempted,
        correctCount: data.mcqStats.correctCount,
        accuracy: accuracy,
        bookmarkedCount: (data.bookmarks || []).length,
        subjectBreakdown: subjectBreakdown
      };
    },

    renderDashboardView: function(containerElement, currentExamId) {
      const stats = this.computeOverallStats(currentExamId);
      const data = loadData();

      // Find bookmarked topics and populated topics
      const bookmarkedList = [];
      const populatedLessonTopics = [];
      const taxonomy = window.PLATFORM_TAXONOMY;
      if (taxonomy && taxonomy.exams) {
        taxonomy.exams.forEach(ex => {
          (ex.subjects || []).forEach(sub => {
            (sub.chapters || []).forEach(chap => {
              (chap.topics || []).forEach(top => {
                if (top.hasLesson) {
                  populatedLessonTopics.push({
                    topic: top,
                    subject: sub,
                    chapter: chap,
                    exam: ex
                  });
                }
                if ((data.bookmarks || []).includes(top.id)) {
                  bookmarkedList.push({
                    topic: top,
                    subject: sub,
                    chapter: chap,
                    exam: ex
                  });
                }
              });
            });
          });
        });
      }

      let html = `
        <div class="dashboard-container">
          <!-- Hero Banner -->
          <div class="card mb-4" style="background: linear-gradient(135deg, var(--primary) 0%, #1e40af 100%); color: white; border: none; padding: 28px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
              <div>
                <span class="badge" style="background: rgba(255,255,255,0.2); color: #fff; margin-bottom: 8px;">
                  🎯 ${stats.examName}
                </span>
                <h1 style="font-size: 1.7rem; font-weight: 800; margin-bottom: 6px;">विद्यार्थी अभ्यास डॅशबोर्ड व प्रगती</h1>
                <p style="opacity: 0.9; font-size: 0.95rem; max-width: 600px;">
                  संपूर्ण अभ्यासक्रमावर आधारित अध्यापन, सखोल नोट्स, पडताळलेले PYQs आणि विश्लेषण. तुमचे ध्येय निश्चित करून आजचा अभ्यास सुरू करा!
                </p>
              </div>
              <div style="text-align: right; background: rgba(255,255,255,0.12); padding: 14px 20px; border-radius: var(--radius-md); backdrop-filter: blur(8px);">
                <div style="font-size: 0.85rem; opacity: 0.85;">अभ्यास सातत्य (Study Streak)</div>
                <div style="font-size: 1.9rem; font-weight: 900;">🔥 ${stats.streakDays} दिवस</div>
                <div style="font-size: 0.8rem; color: #fef08a;">दररोज सराव सुरू ठेवा!</div>
              </div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid mb-4">
            <div class="stat-card">
              <div class="stat-icon" style="background: var(--primary-subtle); color: var(--primary);">📚</div>
              <div class="stat-value">${stats.completedCount} / ${stats.totalTopics}</div>
              <div class="stat-label">पूर्ण झालेले घटक (${stats.overallPercent}%)</div>
              <div class="progress-bar-container mt-2">
                <div class="progress-bar-fill" style="width: ${stats.overallPercent}%;"></div>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: var(--secondary-subtle); color: var(--secondary);">✍️</div>
              <div class="stat-value">${stats.totalAttempted}</div>
              <div class="stat-label">सराव केलेले MCQs</div>
              <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 4px;">
                अचूकता (Accuracy): <strong>${stats.accuracy}%</strong> (${stats.correctCount} बरोबर)
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: var(--accent-subtle); color: var(--accent);">🔖</div>
              <div class="stat-value">${stats.bookmarkedCount}</div>
              <div class="stat-label">महत्त्वाचे सेव्ह केलेले घटक</div>
              <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 4px;">पुन्हा उजळणीसाठी तयार</div>
            </div>

            <div class="stat-card">
              <div class="stat-icon" style="background: rgba(147, 51, 234, 0.12); color: #9333ea;">🏆</div>
              <div class="stat-value">${Object.keys(data.testScores || {}).length}</div>
              <div class="stat-label">दिलेल्या टॉपिक टेस्ट्स</div>
              <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 4px;">स्वयंमूल्यमापन अहवाल</div>
            </div>
          </div>

          <!-- Featured Anchor Lessons (Deep 14-Section Content Available) -->
          <div class="card mb-4">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
              <div>
                <h3 style="font-size: 1.25rem; font-weight: 700;">🌟 सखोल अध्यापन उपलब्ध असलेले प्रमुख घटक (Master Lessons)</h3>
                <p style="font-size: 0.88rem; color: var(--text-muted);">
                  खालील प्रमुख घटकांमध्ये पूर्ण १४-विभागीय सखोल अध्यापन, फ्लॅशकार्ड्स, पडताळलेले PYQs व ३-स्तरीय प्रश्न उपलब्ध आहेत.
                </p>
              </div>
              <span class="badge badge-success">१० सखोल पाठ सक्रिय</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px;">
              ${populatedLessonTopics.map(item => {
                const isCompleted = (data.completedTopics || []).includes(item.topic.id);
                return `
                  <div class="card" style="cursor: pointer; border-left: 4px solid var(--primary); transition: transform 0.2s, box-shadow 0.2s; padding: 16px;" onclick="window.AppRouter.openLesson('${item.topic.id}')">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <span class="badge badge-primary">${item.subject.name.split(' ')[0]}</span>
                      ${isCompleted ? '<span class="badge badge-success">✓ पूर्ण</span>' : '<span class="badge" style="background: var(--bg-main); color: var(--text-muted);">सुरू करा</span>'}
                    </div>
                    <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; color: var(--text-main);">
                      ${item.topic.name}
                    </h4>
                    <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px;">
                      ${item.chapter.name} | ${item.exam.shortName}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--primary);">
                      <span>१४ अभ्यास विभाग • सराव प्रश्न</span>
                      <span style="font-weight: bold;">अभ्यास करा →</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Subject Wise Progress Breakdown -->
          <div class="card mb-4">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 6px;">
              📊 विषयनिहाय अभ्यासक्रम व प्रगती (${stats.examName})
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
              प्रत्येक विषयातील प्रगती अहवाल. विषयावर क्लिक करून त्याचे सर्व घटक डाव्या मेनूत पाहू शकता.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
              ${stats.subjectBreakdown.map(sub => `
                <div class="card" style="padding: 16px; border: 1px solid var(--border); background: var(--bg-card);">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <span style="font-size: 1.4rem;">${sub.icon}</span>
                      <strong style="font-size: 0.95rem;">${sub.name}</strong>
                    </div>
                    <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary);">${sub.percent}%</span>
                  </div>
                  <div class="progress-bar-container" style="height: 7px; margin-bottom: 6px;">
                    <div class="progress-bar-fill" style="width: ${sub.percent}%;"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-light);">
                    <span>${sub.completed} / ${sub.total} घटक पूर्ण</span>
                    <a href="javascript:void(0)" onclick="window.AppRouter.filterSidebarSubject('${sub.id}')" style="color: var(--primary); text-decoration: none; font-weight: 600;">घटक उघडा →</a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          ${bookmarkedList.length > 0 ? `
          <!-- Bookmarked Topics -->
          <div class="card mb-4">
            <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 12px;">
              🔖 सेव्ह केलेले घटक (Bookmarks)
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px;">
              ${bookmarkedList.map(bm => `
                <div class="card" style="padding: 12px; cursor: pointer;" onclick="window.AppRouter.openLesson('${bm.topic.id}')">
                  <div style="font-size: 0.8rem; color: var(--text-light);">${bm.subject.name} • ${bm.chapter.name}</div>
                  <div style="font-weight: 700; margin-top: 4px;">${bm.topic.name}</div>
                  <div style="font-size: 0.8rem; color: var(--primary); margin-top: 6px;">वाचा →</div>
                </div>
              `).join('')}
            </div>
          </div>
          ` : ''}

        </div>
      `;

      containerElement.innerHTML = html;
    }
  };
})();
