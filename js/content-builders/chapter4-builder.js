// ===================================
// Chapter 4 Content Builder
// Handles structures specific to Chapter 4 (Capitalization)
// ===================================

export function buildChapter4Content(content) {
    let html = '';
    
    // Main Rule (single object with text and examples)
    if (content.mainRule && typeof content.mainRule === 'object') {
        html += `
            <div class="main-rule-section">
                ${content.mainRule.text ? `<p>${content.mainRule.text}</p>` : ''}
                ${content.mainRule.explanation ? `<p class="explanation">${content.mainRule.explanation}</p>` : ''}
        `;
        
        if (content.mainRule.examples && Array.isArray(content.mainRule.examples)) {
            html += `
                <div class="examples-section">
                    <h4>Examples</h4>
                    <ul>
                        ${content.mainRule.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.mainRule.capitalized && Array.isArray(content.mainRule.capitalized)) {
            html += `
                <div class="capitalized-section">
                    <h4>Capitalized:</h4>
                    <ul>
                        ${content.mainRule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.mainRule.lowercase && Array.isArray(content.mainRule.lowercase)) {
            html += `
                <div class="lowercase-section">
                    <h4>Lowercase:</h4>
                    <ul>
                        ${content.mainRule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    // Main Rules (array of rule objects - used in 4.07)
    if (content.mainRules && Array.isArray(content.mainRules)) {
        content.mainRules.forEach(mainRule => {
            html += `
                <div class="main-rule-section">
                    ${mainRule.title ? `<h4>${mainRule.title}</h4>` : ''}
                    ${mainRule.text ? `<p>${mainRule.text}</p>` : ''}
            `;
            
            if (mainRule.capitalized && Array.isArray(mainRule.capitalized)) {
                html += `
                    <div class="capitalized-section">
                        <h4>Capitalized:</h4>
                        <ul>
                            ${mainRule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            if (mainRule.lowercase && Array.isArray(mainRule.lowercase)) {
                html += `
                    <div class="lowercase-section">
                        <h4>Lowercase:</h4>
                        <ul>
                            ${mainRule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }
            
            if (mainRule.capitalized && typeof mainRule.capitalized === 'string') {
                html += `<p><strong>Capitalized:</strong> ${mainRule.capitalized}</p>`;
            }
            
            if (mainRule.lowercase && typeof mainRule.lowercase === 'string') {
                html += `<p><strong>Lowercase:</strong> ${mainRule.lowercase}</p>`;
            }
            
            html += `</div>`;
        });
    }
    
    // Remote Association (4.04 style)
    if (content.remoteAssociation && typeof content.remoteAssociation === 'object') {
        html += `
            <div class="remote-association-section">
                ${content.remoteAssociation.title ? `<h4>${content.remoteAssociation.title}</h4>` : ''}
                ${content.remoteAssociation.text ? `<p>${content.remoteAssociation.text}</p>` : ''}
        `;
        
        if (content.remoteAssociation.examples && Array.isArray(content.remoteAssociation.examples)) {
            html += `
                <ul>
                    ${content.remoteAssociation.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Verbs (4.04 style - object with capitalized and lowercase arrays)
    if (content.verbs && typeof content.verbs === 'object') {
        html += `
            <div class="verbs-section">
                ${content.verbs.title ? `<h4>${content.verbs.title}</h4>` : ''}
                ${content.verbs.text ? `<p>${content.verbs.text}</p>` : ''}
        `;
        
        if (content.verbs.capitalized && Array.isArray(content.verbs.capitalized)) {
            html += `
                <div class="capitalized-verbs">
                    <h5>Capitalized:</h5>
                    <ul>
                        ${content.verbs.capitalized.map(verb => `<li>${verb}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.verbs.lowercase && Array.isArray(content.verbs.lowercase)) {
            html += `
                <div class="lowercase-verbs">
                    <h5>Lowercase:</h5>
                    <ul>
                        ${content.verbs.lowercase.map(verb => `<li>${verb}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    // Personifications (4.09 style)
    if (content.personifications && typeof content.personifications === 'object') {
        html += `
            <div class="personifications-section">
                ${content.personifications.title ? `<h4>${content.personifications.title}</h4>` : ''}
                ${content.personifications.text ? `<p>${content.personifications.text}</p>` : ''}
        `;
        
        if (content.personifications.examples && Array.isArray(content.personifications.examples)) {
            html += `
                <ul>
                    ${content.personifications.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Abstractions (4.09 style)
    if (content.abstractions && typeof content.abstractions === 'object') {
        html += `
            <div class="abstractions-section">
                ${content.abstractions.title ? `<h4>${content.abstractions.title}</h4>` : ''}
                ${content.abstractions.text ? `<p>${content.abstractions.text}</p>` : ''}
        `;
        
        if (content.abstractions.capitalized && Array.isArray(content.abstractions.capitalized)) {
            html += `
                <div class="capitalized-abstractions">
                    <h5>Capitalized examples:</h5>
                    <ul>
                        ${content.abstractions.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    // Chemical Elements (4.25a)
    if (content.chemicalElements && typeof content.chemicalElements === 'object') {
        html += buildChapter4SubSection(content.chemicalElements, 'Chemical elements and compounds');
    }
    
    // Chemical Symbols (4.25b)
    if (content.chemicalSymbols && typeof content.chemicalSymbols === 'object') {
        html += buildChapter4SubSection(content.chemicalSymbols, 'Chemical symbols');
    }
    
    // Medical Conditions (4.25c)
    if (content.medicalConditions && typeof content.medicalConditions === 'object') {
        html += buildChapter4SubSection(content.medicalConditions, 'Medical conditions');
    }
    
    // Infectious Organisms (4.25d)
    if (content.infectiousOrganisms && typeof content.infectiousOrganisms === 'object') {
        html += buildChapter4SubSection(content.infectiousOrganisms, 'Infectious organisms');
    }
    
    // Drug Names (4.25e)
    if (content.drugNames && typeof content.drugNames === 'object') {
        html += buildChapter4SubSection(content.drugNames, 'Generic drug names');
    }
    
    // Trade Names (4.27a)
    if (content.tradeNames && typeof content.tradeNames === 'object') {
        html += buildChapter4SubSection(content.tradeNames, 'Trade names');
    }
    
    // High Tech Products (4.27c)
    if (content.highTechProducts && typeof content.highTechProducts === 'object') {
        html += buildChapter4SubSection(content.highTechProducts, 'High-technology products');
    }
    
    // Generic Usage (4.27d)
    if (content.genericUsage && typeof content.genericUsage === 'object') {
        html += `
            <div class="generic-usage-section">
                <h4>${content.genericUsage.title || 'Generic usage'}</h4>
                ${content.genericUsage.text ? `<p>${content.genericUsage.text}</p>` : ''}
            </div>
        `;
    }
    
    // Generic Use (4.22)
    if (content.genericUse && typeof content.genericUse === 'object') {
        html += buildChapter4SubSection(content.genericUse, 'Generic use');
    }
    
    // Generic Parts (4.23)
    if (content.genericParts && typeof content.genericParts === 'object') {
        html += buildChapter4SubSection(content.genericParts, 'Generic parts');
    }
    
    // Proper Nouns in Common Names (4.24)
    if (content.properNounsInCommonNames && typeof content.properNounsInCommonNames === 'object') {
        html += `
            <div class="proper-nouns-section">
                ${content.properNounsInCommonNames.text ? `<p>${content.properNounsInCommonNames.text}</p>` : ''}
        `;
        
        if (content.properNounsInCommonNames.capitalized && Array.isArray(content.properNounsInCommonNames.capitalized)) {
            html += `
                <div class="capitalized-examples">
                    <h4>Capitalized:</h4>
                    <ul>
                        ${content.properNounsInCommonNames.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.properNounsInCommonNames.lowercase && Array.isArray(content.properNounsInCommonNames.lowercase)) {
            html += `
                <div class="lowercase-examples">
                    <h4>Lowercase:</h4>
                    <ul>
                        ${content.properNounsInCommonNames.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    // Special Case (4.26 - Eponyms)
    if (content.specialCase && typeof content.specialCase === 'object') {
        html += `
            <div class="special-case-section">
                ${content.specialCase.text ? `<p>${content.specialCase.text}</p>` : ''}
        `;
        
        if (content.specialCase.capitalized && Array.isArray(content.specialCase.capitalized)) {
            html += `
                <div class="capitalized-examples">
                    <h4>Capitalized:</h4>
                    <ul>
                        ${content.specialCase.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.specialCase.lowercase && Array.isArray(content.specialCase.lowercase)) {
            html += `
                <div class="lowercase-examples">
                    <h4>Lowercase:</h4>
                    <ul>
                        ${content.specialCase.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    return html;
}

// Helper function to build standard subsections
function buildChapter4SubSection(sectionContent, defaultTitle) {
    let html = `
        <div class="chapter4-subsection">
            <h4>${sectionContent.title || defaultTitle}</h4>
            ${sectionContent.text ? `<p>${sectionContent.text}</p>` : ''}
    `;
    
    if (sectionContent.examples && Array.isArray(sectionContent.examples)) {
        html += `
            <ul>
                ${sectionContent.examples.map(ex => `<li>${ex}</li>`).join('')}
            </ul>
        `;
    }
    
    if (sectionContent.capitalized && Array.isArray(sectionContent.capitalized)) {
        html += `
            <div class="capitalized-examples">
                <h5>Capitalized:</h5>
                <ul>
                    ${sectionContent.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    if (sectionContent.lowercase && Array.isArray(sectionContent.lowercase)) {
        html += `
            <div class="lowercase-examples">
                <h5>Lowercase:</h5>
                <ul>
                    ${sectionContent.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    html += `</div>`;
    
    return html;
}
