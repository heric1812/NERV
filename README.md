# NERV — Instrucciones de instalación y despliegue

Este repositorio contiene una aplicación React Native desarrollada con Expo. Este README reúne pasos detallados para instalar, ejecutar en desarrollo y construir/desplegar la aplicación.

Contenido
- Requisitos
- Instalación (dependencias)
- Desarrollo (ejecución local)
- Comprobaciones (TypeScript)
- Builds / Producción (EAS / Expo)
- Notas y solución de problemas

## Requisitos

- Node.js (recomendado: Node 18 LTS o posterior). Comprueba con `node -v`.
- npm (se instala con Node) o yarn (opcional).
- Expo CLI (opcional para desarrollo): `npm install -g expo-cli` o usar `npx expo`.
- Para builds nativos iOS se necesita macOS y Xcode instalados (solo si no usas EAS managed builds).
- Para builds y envíos a stores se recomienda usar EAS (Expo Application Services).

## Preparar el entorno (instalación de dependencias)

1. Clona el repositorio y sitúate en la carpeta del proyecto:

```zsh
cd /ruta/a/tu/proyecto
# si tu repo local está en nerv-2:
cd nerv-2
```

2. Instala las dependencias declaradas en `package.json`:

```zsh
npm install
# o con yarn
# yarn install
```

Nota: `package.json` incluye dependencias de `react-navigation` y otras librerías. Si ves errores de módulos no encontrados, ejecuta `npm install` de nuevo o instala explícitamente las dependencias faltantes (ej.: `@react-navigation/native`).

3. Si tu proyecto hace uso de módulos nativos y vas a ejecutar en iOS desde un proyecto nativo generado (bare workflow), instala pods (desde la carpeta `ios`):

```zsh
# solo para workflow nativo (no necesario para Expo Go)
cd ios && npx pod-install && cd ..
```

## Ajustes importantes en el código

- `react-native-gesture-handler` debe importarse al entrypoint antes de cualquier otro código nativo relacionado con navegación. En este proyecto ya se hace en `index.ts`:

```ts
import 'react-native-gesture-handler';
```

- Si usas `react-navigation`, asegúrate de instalar también `react-native-screens` y `react-native-safe-area-context`.

## Ejecutar en desarrollo

1. Levantar el servidor de desarrollo (Expo):

```zsh
npm run start
# o con expo directly
# npx expo start
```

2. Abrir en dispositivo/emulador:

- Desde la interfaz de Expo (navegador) puedes abrir en Expo Go en un dispositivo móvil escaneando el QR.
- Para iOS Simulator o Android Emulator puedes usar las opciones que muestra `expo start` o ejecutar:

```zsh
npm run ios   # abre el simulador iOS (si está configurado)
npm run android # abre el emulador Android
```

## Comprobaciones TypeScript y lint

1. Ejecuta la comprobación de tipos (no emit):

```zsh
npx tsc --noEmit
```

Corrige los errores que aparezcan. Errores comunes:
- `Cannot find module '@react-navigation/native'` — indica que faltan dependencias, ejecutar `npm install`.

## Builds y despliegue (Producción)

Se recomiendan los servicios de EAS (Expo Application Services) para construir binarios listos para publicar.

1. Instala EAS CLI y configura tu cuenta Expo:

```zsh
npm install -g eas-cli
eas login
```

2. Inicializar configuración EAS si es la primera vez:

```zsh
eas init
```

3. Construir para Android / iOS (ejemplo, perfil `production`):

```zsh
eas build -p android --profile production
eas build -p ios --profile production
```

4. Descargar artefactos o usar `eas submit` para enviar a Google Play / App Store.

Notas para proyectos Expo Managed
- Si el proyecto está en managed workflow (Expo Go), `eas build` construirá los paquetes nativos en la nube. No es necesario `pod install` localmente.

Notas para proyecto Bare (React Native CLI)
- Si el proyecto fue expulsado (`expo prebuild`), después de `prebuild` tendrás una carpeta `ios`/`android` y necesitarás `cd ios && npx pod-install` y construir con Xcode/Gradle.

## Despliegue web

Para construir versión web (si usas web target):

```zsh
npm run web
# o
npx expo build:web
```

Esto generará los activos estáticos en `web-build/` (o la carpeta que configure `expo`), que puedes desplegar en Netlify, Vercel, Surge, S3 + CloudFront, etc.

## Debugging y errores comunes

- Error: `Cannot find module '@react-navigation/native'` — ejecuta `npm install` y reinicia el servidor.
- Error: `Gesture handler not found` — asegúrate de que `import 'react-native-gesture-handler'` esté en `index.ts` y vuelve a compilar.
- iOS build errors — si usas bare workflow, ejecuta `cd ios && npx pod-install` y abre el workspace en Xcode.

## Notas del proyecto

- Navegación: se usa React Navigation (Stack Navigator). Hay un `AuthProvider` que actúa como guard para rutas protegidas.
- TypeScript: el proyecto está tipado; ejecuta `npx tsc --noEmit` antes de commits si cambias tipos.

## Comandos útiles

```zsh
# instalar dependencias
npm install

# comprobar tipos
npx tsc --noEmit

# iniciar desarrollo
npm run start

# abrir en iOS
npm run ios

# abrir en Android
npm run android

# web
npm run web

# EAS build
eas build -p android --profile production
eas build -p ios --profile production
```

## Contribuciones

Si vas a contribuir, crea una rama por característica, añade pruebas cuando sea posible y asegúrate de que `npx tsc --noEmit` pase antes de abrir un PR.

---

Si quieres, puedo ajustar este README para incluir scripts personalizados, perfiles EAS preconfigurados o instrucciones para CI/CD (GitHub Actions / GitLab CI). ¿Deseas que añada un ejemplo de workflow de CI para builds automáticos con EAS?### Pruebas realizadas en un android:

Modelo: POCO X7 Pro.

Xiaomi HyperOS Android 15

### Comandos para desarrollo

```bash
# Instalar dependencias
$ yarn install

# Levantar el proyecto
$ yarn start
```

### Comandos para generar el apk en expo

```bash
# Instalar el CLI
$ npm install -g eas-cli

# Iniciar sesion en expo
$ eas login

# Comando para generar la apk
$ yarn build:apk
```
