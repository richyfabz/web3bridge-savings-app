# 💰 Web3Bridge Savings Group Application

A web-based savings group management system for Web3Bridge Cohort XIV Pre-Qualification Exercise.

## 📋 Project Overview

This application manages a collaborative savings group where 12 students can invest their savings collectively. The system tracks individual contributions, calculates weekly interest, and allows members to withdraw their funds at any time.

## ✨ Features

### 1. **Student Registration**
- Members can register with their name
- Choose from 3 savings tiers:
  - **Tier 1**: ₦10,000 (5% weekly interest = ₦500/week)
  - **Tier 2**: ₦20,000 (10% weekly interest = ₦2,000/week)
  - **Tier 3**: ₦30,000 (20% weekly interest = ₦6,000/week)
- Real-time validation of inputs
- Duplicate name prevention

### 2. **Savings Dashboard**
- **Total Members**: Current number of active members (max 12)
- **Total Savings**: Sum of all initial deposits
- **Total Interest**: Accumulated interest for all members
- **Available Slots**: Remaining spots in the group

### 3. **Week Simulation**
- Advance to next week with one click
- Interest compounds automatically each week
- All member balances update in real-time

### 4. **Member Management**
- View detailed breakdown for each member:
  - Initial deposit amount
  - Weekly interest rate
  - Weeks active in group
  - Total interest earned
  - Total withdrawal amount
- Withdraw functionality with confirmation dialog
- Automatic slot availability when member withdraws

### 5. **Tier Validation**
- Ensures correct amount selection for each tier
- Visual feedback for selected tier
- Prevents invalid tier selection

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/richyfabz/web3bridge-savings-app.git
   cd web3bridge-savings-app
   ```

2. **Open in browser:**
   - Simply double-click `index.html`
   - OR right-click → "Open with" → Choose your browser
   - OR use Live Server in VSCode

3. **Start using:**
   - Register members
   - Advance weeks
   - Simulate withdrawals

### Deployment

This app is deployed at: [Your GitHub Pages URL]

To deploy your own:
1. Push code to GitHub
2. Go to repository Settings
3. Navigate to Pages
4. Select main branch → Save
5. Your site will be live at: `https://[username].github.io/[repo-name]`

## 📖 How to Use

### Registering a New Member

1. **Enter Name**
   - Type student's full name in the input field
   - Name must be unique (no duplicates allowed)

2. **Select Tier**
   - Click on one of the three tier cards
   - Selected tier will be highlighted
   - Review the interest rate and weekly earnings

3. **Click Register**
   - Member will be added to the group
   - Dashboard will update automatically
   - Success message will appear

### Advancing Weeks

1. Click the **"Advance to Next Week"** button
2. Current week number increases
3. All members' interest recalculates
4. Dashboard updates with new totals

### Member Withdrawal

1. Locate the member card in the members list
2. Click **"Withdraw Funds"** button
3. Review the withdrawal summary:
   - Initial deposit
   - Weeks active
   - Total interest earned
   - Total withdrawal amount
4. Confirm withdrawal
5. Member is removed from group
6. Slot becomes available for new member

## 🎨 Features Showcase

### Responsive Design
- ✅ Mobile-friendly interface
- ✅ Tablet optimized
- ✅ Desktop enhanced

### User Experience
- ✅ Real-time validation
- ✅ Clear error messages
- ✅ Success confirmations
- ✅ Smooth animations
- ✅ Intuitive navigation

### Data Integrity
- ✅ Unique name enforcement
- ✅ Maximum 12 members limit
- ✅ Accurate interest calculations
- ✅ Tier validation
- ✅ Week tracking

## 🧮 Interest Calculation Logic

Interest is calculated using this formula:

```
Weekly Interest = Initial Amount × Interest Rate
Total Interest = Weekly Interest × Weeks Active
Total Withdrawal = Initial Amount + Total Interest
```

### Example Calculation:

**Tier 2 Member (₦20,000 at 10%)**
- Week 1: ₦20,000 + ₦2,000 = ₦22,000
- Week 2: ₦20,000 + ₦4,000 = ₦24,000
- Week 3: ₦20,000 + ₦6,000 = ₦26,000

## 🛠️ Technical Stack

### Frontend
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, flexbox, grid
- **Vanilla JavaScript**: No frameworks needed
  - ES6+ features (arrow functions, template literals, etc.)
  - DOM manipulation
  - Event handling
  - Array methods (map, filter, reduce)

### No Backend Required
- All data stored in browser memory
- Resets on page refresh (as per requirements)
- No database needed

## 📁 Project Structure

```
web3bridge-savings-app/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript logic and functions
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## 🧪 Testing Checklist

- [x] Register member with valid details
- [x] Attempt to register duplicate name (should fail)
- [x] Try to register 13th member (should fail)
- [x] Advance week and verify interest updates
- [x] Withdraw member and check calculations
- [x] Register new member after withdrawal
- [x] Test on mobile device
- [x] Test on different browsers

## 🔍 Key Functions

### `registerStudent(event)`
Validates and registers new members

### `withdrawMember(studentId)`
Handles member withdrawals with calculations

### `advanceWeek()`
Simulates weekly progression and interest updates

### `updateDashboard()`
Updates all statistics in real-time

### `renderMembers()`
Dynamically generates member cards

## 💡 Design Decisions

### Why Vanilla JavaScript?
- **Lightweight**: No framework overhead
- **Fast**: Direct DOM manipulation
- **Simple**: Easy to understand and maintain
- **Requirement**: Project specified vanilla JS

### Why In-Memory Storage?
- **Requirement**: No backend needed
- **Simplicity**: Quick development
- **Demo Purpose**: Perfect for assessment

### Why Three Tiers?
- **Requirement**: As specified in brief
- **Flexibility**: Different investment levels
- **Incentive**: Higher tiers = higher returns

## 🎯 Future Enhancements

- [ ] Local storage persistence
- [ ] Export data to CSV
- [ ] Member search/filter
- [ ] Interest rate changes
- [ ] Admin panel
- [ ] Multiple savings groups
- [ ] Email notifications
- [ ] Transaction history

## 👨‍💻 Developer

**Richyfabz**
- GitHub: [@richyfabz](https://github.com/richyfabz)
- Email: dammifabz@gmail.com

## 📄 License

This project was created for Web3Bridge Cohort XIV Pre-Qualification Exercise.

## 🙏 Acknowledgments

- Web3Bridge Team for the opportunity
- Cohort XIV participants for inspiration

---

**Built with ❤️ for Web3Bridge Cohort XIV**