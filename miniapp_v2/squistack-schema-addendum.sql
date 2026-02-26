-- SquiStack schema addendum
-- Run this ONCE in your Neon dashboard → SQL Editor
-- Safe to run multiple times (uses IF NOT EXISTS)
-- Adds the joint_vault_contracts table for the JointVault feature.

-- ── JointVault contract status enum ─────────────────────────────
DO $$ BEGIN
  CREATE TYPE jv_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ── JointVault contracts ─────────────────────────────────────────
-- A JointVault contract is created by a whitelisted user (the "leader").
-- It sits in 'pending' until an admin approves it via the Daemon Console.
-- Only approved contracts are visible/joinable by other users.
-- The access_code is generated on creation and used by members to join.

CREATE TABLE IF NOT EXISTS joint_vault_contracts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id      UUID NOT NULL REFERENCES users(id),   -- whitelisted user who created it
  name            TEXT NOT NULL,
  access_code     TEXT NOT NULL UNIQUE,                 -- 8-char uppercase code shared with group
  amount_ngn      NUMERIC(18, 2) NOT NULL,              -- fixed contribution per member (NGN)
  max_members     INTEGER NOT NULL,
  current_members INTEGER NOT NULL DEFAULT 0,           -- incremented when someone joins
  status          jv_status NOT NULL DEFAULT 'pending',
  admin_note      TEXT,                                 -- reason for rejection or approval note
  reviewed_by     TEXT,                                 -- operator email who approved/rejected
  reviewed_at     TIMESTAMP,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);

-- Index for fast access-code lookups (used on every join attempt)
CREATE INDEX IF NOT EXISTS idx_jv_contracts_code   ON joint_vault_contracts(access_code);
CREATE INDEX IF NOT EXISTS idx_jv_contracts_creator ON joint_vault_contracts(creator_id);
CREATE INDEX IF NOT EXISTS idx_jv_contracts_status  ON joint_vault_contracts(status);
