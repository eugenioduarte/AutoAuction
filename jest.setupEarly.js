// Bloqueia o getter lazy que tenta carregar o winter runtime do Expo
Object.defineProperty(globalThis, '__ExpoImportMetaRegistry', {
  value: {},
  writable: true,
  configurable: true,
})
