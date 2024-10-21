## Live Demo
[View Live Demo](https://nnico931103.github.io/Monitor-Dashboard/)

# Monitor-Dashboard
This project is a **React** and **TypeScript** based monitoring dashboard designed to track and visualize real-time data from various devices. It includes WebSocket integration for live updates, dynamic charts built with **D3.js**, and a backend powered by **Node.js** and **PostgreSQL**.

## Features

- **Real-time Data Monitoring**: Fetches and displays data from devices using WebSockets.
- **Data Visualization**: Interactive charts created using **D3.js**.
- **Responsive Design**: Optimized for mobile and desktop views using **RWD**.
- **Alarm Management**: Automatically detects anomalies in device data, stores them in an alarm list, and provides CRUD operations for managing alarms.
- **Progressive Web App (PWA)**: Supports installation on both mobile and desktop, including offline capabilities.

## Tech Stack

### Frontend
- **React** with **TypeScript**
- **D3.js** for data visualization
- **React Context API** for state management
- **PWA** support for offline access

### Backend
- **Node.js** with **Express**
- **PostgreSQL** for data storage
- **WebSocket** for real-time data updates

## Project Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>=14.x)
- **PostgreSQL**
- **Docker** (if using containerization)
