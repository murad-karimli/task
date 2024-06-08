import { promises as fs } from 'fs';
import path from 'path';

const dir = './dist';

const renameFiles = async () => {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      if (file.endsWith('.js')) {
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, file.replace('.js', '.mjs'));
        await fs.rename(oldPath, newPath);
      }
    }
  } catch (error) {
    console.error('Error renaming files:', error);
  }
};

renameFiles();
