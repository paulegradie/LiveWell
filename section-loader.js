// Section Loader - Dynamically loads HTML sections
class SectionLoader {
    constructor() {
        this.sections = [
            { id: 'hero-section', file: 'sections/hero.html' },
            { id: 'problem-section', file: 'sections/problem.html' },
            { id: 'solution-section', file: 'sections/solution.html' },
            { id: 'paul-message-section', file: 'sections/paul-message.html' },
            { id: 'lifestyle-section', file: 'sections/lifestyle.html' },
            { id: 'how-it-works-section', file: 'sections/how-it-works.html' },
            { id: 'final-choice-section', file: 'sections/final-choice.html' },
            { id: 'family-trust-section', file: 'sections/family-trust.html' }
        ];
    }

    async loadSection(sectionId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}: ${response.status}`);
            }
            const html = await response.text();
            const container = document.getElementById(sectionId);
            if (container) {
                container.innerHTML = html;
            } else {
                console.warn(`Container with id '${sectionId}' not found`);
            }
        } catch (error) {
            console.error(`Error loading section ${sectionId}:`, error);
            // Fallback: show error message
            const container = document.getElementById(sectionId);
            if (container) {
                container.innerHTML = `<div class="text-center text-red-400 p-8">
                    <p>Error loading section. Please refresh the page.</p>
                </div>`;
            }
        }
    }

    async loadAllSections() {
        const loadPromises = this.sections.map(section => 
            this.loadSection(section.id, section.file)
        );
        
        try {
            await Promise.all(loadPromises);
            console.log('All sections loaded successfully');
            
            // Initialize the main script after all sections are loaded
            if (typeof initializeApp === 'function') {
                initializeApp();
            }
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    }
}

// Initialize section loader when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const loader = new SectionLoader();
    loader.loadAllSections();
});

// Function to be called after all sections are loaded
function initializeApp() {
    // Re-run the main script initialization
    if (typeof initializeNavigation === 'function') initializeNavigation();
    if (typeof initializeProgressBar === 'function') initializeProgressBar();
    if (typeof initializeAnimations === 'function') initializeAnimations();
    if (typeof initializeComparison === 'function') initializeComparison();
    // if (typeof initializeMermaidDiagram === 'function') initializeMermaidDiagram(); // Commented out for testing
    // if (typeof initializeFamilyTrustDiagram === 'function') initializeFamilyTrustDiagram(); // Commented out for testing
    if (typeof initializeCounters === 'function') initializeCounters();
    if (typeof initializeWealthChart === 'function') initializeWealthChart();
    if (typeof initializeTableHoverEffects === 'function') initializeTableHoverEffects();
    if (typeof initializeVisualEffects === 'function') initializeVisualEffects();
    if (typeof initializeApartmentCalculator === 'function') initializeApartmentCalculator();
    if (typeof initializeIrajCalculator === 'function') initializeIrajCalculator();
    if (typeof initializeBlackHole === 'function') initializeBlackHole();
}
