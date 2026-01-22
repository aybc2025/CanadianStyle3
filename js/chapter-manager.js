// ===================================
// Canadian Style Learner - Chapter Manager
// Core manager that loads chapter data and delegates rendering to builders
// ===================================

// Import builders (will be loaded dynamically)
let contentBuilders = null;

// Chapter data - will be loaded from JSON
let chapterData = null;

// Current state
let currentSection = 0;
let currentUser = null;
let userProgress = null;

// Initialize chapter page
document.addEventListener('DOMContentLoaded', async function() {
    // Get chapter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = parseInt(urlParams.get('id')) || 1;
    
    // Load user data
    currentUser = window.auth.getCurrentUser();
    if (currentUser) {
        userProgress = window.auth.getUserProgress(currentUser.email);
    }
    
    // Load builders
    await loadBuilders();
    
    // Load chapter data from JSON
    await loadChapterData(chapterId);
    
    // Setup navigation
    setupNavigation();
});

// Load all content builders
async function loadBuilders() {
    try {
        // Import all builder modules
        const [coreBuilder, boxBuilder, listsBuilder, chapter1Builder, chapter3Builder, chapter4Builder, chapter5Builder, chapter6Builder, chapter7Builder] = await Promise.all([
            import('./content-builders/core-builder.js'),
            import('./content-builders/box-builder.js'),
            import('./content-builders/lists-builder.js'),
            import('./content-builders/chapter1-builder.js'),
            import('./content-builders/chapter3-builder.js'),
            import('./content-builders/chapter4-builder.js'),
            import('./content-builders/chapter5-builder.js'),
            import('./content-builders/chapter6-builder.js'),
            import('./content-builders/chapter7-builder.js')
        ]);
        
        contentBuilders = {
            core: coreBuilder,
            box: boxBuilder,
            lists: listsBuilder,
            chapter1: chapter1Builder,
            chapter3: chapter3Builder,
            chapter4: chapter4Builder,
            chapter5: chapter5Builder,
            chapter6: chapter6Builder,
            chapter7: chapter7Builder
        };
        
    } catch (error) {
        console.error('Error loading builders:', error);
        // Fallback: continue without builders (will show error in rendering)
    }
}

// Load chapter data from JSON file
async function loadChapterData(chapterId) {
    try {
        // Pad chapter ID to two digits (01, 02, etc.)
        const paddedId = chapterId.toString().padStart(2, '0');
        
        // Fetch the JSON file
        const response = await fetch(`data/chapter-${paddedId}.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load chapter data: ${response.status}`);
        }
        
        // Parse JSON
        chapterData = await response.json();
        
        // Update header with chapter info
        document.getElementById('chapterBadge').textContent = chapterData.number;
        document.getElementById('chapterTitle').textContent = chapterData.title;
        document.getElementById('chapterDescription').textContent = chapterData.description;
        
        // Render section tabs
        renderSectionTabs();
        
        // Load first section (or saved position)
        const savedSection = getSavedSection(chapterId);
        loadSection(savedSection);
        
    } catch (error) {
        console.error('Error loading chapter data:', error);
        // Show error to user
        document.getElementById('contentArea').innerHTML = `
            <div class="error-message">
                <h2>Error Loading Chapter</h2>
                <p>Unable to load chapter content. Please try refreshing the page.</p>
                <p class="error-details">${error.message}</p>
            </div>
        `;
    }
}

// Render section tabs
function renderSectionTabs() {
    const tabsContainer = document.getElementById('navTabs');
    tabsContainer.innerHTML = '';
    
    chapterData.sections.forEach((section, index) => {
        const tab = document.createElement('button');
        tab.className = 'nav-tab';
        // Use subsectionOf as the display title if it exists
        const displayTitle = section.subsectionOf || section.title;
        tab.textContent = `${section.id} ${displayTitle}`;
        tab.onclick = () => loadSection(index);
        
        // Mark completed sections
        if (isSectionCompleted(section.id)) {
            tab.classList.add('completed');
        }
        
        tabsContainer.appendChild(tab);
    });
}

// Load section content
function loadSection(sectionIndex) {
    currentSection = sectionIndex;
    const section = chapterData.sections[sectionIndex];
    
    // Update active tab
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === sectionIndex);
    });
    
    // Update progress
    updateProgress();
    
    // Render content
    renderSectionContent(section);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Mark section as viewed
    markSectionViewed(section.id);
}

// Render section content using builders
function renderSectionContent(section) {
    const contentArea = document.getElementById('contentArea');

    // Build HTML from section content using builders
    const html = buildSectionHTML(section);

    // Build header - handle subsectionOf
    let headerHTML = '';
    if (section.subsectionOf) {
        // This is a subsection - show parent as main title, section title as subtitle
        headerHTML = `
            <div class="section-header">
                <div class="section-number">Section ${section.id}</div>
                <h2 class="section-title">${section.subsectionOf}</h2>
                <h3 class="subsection-title" style="color: #555; font-weight: 500; margin-top: 10px;">${section.id} ${section.title}</h3>
            </div>
        `;
    } else {
        // Regular section
        headerHTML = `
            <div class="section-header">
                <div class="section-number">Section ${section.id}</div>
                <h2 class="section-title">${section.title}</h2>
            </div>
        `;
    }

    contentArea.innerHTML = headerHTML + html;
}

// Build HTML from section content using modular builders
function buildSectionHTML(section) {
    const content = section.content;
    let html = '';
    
    if (!contentBuilders) {
        return '<p>Error: Content builders not loaded</p>';
    }
    
    // Get chapter ID
    const chapterId = parseInt(chapterData.chapterNumber || chapterData.id);
    
    // === CHAPTER 6: Use ONLY chapter6-builder (no core/box/lists!) ===
    if (chapterId === 6) {
        html += contentBuilders.chapter6.buildChapter6Content(content);
        return html;  // Return immediately, skip all other builders
    }
    
    // === FOR ALL OTHER CHAPTERS: Use standard builders ===
    
    // Use core builder for basic content
    html += contentBuilders.core.buildBasicContent(content);
    
    // Use core builder for rules
    html += contentBuilders.core.buildRules(content);
    
    // Use core builder for misc content
    html += contentBuilders.core.buildMiscContent(content);

    // Use core builder for dynamic fields (Chapter 7 special fields)
    html += contentBuilders.core.buildDynamicFields(content, chapterId);
    
    // Use box builder for special boxes
    html += contentBuilders.box.buildBoxes(content);

    // Use lists builder for lists and examples (skip for Chapter 7 - handled by core-builder)
    if (chapterId !== 7) {
        html += contentBuilders.lists.buildLists(content);
    }
    
    // Use chapter-specific builders based on chapter ID
    if (chapterId === 1) {
        html += contentBuilders.chapter1.buildChapter1Content(content);
    }
    
    if (chapterId === 3) {
        html += contentBuilders.chapter3.buildChapter3Content(content);
    }
    
    if (chapterId === 4) {
        html += contentBuilders.chapter4.buildChapter4Content(content);
    }
    
    if (chapterId === 5) {
        html += contentBuilders.chapter5.buildChapter5Content(content);
    }
    
    if (chapterId === 7) {
        html += contentBuilders.chapter7.buildChapter7Content(content);
    }
    
    return html;
}

// Setup navigation buttons
function setupNavigation() {
    // Previous button
    document.getElementById('prevBtn')?.addEventListener('click', () => {
        if (currentSection > 0) {
            loadSection(currentSection - 1);
        }
    });
    
    // Next button
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        if (currentSection < chapterData.sections.length - 1) {
            loadSection(currentSection + 1);
        } else {
            // Last section - go to quiz
            window.location.href = `quiz.html?id=${chapterData.id}`;
        }
    });
    
    // Mark complete button
    document.getElementById('markCompleteBtn')?.addEventListener('click', () => {
        markSectionCompleted(chapterData.sections[currentSection].id);
        
        // Move to next section or quiz
        if (currentSection < chapterData.sections.length - 1) {
            loadSection(currentSection + 1);
        } else {
            window.location.href = `quiz.html?id=${chapterData.id}`;
        }
    });
}

// Update navigation buttons state
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentSection === 0;
    }
    
    if (nextBtn) {
        const isLastSection = currentSection === chapterData.sections.length - 1;
        nextBtn.textContent = isLastSection ? 'Take Quiz' : 'Next Section';
    }
}

// Update progress display
function updateProgress() {
    const completedSections = chapterData.sections.filter(section => 
        isSectionCompleted(section.id)
    ).length;
    
    const totalSections = chapterData.sections.length;
    const percentage = Math.round((completedSections / totalSections) * 100);
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${completedSections} of ${totalSections} sections completed`;
    }
}

// Check if section is completed
function isSectionCompleted(sectionId) {
    if (!userProgress || !chapterData) return false;
    
    const chapterProgress = userProgress.chapters[chapterData.id];
    if (!chapterProgress || !chapterProgress.sections) return false;
    
    const sectionProgress = chapterProgress.sections.find(s => s.sectionId === sectionId);
    return sectionProgress && sectionProgress.completed;
}

// Mark section as viewed
function markSectionViewed(sectionId) {
    if (!currentUser || !userProgress) return;
    
    // Initialize chapter progress if needed
    if (!userProgress.chapters[chapterData.id]) {
        userProgress.chapters[chapterData.id] = {
            chapterId: chapterData.id,
            sections: []
        };
    }
    
    const chapterProgress = userProgress.chapters[chapterData.id];
    
    // Find or create section progress
    let sectionProgress = chapterProgress.sections.find(s => s.sectionId === sectionId);
    
    if (!sectionProgress) {
        sectionProgress = {
            sectionId: sectionId,
            completed: false,
            viewedAt: new Date().toISOString()
        };
        chapterProgress.sections.push(sectionProgress);
    } else {
        sectionProgress.viewedAt = new Date().toISOString();
    }
    
    // Save progress
    window.auth.saveUserProgress(currentUser.email, userProgress);
}

// Mark section as completed
function markSectionCompleted(sectionId) {
    if (!currentUser || !userProgress) return;
    
    // Initialize chapter progress if needed
    if (!userProgress.chapters[chapterData.id]) {
        userProgress.chapters[chapterData.id] = {
            chapterId: chapterData.id,
            sections: []
        };
    }
    
    const chapterProgress = userProgress.chapters[chapterData.id];
    
    // Find or create section progress
    let sectionProgress = chapterProgress.sections.find(s => s.sectionId === sectionId);
    
    if (!sectionProgress) {
        sectionProgress = {
            sectionId: sectionId,
            completed: true,
            viewedAt: new Date().toISOString()
        };
        chapterProgress.sections.push(sectionProgress);
    } else {
        sectionProgress.completed = true;
        sectionProgress.viewedAt = new Date().toISOString();
    }
    
    // Save progress
    window.auth.saveUserProgress(currentUser.email, userProgress);
    
    // Update UI
    updateProgress();
    renderSectionTabs();
}

// Get saved section position
function getSavedSection(chapterId) {
    if (!userProgress) return 0;
    
    const chapterProgress = userProgress.chapters[chapterId];
    if (!chapterProgress || !chapterProgress.sections) return 0;
    
    // Find first incomplete section
    for (let i = 0; i < chapterData.sections.length; i++) {
        const section = chapterData.sections[i];
        const progress = chapterProgress.sections.find(s => s.sectionId === section.id);
        
        if (!progress || !progress.completed) {
            return i;
        }
    }
    
    // All completed, return last section
    return chapterData.sections.length - 1;
}
