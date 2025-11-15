// ========================================
// DATA STORAGE & CONFIGURATION
// ========================================

/**
 * Array to store all student/member objects
 * Each student object contains: id, name, tier, amount, etc.
 */
let students = [];

/**
 * Current week number - starts at 1
 * Increments when "Advance Week" button is clicked
 */
let currentWeek = 1;

/**
 * Maximum number of members allowed in the savings group
 */
const MAX_MEMBERS = 12;

/**
 * Tier configuration object
 * Defines the amount and interest rate for each tier
 */
const tiers = {
    1: {
        amount: 10000,      // ₦10,000
        interest: 0.05      // 5% per week
    },
    2: {
        amount: 20000,      // ₦20,000
        interest: 0.10      // 10% per week
    },
    3: {
        amount: 30000,      // ₦30,000
        interest: 0.20      // 20% per week
    }
};

// ========================================
// TIER SELECTION FUNCTION
// ========================================

/**
 * Handles tier card selection
 * @param {number} tierNumber - The tier number (1, 2, or 3)
 * 
 * Flow:
 * 1. Remove 'selected' class from all tier cards
 * 2. Add 'selected' class to clicked card
 * 3. Store selected tier in hidden input
 */
function selectTier(tierNumber) {
    // Get all tier cards
    const tierCards = document.querySelectorAll('.tier-card');
    
    // Remove 'selected' class from all cards
    tierCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add 'selected' class to the clicked card
    // tierNumber-1 because arrays are 0-indexed (Tier 1 is index 0)
    tierCards[tierNumber - 1].classList.add('selected');
    
    // Store the selected tier value in hidden input
    document.getElementById('selectedTier').value = tierNumber;
}

// ========================================
// STUDENT REGISTRATION FUNCTION
// ========================================

/**
 * Registers a new student to the savings group
 * @param {Event} event - Form submit event
 * 
 * Validation Checks:
 * 1. Name is not empty
 * 2. Tier is selected
 * 3. Group is not full (max 12 members)
 * 4. Name is unique (no duplicates)
 * 
 * If all checks pass:
 * - Creates student object with calculated values
 * - Adds to students array
 * - Updates UI
 * - Resets form
 */
function registerStudent(event) {
    // Prevent form from refreshing the page
    event.preventDefault();
    
    // Get form values
    const nameInput = document.getElementById('studentName');
    const name = nameInput.value.trim(); // Remove whitespace
    const tierInput = document.getElementById('selectedTier');
    const tier = parseInt(tierInput.value);
    
    // ===== VALIDATION PHASE =====
    
    // Check 1: Name cannot be empty
    if (!name) {
        showError('Please enter your name');
        return;
    }
    
    // Check 2: Must select a tier
    if (!tier || tier < 1 || tier > 3) {
        showError('Please select a savings tier');
        return;
    }
    
    // Check 3: Group cannot exceed 12 members
    if (students.length >= MAX_MEMBERS) {
        showError('Maximum 12 members reached. Wait for someone to withdraw.');
        return;
    }
    
    // Check 4: Name must be unique (case-insensitive check)
    const nameExists = students.some(student => 
        student.name.toLowerCase() === name.toLowerCase()
    );
    
    if (nameExists) {
        showError('A member with this name already exists. Please use a different name.');
        return;
    }
    
    // ===== CREATE STUDENT OBJECT =====
    
    // Get tier details from configuration
    const tierConfig = tiers[tier];
    
    // Calculate values
    const amount = tierConfig.amount;
    const interestRate = tierConfig.interest;
    const weeklyInterest = amount * interestRate;
    
    // Create student object
    const student = {
        id: Date.now(),                    // Unique ID using timestamp
        name: name,
        tier: tier,
        amount: amount,                    // Initial deposit amount
        interestRate: interestRate,        // Interest rate (0.05, 0.10, or 0.20)
        weeklyInterest: weeklyInterest,    // Interest earned per week
        joinedWeek: currentWeek,           // Week when member joined
        totalWithdrawn: 0                  // Tracking for historical purposes
    };
    
    // ===== ADD STUDENT & UPDATE UI =====
    
    // Add student to array
    students.push(student);
    
    // Calculate total for display
    const weeksActive = 1; // Just joined
    const totalInterest = weeklyInterest * weeksActive;
    const totalAmount = amount + totalInterest;
    
    // Show success message
    showSuccess(
        `${name} registered successfully in Tier ${tier}! ` +
        `Weekly interest: ₦${weeklyInterest.toLocaleString()} | ` +
        `Week 1 total: ₦${totalAmount.toLocaleString()}`
    );
    
    // Reset form
    document.getElementById('registrationForm').reset();
    
    // Remove selected state from tier cards
    document.querySelectorAll('.tier-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Update all UI components
    updateDashboard();
    renderMembers();
}

// ========================================
// MEMBER WITHDRAWAL FUNCTION
// ========================================

/**
 * Handles member withdrawal from savings group
 * @param {number} studentId - The unique ID of the student
 * 
 * Process:
 * 1. Find student by ID
 * 2. Calculate total withdrawal amount (initial + all interest)
 * 3. Show confirmation dialog
 * 4. Remove from students array
 * 5. Update UI
 */
function withdrawMember(studentId) {
    // Find the student in array
    const student = students.find(s => s.id === studentId);
    
    // If student not found, exit
    if (!student) {
        showError('Student not found');
        return;
    }
    
    // Calculate how many weeks they've been active
    const weeksActive = currentWeek - student.joinedWeek + 1;
    
    // Calculate total interest earned
    const totalInterest = student.weeklyInterest * weeksActive;
    
    // Calculate total withdrawal amount
    const totalWithdrawal = student.amount + totalInterest;
    
    // Create confirmation message with breakdown
    const confirmMessage = 
        `${student.name} Withdrawal Summary:\n\n` +
        `Initial Deposit: ₦${student.amount.toLocaleString()}\n` +
        `Weeks Active: ${weeksActive}\n` +
        `Weekly Interest: ₦${student.weeklyInterest.toLocaleString()}\n` +
        `Total Interest: ₦${totalInterest.toLocaleString()}\n` +
        `━━━━━━━━━━━━━━━━━━━━━\n` +
        `TOTAL WITHDRAWAL: ₦${totalWithdrawal.toLocaleString()}\n\n` +
        `Confirm withdrawal?`;
    
    // Show confirmation dialog
    if (confirm(confirmMessage)) {
        // Remove student from array using filter
        // filter() creates new array with all students except the one withdrawing
        students = students.filter(s => s.id !== studentId);
        
        // Show success message
        showSuccess(
            `${student.name} withdrew ₦${totalWithdrawal.toLocaleString()} successfully! ` +
            `Slot now available for new member.`
        );
        
        // Update UI
        updateDashboard();
        renderMembers();
    }
}

// ========================================
// WEEK ADVANCEMENT FUNCTION
// ========================================

/**
 * Advances to the next week
 * Recalculates all interest for active members
 * 
 * Important: Interest compounds each week!
 */
function advanceWeek() {
    // Increment week number
    currentWeek++;
    
    // Update week display
    document.getElementById('currentWeek').textContent = currentWeek;
    
    // Show notification
    showSuccess(
        `Advanced to Week ${currentWeek}! ` +
        `All members' interest has been updated. ` +
        `Interest compounds weekly for all active members.`
    );
    
    // Update UI with new calculations
    updateDashboard();
    renderMembers();
}

// ========================================
// DASHBOARD UPDATE FUNCTION
// ========================================

/**
 * Updates all statistics in the dashboard
 * 
 * Calculates:
 * - Total number of members
 * - Total savings (sum of all initial deposits)
 * - Total interest earned by all members
 * - Available slots
 */
function updateDashboard() {
    // Count total members
    const totalMembers = students.length;
    
    // Calculate total savings (sum of all initial amounts)
    const totalSavings = students.reduce((sum, student) => {
        return sum + student.amount;
    }, 0);
    
    // Calculate total interest for ALL members
    const totalInterest = students.reduce((sum, student) => {
        // Calculate weeks this student has been active
        const weeksActive = currentWeek - student.joinedWeek + 1;
        
        // Add this student's total interest to sum
        return sum + (student.weeklyInterest * weeksActive);
    }, 0);
    
    // Calculate available slots
    const availableSlots = MAX_MEMBERS - totalMembers;
    
    // Update DOM elements
    document.getElementById('totalMembers').textContent = totalMembers;
    document.getElementById('totalSavings').textContent = '₦' + totalSavings.toLocaleString();
    document.getElementById('totalInterest').textContent = '₦' + totalInterest.toLocaleString();
    document.getElementById('availableSlots').textContent = availableSlots;
    document.getElementById('memberCount').textContent = totalMembers;
}

// ========================================
// MEMBERS LIST RENDERING FUNCTION
// ========================================

/**
 * Renders all member cards in the members section
 * Creates HTML for each member with current calculations
 */
function renderMembers() {
    const container = document.getElementById('membersList');
    
    // If no members, show empty state
    if (students.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>🎯 No members yet. Be the first to join!</p>
            </div>
        `;
        return;
    }
    
    // Generate HTML for each member
    const membersHTML = students.map(student => {
        // Calculate this member's current values
        const weeksActive = currentWeek - student.joinedWeek + 1;
        const totalInterest = student.weeklyInterest * weeksActive;
        const totalAmount = student.amount + totalInterest;
        
        // Return HTML for this member card
        return `
            <div class="member-card">
                <div class="member-info">
                    <div class="member-name">${student.name}</div>
                    
                    <div class="member-details">
                        <span class="member-tier">Tier ${student.tier}</span>
                        Initial Deposit: ₦${student.amount.toLocaleString()} • 
                        Weekly Interest: ₦${student.weeklyInterest.toLocaleString()} • 
                        Weeks Active: ${weeksActive}
                    </div>
                    
                    <div class="member-details">
                        Total Interest Earned: ₦${totalInterest.toLocaleString()}
                    </div>
                    
                    <div class="member-details member-withdrawal">
                        💰 Total Withdrawal Amount: ₦${totalAmount.toLocaleString()}
                    </div>
                </div>
                
                <button class="btn-withdraw" onclick="withdrawMember(${student.id})">
                    Withdraw Funds
                </button>
            </div>
        `;
    }).join(''); // join() converts array of HTML strings into single string
    
    // Update container with all member cards
    container.innerHTML = membersHTML;
}

// ========================================
// MESSAGE DISPLAY FUNCTIONS
// ========================================

/**
 * Displays error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorDiv = document.getElementById('errorMsg');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide success message if showing
    document.getElementById('successMsg').style.display = 'none';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
    
    // Scroll to top to see message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Displays success message to user
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
    const successDiv = document.getElementById('successMsg');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    // Hide error message if showing
    document.getElementById('errorMsg').style.display = 'none';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
    
    // Scroll to top to see message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize dashboard when page loads
 * This runs automatically when the page is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard with zero values
    updateDashboard();
    
    console.log('Savings Group App Initialized');
    console.log('Ready to accept members!');
});