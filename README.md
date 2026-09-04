# TempMail

A disposable email service that lets anyone create a temporary inbox in seconds — no sign-up required. Authenticated users can register an account to persist their mailboxes and receive emails in real time.

## 🔗 Live Demo

> **Frontend:** [https://tempemail-service.vercel.app](#)

---

## Features

- **Instant mailbox** — create a temporary email address without an account
- **Real-time delivery** — new emails appear instantly via Socket.IO (no refresh needed)
- **Email viewer** — read HTML and plain-text emails, view attachments
- **Account system** — register to keep your mailbox beyond the session
- **Auto session restore** — stay logged in across page reloads via HTTP-only cookie
- **Responsive UI** — works on mobile and desktop

---

## Tech Stack

| Layer         | Technology                |
| ------------- | ------------------------- |
| Framework     | React 19 + TypeScript     |
| Build tool    | Vite 8                    |
| Styling       | Tailwind CSS v4           |
| State & API   | Redux Toolkit + RTK Query |
| Routing       | React Router v7           |
| Real-time     | Socket.IO client          |
| Forms         | React Hook Form + Zod     |
| Notifications | Sonner                    |

---

## Project Structure

```
src/
├── App.tsx                      # Root — wires all providers together
├── main.tsx                     # Entry point — mounts Redux + React tree
│
├── config/
│   └── setting.ts               # Reads VITE_BASE_URL from .env
│
├── context/
│   └── auth-context.tsx         # Restores session on app load (cookie check)
│
├── hooks/
│   └── redux.ts                 # Typed useAppDispatch / useAppSelector
│
├── layout/
│   └── root.tsx                 # Thin <Outlet /> wrapper for protected routes
│
├── routes/
│   ├── routes.tsx               # All route definitions (lazy-loaded pages)
│   ├── protector.tsx            # Redirects unauthenticated users → /login
│   └── public.tsx               # Redirects authenticated users → /dashboard
│
├── socket/
│   ├── socket.ts                # Singleton Socket.IO connection manager
│   ├── SocketProvider.tsx       # Connects/disconnects socket on token change
│   ├── SocketInitializer.tsx    # Syncs socket with Redux token state
│   └── emailSocket.ts           # Subscribes to "email:new" events
│
├── store/
│   ├── store.ts                 # Redux store config
│   ├── state.ts                 # Auth slice — { token }
│   └── api/
│   │   ├── baseApi.ts           # RTK Query base with silent token refresh
│   │   ├── authApi.ts           # login / register / session / logout
│   │   ├── mailboxApi.ts        # Mailbox & message endpoints + shared types
│   │   └── userApi.ts           # User details endpoint
│   └── middleware/
│       ├── errorHandler.ts      # Global RTK error → toast.error
│       └── successHandler.ts    # Opt-in RTK success → toast.success
│
├── util/
│   └── format.ts                # Date formatting helper
│
├── components/
│   ├── lazyLoader.tsx           # Full-screen spinner (Suspense fallback)
│   └── ui/
│       ├── button.tsx           # Button — variants, sizes, loading state
│       ├── input.tsx            # Input — label, error, hint
│       └── model.tsx            # Accessible modal (Escape + backdrop close)
│
└── feature/
    ├── auth/
    │   ├── page/
    │   │   ├── login.tsx        # Login form
    │   │   └── signup.tsx       # Registration form
    │   └── schema/
    │       └── schema.ts        # Zod validation schemas
    │
    ├── home/
    │   └── page/
    │       ├── home.tsx         # Public landing page
    │       ├── create-mailbox.tsx  # Create temp address form (guest + auth)
    │       ├── inbox.tsx        # Inbox header, address display, copy button
    │       └── messages.tsx     # Message list, detail modal, attachments
    │
    └── dashboard/
        └── page/
            ├── dashboard.tsx    # Authenticated shell — nav + logout
            └── mail-box.tsx     # Lists the user's saved mailboxes
```

---

## Routes

| Path                  | Access    | Description                       |
| --------------------- | --------- | --------------------------------- |
| `/`                   | Public    | Landing page — create a mailbox   |
| `/:address`           | Public    | Guest inbox for the given address |
| `/login`              | Public    | Login form                        |
| `/signup`             | Public    | Registration form                 |
| `/dashboard`          | Protected | User dashboard — mailbox list     |
| `/dashboard/:address` | Protected | Authenticated inbox view          |

Public routes redirect to `/dashboard` when already logged in. Protected routes redirect to `/login` when not authenticated.

---

## Architecture Highlights

### Session & Token Flow

On every app load, `AuthProvider` silently calls `GET /auth/session` using the HTTP-only cookie. On success the JWT is stored in Redux; on failure the user remains a guest. A full-screen spinner is shown until this check completes so routes never render with an unknown auth state.

### Automatic Token Refresh

`baseApi` wraps every protected request. On a `401` response it re-checks the session cookie and retries the original request automatically. If the cookie is also expired it dispatches `clearToken()` and the user is logged out.

### Real-time Emails

Socket.IO connects as soon as a valid token is present and disconnects on logout. The server emits an `email:new` event which the `Messages` component listens to via `subscribeToNewEmail`, prepending the new email to the list without any polling.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of the TempMail backend API

### Installation

```bash
git clone <repo-url>
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:3000
```

### Running Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Key Dependencies

| Package            | Version | Purpose                      |
| ------------------ | ------- | ---------------------------- |
| `react`            | 19      | UI framework                 |
| `@reduxjs/toolkit` | 2       | State management + RTK Query |
| `react-router-dom` | 7       | Client-side routing          |
| `socket.io-client` | 4       | Real-time communication      |
| `react-hook-form`  | 7       | Form state management        |
| `zod`              | 4       | Schema validation            |
| `tailwindcss`      | 4       | Utility-first CSS            |
| `sonner`           | 2       | Toast notifications          |
