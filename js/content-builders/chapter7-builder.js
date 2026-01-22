// ===================================
// Chapter 7 Builder - Punctuation
// ===================================
// Handles ONLY special content structures unique to Chapter 7
// Regular fields (mainText, examples, rules, note, etc.) are handled by core-builder and lists-builder

/**
 * Build content for Chapter 7 sections
 * @param {Object} content - Section content from chapter-07.json
 * @returns {string} HTML string
 */
export function buildChapter7Content(content) {
    let html = '';

    // === ONLY handle special Chapter 7 structures ===

    // 7.02: Spacing Rules (unique nested structure with mark/rules/examples)
    if (content.spacingRules && Array.isArray(content.spacingRules)) {
        html += buildSpacingRules(content.spacingRules);
    }

    // 7.14, 7.15: Categories with letters (a, b, c...)
    if (content.categories && Array.isArray(content.categories)) {
        html += buildLetterCategories(content.categories);
    }

    // NOTE: quotedExamples are now handled by core-builder in correct position
    // (after explanation, before additionalExplanation)

    // Single quotedComparison (section 7.40)
    if (content.quotedComparison && typeof content.quotedComparison === 'object') {
        html += buildQuotedExamples([content.quotedComparison]);
    }

    // === NEW: Handle all Chapter 7 special field types ===

    // Handle all *Intro fields (explanatory text before examples)
    html += buildIntroFields(content);

    // Handle all *Use fields (usage descriptions)
    html += buildUseFields(content);

    // Handle single *Example fields (not arrays)
    html += buildSingleExampleFields(content);

    // Handle special note fields (courtesyNote, addressNote, etc.)
    html += buildSpecialNotes(content);

    // Handle special principles
    if (content.basicPrinciple) {
        html += `
            <div class="key-principle" style="margin: 15px 0; padding: 15px; background-color: #fff3e0; border-left: 4px solid #ff9800; border-radius: 4px;">
                <p style="margin: 0; font-weight: 500;"><strong>⚡ Key Principle:</strong> ${content.basicPrinciple}</p>
            </div>
        `;
    }

    // Handle special question/explanation fields
    if (content.indirectQuestions) {
        html += `<p style="margin: 10px 0;">${content.indirectQuestions}</p>`;
    }
    if (content.interrogativeAsImperative) {
        html += `<p style="margin: 10px 0;">${content.interrogativeAsImperative}</p>`;
    }

    return html;
}

/**
 * Build spacing rules section (7.02)
 * Structure: array of {mark, rules: [{rule, examples, note}]}
 * @param {Array} spacingRules - Array of spacing rules
 * @returns {string} HTML string
 */
function buildSpacingRules(spacingRules) {
    let html = `
        <div class="spacing-rules-section" style="margin-top: 20px;">
            <h4 style="color: #c41e3a; margin-bottom: 15px;">Spacing Rules by Punctuation Mark</h4>
    `;

    spacingRules.forEach(markRules => {
        html += `
            <div class="punctuation-mark-rules" style="margin-bottom: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 6px;">
                <h5 style="color: #c41e3a; margin-bottom: 15px; font-size: 1.1em;">
                    ${markRules.mark}
                </h5>
        `;

        if (markRules.rules && Array.isArray(markRules.rules)) {
            markRules.rules.forEach((rule, index) => {
                html += `
                    <div style="margin-bottom: ${index < markRules.rules.length - 1 ? '20px' : '0'};">
                        <p style="margin-bottom: 8px;"><strong>•</strong> ${rule.rule}</p>
                `;
                
                if (rule.examples && Array.isArray(rule.examples)) {
                    html += `<div class="example-box" style="margin-left: 20px; margin-top: 5px;">`;
                    rule.examples.forEach(example => {
                        html += `<p style="margin: 3px 0;"><em>${example}</em></p>`;
                    });
                    html += `</div>`;
                }

                if (rule.note) {
                    html += `
                        <div class="info-box note" style="margin-left: 20px; margin-top: 8px;">
                            <p style="font-size: 0.9em;"><strong>📝 Note:</strong> ${rule.note}</p>
                        </div>
                    `;
                }
                
                html += `</div>`;
            });
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
}

/**
 * Build letter categories - FULLY DYNAMIC
 * Handles 3 different category structures:
 * - 7.14: {letter, title, text, examples, ...}
 * - 7.15: {letter, title, text, examples, MANY special fields}
 * - 7.64: {type, description, examples, ...} (NO letter!)
 * @param {Array} categories - Array of categories
 * @returns {string} HTML string
 */
function buildLetterCategories(categories) {
    let html = `<div class="letter-categories-section" style="margin-top: 20px;">`;

    categories.forEach((category, index) => {
        html += `
            <div class="category-item" style="margin-bottom: 25px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #c41e3a; border-radius: 4px;">
        `;
        
        // === HEADER: letter+title OR type ===
        if (category.letter && category.title) {
            html += `
                <h5 style="color: #c41e3a; margin-bottom: 12px; font-size: 1.05em;">
                    (${category.letter}) ${category.title}
                </h5>
            `;
        } else if (category.type) {
            html += `
                <h5 style="color: #c41e3a; margin-bottom: 12px; font-size: 1.05em;">
                    ${category.type}
                </h5>
            `;
        }

        // === DYNAMIC FIELD PROCESSING ===
        // Skip fields that are handled above or need special treatment
        const skipFields = ['letter', 'title', 'type', 'quotedExamples', 'quotedExample', 'heavierExample', 'exclamationExample'];
        
        Object.keys(category).forEach(key => {
            if (skipFields.includes(key)) return;
            
            const value = category[key];
            
            // === STRING VALUES ===
            if (typeof value === 'string' && value.trim()) {
                // Main text or description
                if (key === 'text' || key === 'description') {
                    html += `<p style="margin-bottom: 10px;">${value}</p>`;
                }
                // Notes
                else if (key.endsWith('Note') || key.includes('Note')) {
                    html += `
                        <div class="info-box note" style="margin-top: 10px; padding: 10px; background-color: #e8f4f8; border-left: 3px solid #0066cc;">
                            <p style="margin: 0; font-size: 0.9em;"><strong>📝</strong> ${value}</p>
                        </div>
                    `;
                }
                // Intros
                else if (key.endsWith('Intro')) {
                    html += `<p style="margin-top: 12px; font-weight: 500;">${value}</p>`;
                }
                // Single examples
                else if (key.endsWith('Example') || key === 'example') {
                    html += `
                        <div class="example-box" style="margin-top: 8px; padding: 8px; background-color: #f5f5f5; border-radius: 3px;">
                            <p style="margin: 0; font-style: italic;">${value}</p>
                        </div>
                    `;
                }
                // Solutions, alternatives, explanations
                else if (key.includes('Solution') || key === 'explanation' || key.includes('Alternative')) {
                    html += `<p style="margin-top: 10px; font-style: italic; font-size: 0.95em;">${value}</p>`;
                }
                // Any other string
                else {
                    html += `<p style="margin-top: 8px;">${value}</p>`;
                }
            }
            
            // === ARRAY VALUES ===
            else if (Array.isArray(value) && value.length > 0) {
                html += `
                    <div class="example-box" style="margin-top: 8px; padding: 8px; background-color: #f5f5f5; border-radius: 3px;">
                `;
                value.forEach(item => {
                    if (typeof item === 'string') {
                        html += `<p style="margin: 2px 0; font-style: italic;">${item}</p>`;
                    } else if (typeof item === 'object' && item.text) {
                        html += `<p style="margin: 2px 0; font-style: italic;">${item.text}</p>`;
                    }
                });
                html += `</div>`;
            }
            
            // === OBJECT VALUES (quoted examples) ===
            else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                if (value.text) {
                    html += `
                        <div class="quote-box" style="margin: 12px 0; padding: 12px; background-color: #f0f8ff; border-left: 4px solid #0066cc; border-radius: 4px;">
                            <p style="font-style: italic; margin-bottom: ${value.author ? '5px' : '0'};">"${value.text}"</p>
                    `;
                    if (value.author) {
                        html += `<p style="text-align: right; color: #666; font-size: 0.9em; margin: 0;">— ${value.author}</p>`;
                    }
                    html += `</div>`;
                }
            }
        });

        // === SPECIAL HANDLING for quotedExamples array ===
        if (category.quotedExamples && Array.isArray(category.quotedExamples)) {
            html += buildQuotedExamples(category.quotedExamples);
        }

        // === SPECIAL HANDLING for single quoted objects ===
        if (category.quotedExample) {
            html += buildSingleQuote(category.quotedExample);
        }
        if (category.heavierExample) {
            html += buildSingleQuote(category.heavierExample);
        }
        if (category.exclamationExample) {
            html += buildSingleQuote(category.exclamationExample);
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
}

/**
 * Build a single quoted example
 * @param {Object} quote - {text, author}
 * @returns {string} HTML string
 */
function buildSingleQuote(quote) {
    return `
        <div class="quote-box" style="margin: 12px 0; padding: 12px; background-color: #f0f8ff; border-left: 4px solid #0066cc; border-radius: 4px;">
            <p style="font-style: italic; margin-bottom: ${quote.author ? '5px' : '0'};">"${quote.text}"</p>
            ${quote.author ? `<p style="text-align: right; color: #666; font-size: 0.9em; margin: 0;">— ${quote.author}</p>` : ''}
        </div>
    `;
}

/**
 * Build quoted examples (with optional authors)
 * Structure: array of {text, author}
 * @param {Array} quotedExamples - Array of quoted examples
 * @returns {string} HTML string
 */
function buildQuotedExamples(quotedExamples) {
    let html = `
        <div class="quoted-examples-section" style="margin-top: 15px;">
    `;

    quotedExamples.forEach(quote => {
        html += `
            <div class="quote-box" style="margin: 12px 0; padding: 15px; background-color: #f0f8ff; border-left: 4px solid #0066cc; border-radius: 4px;">
                <p style="font-style: italic; margin-bottom: ${quote.author || quote.source ? '8px' : '0'};">"${quote.text}"</p>
        `;

        if (quote.author) {
            html += `<p style="text-align: right; color: #666; font-size: 0.9em; margin: 0;">— ${quote.author}</p>`;
        }

        if (quote.source) {
            html += `<p style="text-align: right; color: #666; font-size: 0.9em; margin: 0;">— ${quote.source}</p>`;
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
}

/**
 * Build all fields ending with "Intro" - these are explanatory texts before examples
 * @param {Object} content - Section content
 * @returns {string} HTML string
 */
function buildIntroFields(content) {
    let html = '';

    Object.keys(content).forEach(key => {
        if (key.endsWith('Intro') && typeof content[key] === 'string') {
            html += `
                <div style="margin: 12px 0;">
                    <p style="font-weight: 500; color: #333;">${content[key]}</p>
                </div>
            `;
        }
    });

    return html;
}

/**
 * Build all fields ending with "Use" - these are usage descriptions
 * @param {Object} content - Section content
 * @returns {string} HTML string
 */
function buildUseFields(content) {
    let html = '';

    Object.keys(content).forEach(key => {
        if (key.endsWith('Use') && typeof content[key] === 'string') {
            html += `
                <div style="margin: 12px 0;">
                    <p style="color: #444;">${content[key]}</p>
                </div>
            `;
        }
    });

    return html;
}

/**
 * Build single example fields (not arrays) - fields ending with "Example"
 * @param {Object} content - Section content
 * @returns {string} HTML string
 */
function buildSingleExampleFields(content) {
    let html = '';

    Object.keys(content).forEach(key => {
        if (key.endsWith('Example') && typeof content[key] === 'string') {
            // Check if it contains line breaks (formatted text)
            if (content[key].includes('\n')) {
                html += `
                    <div class="example-box" style="margin: 10px 0; padding: 12px; background-color: #f5f5f5; border-left: 3px solid #888; border-radius: 4px;">
                        <pre style="margin: 0; font-family: 'Courier New', monospace; white-space: pre-wrap; font-size: 0.9em;">${content[key]}</pre>
                    </div>
                `;
            } else {
                html += `
                    <div class="example-box" style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-left: 3px solid #888; border-radius: 4px;">
                        <p style="margin: 0; font-style: italic; font-size: 0.95em;">${content[key]}</p>
                    </div>
                `;
            }
        }
    });

    return html;
}

/**
 * Build special note fields (courtesyNote, addressNote, mildExclamationNote, etc.)
 * @param {Object} content - Section content
 * @returns {string} HTML string
 */
function buildSpecialNotes(content) {
    let html = '';

    const specialNoteFields = [
        'courtesyNote', 'mildExclamationNote', 'addressNote',
        'bracketsNote', 'warningNote', 'figureNote'
    ];

    specialNoteFields.forEach(field => {
        if (content[field] && typeof content[field] === 'string') {
            const isWarning = field === 'warningNote';
            html += `
                <div class="info-box ${isWarning ? 'warning' : 'note'}" style="margin: 12px 0; padding: 12px; background-color: ${isWarning ? '#fff3cd' : '#e8f4f8'}; border-left: 4px solid ${isWarning ? '#ffc107' : '#0066cc'}; border-radius: 4px;">
                    <p style="margin: 0; font-size: 0.95em;"><strong>${isWarning ? '⚠️' : '📝'} Note:</strong> ${content[field]}</p>
                </div>
            `;
        }
    });

    return html;
}
