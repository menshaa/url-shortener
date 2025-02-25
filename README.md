### URL Shortener

### 🚀 Overview

This is a **URL Shortener** service that allows users to shorten long URLs and track their usage. The project is built with **Node.js**, uses **MongoDB** as a database, **Redis** for caching, and **Bull Queue** to process analytics updates asynchronously.

### 📌 Features

- **Shorten URLs**: Generate short links for long URLs.
- **Redirect Handling**: Redirect users when accessing short URLs.
- **Click Tracking**: Track the number of times each short URL is visited.
- **Caching with Redis**: Improves performance by caching URL lookups.
- **Background Job Processing**: Uses **Bull (Redis-based queue)** to update click counts asynchronously.
- **Dockerized Deployment**: Easily deployable using Docker and Docker Compose.

### 🏗️ Tech Stack

- **Node.js** (Express.js)
- **MongoDB** (for persistent storage)
- **Redis** (for caching and queue processing)
- **Bull Queue** (for background job processing)
- **Docker & Docker Compose** (for containerized deployment)

---

### 🔧 Setup & Installation

#### Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Steps to Run

```sh
# Clone the repository
git clone https://github.com/menshaa/url-shortener.git
cd url-shortener

# Start the application using Docker Compose
docker-compose up --build
```

The application will be available at:

```sh
http://localhost:3000
```

---

### 📂 Project Structure

```sh
├── server.js
├── app.js
├── config
├── routes
├── models
├── worker
├── queues
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

### ⚙️ API Endpoints

#### Shorten a URL

**POST /shorten**

##### Request Body:

```json
{
  "longUrl": "https://example.com"
}
```

##### Response:

```json
{
  "shortUrl": "http://localhost:3000/api/abc123"
}
```

#### Redirect to Original URL

**GET /:shortCode**

- Redirects the user to the original URL.

#### Get Click Count (Debugging)

**GET /stats/:shortCode**

##### Response:

```json
{
  "longUrl": "https://example.com",
  "shortUrl": "http://localhost:3000/api/abc123",
  "clicks": 100
}
```

---

### 🏗️ Background Job Processing (Bull Queue)

- When a user clicks a short URL, the request is **queued** in **Bull** instead of updating the database immediately.
- The worker (`worker/index.js`) processes these jobs in the background and updates the MongoDB database.
- This ensures high performance and scalability.

---
