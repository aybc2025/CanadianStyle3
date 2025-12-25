// ===================================
// Chapter 7 Builder - Punctuation
// ===================================
// Handles specific content structures for Chapter 7

/**
 * Build content for Chapter 7 sections
 * @param {Object} content - Section content from chapter-07.json
 * @returns {string} HTML string
 */
export function buildChapter7Content(content) {
    let html = '';

    // === Handle all regular text fields FIRST ===
    
    // generalRule (7.02)
    if (content.generalRule) {
        html += `<p><strong>${content.generalRule}</strong></p>`;
    }
    
    // intro (7.14, 7.15, etc.)
    if (content.intro) {
        html += `<p>${content.intro}</p>`;
    }
    
    // mainText
    if (content.mainText) {
        html += `<p>${content.mainText}</p>`;
    }
    
    // explanation
    if (content.explanation) {
        html += `<p>${content.explanation}</p>`;
    }
    
    // additionalExplanation
    if (content.additionalExplanation) {
        html += `<p>${content.additionalExplanation}</p>`;
    }
    
    // === Simple examples array ===
    if (content.examples && Array.isArray(content.examples)) {
        html += `<div class="example-box">`;
        content.examples.forEach(example => {
            html += `<p><em>${example}</em></p>`;
        });
        html += `</div>`;
    }
    
    // === Additional examples ===
    if (content.additionalExamples && Array.isArray(content.additionalExamples)) {
        html += `<div class="example-box">`;
        content.additionalExamples.forEach(example => {
            html += `<p><em>${example}</em></p>`;
        });
        html += `</div>`;
    }
    
    // === Simple Rules (array of strings) ===
    if (content.rules && Array.isArray(content.rules)) {
        html += `<ul class="rules-list">`;
        content.rules.forEach(rule => {
            html += `<li>${rule}</li>`;
        });
        html += `</ul>`;
    }
    
    // === Note ===
    if (content.note) {
        html += `
            <div class="info-box note" style="margin-top: 10px;">
                <p><strong>📝 Note:</strong> ${content.note}</p>
            </div>
        `;
    }
    
    // === Warning ===
    if (content.warning) {
        html += `
            <div class="info-box warning" style="margin-top: 10px; background-color: #fff3cd; border-left-color: #ffc107;">
                <p><strong>⚠️ Warning:</strong> ${content.warning}</p>
            </div>
        `;
    }
    
    // === crossReference ===
    if (content.crossReference) {
        html += `<p class="cross-reference"><em>${content.crossReference}</em></p>`;
    }

    // === 7.02: Spacing Rules (Special Structure) ===
    if (content.spacingRules && Array.isArray(content.spacingRules)) {
        html += buildSpacingRules(content.spacingRules);
    }

    // === 7.03 and similar: Quoted Examples (with authors) ===
    if (content.quotedExamples && Array.isArray(content.quotedExamples)) {
        html += buildQuotedExamples(content.quotedExamples);
    }

    // === 7.14, 7.15: Categories with letters (a, b, c...) ===
    if (content.categories && Array.isArray(content.categories)) {
        html += buildLetterCategories(content.categories);
    }
    
    // === Handle ALL other fields dynamically ===
    // This handles fields like "singularIntro", "pluralSIntro", etc.
    Object.keys(content).forEach(key => {
        // Skip fields we already handled
        const handledFields = ['generalRule', 'intro', 'mainText', 'explanation', 'additionalExplanation', 
                              'examples', 'additionalExamples', 'rules', 'note', 'warning', 'crossReference',
                              'spacingRules', 'quotedExamples', 'categories'];
        
        if (handledFields.includes(key)) return;
        
        const value = content[key];
        
        // Handle fields ending with "Intro", "Note", "Text", "Description"
        if (key.endsWith('Intro') || key.endsWith('Note') || key.endsWith('Text') || key.endsWith('Description') || 
            key.endsWith('Use') || key.endsWith('Questions') || key === 'basicPrinciple') {
            if (typeof value === 'string') {
                html += `<p>${value}</p>`;
            }
        }
        
        // Handle fields ending with "Example" (singular)
        else if (key.endsWith('Example') && typeof value === 'string' && !Array.isArray(value)) {
            html += `<div class="example-box"><p><em>${value}</em></p></div>`;
        }
        
        // Handle fields ending with "Examples" (plural array)
        else if (key.endsWith('Examples') && Array.isArray(value)) {
            html += `<div class="example-box">`;
            value.forEach(example => {
                html += `<p><em>${example}</em></p>`;
            });
            html += `</div>`;
        }
    });

    return html;
}

/**
 * Build spacing rules section (7.02)
 * @param {Array} spacingRules - Array of spacing rules
 * @returns {string} HTML string
 */
function buildSpacingRules(spacingRules) {
    let html = `
        <div class="spacing-rules-section">
            <h4>Spacing Rules by Punctuation Mark</h4>
    `;

    spacingRules.forEach(markRules => {
        html += `
            <div class="punctuation-mark-rules" style="margin-bottom: 25px;">
                <h5 style="color: #c41e3a; margin-bottom: 10px;">${markRules.mark}</h5>
        `;

        if (markRules.rules && Array.isArray(markRules.rules)) {
            markRules.rules.forEach(rule => {
                html += `<p style="margin-left: 20px;"><strong>Rule:</strong> ${rule.rule}</p>`;
                
                if (rule.examples && Array.isArray(rule.examples)) {
                    html += `<div class="example-box" style="margin-left: 20px;">`;
                    rule.examples.forEach(example => {
                        html += `<p><em>${example}</em></p>`;
                    });
                    html += `</div>`;
                }

                if (rule.note) {
                    html += `
                        <div class="info-box note" style="margin-left: 20px; margin-top: 10px;">
                            <p><strong>📝 Note:</strong> ${rule.note}</p>
                        </div>
                    `;
                }
            });
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
}

/**
 * Build letter categories (a, b, c...) - Used in 7.14, 7.15
 * @param {Array} categories - Array of categories with letters
 * @returns {string} HTML string
 */
function buildLetterCategories(categories) {
    let html = `<div class="letter-categories-section">`;

    categories.forEach(category => {
        html += `
            <div class="category-item" style="margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #c41e3a; border-radius: 4px;">
                <h5 style="color: #c41e3a; margin-bottom: 10px;">
                    (${category.letter}) ${category.title}
                </h5>
        `;

        if (category.text) {
            html += `<p>${category.text}</p>`;
        }

        if (category.examples && Array.isArray(category.examples)) {
            html += `
                <div class="example-box">
                    <h6>Examples:</h6>
            `;
            category.examples.forEach(example => {
                html += `<p>${example}</p>`;
            });
            html += `</div>`;
        }

        // Handle sub-notes
        if (category.note) {
            html += `
                <div class="info-box note" style="margin-top: 15px;">
                    <p><strong>📝 Note:</strong> ${category.note}</p>
                </div>
            `;
        }

        if (category.shortPhraseNote) {
            html += `<p style="margin-top: 10px;"><strong>Note:</strong> ${category.shortPhraseNote}</p>`;
        }

        if (category.shortExamples && Array.isArray(category.shortExamples)) {
            html += `
                <div class="example-box" style="margin-top: 10px;">
            `;
            category.shortExamples.forEach(example => {
                html += `<p>${example}</p>`;
            });
            html += `</div>`;
        }

        // Handle contrast examples
        if (category.contrastExamples && Array.isArray(category.contrastExamples)) {
            html += `<div class="contrast-examples" style="margin-top: 15px;">`;
            category.contrastExamples.forEach(example => {
                html += `<p style="margin-left: 20px;">${example}</p>`;
            });
            html += `</div>`;
        }

        if (category.explanation) {
            html += `<p style="margin-top: 10px; font-style: italic;">${category.explanation}</p>`;
        }

        // Additional examples
        if (category.additionalExamples && Array.isArray(category.additionalExamples)) {
            html += `<div class="example-box" style="margin-top: 10px;">`;
            category.additionalExamples.forEach(example => {
                html += `<p>${example}</p>`;
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
                    <p><em>"${category.exclamationExample.text}"</em></p>
                    <p style="text-align: right; margin-top: 5px;">— ${category.exclamationExample.author}</p>
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
 * @param {Array} quotedExamples - Array of quoted examples
 * @returns {string} HTML string
 */
function buildQuotedExamples(quotedExamples) {
    let html = `
        <div class="quoted-examples-section" style="margin-top: 20px;">
    `;

    quotedExamples.forEach(quote => {
        html += `
            <div class="quote-box" style="margin: 15px 0; padding: 15px; background-color: #f0f8ff; border-left: 4px solid #0066cc; border-radius: 4px;">
                <p style="font-style: italic; margin-bottom: 5px;">"${quote.text}"</p>
        `;
        
        if (quote.author) {
            html += `<p style="text-align: right; color: #666; font-size: 0.9em;">— ${quote.author}</p>`;
        }

        if (quote.source) {
            html += `<p style="text-align: right; color: #666; font-size: 0.9em;">— ${quote.source}</p>`;
        }

        html += `</div>`;
    });

    html += `</div>`;
    return html;
}
