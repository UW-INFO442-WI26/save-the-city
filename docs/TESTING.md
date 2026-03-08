# Testing Protocol — Save the City

## How to run the app locally

```bash
cd c:\Users\Owner\Downloads\save-the-city
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173) in a browser.

---

## Key features: how to test

### 1. Home and About (no login required)

| Step | Action | Expected result |
|------|--------|------------------|
| 1.1 | Open `/home` | Home page loads with welcome text and CTAs. |
| 1.2 | Open `/about` | About page loads with mission, video, and SDG 11 content. |
| 1.3 | Use navbar: Home, About Us | Navigation works without login. |

### 2. Login and routing by role

| Step | Action | Expected result |
|------|--------|------------------|
| 2.1 | Sign in and complete the questionnaire (host vs. volunteer) | Login page routes the user to the correct portal (Host or User) based on the questionnaire. |
| 2.2 | As host, open Host Portal | Host dashboard with “My gardens,” register garden, manage times. |
| 2.3 | As volunteer, open User Portal | Map, filters, and garden list. |

### 3. User Portal (map, filters, garden info)

| Step | Action | Expected result |
|------|--------|------------------|
| 3.1 | Go to User Portal | Map loads (Seattle); filter/tag bar at top (collapsible when implemented). |
| 3.2 | Use tag dropdown / filter bar | Only gardens that match the selected tag(s) are rendered on the map. |
| 3.3 | Search for gardens | One search bar; gardens are searchable by name or other criteria. |
| 3.4 | Click a garden on the map | **Only that garden’s information** appears (one garden at a time). Volunteer and harvest times shown are for that garden only—not all gardens in the database. |
| 3.5 | Click “Register” on a volunteer or harvest slot | User is directed to a **registration page** to confirm and complete sign-up for that specific time. |

**Known issues / workarounds:**
- Tag system on user side should only render gardens that fit the selected tag; verify filtering is applied.
- Bottom panel / garden info should appear in a **modal popup** when a garden is clicked (not fixed at bottom), to save space.
- Ensure only one garden’s volunteer/harvest times are shown in the popup at a time.

### 4. Host Portal (gardens, times, “View as volunteer”)

| Step | Action | Expected result |
|------|--------|------------------|
| 4.1 | Register a new garden (map pin + form) | Garden is created; when adding volunteer/harvest times, they **populate on the user map side** for that garden. |
| 4.2 | Create garden: use standard tags | Tags come from a **dropdown** with standard options (not free text only). |
| 4.3 | Add volunteer or harvest times | Times appear for this garden on the User Portal when that garden is selected. |
| 4.4 | Click “View as volunteer” | Opens a **copy of the user portal** with **limited functionality** (e.g. cannot register for harvest or volunteer times)—preview only, not the full User Portal. |
| 4.5 | Check garden list | **Garden names render in readable text** (not white on white); contrast is fixed. |

**Known issues / workarounds:**
- Navbar contrast and color scheme should be updated for readability.
- Garden names on the host portal must be visible (fix white-on-white if present).

### 5. Responsiveness and accessibility

| Step | Action | Expected result |
|------|--------|------------------|
| 5.1 | Resize window or use a small/large device | All features are **responsive** on smaller and larger screens. |
| 5.2 | Use mouse and touch | Buttons, map, filters work with both. |

### 6. Automated tests

| Step | Action | Expected result |
|------|--------|------------------|
| 6.1 | Run `npm run test` or `npm run test:run` | Test suite runs. **Finish writing tests** so all key flows are covered. |

---

## Code fixes / feature backlog

Use this list when implementing or verifying behavior.

- **Tags:** When creating a garden, use **standard tags in a dropdown**. On the user side, the tag/filter system should **only render gardens that match** the selected tag(s).
- **Filter bar:** Tag/filter bar at the top of the user page should be **collapsible** (e.g. using Bootstrap).
- **Garden info on user page:** Move information from the bottom panel into a **modal popup** when the user clicks a garden (to avoid taking up space at the bottom).
- **Search:** Use **one search bar**; make gardens searchable (remove duplicate search if present).
- **Login routing:** Login page **routes the user to the correct portal** (Host vs. User) based on the questionnaire.
- **“View as volunteer” (Host):** Should go to a **copy of the user portal** with **limited functionality** (e.g. no registration for harvest or volunteer times)—not the full User Portal.
- **Navbar:** Fix contrast and update color scheme for **readability**.
- **Host portal garden names:** Garden names must **render in visible text** (fix white text on white background).
- **User map / popup:** When a host adds volunteer or harvest times, they **populate on the user map side**. Only **one garden’s** volunteer/harvest times should be shown in the popup at a time.
- **User portal selection:** **Only one garden’s information** at a time when clicked (do not render all gardens’ info from the database).
- **Registration flow:** Provide a **registration page** that users are directed to when they click “Register” for a volunteer or harvest time.
- **Tests:** Finish writing tests for all key features.
- **Responsiveness:** Ensure all features work on smaller and larger devices.
