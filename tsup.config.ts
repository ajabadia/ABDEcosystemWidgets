import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react', 
    'react-dom', 
    'lucide-react', 
    '@abd/styles',
    'next',
    'next/link',
    'next/image',
    'next/navigation'
  ],
  onSuccess: async () => {
    const fs = await import('fs');
    const js = fs.readFileSync('dist/index.js', 'utf-8');
    fs.writeFileSync('dist/index.js', '"use client";\n' + js);
    // Adjust sourcemap offset to account for the prepended line
    try {
      const mapPath = 'dist/index.js.map';
      if (fs.existsSync(mapPath)) {
        const map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
        map.mappings = ';' + map.mappings;
        fs.writeFileSync(mapPath, JSON.stringify(map));
      }
    } catch {}
  },
});
