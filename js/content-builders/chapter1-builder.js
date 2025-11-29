// ===================================
// Chapter 1 Specific Builder
// Handles abbreviation-specific content structures
// ===================================

export function buildChapter1Content(content) {
    let html = '';
    
    // Base Units Table (Section 1.23)
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
    
    // Additional Units Table (Section 1.23)
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
    
    // Symbols Table (Section 1.25)
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
    
    // Abbreviations with detailed info (Section 1.13)
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
    
    // Definitions (Section 1.16 - Acronyms vs Initialisms)
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
