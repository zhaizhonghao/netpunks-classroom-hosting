import { writeFile } from 'node:fs/promises';
import { imageSvg, traitsFor } from '../../shared/art.js';

const examples = [0, 1, 42, 42].map(id => ({ id, traits: traitsFor(id), svg: imageSvg(id) }));
await writeFile(new URL('./avatar-examples.json', import.meta.url), JSON.stringify(examples, null, 2) + '\n');
console.log('Generated offline avatar examples from shared/art.js: 0, 1, 42, and 42 again.');
