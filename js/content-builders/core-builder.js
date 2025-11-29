// ===================================
// Core Content Builder
// Handles basic content types used across all chapters
// ===================================

export function buildBasicContent(content) {
    let html = '';
    
    // Main text
    if (content.text) {
        html += `<p>${content.text}</p>`;
    }
    
    // Main text (Chapter 4 style)
    if (content.mainText) {
        html += `<p>${content.mainText}</p>`;
    }
    
    // Explanation
    if (content.explanation) {
        html += `<p>${content.explanation}</p>`;
    }
    
    // Format
    if (content.format) {
        html += `<p class="format-note"><strong>Format:</strong> ${content.format}</p>`;
    }
    
    // Note
    if (content.note) {
        html += `<p class="note"><em>Note: ${content.note}</em></p>`;
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
        'exceptions', 'criticalRules', 'incorrectAbbreviations', 'spacingRules'
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
