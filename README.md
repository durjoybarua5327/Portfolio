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
   Copy `.env.example` to `.env.local` and add your Supabase credentials.
   ```bash
   cp .env.example .env.local
   ```
   
   If you don't have Supabase set up yet, the app will use mock data automatically.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## distinct Folders

- `src/app`: App Router pages and layout.
- `src/components`: Reusable components.
  - `layout`: Navbar, Footer.
  - `sections`: Page sections (Hero, About, etc).
  - `ui`: Generic UI elements (Button, Section wrapper).
- `src/lib`: Utilities and Supabase client.
- `src/types`: TypeScript interfaces.

## deploying

This project is ready for Vercel.

1. Push to GitHub.
2. Import project in Vercel.
3. Add environment variables (optional).
4. Deploy!
