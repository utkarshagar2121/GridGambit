# ♟️ GridGambit

**GridGambit** is a full-stack real-time multiplayer chess platform built with React, Node.js, TypeScript, WebSockets, Redis, and PostgreSQL. It enables users to sign up, play live matches, and maintain chess ratings using an ELO system — all in a clean, responsive interface.

---

## 🚀 Features

- ♟️ Create or join live matches instantly
- 🔄 Real-time gameplay using WebSocket communication
- 🧠 Chess rules enforced (move validation, turn-based play)
- 🏁 PostgreSQL backend for persistent user and game data

---

## 🛠 Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Frontend    | React, TypeScript, Tailwind CSS     |
| Backend     | Node.js, Express, TypeScript        |
| Real-Time   | WebSocket Server (Socket.io)        |
| Database    | PostgreSQL                          |

---

## 🧩 Monorepo Structure

```
chess-platform/
├── apps/
│   ├── frontend      # React frontend
│   ├── backend       # Express + PostgreSQL backend
│   └── ws            # WebSocket server for real-time gameplay
└── README.md
```

---

## 📦 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/checkmatelive.git
cd checkmatelive
```

### 2. Set up Environment Variables

Copy the `.env.example` files in each app folder:

```bash
cp apps/frontend/.env.example apps/frontend/.env
cp apps/backend/.env.example apps/backend/.env
cp apps/ws/.env.example apps/ws/.env
```

Update the variables with:

- PostgreSQL credentials
- Google/GitHub OAuth credentials
- Redis connection string

### 3. Install Dependencies

```bash
npm install
```

### 4. Start All Servers

```bash
# Start WebSocket server
cd apps/ws
npm run dev

# Start Backend server
cd ../backend
npm run dev

# Start Frontend
cd ../frontend
npm run dev
```

---

## 🧠 Future Enhancements

- Spectator mode
- Match history (FEN/PGN)
- Leaderboard and profile pages
- AI opponent using Stockfish
- Draw detection and timer support

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 📝 License

MIT License. See `LICENSE` file for details.

---

## 🙌 Acknowledgements

Inspired by chess.com and built for learning, fun, and open collaboration.
