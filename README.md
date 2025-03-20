# Marvel Characters App

Este proyecto es una aplicación web desarrollada con ReactJS bajo Next.js que permite explorar una serie de ejercicios.

## Deploy en Vercel

La aplicación esta desplegada y se pude ver en [Exercises App](https://exercises-eight-tan.vercel.app/)

## Tecnologías utilizadas

- React: Biblioteca para construir la interfaz de usuario de manera declarativa.

- Next.js: Framework de React que proporciona renderizado del lado del servidor (SSR) y generación estática (SSG).

- TypeScript: Tipado estático para mejorar la mantenibilidad y robustez del código.

- Jest + React Testing Library: Pruebas unitarias y de integración.

## Arquitectura y diseño

Para una arquitectura escalable y basada en patrones de diseño modernos, se considera identificar y organizar la aplicación en módulos según los dominios (Ejercicio1, Ejercicio2...)

### Estructura de Directorios

Esta estructura permite que el modelo de código refleje de forma precisa conceptos de negocio (por ejercicios), cada módulo tiene su propósito claro (UI, estado, lógica de negocio).

```bash
src/
├── app/                    # Rutas principales
│   ├── exercise1/          # Lógica y servicios para ejercicio 1
│   ├── exercise2/          # Lógica y servicios para ejercicio 2
│   ├── common/             # Lógica compartida entre dominios
├── components/             # Componentes UI
├── hooks/                  # Hooks personalizados
├── api/                    # Integración con APIs externas
├── utils/                  # Utilidades generales, funciones auxiliares
├── styles/                 # estilos globales y/o generales
```

### Explicación de la Arquitectura

#### Ejercicio 1 y 2

1. app/exercise1/page.tsx y app/exercise2/page.tsx

Son las páginas donde se usará el componente <Range />.
Cada una configurará el componente con sus respectivos valores.

2. components/Range/

- Range.tsx: Implementación del componente.
- Range.module.css: Estilos para el componente.
- types.ts: Definiciones de tipos (ej. RangeProps).
- Range.test.tsx: Pruebas unitarias e integración.

3. hooks/useRange.ts

Hook para manejar la lógica del slider.
Maneja el estado y eventos de arrastrar.

3. api/mockService.ts

Simula un servicio de datos con fetch o un objeto mockeado.

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/javierldiazg/exercises.git
cd exercises
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) con su navegador para ver la App.

Ejecutar tests:

```bash
npm test
```
