// ===================================
// Chapter 3 Content Builder
// Handles structures specific to Chapter 3 (Spelling)
// ===================================

export function buildChapter3Content(content) {
    let html = '';
    
    // British vs American differences
    if (content.britishAmericanDifferences && typeof content.britishAmericanDifferences === 'object') {
        html += `
            <div class="british-american-section">
                <h4>${content.britishAmericanDifferences.title || 'British vs American Spelling Patterns'}</h4>
        `;
        
        if (content.britishAmericanDifferences.patterns && Array.isArray(content.britishAmericanDifferences.patterns)) {
            content.britishAmericanDifferences.patterns.forEach(pattern => {
                html += `
                    <div class="pattern-item">
                        <h5>${pattern.category}</h5>
                        <div class="comparison-table">
                            <div class="british-column">
                                <strong>British:</strong>
                                <ul>
                                    ${pattern.british.map(word => `<li>${word}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="american-column">
                                <strong>American:</strong>
                                <ul>
                                    ${pattern.american.map(word => `<li>${word}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        ${pattern.note ? `<p class="note"><em>${pattern.note}</em></p>` : ''}
                    </div>
                `;
            });
        }
        
        html += `</div>`;
    }
    
    // Recommended spellings
    if (content.recommendedSpellings && typeof content.recommendedSpellings === 'object') {
        html += `
            <div class="recommended-spellings-section">
                <h4>${content.recommendedSpellings.title || 'Recommended Spelling Patterns'}</h4>
                <ul>
        `;
        
        if (content.recommendedSpellings.patterns && Array.isArray(content.recommendedSpellings.patterns)) {
            content.recommendedSpellings.patterns.forEach(pattern => {
                html += `<li>${pattern}</li>`;
            });
        }
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Drawbacks (for spell-checking)
    if (content.drawbacks && typeof content.drawbacks === 'object') {
        html += `
            <div class="drawbacks-section">
                <h4>${content.drawbacks.title || 'Drawbacks'}</h4>
                <ul>
        `;
        
        if (content.drawbacks.points && Array.isArray(content.drawbacks.points)) {
            content.drawbacks.points.forEach(point => {
                html += `<li>${point}</li>`;
            });
        }
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Search and replace example
    if (content.searchReplaceExample && typeof content.searchReplaceExample === 'object') {
        html += `
            <div class="search-replace-example">
                <h4>${content.searchReplaceExample.title || 'Example'}</h4>
                ${content.searchReplaceExample.text ? `<p>${content.searchReplaceExample.text}</p>` : ''}
                ${content.searchReplaceExample.solution ? `<p class="solution"><strong>Solution:</strong> ${content.searchReplaceExample.solution}</p>` : ''}
            </div>
        `;
    }
    
    // Standard spellings (SI/metric)
    if (content.standardSpellings && Array.isArray(content.standardSpellings)) {
        html += `
            <div class="standard-spellings-section">
                <h4>Standard Spellings</h4>
                <ul>
        `;
        
        content.standardSpellings.forEach(spelling => {
            html += `<li>${spelling}</li>`;
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // Prefix rules
    if (content.prefixRules && typeof content.prefixRules === 'object') {
        html += `
            <div class="prefix-rules-section">
                <h4>${content.prefixRules.title || 'Prefix Rules'}</h4>
                ${content.prefixRules.text ? `<p>${content.prefixRules.text}</p>` : ''}
            </div>
        `;
    }
    
    // Handle nested rule structures (specific to Chapter 3)
    const nestedRuleKeys = [
        'rule', 'rule1', 'rule2', 
        'exceptions', 'exceptions2', 'exception',
        'supersede', 'sedeVerb',
        'ceedVerbs', 'cedeVerbs',
        'iseWords', 'izeWords',
        'distinction', 'vowelYRule'
    ];
    
    nestedRuleKeys.forEach(key => {
        if (content[key] && typeof content[key] === 'object') {
            const ruleContent = content[key];
            
            html += `
                <div class="rule-subsection">
                    <h4>${ruleContent.title || ''}</h4>
                    ${ruleContent.text ? `<p>${ruleContent.text}</p>` : ''}
                    ${ruleContent.content ? `<p>${ruleContent.content}</p>` : ''}
            `;
            
            // Handle examples in the rule
            if (ruleContent.examples && Array.isArray(ruleContent.examples)) {
                html += `<ul>`;
                ruleContent.examples.forEach(ex => {
                    let exText = '';
                    if (typeof ex === 'object' && ex !== null) {
                        if (ex.base && ex.derived) {
                            exText = `<strong>${ex.base}</strong> → ${ex.derived}`;
                        } else if (ex.base && ex.suffix) {
                            exText = `<strong>${ex.base}</strong> → ${ex.suffix}`;
                        } else if (ex.base && ex.derivatives) {
                            exText = `<strong>${ex.base}</strong> → ${ex.derivatives}`;
                        } else if (ex.separate && ex.combined) {
                            exText = `${ex.separate} → <strong>${ex.combined}</strong>`;
                        } else if (ex.text) {
                            exText = ex.text;
                        } else if (ex.word) {
                            exText = ex.word;
                        } else {
                            exText = String(ex);
                        }
                    } else {
                        exText = ex;
                    }
                    html += `<li>${exText}</li>`;
                });
                html += `</ul>`;
            }
            
            // Handle words list (for ise/ize words, exceptions, etc.)
            if (ruleContent.words && Array.isArray(ruleContent.words)) {
                html += `<ul class="words-list">`;
                ruleContent.words.forEach(word => {
                    html += `<li>${word}</li>`;
                });
                html += `</ul>`;
            }
            
            html += `</div>`;
        }
    });
    
    return html;
}
