// ===================================
// Chapter 4 Content Builder - UPDATED
// Now includes handlers for sections 31-38
// ===================================

export function buildChapter4Content(content) {
    let html = '';
    
    // ==========================================
    // EXISTING HANDLERS (from original builder)
    // ==========================================
    
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
        
        if (content.mainRule.salutations && Array.isArray(content.mainRule.salutations)) {
            html += `
                <div class="salutations-section">
                    <h5>Salutations:</h5>
                    <ul>
                        ${content.mainRule.salutations.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.mainRule.closes && Array.isArray(content.mainRule.closes)) {
            html += `
                <div class="closes-section">
                    <h5>Complimentary closes:</h5>
                    <ul>
                        ${content.mainRule.closes.map(c => `<li>${c}</li>`).join('')}
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
            
            if (mainRule.examples && Array.isArray(mainRule.examples)) {
                html += `
                    <ul>
                        ${mainRule.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                `;
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
            html += `<ul>`;
            content.remoteAssociation.examples.forEach(ex => {
                html += `<li>${ex}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // Verbs (4.04 style)
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
        
        if (content.abstractions.examples && Array.isArray(content.abstractions.examples)) {
            html += `
                <ul>
                    ${content.abstractions.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Chemical Elements (4.25)
    if (content.chemicalElements && typeof content.chemicalElements === 'object') {
        html += `
            <div class="chemical-elements-section">
                <h4>${content.chemicalElements.title || 'Chemical Elements'}</h4>
                ${content.chemicalElements.text ? `<p>${content.chemicalElements.text}</p>` : ''}
        `;
        
        if (content.chemicalElements.examples && Array.isArray(content.chemicalElements.examples)) {
            html += `<ul>`;
            content.chemicalElements.examples.forEach(ex => {
                html += `<li>${ex}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // Drug Names (4.25)
    if (content.drugNames && typeof content.drugNames === 'object') {
        html += `
            <div class="drug-names-section">
                <h4>${content.drugNames.title || 'Drug Names'}</h4>
                ${content.drugNames.text ? `<p>${content.drugNames.text}</p>` : ''}
        `;
        
        if (content.drugNames.examples && Array.isArray(content.drugNames.examples)) {
            html += `<ul>`;
            content.drugNames.examples.forEach(ex => {
                html += `<li>${ex}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // Trade Names (4.27)
    if (content.tradeNames && typeof content.tradeNames === 'object') {
        html += `
            <div class="trade-names-section">
                <h4>${content.tradeNames.title || 'Trade Names'}</h4>
                ${content.tradeNames.text ? `<p>${content.tradeNames.text}</p>` : ''}
        `;
        
        if (content.tradeNames.examples && Array.isArray(content.tradeNames.examples)) {
            html += `<ul>`;
            content.tradeNames.examples.forEach(ex => {
                html += `<li>${ex}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // ==========================================
    // NEW HANDLERS FOR SECTIONS 31-38
    // ==========================================
    
    // 4.31 - Margin Headings
    if (content.marginHeadings && typeof content.marginHeadings === 'object') {
        html += `
            <div class="margin-headings-section">
                <h4>Margin Headings</h4>
                ${content.marginHeadings.text ? `<p>${content.marginHeadings.text}</p>` : ''}
            </div>
        `;
    }
    
    // 4.31 - Centred Headings
    if (content.centredHeadings && typeof content.centredHeadings === 'object') {
        html += `
            <div class="centred-headings-section">
                <h4>Centred Headings</h4>
                ${content.centredHeadings.text ? `<p>${content.centredHeadings.text}</p>` : ''}
            </div>
        `;
    }
    
    // 4.32 - Idiomatic Expressions
    if (content.idiomaticExpressions && typeof content.idiomaticExpressions === 'object') {
        html += `
            <div class="idiomatic-expressions-section">
                ${content.idiomaticExpressions.text ? `<p>${content.idiomaticExpressions.text}</p>` : ''}
        `;
        
        if (content.idiomaticExpressions.examples && Array.isArray(content.idiomaticExpressions.examples)) {
            html += `
                <ul>
                    ${content.idiomaticExpressions.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // 4.33 - Introduction (for Lists section)
    if (content.introduction && typeof content.introduction === 'object') {
        html += `
            <div class="introduction-section">
                ${content.introduction.text ? `<p>${content.introduction.text}</p>` : ''}
            </div>
        `;
    }
    
    // 4.33 - Syntactically Related
    if (content.syntacticallyRelated && typeof content.syntacticallyRelated === 'object') {
        html += `
            <div class="syntactically-related-section">
                ${content.syntacticallyRelated.text ? `<p>${content.syntacticallyRelated.text}</p>` : ''}
        `;
        
        if (content.syntacticallyRelated.rules && Array.isArray(content.syntacticallyRelated.rules)) {
            html += `<ul>`;
            content.syntacticallyRelated.rules.forEach(rule => {
                html += `<li>${rule}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // 4.33 - Capitalized Lists
    if (content.capitalizedLists && typeof content.capitalizedLists === 'object') {
        html += `
            <div class="capitalized-lists-section">
                ${content.capitalizedLists.text ? `<p>${content.capitalizedLists.text}</p>` : ''}
        `;
        
        if (content.capitalizedLists.conditions && Array.isArray(content.capitalizedLists.conditions)) {
            html += `<ul>`;
            content.capitalizedLists.conditions.forEach(condition => {
                html += `<li>${condition}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // 4.33 - Lowercase Items
    if (content.lowercaseItems && typeof content.lowercaseItems === 'object') {
        html += `
            <div class="lowercase-items-section">
                ${content.lowercaseItems.text ? `<p>${content.lowercaseItems.text}</p>` : ''}
        `;
        
        if (content.lowercaseItems.example && typeof content.lowercaseItems.example === 'object') {
            const example = content.lowercaseItems.example;
            
            if (example.leadIn) {
                html += `<p class="lead-in">${example.leadIn}</p>`;
            }
            
            if (example.items && Array.isArray(example.items)) {
                html += `<ul>`;
                example.items.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += `</ul>`;
            }
            
            if (example.note) {
                html += `<p class="note"><em>Note: ${example.note}</em></p>`;
            }
        }
        
        html += `</div>`;
    }
    
    // 4.36 - Proper Nouns
    if (content.properNouns && typeof content.properNouns === 'object') {
        html += `
            <div class="proper-nouns-section">
                ${content.properNouns.text ? `<p>${content.properNouns.text}</p>` : ''}
        `;
        
        if (content.properNouns.examples && Array.isArray(content.properNouns.examples)) {
            html += `
                <ul>
                    ${content.properNouns.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // 4.36 - Prefixes and Suffixes
    if (content.prefixesAndSuffixes && typeof content.prefixesAndSuffixes === 'object') {
        html += `
            <div class="prefixes-suffixes-section">
                ${content.prefixesAndSuffixes.text ? `<p>${content.prefixesAndSuffixes.text}</p>` : ''}
        `;
        
        if (content.prefixesAndSuffixes.examples && Array.isArray(content.prefixesAndSuffixes.examples)) {
            html += `
                <ul>
                    ${content.prefixesAndSuffixes.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // 4.36 - Modifying Elements
    if (content.modifyingElements && typeof content.modifyingElements === 'object') {
        html += `
            <div class="modifying-elements-section">
                ${content.modifyingElements.text ? `<p>${content.modifyingElements.text}</p>` : ''}
        `;
        
        if (content.modifyingElements.examples && Array.isArray(content.modifyingElements.examples)) {
            html += `
                <ul>
                    ${content.modifyingElements.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // 4.37 - Part of Corporate Name
    if (content.partOfCorporateName && typeof content.partOfCorporateName === 'object') {
        html += `
            <div class="corporate-name-section">
                ${content.partOfCorporateName.text ? `<p>${content.partOfCorporateName.text}</p>` : ''}
        `;
        
        if (content.partOfCorporateName.examples && Array.isArray(content.partOfCorporateName.examples)) {
            html += `
                <ul>
                    ${content.partOfCorporateName.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // 4.37 - Adjectival Use
    if (content.adjectivalUse && typeof content.adjectivalUse === 'object') {
        html += `
            <div class="adjectival-use-section">
                ${content.adjectivalUse.text ? `<p>${content.adjectivalUse.text}</p>` : ''}
        `;
        
        if (content.adjectivalUse.examples && Array.isArray(content.adjectivalUse.examples)) {
            html += `
                <ul>
                    ${content.adjectivalUse.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // 4.37 - French Article
    if (content.frenchArticle && typeof content.frenchArticle === 'object') {
        html += `
            <div class="french-article-section">
                ${content.frenchArticle.text ? `<p>${content.frenchArticle.text}</p>` : ''}
        `;
        
        if (content.frenchArticle.withFrenchArticle && Array.isArray(content.frenchArticle.withFrenchArticle)) {
            html += `
                <div class="with-french-article">
                    <h5>With French article:</h5>
                    <ul>
                        ${content.frenchArticle.withFrenchArticle.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (content.frenchArticle.withEnglishArticle && Array.isArray(content.frenchArticle.withEnglishArticle)) {
            html += `
                <div class="with-english-article">
                    <h5>With English article:</h5>
                    <ul>
                        ${content.frenchArticle.withEnglishArticle.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        html += `</div>`;
    }
    
    // Prepositions as Other Parts (4.29 - special box with red border)
    if (content.prepositionsAsOtherParts && typeof content.prepositionsAsOtherParts === 'object') {
        html += `
            <div class="prepositions-section" style="border-left: 4px solid #dc3545; padding-left: 1rem; margin: 1.5rem 0; background-color: #fff5f5;">
                ${content.prepositionsAsOtherParts.text ? `<p>${content.prepositionsAsOtherParts.text}</p>` : ''}
        `;
        
        if (content.prepositionsAsOtherParts.examples && Array.isArray(content.prepositionsAsOtherParts.examples)) {
            html += `
                <ul>
                    ${content.prepositionsAsOtherParts.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Short Titles (4.29 - special box with red border)
    if (content.shortTitles && typeof content.shortTitles === 'object') {
        html += `
            <div class="short-titles-section" style="border-left: 4px solid #dc3545; padding-left: 1rem; margin: 1.5rem 0; background-color: #fff5f5;">
                ${content.shortTitles.title ? `<h4>${content.shortTitles.title}</h4>` : ''}
                ${content.shortTitles.text ? `<p>${content.shortTitles.text}</p>` : ''}
        `;
        
        if (content.shortTitles.examples && Array.isArray(content.shortTitles.examples)) {
            html += `
                <ul>
                    ${content.shortTitles.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Ancient Manuscripts (4.29 - special box with red border)
    if (content.ancientManuscripts && typeof content.ancientManuscripts === 'object') {
        html += `
            <div class="ancient-manuscripts-section" style="border-left: 4px solid #dc3545; padding-left: 1rem; margin: 1.5rem 0; background-color: #fff5f5;">
                ${content.ancientManuscripts.title ? `<h4>${content.ancientManuscripts.title}</h4>` : ''}
                ${content.ancientManuscripts.text ? `<p>${content.ancientManuscripts.text}</p>` : ''}
        `;
        
        if (content.ancientManuscripts.examples && Array.isArray(content.ancientManuscripts.examples)) {
            html += `
                <ul>
                    ${content.ancientManuscripts.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Hyphenated Compounds (4.29 - special box with red border)
    if (content.hyphenatedCompounds && typeof content.hyphenatedCompounds === 'object') {
        html += `
            <div class="hyphenated-compounds-section" style="border-left: 4px solid #dc3545; padding-left: 1rem; margin: 1.5rem 0; background-color: #fff5f5;">
                ${content.hyphenatedCompounds.title ? `<h4>${content.hyphenatedCompounds.title}</h4>` : ''}
                ${content.hyphenatedCompounds.text ? `<p>${content.hyphenatedCompounds.text}</p>` : ''}
        `;
        
        if (content.hyphenatedCompounds.examples && Array.isArray(content.hyphenatedCompounds.examples)) {
            html += `
                <ul>
                    ${content.hyphenatedCompounds.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            `;
        }
        
        html += `</div>`;
    }
    
    // Reference (general - can appear in multiple sections)
    if (content.reference && typeof content.reference === 'object') {
        html += `
            <div class="reference-section">
                <p class="reference"><em>${content.reference.text}</em></p>
            </div>
        `;
    }
    
    return html;
}
