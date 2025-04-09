# GitHub Profile Explorer

A modern web application that allows users to search and explore GitHub profiles with a beautiful UI. View user information, repositories, and activity calendars in one place.

See Demo : [Click Here](https://github-profile-explorer-omega.vercel.app/)

Watch Video:

[![Watch the demo video](https://img.youtube.com/vi/B33CuKpnK8o/0.jpg)](https://youtu.be/B33CuKpnK8o)

## Features

- 🔍 Search GitHub profiles by username
- 👤 View detailed user information
- 📊 Display user statistics (repositories, followers, following)
- 📚 Browse user repositories with details
- 📅 View GitHub activity calendar
- 🎨 Modern, responsive UI with dark theme
- ⚡ Fast and efficient API calls

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Shadcn UI
- **Data Fetching**: Axios
- **Activity Calendar**: React GitHub Calendar
- **Build Tool**: Vite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-profile-explorer.git
   cd github-profile-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Deploying to Vercel

1. Create a [Vercel account](https://vercel.com/signup) if you don't have one
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the application:
   ```bash
   vercel
   ```

5. Follow the prompts to complete the deployment

### Deploying to Netlify

1. Create a [Netlify account](https://app.netlify.com/signup) if you don't have one
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Deploy the application:
   ```bash
   netlify deploy
   ```

5. Follow the prompts to complete the deployment

### Deploying to GitHub Pages

1. Add the following to your `vite.config.ts`:
   ```typescript
   export default defineConfig({
     // ... other config
     base: '/github-profile-explorer/',
   })
   ```

2. Add a GitHub Actions workflow file at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v2
         
         - name: Setup Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '16'
         
         - name: Install Dependencies
           run: npm install
         
         - name: Build
           run: npm run build
         
         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@4.1.5
           with:
             branch: gh-pages
             folder: dist
   ```

3. Push your changes to GitHub and the workflow will automatically deploy your site

## Environment Variables

This application uses the GitHub API which has rate limits for unauthenticated requests. For higher rate limits, you can add a GitHub token:

1. Create a `.env` file in the root directory
2. Add your GitHub token:
   ```
   VITE_GITHUB_TOKEN=your_github_token
   ```
3. Update the API calls in `src/pages/Home.tsx` to include the token in the headers:
   ```typescript
   const headers = {
     Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`
   };
   
   // Then use in axios calls
   axios.get(url, { headers })
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest)
- [React GitHub Calendar](https://github.com/grubersjoe/react-github-calendar)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
