# Atelier – Community-Driven Art Discovery

Discover art through trusted connections. Atelier is a community where peer validation, human verification, and ethical moderation shape how you explore and collect art—not opaque algorithms.

## For judges (demo)

To try the full flow, including **moderation**:

- **Demo moderator account:** `demo@email.com` / `demo`
- Sign in on the **Login** page with these credentials, then open **Moderation** in the nav. You can approve or reject pending artist applications there.
- Optional: sign up as an artist (e.g. from **Sign up** → “Register as artist”), then log in as the demo moderator and approve that request on the Moderation page.

## Project info

- **Repository:** [pinus-hackathon-team-oreo-ai-for-arts-community](https://github.com/bernardinolintang/pinus-hackathon-team-oreo-ai-for-arts-community)

## Run locally

Requirements: Node.js and npm (or [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Clone the repository
git clone https://github.com/bernardinolintang/pinus-hackathon-team-oreo-ai-for-arts-community.git
cd pinus-hackathon-team-oreo-ai-for-arts-community

# Install dependencies
npm i

# Start the development server
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Tech stack

- **Vite** – build tool
- **TypeScript** – type safety
- **React** – UI
- **shadcn/ui** – components
- **Tailwind CSS** – styling

## Build for production

```sh
npm run build
```

Output is in the `dist/` folder. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Edit the code

- **Locally:** Use your IDE in this repo; commit and push to GitHub.
- **GitHub:** Use the “Edit” button on any file in the repo, or open a [Codespace](https://github.com/features/codespaces) from the “Code” menu.
