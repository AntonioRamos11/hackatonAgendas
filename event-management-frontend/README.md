# Event Management Frontend

This project is a frontend application for managing events, clients, staff, inventory, quotes, and invoices. It integrates with a backend API to provide a comprehensive event management solution.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/event-management-frontend.git
   ```

2. Navigate to the project directory:
   ```
   cd event-management-frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables.

## Usage

To start the development server, run:
```
npm start
```
This will launch the application in your default web browser at `http://localhost:3000`.

## API Integration

The frontend communicates with the backend API hosted at `http://localhost:5000/api`. Ensure the backend is running before using the frontend application.

### Authentication

- Users can register and log in to access the application.
- JWT tokens are used for authentication and should be included in the headers of API requests.

### Features

- Manage clients, staff, events, inventory, quotes, and invoices.
- View detailed information and timelines for events.
- Create, update, and delete records as needed.

## Folder Structure

```
event-management-frontend
├── public
│   ├── index.html
│   ├── favicon.svg
│   └── robots.txt
├── src
│   ├── App.tsx
│   ├── index.tsx
│   ├── api
│   ├── components
│   ├── context
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── types
│   └── utils
├── .env
├── .eslintrc.js
├── .gitignore
├── package.json
└── tsconfig.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.