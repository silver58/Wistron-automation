-- ════════════════════════════════════════════════════════════════════════════
-- WISTRON AUTOMATION TEAM — Parts Inventory Schema
-- ════════════════════════════════════════════════════════════════════════════
-- Three tables form the inventory backbone:
--
--   parts_master   — the engineer-managed master catalog of part TYPES
--   machines       — every machine across the 6 areas (~60 rows)
--   machine_parts  — links a machine to a part, with current quantity on hand
--
-- The UI is read/write on machine_parts (techs adjust quantities + notes +
-- photos as they use or restock parts). parts_master and machines are
-- password-gated.
-- ════════════════════════════════════════════════════════════════════════════

-- ── PARTS MASTER ──────────────────────────────────────────────────────────
-- The fixed catalog of part types. Engineers add new part definitions here;
-- techs cannot add new parts on the fly. They can only adjust quantities of
-- parts that have already been linked to their machine.
CREATE TABLE IF NOT EXISTS public.parts_master (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,             -- e.g., "Spring 5mm M3"
  part_number TEXT,               -- optional SKU / vendor part #
  description TEXT,
  default_photo_url TEXT,         -- reference photo from spec sheet
  created_by TEXT
);
CREATE INDEX IF NOT EXISTS idx_pm_name ON public.parts_master(name);

-- ── MACHINES ──────────────────────────────────────────────────────────────
-- One row per physical machine. The (area, machine_code) pair is unique.
-- A new area or machine can be added without touching the schema.
CREATE TABLE IF NOT EXISTS public.machines (
  id BIGSERIAL PRIMARY KEY,
  area TEXT NOT NULL,             -- "Line 1", "Line 2", "Line 4", "DIP Line", "PODS", "Pack Out"
  machine_code TEXT NOT NULL,     -- "S1"..."S18", "Conveyor", "Rack Placement Robot", "AVI 1", etc.
  display_order INT DEFAULT 0,    -- so we can sort S1, S2, ..., S10 (not S1, S10, S2)
  notes TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_machines_area_code
  ON public.machines(area, machine_code);
CREATE INDEX IF NOT EXISTS idx_machines_area ON public.machines(area);

-- ── MACHINE_PARTS ─────────────────────────────────────────────────────────
-- The actual inventory. Each row says "Machine M has Part P with quantity Q".
-- This is what techs read and update. A machine can have many parts; a part
-- can be on many machines (it's a many-to-many through this table).
CREATE TABLE IF NOT EXISTS public.machine_parts (
  id BIGSERIAL PRIMARY KEY,
  machine_id BIGINT NOT NULL REFERENCES public.machines(id) ON DELETE CASCADE,
  part_id BIGINT NOT NULL REFERENCES public.parts_master(id) ON DELETE RESTRICT,
  quantity INT NOT NULL DEFAULT 0,
  reorder_threshold INT,          -- optional — flag red if quantity drops to/below this
  notes TEXT,                     -- free text: condition, location on machine, lot #, etc.
  photo_url TEXT,                 -- a tech-provided photo (e.g. "here's what mine looks like")
  last_updated_by TEXT,
  last_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- One link per machine+part — adjusting quantity edits the existing row
CREATE UNIQUE INDEX IF NOT EXISTS uq_machine_parts_machine_part
  ON public.machine_parts(machine_id, part_id);
CREATE INDEX IF NOT EXISTS idx_machine_parts_machine ON public.machine_parts(machine_id);
CREATE INDEX IF NOT EXISTS idx_machine_parts_part    ON public.machine_parts(part_id);

-- ── ADJUSTMENT LOG (audit trail) ──────────────────────────────────────────
-- Every quantity change writes a row here. Lets engineers see usage patterns
-- (Part X gets used twice a week on average → reorder cadence). Optional but
-- worth having from day 1 — adding it later means losing all the history.
CREATE TABLE IF NOT EXISTS public.parts_adjustments (
  id BIGSERIAL PRIMARY KEY,
  machine_part_id BIGINT NOT NULL REFERENCES public.machine_parts(id) ON DELETE CASCADE,
  delta INT NOT NULL,             -- +N for restock, -N for usage
  quantity_after INT NOT NULL,    -- what the quantity became after this adjustment
  reason TEXT,                    -- "used in repair", "restock from supply room", etc.
  adjusted_by TEXT,
  adjusted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_pa_when ON public.parts_adjustments(adjusted_at DESC);
CREATE INDEX IF NOT EXISTS idx_pa_mp   ON public.parts_adjustments(machine_part_id);

-- ── ROW-LEVEL SECURITY ────────────────────────────────────────────────────
-- All tables are open to the anon key. App-level password gating handles the
-- engineer-only management screens (parts master, machine list editing).
ALTER TABLE public.parts_master       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machines           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.machine_parts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts_adjustments  ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY['parts_master','machines','machine_parts','parts_adjustments'])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "anon_all_%s" ON public.%s', t, t);
    EXECUTE format('CREATE POLICY "anon_all_%s" ON public.%s FOR ALL USING (true) WITH CHECK (true)', t, t);
  END LOOP;
END $$;

-- ── SEED THE 6 AREAS' MACHINES ────────────────────────────────────────────
-- Line 1, Line 2, Line 4 each get S1–S18.
-- DIP Line gets a single "Conveyor" placeholder (segments TBD later).
-- PODS gets a single "Rack Placement Robot" placeholder.
-- Pack Out gets its specific 7 machines.
-- ON CONFLICT DO NOTHING so this is safe to re-run.
DO $$
DECLARE n INT;
BEGIN
  FOR n IN 1..18 LOOP
    INSERT INTO public.machines (area, machine_code, display_order)
    VALUES ('Line 1', 'S' || n, n) ON CONFLICT (area, machine_code) DO NOTHING;
    INSERT INTO public.machines (area, machine_code, display_order)
    VALUES ('Line 2', 'S' || n, n) ON CONFLICT (area, machine_code) DO NOTHING;
    INSERT INTO public.machines (area, machine_code, display_order)
    VALUES ('Line 4', 'S' || n, n) ON CONFLICT (area, machine_code) DO NOTHING;
  END LOOP;
END $$;

INSERT INTO public.machines (area, machine_code, display_order) VALUES
  ('DIP Line', 'Conveyor',               1),
  ('PODS',     'Rack Placement Robot',   1),
  ('Pack Out', 'AVI 1',                  1),
  ('Pack Out', 'AVI 2',                  2),
  ('Pack Out', 'Conveyor',               3),
  ('Pack Out', 'Label 1',                4),
  ('Pack Out', '5-Sided Image',          5),
  ('Pack Out', 'Label 2',                6),
  ('Pack Out', 'Sealing Machine',        7)
ON CONFLICT (area, machine_code) DO NOTHING;

-- ════════════════════════════════════════════════════════════════════════════
-- ALSO NEEDED: a Supabase Storage bucket called 'machine-photos' for the
-- tech-uploaded part photos. Create it via the Supabase dashboard:
--   1. Storage → New bucket
--   2. Name: machine-photos
--   3. Public bucket: ON
--   4. File size limit: 10 MB
--   5. Add policies (or run the SQL below)
-- ════════════════════════════════════════════════════════════════════════════
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('machine-photos', 'machine-photos', true, 10485760)
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 10485760;

DROP POLICY IF EXISTS "machinephotos_public_read" ON storage.objects;
DROP POLICY IF EXISTS "machinephotos_anon_insert" ON storage.objects;
DROP POLICY IF EXISTS "machinephotos_anon_delete" ON storage.objects;
CREATE POLICY "machinephotos_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'machine-photos');
CREATE POLICY "machinephotos_anon_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'machine-photos');
CREATE POLICY "machinephotos_anon_delete" ON storage.objects FOR DELETE USING (bucket_id = 'machine-photos');
