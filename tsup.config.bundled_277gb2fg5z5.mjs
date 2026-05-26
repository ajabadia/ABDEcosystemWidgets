// tsup.config.ts
import { defineConfig } from "tsup";
var tsup_config_default = defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "lucide-react",
    "@abd/styles",
    "next",
    "next/link",
    "next/image",
    "next/navigation"
  ],
  onSuccess: async () => {
    const fs = await import("fs");
    const js = fs.readFileSync("dist/index.js", "utf-8");
    fs.writeFileSync("dist/index.js", '"use client";\n' + js);
    try {
      const mapPath = "dist/index.js.map";
      if (fs.existsSync(mapPath)) {
        const map = JSON.parse(fs.readFileSync(mapPath, "utf-8"));
        map.mappings = ";" + map.mappings;
        fs.writeFileSync(mapPath, JSON.stringify(map));
      }
    } catch {
    }
  }
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiRDpcXFxcZGVzYXJyb2xsb3NcXFxcQUJEU3VpdGVcXFxcQUJERWNvc3lzdGVtV2lkZ2V0c1xcXFx0c3VwLmNvbmZpZy50c1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCJEOlxcXFxkZXNhcnJvbGxvc1xcXFxBQkRTdWl0ZVxcXFxBQkRFY29zeXN0ZW1XaWRnZXRzXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9EOi9kZXNhcnJvbGxvcy9BQkRTdWl0ZS9BQkRFY29zeXN0ZW1XaWRnZXRzL3RzdXAuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndHN1cCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVudHJ5OiBbJ3NyYy9pbmRleC50cyddLFxuICBmb3JtYXQ6IFsnZXNtJ10sXG4gIGR0czogdHJ1ZSxcbiAgc3BsaXR0aW5nOiBmYWxzZSxcbiAgc291cmNlbWFwOiB0cnVlLFxuICBjbGVhbjogdHJ1ZSxcbiAgdHJlZXNoYWtlOiB0cnVlLFxuICBleHRlcm5hbDogW1xuICAgICdyZWFjdCcsIFxuICAgICdyZWFjdC1kb20nLCBcbiAgICAnbHVjaWRlLXJlYWN0JywgXG4gICAgJ0BhYmQvc3R5bGVzJyxcbiAgICAnbmV4dCcsXG4gICAgJ25leHQvbGluaycsXG4gICAgJ25leHQvaW1hZ2UnLFxuICAgICduZXh0L25hdmlnYXRpb24nXG4gIF0sXG4gIG9uU3VjY2VzczogYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGZzID0gYXdhaXQgaW1wb3J0KCdmcycpO1xuICAgIGNvbnN0IGpzID0gZnMucmVhZEZpbGVTeW5jKCdkaXN0L2luZGV4LmpzJywgJ3V0Zi04Jyk7XG4gICAgZnMud3JpdGVGaWxlU3luYygnZGlzdC9pbmRleC5qcycsICdcInVzZSBjbGllbnRcIjtcXG4nICsganMpO1xuICAgIC8vIEFkanVzdCBzb3VyY2VtYXAgb2Zmc2V0IHRvIGFjY291bnQgZm9yIHRoZSBwcmVwZW5kZWQgbGluZVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXBQYXRoID0gJ2Rpc3QvaW5kZXguanMubWFwJztcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jKG1hcFBhdGgpKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKG1hcFBhdGgsICd1dGYtOCcpKTtcbiAgICAgICAgbWFwLm1hcHBpbmdzID0gJzsnICsgbWFwLm1hcHBpbmdzO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKG1hcFBhdGgsIEpTT04uc3RyaW5naWZ5KG1hcCkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UixTQUFTLG9CQUFvQjtBQUVwVCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPLENBQUMsY0FBYztBQUFBLEVBQ3RCLFFBQVEsQ0FBQyxLQUFLO0FBQUEsRUFDZCxLQUFLO0FBQUEsRUFDTCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxXQUFXLFlBQVk7QUFDckIsVUFBTSxLQUFLLE1BQU0sT0FBTyxJQUFJO0FBQzVCLFVBQU0sS0FBSyxHQUFHLGFBQWEsaUJBQWlCLE9BQU87QUFDbkQsT0FBRyxjQUFjLGlCQUFpQixvQkFBb0IsRUFBRTtBQUV4RCxRQUFJO0FBQ0YsWUFBTSxVQUFVO0FBQ2hCLFVBQUksR0FBRyxXQUFXLE9BQU8sR0FBRztBQUMxQixjQUFNLE1BQU0sS0FBSyxNQUFNLEdBQUcsYUFBYSxTQUFTLE9BQU8sQ0FBQztBQUN4RCxZQUFJLFdBQVcsTUFBTSxJQUFJO0FBQ3pCLFdBQUcsY0FBYyxTQUFTLEtBQUssVUFBVSxHQUFHLENBQUM7QUFBQSxNQUMvQztBQUFBLElBQ0YsUUFBUTtBQUFBLElBQUM7QUFBQSxFQUNYO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
