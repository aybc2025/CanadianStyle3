// ===================================
// Chapter 6 Builder - Italics (FIXED VERSION)
// ===================================
// Handles ALL content for Chapter 6 independently

/**
 * Build content for Chapter 6 sections
 * @param {Object} content - Section content from chapter-06.json
 * @returns {string} HTML string
 */
export function buildChapter6Content(content) {
    let html = '';

    // === 6.01: Introduction ===
    if (content.mainText) {
        html += `<p>${content.mainText}</p>`;
    }

    if (content.keyPrinciple) {
        html += `
            <div class="info-box key-principle">
                <h4>💡 Key Principle</h4>
                <p>${content.keyPrinciple}</p>
            </div>
        `;
    }

    if (content.punctuationRules && Array.isArray(content.punctuationRules)) {
        html += `
            <div class="rules-section">
                <h4>Punctuation Rules</h4>
                <ul class="styled-list">
        `;
        content.punctuationRules.forEach(rule => {
            html += `<li>${rule}</li>`;
        });
        html += `
                </ul>
            </div>
        `;
    }

    if (content.note) {
        html += `
            <div class="info-box note">
                <p><strong>📝 Note:</strong> ${content.note}</p>
            </div>
        `;
    }

    // === 6.02: Emphasis - Use Cases ===
    if (content.text && !content.categories && !content.publicationTypes) {
        html += `<p>${content.text}</p>`;
    }

    if (content.useCases && Array.isArray(content.useCases)) {
        content.useCases.forEach((useCase, index) => {
            html += `
                <div class="use-case-item" style="margin-bottom: 20px;">
                    <p><strong>${useCase.situation}</strong></p>
                    <div class="example-box">
                        <p>${useCase.example}</p>
                    </div>
                </div>
            `;
        });
    }

    if (content.alternatives) {
        html += `
            <div class="info-box note">
                <p><strong>Alternatives:</strong> ${content.alternatives}</p>
            </div>
        `;
    }

    // === 6.03 & 6.04: Italicized vs Not Italicized Comparison ===
    if (content.italicizedExamples && Array.isArray(content.italicizedExamples)) {
        if (content.mainRule) {
            html += `<p>${content.mainRule}</p>`;
        }
        
        html += `
            <div class="comparison-section-italics">
                <div class="comparison-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <div class="comparison-column italicized">
                        <h4>✏️ Italicized</h4>
                        <ul class="styled-list">
        `;
        content.italicizedExamples.forEach(term => {
            html += `<li><em>${term}</em></li>`;
        });
        html += `
                        </ul>
                    </div>
        `;

        if (content.notItalicizedExamples && Array.isArray(content.notItalicizedExamples)) {
            html += `
                    <div class="comparison-column not-italicized">
                        <h4>📝 ${content.notItalicizedRule || 'Not Italicized'}</h4>
                        <ul class="styled-list">
            `;
            content.notItalicizedExamples.forEach(term => {
                html += `<li>${term}</li>`;
            });
            html += `
                        </ul>
                    </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;

        // Dictionary guidance for 6.03
        if (content.dictionaryGuidance) {
            html += `
                <div class="info-box guidance">
                    <p>${content.dictionaryGuidance.text}</p>
                    <p><strong>${content.dictionaryGuidance.rule}</strong></p>
                </div>
            `;
        }

        if (content.repeatedTerms) {
            html += `<p><strong>Repeated terms:</strong> ${content.repeatedTerms}</p>`;
        }
    }

    // === 6.04: Latin Terms (italicized vs not) ===
    if (content.italicizedTerms && Array.isArray(content.italicizedTerms)) {
        if (content.mainText && !content.italicizedExamples) {
            html += `<p>${content.mainText}</p>`;
        }
        
        html += `
            <div class="comparison-section-italics latin-terms">
                <div class="comparison-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                    <div class="comparison-column italicized">
                        <h4>✏️ Italicized Latin Terms</h4>
                        <ul class="styled-list">
        `;
        content.italicizedTerms.forEach(term => {
            html += `<li><em>${term}</em></li>`;
        });
        html += `
                        </ul>
                    </div>
                    <div class="comparison-column not-italicized">
                        <h4>📝 ${content.notItalicizedRule || 'Not Italicized'}</h4>
                        <ul class="styled-list">
        `;
        if (content.notItalicizedTerms && Array.isArray(content.notItalicizedTerms)) {
            content.notItalicizedTerms.forEach(term => {
                html += `<li>${term}</li>`;
            });
        }
        html += `
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // === 6.05: Publication Types ===
    if (content.publicationTypes && Array.isArray(content.publicationTypes)) {
        if (content.mainRule) {
            html += `<p>${content.mainRule}</p>`;
        }
        
        html += `
            <div class="publication-types-section">
                <div class="publication-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
        `;
        
        content.publicationTypes.forEach(pub => {
            html += `
                <div class="publication-item" style="padding: 10px; background: #f8f9fa; border-left: 3px solid #007bff; border-radius: 4px;">
                    <span class="pub-type" style="font-weight: bold; color: #495057;">${pub.type}:</span>
                    <span class="pub-example"><em>${pub.example}</em></span>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;

        // Exception
        if (content.exception && typeof content.exception === 'object') {
            html += `
                <div class="info-box exception">
                    <h4>⚠️ Exception</h4>
                    <p>${content.exception.text}</p>
                </div>
            `;
        }

        // Unofficial titles
        if (content.unofficialTitles) {
            html += `
                <div class="rule-subsection" style="margin: 20px 0;">
                    <p><strong>${content.unofficialTitles.rule}</strong></p>
                    <div class="example-box" style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px;">
                        <p>${content.unofficialTitles.example}</p>
                    </div>
                </div>
            `;
        }

        // Short works (articles, songs, etc.)
        if (content.shortWorks && content.shortWorks.examples) {
            html += `
                <div class="rule-subsection short-works" style="margin: 20px 0;">
                    <p><strong>${content.shortWorks.rule}</strong></p>
                    <div class="examples-list" style="margin-top: 10px;">
            `;
            content.shortWorks.examples.forEach(ex => {
                html += `
                    <div class="example-item" style="padding: 8px; background: #f8f9fa; margin: 5px 0; border-radius: 4px;">
                        <span class="work-type" style="font-weight: bold;">${ex.type}:</span>
                        <span>${ex.title}</span>
                    </div>
                `;
            });
            html += `
                    </div>
                </div>
            `;
        }
    }

    // === 6.06 & 6.08: Main Rule with Examples ===
    if (content.mainRule && content.examples && Array.isArray(content.examples) && !content.publicationTypes) {
        html += `<p>${content.mainRule}</p>`;
        html += `
            <div class="examples-section">
                <h4>Examples</h4>
                <ul class="styled-list">
        `;
        content.examples.forEach(example => {
            html += `<li>${example}</li>`;
        });
        html += `
                </ul>
            </div>
        `;

        if (content.exception && typeof content.exception === 'string') {
            html += `<p><strong>⚠️ Exception:</strong> ${content.exception}</p>`;
        }

        if (content.alternatives) {
            html += `<p><strong>Alternatives:</strong> ${content.alternatives}</p>`;
        }

        if (content.crossReference) {
            html += `<p class="cross-reference" style="font-style: italic; color: #666;"><em>${content.crossReference}</em></p>`;
        }
    }

    // === 6.07: Special Note for DND ===
    if (content.specialNote) {
        html += `
            <div class="info-box warning-box dnd-note">
                <h4>📌 ${content.specialNote.title}</h4>
                <p>${content.specialNote.text}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        if (content.specialNote.examples && Array.isArray(content.specialNote.examples)) {
            content.specialNote.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
        }
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    // === 6.09: Peripheral Matter (multiple subsections) ===
    if (content.prefacesAndDedications) {
        html += `<p>${content.prefacesAndDedications}</p>`;
    }

    if (content.stageDirections) {
        html += `
            <div class="rule-subsection" style="margin: 20px 0;">
                <h4>Stage Directions</h4>
                <p>${content.stageDirections.text}</p>
        `;
        if (content.stageDirections.note) {
            html += `<p><strong>📝 Note:</strong> ${content.stageDirections.note}</p>`;
        }
        html += `</div>`;
    }

    if (content.indexTerms) {
        html += `<p>${content.indexTerms}</p>`;
    }

    if (content.editorialClarifications) {
        html += `
            <div class="rule-subsection" style="margin: 20px 0;">
                <h4>Editorial Clarifications</h4>
                <p>${content.editorialClarifications.rule}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        if (content.editorialClarifications.examples && Array.isArray(content.editorialClarifications.examples)) {
            content.editorialClarifications.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
        }
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    // === 6.10: Identifying Matter (categories) ===
    if (content.categories && Array.isArray(content.categories)) {
        if (content.text) {
            html += `<p>${content.text}</p>`;
        }
        
        content.categories.forEach(category => {
            html += `
                <div class="category-section" style="margin-bottom: 25px;">
                    <h4 style="color: #d32f2f;">${category.type}</h4>
                    <p>${category.description}</p>
            `;
            
            if (category.examples && Array.isArray(category.examples)) {
                html += `<div class="examples-section"><ul class="styled-list">`;
                category.examples.forEach(example => {
                    html += `<li>${example}</li>`;
                });
                html += `</ul></div>`;
            } else if (category.example) {
                html += `<div class="example-box" style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-top: 10px;"><p>${category.example}</p></div>`;
            }
            
            html += `</div>`;
        });
    }

    // === 6.11: Mathematical/Scientific Material ===
    if (content.biologicalNames) {
        html += `
            <div class="rule-subsection biological" style="margin: 20px 0;">
                <h4>🔬 Biological Names</h4>
                <p>${content.biologicalNames.rule}</p>
                <div class="example-box" style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 10px 0;">
                    <p>${content.biologicalNames.example}</p>
                </div>
                <p><strong>⚠️ Exception:</strong> ${content.biologicalNames.exception}</p>
                <div class="example-box" style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 10px 0;">
                    <p>${content.biologicalNames.exceptionExample}</p>
                </div>
            </div>
        `;
    }

    if (content.algebraicNotation) {
        html += `
            <div class="rule-subsection algebraic" style="margin: 20px 0;">
                <h4>🔢 Algebraic Notation</h4>
                <p>${content.algebraicNotation.rule}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        if (content.algebraicNotation.examples && Array.isArray(content.algebraicNotation.examples)) {
            content.algebraicNotation.examples.forEach(example => {
                html += `<li class="math-example">${example}</li>`;
            });
        }
        html += `
                    </ul>
                </div>
                <div class="info-box note">
                    <p><strong>📝 Note:</strong> ${content.algebraicNotation.note}</p>
                    <ul class="styled-list">
        `;
        if (content.algebraicNotation.comparisonExamples && Array.isArray(content.algebraicNotation.comparisonExamples)) {
            content.algebraicNotation.comparisonExamples.forEach(example => {
                html += `<li class="math-example">${example}</li>`;
            });
        }
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    if (content.quantitySymbols) {
        html += `
            <div class="rule-subsection quantity-symbols" style="margin: 20px 0;">
                <h4>📏 Quantity vs Unit Symbols</h4>
                <p>${content.quantitySymbols.rule}</p>
                <div class="example-box math-example" style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 10px 0;">
                    <p>${content.quantitySymbols.example}</p>
                    <p class="notation" style="font-style: italic; color: #666;">${content.quantitySymbols.notation}</p>
                </div>
            </div>
        `;
    }

    if (content.chemicalPrefixes) {
        html += `
            <div class="rule-subsection chemical" style="margin: 20px 0;">
                <h4>🧪 Chemical Prefixes</h4>
                <p>${content.chemicalPrefixes.rule}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        if (content.chemicalPrefixes.examples && Array.isArray(content.chemicalPrefixes.examples)) {
            content.chemicalPrefixes.examples.forEach(example => {
                html += `<li>${example}</li>`;
            });
        }
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    if (content.statisticalSymbols) {
        html += `
            <div class="rule-subsection statistical" style="margin: 20px 0;">
                <h4>📊 Statistical Symbols</h4>
                <p>${content.statisticalSymbols.text}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        if (content.statisticalSymbols.examples && Array.isArray(content.statisticalSymbols.examples)) {
            content.statisticalSymbols.examples.forEach(example => {
                html += `<li class="math-example">${example}</li>`;
            });
        }
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    // === 6.12: Headings (simple text, only if not handled above) ===
    // Most headings are just text, already handled

    // Fallback for remaining cross-references
    if (content.crossReference && !content.exception && !content.examples) {
        html += `<p class="cross-reference" style="font-style: italic; color: #666;"><em>${content.crossReference}</em></p>`;
    }

    return html;
}

// Make function globally available (for debugging)
if (typeof window !== 'undefined') {
    window.buildChapter6Content = buildChapter6Content;
}
