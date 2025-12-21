// ===================================
// Lists Content Builder
// Handles lists, examples, abbreviations, and similar array-based content
// ===================================

export function buildLists(content) {
    let html = '';
    
    // Examples
    if (content.examples && Array.isArray(content.examples)) {
        // CRITICAL CHECK: Skip if examples contain base→derived structure
        // These are handled by chapter3-builder
        const firstExample = content.examples[0];
        if (firstExample && typeof firstExample === 'object' && 
            (firstExample.base || firstExample.root)) {
            // Skip - chapter3-builder handles base→derived examples
            return html;
        }
        
        html += `
            <div class="examples-section">
                <h4>Examples</h4>
                <ul class="examples-list">
        `;
        
        content.examples.forEach(example => {
            if (typeof example === 'object' && example !== null) {
                const exampleText = example.text || '';
                const exampleType = example.type || 'example';
                
                if (exampleType === 'correct' || exampleType === 'incorrect') {
                    // Use example-box for typed examples
                    html += `
                        <li class="example-list-item">
                            <div class="example-box ${exampleType === 'correct' ? 'example-correct' : 'example-incorrect'}">
                                <div class="example-label">${exampleType === 'correct' ? '✓ Correct' : '✗ Incorrect'}</div>
                                <div>${exampleText}</div>
                            </div>
                        </li>
                    `;
                } else {
                    // Regular example object without type
                    html += `<li>${exampleText}</li>`;
                }
            } else {
                // Simple string example
                html += `<li>${example}</li>`;
            }
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Abbreviations (array of strings or objects)
    if (content.abbreviations && Array.isArray(content.abbreviations)) {
        html += `
            <div class="abbreviations-section">
                <h4>Abbreviations</h4>
                <ul class="abbreviations-list">
        `;
        
        content.abbreviations.forEach(abbr => {
            if (typeof abbr === 'object' && abbr !== null) {
                // Object with detailed information
                html += `
                    <li>
                        <strong>${abbr.abbr}</strong>
                        ${abbr.full ? ` (${abbr.full})` : ''}
                        ${abbr.meaning ? ` - ${abbr.meaning}` : ''}
                        ${abbr.usage ? `<br><em>${abbr.usage}</em>` : ''}
                    </li>
                `;
            } else {
                // Simple string
                html += `<li>${abbr}</li>`;
            }
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Special cases (for plurals, etc.)
    if (content.specialCases && Array.isArray(content.specialCases)) {
        html += `
            <div class="special-cases-section">
                <h4>Special Cases</h4>
                <ul class="special-cases-list">
        `;
        
        content.specialCases.forEach(specialCase => {
            if (typeof specialCase === 'object' && specialCase !== null) {
                html += `
                    <li>
                        <strong>${specialCase.singular}</strong> → ${specialCase.plural}
                    </li>
                `;
            } else {
                html += `<li>${specialCase}</li>`;
            }
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Provinces (for geographical names)
    if (content.provinces && Array.isArray(content.provinces)) {
        html += `
            <div class="provinces-section">
                <h4>Provinces and Territories</h4>
                <ul class="provinces-list">
        `;
        
        content.provinces.forEach(province => {
            html += `<li>${province}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Street abbreviations
    if (content.streetAbbreviations && Array.isArray(content.streetAbbreviations)) {
        html += `
            <div class="street-abbreviations-section">
                <h4>Street Designations</h4>
                <ul class="abbreviations-list">
        `;
        
        content.streetAbbreviations.forEach(abbr => {
            html += `<li>${abbr}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Compass points
    if (content.compassPoints && Array.isArray(content.compassPoints)) {
        html += `
            <div class="compass-points-section">
                <h4>Compass Points</h4>
                <ul class="abbreviations-list">
        `;
        
        content.compassPoints.forEach(point => {
            html += `<li>${point}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Words (simple list - used in Chapter 3)
    if (content.words && Array.isArray(content.words)) {
        html += `
            <div class="words-section">
                <ul class="words-list">
        `;
        
        // Display in columns for better readability
        content.words.forEach(word => {
            html += `<li>${word}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    return html;
}
