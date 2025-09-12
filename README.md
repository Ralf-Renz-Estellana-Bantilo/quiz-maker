# Quiz Maker Application

A Quiz Maker Application developed using **Next.js**. This application allows users to create, manage, and take quizzes easily.

---

## Project Structure

The project consists of **two servers**:

1. **Client Server** – Handles the front-end interface.
2. **Database Server** – Handles backend data and API requests.

---

## Getting Started

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

### Installation

Open Command Line (CMD) and follow these instructions:

1. **Clone the repository**:

```bash
git clone https://github.com/Ralf-Renz-Estellana-Bantilo/quiz-maker.git
```

2. **Navigate to the folder**:

```bash
cd quiz-maker
```

3. **Install dependencies**:

```bash
npm install
```

4. **Open VSCode (Optional)**:

```bash
code .
```

### Running the Application

1. **Initialize the Database Schema**

Before starting the servers, seed the database with initial data:

```bash
npm run seed
```

2. **Start the Database Server**

In the first terminal, run this command:

```bash
npm run server

# This will start the backend server at http://localhost:4000
```

3. **Start the Client Server**

In the second terminal, run this command:

```bash
npm run dev

# This will start the frontend server at http://localhost:2000
```

## Usage

- Open your browser and navigate to [http://localhost:2000](http://localhost:2000)
- Start creating and managing your quizzes!

## Notes

- Make sure to run `npm run seed` before starting the servers to initialize the database schema.
- Both servers need to be running concurrently for the application to work properly.

## Technologies Used

- **Next.js:** Full Stack React Framework.
- **Node.js:** Backend runtime.
- **SQLite:** Database.
- **TailwindCSS:** CSS Framework.
- **TypeScript:** Type safety.
- **Framer Motion:** Animation library.
- **NPM:** Package manager.
- **HeroUI:** UI library.
