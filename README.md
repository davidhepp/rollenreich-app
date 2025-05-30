# Rollenreich

**Premium Toilet Paper E-Commerce Experience**

Rollenreich is a React-based e-commerce web application specializing in luxury and designer toilet paper products. Experience the ultimate in bathroom luxury with our curated selection of premium products, delivered through a polished and intuitive shopping platform.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Features

- **Product Catalog** - Browse luxury toilet paper with advanced filtering options
- **Product Details** - Rich product pages with high-quality images and detailed descriptions
- **User Management** - Secure user registration and authentication system
- **Shopping Cart** - Seamless shopping cart and checkout experience
- **Subscriptions** - Convenient recurring delivery options for regular customers
- **Responsive Design** - Optimized for both desktop and mobile devices
- **Secure Checkout** - Safe and reliable payment processing

## Tech Stack

| Category     | Technology                   |
| ------------ | ---------------------------- |
| **Frontend** | Next.js, React, Tailwind CSS |
| **Backend**  | Next.js API Routes           |
| **Database** | PostgreSQL with Prisma ORM   |
| **Styling**  | Tailwind CSS                 |

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm, pnpm or yarn package manager

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rollenreich-app.git
   cd rollenreich-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your database URL and other required environment variables.

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for premium bathroom experiences**
