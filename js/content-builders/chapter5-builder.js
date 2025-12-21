// ===================================
// Chapter 5 Content Builder - OPTIMIZED
// Uses existing CSS classes wherever possible
// Only adds new classes for truly unique structures
// ===================================

// 1. Additional Text - uses existing paragraph style
export function buildAdditionalText(content) {
    if (content.additionalText) {
        return `<p>${content.additionalText}</p>`;
    }
    return '';
}

// 2. Formats - uses existing .example-box
export function buildFormats(content) {
    if (content.formats && Array.isArray(content.formats) && content.formats.length > 0) {
        let html = '<div class="info-box">'; // Using existing class!
        html += '<h4>Standard Forms:</h4>';
        html += '<ul>';
        content.formats.forEach(format => {
            html += `<li>${format}</li>`;
        });
        html += '</ul>';
        html += '</div>';
        return html;
    }
    return '';
}

// 3. Spacing Rules - uses existing .info-box
export function buildSpacingRules(content) {
    if (content.spacingRules) {
        const sr = content.spacingRules;
        let html = '<div class="info-box">';
        
        if (sr.title) {
            html += `<h4>${sr.title}</h4>`;
        }
        
        if (sr.text) {
            html += `<p>${sr.text}</p>`;
        }
        
        if (sr.note) {
            html += `<p class="note"><em>Note: ${sr.note}</em></p>`;
        }
        
        if (sr.examples && Array.isArray(sr.examples)) {
            html += '<ul>';
            sr.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
        
        if (sr.omitSpacing) {
            html += `<p><strong>Omit spacing:</strong> ${sr.omitSpacing}</p>`;
        }
        
        html += '</div>';
        return html;
    }
    return '';
}

// 4. Numbered Notes - NEW CLASS (minimal CSS needed)
export function buildNumberedNotes(content) {
    let html = '';
    
    if (content.note1) {
        html += `<div class="info-box numbered-note"><p><em><strong>Note 1:</strong> ${content.note1}</em></p></div>`;
    }
    
    if (content.note2) {
        html += `<div class="info-box numbered-note"><p><em><strong>Note 2:</strong> ${content.note2}</em></p></div>`;
    }
    
    if (content.note3) {
        html += `<div class="info-box numbered-note"><p><em><strong>Note 3:</strong> ${content.note3}</em></p></div>`;
    }
    
    return html;
}

// 5. Parts/Subsections - NEW CLASS (minimal CSS needed)
export function buildParts(content) {
    let html = '';
    
    const parts = ['partA', 'partB', 'partC', 'partD'];
    
    parts.forEach(partKey => {
        if (content[partKey]) {
            const part = content[partKey];
            html += '<div class="part-section">'; // New class needed
            
            if (part.title) {
                html += `<h4>${part.title}</h4>`;
            }
            
            if (part.text) {
                html += `<p>${part.text}</p>`;
            }
            
            if (part.rule) {
                html += `<p><strong>Rule:</strong> ${part.rule}</p>`;
            }
            
            if (part.note) {
                html += `<p class="note"><em>Note: ${part.note}</em></p>`;
            }
            
            // Examples in parts
            if (part.examples && Array.isArray(part.examples)) {
                html += '<ul>';
                part.examples.forEach(example => {
                    if (typeof example === 'string') {
                        html += `<li>${example}</li>`;
                    } else if (example.type) {
                        html += `<li><span class="example-label">[${example.type}]</span> ${example.text}</li>`;
                    }
                });
                html += '</ul>';
            }
            
            if (part.example) {
                html += `<p class="example">${part.example}</p>`;
            }
            
            // Special: partC in 5.24 has complex rules structure
            if (part.rules && typeof part.rules === 'object') {
                Object.keys(part.rules).forEach(ruleKey => {
                    const rule = part.rules[ruleKey];
                    html += '<div class="info-box">';
                    
                    if (rule.title) {
                        html += `<h4>${rule.title}</h4>`;
                    }
                    
                    if (rule.rule) {
                        html += `<p>${rule.rule}</p>`;
                    }
                    
                    if (rule.examples && Array.isArray(rule.examples)) {
                        html += '<ul>';
                        rule.examples.forEach(ex => {
                            html += `<li>${ex}</li>`;
                        });
                        html += '</ul>';
                    }
                    
                    if (rule.example) {
                        html += `<p>${rule.example}</p>`;
                    }
                    
                    html += '</div>';
                });
            }
            
            html += '</div>';
        }
    });
    
    return html;
}

// 6. Correct Forms - uses existing .recommended-box
export function buildCorrectForms(content) {
    if (content.correctForms && Array.isArray(content.correctForms)) {
        let html = '<div class="recommended-box">';
        html += '<h4>Correct Forms:</h4>';
        html += '<ul>';
        content.correctForms.forEach(form => {
            html += `<li>${form}</li>`;
        });
        html += '</ul>';
        html += '</div>';
        return html;
    }
    return '';
}

// 7. SI Symbols - NEW CLASS (table with correct/incorrect columns)
export function buildSiSymbols(content) {
    if (content.siSymbols && Array.isArray(content.siSymbols)) {
        let html = '<div class="comparison-section">';
        html += '<h4>SI Symbol Usage:</h4>';
        html += '<table class="comparison-table si-symbols-table">';
        html += '<thead><tr><th>✓ Correct</th><th>✗ Incorrect</th></tr></thead>';
        html += '<tbody>';
        content.siSymbols.forEach(pair => {
            html += '<tr>';
            html += `<td class="si-correct">${pair.correct}</td>`;
            html += `<td class="si-incorrect">${pair.incorrect}</td>`;
            html += '</tr>';
        });
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        return html;
    }
    return '';
}

// 8. Technical Context - uses existing .info-box
export function buildTechnicalContext(content) {
    if (content.technicalContext) {
        const tc = content.technicalContext;
        let html = '<div class="info-box">';
        
        if (tc.title) {
            html += `<h4>${tc.title}</h4>`;
        }
        
        if (tc.text) {
            html += `<p>${tc.text}</p>`;
        }
        
        if (tc.examples && Array.isArray(tc.examples)) {
            html += '<ul>';
            tc.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
        
        if (tc.siUsage) {
            html += `<p><strong>SI Usage:</strong> ${tc.siUsage}</p>`;
        }
        
        if (tc.siExamples && Array.isArray(tc.siExamples)) {
            html += '<p><strong>Examples:</strong></p>';
            html += '<ul>';
            tc.siExamples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
        
        html += '</div>';
        return html;
    }
    return '';
}

// 9. Examples as Object - uses existing styles
export function buildGroupedExamples(content) {
    if (content.examples && typeof content.examples === 'object' && !Array.isArray(content.examples)) {
        let html = '<div class="info-box">';
        
        Object.keys(content.examples).forEach(groupKey => {
            const groupTitle = groupKey.replace(/([A-Z])/g, ' $1').trim();
            const capitalizedTitle = groupTitle.charAt(0).toUpperCase() + groupTitle.slice(1);
            
            html += `<h4>${capitalizedTitle}:</h4>`;
            html += '<ul>';
            content.examples[groupKey].forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        });
        
        html += '</div>';
        return html;
    }
    return '';
}

// 10. Alphanumeric Format - uses existing .recommended-box + lists
export function buildAlphanumericFormat(content) {
    if (content.alphanumericFormat) {
        const af = content.alphanumericFormat;
        let html = '<div class="info-box">';
        
        if (af.title) {
            html += `<h4>${af.title}</h4>`;
        }
        
        if (af.recommended && Array.isArray(af.recommended)) {
            html += '<p><strong>✓ Recommended:</strong></p>';
            html += '<ul>';
            af.recommended.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        }
        
        if (af.notRecommended && Array.isArray(af.notRecommended)) {
            html += '<p><strong>✗ Not Recommended:</strong></p>';
            html += '<ul>';
            af.notRecommended.forEach(item => {
                html += `<li><del>${item}</del></li>`;
            });
            html += '</ul>';
        }
        
        if (af.dayMonthOnly) {
            html += '<h4>Day and Month Only:</h4>';
            
            if (af.dayMonthOnly.recommended) {
                html += '<p><strong>✓ Recommended:</strong></p>';
                html += '<ul>';
                af.dayMonthOnly.recommended.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                html += '</ul>';
            }
            
            if (af.dayMonthOnly.notRecommended) {
                html += '<p><strong>✗ Not Recommended:</strong></p>';
                html += '<ul>';
                af.dayMonthOnly.notRecommended.forEach(item => {
                    html += `<li><del>${item}</del></li>`;
                });
                html += '</ul>';
            }
        }
        
        if (af.note) {
            html += `<p class="note"><em>Note: ${af.note}</em></p>`;
        }
        
        html += '</div>';
        return html;
    }
    return '';
}

// 11. All-Numeric Format - uses existing .info-box
export function buildAllNumericFormat(content) {
    if (content.allNumericFormat) {
        const anf = content.allNumericFormat;
        let html = '<div class="info-box">';
        
        if (anf.title) {
            html += `<h4>${anf.title}</h4>`;
        }
        
        if (anf.text) {
            html += `<p>${anf.text}</p>`;
        }
        
        if (anf.examples && Array.isArray(anf.examples)) {
            html += '<ul>';
            anf.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
        
        if (anf.advantage) {
            html += `<p><strong>Advantage:</strong> ${anf.advantage}</p>`;
        }
        
        html += '</div>';
        return html;
    }
    return '';
}

// 12. Spelled-Out Dates - uses existing styles
export function buildSpelledOut(content) {
    if (content.spelledOut) {
        const so = content.spelledOut;
        let html = '<div class="info-box">';
        
        if (so.title) {
            html += `<h4>${so.title}</h4>`;
        }
        
        if (so.text) {
            html += `<p>${so.text}</p>`;
        }
        
        if (so.examples && Array.isArray(so.examples)) {
            html += '<ul>';
            so.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
        
        if (so.formalContexts) {
            html += `<p><strong>Formal Contexts:</strong> ${so.formalContexts}</p>`;
        }
        
        if (so.formalExample) {
            html += `<div class="example-box">${so.formalExample}</div>`;
        }
        
        html += '</div>';
        return html;
    }
    return '';
}

// 13. Year Designations - uses existing .words-grid
export function buildYearDesignations(content) {
    if (content.yearDesignations && Array.isArray(content.yearDesignations)) {
        let html = '<div class="words-list">';
        html += '<h4>Year Designations:</h4>';
        html += '<div class="words-grid">';
        content.yearDesignations.forEach(year => {
            html += `<div class="word-item">${year}</div>`;
        });
        html += '</div>';
        html += '</div>';
        return html;
    }
    return '';
}

// 14. Churches and Organizations - uses existing lists
export function buildChurchesAndOrganizations(content) {
    let html = '';
    
    if (content.churches && Array.isArray(content.churches)) {
        html += '<h4>Churches and Religious Bodies:</h4>';
        html += '<ul>';
        content.churches.forEach(church => {
            html += `<li>${church}</li>`;
        });
        html += '</ul>';
    }
    
    if (content.organizations && Array.isArray(content.organizations)) {
        html += '<h4>Union Locals and Fraternal Lodges:</h4>';
        html += '<ul>';
        content.organizations.forEach(org => {
            html += `<li>${org}</li>`;
        });
        html += '</ul>';
    }
    
    return html;
}

// 15. Address Formats - uses existing paragraph styles
export function buildAddressFormats(content) {
    let html = '';
    
    if (content.apartmentFormat) {
        html += `<p><strong>Apartment/Suite Format:</strong> ${content.apartmentFormat}</p>`;
    }
    
    if (content.apartmentExample) {
        html += `<div class="example-box">${content.apartmentExample}</div>`;
    }
    
    if (content.floors) {
        html += `<p><strong>Floor Identification:</strong> ${content.floors}</p>`;
    }
    
    if (content.floorExample) {
        html += `<div class="example-box">${content.floorExample}</div>`;
    }
    
    return html;
}

// 16. Reference Numbers - uses existing styles
export function buildReferenceNumbers(content) {
    let html = '';
    
    if (content.pageNumbers && Array.isArray(content.pageNumbers)) {
        html += '<h4>Page Numbers:</h4>';
        html += '<ul>';
        content.pageNumbers.forEach(page => {
            html += `<li>${page}</li>`;
        });
        html += '</ul>';
    }
    
    if (content.volumesAndChapters) {
        const vac = content.volumesAndChapters;
        html += '<h4>Volumes and Chapters:</h4>';
        if (vac.text) {
            html += `<p>${vac.text}</p>`;
        }
        if (vac.examples && Array.isArray(vac.examples)) {
            html += '<ul>';
            vac.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
    }
    
    if (content.paragraphs) {
        html += `<p><strong>Paragraphs:</strong> ${content.paragraphs}</p>`;
    }
    
    if (content.legislationExample) {
        html += `<div class="example-box">${content.legislationExample}</div>`;
    }
    
    return html;
}

// 17. Roman Numeral Uses - uses existing .info-box
export function buildRomanUses(content) {
    if (content.uses && typeof content.uses === 'object') {
        let html = '<h4>Uses of Roman Numerals:</h4>';
        
        Object.keys(content.uses).forEach(useKey => {
            const use = content.uses[useKey];
            html += '<div class="info-box">';
            
            if (use.title) {
                html += `<h4>${use.title}</h4>`;
            }
            
            if (use.text) {
                html += `<p>${use.text}</p>`;
            }
            
            if (use.examples && Array.isArray(use.examples)) {
                html += '<ul>';
                use.examples.forEach(example => {
                    html += `<li>${example}</li>`;
                });
                html += '</ul>';
            }
            
            html += '</div>';
        });
        
        return html;
    }
    return '';
}

// 18. European Conventions and Currencies - uses existing .info-box
export function buildConventionsAndCurrencies(content) {
    let html = '';
    
    if (content.europeanConventions) {
        const ec = content.europeanConventions;
        html += '<div class="info-box">';
        
        if (ec.title) {
            html += `<h4>${ec.title}</h4>`;
        }
        
        if (ec.text) {
            html += `<p>${ec.text}</p>`;
        }
        
        if (ec.decimalMarker) {
            html += `<p><strong>Decimal Marker:</strong> ${ec.decimalMarker}</p>`;
        }
        
        if (ec.billion) {
            html += `<p><strong>Billion:</strong> ${ec.billion}</p>`;
        }
        
        if (ec.ppb) {
            html += `<p><strong>PPB:</strong> ${ec.ppb}</p>`;
        }
        
        html += '</div>';
    }
    
    if (content.currencies) {
        const cur = content.currencies;
        html += '<div class="info-box">';
        
        if (cur.title) {
            html += `<h4>${cur.title}</h4>`;
        }
        
        if (cur.text) {
            html += `<p>${cur.text}</p>`;
        }
        
        if (cur.examples && Array.isArray(cur.examples)) {
            html += '<ul>';
            cur.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
            html += '</ul>';
        }
        
        if (cur.note) {
            html += `<p class="note"><em>Note: ${cur.note}</em></p>`;
        }
        
        html += '</div>';
    }
    
    if (content.internationalConventions) {
        html += `<p>${content.internationalConventions}</p>`;
    }
    
    return html;
}

// ===================================
// Main Builder Function
// ===================================
export function buildChapter5Content(content) {
    let html = '';
    
    // Build all Chapter 5 specific content
    html += buildAdditionalText(content);
    html += buildFormats(content);
    html += buildSpacingRules(content);
    html += buildNumberedNotes(content);
    html += buildParts(content);
    html += buildCorrectForms(content);
    html += buildSiSymbols(content);
    html += buildTechnicalContext(content);
    html += buildGroupedExamples(content);
    html += buildAlphanumericFormat(content);
    html += buildAllNumericFormat(content);
    html += buildSpelledOut(content);
    html += buildYearDesignations(content);
    html += buildChurchesAndOrganizations(content);
    html += buildAddressFormats(content);
    html += buildReferenceNumbers(content);
    html += buildRomanUses(content);
    html += buildConventionsAndCurrencies(content);
    
    return html;
}
