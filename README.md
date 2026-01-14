# Professional One-Page Portfolio

A modern, responsive, and production-ready portfolio built with Next.js (App Router), Tailwind CSS, Framer Motion, and Supabase.

## Features

- **Modern UI/UX**: Clean design with glassmorphism, smooth animations, and responsive layout.
- **One-Page Navigation**: Smooth scrolling between sections (Home, About, Skills, Projects, Experience, Contact).
- **Tech Stack**:
  - [Next.js](https://nextjs.org) 15/16 (App Router)
  - [Tailwind CSS](https://tailwindcss.com) v4
  - [Framer Motion](https://www.framer.com/motion/)
  - [Supabase](https://supabase.com) (Database)
  - [Lucide React](https://lucide.dev) (Icons)
- **Supabase Integration**: Fetches Projects, Skills, and Experience from Supabase. Falls back to mock data if not configured.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and add your Supabase credentials.
   ```bash
   cp .env.example .env
   ```
   
   If you don't have Supabase set up yet, the app will use mock data automatically.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app`: App Router pages and layout.
- `src/components`: Reusable components.
  - `layout`: Navbar, Footer.
  - `sections`: Page sections (Hero, About, etc).
  - `ui`: Generic UI elements (Button, Section wrapper).
- `src/lib`: Utilities and Supabase client.
- `src/types`: TypeScript interfaces.

## Deploying on Vercel

This project is optimized for deployment on Vercel.

1. Push your code to GitHub.
2. Go to [Vercel.com](https://vercel.com) and create a new project.
3. Import your GitHub repository.
4. (Optional) Add your Supabase environment variables in the "Environment Variables" section.
5. Click **Deploy**.
