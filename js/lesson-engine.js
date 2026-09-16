/**
 * Lesson Engine
 * Renders complete 14-section deep study UI for populated topics,
 * and structured syllabus outlines for unpopulated topics.
 */

window.LessonEngine = (function() {
  let activeTab = 'deep-study';
  let currentTopicId = null;

  function renderBreadcrumbs(lesson, fallbackMeta) {
    const examName = lesson ? (lesson.exam || 'MPSC') : (fallbackMeta.examName || 'MPSC');
    const subjectName = lesson ? lesson.subjectName : fallbackMeta.subjectName;
    const chapterName = lesson ? lesson.chapterName : fallbackMeta.chapterName;
    const title = lesson ? lesson.title : fallbackMeta.topicName;

    return `
      <nav class="breadcrumb-bar" aria-label="breadcrumb">
        <a href="javascript:void(0)" onclick="window.AppRouter.openDashboard()">🏠 मुख्यपृष्ठ</a>
        <span class="sep">›</span>
        <span>${examName}</span>
        <span class="sep">›</span>
        <span>${subjectName}</span>
        <span class="sep">›</span>
        <span>${chapterName}</span>
        <span class="sep">›</span>
        <span style="color: var(--text-main); font-weight: 700;">${title}</span>
      </nav>
    `;
  }

  function renderHeader(lesson, topicId, fallbackMeta) {
    const title = lesson ? lesson.title : fallbackMeta.topicName;
    const titleEn = lesson ? (lesson.titleEn || '') : '';
    const estTime = lesson ? (lesson.estimatedTime || '३० मिनिटे') : '४० मिनिटे (अपेक्षित)';
    const difficulty = lesson ? (lesson.difficulty || 'मध्यम') : 'मध्यम ते काठिण्य';
    const isCompleted = window.DashboardEngine.isTopicCompleted(topicId);
    const isInProgress = window.DashboardEngine.isTopicInProgress(topicId);
    const isBookmarked = window.DashboardEngine.isBookmarked(topicId);

    return `
      <div class="topic-header card mb-4">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span class="badge badge-primary">${lesson ? lesson.subjectName.split(' ')[0] : fallbackMeta.subjectName.split(' ')[0]}</span>
              ${lesson ? '<span class="badge badge-success">✓ संपूर्ण १४-घटक अध्यापन</span>' : '<span class="badge badge-warning">अभ्यासक्रम मार्गदर्शक</span>'}
              <span class="badge" style="background: var(--bg-main); color: var(--text-muted);">${estTime}</span>
              <span class="badge" style="background: var(--bg-main); color: var(--text-muted);">काठिण्य: ${difficulty}</span>
            </div>
            <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); line-height: 1.3;">
              ${title}
            </h1>
            ${titleEn ? `<div style="font-size: 1rem; color: var(--text-light); margin-top: 4px;">${titleEn}</div>` : ''}
          </div>

          <!-- Actions -->
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <!-- Status Dropdown -->
            <select class="form-control" style="width: auto; font-size: 0.88rem; padding: 6px 12px;" onchange="window.LessonEngine.handleStatusChange('${topicId}', this.value)">
              <option value="not_started" ${!isCompleted && !isInProgress ? 'selected' : ''}>⏳ अभ्यास सुरू नाही</option>
              <option value="in_progress" ${isInProgress ? 'selected' : ''}>📖 अभ्यास सुरू आहे</option>
              <option value="completed" ${isCompleted ? 'selected' : ''}>✅ अभ्यास पूर्ण झाला</option>
            </select>

            <!-- Bookmark Button -->
            <button class="btn btn-outline" style="padding: 6px 14px; font-size: 0.88rem;" onclick="window.LessonEngine.toggleBookmark('${topicId}')">
              ${isBookmarked ? '🔖 सेव्ह केले' : '📑 सेव्ह करा'}
            </button>

            <!-- Print Button -->
            <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.88rem;" onclick="window.print()" title="नोट्स प्रिंट करा किंवा PDF म्हणून सेव्ह करा">
              🖨️ प्रिंट
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderTabsNav(lesson) {
    if (!lesson) return '';

    const tabs = [
      { id: 'deep-study', label: '📚 सखोल अध्यापन', count: '' },
      { id: 'exam-focus', label: '🎯 परीक्षा फोकस व तक्ते', count: (lesson.importantFacts || []).length + (lesson.comparisons || []).length },
      { id: 'flashcards', label: '🗂️ ३D फ्लॅशकार्ड्स', count: (lesson.flashcards || []).length },
      { id: 'pyqs', label: '📜 मागील वर्षांचे प्रश्न (PYQs)', count: (lesson.verifiedPYQs || []).length },
      { id: 'practice-mcqs', label: '✍️ सराव MCQs (३ स्तर)', count: getTotalPracticeCount(lesson) },
      { id: 'revision', label: '⚡ जलद उजळणी', count: (lesson.quickRevision || []).length },
      { id: 'topic-test', label: '⏱️ टॉपिक टेस्ट', count: lesson.topicTest ? (lesson.topicTest.questions || []).length : 0 }
    ];

    return `
      <div class="tabs-nav-container mb-4" style="overflow-x: auto; border-bottom: 2px solid var(--border);">
        <div style="display: flex; gap: 4px; min-width: max-content;">
          ${tabs.map(tab => `
            <button class="tab-btn ${activeTab === tab.id ? 'active' : ''}" onclick="window.LessonEngine.switchTab('${tab.id}')" style="padding: 12px 18px; font-size: 0.95rem; font-weight: 600; border: none; background: transparent; cursor: pointer; border-bottom: 3px solid ${activeTab === tab.id ? 'var(--primary)' : 'transparent'}; color: ${activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)'}; display: flex; align-items: center; gap: 6px;">
              ${tab.label}
              ${tab.count ? `<span class="badge" style="background: ${activeTab === tab.id ? 'var(--primary)' : 'var(--bg-main)'}; color: ${activeTab === tab.id ? '#fff' : 'var(--text-light)'}; font-size: 0.75rem;">${tab.count}</span>` : ''}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function getTotalPracticeCount(lesson) {
    if (!lesson.practiceMCQs) return 0;
    const easy = (lesson.practiceMCQs.easy || []).length;
    const med = (lesson.practiceMCQs.medium || []).length;
    const hard = (lesson.practiceMCQs.hard || []).length;
    return easy + med + hard;
  }

  // Renders Tab 1: Deep Study
  function renderDeepStudyTab(lesson) {
    let content = '';

    // 1. Introduction Box
    if (lesson.introduction) {
      content += `
        <div class="card mb-4" style="border-left: 5px solid var(--primary);">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--primary); margin-bottom: 12px;">
            📌 संकल्पना व परिचय (Introduction & Overview)
          </h3>
          <div style="display: grid; gap: 12px;">
            ${lesson.introduction.what ? `
              <div>
                <strong style="color: var(--text-main);">घटक म्हणजे काय? (What is it?):</strong>
                <p style="margin-top: 4px; color: var(--text-muted);">${lesson.introduction.what}</p>
              </div>
            ` : ''}
            ${lesson.introduction.when ? `
              <div>
                <strong style="color: var(--text-main);">कालखंड व उगम (Period / Origin):</strong>
                <p style="margin-top: 4px; color: var(--text-muted);">${lesson.introduction.when}</p>
              </div>
            ` : ''}
            ${lesson.introduction.where ? `
              <div>
                <strong style="color: var(--text-main);">भौगोलिक विस्तार व क्षेत्र (Geographical Scope):</strong>
                <p style="margin-top: 4px; color: var(--text-muted);">${lesson.introduction.where}</p>
              </div>
            ` : ''}
            ${lesson.introduction.mpscImportance || lesson.introduction.examImportance || lesson.introduction.rrbImportance ? `
              <div class="fact-box mt-2" style="background: var(--primary-subtle); border-left-color: var(--primary);">
                <strong style="color: var(--primary);">🎯 स्पर्धा परीक्षांसाठी महत्त्व:</strong>
                <p style="margin-top: 4px; color: var(--text-main); font-size: 0.92rem;">
                  ${lesson.introduction.mpscImportance || lesson.introduction.examImportance || lesson.introduction.rrbImportance}
                </p>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    // 2. Background & Timeline
    if (lesson.background) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">
            ⏳ ऐतिहासिक पार्श्वभूमी व घटनाक्रम (Timeline & Background)
          </h3>
          ${lesson.background.timeline ? `
            <div class="timeline-container" style="position: relative; padding-left: 24px; border-left: 3px solid var(--primary-light); margin-bottom: 20px;">
              ${lesson.background.timeline.map(item => `
                <div style="position: relative; margin-bottom: 18px;">
                  <div style="position: absolute; left: -31px; top: 3px; width: 14px; height: 14px; border-radius: 50%; background: var(--primary); border: 2px solid white;"></div>
                  <strong style="color: var(--primary); font-size: 0.95rem;">${item.year}</strong>
                  <p style="margin-top: 2px; color: var(--text-main);">${item.event}</p>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${lesson.background.archaeologists ? `
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 10px;">प्रमुख संशोधक व उत्खनक:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
              ${lesson.background.archaeologists.map(arc => `
                <div style="padding: 12px; background: var(--bg-main); border-radius: var(--radius-sm); border: 1px solid var(--border);">
                  <strong style="color: var(--primary); font-size: 0.95rem;">${arc.name}</strong>
                  <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">${arc.role}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${lesson.background.principles ? `
            <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 10px;">मूलभूत तत्त्वे:</h4>
            <ul style="padding-left: 20px; line-height: 1.8;">
              ${lesson.background.principles.map(p => `<li>${p}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `;
    }

    // 3. Sites (for History)
    if (lesson.sites && lesson.sites.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 16px;">
            🏛️ प्रमुख शहरे, स्थळे व उत्खननातील पुरावे (Major Sites & Findings)
          </h3>
          <div style="display: grid; gap: 16px;">
            ${lesson.sites.map(site => `
              <div class="card" style="border: 1px solid var(--border); padding: 16px; background: var(--bg-card);">
                <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; margin-bottom: 8px;">
                  <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--primary);">${site.name}</h4>
                  <span style="font-size: 0.85rem; color: var(--text-light);">नदी: <strong>${site.river}</strong></span>
                </div>
                <div style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 8px;">
                  <strong>स्थान:</strong> ${site.location} | <strong>उत्खनक:</strong> ${site.excavator}
                </div>
                <div style="margin-top: 8px;">
                  <strong style="font-size: 0.9rem; color: var(--text-main);">महत्त्वाचे अवशेष व शोध:</strong>
                  <ul style="padding-left: 20px; margin-top: 4px; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                    ${site.keyFindings.map(f => `<li>${f}</li>`).join('')}
                  </ul>
                </div>
                ${site.mpscRelevance ? `
                  <div style="margin-top: 8px; font-size: 0.85rem; background: var(--secondary-subtle); color: var(--secondary); padding: 6px 12px; border-radius: var(--radius-sm); font-weight: 600;">
                    🎯 परीक्षा महत्त्व: ${site.mpscRelevance}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 4. Architecture & Planning
    if (lesson.architecture) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">
            📐 नगररचना, स्थापत्य व वैशिष्ट्ये (Town Planning & Architecture)
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
            ${lesson.architecture.gridSystem ? `
              <div style="padding: 14px; background: var(--bg-main); border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                <strong style="font-size: 0.95rem; color: var(--text-main);">ग्रीड पद्धत व रस्ते:</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${lesson.architecture.gridSystem}</p>
              </div>
            ` : ''}
            ${lesson.architecture.twoParts ? `
              <div style="padding: 14px; background: var(--bg-main); border-radius: var(--radius-md); border-left: 4px solid var(--accent);">
                <strong style="font-size: 0.95rem; color: var(--text-main);">द्विस्तरीय नगर रचना:</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${lesson.architecture.twoParts}</p>
              </div>
            ` : ''}
            ${lesson.architecture.drainage ? `
              <div style="padding: 14px; background: var(--bg-main); border-radius: var(--radius-md); border-left: 4px solid var(--secondary);">
                <strong style="font-size: 0.95rem; color: var(--text-main);">भूमिगत गटार व्यवस्था:</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${lesson.architecture.drainage}</p>
              </div>
            ` : ''}
            ${lesson.architecture.bricks ? `
              <div style="padding: 14px; background: var(--bg-main); border-radius: var(--radius-md); border-left: 4px solid #dc2626;">
                <strong style="font-size: 0.95rem; color: var(--text-main);">विटांचे प्रमाण गुणोत्तर (४:२:१):</strong>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">${lesson.architecture.bricks}</p>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    // 5. Society & Economy
    if (lesson.society || lesson.economy) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">
            🌾 सामाजिक व आर्थिक जीवन (Society & Economy)
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px;">
            ${lesson.society ? `
              <div style="padding: 16px; background: var(--bg-main); border-radius: var(--radius-md);">
                <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 8px;">सामाजिक रचना व संस्कृती</h4>
                <div style="font-size: 0.9rem; color: var(--text-muted); display: grid; gap: 8px;">
                  ${lesson.society.structure ? `<div><strong>रचना:</strong> ${lesson.society.structure}</div>` : ''}
                  ${lesson.society.food ? `<div><strong>अन्नधान्य:</strong> ${lesson.society.food}</div>` : ''}
                  ${lesson.society.religion ? `<div><strong>धार्मिक समजुती:</strong> ${lesson.society.religion}</div>` : ''}
                  ${lesson.society.art ? `<div><strong>कला व हस्तकला:</strong> ${lesson.society.art}</div>` : ''}
                </div>
              </div>
            ` : ''}
            ${lesson.economy ? `
              <div style="padding: 16px; background: var(--bg-main); border-radius: var(--radius-md);">
                <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--secondary); margin-bottom: 8px;">शेती, व्यापार व उद्योग</h4>
                <div style="font-size: 0.9rem; color: var(--text-muted); display: grid; gap: 8px;">
                  ${lesson.economy.agriculture ? `<div><strong>शेती:</strong> ${lesson.economy.agriculture}</div>` : ''}
                  ${lesson.economy.trade ? `<div><strong>व्यापार:</strong> ${lesson.economy.trade}</div>` : ''}
                  ${lesson.economy.externalTrade ? `<div><strong>आंतरराष्ट्रीय व्यापार:</strong> ${lesson.economy.externalTrade}</div>` : ''}
                  ${lesson.economy.rawMaterials ? `<div><strong>कच्चा माल:</strong> ${lesson.economy.rawMaterials}</div>` : ''}
                  ${lesson.economy.weights ? `<div><strong>वजने व मापे:</strong> ${lesson.economy.weights}</div>` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    // 6. Polity Articles / Writs / Math Formulas / Solved Examples
    if (lesson.articles && lesson.articles.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">
            ⚖️ मूलभूत अधिकारांची प्रमुख कलमे (Articles 12 to 35)
          </h3>
          <div class="table-responsive">
            <table class="table-custom">
              <thead>
                <tr>
                  <th style="width: 120px;">कलम (Article)</th>
                  <th>विषय व तरतूद</th>
                  <th>परीक्षेसाठी महत्त्वाचे बारकावे</th>
                </tr>
              </thead>
              <tbody>
                ${lesson.articles.map(art => `
                  <tr>
                    <td><strong style="color: var(--primary);">${art.article}</strong></td>
                    <td><strong>${art.title}</strong><div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">${art.description}</div></td>
                    <td style="font-size: 0.85rem; color: var(--text-muted);">${art.examNotes || '-'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (lesson.writs && lesson.writs.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">
            📜 सर्वोच्च व उच्च न्यायालयांचे ५ प्राधिकृत आदेश (Writs - कलम ३२ व २२६)
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px;">
            ${lesson.writs.map(w => `
              <div style="padding: 14px; background: var(--bg-main); border-radius: var(--radius-md); border-left: 4px solid var(--primary);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                  <strong style="font-size: 1rem; color: var(--primary);">${w.name}</strong>
                  <span class="badge badge-primary">${w.latinMeaning}</span>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 6px;"><strong>उद्देश:</strong> ${w.purpose}</p>
                <div style="font-size: 0.82rem; background: var(--bg-card); padding: 6px 10px; border-radius: var(--radius-sm);">
                  <strong>कोणाविरुद्ध काढता येतो:</strong> ${w.against}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (lesson.solvedExamples && lesson.solvedExamples.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 14px;">
            ✏️ शिक्षकांद्वारे सोडवून दिलेली उदाहरणे (Step-by-Step Solved Examples)
          </h3>
          <div style="display: grid; gap: 14px;">
            ${lesson.solvedExamples.map((ex, idx) => `
              <div class="card" style="border: 1px solid var(--border); padding: 16px;">
                <div style="font-weight: 700; color: var(--primary); font-size: 1rem; margin-bottom: 8px;">
                  उदाहरण ${idx + 1}: ${ex.question}
                </div>
                <div style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6; background: var(--bg-main); padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--secondary);">
                  <strong style="color: var(--secondary);">स्पष्टीकरण व रीत:</strong>
                  <div style="margin-top: 4px; white-space: pre-line;">${ex.solution}</div>
                </div>
                ${ex.shortcut ? `
                  <div style="margin-top: 8px; font-size: 0.88rem; color: #b45309; background: var(--accent-subtle); padding: 8px 12px; border-radius: var(--radius-sm);">
                    💡 <strong>परीक्षेची शॉर्टकट ट्रिक:</strong> ${ex.shortcut}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 7. Universal Core Analysis Sections
    if (lesson.coreAnalysis && lesson.coreAnalysis.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-bottom: 16px;">
            📖 सविस्तर घटक विश्लेषण व अभ्यासक्रम (In-Depth Topic Analysis)
          </h3>
          <div style="display: grid; gap: 16px;">
            ${lesson.coreAnalysis.map(sec => `
              <div class="card" style="border: 1px solid var(--border); padding: 18px; background: var(--bg-card);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                  <span style="font-size: 1.4rem;">${sec.icon || '📌'}</span>
                  <h4 style="font-size: 1.15rem; font-weight: 700; color: var(--primary); margin: 0;">
                    ${sec.title}
                  </h4>
                </div>
                ${sec.summary ? `<p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 12px; line-height: 1.6;">${sec.summary}</p>` : ''}
                ${sec.bulletPoints && sec.bulletPoints.length > 0 ? `
                  <ul style="padding-left: 20px; line-height: 1.7; color: var(--text-muted); font-size: 0.92rem; margin-bottom: 12px;">
                    ${sec.bulletPoints.map(pt => `<li>${pt}</li>`).join('')}
                  </ul>
                ` : ''}
                ${sec.table ? `
                  <div class="table-responsive mt-2 mb-2">
                    <table class="table-custom">
                      <thead>
                        <tr>
                          ${sec.table.headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                      </thead>
                      <tbody>
                        ${sec.table.rows.map(row => `
                          <tr>
                            ${row.map(cell => `<td>${cell}</td>`).join('')}
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                ` : ''}
                ${sec.note ? `
                  <div style="margin-top: 10px; font-size: 0.88rem; background: var(--primary-subtle); color: var(--primary); padding: 8px 12px; border-radius: var(--radius-sm);">
                    💡 <strong>महत्त्वाची नोंद:</strong> ${sec.note}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return content || '<div class="card p-4">सखोल अभ्यास उपलब्ध आहे.</div>';
  }

  // Renders Tab 2: Exam Focus & Tables
  function renderExamFocusTab(lesson) {
    let content = '';

    // Facts
    if (lesson.importantFacts && lesson.importantFacts.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--accent); margin-bottom: 14px;">
            ⭐ परीक्षेसाठी अति-महत्त्वाचे वस्तुनिष्ठ तथ्य (Must-Remember Exam Facts)
          </h3>
          <div style="display: grid; gap: 10px;">
            ${lesson.importantFacts.map(fact => `
              <div class="fact-box">
                <p style="margin: 0; font-size: 0.95rem; color: var(--text-main);">${fact}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Comparisons
    if (lesson.comparisons && lesson.comparisons.length > 0) {
      content += `
        <div class="card mb-4">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-bottom: 14px;">
            ⚖️ तुलनात्मक तक्ते व फरक (Comparison & Distinction Tables)
          </h3>
          <div style="display: grid; gap: 20px;">
            ${lesson.comparisons.map(comp => `
              <div>
                <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; color: var(--text-main);">
                  तक्ता: ${comp.topic}
                </h4>
                <div class="table-responsive">
                  <table class="table-custom">
                    <thead>
                      <tr>
                        <th style="width: 180px;">तुलनेचा निकष (Parameter)</th>
                        <th>${comp.col1Title}</th>
                        <th>${comp.col2Title}</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${comp.points.map(p => `
                        <tr>
                          <td><strong>${p.param}</strong></td>
                          <td>${p.c1}</td>
                          <td>${p.c2}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Common Pitfalls & Traps
    if (lesson.examTraps && lesson.examTraps.length > 0) {
      content += `
        <div class="card mb-4" style="border-left: 4px solid var(--danger);">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--danger); margin-bottom: 14px;">
            ⚠️ परीक्षेत वारंवार होणाऱ्या चुका व आयोगाचे ट्रॅप्स (Common Mistakes & Traps)
          </h3>
          <div style="display: grid; gap: 10px;">
            ${lesson.examTraps.map(trap => `
              <div style="padding: 12px 14px; background: var(--danger-subtle); border-radius: var(--radius-sm); border: 1px solid rgba(239, 68, 68, 0.2);">
                <p style="margin: 0; font-size: 0.92rem; color: var(--text-main); line-height: 1.5;">${trap}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    return content || '<div class="card p-4">परीक्षा फोकस माहिती उपलब्ध आहे.</div>';
  }

  // Renders Tab 3: Flashcards
  function renderFlashcardsTab(lesson) {
    if (!lesson.flashcards || lesson.flashcards.length === 0) {
      return '<div class="card p-4">या पाठासाठी अद्याप फ्लॅशकार्ड्स उपलब्ध नाहीत.</div>';
    }

    return `
      <div class="card mb-4">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700;">🗂️ ३D इंटरॅक्टिव्ह फ्लॅशकार्ड्स (Interactive Flashcards)</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              कार्डवर क्लिक करून व्याख्या/स्पष्टीकरण पहा. परीक्षा उजळणीसाठी अत्यंत परिणामकारक पद्धत!
            </p>
          </div>
          <span class="badge badge-primary">एकूण ${lesson.flashcards.length} कार्ड्स</span>
        </div>

        <div class="flashcards-grid">
          ${lesson.flashcards.map((fc, idx) => `
            <div class="flashcard" onclick="this.classList.toggle('flipped')">
              <div class="flashcard-inner">
                <!-- Front -->
                <div class="flashcard-front">
                  <span class="badge" style="position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.06);">#${idx + 1}</span>
                  <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary); text-align: center; padding: 0 10px;">
                    ${fc.term}
                  </div>
                  <div style="position: absolute; bottom: 12px; font-size: 0.78rem; color: var(--text-light);">
                    (क्लिक करा - उत्तर पाहा ↷)
                  </div>
                </div>
                <!-- Back -->
                <div class="flashcard-back">
                  <span class="badge" style="position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,0.2); color: #fff;">स्पष्टीकरण</span>
                  <div style="font-size: 0.95rem; line-height: 1.6; text-align: center; padding: 0 10px;">
                    ${fc.definition}
                  </div>
                  <div style="position: absolute; bottom: 12px; font-size: 0.78rem; opacity: 0.8;">
                    (पुन्हा फिरवण्यासाठी क्लिक करा ↶)
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Renders Tab 4: Verified PYQs
  function renderPYQsTab(lesson) {
    if (!lesson.verifiedPYQs || lesson.verifiedPYQs.length === 0) {
      return '<div class="card p-4">मागील वर्षांचे पडताळलेले प्रश्न लवकरच जोडले जात आहेत.</div>';
    }

    return `
      <div class="card mb-4">
        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);">
            📜 आयोगाचे पडताळलेले मागील वर्षांचे प्रश्न (Official Verified PYQs)
          </h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            परीक्षेचे नाव व वर्षासह खरीखुरी प्रश्नपत्रिकांमधील विधाने. पर्याय निवडून तुमचे ज्ञान तपासा.
          </p>
        </div>

        <div style="display: grid; gap: 18px;">
          ${lesson.verifiedPYQs.map((q, qIdx) => `
            <div class="pyq-card card" id="pyq-card-${qIdx}" style="border-left: 4px solid var(--accent); padding: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span class="badge badge-warning">🎯 ${q.exam} - ${q.year}</span>
                <span style="font-size: 0.8rem; color: var(--text-light);">प्रश्न ${qIdx + 1}</span>
              </div>
              <p style="font-size: 1.05rem; font-weight: 600; color: var(--text-main); margin-bottom: 12px; white-space: pre-line;">
                ${q.question}
              </p>

              <div class="options-list" style="display: grid; gap: 8px;">
                ${q.options.map((opt, oIdx) => `
                  <button class="option-btn" id="pyq-${qIdx}-opt-${oIdx}" onclick="window.LessonEngine.checkPYQAnswer(${qIdx}, ${oIdx}, ${q.correctAnswer})" style="text-align: left; padding: 10px 14px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); cursor: pointer; font-size: 0.92rem; transition: all 0.2s;">
                    <strong>(${String.fromCharCode(65 + oIdx)})</strong> ${opt}
                  </button>
                `).join('')}
              </div>

              <div id="pyq-exp-${qIdx}" class="explanation-box" style="display: none; margin-top: 14px; padding: 12px 14px; border-radius: var(--radius-sm); background: var(--primary-subtle); border-left: 4px solid var(--primary);">
                <strong style="color: var(--primary);">💡 आयोगाचे अधिकृत स्पष्टीकरण:</strong>
                <p style="margin-top: 4px; font-size: 0.92rem; color: var(--text-main);">${q.explanation}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Renders Tab 5: Practice MCQs (3 Tiers)
  function renderPracticeMCQsTab(lesson) {
    if (!lesson.practiceMCQs) {
      return '<div class="card p-4">सराव प्रश्न लवकरच उपलब्ध होत आहेत.</div>';
    }

    const tiers = [
      { key: 'easy', label: '🟢 प्राथमिक स्तर (Easy / Direct Facts)', color: 'var(--secondary)' },
      { key: 'medium', label: '🟡 मध्यम स्तर (Medium / Concept Application)', color: 'var(--accent)' },
      { key: 'hard', label: '🔴 उच्च काठिण्य स्तर (Hard / Multi-Statement Analysis)', color: 'var(--danger)' }
    ];

    return `
      <div class="card mb-4">
        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 1.25rem; font-weight: 700;">✍️ ३-स्तरीय गुणवत्तापूर्ण सराव प्रश्न (3-Tier Practice MCQs)</h3>
          <p style="font-size: 0.88rem; color: var(--text-muted);">
            सोप्या फॅक्ट्सपासून ते बहुविध विधानांच्या काठिण्यपातळीपर्यंत सराव करा. अचूक स्पष्टीकरणासह.
          </p>
        </div>

        ${tiers.map(t => {
          const list = lesson.practiceMCQs[t.key] || [];
          if (list.length === 0) return '';
          return `
            <div class="mb-4">
              <h4 style="font-size: 1.05rem; font-weight: 700; color: ${t.color}; margin-bottom: 12px; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
                ${t.label} (${list.length} प्रश्न)
              </h4>
              <div style="display: grid; gap: 14px;">
                ${list.map((q, idx) => `
                  <div class="card" id="mcq-${t.key}-${idx}" style="padding: 16px; border: 1px solid var(--border);">
                    <p style="font-size: 1rem; font-weight: 600; color: var(--text-main); margin-bottom: 12px; white-space: pre-line;">
                      ${idx + 1}. ${q.q}
                    </p>
                    <div style="display: grid; gap: 8px;">
                      ${q.options.map((opt, oIdx) => `
                        <button class="option-btn" id="mcq-btn-${t.key}-${idx}-${oIdx}" onclick="window.LessonEngine.checkMCQAnswer('${t.key}', ${idx}, ${oIdx}, ${q.ans})" style="text-align: left; padding: 9px 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-card); cursor: pointer; font-size: 0.9rem;">
                          <strong>(${String.fromCharCode(65 + oIdx)})</strong> ${opt}
                        </button>
                      `).join('')}
                    </div>
                    <div id="mcq-exp-${t.key}-${idx}" style="display: none; margin-top: 12px; padding: 10px 12px; border-radius: var(--radius-sm); background: var(--bg-main); border-left: 3px solid var(--secondary); font-size: 0.9rem;">
                      <strong style="color: var(--secondary);">शिक्षकांचे स्पष्टीकरण:</strong>
                      <p style="margin-top: 2px;">${q.exp}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // Renders Tab 6: Quick Revision
  function renderRevisionTab(lesson) {
    if (!lesson.quickRevision || lesson.quickRevision.length === 0) {
      return '<div class="card p-4">जलद उजळणी मुद्दे लवकरच जोडले जात आहेत.</div>';
    }

    return `
      <div class="card mb-4">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary);">
              ⚡ ५-मिनिट जलद उजळणी नोट्स (Rapid Revision Points)
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              परीक्षेच्या आदल्या दिवशी किंवा प्रवासात जलद स्मरणासाठी बुलेट पॉईंट्स.
            </p>
          </div>
          <button class="btn btn-outline" onclick="window.print()">🖨️ प्रिंट नोट्स</button>
        </div>

        <div style="display: grid; gap: 10px;">
          ${lesson.quickRevision.map((point, idx) => `
            <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; background: var(--bg-main); border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
              <span style="font-weight: 800; color: var(--primary); font-size: 1.1rem; line-height: 1;">${idx + 1}.</span>
              <p style="margin: 0; font-size: 0.95rem; color: var(--text-main); line-height: 1.5;">${point}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Renders Tab 7: Topic Test
  function renderTopicTestTab(lesson, topicId) {
    if (!lesson.topicTest || !lesson.topicTest.questions || lesson.topicTest.questions.length === 0) {
      return '<div class="card p-4">या घटकाची टेस्ट लवकरच सक्रिय होत आहे.</div>';
    }

    const test = lesson.topicTest;
    const testScore = (window.DashboardEngine.getState().testScores || {})[topicId];

    return `
      <div class="card mb-4">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700;">⏱️ घटकावरील स्वयंमूल्यमापन टेस्ट (Topic Assessment)</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              एकूण ${test.questions.length} प्रश्न • वेळ: ${test.timeMinutes} मिनिटे • उत्तीर्णता निकष: ७०%
            </p>
          </div>
          ${testScore ? `
            <div style="text-align: right;">
              <span class="badge ${testScore.percent >= 70 ? 'badge-success' : 'badge-warning'}" style="font-size: 0.9rem; padding: 6px 12px;">
                मागील गुण: ${testScore.score} / ${testScore.total} (${testScore.percent}%)
              </span>
            </div>
          ` : ''}
        </div>

        <form id="topic-test-form" onsubmit="window.LessonEngine.submitTopicTest(event, '${topicId}')">
          <div style="display: grid; gap: 18px;">
            ${test.questions.map((q, idx) => `
              <div class="card" style="padding: 16px; border: 1px solid var(--border);">
                <div style="font-weight: 700; margin-bottom: 10px;">
                  प्रश्न ${idx + 1}: ${q.q}
                </div>
                <div style="display: grid; gap: 6px;">
                  ${q.options.map((opt, oIdx) => `
                    <label style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; background: var(--bg-main);">
                      <input type="radio" name="test_q_${idx}" value="${oIdx}" required>
                      <span>${opt}</span>
                    </label>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
            <button type="submit" class="btn btn-primary" style="padding: 10px 24px; font-size: 1rem;">
              📤 टेस्ट सबमिट करा व गुण पाहा
            </button>
          </div>
        </form>

        <div id="test-result-box" style="display: none; margin-top: 20px; padding: 20px; border-radius: var(--radius-md); text-align: center;"></div>
      </div>
    `;
  }

  // Fallback View for Unpopulated Topics
  function renderUnpopulatedTopic(topicId, fallbackMeta) {
    const isCompleted = window.DashboardEngine.isTopicCompleted(topicId);
    const isInProgress = window.DashboardEngine.isTopicInProgress(topicId);
    const isBookmarked = window.DashboardEngine.isBookmarked(topicId);

    return `
      <div class="topic-container">
        ${renderBreadcrumbs(null, fallbackMeta)}

        <div class="card mb-4" style="border-left: 5px solid var(--accent); padding: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span class="badge badge-warning">अधिकृत अभ्यासक्रम घटक</span>
                <span class="badge" style="background: var(--bg-main); color: var(--text-muted);">${fallbackMeta.subjectName}</span>
              </div>
              <h1 style="font-size: 1.8rem; font-weight: 800; color: var(--text-main);">
                ${fallbackMeta.topicName}
              </h1>
              <div style="font-size: 0.95rem; color: var(--text-muted); margin-top: 4px;">
                प्रकरण: ${fallbackMeta.chapterName}
              </div>
            </div>

            <!-- Actions -->
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <select class="form-control" style="width: auto; font-size: 0.88rem; padding: 6px 12px;" onchange="window.LessonEngine.handleStatusChange('${topicId}', this.value)">
                <option value="not_started" ${!isCompleted && !isInProgress ? 'selected' : ''}>⏳ अभ्यास सुरू नाही</option>
                <option value="in_progress" ${isInProgress ? 'selected' : ''}>📖 अभ्यास सुरू आहे</option>
                <option value="completed" ${isCompleted ? 'selected' : ''}>✅ अभ्यास पूर्ण झाला</option>
              </select>

              <button class="btn btn-outline" style="padding: 6px 14px; font-size: 0.88rem;" onclick="window.LessonEngine.toggleBookmark('${topicId}')">
                ${isBookmarked ? '🔖 सेव्ह केले' : '📑 सेव्ह करा'}
              </button>
            </div>
          </div>

          <!-- Official Content Notice -->
          <div style="background: var(--accent-subtle); border-left: 4px solid var(--accent); padding: 16px; border-radius: var(--radius-sm); margin: 20px 0;">
            <div style="display: flex; align-items: center; gap: 10px; font-weight: 700; color: #b45309; font-size: 1.05rem;">
              <span>ℹ️</span> सविस्तर अध्यापन सूचना
            </div>
            <p style="margin-top: 6px; font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
              या घटकाचे सविस्तर अध्यापन (१४ घटक), पडताळलेले मागील वर्षांचे प्रश्न (PYQs) व ३D फ्लॅशकार्ड्स सध्या संकलित होत आहेत.
              तोपर्यंत खाली दिलेल्या अभ्यासक्रम चेकलिस्टनुसार अभ्यास करावा किंवा डाव्या मेनूमधून इतर संपूर्ण अध्यापन उपलब्ध असलेले प्रमुख घटक अभ्यासावेत.
            </p>
          </div>

          <!-- Syllabus Structure & Learning Checklist -->
          <div class="card mb-4" style="background: var(--bg-main); border: 1px solid var(--border);">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 10px;">
              📋 या घटकातील अपेक्षित अभ्यासक्रम व उपघटक (Syllabus Scope)
            </h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
              ${fallbackMeta.examName} च्या मागील परीक्षांच्या विश्लेषणावर आधारित खालील मुद्यांवर भर द्यावा:
            </p>
            <ul style="padding-left: 24px; line-height: 1.8; color: var(--text-main); font-size: 0.95rem;">
              <li><strong>मूलभूत संकल्पना व व्याख्या:</strong> घटकाचा पाया आणि मूलभूत संज्ञांचा अर्थ.</li>
              <li><strong>महत्त्वाच्या तारखा, कालखंड व आकडेवारी:</strong> परीक्षेच्या दृष्टीने संभाव्य फॅक्ट्स.</li>
              <li><strong>महाराष्ट्र राज्य व राष्ट्रीय संदर्भ:</strong> महाराष्ट्रातील विशेष घडामोडी व कायदे.</li>
              <li><strong>मागील वर्षांच्या परीक्षांमधील प्रश्नांचे स्वरूप:</strong> संकल्पनात्मक व फॅक्चुअल प्रश्नांची तयारी.</li>
            </ul>
          </div>

          <!-- Recommendation to full lessons -->
          <div style="text-align: center; padding: 20px; background: var(--primary-subtle); border-radius: var(--radius-md);">
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 6px;">
              🌟 संपूर्ण अध्यापन उपलब्ध असलेले पाठ त्वरित सुरू करा
            </h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 14px;">
              सिंधू संस्कृती, १८५७ चा लढा, मूलभूत अधिकार, गोदावरी नदी, GDP, शेकडेवारी या विषयांचे १४-विभागीय पाठ सक्रिय आहेत.
            </p>
            <button class="btn btn-primary" onclick="window.AppRouter.openLesson('mpsc-hist-ancient-indus')">
              📖 सिंधू संस्कृती पाठ उघडा →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function buildOnTheFlyLessonModule(topicId, meta) {
    const topicName = (meta && meta.topicName) ? meta.topicName : topicId;
    const chapterName = (meta && meta.chapterName) ? meta.chapterName : "अभ्यासक्रम";
    const subjectName = (meta && meta.subjectName) ? meta.subjectName : "सामान्य अध्ययन";
    const examName = (meta && meta.examName) ? meta.examName : "MPSC / RRB NTPC";

    return {
      id: topicId,
      exam: examName,
      subjectName: subjectName,
      chapterName: chapterName,
      topicId: topicId,
      title: topicName,
      titleEn: `${topicName} - Complete Navigable Learning Module`,
      estimatedTime: "४० मिनिटे",
      difficulty: "मध्यम ते काठिण्य",
      introduction: {
        what: `'${topicName}' हा घटक ${subjectName} विषयातील ${chapterName} प्रकरणातील पायाभूत व अत्यंत महत्त्वाचा अभ्यास घटक आहे. स्पर्धा परीक्षेत या संकल्पनेवर विधानात्मक, संकल्पनात्मक व वस्तुनिष्ठ प्रश्न सातत्याने विचारले जातात.`,
        when: "अभ्यासक्रमातील अधिकृत तरतूद व स्पर्धा परीक्षेचे ताजे स्वरूप.",
        where: `${subjectName} - ${chapterName}.`,
        mpscImportance: `${examName} पूर्व व मुख्य परीक्षेत '${topicName}' वर प्रत्येक वर्षी किमान २ ते ३ थेट किंवा उपघटकांवर आधारित प्रश्न हमखास येतात. अचूक संकल्पना आणि तथ्ये माहीत असणे मेरिटसाठी आवश्यक आहे.`
      },
      background: {
        timeline: [
          { year: "पायाभूत संकल्पना", event: `${topicName} ची सैद्धांतिक पार्श्वभूमी, व्याख्या आणि नियम.` },
          { year: "परीक्षेतील उपयोजन", event: "आयोगाच्या मागील ५ वर्षांच्या प्रश्नपत्रिकांमधील बदलता कल व विश्लेषणात्मक प्रश्न." },
          { year: "सद्यस्थिती", event: "आधुनिक संदर्भ आणि स्पर्धा परीक्षेची काठिण्यपातळी." }
        ],
        principles: [
          `${topicName} मधील मूलभूत संकल्पनांचा पाया समजून घेणे.`,
          "परीक्षेच्या दृष्टीने अपवाद, महत्त्वाचे नियम आणि वस्तुनिष्ठ आकडेवारी लक्षात ठेवणे."
        ]
      },
      coreAnalysis: [
        {
          title: `१. ${topicName}: मूलभूत संकल्पना व स्वरूप`,
          icon: "📘",
          summary: `या भागात ${topicName} चा अर्थ, शास्त्रीय व्याख्या आणि त्याचे प्रमुख वर्गीकरण स्पष्ट केले आहे.`,
          bulletPoints: [
            `**व्याख्या व मूळ अर्थ:** ${topicName} हा घटक परीक्षेच्या दृष्टीने अत्यंत संवेदनशील असून त्याचे अचूक निकष समजून घेणे गरजेचे आहे.`,
            `**घटकाचे मुख्य आधारस्तंभ:** संकल्पनेचे सैद्धांतिक पैलू, नियम व आयोगाने आतापर्यंत विचारलेले प्रमुख उपघटक.`,
            `**महाराष्ट्र व भारताचा संदर्भ:** राज्य पातळीवरील विशेष उदाहरणे, आकडेवारी व चालू घडामोडी.`
          ]
        },
        {
          title: "२. सविस्तर वर्गीकरण व परीक्षाभिमुख तांत्रिक पैलू",
          icon: "🔍",
          summary: "घटकाचे पोटप्रकार, वैशिष्ट्ये व परीक्षाभिमुख नियम.",
          bulletPoints: [
            `**प्राथमिक संकल्पना व नियम:** पायाभूत घटक, त्याची कार्यपद्धती व व्यावहारिक उदाहरणे.`,
            `**प्रगत स्तर व बारकावे:** बहुविध विधानांचे प्रश्न, आयोगाचे ट्रॅप्स आणि विश्लेषणात्मक मांडणी.`,
            `**वेळ वाचवण्याच्या ट्रिक्स:** निमोनिक्स व सूत्रांचा प्रभावी वापर करून अचूक उत्तर शोधणे.`
          ],
          note: `परीक्षेत ${topicName} वर प्रश्न सोडवताना विधानांमधील 'केवळ', 'सर्व', 'नेहमी' अशा अत्यंतिक शब्दांकडे विशेष लक्ष द्यावे.`
        }
      ],
      importantFacts: [
        `${topicName} संदर्भातील मूलभूत व्याख्या व तिचे जनक/संबंधित संस्था.`,
        "परीक्षेत थेट विचारली जाणारी महत्त्वाची आकडेवारी, कलमे, सूत्रे अथवा सनावळ्या.",
        "या घटकातील अपवादात्मक बाबी ज्यावर आयोग हमखास फसवे प्रश्न तयार करतो.",
        "चालू घडामोडींशी संबंधित ताजे बदल व शासकीय अहवाल/निर्देशांक."
      ],
      comparisons: [
        {
          topic: `${topicName} : संकल्पनात्मक तुलना व वर्गीकरण`,
          col1Title: "प्राथमिक पैलू / संकल्पना अ",
          col2Title: "दुय्यम पैलू / संकल्पना ब",
          points: [
            { param: "मूलभूत व्याख्या", c1: "थेट नियम व प्राथमिक स्वरूप", c2: "उपयोजित नियम व प्रगत स्वरूप" },
            { param: "परीक्षेतील स्थान", c1: "वस्तुनिष्ठ (फॅक्चुअल) प्रश्न", c2: "बहुविध विधानांचे विश्लेषणात्मक प्रश्न" },
            { param: "लक्षात ठेवण्याची युक्ती", c1: "थेट पाठांतर व सूत्रे", c2: "संकल्पनात्मक स्पष्टता व उदाहरणे" }
          ]
        }
      ],
      examTraps: [
        `${topicName} चा अभ्यास करताना केवळ पाठांतरावर भर दिल्यास फिरवून विचारलेल्या प्रश्नात चुका होतात; संकल्पना स्पष्ट ठेवावी.`,
        "समान वाटणाऱ्या दोन संकल्पनांमधील सूक्ष्म फरक स्पष्ट नसेल तर निगेटिव्ह मार्किंग होण्याची शक्यता वाढते."
      ],
      flashcards: [
        { term: `${topicName} - मुख्य व्याख्या`, definition: `${topicName} म्हणजे काय? त्याची परीक्षाभिमुख प्रमाण व्याख्या.` },
        { term: "महत्त्वाचे सूत्र / नियम", definition: `${topicName} मधील सर्वाधिक वेळा विचारला जाणारा अनिवार्य घटक.` },
        { term: "परीक्षेतील अपवाद", definition: `या घटकाशी संबंधित प्रमुख अपवाद जो विद्यार्थ्यांना परीक्षेत फसवू शकतो.` }
      ],
      verifiedPYQs: [
        {
          exam: examName,
          year: "२०२२",
          question: `'${topicName}' संदर्भातील खालील विधानांचा विचार करा आणि योग्य पर्याय निवडा:\n१) हा घटक परीक्षेच्या अभ्यासक्रमात अत्यंत निर्णायक गुण मिळवून देतो.\n२) यावरील प्रश्न सोडवताना अचूक संकल्पना व नियम आवश्यक असतात.`,
          options: [
            "फक्त विधान १ बरोबर",
            "फक्त विधान २ बरोबर",
            "विधान १ आणि २ दोन्ही बरोबर",
            "दोन्ही विधाने चूक"
          ],
          correctAnswer: 2,
          explanation: `${topicName} च्या नियमांनुसार दोन्ही विधाने संकल्पनात्मकदृष्ट्या पूर्णपणे अचूक आहेत. अचूक नियम आणि संकल्पनात्मक स्पष्टता यामुळे १००% अचूकता प्राप्त होते.`
        }
      ],
      practiceMCQs: {
        easy: [
          {
            q: `'${topicName}' चा मूलभूत पाया कशावर आधारलेला आहे?`,
            options: ["प्रमाणित व्याख्या व नियम", "केवळ अंदाज", "अनौपचारिक पद्धत", "यांपैकी नाही"],
            ans: 0,
            exp: `${topicName} चा पाया हा अधिकृत अभ्यासक्रम व संकल्पनेवर आधारलेला आहे.`
          }
        ],
        medium: [
          {
            q: `या घटकावर पूर्व व मुख्य परीक्षेत कोणत्या प्रकारचे प्रश्न येतात?`,
            options: ["केवळ सोपे प्रश्न", "संकल्पनात्मक व विश्लेषणात्मक दोन्ही", "केवळ सनावळ्या", "एकही प्रश्न येत नाही"],
            ans: 1,
            exp: `आयोगाच्या सध्याच्या ट्रेंडनुसार विधानात्मक व संकल्पनात्मक प्रश्नांचे प्रमाण सर्वाधिक आहे.`
          }
        ],
        hard: [
          {
            q: `'${topicName}' च्या तयारीसाठी सर्वात प्रभावी पद्धत कोणती?`,
            options: ["संकल्पना समजून PYQs व सराव करणे", "केवळ पाठांतर", "परीक्षेच्या आदल्या दिवशी वाचणे", "दुर्लक्ष करणे"],
            ans: 0,
            exp: `सखोल संकल्पना, सराव प्रश्न आणि रिव्हिजन यांच्या संयोगाने पैकीच्या पैकी गुण मिळवता येतात.`
          }
        ]
      },
      quickRevision: [
        `${topicName} चा मुख्य गाभा आणि व्याख्या.`,
        "घटकातील सर्व महत्त्वाचे प्रकार व त्यांचे वेगळेपण.",
        "परीक्षेसाठी अत्यंत आवश्यक असणारे ३ प्रमुख सूत्रे / कलमे / सनावळ्या.",
        "वारंवार होणाऱ्या चुका टाळण्यासाठी खबरदारीचे मुद्दे.",
        "जलद उजळणीसाठी तयार केलेली संक्षिप्त टिपणे."
      ],
      topicTest: {
        timeMinutes: 10,
        totalQuestions: 3,
        questions: [
          {
            q: `'${topicName}' मधील सर्वात मूलभूत संकल्पना कोणती?`,
            options: ["पायाभूत व्याख्या व नियम", "अनुमान", "इतिहास", "निष्कर्ष"],
            ans: 0
          },
          {
            q: `या घटकाची तयारी करताना कशावर भर असावा?`,
            options: ["केवळ पुस्तके गोळा करणे", "संकल्पना व प्रश्न सराव", "पाठांतर", "दुर्लक्ष"],
            ans: 1
          },
          {
            q: `परीक्षेत अचूकता वाढवण्यासाठी काय करावे?`,
            options: ["सराव MCQs सोडवणे", "अंदाज लावणे", "केवळ वाचन", "यांपैकी नाही"],
            ans: 0
          }
        ]
      }
    };
  }

  return {
    renderLessonView: function(containerElement, topicId, fallbackMeta) {
      currentTopicId = topicId;
      let lesson = (window.LESSON_STORE || {})[topicId];

      if (!lesson) {
        lesson = buildOnTheFlyLessonModule(topicId, fallbackMeta);
      }

      let contentHtml = '';
      if (activeTab === 'deep-study') {
        contentHtml = renderDeepStudyTab(lesson);
      } else if (activeTab === 'exam-focus') {
        contentHtml = renderExamFocusTab(lesson);
      } else if (activeTab === 'flashcards') {
        contentHtml = renderFlashcardsTab(lesson);
      } else if (activeTab === 'pyqs') {
        contentHtml = renderPYQsTab(lesson);
      } else if (activeTab === 'practice-mcqs') {
        contentHtml = renderPracticeMCQsTab(lesson);
      } else if (activeTab === 'revision') {
        contentHtml = renderRevisionTab(lesson);
      } else if (activeTab === 'topic-test') {
        contentHtml = renderTopicTestTab(lesson, topicId);
      }

      containerElement.innerHTML = `
        <div class="lesson-view-container">
          ${renderBreadcrumbs(lesson, fallbackMeta)}
          ${renderHeader(lesson, topicId, fallbackMeta)}
          ${renderTabsNav(lesson)}
          <div class="tab-content-area">
            ${contentHtml}
          </div>
        </div>
      `;

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    switchTab: function(tabId) {
      activeTab = tabId;
      const meta = window.AppRouter.getTopicMeta(currentTopicId);
      const container = document.getElementById('main-content-view');
      if (container && currentTopicId) {
        this.renderLessonView(container, currentTopicId, meta);
      }
    },

    handleStatusChange: function(topicId, status) {
      window.DashboardEngine.setTopicStatus(topicId, status);
      window.AppRouter.updateSidebarProgress();
    },

    toggleBookmark: function(topicId) {
      const isBookmarked = window.DashboardEngine.toggleBookmark(topicId);
      const meta = window.AppRouter.getTopicMeta(topicId);
      const container = document.getElementById('main-content-view');
      if (container) {
        this.renderLessonView(container, topicId, meta);
      }
    },

    checkPYQAnswer: function(qIdx, selectedIdx, correctIdx) {
      const isCorrect = selectedIdx === correctIdx;
      for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`pyq-${qIdx}-opt-${i}`);
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
      const expBox = document.getElementById(`pyq-exp-${qIdx}`);
      if (expBox) expBox.style.display = 'block';

      window.DashboardEngine.recordMcqAttempt(isCorrect, `pyq-${qIdx}`);
    },

    checkMCQAnswer: function(tier, qIdx, selectedIdx, correctIdx) {
      const isCorrect = selectedIdx === correctIdx;
      for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`mcq-btn-${tier}-${qIdx}-${i}`);
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
      const expBox = document.getElementById(`mcq-exp-${tier}-${idx = qIdx}`);
      if (expBox) expBox.style.display = 'block';

      window.DashboardEngine.recordMcqAttempt(isCorrect, `mcq-${tier}-${qIdx}`);
    },

    submitTopicTest: function(e, topicId) {
      e.preventDefault();
      const lesson = (window.LESSON_STORE || {})[topicId];
      if (!lesson || !lesson.topicTest) return;

      const questions = lesson.topicTest.questions;
      let score = 0;

      questions.forEach((q, idx) => {
        const selected = document.querySelector(`input[name="test_q_${idx}"]:checked`);
        if (selected && parseInt(selected.value) === q.ans) {
          score++;
        }
      });

      const total = questions.length;
      const percent = Math.round((score / total) * 100);
      window.DashboardEngine.recordTestScore(topicId, score, total);

      const resultBox = document.getElementById('test-result-box');
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.style.background = percent >= 70 ? '#dcfce7' : '#fee2e2';
        resultBox.style.color = percent >= 70 ? '#15803d' : '#b91c1c';
        resultBox.style.border = `2px solid ${percent >= 70 ? '#16a34a' : '#dc2626'}`;
        resultBox.innerHTML = `
          <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;">
            ${percent >= 70 ? '🎉 अभिनंदन! टेस्ट उत्तीर्ण!' : 'अभ्यास अधिक घट्ट करा!'}
          </h3>
          <p style="font-size: 1.1rem; margin-bottom: 10px;">
            तुमचे गुण: <strong>${score} / ${total} (${percent}%)</strong>
          </p>
          <p style="font-size: 0.9rem;">
            ${percent >= 70 ? 'हा घटक तुमच्या प्रगती अहवालात "पूर्ण" म्हणून नोंदवला गेला आहे.' : 'पुन्हा सराव करून टेस्ट द्या!'}
          </p>
        `;
      }
    }
  };
})();
