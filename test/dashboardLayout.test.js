import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const dashboardFile = fs.readFileSync(path.join('src', 'app', 'dashboard', 'page.tsx'), 'utf-8');

test('dashboard layout centers content and provides spacing', () => {
  assert(
    dashboardFile.includes('min-h-screen bg-[#0a0a0a]'),
    'outer container should use full viewport height with dark background'
  );
  assert(
    dashboardFile.includes(
      'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'
    ),
    'inner container should center content with responsive padding and max width'
  );
  assert(
    dashboardFile.includes('kanban-grid mt-6'),
    'kanban grid should use custom CSS grid classes for proper alignment'
  );
  assert(
    dashboardFile.includes('kanban-column bg-[#1a1a1a]'),
    'kanban columns should use custom CSS classes for proper flex layout'
  );
});
