// ===================================
// Chapter 6 Builder - Italics
// ===================================
// Handles unique content structures for Chapter 6

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
                <h4>Key Principle</h4>
                <p>${content.keyPrinciple}</p>
            </div>
        `;
    }

    if (content.punctuationRules) {
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
                <p><strong>Note:</strong> ${content.note}</p>
            </div>
        `;
    }

    // === 6.02: Emphasis - Use Cases ===
    if (content.useCases) {
        html += `
            <div class="use-cases-section">
                <p>${content.text}</p>
        `;
        content.useCases.forEach((useCase, index) => {
            html += `
                <div class="use-case-item">
                    <p><strong>Case ${index + 1}:</strong> ${useCase.situation}</p>
                    <div class="example-box">
                        <p>${useCase.example}</p>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // === 6.03 & 6.04: Italicized vs Not Italicized Comparison ===
    if (content.italicizedExamples && content.notItalicizedExamples) {
        html += `<p>${content.mainRule}</p>`;
        
        html += `
            <div class="comparison-section-italics">
                <div class="comparison-grid">
                    <div class="comparison-column italicized">
                        <h4>Italicized</h4>
                        <ul class="styled-list">
        `;
        content.italicizedExamples.forEach(term => {
            html += `<li><em>${term}</em></li>`;
        });
        html += `
                        </ul>
                    </div>
        `;

        if (content.notItalicizedRule) {
            html += `
                    <div class="comparison-column not-italicized">
                        <h4>${content.notItalicizedRule}</h4>
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
    if (content.italicizedTerms && content.notItalicizedTerms) {
        html += `<p>${content.mainText}</p>`;
        
        html += `
            <div class="comparison-section-italics latin-terms">
                <div class="comparison-grid">
                    <div class="comparison-column italicized">
                        <h4>Italicized Latin Terms</h4>
                        <ul class="styled-list">
        `;
        content.italicizedTerms.forEach(term => {
            html += `<li><em>${term}</em></li>`;
        });
        html += `
                        </ul>
                    </div>
                    <div class="comparison-column not-italicized">
                        <h4>${content.notItalicizedRule}</h4>
                        <ul class="styled-list">
        `;
        content.notItalicizedTerms.forEach(term => {
            html += `<li>${term}</li>`;
        });
        html += `
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // === 6.05: Publication Types ===
    if (content.publicationTypes) {
        html += `<p>${content.mainRule}</p>`;
        
        html += `
            <div class="publication-types-section">
                <div class="publication-grid">
        `;
        
        content.publicationTypes.forEach(pub => {
            html += `
                <div class="publication-item">
                    <span class="pub-type">${pub.type}:</span>
                    <span class="pub-example"><em>${pub.example}</em></span>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;

        // Exception
        if (content.exception) {
            html += `
                <div class="info-box exception">
                    <h4>Exception</h4>
                    <p>${content.exception.text}</p>
                </div>
            `;
        }

        // Unofficial titles
        if (content.unofficialTitles) {
            html += `
                <div class="rule-subsection">
                    <p><strong>${content.unofficialTitles.rule}</strong></p>
                    <div class="example-box">
                        <p>${content.unofficialTitles.example}</p>
                    </div>
                </div>
            `;
        }

        // Short works (articles, songs, etc.)
        if (content.shortWorks) {
            html += `
                <div class="rule-subsection short-works">
                    <p><strong>${content.shortWorks.rule}</strong></p>
                    <div class="examples-list">
            `;
            content.shortWorks.examples.forEach(ex => {
                html += `
                    <div class="example-item">
                        <span class="work-type">${ex.type}:</span>
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
    if (content.mainRule && content.examples && !content.publicationTypes) {
        html += `<p>${content.mainRule}</p>`;
        html += `
            <div class="examples-section">
                <ul class="styled-list">
        `;
        content.examples.forEach(example => {
            html += `<li>${example}</li>`;
        });
        html += `
                </ul>
            </div>
        `;

        if (content.exception) {
            html += `<p><strong>Exception:</strong> ${content.exception}</p>`;
        }

        if (content.alternatives) {
            html += `<p><strong>Alternatives:</strong> ${content.alternatives}</p>`;
        }

        if (content.crossReference) {
            html += `<p class="cross-reference">${content.crossReference}</p>`;
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
        content.specialNote.examples.forEach(example => {
            html += `<li>${example}</li>`;
        });
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
            <div class="rule-subsection">
                <h4>Stage Directions</h4>
                <p>${content.stageDirections.text}</p>
        `;
        if (content.stageDirections.note) {
            html += `<p><strong>Note:</strong> ${content.stageDirections.note}</p>`;
        }
        html += `</div>`;
    }

    if (content.indexTerms) {
        html += `<p>${content.indexTerms}</p>`;
    }

    if (content.editorialClarifications) {
        html += `
            <div class="rule-subsection">
                <h4>Editorial Clarifications</h4>
                <p>${content.editorialClarifications.rule}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        content.editorialClarifications.examples.forEach(example => {
            html += `<li>${example}</li>`;
        });
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    // === 6.10: Identifying Matter (categories) ===
    if (content.categories) {
        html += `<p>${content.text}</p>`;
        
        content.categories.forEach(category => {
            html += `
                <div class="category-section">
                    <h4>${category.type}</h4>
                    <p>${category.description}</p>
            `;
            
            if (category.examples) {
                html += `<div class="examples-section"><ul class="styled-list">`;
                category.examples.forEach(example => {
                    html += `<li>${example}</li>`;
                });
                html += `</ul></div>`;
            } else if (category.example) {
                html += `<div class="example-box"><p>${category.example}</p></div>`;
            }
            
            html += `</div>`;
        });
    }

    // === 6.11: Mathematical/Scientific Material ===
    if (content.biologicalNames) {
        html += `
            <div class="rule-subsection biological">
                <h4>Biological Names</h4>
                <p>${content.biologicalNames.rule}</p>
                <div class="example-box">
                    <p>${content.biologicalNames.example}</p>
                </div>
                <p><strong>Exception:</strong> ${content.biologicalNames.exception}</p>
                <div class="example-box">
                    <p>${content.biologicalNames.exceptionExample}</p>
                </div>
            </div>
        `;
    }

    if (content.algebraicNotation) {
        html += `
            <div class="rule-subsection algebraic">
                <h4>Algebraic Notation</h4>
                <p>${content.algebraicNotation.rule}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        content.algebraicNotation.examples.forEach(example => {
            html += `<li class="math-example">${example}</li>`;
        });
        html += `
                    </ul>
                </div>
                <div class="info-box note">
                    <p>${content.algebraicNotation.note}</p>
                    <ul class="styled-list">
        `;
        content.algebraicNotation.comparisonExamples.forEach(example => {
            html += `<li class="math-example">${example}</li>`;
        });
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    if (content.quantitySymbols) {
        html += `
            <div class="rule-subsection quantity-symbols">
                <h4>Quantity vs Unit Symbols</h4>
                <p>${content.quantitySymbols.rule}</p>
                <div class="example-box math-example">
                    <p>${content.quantitySymbols.example}</p>
                    <p class="notation">${content.quantitySymbols.notation}</p>
                </div>
            </div>
        `;
    }

    if (content.chemicalPrefixes) {
        html += `
            <div class="rule-subsection chemical">
                <h4>Chemical Prefixes</h4>
                <p>${content.chemicalPrefixes.rule}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        content.chemicalPrefixes.examples.forEach(example => {
            html += `<li>${example}</li>`;
        });
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    if (content.statisticalSymbols) {
        html += `
            <div class="rule-subsection statistical">
                <h4>Statistical Symbols</h4>
                <p>${content.statisticalSymbols.text}</p>
                <div class="examples-section">
                    <ul class="styled-list">
        `;
        content.statisticalSymbols.examples.forEach(example => {
            html += `<li class="math-example">${example}</li>`;
        });
        html += `
                    </ul>
                </div>
            </div>
        `;
    }

    // === 6.12: Headings ===
    if (content.text && !content.categories && !content.useCases) {
        html += `<p>${content.text}</p>`;
    }

    if (content.crossReference && !content.exception) {
        html += `<p class="cross-reference">${content.crossReference}</p>`;
    }

    if (content.example && !content.categories) {
        html += `<p>${content.example}</p>`;
    }

    return html;
}

// Make function globally available
if (typeof window !== 'undefined') {
    window.buildChapter6Content = buildChapter6Content;
}
