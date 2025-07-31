-- Insert demo user
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'demo@startuptracker.com',
    json_build_object('full_name', 'Demo User', 'avatar_url', 'https://ui-avatars.com/api/?name=Demo+User&background=000000&color=00ff00')
);

-- Insert demo ideas
INSERT INTO public.ideas (id, user_id, title, problem, audience, stage, experiment_notes)
VALUES 
    (
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'AI-Powered Personal Finance Assistant',
        'Millennials struggle to manage their finances effectively due to lack of financial literacy and overwhelming financial apps.',
        'Tech-savvy millennials aged 25-35 who are interested in personal finance but find traditional banking apps too complex.',
        'idea',
        'Conducted 5 user interviews, found common pain points around budget tracking and investment education. Considering MVP with chatbot interface for basic financial advice.'
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000001',
        'Eco-Friendly Meal Subscription Service',
        'Busy professionals want to eat healthy but lack time for meal planning and grocery shopping. Current meal delivery services generate too much packaging waste.',
        'Health-conscious professionals aged 30-45 living in urban areas.',
        'prototype',
        'Built a landing page and collected 150 email signups. Planning to launch a pilot program with 50 subscribers in Q3.'
    );

-- Insert demo todos for the first idea
INSERT INTO public.todos (id, idea_id, user_id, title, completed)
VALUES 
    (
        '00000000-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'Research existing AI chatbot solutions',
        true
    ),
    (
        '00000000-0000-0000-0000-000000000005',
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'Create user persona profiles',
        true
    ),
    (
        '00000000-0000-0000-0000-000000000006',
        '00000000-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000001',
        'Design initial chatbot flow',
        false
    );

-- Insert demo goals for the second idea
INSERT INTO public.goals (id, idea_id, user_id, title, description, target_date, completed)
VALUES 
    (
        '00000000-0000-0000-0000-000000000007',
        '00000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000001',
        'Pilot Program Launch',
        'Launch pilot program with 50 subscribers and collect feedback on meal variety and packaging.',
        '2024-09-01',
        false
    ),
    (
        '00000000-0000-0000-0000-000000000008',
        '00000000-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000001',
        'Supply Chain Setup',
        'Establish partnerships with local farmers and suppliers for sustainable ingredients.',
        '2024-08-15',
        false
    );
