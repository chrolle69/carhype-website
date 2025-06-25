# CarHype Website

## Overview

This project is a contract-based development of CarHype’s new website. It features a simple, user-friendly landing page with two interactive quizzes designed to boost user engagement and collect valuable data. CarHype collaborates with insurance companies to help users find the most suitable insurance provider.

The site is built with modern technologies to ensure performance, scalability, and ease of maintenance.

---

## Technologies Used

- **Next.js** – React framework for server-side rendering and static site generation  
- **Tailwind CSS** – Utility-first CSS framework for styling  
- **Supabase** – Backend as a Service (database, authentication, storage)  
- **TypeScript** – Type-safe JavaScript superset for better code quality  
- **Git** – Version control  
- **Vercel** – Deployment and hosting platform

---

## Features

- Responsive landing page  
- Two quizzes for user engagement and data collection  
- Integration with Supabase for data storage  
- Clean and maintainable codebase using TypeScript  
- Deployed and hosted on Vercel for seamless updates and scalability

---

## Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended - tested with Node 22)  
- pnpm  
- Supabase account and project setup with credentials configured in environment variables

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/chrolle69/carhype-website.git
   cd carhype-website```
2. Install dependencies:
   ```bash
   pnpm install
4. Setup environment variables: <br/>
   Create a .env file in the root of the project.
   Then, go to your Supabase project dashboard and navigate to:
      Project Settings → API & Database
    There you’ll find all the environment variables needed.

    Copy and paste the values into your ```.env``` file like this:
   ```.env
   NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project-url.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret"
   POSTGRES_URL="your-postgres-connection-string"
   POSTGRES_PASSWORD="your-postgres-password"
   POSTGRES_USER="your-postgres-username"
   POSTGRES_HOST="your-postgres-host"
   POSTGRES_DATABASE="your-postgres-database-name"
   SUPABASE_JWT_SECRET="your-jwt-secret"

 ### Running Locally
```bash
pnpm dev
```
Then open http://localhost:3000 in your browser.

## Deployment
The project is deployed on [Vercel](https://vercel.com/).
Commits pushed to the ```main``` branch will automatically trigger a new deployment.

To set up environment variables in Vercel:
- Go to your Vercel project settings → Environment Variables
- Paste the same keys from your ```.env```

## Contribution
This is a contract project, so it's not open for general contribution, but feedback and suggestions are always welcome.

## License
This project is currently not licensed for public or commercial use.

Please contact the author for permissions or collaboration inquiries.

## Contact
For questions or collaboration, contact Lucas at guldbrandsen102030@gmail.com


   


