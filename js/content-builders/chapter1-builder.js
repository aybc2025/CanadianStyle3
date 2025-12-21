// ===================================
// Chapter 1 Specific Builder - COMPLETE VERSION
// Handles ALL abbreviation-specific content structures
// ===================================

export function buildChapter1Content(content) {
    let html = '';
    
    // === 1.17: Number Symbol (No. or Nos.) ===
    if (content.numberSymbol && typeof content.numberSymbol === 'object') {
        html += `
            <div class="number-symbol-section">
                <h4>${content.numberSymbol.symbol}</h4>
                <p>${content.numberSymbol.usage}</p>
        `;
        
        if (content.numberSymbol.examples && Array.isArray(content.numberSymbol.examples)) {
            content.numberSymbol.examples.forEach(ex => {
                const className = ex.type === 'correct' ? 'example-correct' : 'example-incorrect';
                const icon = ex.type === 'correct' ? '✓' : '✗';
                html += `
                    <div class="${className}">
                        <span class="example-icon">${icon} ${ex.type.toUpperCase()}</span>
                        <code>${ex.text}</code>
                    </div>
                `;
            });
        }
        
        html += `</div>`;
    }
    
    // === 1.17: Percent Symbol (%) ===
    if (content.percentSymbol && typeof content.percentSymbol === 'object') {
        html += `
            <div class="percent-symbol-section">
                <h4>${content.percentSymbol.symbol}</h4>
                <p>${content.percentSymbol.usage}</p>
        `;
        
        if (content.percentSymbol.examples && Array.isArray(content.percentSymbol.examples)) {
            content.percentSymbol.examples.forEach(ex => {
                html += `
                    <div class="example-correct">
                        <span class="example-icon">✓ CORRECT</span>
                        <code>${ex.text}</code>
                    </div>
                `;
            });
        }
        
        html += `</div>`;
    }
    
    // === 1.19: Currency Symbols ===
    if (content.currencySymbols && Array.isArray(content.currencySymbols)) {
        html += `
            <div class="currency-symbols-section">
                <ul class="styled-list">
        `;
        
        content.currencySymbols.forEach(symbol => {
            html += `<li>${symbol}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // === 1.21: Time of Day ===
    if (content.timeOfDay && typeof content.timeOfDay === 'object') {
        html += `
            <div class="time-of-day-section">
                <h4>${content.timeOfDay.title || 'Time of Day'}</h4>
        `;
        
        if (content.timeOfDay.formats && Array.isArray(content.timeOfDay.formats)) {
            html += `<ul class="styled-list">`;
            content.timeOfDay.formats.forEach(format => {
                html += `<li>${format}</li>`;
            });
            html += `</ul>`;
        }
        
        if (content.timeOfDay.note) {
            html += `<p class="note-text"><em>${content.timeOfDay.note}</em></p>`;
        }
        
        html += `</div>`;
    }
    
    // === 1.21: Elapsed Time ===
    if (content.elapsedTime && typeof content.elapsedTime === 'object') {
        html += `
            <div class="elapsed-time-section">
                <h4>${content.elapsedTime.title || 'Elapsed Time'}</h4>
                <p><strong>Format:</strong> ${content.elapsedTime.format}</p>
        `;
        
        if (content.elapsedTime.examples && Array.isArray(content.elapsedTime.examples)) {
            html += `<ul class="styled-list">`;
            content.elapsedTime.examples.forEach(example => {
                html += `<li><code>${example}</code></li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // === 1.23: Base Units Table ===
    if (content.baseUnits && Array.isArray(content.baseUnits)) {
        html += `
            <div class="base-units-section">
                <h4>Base SI Units</h4>
                <table class="units-table">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.baseUnits.forEach(unit => {
            html += `
                <tr>
                    <td>${unit.quantity || ''}</td>
                    <td>${unit.unit || ''}</td>
                    <td class="symbol-cell"><strong>${unit.symbol || ''}</strong></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // === 1.23: Additional Units Table ===
    if (content.additionalUnits && Array.isArray(content.additionalUnits)) {
        html += `
            <div class="additional-units-section">
                <h4>Additional Accepted Units</h4>
                <table class="units-table">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.additionalUnits.forEach(unit => {
            html += `
                <tr>
                    <td>${unit.quantity || ''}</td>
                    <td>${unit.unit || ''}</td>
                    <td class="symbol-cell"><strong>${unit.symbol || ''}</strong></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // === 1.25: Symbols Table ===
    if (content.symbols && Array.isArray(content.symbols)) {
        html += `
            <div class="symbols-table-section">
                <h4>Common Symbols</h4>
                <table class="symbols-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Meaning</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.symbols.forEach(symbolObj => {
            html += `
                <tr>
                    <td class="symbol-cell"><strong>${symbolObj.symbol || ''}</strong></td>
                    <td>${symbolObj.meaning || ''}</td>
                    <td><code>${symbolObj.example || ''}</code></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // === 1.25: Spacing Rules ===
    if (content.spacingRules && Array.isArray(content.spacingRules)) {
        html += `
            <div class="spacing-rules-section">
                <h4>Spacing Rules</h4>
                <ul class="styled-list">
        `;
        
        content.spacingRules.forEach(rule => {
            html += `<li>${rule}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // === 1.13: Abbreviations with detailed info (Latin expressions) ===
    if (content.abbreviations && Array.isArray(content.abbreviations)) {
        // Check if these are complex abbreviation objects
        const firstAbbr = content.abbreviations[0];
        if (typeof firstAbbr === 'object' && firstAbbr.abbr) {
            html += `
                <div class="detailed-abbreviations-section">
                    <h4>Latin Expressions</h4>
                    <table class="abbreviations-table">
                        <thead>
                            <tr>
                                <th>Abbreviation</th>
                                <th>Full Form</th>
                                <th>Meaning</th>
                                <th>Usage</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            content.abbreviations.forEach(abbr => {
                html += `
                    <tr>
                        <td><strong>${abbr.abbr || ''}</strong></td>
                        <td><em>${abbr.full || ''}</em></td>
                        <td>${abbr.meaning || ''}</td>
                        <td>${abbr.usage || ''}</td>
                    </tr>
                `;
            });
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        }
    }
    
    // === 1.16: Definitions (Acronyms vs Initialisms) ===
    if (content.definitions && Array.isArray(content.definitions)) {
        html += `
            <div class="definitions-section">
                <h4>Definitions</h4>
        `;
        
        content.definitions.forEach(def => {
            html += `
                <div class="definition-item">
                    <h5>${def.term || ''}</h5>
                    <p>${def.definition || ''}</p>
                </div>
            `;
        });
        
        html += `</div>`;
    }
    
    return html;
}
