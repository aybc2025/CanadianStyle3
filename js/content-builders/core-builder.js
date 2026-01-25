// ===================================
// Core Content Builder
// Handles basic content types used across all chapters
// ===================================

// Helper function to build examples box
function buildExamplesBox(examples) {
    let html = `<div class="examples-box" style="margin: 15px 0; padding: 15px; background-color: #f0f7ff; border-left: 4px solid #0066cc; border-radius: 4px;">`;
    html += `<h4 style="color: #0066cc; margin-top: 0; margin-bottom: 10px;">Examples</h4>`;
    html += `<ul style="margin: 0; padding-left: 20px;">`;
    examples.forEach(example => {
        html += `<li style="margin-bottom: 8px;">${example}</li>`;
    });
    html += `</ul></div>`;
    return html;
}

// Helper function to build quoted examples (with optional author attribution)
function buildQuotedExamples(quotedExamples) {
    let html = `<div class="examples-box" style="margin: 15px 0; padding: 15px; background-color: #f0f7ff; border-left: 4px solid #0066cc; border-radius: 4px;">`;
    html += `<h4 style="color: #0066cc; margin-top: 0; margin-bottom: 10px;">Examples</h4>`;

    quotedExamples.forEach((example, index) => {
        if (typeof example === 'string') {
            // Simple string example
            html += `<blockquote style="margin: 10px 0; padding-left: 15px; border-left: 3px solid #0066cc; font-style: italic;">
                ${example}
            </blockquote>`;
        } else if (typeof example === 'object' && example.text) {
            // Object with text and optional author
            html += `<blockquote style="margin: 10px 0; padding-left: 15px; border-left: 3px solid #0066cc; font-style: italic;">
                ${example.text}
                ${example.author ? `<br><strong style="font-style: normal;">—${example.author}</strong>` : ''}
                ${example.source ? `<br><em style="font-size: 0.9em;">${example.source}</em>` : ''}
            </blockquote>`;
        }
    });

    html += `</div>`;
    return html;
}

export function buildBasicContent(content) {
    let html = '';

    // General Rule (used in 7.02 and possibly others)
    if (content.generalRule) {
        html += `<p><strong>${content.generalRule}</strong></p>`;
    }

    // Intro (used in many sections)
    if (content.intro) {
        html += `<p>${content.intro}</p>`;
    }

    // Main text
    if (content.text) {
        html += `<p>${content.text}</p>`;
    }

    // Main text (Chapter 4 style)
    if (content.mainText) {
        html += `<p>${content.mainText}</p>`;
    }

    // IMPORTANT: Examples come BEFORE explanation (Chapter 7 pattern)
    if (content.examples && Array.isArray(content.examples)) {
        html += buildExamplesBox(content.examples);
    }

    // Explanation (comes AFTER examples in Chapter 7)
    if (content.explanation) {
        html += `<p>${content.explanation}</p>`;
    }

    // Quoted Examples (comes AFTER explanation, used in Chapter 7)
    if (content.quotedExamples && Array.isArray(content.quotedExamples)) {
        html += buildQuotedExamples(content.quotedExamples);
    }

    // Additional Explanation
    if (content.additionalExplanation) {
        html += `<p>${content.additionalExplanation}</p>`;
    }

    // Additional Examples (comes AFTER additionalExplanation)
    if (content.additionalExamples && Array.isArray(content.additionalExamples)) {
        html += buildExamplesBox(content.additionalExamples);
    }
    
    // Format
    if (content.format) {
        html += `<p class="format-note"><strong>Format:</strong> ${content.format}</p>`;
    }
    
    // Note
    if (content.note) {
        html += `
            <div class="info-box note" style="margin-top: 10px; padding: 15px; background-color: #e8f4f8; border-left: 4px solid #0066cc; border-radius: 4px;">
                <p style="margin: 0;"><strong>📝 Note:</strong> ${content.note}</p>
            </div>
        `;
    }
    
    // Additional notes (array)
    if (content.additionalNotes && Array.isArray(content.additionalNotes)) {
        html += `<div class="additional-notes">`;
        content.additionalNotes.forEach(note => {
            html += `<p class="note"><em>${note}</em></p>`;
        });
        html += `</div>`;
    }
    
    // Additional note (single)
    if (content.additionalNote) {
        html += `<p class="note"><em>${content.additionalNote}</em></p>`;
    }
    
    // Warning
    if (content.warning) {
        html += `
            <div class="info-box warning" style="margin-top: 10px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0;"><strong>⚠️ Warning:</strong> ${content.warning}</p>
            </div>
        `;
    }
    
    // Cross Reference
    if (content.crossReference) {
        html += `<p class="cross-reference" style="font-style: italic; color: #666;"><em>${content.crossReference}</em></p>`;
    }
    
    // Reference
    if (content.reference) {
        if (typeof content.reference === 'string') {
            html += `<p class="reference"><strong>Reference:</strong> ${content.reference}</p>`;
        } else if (typeof content.reference === 'object' && content.reference.text) {
            html += `<p class="reference"><strong>Reference:</strong> ${content.reference.text}</p>`;
        }
    }
    
    // Reference note
    if (content.referenceNote) {
        if (typeof content.referenceNote === 'string') {
            html += `<p class="note"><strong>Reference:</strong> ${content.referenceNote}</p>`;
        } else if (typeof content.referenceNote === 'object' && content.referenceNote.text) {
            html += `<p class="note"><strong>Reference:</strong> ${content.referenceNote.text}</p>`;
        }
    }
    
    return html;
}

export function buildRules(content) {
    let html = '';
    
    // Rules - can be array of strings or array of objects
    if (content.rules && Array.isArray(content.rules) && content.rules.length > 0) {
        // Check if first rule is a string (simple array) or object
        if (typeof content.rules[0] === 'string') {
            // Simple array of strings
            html += `<ul class="rules-list">`;
            content.rules.forEach(rule => {
                html += `<li>${rule}</li>`;
            });
            html += `</ul>`;
        } else {
            // Array of rule objects
            content.rules.forEach(rule => {
                html += `
                    <div class="rule-section">
                        ${rule.letter ? `<h4>${rule.letter})</h4>` : ''}
                        ${rule.title ? `<h4>${rule.title}</h4>` : ''}
                        ${rule.text ? `<p>${rule.text}</p>` : ''}
                        ${rule.note ? `<p class="note"><em>Note: ${rule.note}</em></p>` : ''}
                        ${rule.additionalNote ? `<p class="note"><em>${rule.additionalNote}</em></p>` : ''}
                        ${rule.warningText ? `<p class="warning-text"><strong>Warning:</strong> ${rule.warningText}</p>` : ''}
                        ${rule.warningExample ? `<p class="example-text"><em>${rule.warningExample}</em></p>` : ''}
                `;
                
                // Examples within rule
                if (rule.examples && Array.isArray(rule.examples)) {
                    html += `<ul class="examples-list">`;
                    rule.examples.forEach(ex => {
                        html += `<li>${ex}</li>`;
                    });
                    html += `</ul>`;
                }
                
                // Counter examples
                if (rule.counterExamples && Array.isArray(rule.counterExamples)) {
                    html += `<ul class="counter-examples-list">`;
                    rule.counterExamples.forEach(ex => {
                        html += `<li class="counter-example">${ex}</li>`;
                    });
                    html += `</ul>`;
                }
                
                // Capitalized
                if (rule.capitalized && typeof rule.capitalized === 'string') {
                    html += `<p><strong>Capitalized:</strong> ${rule.capitalized}</p>`;
                }
                
                // Lowercase
                if (rule.lowercase && typeof rule.lowercase === 'string') {
                    html += `<p><strong>Lowercase:</strong> ${rule.lowercase}</p>`;
                }
                
                // Capitalized array
                if (rule.capitalized && Array.isArray(rule.capitalized)) {
                    html += `
                        <div class="capitalized-section">
                            <h5>Capitalized:</h5>
                            <ul>
                                ${rule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                // Lowercase array
                if (rule.lowercase && Array.isArray(rule.lowercase)) {
                    html += `
                        <div class="lowercase-section">
                            <h5>Lowercase:</h5>
                            <ul>
                                ${rule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                // But
                if (rule.but && Array.isArray(rule.but)) {
                    html += `
                        <div class="but-section">
                            <p><strong>But:</strong></p>
                            <ul>
                                ${rule.but.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                }
                
                // Exception
                if (rule.exception && typeof rule.exception === 'string') {
                    html += `<p class="exception"><strong>Exception:</strong> ${rule.exception}</p>`;
                }
                
                // Adjectival use (from old code)
                if (rule.adjectivalUse && typeof rule.adjectivalUse === 'object') {
                    html += `
                        <div class="adjectival-use">
                            <p>${rule.adjectivalUse.text}</p>
                            ${rule.adjectivalUse.examples && Array.isArray(rule.adjectivalUse.examples) ? `
                                <ul>
                                    ${rule.adjectivalUse.examples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            ` : ''}
                        </div>
                    `;
                }
                
                // Title examples
                if (rule.titleExamples && Array.isArray(rule.titleExamples)) {
                    html += `<ul>`;
                    rule.titleExamples.forEach(ex => {
                        html += `<li>${ex}</li>`;
                    });
                    html += `</ul>`;
                }
                
                html += `</div>`;
            });
        }
    }
    
    return html;
}

// Additional handlers that were missing
export function buildMiscContent(content) {
    let html = '';
    
    // Additional notes
    if (content.additionalNotes && Array.isArray(content.additionalNotes)) {
        html += `<ul>`;
        content.additionalNotes.forEach(note => {
            html += `<li>${note}</li>`;
        });
        html += `</ul>`;
    }
    
    // Order of Precedence
    if (content.orderOfPrecedence) {
        html += `
            <div class="info-box">
                <h4>${content.orderOfPrecedence.title || 'Order of Precedence'}</h4>
                <p>${content.orderOfPrecedence.content || ''}</p>
                ${content.orderOfPrecedence.order && Array.isArray(content.orderOfPrecedence.order) ? `
                    <ul>
                        ${content.orderOfPrecedence.order.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Simple arrays
    const simpleArrayFields = [
        'titles', 'ranks', 'degrees', 'provinces', 'monthAbbreviations', 'timeZones',
        'commonUnits', 'commonAbbreviations', 'capitalizationRules', 
        'exceptions', 'criticalRules', 'incorrectAbbreviations'
    ];
    
    simpleArrayFields.forEach(field => {
        if (content[field] && Array.isArray(content[field])) {
            html += `<ul>`;
            content[field].forEach(item => {
                const itemText = typeof item === 'object' ? (item.text || JSON.stringify(item)) : item;
                html += `<li>${itemText}</li>`;
            });
            html += `</ul>`;
        }
    });
    
    // Reference note (complex)
    if (content.referenceNote) {
        if (typeof content.referenceNote === 'string') {
            html += `<p class="note"><strong>Reference:</strong> ${content.referenceNote}</p>`;
        } else if (typeof content.referenceNote === 'object' && content.referenceNote.text) {
            html += `<p class="note"><strong>Reference:</strong> ${content.referenceNote.text}</p>`;
        }
    }
    
    // Special Rule
    if (content.specialRule) {
        html += `
            <div class="key-principle">
                <h4>${content.specialRule.title || 'Special Rule'}</h4>
                <p>${content.specialRule.content || ''}</p>
                ${content.specialRule.examples && Array.isArray(content.specialRule.examples) ? `
                    <ul>
                        ${content.specialRule.examples.map(ex => {
                            const exText = typeof ex === 'object' ? (ex.text || String(ex)) : ex;
                            return `<li>${exText}</li>`;
                        }).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    return html;
}

/**
 * Build dynamic fields (handles ANY field not handled by other builders)
 * This is a catch-all for Chapter 7's unique field names
 * @param {Object} content - Section content
 * @param {number} chapterId - Current chapter ID
 * @returns {string} HTML string
 */
export function buildDynamicFields(content, chapterId = null) {
    let html = '';

    // Skip fields that are handled by other builders
    const skipFields = [
        'text', 'mainText', 'explanation', 'additionalExplanation', 'format', 'note',
        'additionalNotes', 'additionalNote', 'warning', 'reference', 'referenceNote',
        'rules', 'examples', 'additionalExamples', 'quotedExamples', 'intro', 'generalRule',
        'spacingRules', 'categories', 'quotedComparison', // Chapter 7 special - handled by chapter7-builder
        'items', 'boxes', 'keyPrinciple', 'criticalPoints', 'importantPoints',
        'warningBox', 'noteBox', 'summaryBox', 'listItems', 'bulletPoints',
        'comparisonTable', 'tableData', 'orderOfPrecedence', 'specialRule',
        'typographyRules', 'formatRules', 'titles', 'ranks', 'degrees', 'provinces',
        'monthAbbreviations', 'timeZones', 'commonUnits', 'commonAbbreviations',
        'capitalizationRules', 'exceptions', 'criticalRules', 'incorrectAbbreviations',
        'abbreviations', 'specialCases', 'streetAbbreviations', 'compassPoints', 'words'
    ];

    // Chapter 7: Skip ALL fields with specific patterns
    const chapter7Patterns = ['Intro', 'Use', 'Note', 'Examples', 'Example'];
    const chapter7SpecificFields = [
        'basicPrinciple', 'courtesyNote', 'indirectQuestions', 'interrogativeAsImperative',
        'interrogativeExample', 'indirectExample',
        'substitutionUse', 'formUse', 'listUse', 'sideheadUse', 'tableExample',
        'listExample', 'sideheadExample', 'figureNote', 'dmyExample', 'mdyOrder',
        'author', 'source'
    ];

    if (chapterId === 7) {
        // Dynamically skip fields ending with patterns
        Object.keys(content).forEach(key => {
            const endsWithPattern = chapter7Patterns.some(pattern => key.endsWith(pattern));
            if (endsWithPattern || chapter7SpecificFields.includes(key)) {
                skipFields.push(key);
            }
        });
    }

    Object.keys(content).forEach(key => {
        if (skipFields.includes(key)) return;
        
        const value = content[key];
        
        // === STRING VALUES ===
        if (typeof value === 'string' && value.trim()) {
            
            // Check if it's pre-formatted text (contains \n)
            if (value.includes('\n')) {
                // Display as pre-formatted text
                html += `
                    <div class="example-box" style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">
                        <pre style="margin: 0; font-family: 'Courier New', monospace; white-space: pre-wrap;">${value}</pre>
                    </div>
                `;
            }
            // Otherwise treat as regular paragraph
            else {
                html += `<p style="margin: 10px 0;">${value}</p>`;
            }
        }
        
        // === ARRAY VALUES ===
        else if (Array.isArray(value) && value.length > 0) {
            html += `
                <div class="example-box" style="margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">
            `;
            value.forEach(item => {
                if (typeof item === 'string') {
                    html += `<p style="margin: 3px 0; font-style: italic;">${item}</p>`;
                } else if (typeof item === 'object' && item.text) {
                    html += `<p style="margin: 3px 0; font-style: italic;">${item.text}</p>`;
                }
            });
            html += `</div>`;
        }
    });
    
    return html;
}
