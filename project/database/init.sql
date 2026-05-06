CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (name, email)
    VALUES ('Joe', 'joe@ibm.com'), ('Ryan', 'ryan@faztweb.com')
    ON CONFLICT (email) DO NOTHING;
