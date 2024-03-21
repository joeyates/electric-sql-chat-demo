<a href="https://electric-sql.com">
  <picture>
    <source media="(prefers-color-scheme: dark)"
        srcset="https://raw.githubusercontent.com/electric-sql/meta/main/identity/ElectricSQL-logo-light-trans.svg"
    />
    <source media="(prefers-color-scheme: light)"
        srcset="https://raw.githubusercontent.com/electric-sql/meta/main/identity/ElectricSQL-logo-black.svg"
    />
    <img alt="ElectricSQL logo"
        src="https://raw.githubusercontent.com/electric-sql/meta/main/identity/ElectricSQL-logo-black.svg"
    />
  </picture>
</a>

# ElectricSQL Chat Demo

This application presents a single-channel chat.

Users can register and participate in the chat.

N.B. Until the [work on shapes](https://electric-sql.com/docs/reference/roadmap#shapes)
progresses, it will not be possible to have private chats where users only have access
to messages that have been sent to/by them.

The application uses ElectricSQL in the browser with [wa-sqlite](https://electric-sql.com/docs/integrations/drivers/web/wa-sqlite).

## Pre-reqs

You need [NodeJS >= 16.11 and Docker Compose v2](https://electric-sql.com/docs/usage/installation/prereqs).

## Install

Install the dependencies:

```sh
npm install
```

## Setup

Start Postgres and Electric using Docker:

```sh
npm run backend:up
```

Create the database tables:

```sh
npm run db:migrate
```

## Run

Start the app:

```sh
npm run dev
```

Open [localhost:5173](http://localhost:5173) in your web browser.

An authentication server, running on port 4173 is also started.
