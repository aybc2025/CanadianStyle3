// ===================================
// Chapter 3 Content Builder - COMPLETE
// Handles ALL structures specific to Chapter 3 (Spelling)
// ===================================

export function buildChapter3Content(content) {
    let html = '';
    
    // === 3.05: Homonyms and Similar-Sounding Words (CRITICAL!) ===
    if (content.homonyms && Array.isArray(content.homonyms)) {
        html += `
            <div class="homonyms-section">
                <table class="homonyms-table">
                    <thead>
                        <tr>
                            <th>Word 1</th>
                            <th>Meaning</th>
                            <th>Word 2</th>
                            <th>Meaning</th>
                            <th>Word 3</th>
                            <th>Meaning</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.homonyms.forEach(item => {
            html += `
                <tr>
                    <td><strong>${item.word1 || ''}</strong></td>
                    <td>${item.meaning1 || ''}</td>
                    <td><strong>${item.word2 || ''}</strong></td>
                    <td>${item.meaning2 || ''}</td>
                    <td>${item.word3 ? `<strong>${item.word3}</strong>` : ''}</td>
                    <td>${item.meaning3 || ''}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // === 3.07: Supersede (sede ending) ===
    if (content.supersede && typeof content.supersede === 'object') {
        html += `
            <div class="verb-ending-section">
                <h4>${content.supersede.title || 'Sede Ending'}</h4>
                <p>${content.supersede.content || ''}</p>
            </div>
        `;
    }
    
    // === 3.07: Ceed Verbs ===
    if (content.ceedVerbs && typeof content.ceedVerbs === 'object') {
        html += `
            <div class="verb-ending-section">
                <h4>${content.ceedVerbs.title || 'Ceed Ending'}</h4>
                <p>${content.ceedVerbs.content || ''}</p>
        `;
        
        if (content.ceedVerbs.verbs && Array.isArray(content.ceedVerbs.verbs)) {
            html += `<ul class="styled-list">`;
            content.ceedVerbs.verbs.forEach(verb => {
                html += `<li>${verb}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // === 3.07: Cede Verbs ===
    if (content.cedeVerbs && typeof content.cedeVerbs === 'object') {
        html += `
            <div class="verb-ending-section">
                <h4>${content.cedeVerbs.title || 'Cede Ending'}</h4>
                <p>${content.cedeVerbs.content || ''}</p>
        `;
        
        if (content.cedeVerbs.verbs && Array.isArray(content.cedeVerbs.verbs)) {
            html += `<ul class="styled-list">`;
            content.cedeVerbs.verbs.forEach(verb => {
                html += `<li>${verb}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // === 3.08, 3.10, 3.13, 3.14: Examples with base→derived ===
    // This handles regular 'examples' arrays that have base/derived structure
    if (content.examples && Array.isArray(content.examples)) {
        // Check if first example has base/derived structure
        const firstEx = content.examples[0];
        if (typeof firstEx === 'object' && (firstEx.base || firstEx.root)) {
            html += `
                <div class="derived-examples-section">
                    <h4>Examples</h4>
                    <ul class="styled-list">
            `;
            
            content.examples.forEach(ex => {
                if (ex.base && ex.derived) {
                    html += `<li><strong>${ex.base}</strong> → ${ex.derived}</li>`;
                } else if (ex.root && ex.derived) {
                    html += `<li><strong>${ex.root}</strong> → ${ex.derived}</li>`;
                } else {
                    html += `<li>${JSON.stringify(ex)}</li>`;
                }
            });
            
            html += `
                    </ul>
                </div>
            `;
        }
    }
    
    // === 3.16: ise/ize words ===
    if (content.iseWords && typeof content.iseWords === 'object') {
        html += `
            <div class="ise-words-section">
                <h4>${content.iseWords.title || 'Words Ending in -ise'}</h4>
        `;
        
        if (content.iseWords.words && Array.isArray(content.iseWords.words)) {
            html += `<ul class="styled-list">`;
            content.iseWords.words.forEach(word => {
                html += `<li>${word}</li>`;
            });
            html += `</ul>`;
        }
        
        if (content.iseWords.note) {
            html += `<p class="note-text"><em>Note: ${content.iseWords.note}</em></p>`;
        }
        
        html += `</div>`;
    }
    
    if (content.izeWords && typeof content.izeWords === 'object') {
        html += `
            <div class="ize-words-section">
                <h4>${content.izeWords.title || 'Words Ending in -ize'}</h4>
        `;
        
        if (content.izeWords.words && Array.isArray(content.izeWords.words)) {
            html += `<ul class="styled-list">`;
            content.izeWords.words.forEach(word => {
                html += `<li>${word}</li>`;
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    // === 3.17: Plural Forms Table ===
    if (content.pluralForms && Array.isArray(content.pluralForms)) {
        html += `
            <div class="plural-forms-section">
                <h4>Plural Forms</h4>
                <table class="plural-table">
                    <thead>
                        <tr>
                            <th>Singular</th>
                            <th>Plural</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.pluralForms.forEach(form => {
            html += `
                <tr>
                    <td><strong>${form.singular || ''}</strong></td>
                    <td>${form.plural || ''}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // === British vs American differences ===
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
    
    // === Recommended spellings ===
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
    
    // === Drawbacks (for spell-checking) ===
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
    
    // === Search and replace example ===
    if (content.searchReplaceExample && typeof content.searchReplaceExample === 'object') {
        html += `
            <div class="search-replace-example">
                <h4>${content.searchReplaceExample.title || 'Example'}</h4>
                ${content.searchReplaceExample.text ? `<p>${content.searchReplaceExample.text}</p>` : ''}
                ${content.searchReplaceExample.solution ? `<p class="solution"><strong>Solution:</strong> ${content.searchReplaceExample.solution}</p>` : ''}
            </div>
        `;
    }
    
    // === Standard spellings (SI/metric) ===
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
    
    // === Prefix rules ===
    if (content.prefixRules && typeof content.prefixRules === 'object') {
        html += `
            <div class="prefix-rules-section">
                <h4>${content.prefixRules.title || 'Prefix Rules'}</h4>
                ${content.prefixRules.text ? `<p>${content.prefixRules.text}</p>` : ''}
            </div>
        `;
    }
    
    // === Handle nested rule structures (specific to Chapter 3) ===
    const nestedRuleKeys = [
        'rule', 'rule1', 'rule2', 
        'exceptions', 'exceptions2', 'exception',
        'sedeVerb', 'distinction', 'vowelYRule'
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
    
    // === 3.08: Able/Ative and Ible/Itive Examples ===
    if (content.ableAtiveExamples && typeof content.ableAtiveExamples === 'object') {
        html += `
            <div class="able-ative-section">
                <h4>${content.ableAtiveExamples.title || 'Words with -able or -ative'}</h4>
        `;
        
        if (content.ableAtiveExamples.examples && Array.isArray(content.ableAtiveExamples.examples)) {
            html += `<ul class="styled-list">`;
            content.ableAtiveExamples.examples.forEach(ex => {
                if (ex.root && ex.derived) {
                    html += `<li><strong>${ex.root}</strong> → ${ex.derived}</li>`;
                }
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    if (content.ibleItiveExamples && typeof content.ibleItiveExamples === 'object') {
        html += `
            <div class="ible-itive-section">
                <h4>${content.ibleItiveExamples.title || 'Words with -ible or -itive'}</h4>
        `;
        
        if (content.ibleItiveExamples.examples && Array.isArray(content.ibleItiveExamples.examples)) {
            html += `<ul class="styled-list">`;
            content.ibleItiveExamples.examples.forEach(ex => {
                if (ex.root && ex.derived) {
                    html += `<li><strong>${ex.root}</strong> → ${ex.derived}</li>`;
                }
            });
            html += `</ul>`;
        }
        
        html += `</div>`;
    }
    
    return html;
}
