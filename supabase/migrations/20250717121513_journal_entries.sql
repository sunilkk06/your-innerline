-- Location: supabase/migrations/20250717121513_journal_entries.sql
-- Journal Entries and Mood Tracking System for Inner Line Mental Health App

-- 1. Create custom types
CREATE TYPE public.mood_type AS ENUM ('great', 'good', 'okay', 'low', 'struggling');

-- 2. Create journal_entries table with encryption support
CREATE TABLE public.journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    encrypted_content TEXT NOT NULL, -- Encrypted journal content
    mood public.mood_type,
    tags TEXT[], -- Array of tags for categorization
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create mood_records table for tracking mood over time
CREATE TABLE public.mood_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mood_value public.mood_type NOT NULL,
    notes TEXT,
    recorded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create indexes for performance
CREATE INDEX idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON public.journal_entries(created_at);
CREATE INDEX idx_journal_entries_mood ON public.journal_entries(mood);
CREATE INDEX idx_mood_records_user_id ON public.mood_records(user_id);
CREATE INDEX idx_mood_records_recorded_at ON public.mood_records(recorded_at);

-- 5. Enable RLS
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_records ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS policies for journal entries
CREATE POLICY "users_can_view_own_journal_entries"
ON public.journal_entries
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "users_can_create_own_journal_entries"
ON public.journal_entries
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_journal_entries"
ON public.journal_entries
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_journal_entries"
ON public.journal_entries
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 7. Create RLS policies for mood records
CREATE POLICY "users_can_view_own_mood_records"
ON public.mood_records
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "users_can_create_own_mood_records"
ON public.mood_records
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_mood_records"
ON public.mood_records
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_delete_own_mood_records"
ON public.mood_records
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 8. Create updated_at trigger for journal entries
CREATE TRIGGER on_journal_entries_updated
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. Create encryption key storage table (for backup/recovery purposes)
CREATE TABLE public.encryption_keys (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    encrypted_key TEXT NOT NULL, -- Key encrypted with user's password
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Enable RLS for encryption keys
ALTER TABLE public.encryption_keys ENABLE ROW LEVEL SECURITY;

-- 11. Create RLS policies for encryption keys
CREATE POLICY "users_can_view_own_encryption_key"
ON public.encryption_keys
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "users_can_create_own_encryption_key"
ON public.encryption_keys
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users_can_update_own_encryption_key"
ON public.encryption_keys
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 12. Create function to get journal statistics
CREATE OR REPLACE FUNCTION public.get_journal_stats(user_id_param UUID)
RETURNS TABLE (
    total_entries BIGINT,
    total_days BIGINT,
    mood_distribution JSONB,
    streak_days INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $
BEGIN
    RETURN QUERY
    WITH mood_counts AS (
        SELECT 
            mood,
            COUNT(*) as count
        FROM 
            public.journal_entries
        WHERE 
            user_id = user_id_param
        GROUP BY 
            mood
    ),
    days AS (
        SELECT 
            COUNT(DISTINCT DATE(created_at)) as unique_days
        FROM 
            public.journal_entries
        WHERE 
            user_id = user_id_param
    ),
    streak AS (
        SELECT 
            MAX(streak_length) as max_streak
        FROM (
            SELECT 
                COUNT(*) as streak_length
            FROM (
                SELECT 
                    DATE(created_at) as entry_date,
                    DATE(created_at) - ROW_NUMBER() OVER (ORDER BY DATE(created_at)) AS grp
                FROM (
                    SELECT DISTINCT DATE(created_at)
                    FROM public.journal_entries
                    WHERE user_id = user_id_param
                    ORDER BY 1
                ) AS distinct_dates
            ) AS streaks
            GROUP BY grp
        ) AS max_streaks
    )
    SELECT 
        COUNT(*) as total_entries,
        (SELECT unique_days FROM days) as total_days,
        COALESCE(
            jsonb_object_agg(
                COALESCE(mood::TEXT, 'unspecified'), 
                count
            ),
            '{}'::jsonb
        ) as mood_distribution,
        COALESCE((SELECT max_streak FROM streak), 0) as streak_days
    FROM 
        public.journal_entries
    LEFT JOIN 
        mood_counts USING (mood)
    WHERE 
        user_id = user_id_param;
END;
$;