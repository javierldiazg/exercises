# Exercises App

Este proyecto es una aplicación web desarrollada con ReactJS bajo Next.js que permite explorar y analizar la implementación de varios ejercicios.

## Tecnologías utilizadas

- React: Librería para construir la interfaz de usuario.

- Next.js: Framework de React que proporciona renderizado del lado del servidor (SSR).

- TypeScript: Tipado estático para mejorar la mantenibilidad y robustez del código.

- Jest + React Testing Library: Pruebas unitarias y de integración.

## Arquitectura y diseño

Para una arquitectura escalable y basada en patrones de diseño modernos, la aplicación está organizada en módulos según los siguientes dominios: Ejercicio1, Ejercicio2, Common...

### Estructura de Directorios

Esta estructura permitiria reflejar de forma precisa los conceptos del negocio (en estos casos por ejercicio), cada módulo tiene su propósito claro (UI, estado, lógica de negocio).

```bash
src/
├── app/                    # Rutas principales
│   ├── exercise1/          # Lógica y servicios para ejercicio 1
│   ├── exercise2/          # Lógica y servicios para ejercicio 2
│   ├── common/             # Lógica compartida entre dominios
├── components/             # Componentes transversales UI
├── hooks/                  # Hooks personalizados
├── context/                # Almacenamiento de estados
├── api/                    # Integración con APIs externas
├── utils/                  # Utilidades generales, funciones auxiliares
├── styles/                 # estilos globales y/o generales
```

### Explicación de la Arquitectura

#### Ejercicio 1 y 2

##### Mejor testabilidad:

- Cada componente puede ser probado de forma aislada.
- La lógica en hooks personalizados es más fácil de probar sin necesidad de renderizar componentes UI.

##### Mayor escalabilidad:

- Facilita la adición de nuevas características.
- Permite reutilizar componentes en otros contextos.
- Localiza los cambios a partes específicas sin afectar todo el sistema.

##### Separación de responsabilidades:

- Componentes UI solo se preocupan por la presentación.
- Lógica de negocio en hooks personalizados.
- Flujo de datos claramente definido.

##### Mantenimiento simplificado:

- Archivos más pequeños y enfocados.
- Menos acoplamiento entre componentes.
- Más fácil de entender qué hace cada parte.

#### Ejercicio 3

Es una versión mejorada del ejercicio 1. Mejora la adaptabilidad funcional y de experiencia para mobile.

#### Código

1. app/exercise1/page.tsx y app/exercise2/page.tsx

Son las páginas donde se reusará el componente transversales <Range />.
Cada página configurará el componente con sus respectivos valores (lógica de negocio indepndiente).

2. Componentes UI:

- Range.tsx:

Coordina el flujo de datos entre los componentes.
Utiliza los hooks para manejar la lógica.
Compone la interfaz con los componentes más pequeños.

- RangeInput.tsx:

Maneja la representación y comportamiento del campo de entrada.

- RangeLabel.tsx:

Maneja la visualización de los labels de valores.

- RangeTrack.tsx:

Contiene el slider y los manipuladores.

- types.ts:

Definiciones de tipos.

- Range.module.css:

Estilos para el componente.

- Range.test.tsx:

Pruebas unitarias e integración.

3. Hooks personalizados

- useRangeData:

Gestiona el manejo de estados (loading, error y data) para la carga de ranges (mocks) que provienen de la API en mockable.io

- useRange.ts

Hook para manejar la lógica del slider <Range />.
Maneja el estado y eventos de arrastrar.

- useRangeInputs.ts

Encapsula toda la lógica relacionada con los inputs, incluyendo:

Estados para mostrar/ocultar inputs.
Manejo de cambios en los inputs.
Aplicación de nuevos valores al rango.
Cálculo de posiciones y valores.

4. API/Services

- services.ts

Gestiona la conexión y GET para obtener los datos mock a la API en mockable.io

Ejempolo los endpoints http://demo0111712.mockable.io/normal-range y http://demo0111712.mockable.io/fixed-range

- mockServices.ts

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

Abrir [http://localhost:8080](http://localhost:8080) con su navegador para ver la App.

Ejecutar tests:

```bash
npm test
```

## Deploy en Vercel

La aplicación esta desplegada y se pude ver en [Exercises App](https://exercises-eight-tan.vercel.app/)
