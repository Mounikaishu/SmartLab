# Database ownership

Member 3 owns schema changes, migration strategy, constraints, seed fixtures, and database tests.

Before applying `schema.sql`, review it with the backend owners and convert schema changes to Alembic migrations for repeatable environments. This file is a reference starting point, not a substitute for migrations.
