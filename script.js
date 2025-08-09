// Financial Strategy Planning - Interactive JavaScript

// Cookie utility functions
function setCookie(name, value, days = 30) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function saveSliderState(sliderId, value) {
    setCookie(`slider_${sliderId}`, value);
}

function loadSliderState(sliderId, defaultValue) {
    const savedValue = getCookie(`slider_${sliderId}`);
    return savedValue ? parseInt(savedValue) : defaultValue;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProgressBar();
    initializeAnimations();
    initializeComparison();
    // initializeMermaidDiagram(); // Commented out for testing
    // initializeFamilyTrustDiagram(); // Commented out for testing
    initializeCounters();
    initializeWealthChart();

    initializeTableHoverEffects();
    initializeVisualEffects();
    initializeApartmentCalculator();
    initializeIrajCalculator();
    initializeDynamicBackground();

});

// Accordion functionality
function toggleAccordion(accordionId) {
    const content = document.getElementById(accordionId);
    const icon = document.getElementById(accordionId.replace('-accordion', '-icon'));

    if (content && icon) {
        if (content.classList.contains('hidden')) {
            // Open accordion
            content.classList.remove('hidden');
            content.classList.add('block');
            icon.textContent = '−';

            // Add smooth slide down animation
            content.style.maxHeight = '0px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease-out';

            // Force reflow then set max-height
            setTimeout(() => {
                content.style.maxHeight = content.scrollHeight + 'px';
            }, 10);

            // Remove max-height after animation
            setTimeout(() => {
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
            }, 300);
        } else {
            // Close accordion
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.3s ease-out';

            // Force reflow then collapse
            setTimeout(() => {
                content.style.maxHeight = '0px';
            }, 10);

            // Hide after animation
            setTimeout(() => {
                content.classList.add('hidden');
                content.classList.remove('block');
                content.style.maxHeight = '';
                content.style.overflow = '';
                content.style.transition = '';
            }, 300);

            icon.textContent = '+';
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('bg-purple-primary/30'));
                this.classList.add('bg-purple-primary/30');
            }
        });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

// Progress bar functionality
function initializeProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const scrollPercentage = (scrollTop / documentHeight) * 100;

        progressBar.style.width = Math.min(scrollPercentage, 100) + '%';
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('bg-purple-primary/30');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('bg-purple-primary/30');
        }
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animations when section becomes visible
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animated')) {
                        animateCounter(counter);
                        counter.classList.add('animated');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections with fade animation
    const fadeElements = document.querySelectorAll('.section-fade');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas
        const formattedNumber = Math.floor(current).toLocaleString();
        element.textContent = `$${formattedNumber}`;
    }, 16);
}

// Comparison toggle functionality
function initializeComparison() {
    const soloBtn = document.getElementById('soloBtn');
    const togetherBtn = document.getElementById('togetherBtn');
    const soloCard = document.getElementById('soloCard');
    const togetherCard = document.getElementById('togetherCard');
    
    if (!soloBtn || !togetherBtn) return;
    
    // Toggle to "Working Together" view
    togetherBtn.addEventListener('click', function() {
        // Update button states
        soloBtn.classList.remove('bg-orange-warning', 'text-gray-900');
        soloBtn.classList.add('text-gray-400');
        
        togetherBtn.classList.remove('text-gray-400');
        togetherBtn.classList.add('bg-green-success', 'text-gray-900');
        
        // Update card visibility and styling
        soloCard.classList.remove('border-orange-warning');
        soloCard.classList.add('border-transparent', 'opacity-50');
        
        togetherCard.classList.remove('border-transparent');
        togetherCard.classList.add('border-green-success', 'neon-glow');
        
        // Animate counters in the active card
        const counters = togetherCard.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.classList.remove('animated');
            animateCounter(counter);
            counter.classList.add('animated');
        });
    });
    
    // Toggle to "Flying Solo" view
    soloBtn.addEventListener('click', function() {
        // Update button states
        togetherBtn.classList.remove('bg-green-success', 'text-gray-900');
        togetherBtn.classList.add('text-gray-400');
        
        soloBtn.classList.remove('text-gray-400');
        soloBtn.classList.add('bg-orange-warning', 'text-gray-900');
        
        // Update card visibility and styling
        togetherCard.classList.remove('border-green-success', 'neon-glow');
        togetherCard.classList.add('border-transparent', 'opacity-50');
        
        soloCard.classList.remove('border-transparent', 'opacity-50');
        soloCard.classList.add('border-orange-warning');
        
        // Animate counters in the active card
        const counters = soloCard.querySelectorAll('.counter');
        counters.forEach(counter => {
            counter.classList.remove('animated');
            animateCounter(counter);
            counter.classList.add('animated');
        });
    });
}

// Initialize all counters
function initializeCounters() {
    // Set initial state for all counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.textContent = '$0';
    });
}

// Mermaid diagram initialization - COMMENTED OUT FOR TESTING
/*
function initializeMermaidDiagram() {
    // Initialize Mermaid
    mermaid.initialize({ 
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
            primaryColor: '#6B46C1',
            primaryTextColor: '#FFFFFF',
            primaryBorderColor: '#7C3AED',
            lineColor: '#06B6D4',
            secondaryColor: '#10B981',
            tertiaryColor: '#F59E0B',
            background: '#1F2937',
            mainBkg: '#374151',
            secondBkg: '#4B5563',
            tertiaryBkg: '#6B7280'
        }
    });
    
    // Mermaid diagram definition
    const diagramDefinition = `
        graph TD
            A[52 High Street Sale<br/>$2.0M - $2.1M] --> B[Pay off $400k debt]
            B --> C[Net Proceeds: $1.6M]
            C --> D[Pay off 75 Peter: $850k]
            C --> E[Pay off 73 Willow: $520k]
            C --> F[Pay off 122 Maitland: $230k]
            
            D --> G[75 Peter: DEBT FREE<br/>Value: $1.8M]
            E --> H[73 Willow: DEBT FREE<br/>Value: $740k]
            F --> I[122 Maitland: $199k debt<br/>Value: $560k]
            
            G --> J[Annual Savings: $12,606]
            H --> J
            I --> J
            
            J --> K[Total Available: $246k/year]
            K --> L[Luxury Travel & Shopping]
            K --> M[Investment & Wealth Building]
            K --> N[Financial Security for All]
            
            style A fill:#10B981,stroke:#059669,stroke-width:3px,color:#000
            style C fill:#06B6D4,stroke:#0891B2,stroke-width:3px,color:#000
            style J fill:#7C3AED,stroke:#6B46C1,stroke-width:3px,color:#fff
            style K fill:#F59E0B,stroke:#D97706,stroke-width:3px,color:#000
            style L fill:#10B981,stroke:#059669,stroke-width:2px,color:#000
            style M fill:#10B981,stroke:#059669,stroke-width:2px,color:#000
            style N fill:#10B981,stroke:#059669,stroke-width:2px,color:#000
    `;
    
    // Render the diagram
    const diagramContainer = document.getElementById('mermaid-diagram');
    if (diagramContainer) {
        mermaid.render('money-flow-diagram', diagramDefinition).then(result => {
            diagramContainer.innerHTML = result.svg;
        }).catch(error => {
            console.error('Error rendering Mermaid diagram:', error);
            diagramContainer.innerHTML = '<p class="text-center text-gray-500">Diagram could not be loaded</p>';
        });
    }
}
*/

// Family Trust Flow Diagram initialization - COMMENTED OUT FOR TESTING
/*
function initializeFamilyTrustDiagram() {
    // Family trust flow diagram definition
    const familyTrustDiagram = `
        flowchart TD
            %% Income Sources
            PaulIncome["👨‍💼 Paul<br/>$265k Income"]
            AnaIncome["👩‍💼 Ana<br/>Support & Management"]
            MahnazSuper["👩‍🦳 Mahnaz<br/>Superannuation"]
            IrajTutoring["👨‍🦳 Iraj<br/>Tutoring Income"]

            %% Property Income Sources
            House1["🏠 Property 1<br/>$30k/year"]
            House2["🏠 Property 2<br/>$30k/year"]
            House3["🏠 Property 3<br/>$30k/year"]
            House4["🏠 Property 4<br/>$30k/year"]
            GrannyFlat["🏡 Granny Flat<br/>$15k/year"]

            %% Central Trust
            Trust["🏛️ FAMILY TRUST<br/>💰 $264k Total<br/>Annual Income"]

            %% Distribution to Family Members
            PaulShare["👨‍💼 Paul<br/>$66k Share"]
            AnaShare["👩‍💼 Ana<br/>$66k Share"]
            MahnazShare["👩‍🦳 Mahnaz<br/>$66k Share"]
            IrajShare["👨‍🦳 Iraj<br/>$66k Share"]

            %% Flow from income sources to trust
            PaulIncome --> Trust
            AnaIncome --> Trust
            MahnazSuper --> Trust
            IrajTutoring --> Trust
            House1 --> Trust
            House2 --> Trust
            House3 --> Trust
            House4 --> Trust
            GrannyFlat --> Trust

            %% Flow from trust to family members
            Trust --> PaulShare
            Trust --> AnaShare
            Trust --> MahnazShare
            Trust --> IrajShare

            %% Styling
            classDef incomeSource fill:#4ade80,stroke:#16a34a,stroke-width:2px,color:#000
            classDef trust fill:#fbbf24,stroke:#f59e0b,stroke-width:4px,color:#000
            classDef distribution fill:#60a5fa,stroke:#3b82f6,stroke-width:2px,color:#000

            class PaulIncome,AnaIncome,MahnazSuper,IrajTutoring,House1,House2,House3,House4,GrannyFlat incomeSource
            class Trust trust
            class PaulShare,AnaShare,MahnazShare,IrajShare distribution
    `;

    // Render the family trust diagram
    const familyTrustContainer = document.getElementById('family-trust-diagram');
    if (familyTrustContainer) {
        mermaid.render('family-trust-flow-diagram', familyTrustDiagram).then(result => {
            familyTrustContainer.innerHTML = result.svg;
        }).catch(error => {
            console.error('Error rendering Family Trust diagram:', error);
            familyTrustContainer.innerHTML = '<p class="text-center text-gray-500">Family Trust diagram could not be loaded</p>';
        });
    }
}
*/

// Add hover effects for tables (moved to main initialization)
function initializeTableHoverEffects() {
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.classList.add('bg-gray-700/50');
        });

        row.addEventListener('mouseleave', function() {
            this.classList.remove('bg-gray-700/50');
        });
    });
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    if (nav) {
        nav.classList.toggle('hidden');
    }
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Add some visual feedback for interactive elements (moved to main initialization)
function initializeVisualEffects() {
    // Always-on pulse for key numbers
    const importantNumbers = document.querySelectorAll('.counter, .big-number, .text-6xl, .text-7xl');
    importantNumbers.forEach(number => {
        number.classList.add('animate-pulse');
    });
}

// Wealth Growth Chart
let currentChartView = 'solo';

function initializeWealthChart() {
    const chartContainer = document.getElementById('wealth-chart');
    if (!chartContainer) return;

    // Initialize chart buttons
    const soloBtn = document.getElementById('chartSoloBtn');
    const togetherBtn = document.getElementById('chartTogetherBtn');
    const bothBtn = document.getElementById('chartBothBtn');

    if (soloBtn && togetherBtn && bothBtn) {
        soloBtn.addEventListener('click', () => switchChartView('solo'));
        togetherBtn.addEventListener('click', () => switchChartView('together'));
        bothBtn.addEventListener('click', () => switchChartView('both'));
    }

    // Render initial chart
    renderWealthChart();

    // Add resize listener for responsive chart
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderWealthChart();
        }, 250);
    });
}

function switchChartView(view) {
    currentChartView = view;

    // Update button states
    const soloBtn = document.getElementById('chartSoloBtn');
    const togetherBtn = document.getElementById('chartTogetherBtn');
    const bothBtn = document.getElementById('chartBothBtn');

    // Reset all buttons
    [soloBtn, togetherBtn, bothBtn].forEach(btn => {
        btn.classList.remove('bg-red-500', 'bg-green-500', 'bg-purple-500', 'text-white');
        btn.classList.add('text-gray-400');
    });

    // Highlight active button
    if (view === 'solo') {
        soloBtn.classList.add('bg-red-500', 'text-white');
        soloBtn.classList.remove('text-gray-400');
    } else if (view === 'together') {
        togetherBtn.classList.add('bg-green-500', 'text-white');
        togetherBtn.classList.remove('text-gray-400');
    } else if (view === 'both') {
        bothBtn.classList.add('bg-purple-500', 'text-white');
        bothBtn.classList.remove('text-gray-400');
    }

    renderWealthChart();
}

function renderWealthChart() {
    const chartContainer = document.getElementById('wealth-chart');
    if (!chartContainer) return;

    // Clear existing content
    chartContainer.innerHTML = '';

    // Chart dimensions - responsive margins for smaller screens
    const containerWidth = chartContainer.offsetWidth;
    const isSmallScreen = containerWidth < 600;

    const margin = {
        top: 40,
        right: isSmallScreen ? 50 : 100,
        bottom: 80,
        left: isSmallScreen ? 60 : 100
    };

    // Ensure minimum width and prevent overflow
    const width = Math.max(300, containerWidth - margin.left - margin.right);
    const height = 450 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select('#wealth-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Generate data
    const soloData = generateSoloData();
    const togetherData = generateTogetherData();

    // Determine max value for scale
    let maxValue = 0;
    if (currentChartView === 'solo') {
        maxValue = d3.max(soloData, d => d.netWorth);
    } else if (currentChartView === 'together') {
        maxValue = d3.max(togetherData, d => d.netWorth);
    } else {
        maxValue = Math.max(d3.max(soloData, d => d.netWorth), d3.max(togetherData, d => d.netWorth));
    }

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, 25])
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain([0, maxValue * 1.1])
        .range([height, 0]);

    // Add grid
    g.selectAll('.grid-line-x')
        .data(xScale.ticks(10))
        .enter()
        .append('line')
        .attr('x1', d => xScale(d))
        .attr('x2', d => xScale(d))
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 0.5);

    g.selectAll('.grid-line-y')
        .data(yScale.ticks(8))
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', d => yScale(d))
        .attr('y2', d => yScale(d))
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 0.5);

    // Add axes with better formatting
    const xAxis = g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale)
            .tickValues([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24])
            .tickFormat(d => d === 0 ? 'Today' : `${d} years`));

    // Style x-axis
    xAxis.selectAll('text')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#374151');

    xAxis.append('text')
        .attr('x', width / 2)
        .attr('y', 50)
        .attr('fill', '#374151')
        .style('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .text('Years from Today');

    const yAxis = g.append('g')
        .call(d3.axisLeft(yScale)
            .tickValues([0, 1000000, 2000000, 3000000, 5000000, 8000000, 12000000, 16000000, 20000000])
            .tickFormat(d => {
                if (d === 0) return '$0';
                if (d < 1000000) return `$${(d/1000).toFixed(0)}k`;
                return `$${(d/1000000).toFixed(1)}M`;
            }));

    // Style y-axis
    yAxis.selectAll('text')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#374151');

    yAxis.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -70)
        .attr('x', -height / 2)
        .attr('fill', '#374151')
        .style('text-anchor', 'middle')
        .style('font-size', '18px')
        .style('font-weight', 'bold')
        .text('Total Net Worth');

    // Line generators
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.netWorth))
        .curve(d3.curveMonotoneX);

    // Draw lines based on current view
    if (currentChartView === 'solo' || currentChartView === 'both') {
        g.append('path')
            .datum(soloData)
            .attr('fill', 'none')
            .attr('stroke', '#EF4444')
            .attr('stroke-width', 4)
            .attr('stroke-dasharray', currentChartView === 'both' ? '5,5' : 'none')
            .attr('d', line);
    }

    if (currentChartView === 'together' || currentChartView === 'both') {
        g.append('path')
            .datum(togetherData)
            .attr('fill', 'none')
            .attr('stroke', '#10B981')
            .attr('stroke-width', 4)
            .attr('d', line);
    }

    // Add 2-year milestone dots and annotations
    const milestoneYears = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

    if (currentChartView === 'solo' || currentChartView === 'both') {
        milestoneYears.forEach(year => {
            const dataPoint = soloData.find(d => d.year === year);
            if (dataPoint) {
                // Add milestone dot
                g.append('circle')
                    .attr('cx', xScale(year))
                    .attr('cy', yScale(dataPoint.netWorth))
                    .attr('r', 6)
                    .attr('fill', '#EF4444')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2);

                // Add savings/loss annotation every 4 years
                if (year % 4 === 0) {
                    const cumulativeLoss = (3100000 - dataPoint.netWorth);
                    g.append('text')
                        .attr('x', xScale(year))
                        .attr('y', yScale(dataPoint.netWorth) - 15)
                        .attr('text-anchor', 'middle')
                        .attr('fill', '#EF4444')
                        .style('font-size', '12px')
                        .style('font-weight', 'bold')
                        .text(`-$${(cumulativeLoss/1000000).toFixed(1)}M`);
                }
            }
        });
    }

    if (currentChartView === 'together' || currentChartView === 'both') {
        milestoneYears.forEach(year => {
            const dataPoint = togetherData.find(d => d.year === year);
            if (dataPoint) {
                // Add milestone dot
                g.append('circle')
                    .attr('cx', xScale(year))
                    .attr('cy', yScale(dataPoint.netWorth))
                    .attr('r', 6)
                    .attr('fill', '#10B981')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2);

                // Add wealth gain annotation every 4 years
                if (year % 4 === 0) {
                    const cumulativeGain = (dataPoint.netWorth - 3100000);
                    g.append('text')
                        .attr('x', xScale(year))
                        .attr('y', yScale(dataPoint.netWorth) + 20)
                        .attr('text-anchor', 'middle')
                        .attr('fill', '#10B981')
                        .style('font-size', '12px')
                        .style('font-weight', 'bold')
                        .text(`+$${(cumulativeGain/1000000).toFixed(1)}M`);
                }
            }
        });
    }

    // Add dramatic annotations
    if (currentChartView === 'solo') {
        // Add "STUCK FOREVER" annotation
        g.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2)
            .attr('text-anchor', 'middle')
            .attr('fill', '#EF4444')
            .style('font-size', '24px')
            .style('font-weight', 'bold')
            .text('😰 WEALTH DESTRUCTION');

        g.append('text')
            .attr('x', width / 2)
            .attr('y', height / 2 + 30)
            .attr('text-anchor', 'middle')
            .attr('fill', '#666')
            .style('font-size', '16px')
            .text('Net worth actually DECREASES over time');
    }

    if (currentChartView === 'together') {
        // Add "EXPONENTIAL GROWTH" annotation
        const finalValue = togetherData[togetherData.length - 1];
        g.append('text')
            .attr('x', xScale(finalValue.year) - 100)
            .attr('y', yScale(finalValue.netWorth) - 30)
            .attr('text-anchor', 'middle')
            .attr('fill', '#10B981')
            .style('font-size', '20px')
            .style('font-weight', 'bold')
            .text('🚀 WEALTH EMPIRE!');

        g.append('text')
            .attr('x', xScale(finalValue.year) - 100)
            .attr('y', yScale(finalValue.netWorth) - 10)
            .attr('text-anchor', 'middle')
            .attr('fill', '#10B981')
            .style('font-size', '14px')
            .text(`$${(finalValue.netWorth/1000000).toFixed(1)}M Net Worth`);
    }

    // Add legend and comparison annotations
    if (currentChartView === 'both') {
        const legend = g.append('g')
            .attr('transform', `translate(${width - 220}, 20)`);

        legend.append('line')
            .attr('x1', 0)
            .attr('x2', 30)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('stroke', '#EF4444')
            .attr('stroke-width', 4)
            .attr('stroke-dasharray', '5,5');

        legend.append('text')
            .attr('x', 35)
            .attr('y', 5)
            .attr('fill', '#374151')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .text('😰 Flying Solo');

        legend.append('line')
            .attr('x1', 0)
            .attr('x2', 30)
            .attr('y1', 25)
            .attr('y2', 25)
            .attr('stroke', '#10B981')
            .attr('stroke-width', 4);

        legend.append('text')
            .attr('x', 35)
            .attr('y', 30)
            .attr('fill', '#374151')
            .style('font-size', '14px')
            .style('font-weight', 'bold')
            .text('🚀 Working Together');

        // Add comparison annotations at key milestones
        const comparisonYears = [10, 20];
        comparisonYears.forEach(year => {
            const soloPoint = soloData.find(d => d.year === year);
            const togetherPoint = togetherData.find(d => d.year === year);

            if (soloPoint && togetherPoint) {
                const difference = togetherPoint.netWorth - soloPoint.netWorth;
                const midY = (yScale(soloPoint.netWorth) + yScale(togetherPoint.netWorth)) / 2;

                // Add difference annotation
                g.append('text')
                    .attr('x', xScale(year) + 20)
                    .attr('y', midY)
                    .attr('text-anchor', 'start')
                    .attr('fill', '#8B5CF6')
                    .style('font-size', '14px')
                    .style('font-weight', 'bold')
                    .text(`${year} yr difference:`);

                g.append('text')
                    .attr('x', xScale(year) + 20)
                    .attr('y', midY + 18)
                    .attr('text-anchor', 'start')
                    .attr('fill', '#8B5CF6')
                    .style('font-size', '16px')
                    .style('font-weight', 'bold')
                    .text(`$${(difference/1000000).toFixed(1)}M`);

                // Add connecting line
                g.append('line')
                    .attr('x1', xScale(year))
                    .attr('x2', xScale(year))
                    .attr('y1', yScale(soloPoint.netWorth))
                    .attr('y2', yScale(togetherPoint.netWorth))
                    .attr('stroke', '#8B5CF6')
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '3,3');
            }
        });

        // Add final comparison at year 25
        const finalSolo = soloData[soloData.length - 1];
        const finalTogether = togetherData[togetherData.length - 1];
        const finalDifference = finalTogether.netWorth - finalSolo.netWorth;
        const multiplier = finalTogether.netWorth / finalSolo.netWorth;

        g.append('text')
            .attr('x', width / 2)
            .attr('y', 30)
            .attr('text-anchor', 'middle')
            .attr('fill', '#8B5CF6')
            .style('font-size', '18px')
            .style('font-weight', 'bold')
            .text(`Final Difference: $${(finalDifference/1000000).toFixed(1)}M (${multiplier.toFixed(0)}x more wealth!)`);
    }
}

// Generate data for "Flying Solo" scenario - based on actual numbers from kickoff-prompt.md
function generateSoloData() {
    const data = [];

    // Starting position: Current property values minus debts
    let netWorth = 5200000 - 2199000; // $5.2M properties - $2.199M debt = $3.001M
    let annualLeftOver = 78848; // From the "Flying Solo" table in kickoff-prompt.md
    let annualBankFees = 144000; // Paying $144k/year to banks forever

    for (let year = 0; year <= 25; year++) {
        // Add minimal savings each year
        netWorth += annualLeftOver;

        // Subtract bank fees (money lost forever)
        netWorth -= annualBankFees;

        // Property depreciation (2% per year as mentioned in prompt)
        if (year > 0) {
            netWorth *= 0.98;
        }

        // Iraj's tutoring income disappears due to AI (year 3)
        if (year === 3) {
            annualLeftOver -= 15000; // Lost tutoring income
        }

        // Paul's income at risk from AI (reduce after year 5)
        if (year === 5) {
            annualLeftOver = Math.max(annualLeftOver - 30000, 20000);
        }

        // Major financial setbacks (health, job loss, etc.)
        if (year === 8) {
            netWorth = Math.max(netWorth - 100000, 0); // Health emergency
        }

        // Mahnaz's super runs out due to inflation (year 10, not 20!)
        if (year === 10) {
            annualLeftOver -= 10000; // Family has to support Mahnaz earlier
        }

        // Paul's job lost to AI replacement
        if (year === 12) {
            annualLeftOver = Math.max(annualLeftOver - 50000, 10000); // Major income loss
            netWorth = Math.max(netWorth - 200000, 0); // Emergency fund depletion
        }

        // Inflation erodes purchasing power
        if (year > 3) {
            annualLeftOver = Math.max(annualLeftOver - 1000, 10000);
        }

        data.push({
            year: year,
            netWorth: Math.max(netWorth, 0) // Can't go negative
        });
    }

    return data;
}

// Generate data for "Working Together" scenario - based on actual numbers from kickoff-prompt.md
function generateTogetherData() {
    const data = [];

    // Starting position after debt payoff strategy
    let netWorth = 3100000; // $3.1M property values after paying off $1.6M debt
    let annualCashFlow = 246230; // From "Working Together" table in kickoff-prompt.md
    let annualBankFees = 14328; // Only $1,194/month = $14,328/year (down from $144k)
    let propertyCount = 3; // 75 Peter, 73 Willow, 122 Maitland

    for (let year = 0; year <= 25; year++) {
        // Add annual cash flow (after all expenses)
        netWorth += annualCashFlow;

        // Subtract minimal remaining bank fees
        netWorth -= annualBankFees;

        // Granny flat construction and income (year 2 as mentioned)
        if (year === 2) {
            // Paul gets $115k-150k available, build granny flat
            netWorth += 150000; // Granny flat construction cost
            annualCashFlow += 30000; // $30k additional rental income
            propertyCount += 0.5; // Half a property equivalent
        }

        // Buy new property every 4 years with cash (no debt!)
        if (year > 2 && (year - 2) % 4 === 0) {
            propertyCount++;
            // Buy property for $700k cash, generates $30k income
            netWorth += 700000;
            annualCashFlow += 30000;
            // Use some cash flow for purchase, but no debt servicing
            annualCashFlow -= 10000; // Maintenance/management costs
        }

        // Property appreciation (conservative 3% per year)
        if (year > 0) {
            netWorth *= 1.03;
        }

        // Compound growth from reinvesting cash flow
        if (year > 5) {
            // Start investing excess cash flow in additional properties/improvements
            let excessCash = Math.max(annualCashFlow - 200000, 0); // Keep $200k for lifestyle
            netWorth += excessCash * 0.5; // Invest half of excess
        }

        // Paul's job becomes optional after year 3 (as mentioned in bonus section)
        if (year === 3) {
            // Even if Paul stops working, rental income covers everything
            // This shows true financial independence
        }

        data.push({
            year: year,
            netWorth: netWorth,
            annualIncome: annualCashFlow,
            propertyCount: propertyCount
        });
    }

    return data;
}

// Apartment Cost Calculator for Mahnaz
function initializeApartmentCalculator() {
    const apartmentSlider = document.getElementById('apartmentSlider');
    const superSlider = document.getElementById('superSlider');

    if (!apartmentSlider) return;

    // All expense sliders
    const expenseSliders = [
        'groceriesSlider', 'councilSlider', 'utilitiesSlider', 'bodycorpSlider',
        'insuranceSlider', 'phoneSlider', 'medicalSlider', 'transportSlider'
    ];

    // Load saved values and set sliders
    apartmentSlider.value = loadSliderState('apartmentSlider', 400000);
    if (superSlider) {
        superSlider.value = loadSliderState('superSlider', 200000);
    }

    expenseSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            const defaultValues = {
                'groceriesSlider': 400,
                'councilSlider': 200,
                'utilitiesSlider': 150,
                'bodycorpSlider': 300,
                'insuranceSlider': 100,
                'phoneSlider': 80,
                'medicalSlider': 200,
                'transportSlider': 150
            };
            slider.value = loadSliderState(sliderId, defaultValues[sliderId]);
        }
    });

    // Update display when apartment slider changes
    apartmentSlider.addEventListener('input', function() {
        saveSliderState('apartmentSlider', this.value);
        updateApartmentCalculation();
    });

    // Update display when super slider changes
    if (superSlider) {
        superSlider.addEventListener('input', function() {
            saveSliderState('superSlider', this.value);
            document.getElementById('superAmount').textContent = formatCurrency(parseInt(this.value));
            updateApartmentCalculation();
        });
    }

    // Add event listeners to all expense sliders
    expenseSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.addEventListener('input', function() {
                saveSliderState(sliderId, this.value);
                updateExpenseDisplay(sliderId, parseInt(this.value));
                updateApartmentCalculation();
            });
        }
    });

    // Initialize display values to match loaded slider values
    if (superSlider) {
        document.getElementById('superAmount').textContent = formatCurrency(parseInt(superSlider.value));
    }

    // Initialize apartment cost display
    const apartmentCostValue = parseInt(apartmentSlider.value);
    document.getElementById('apartmentCost').textContent = apartmentCostValue === 0 ? 'Renting' : formatCurrency(apartmentCostValue);

    // Initialize all expense slider displays
    expenseSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            updateExpenseDisplay(sliderId, parseInt(slider.value));
        }
    });

    // Initialize with saved/default values
    updateApartmentCalculation();
}

function updateApartmentCalculation() {
    const houseSaleProceeds = 1530000; // $2M house - $400k debt - $70k fees
    const yearsToLast = 20;

    // Get current slider values
    const apartmentCost = parseInt(document.getElementById('apartmentSlider').value);
    const superAmount = parseInt(document.getElementById('superSlider')?.value || 200000);

    // Calculate monthly basics from all expense sliders
    const monthlyBasics = calculateMonthlyBasics();

    // Calculate remaining money
    const leftoverFromSale = houseSaleProceeds - apartmentCost;
    const totalAvailable = leftoverFromSale + superAmount;
    const yearlyBudget = totalAvailable / yearsToLast;
    const monthlyBudget = yearlyBudget / 12;
    const monthlyLeftover = monthlyBudget - monthlyBasics;

    // Update display elements
    document.getElementById('apartmentCost').textContent = apartmentCost === 0 ? 'Renting' : formatCurrency(apartmentCost);
    document.getElementById('apartmentCostText').textContent = apartmentCost === 0 ? 'Renting (no purchase)' : `$${(apartmentCost/1000)}k for apartment`;
    document.getElementById('leftoverText').textContent = `$${(leftoverFromSale/1000)}k left`;
    document.getElementById('superText').textContent = `$${(superAmount/1000)}k super`;
    document.getElementById('totalText').textContent = `$${(totalAvailable/1000)}k total`;
    document.getElementById('yearlyText').textContent = `$${(totalAvailable/1000)}k ÷ 20 years = $${Math.round(yearlyBudget/1000)}k/year`;
    document.getElementById('monthlyText').textContent = `$${Math.round(monthlyBudget)}/month`;
    document.getElementById('totalBasics').textContent = `$${monthlyBasics}`;
    document.getElementById('leftoverMonthly').textContent = `$${Math.round(monthlyLeftover)}`;

    // Update status message based on monthly leftover
    updateFinancialStatus(monthlyLeftover, apartmentCost);
}

function calculateMonthlyBasics() {
    const expenses = [
        'groceriesSlider', 'councilSlider', 'utilitiesSlider', 'bodycorpSlider',
        'insuranceSlider', 'phoneSlider', 'medicalSlider', 'transportSlider'
    ];

    let total = 0;
    expenses.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            total += parseInt(slider.value);
        }
    });

    return total;
}

function updateExpenseDisplay(sliderId, value) {
    const valueId = sliderId.replace('Slider', 'Value');
    const element = document.getElementById(valueId);
    if (element) {
        element.textContent = `$${value}`;
    }
}

function updateFinancialStatus(monthlyLeftover, apartmentCost) {
    const statusElement = document.getElementById('financialStatus');
    let message = '';
    let bgColor = '';
    let borderColor = '';
    let textColor = '';

    if (monthlyLeftover < 0) {
        message = "💸 You're completely broke! Can't even afford basic living expenses. Family will have to support everything.";
        bgColor = 'bg-red-600/40';
        borderColor = 'border-red-500';
        textColor = 'text-red-300';
    } else if (monthlyLeftover < 200) {
        message = "😰 You're essentially broke. No money for gifts, dining out, or any emergencies. Completely dependent on family.";
        bgColor = 'bg-red-500/30';
        borderColor = 'border-red-500';
        textColor = 'text-red-300';
    } else if (monthlyLeftover < 500) {
        message = "😬 You can barely survive. Maybe one small gift per year for grandkids. No Queensland trips without family paying.";
        bgColor = 'bg-orange-500/30';
        borderColor = 'border-orange-500';
        textColor = 'text-orange-300';
    } else if (monthlyLeftover < 800) {
        message = "😐 You have some spending money, but still can't afford Queensland trips or any real luxuries. Very limited lifestyle.";
        bgColor = 'bg-yellow-500/30';
        borderColor = 'border-yellow-500';
        textColor = 'text-yellow-300';
    } else if (monthlyLeftover < 1200) {
        message = "🙂 You can afford some small luxuries and maybe one Queensland trip per year if you save up. Still quite limited.";
        bgColor = 'bg-blue-500/30';
        borderColor = 'border-blue-500';
        textColor = 'text-blue-300';
    } else {
        message = "😊 You have decent spending money! But this cheap apartment can't host family or grandkids properly.";
        bgColor = 'bg-green-500/30';
        borderColor = 'border-green-500';
        textColor = 'text-green-300';
    }

    statusElement.className = `${bgColor} rounded-lg p-4 mb-4 border-2 ${borderColor}`;
    statusElement.innerHTML = `<p class="text-xl font-bold ${textColor}">${message}</p>`;
}

// Iraj's Financial Calculator
function initializeIrajCalculator() {
    const propertySlider = document.getElementById('irajPropertySlider');
    const superSlider = document.getElementById('irajSuperSlider');
    const tutoringSlider = document.getElementById('irajTutoringSlider');

    if (!propertySlider) return;

    // All expense sliders for Iraj
    const expenseSliders = [
        'irajFoodSlider', 'irajCouncilSlider', 'irajUtilitiesSlider', 'irajBodycorpSlider',
        'irajInsuranceSlider', 'irajPhoneSlider', 'irajMedicalSlider', 'irajTransportSlider'
    ];

    // Load saved values and set sliders
    propertySlider.value = loadSliderState('irajPropertySlider', 400000);
    if (superSlider) {
        superSlider.value = loadSliderState('irajSuperSlider', 25000);
    }
    if (tutoringSlider) {
        tutoringSlider.value = loadSliderState('irajTutoringSlider', 960);
    }

    expenseSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            const defaultValues = {
                'irajFoodSlider': 400,
                'irajCouncilSlider': 200,
                'irajUtilitiesSlider': 150,
                'irajBodycorpSlider': 300,
                'irajInsuranceSlider': 100,
                'irajPhoneSlider': 80,
                'irajMedicalSlider': 200,
                'irajTransportSlider': 150
            };
            slider.value = loadSliderState(sliderId, defaultValues[sliderId]);
        }
    });

    // Update display when property slider changes
    propertySlider.addEventListener('input', function() {
        saveSliderState('irajPropertySlider', this.value);
        updateIrajCalculation();
    });

    // Update display when super slider changes
    if (superSlider) {
        superSlider.addEventListener('input', function() {
            saveSliderState('irajSuperSlider', this.value);
            document.getElementById('irajSuperAmount').textContent = formatCurrency(parseInt(this.value));
            updateIrajCalculation();
        });
    }

    // Update display when tutoring slider changes
    if (tutoringSlider) {
        tutoringSlider.addEventListener('input', function() {
            const tutoringValue = parseInt(this.value);
            saveSliderState('irajTutoringSlider', this.value);
            document.getElementById('irajTutoringValue').textContent = `$${tutoringValue}`;

            // Show/hide AI warning based on tutoring income
            const aiWarning = document.getElementById('aiWarning');
            if (aiWarning) {
                aiWarning.style.display = tutoringValue > 0 ? 'block' : 'none';
            }

            updateIrajCalculation();
        });
    }

    // Add event listeners to all expense sliders
    expenseSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            slider.addEventListener('input', function() {
                saveSliderState(sliderId, this.value);
                updateIrajExpenseDisplay(sliderId, parseInt(this.value));
                updateIrajCalculation();
            });
        }
    });

    // Initialize display values to match loaded slider values
    if (superSlider) {
        document.getElementById('irajSuperAmount').textContent = formatCurrency(parseInt(superSlider.value));
    }
    if (tutoringSlider) {
        const tutoringValue = parseInt(tutoringSlider.value);
        document.getElementById('irajTutoringValue').textContent = `$${tutoringValue}`;

        // Show/hide AI warning based on tutoring income
        const aiWarning = document.getElementById('aiWarning');
        if (aiWarning) {
            aiWarning.style.display = tutoringValue > 0 ? 'block' : 'none';
        }
    }

    // Initialize property cost display
    const propertyCostValue = parseInt(propertySlider.value);
    document.getElementById('irajPropertyCost').textContent = propertyCostValue === 0 ? 'Renting' : formatCurrency(propertyCostValue);

    // Initialize all expense slider displays
    expenseSliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            updateIrajExpenseDisplay(sliderId, parseInt(slider.value));
        }
    });

    // Initialize with saved/default values
    updateIrajCalculation();
}

function updateIrajCalculation() {
    const houseSaleProceeds = 1530000; // $2M house - $400k debt - $70k fees
    const depositReturn = 60000;
    const totalAvailable = houseSaleProceeds + depositReturn;
    const yearsToLast = 20;
    const pensionIncome = 2200; // Fixed monthly pension

    // Get current slider values
    const propertyCost = parseInt(document.getElementById('irajPropertySlider').value);
    const superAmount = parseInt(document.getElementById('irajSuperSlider')?.value || 25000);
    const tutoringIncome = parseInt(document.getElementById('irajTutoringSlider')?.value || 960);

    // Calculate monthly basics from all expense sliders
    const monthlyBasics = calculateIrajMonthlyBasics();

    // Calculate remaining money after property purchase
    const leftoverFromSale = totalAvailable - propertyCost;
    const totalSavings = leftoverFromSale + superAmount;
    const yearlyFromSavings = totalSavings / yearsToLast;
    const monthlyFromSavings = yearlyFromSavings / 12;

    // Total monthly income
    const totalMonthlyIncome = pensionIncome + tutoringIncome + monthlyFromSavings;
    const monthlyLeftover = totalMonthlyIncome - monthlyBasics;

    // Calculate yearly totals for the Available Funds section
    const yearlyPension = pensionIncome * 12;
    const totalMonthlyIncomeFromPensionAndSavings = (yearlyPension + yearlyFromSavings) / 12;

    // Update display elements
    document.getElementById('irajPropertyCost').textContent = propertyCost === 0 ? 'Renting' : formatCurrency(propertyCost);
    document.getElementById('irajLeftoverText').textContent = `$${(leftoverFromSale/1000)}k left after property`;
    document.getElementById('irajSuperText').textContent = `$${(superAmount/1000)}k super`;
    document.getElementById('irajTotalText').textContent = `$${(totalSavings/1000)}k total savings`;

    // Update the new Available Funds elements
    document.getElementById('irajTotalMonthlyIncome').textContent = `$${Math.round(totalMonthlyIncomeFromPensionAndSavings).toLocaleString()}/month total income`;

    document.getElementById('irajTotalBasics').textContent = `$${monthlyBasics}`;
    document.getElementById('irajLeftoverMonthly').textContent = `$${Math.round(monthlyLeftover)}`;

    // Update status message based on monthly leftover and tutoring income
    updateIrajFinancialStatus(monthlyLeftover, tutoringIncome, propertyCost);
}

function calculateIrajMonthlyBasics() {
    const expenses = [
        'irajFoodSlider', 'irajCouncilSlider', 'irajUtilitiesSlider', 'irajBodycorpSlider',
        'irajInsuranceSlider', 'irajPhoneSlider', 'irajMedicalSlider', 'irajTransportSlider'
    ];

    let total = 0;
    expenses.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        if (slider) {
            total += parseInt(slider.value);
        }
    });

    return total;
}

function updateIrajExpenseDisplay(sliderId, value) {
    const valueId = sliderId.replace('Slider', 'Value');
    const element = document.getElementById(valueId);
    if (element) {
        element.textContent = `$${value}`;
    }
}

function updateIrajFinancialStatus(monthlyLeftover, tutoringIncome, propertyCost) {
    const statusElement = document.getElementById('irajFinancialStatus');
    let message = '';
    let bgColor = '';
    let borderColor = '';
    let textColor = '';

    // Consider the impact of tutoring income loss
    const monthlyLeftoverWithoutTutoring = monthlyLeftover - tutoringIncome;

    if (tutoringIncome > 0) {
        // Still has tutoring income
        if (monthlyLeftover > 2000) {
            message = `💰 You're very comfortable now with $${Math.round(monthlyLeftover)}/month leftover. But when AI eliminates tutoring (-$${tutoringIncome}/month), you'll only have $${Math.round(monthlyLeftoverWithoutTutoring)}/month!`;
            bgColor = 'bg-yellow-500/30';
            borderColor = 'border-yellow-500';
            textColor = 'text-yellow-300';
        } else if (monthlyLeftover > 1000) {
            message = `😐 You're doing okay now, but when tutoring income disappears, you'll struggle with only $${Math.round(monthlyLeftoverWithoutTutoring)}/month leftover.`;
            bgColor = 'bg-orange-500/30';
            borderColor = 'border-orange-500';
            textColor = 'text-orange-300';
        } else {
            message = `😬 You're already tight with money. When AI eliminates tutoring, you'll be in serious trouble!`;
            bgColor = 'bg-red-500/30';
            borderColor = 'border-red-500';
            textColor = 'text-red-300';
        }
    } else {
        // No tutoring income (AI has taken over)
        if (monthlyLeftoverWithoutTutoring < 0) {
            message = "💸 You're broke! Can't afford basic living expenses without family support.";
            bgColor = 'bg-red-600/40';
            borderColor = 'border-red-500';
            textColor = 'text-red-300';
        } else if (monthlyLeftoverWithoutTutoring < 500) {
            message = "😰 You're struggling financially. Very limited lifestyle, dependent on family for extras.";
            bgColor = 'bg-red-500/30';
            borderColor = 'border-red-500';
            textColor = 'text-red-300';
        } else if (monthlyLeftoverWithoutTutoring < 1000) {
            message = "😬 You can survive but with a very basic lifestyle. No luxuries or Queensland trips.";
            bgColor = 'bg-orange-500/30';
            borderColor = 'border-orange-500';
            textColor = 'text-orange-300';
        } else {
            message = `🙂 You're managing okay with $${Math.round(monthlyLeftoverWithoutTutoring)}/month, but lifestyle is still quite limited.`;
            bgColor = 'bg-blue-500/30';
            borderColor = 'border-blue-500';
            textColor = 'text-blue-300';
        }
    }

    // Add property context
    if (propertyCost === 0) {
        message += " (Renting gives you more cash but no asset building.)";
    } else if (propertyCost < 300000) {
        message += " (Cheap property = more cash but poor quality/location.)";
    } else {
        message += " (Decent property but less available cash.)";
    }

    statusElement.className = `${bgColor} rounded-lg p-4 mb-4 border-2 ${borderColor}`;
    statusElement.innerHTML = `<p class="text-xl font-bold ${textColor}">${message}</p>`;
}

// Dynamic Background Color Evolution with Catppuccin Palette
function initializeDynamicBackground() {
    // Sophisticated color schemes using Catppuccin Mocha palette
    const colorSchemes = {
        'hero-section': {
            primary: '#f38ba8',    // Catppuccin Red - stop banks
            secondary: '#a6e3a1',  // Catppuccin Green - start earning
            accent: '#fab387'      // Catppuccin Peach - urgency
        },
        'problem-section': {
            primary: '#8b0000',    // Dark Red - approaching void
            secondary: '#4a0000',  // Darker Red - financial drain
            accent: '#2d0000'      // Almost Black - the void approaches
        },
        'solution-section': {
            primary: '#a6e3a1',    // Catppuccin Green - growth
            secondary: '#94e2d5',  // Catppuccin Teal - fresh start
            accent: '#89dceb'      // Catppuccin Sky - clarity
        },
        'paul-message-section': {
            primary: '#cba6f7',    // Catppuccin Mauve - personal
            secondary: '#89b4fa',  // Catppuccin Blue - trust
            accent: '#b4befe'      // Catppuccin Lavender - hope
        },
        'lifestyle-section': {
            primary: '#cba6f7',    // Catppuccin Mauve - luxury
            secondary: '#f5c2e7',  // Catppuccin Pink - joy
            accent: '#89dceb'      // Catppuccin Sky - freedom
        },
        'how-it-works-section': {
            primary: '#89b4fa',    // Catppuccin Blue - process
            secondary: '#74c7ec',  // Catppuccin Sapphire - clarity
            accent: '#94e2d5'      // Catppuccin Teal - sophistication
        },
        'final-choice-section': {
            primary: '#fab387',    // Catppuccin Peach - decision time
            secondary: '#f38ba8',  // Catppuccin Red - urgency
            accent: '#a6e3a1'      // Catppuccin Green - opportunity
        },
        'family-trust-section': {
            primary: '#f9e2af',    // Catppuccin Yellow - wealth
            secondary: '#cba6f7',  // Catppuccin Mauve - luxury
            accent: '#89b4fa'      // Catppuccin Blue - trust/stability
        }
    };

    // Set up intersection observer for smoother section detection
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                const sectionId = entry.target.id;
                const colorScheme = colorSchemes[sectionId];

                if (colorScheme) {
                    updateBackgroundColors(colorScheme);

                    // Special handling for problem section (black hole zone)
                    if (sectionId === 'problem-section') {
                        // Darken orbs significantly for black hole effect
                        const root = document.documentElement;
                        root.style.setProperty('--orb-opacity', '0.2');
                    } else {
                        // Restore normal orb opacity for other sections
                        const root = document.documentElement;
                        root.style.setProperty('--orb-opacity', '0.4');
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all main sections
    Object.keys(colorSchemes).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            observer.observe(section);
        }
    });

    // Add parallax effect to orbs
    initializeParallaxEffects();
}

function initializeParallaxEffects() {
    const orbs = document.querySelectorAll('.background-orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        orbs.forEach((orb, index) => {
            // Different parallax speeds for each orb
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollY * speed);
            const xPos = Math.sin(scrollY * 0.001 + index) * 20;

            orb.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${1 + Math.sin(scrollY * 0.002 + index) * 0.1})`;
        });
    });
}

function updateBackgroundColors(colorScheme) {
    const root = document.documentElement;

    // Update CSS custom properties with smooth transition
    root.style.setProperty('--orb-primary', colorScheme.primary);
    root.style.setProperty('--orb-secondary', colorScheme.secondary);
    root.style.setProperty('--orb-accent', colorScheme.accent);
}


