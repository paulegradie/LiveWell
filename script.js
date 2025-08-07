// Financial Strategy Planning - Interactive JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProgressBar();
    initializeAnimations();
    initializeComparison();
    initializeMermaidDiagram();
    initializeCounters();
    initializeWealthChart();

    initializeTableHoverEffects();
    initializeVisualEffects();
    initializeApartmentCalculator();
});

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

// Mermaid diagram initialization
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
    // Add pulse animation to important numbers
    const importantNumbers = document.querySelectorAll('.text-6xl, .text-7xl');
    importantNumbers.forEach(number => {
        number.addEventListener('mouseenter', function() {
            this.classList.add('animate-pulse');
        });

        number.addEventListener('mouseleave', function() {
            this.classList.remove('animate-pulse');
        });
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

    // Chart dimensions
    const margin = { top: 40, right: 100, bottom: 80, left: 100 };
    const width = chartContainer.offsetWidth - margin.left - margin.right;
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
    const slider = document.getElementById('apartmentSlider');
    if (!slider) return;

    // Update display when slider changes
    slider.addEventListener('input', function() {
        updateApartmentCalculation(parseInt(this.value));
    });

    // Initialize with default value
    updateApartmentCalculation(400000);
}

function updateApartmentCalculation(apartmentCost) {
    const houseSaleProceeds = 800000;
    const superAmount = 200000;
    const yearsToLast = 20;
    const monthlyBasics = 1730;

    // Calculate remaining money
    const leftoverFromSale = houseSaleProceeds - apartmentCost;
    const totalAvailable = leftoverFromSale + superAmount;
    const yearlyBudget = totalAvailable / yearsToLast;
    const monthlyBudget = yearlyBudget / 12;
    const monthlyLeftover = monthlyBudget - monthlyBasics;

    // Update display elements
    document.getElementById('apartmentCost').textContent = formatCurrency(apartmentCost);
    document.getElementById('apartmentCostText').textContent = `$${(apartmentCost/1000)}k for apartment`;
    document.getElementById('leftoverText').textContent = `$${(leftoverFromSale/1000)}k left`;
    document.getElementById('totalText').textContent = `$${(totalAvailable/1000)}k total`;
    document.getElementById('yearlyText').textContent = `$${(totalAvailable/1000)}k ÷ 20 years = $${Math.round(yearlyBudget/1000)}k/year`;
    document.getElementById('monthlyText').textContent = `$${Math.round(monthlyBudget)}/month`;
    document.getElementById('leftoverMonthly').textContent = `$${Math.round(monthlyLeftover)}/month left`;

    // Update status message based on monthly leftover
    updateFinancialStatus(monthlyLeftover, apartmentCost);
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
