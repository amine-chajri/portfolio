import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { config } from '../config.js';

let writeQueue = Promise.resolve();

async function readMessages() {
  try {
    const raw = await fs.readFile(config.contactStorePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export function saveMessageLocally(payload) {
  const entry = {
    id: randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
  };

  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(path.dirname(config.contactStorePath), { recursive: true });
    const messages = await readMessages();
    messages.unshift(entry);
    const tempFile = `${config.contactStorePath}.tmp`;
    await fs.writeFile(tempFile, `${JSON.stringify(messages, null, 2)}\n`, 'utf8');
    await fs.rename(tempFile, config.contactStorePath);
    return entry;
  });

  return writeQueue;
}
