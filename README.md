
# 📘 Event & Nudge Backend APIs

This repository contains backend APIs developed using **Node.js** and **MongoDB Native Driver** (without mongoose).
The project is divided into **two tasks**:

* **Task 1:** Event API Creation
* **Task 2:** Nudge API Design, Documentation, and Scheduler

All APIs are tested using **Postman**. No frontend is implemented.

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Native Driver – No Mongoose)**
* **Multer** (Image upload)
* **Postman** (API testing)

---

## 📂 Project Structure

```
src/
├── config/            # MongoDB connection
├── controllers/       # API business logic
├── routes/            # API routes
├── middleware/        # File upload middleware
├── scheduler/         # Background nudge scheduler
├── utils/             # Utility functions (ObjectId validation)
├── app.js
└── server.js
```

---

# ✅ Task 1 – Event API

## 📌 Description

Task 1 focuses on creating **CRUD APIs for Events** using a **schema-less MongoDB design**.
MongoDB’s `_id` is used as the unique identifier for each event.
Image upload is supported, and pagination is implemented for fetching the latest events.

---

## 🌐 Base URL

```
/api/v3/app
```

---

## 📋 Event API Endpoints

| Method | Endpoint                             | Description                       |
| ------ | ------------------------------------ | --------------------------------- |
| POST   | `/events`                            | Create a new event                |
| GET    | `/events?id=:event_id`               | Get event by unique ID            |
| GET    | `/events?type=latest&limit=5&page=1` | Get latest events with pagination |
| PUT    | `/events/:id`                        | Update an event                   |
| DELETE | `/events/:id`                        | Delete an event                   |

---

## 🧾 Event Payload (Schema-less)

```json
{
  "type": "event",
  "uid": 18,
  "name": "Java",
  "tagline": "Learn",
  "schedule": "2026-01-08T18:30:00.000Z",
  "description": "Programming",
  "moderator": "John",
  "category": "Technology",
  "sub_category": "Programming Language",
  "rigor_rank": 5,
  "attendees": [],
  "image": null,
  "createdAt": "2026-01-03T06:26:07.501Z"
}
```

---

## 🧠 Task 1 Highlights

* No mongoose, no schemas
* MongoDB native driver used
* `_id` used as unique identifier
* Supports image upload
* Pagination using `skip` and `limit`
* Fully tested via Postman

---

# ✅ Task 2 – Nudge API & Scheduler

## 📌 Description

Task 2 focuses on designing and documenting APIs for a **Nudge system**.
A **nudge** is a scheduled reminder linked to an **event or article**.

Each nudge references its target using:

* `target_type` → event / article
* `target_id` → MongoDB `_id` of the target

A background scheduler automatically processes nudges when their scheduled time is reached.

---

## 🌐 Base URL

```
/api/v3/app
```

---

## 📋 Nudge API Endpoints

| Method | Endpoint                      | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| POST   | `/nudges`                     | Create a new nudge              |
| GET    | `/nudges/:id`                 | Get nudge by ID                 |
| GET    | `/nudges?target_id=:event_id` | Get nudges for an event/article |
| PUT    | `/nudges/:id`                 | Update a nudge                  |
| DELETE | `/nudges/:id`                 | Delete a nudge                  |

---

## 🧾 Nudge Payload (Schema-less)

```json
{
  "type": "nudge",
  "uid": 18,
  "target_type": "event",
  "target_id": "6958b67f2fd1bc6c910a9964",
  "title": "Java Event Reminder",
  "description": "Reminder to attend Java session",
  "send_at": "2026-01-08T18:30:00.000Z",
  "icon": "bell",
  "invitation_text": "Join the Java learning session",
  "status": "scheduled",
  "createdAt": "2026-01-03T07:00:00.000Z"
}
```

---

## ⏰ Nudge Scheduler

* Scheduler starts automatically when the server starts
* Runs at a fixed interval (every 1 minute)
* Finds nudges where:

  * `status = scheduled`
  * `send_at <= current time`
* Sends the nudge (logic placeholder)
* Updates status to `sent`

---

## 🧠 Task 2 Highlights

* Clean separation between Event and Nudge
* Reference-based design (`target_type`, `target_id`)
* Schema-less and flexible
* Background scheduler for time-based execution
* Easily extensible for future notification systems

---

## ▶️ How to Run the Project

```bash
npm install
node src/server.js
```

Server starts after MongoDB connection is established.

---

## 🧪 Testing

* All APIs are tested using **Postman**
* Scheduler is tested by creating nudges with near-future `send_at` time
* No frontend implementation is required

---

## 🎯 Conclusion

This project demonstrates:

* Schema-less backend design
* Efficient use of MongoDB native driver
* Clean RESTful API structure
* Background scheduling for time-based tasks
* Scalable and flexible architecture suitable for real-world systems

