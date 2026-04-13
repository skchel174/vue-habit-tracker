# 📘 Hobby Tracker (Pet Project) — Technical Specification

## 1. Overview

**Project goal:**
Develop a simple but production-like web application for tracking habits (hobbies) with support for recurrence, background processing, and statistics.

**Purpose:**

* Demonstrate backend and frontend skills
* Show understanding of async processing (queues, Redis)
* Showcase working with time-based logic (recurrence rules)
* Provide a clean, readable, and deployable project for portfolio

---

## 2. Tech Stack

### Frontend

* Vue 3
* TypeScript
* Vite
* TailwindCSS (optional, but preferred)

### Backend

* Laravel (latest stable version)

### Infrastructure

* PostgreSQL
* Redis (queue + cache)
* Docker (optional but desirable)

---

## 3. Core Features (MVP)

### 3.1 Authentication

* Register
* Login
* Logout

---

### 3.2 Habit Management

User can:

* Create habit
* Edit habit
* Delete habit (soft delete preferred)
* Archive/unarchive habit

#### Habit fields:

* id
* title
* description (optional)
* habitKind:

  * one_time
  * countable
  * duration
* frequency:

  * none
  * daily
  * weekly
  * interval
* interval (number, optional)
* daysOfWeek (array, optional)
* targetCount (optional)
* targetMinutes (optional)
* startDate
* endDate (optional)
* isArchived

---

### 3.3 Recurrence Rules

System must support:

* Daily habits
* Weekly habits (selected days)
* Interval-based habits (every N days)

#### Required behavior:

* Calculate `next_trigger_at`
* Recalculate on habit update
* Stop recurrence if endDate reached

---

### 3.4 Habit Execution (Tracking)

User can:

* Mark habit as completed
* Specify:

  * count (for countable)
  * minutes (for duration)

#### Entity: HabitEntry

* id
* habitId
* date
* status (pending / completed)
* value (count or minutes)

---

### 3.5 Background Jobs (Queue + Redis)

Must implement at least:

#### Job 1: Generate upcoming entries

* Runs daily
* Creates HabitEntry for upcoming day(s)

#### Job 2: Recalculate recurrence

* Triggered on habit update

#### Job 3 (optional but good):

* Calculate stats (streak, completion rate)

---

### 3.6 Statistics

For each habit:

* current streak
* total completions
* completion rate

For dashboard:

* habits for today
* completed today / total

---

## 4. API Design (REST)

### Example endpoints:

#### Auth

* POST /api/register
* POST /api/login
* POST /api/logout

#### Habits

* GET /api/habits
* POST /api/habits
* GET /api/habits/{id}
* PATCH /api/habits/{id}
* DELETE /api/habits/{id}

#### Entries

* GET /api/entries?date=YYYY-MM-DD
* POST /api/entries/{id}/complete

---

## 5. Error Handling

Must include:

* Base AppError
* Derived errors:

  * ValidationError
  * NotFoundError
  * ConflictError

Centralized error handler:

* Consistent JSON response:

```json
{
  "message": "string",
  "code": "string",
  "details": {}
}
```

---

## 6. Frontend Requirements

### Pages

1. Auth (login/register)
2. Dashboard

   * list of today’s habits
   * mark as completed
3. Habit list
4. Habit form (create/edit)

### Requirements:

* Typed API client
* Basic state management (composition API or Pinia)
* Clear component structure

---

## 7. Non-Functional Requirements

* Project must run locally in < 5 minutes setup
* Clear README with:

  * setup steps
  * tech stack
  * architecture overview
* Clean folder structure
* No dead code / commented garbage

---

## 8. Project Structure (Backend)

Example:

```
app/
  Actions/
  Models/
  Jobs/
  Services/
  Exceptions/
  Http/
    Controllers/
    Requests/
```

---

## 9. Definition of Done

Project is considered complete if:

* All core features implemented
* Recurrence works correctly
* Queue jobs executed successfully
* Frontend interacts with backend
* Project can be launched locally
* README explains usage

---

## 10. Time Constraints

Target completion:

* MVP: 7–10 days
* Polishing: +3–5 days

---

## 11. What NOT to Do

* No microservices
* No overengineering
* No complex UI frameworks
* No “perfect architecture” obsession

---

## 12. Expected Outcome

A working application that demonstrates:

* Full-stack development
* Async processing (queues)
* Handling of time-based logic
* Clean and understandable code

---

## Final Note

This is a **pet project**, not a startup.

Focus on:

* clarity
* completeness
* delivery speed

Not on:

* perfection
* feature overload
* premature optimization
