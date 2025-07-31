-- Create Ideas table if not exists
CREATE TABLE IF NOT EXISTS public.ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    problem TEXT NOT NULL,
    audience TEXT NOT NULL,
    stage TEXT NOT NULL CHECK (stage IN ('idea', 'prototype', 'testing', 'launched')) DEFAULT 'idea',
    experiment_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create Todos table if not exists
CREATE TABLE IF NOT EXISTS public.todos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create Goals table if not exists
CREATE TABLE IF NOT EXISTS public.goals (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    idea_id UUID REFERENCES public.ideas(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    target_date DATE,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

-- Create function to update updated_at timestamps if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at if not exists
CREATE OR REPLACE TRIGGER update_ideas_updated_at
    BEFORE UPDATE ON public.ideas
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON public.todos
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_goals_updated_at
    BEFORE UPDATE ON public.goals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create RLS policies if not exists
ALTER TABLE public.ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- Ideas policies
CREATE POLICY IF NOT EXISTS "Users can view their own ideas" ON public.ideas
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own ideas" ON public.ideas
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own ideas" ON public.ideas
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own ideas" ON public.ideas
    FOR DELETE
    USING (auth.uid() = user_id);

-- Todos policies
CREATE POLICY IF NOT EXISTS "Users can view their own todos" ON public.todos
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own todos" ON public.todos
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own todos" ON public.todos
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own todos" ON public.todos
    FOR DELETE
    USING (auth.uid() = user_id);

-- Goals policies
CREATE POLICY IF NOT EXISTS "Users can view their own goals" ON public.goals
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own goals" ON public.goals
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own goals" ON public.goals
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own goals" ON public.goals
    FOR DELETE
    USING (auth.uid() = user_id);
