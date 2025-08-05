import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const dashboardFile = fs.readFileSync(path.join('src', 'app', 'dashboard', 'page.tsx'), 'utf-8');

test('dashboard layout centers content and provides spacing', () => {
  assert(
    dashboardFile.includes('min-h-screen bg-[#0a0a0a] px-6 flex justify-center'),
    'outer container should center content with horizontal padding'
  );
  assert(
    dashboardFile.includes('w-full max-w-screen-xl'),
    'inner container should allow full width up to a large maximum'
  );
  assert(
    dashboardFile.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'),
    'kanban grid should be responsive with wider gaps'
  );
});
