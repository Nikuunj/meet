```markdown
# Meet - Real-time Chat Application

Meet is a real-time messaging application built with Socket.io, Node.js, Express, and React. Users can create and join chat rooms, send and receive messages instantly, and enjoy a seamless communication experience.

## Features
- **Create Rooms**: Users can create a new chat room and invite others to join.
- **Join Rooms**: Users can join existing rooms using the room ID.
- **Real-time Messaging**: Send and receive messages instantly in the chat room.
- **User-friendly Interface**: A simple and clean UI for smooth communication.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Socket.io
- **Database**: None (In-memory room and user management)

## Installation

### Prerequisites
Ensure that you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Yarn](https://yarnpkg.com/) (optional but recommended)

### Clone the repository

```bash
git clone https://github.com/Nikuunj/meet.git
cd meet
```

### Running the Application Locally

To run the project locally, you'll need to start both the backend server (Node.js) and the frontend (React).

1. **Start the backend server**:

   In the `server/` directory, run the following command to start the server:

   ```bash
   npm install &&
   npm run server
   ```

   This will start the backend server at `http://localhost:3000`.

2. **Start the frontend**:

   In the `client/` directory, run the following command to start the React frontend:

   ```bash
   npm install &&
   npm run server
   ```

   This will open the frontend app in your default browser at `http://localhost:5173`.

   Both the backend and frontend should be running locally, and you can now use the application to create rooms, join rooms, and send messages.


This will launch both the backend server and the frontend client concurrently.

## Project Structure

```bash
├── client/                 # React frontend
│   ├── public/             # Public files (e.g., images, icons)
│   ├── src/                # React components and assets
│   └── index.tsx           # React entry point
├── server/                 # Backend server
│   ├── src/                # Room and user management logic
│       ├── intex.ts        # Socket.io and Express server
└── README.md               # Project documentation
```

## Usage

1. **Create a Room**: Once the app is loaded, users can create a room by entering a name and clicking "Create Room".
2. **Join a Room**: Users can join a room by entering a room ID and their name.
3. **Send a Message**: After joining a room, users can type messages and hit Enter to send them.
4. **Leave Room**: Users can leave the room by disconnecting or closing the app.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your branch (`git push origin feature-branch`).
6. Create a new pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Nikunj Makwana**  
  [LinkedIn](https://www.linkedin.com/in/makwana-nikunj/) | [GitHub](https://github.com/Nikuunj) | [Portfolio](https://nikunj-portfolio.vercel.app/)

## Acknowledgments

- **Socket.io**: Real-time communication framework used for implementing the chat functionality.
- **React**: Frontend library used for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the app.
- **Express**: Web framework used for the backend server.

---

Thank you for checking out Meet! Feel free to explore, contribute, or suggest improvements. Happy coding! 👩‍💻👨‍💻