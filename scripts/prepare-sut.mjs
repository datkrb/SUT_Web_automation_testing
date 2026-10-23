import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.resolve(process.env.SUT_ROOT || path.join(root, '../../eshop-sut'));
const runtime = path.join(root, '.runtime');
const excluded = new Set(['node_modules', '.git', 'dist', '.vite']);
const serverSource = await fs.readFile(path.join(source, 'backend/server.js'), 'utf8');
if (!serverSource.includes('const PORT = 3000;')) {
  throw new Error('SUT port declaration changed. Review the isolated port adapter before running.');
}
for (const part of ['backend', 'frontend-web']) {
  const target = path.join(runtime, part);
  await fs.mkdir(target, { recursive: true });
  await fs.cp(path.join(source, part), target, {
    recursive: true,
    filter: entry => !entry.split(path.sep).some(segment => excluded.has(segment)) && !/\.sqlite(?:-wal|-shm)?$/.test(entry),
  });
  // Reuse installed dependencies when present; otherwise follow the README install commands.
  const dependencies = path.join(source, part, 'node_modules');
  try {
    await fs.access(dependencies);
    await fs.cp(dependencies, path.join(target, 'node_modules'), { recursive: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.log(`Install dependencies: npm.cmd install --prefix .runtime/${part}`);
  }
}
await fs.writeFile(path.join(runtime, 'backend/server.js'), serverSource.replace('const PORT = 3000;', 'const PORT = 3010;'));
console.log('Prepared isolated EShop at .runtime (API 3010, web 5180). Original SUT is untouched.');
