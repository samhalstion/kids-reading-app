// Stand-in for the `virtual:pwa-register` module used by the single-file demo
// build (vite.single.config.ts), which omits the PWA/service-worker plugin.
export function registerSW(): () => void {
  return () => {};
}
