# NeuralFlow - Pipeline Builder

A modern, full-stack pipeline visualization and analysis application built with React, FastAPI, and Zustand.

## 🚀 Quick Start

**Backend:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend: `http://localhost:8000`

**Frontend:**

```bash
cd frontend
npm install
npm start
```

Frontend: `http://localhost:3000`

---

## 📁 Project Structure

```
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # UI components (Header, Sidebar, Modal, etc.)
│   │   ├── nodes/              # Node system (BaseNode, configs, factories)
│   │   ├── store/              # State management (Zustand stores)
│   │   ├── services/           # API services (React Query hooks)
│   │   ├── constants/          # Centralized constants (features, icons,navigation)
│   │   ├── config/             # Configuration (apiConfig, headerConfig)
│   │   ├── hooks/              # Custom hooks (useHeaderConfig)
│   │   ├── utils/              # Utilities (fileUtils for export/import)
│   │   ├── layouts/            # Layout components (AppLayout)
│   │   ├── pages/              # Page components (HomePage, PipelinePage)
│   │   └── routes/             # Routing configuration
│   └── README.md
│
├── backend/                     # FastAPI application
│   ├── main.py                 # FastAPI app & endpoints
│   ├── models.py               # Pydantic data models
│   ├── utils.py                # Utility functions (DAG detection, validation)
│   ├── config.py               # Configuration management
│   ├── requirements.txt        # Python dependencies
│   └── README.md
│
└── README.md
```

---

## 🛠️ Technology Stack

**Frontend:** React 18, React Router, React Flow, Zustand, React Query, Tailwind CSS, Lucide React

**Backend:** FastAPI 0.104.1, Uvicorn 0.24.0, Pydantic 2.12.5, Python 3.8+

---

## ✨ Key Features

- **Pipeline Canvas** - Drag-and-drop node editor with React Flow
- **State Management** - Zustand for canvas state, React Query for server state
- **File Operations** - Export/import pipelines as JSON
- **Dark Mode** - Full dark theme support with persistent preferences
- **Pipeline Validation** - Validates structure and detects cycles (DAG)
- **CORS Support** - Configured for frontend integration
- **Auto Documentation** - Swagger UI and ReDoc endpoints

---

## 📚 Documentation

- [Frontend README](./frontend/README.md) - Frontend architecture, state management, and development guide
- [Backend README](./backend/README.md) - API documentation, models, and testing guide

---

## 🔧 Troubleshooting

**Frontend:** `cd frontend && rm -rf node_modules package-lock.json && npm install && npm start`

**Backend:** `cd backend && pip install --upgrade pip && pip install -r requirements.txt`

**Port conflicts:** `lsof -ti:3000 | xargs kill -9` (frontend), `lsof -ti:8000 | xargs kill -9` (backend)

**CORS errors:** Ensure backend runs on `http://localhost:8000`, check `FRONTEND_URL` in `config.py`

---

## 📝 Development Notes

### Adding New Features

1. Create components in `frontend/src/components/`
2. Add state management in `frontend/src/store/` if needed
3. Create API services in `frontend/src/services/`
4. Add constants in `frontend/src/constants/`
5. Update routing in `frontend/src/routes/`

### Best Practices

- Use Zustand hooks for state management
- Use React Query for server state
- Centralize constants in `constants/` folder
- Keep components small and focused
- Use TypeScript-like JSDoc comments for clarity

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Pipeline versioning and history
- [ ] Collaborative editing
- [ ] Advanced node types
- [ ] Pipeline scheduling and execution
- [ ] Analytics and monitoring
- [ ] Custom node creation UI
