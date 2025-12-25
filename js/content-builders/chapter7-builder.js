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

    // Quoted Examples with authors (special format)
    if (content.quotedExamples && Array.isArray(content.quotedExamples)) {
        html += buildQuotedExamples(content.quotedExamples);
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
 * Build letter categories (a, b, c...) - Used in 7.14, 7.15
 * Structure: array of {letter, title, text, examples, note, etc.}
 * @param {Array} categories - Array of categories with letters
 * @returns {string} HTML string
 */
function buildLetterCategories(categories) {
    let html = `<div class="letter-categories-section" style="margin-top: 20px;">`;

    categories.forEach((category, index) => {
        html += `
            <div class="category-item" style="margin-bottom: 25px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #c41e3a; border-radius: 4px;">
                <h5 style="color: #c41e3a; margin-bottom: 12px; font-size: 1.05em;">
                    (${category.letter}) ${category.title || ''}
                </h5>
        `;

        if (category.text) {
            html += `<p style="margin-bottom: 10px;">${category.text}</p>`;
        }

        if (category.examples && Array.isArray(category.examples)) {
            html += `
                <div class="example-box" style="margin-top: 10px;">
                    <h6 style="margin-bottom: 8px; font-size: 0.95em;">Examples:</h6>
            `;
            category.examples.forEach(example => {
                html += `<p style="margin: 3px 0;">${example}</p>`;
            });
            html += `</div>`;
        }

        // Handle sub-notes
        if (category.note) {
            html += `
                <div class="info-box note" style="margin-top: 12px;">
                    <p style="font-size: 0.9em;"><strong>📝 Note:</strong> ${category.note}</p>
                </div>
            `;
        }

        if (category.shortPhraseNote) {
            html += `<p style="margin-top: 10px; font-size: 0.9em;"><strong>Note:</strong> ${category.shortPhraseNote}</p>`;
        }

        if (category.shortExamples && Array.isArray(category.shortExamples)) {
            html += `
                <div class="example-box" style="margin-top: 10px;">
            `;
            category.shortExamples.forEach(example => {
                html += `<p style="margin: 3px 0;">${example}</p>`;
            });
            html += `</div>`;
        }

        // Handle contrast examples
        if (category.contrastExamples && Array.isArray(category.contrastExamples)) {
            html += `<div class="contrast-examples" style="margin-top: 12px;">`;
            category.contrastExamples.forEach(example => {
                html += `<p style="margin: 3px 0 3px 20px;">${example}</p>`;
            });
            html += `</div>`;
        }

        if (category.explanation) {
            html += `<p style="margin-top: 10px; font-style: italic; font-size: 0.95em;">${category.explanation}</p>`;
        }

        // Additional examples
        if (category.additionalExamples && Array.isArray(category.additionalExamples)) {
            html += `<div class="example-box" style="margin-top: 10px;">`;
            category.additionalExamples.forEach(example => {
                html += `<p style="margin: 3px 0;">${example}</p>`;
            });
            html += `</div>`;
        }

        // Quoted examples within categories
        if (category.quotedExamples && Array.isArray(category.quotedExamples)) {
            html += buildQuotedExamples(category.quotedExamples);
        }

        // Handle exclamation example
        if (category.exclamationExample) {
            html += `
                <div class="example-box" style="margin-top: 10px;">
                    <p style="font-style: italic;">"${category.exclamationExample.text}"</p>
                    <p style="text-align: right; margin-top: 5px; font-size: 0.9em; color: #666;">— ${category.exclamationExample.author}</p>
                </div>
            `;
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
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
