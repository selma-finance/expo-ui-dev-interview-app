# Selma Portfolio Customisation

An [Expo](https://expo.dev) Managed demo app for a three-step portfolio customisation flow: pick a portfolio, set preferences (including Swiss bias), then review allocation changes, costs, and risk before confirming.

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
   yarn start
   ```

   To enable tunneling, first install

   ```bash
   yarn global add @expo/ngrok
   ```

   Then run the following to start your dev server from a tunnel URL:

   ```bash
   yarn start --tunnel
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Code layout

- `src/screens/` — screen-level UI; the customisation flow lives under `App/Portfolio/Customisation/`
- `src/components/` — shared UI building blocks (cards, buttons, form controls, etc.)
- `src/navigation/` — stack navigators that wire screens together
- `src/models/` — domain hooks and helpers (portfolio colours, risk metrics, allocations)
- `src/styling/` — design tokens (spacing, fonts, radii) and the Restyle theme
- `design-language/` — Figma-derived semantic colour tokens

## Theming

Styling is built on [@shopify/restyle](https://github.com/Shopify/restyle). The theme in `src/styling/restyle/defaultTheme.ts` combines tokens from `src/styling/` with semantic colours from `design-language/`. Light and dark variants follow the system colour scheme via `ThemeProvider` in `RootNavigator`.

Use the Restyle primitives and props instead of inline styles where possible:

- `Box` — layout container (`padding="m"`, `backgroundColor="backgroundPrimary"`, …)
- `Text` — typography via `variant` (`h1`, `primary`, `secondary`, …) and semantic `color` props
- `useTheme()` — access theme values in components that need raw tokens (charts, icons, etc.)
