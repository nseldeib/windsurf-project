import test from 'node:test';
import assert from 'node:assert';

// Regex used for client-side form pattern
const htmlPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Regex used in login handler
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

test('email validation allows uppercase characters', () => {
  const email = 'USER@EXAMPLE.COM';
  assert(emailRegex.test(email), 'emailRegex should accept uppercase email');
  assert(htmlPattern.test(email), 'HTML pattern should accept uppercase email');
});
