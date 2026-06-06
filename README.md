# Deadline Companion

An AI-powered, premium deadline reminder and task manager application. Designed for students and professionals to organize tasks, track weekly completion metrics, analyze focus periods, and leverage AI to auto-schedule or optimize their calendars.

## Features
*   **Vibrant Dark Theme**: Premium modern UI with custom glassmorphism components.
*   **Interactive Task Board**: Categorized list (Work, Study, Personal, Health, Finance) with inline subtask management and smooth status toggling.
*   **AI Productivity Coach**: Get real-time scheduling recommendations and insights based on focus metrics.
*   **Weekly Focus Analytics**: Visualization of task completion rates and category distributions.
*   **Notch & Safe Area Compatibility**: Native layout adjustments to fit notches and bottom indicator bars on modern mobile devices.
*   **PWA & Capacitor ready**: Easily packageable into Android/iOS containers or installable as a web app.

---

## Technical Stack
*   **Frontend**: React (v19) + Tailwind CSS (v4) + Lucide Icons
*   **Meta-Framework**: TanStack Start (routing & server actions)
*   **Backend**: Nitro Server (same-origin RPC handlers)
*   **Database**: MongoDB Atlas (with local file fallback)

---

## Getting Started

### Prerequisites
*   Node.js (v18+)

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/RoshanAfaz/DeadlineCompanion.git
    cd DeadlineCompanion
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    Create a `.env` file in the root folder and add your MongoDB Atlas URI:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.rmjxo8g.mongodb.net/?appName=Cluster0
    ```
    *(If no URI is specified, the server will automatically default to a local `db.json` database fallback for easy offline development)*.

### Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
Build client assets and server bundle:
```bash
npm run build
```
Start the production Node server:
```bash
node .output/server/index.mjs
```
