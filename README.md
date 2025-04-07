# BOCDAN LTD Mobile Store

A modern e-commerce platform for mobile phones and accessories built with React.js and Redux.

## How to Run the Project

### Step 1: Set Up Environment
1. Install Node.js (v14 or higher) from [nodejs.org](https://nodejs.org/)
2. Install XAMPP (for PHP and MySQL) from [xampp.org](https://www.apachefriends.org/)
3. Install Git from [git-scm.com](https://git-scm.com/)

### Step 2: Clone and Setup Project
1. Open terminal/command prompt and navigate to your desired directory
2. Clone the repository:
```bash
git clone https://github.com/yourusername/bocdan-mobile-store.git
cd bocdan-mobile-store
```

### Step 3: Install Dependencies
1. Install project dependencies:
```bash
npm install
```

### Step 4: Database Setup
1. Start XAMPP and start Apache and MySQL services
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Create a new database named `bocdan_mobile_store`
4. Import the database schema from `database/bocdan_mobile_store.sql`

### Step 5: Configure Backend
1. Navigate to the PHP backend folder
2. Open `config.php` and update database credentials:
```php
$host = "localhost";
$username = "root";
$password = "";
$database = "bocdan_mobile_store";
```

### Step 6: Start the Application
1. Start the React development server:
```bash
npm start
```
2. The application will open in your default browser at http://localhost:3000

### Step 7: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost/Ecommerce_Website/

### Common Issues and Solutions
1. If you get a "Module not found" error:
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`

2. If database connection fails:
   - Check if MySQL service is running
   - Verify database credentials in config.php
   - Ensure database name matches

3. If images don't load:
   - Check if images are in the correct folder: `public/profile/`
   - Verify image file names match exactly

4. If the carousel doesn't work:
   - Ensure Bootstrap JS is properly loaded
   - Check browser console for any errors

### Development Tools
- VS Code (recommended IDE)
- React Developer Tools (browser extension)
- Redux DevTools (browser extension)

### Testing the Application
1. Register a new account
2. Browse products
3. Add items to cart
4. Test checkout process
5. Try the contact form

## Features

- 🛍️ **Product Catalog**
  - Browse through a wide range of smartphones and accessories
  - Detailed product information and specifications
  - Product filtering and search functionality
  - Responsive product grid layout

- 👤 **User Authentication**
  - User registration and login
  - Secure password handling
  - User profile management

- 🛒 **Shopping Cart**
  - Add/remove products to cart
  - Real-time cart updates
  - Price calculations in LKR (Sri Lankan Rupees)
  - Checkout process

- 📱 **Responsive Design**
  - Mobile-first approach
  - Compatible with all devices
  - Smooth animations and transitions

- 🎨 **Modern UI/UX**
  - Bootstrap-based design
  - Interactive carousel for featured products
  - Clean and intuitive navigation
  - Loading states and error handling

## Tech Stack

- **Frontend Framework:** React.js
- **State Management:** Redux
- **Routing:** React Router
- **Styling:** Bootstrap 4
- **Icons:** Font Awesome
- **Notifications:** React Hot Toast
- **Backend:** PHP with MySQL

## Project Structure

```
bocdan-mobile-store/
├── public/
│   ├── assets/
│   │   ├── profile/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Main.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Product.jsx
│   │   │   
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Register.jsx
│   │   │   
│   │   ├── redux/
│   │   │   ├── actions/
│   │   │   └── store.js
│   │   │   
│   │   └── App.js
│   │   
│   └── package.json
```

## Features in Detail

### Product Management
- Display products with images, prices, and descriptions
- Filter products by category
- View detailed product information
- Add products to cart

### User Authentication
- Secure user registration
- Login with email and password
- Session management
- Protected routes

### Shopping Cart
- Add/remove items
- Update quantities
- Calculate total price
- Proceed to checkout

### Contact Form
- Send messages to store
- Form validation
- Success/error notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Development Team

- Kosala Deshan - Lead Developer
- Gayan Manage - Frontend Developer
- Devin Fernando - Backend Developer
- Charit Bandara - QA Engineer
- Kavinda Perera - DevOps Engineer

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Bootstrap for the UI components
- React.js community for the excellent framework
- All contributors who have helped with the project

## Contact

BOCDAN LTD Mobile Store
- Website: [www.bocdanmobile.com](http://www.bocdanmobile.com)
- Email: info@bocdanmobile.com
- Phone: +94 XX XXX XXXX


