# Save the City

A web app that connects **Seattle** residents with **community gardens**: find gardens on a map, filter by tags, sign up for volunteer and harvest times, and (as a host) manage your garden and see how many people are registered.

## Mission

We support **UN Sustainable Development Goal 11 (Sustainable Cities and Communities)** by improving access to fresh produce, volunteer opportunities, and community connections through a single platform.

## Tech stack

- **React** + **Vite**
- **React Router**
- **Firebase** (Auth, Realtime Database)
- **Leaflet** / **react-leaflet** (map)
- **Bootstrap** (UI)

## Getting started

1. **Clone and install**
   ```bash
   git clone https://github.com/YOUR_ORG/save-the-city.git
   cd save-the-city
   npm install
   ```

2. **Run locally**
   ```bash
   npm run dev
   ```
   Open the URL shown (e.g. http://localhost:5173).

3. **Build for production**
   ```bash
   npm run build
   ```

## Main features

- **Home & About** — Mission, problem statement, and a short video about community gardens.
- **User Portal** — Map of gardens in Seattle, search and tag filters, suggested searches, volunteer and harvest sign-up. Accessible without logging in.
- **Host Portal** — Register a garden (map pin + form), edit details, add volunteer/harvest times, see registration counts, delete a garden. Requires sign-in.

## Docs

- **[docs/PERSONAS.md](docs/PERSONAS.md)** — User personas (Maria Lopez, Garden Host; Jamal Carter, Consumer/Volunteer).
- **[docs/TESTING.md](docs/TESTING.md)** — Testing protocol: how to test each key feature, expected results, workarounds, and code-fix backlog.

## License

See repository settings or add a LICENSE file as needed.
