# List of Schedules (TodoApp)

Modern .NET 8 + React (MUI) app.  
Backend: ASP.NET Core Web API (SQLite).  
Frontend: React + Material UI, deployed to GitHub Pages.

## Live UI
https://<YOUR_GITHUB_USERNAME>.github.io/<YOUR_REPO_NAME>/

> The UI needs the API running. By default it calls `http://localhost:5098/api`.

## Run the API (no install needed, Windows)
1. Go to **Releases** → download **TodoApp.Api-win64.zip**
2. Extract → double-click **TodoApp.Api.exe**
3. The console shows: `Now listening on: http://localhost:5098`

## Change the API URL used by the UI
If the API runs on a different machine/port, set it in the UI:
- Create `todo-ui/.env` with:
