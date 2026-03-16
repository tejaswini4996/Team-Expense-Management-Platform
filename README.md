# Team Expense Management Platform

A Node.js application for managing team expenses with JWT auth, PostgreSQL, Redis, rate limiting, and Stripe payment integration.

## Tech Stack
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Cache**: Redis
- **Authentication**: JWT
- **Payments**: Stripe
- **Deployment**: AWS + Docker

## Setup

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL
- Redis

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in values
3. Install dependencies: `npm install`
4. Run with Docker: `docker-compose up`

### API Endpoints

**Auth**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

**Teams**
- `POST /api/teams` - Create team
- `POST /api/teams/member` - Add team member
- `GET /api/teams/:team_id/members` - Get team members

**Expenses**
- `POST /api/expenses` - Create expense
- `GET /api/expenses/:team_id` - Get team expenses
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

**Payments**
- `POST /api/payments` - Create payment
- `POST /api/payments/:payment_id/confirm` - Confirm payment

## Running
- Development: `npm run dev`
- Production: `npm start`
- Docker: `docker-compose up`