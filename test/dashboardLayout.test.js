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
      'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'
    ),
    'inner container should center content with responsive padding and max width'
  );
  assert(
    dashboardFile.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6'),
    'kanban grid should use clean responsive Tailwind CSS grid layout'
  );
  assert(
    dashboardFile.includes('bg-[#1a1a1a] border border-[#ff0000] rounded'),
    'TODO column should have proper styling and borders'
  );
});
