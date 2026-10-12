-- Reference schema for Member 3 to review and turn into managed migrations.
-- Run only against a development database after team review.

CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY,
    student_id VARCHAR(64) NOT NULL UNIQUE,
    display_name VARCHAR(200) NOT NULL,
    identity_subject VARCHAR(255) NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS computers (
    id UUID PRIMARY KEY,
    computer_code VARCHAR(64) NOT NULL UNIQUE,
    hostname VARCHAR(255) NOT NULL,
    lab_location VARCHAR(255),
    agent_version VARCHAR(64),
    last_seen_at TIMESTAMPTZ,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES students(id),
    computer_id UUID NOT NULL REFERENCES computers(id),
    os_session_id VARCHAR(128),
    login_at TIMESTAMPTZ NOT NULL,
    logout_at TIMESTAMPTZ,
    status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'ended', 'interrupted')),
    end_reason VARCHAR(40),
    CHECK (logout_at IS NULL OR logout_at >= login_at)
);

CREATE INDEX IF NOT EXISTS idx_sessions_student_time ON sessions(student_id, login_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_computer_time ON sessions(computer_id, login_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);

CREATE TABLE IF NOT EXISTS audit_events (
    id UUID PRIMARY KEY,
    computer_id UUID NOT NULL REFERENCES computers(id),
    session_id UUID REFERENCES sessions(id),
    event_id VARCHAR(255) NOT NULL UNIQUE,
    event_type VARCHAR(32) NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    payload JSONB
);
