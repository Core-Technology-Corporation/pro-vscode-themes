# Pro VSCode Themes

## Descripción breve (tarjeta)

Tema de color **Pro Dark** para VS Code, generado a partir de una paleta de tokens: interfaz y resaltado de sintaxis coherentes, de bajo deslumbramiento y con acento azul.

## Descripción completa

Pro VSCode Themes no se escribe a mano. Un generador en Node combina:

- una **paleta** de 32 tokens de color (`bg0`, `fg`, `accentBlue`, `borderSubtle`, etc.);
- archivos de colores de la **interfaz** por componente (editor, barra de actividades, barra lateral, barra de estado, panel y terminal);
- reglas de **resaltado de sintaxis** comunes y por lenguaje (JavaScript, TypeScript, Python y Rust).

El resultado es el archivo final del tema. Hoy se distribuye **Pro Dark**; las variantes Light, Midnight y Soft ya están en la estructura y se generarán cuando sus paletas estén listas.

## Problema que resuelve

Mantener a mano un tema de VS Code (cientos de claves de color) lleva a inconsistencias. Separar la paleta de la estructura permite cambiar un color en un solo lugar y crear variantes nuevas sin duplicar trabajo.

## Objetivo

Ofrecer un tema oscuro cómodo para sesiones largas y una base técnica para una familia de temas.

## Público objetivo

Desarrolladores que usan VS Code durante muchas horas y prefieren temas de bajo contraste.

## Mi participación técnica

Confirmado por el historial de git: autor de todos los commits del repositorio (desde 2026-07-09).

## Funcionalidades destacadas

- Tema Pro Dark aplicado a todo el workbench: editor, pestañas, barra lateral, terminal y decoraciones de Git.
- Resaltado ajustado por lenguaje.
- Generador con validación: falla si la estructura usa un token que no está en la paleta.
- Variantes preparadas con un flag `ready`.

## Tecnologías

| Categoría | Tecnologías |
|---|---|
| Generador | Node.js (sin dependencias) |
| Formato | Color Theme JSON de VS Code (`colors` + `tokenColors`) |
| Plataforma | VS Code ^1.80 |
| Publicación | `vsce`, script `release.js` (build + package + commit) |

## Arquitectura y aspectos técnicos

- **Diseño por tokens**: la estructura (`src/ui`, `src/semantic`) referencia `{{token}}`, y la paleta (`src/palettes`) define los valores, a la manera de los *design tokens* de los sistemas de diseño.
- El build se ejecuta de forma automática antes de empaquetar (`vscode:prepublish`), así que el `.vsix` siempre corresponde al código fuente.

## Seguridad

No aplica: la extensión no tiene código de ejecución.

## Retos técnicos

- Mantener una jerarquía visual consistente en todos los componentes del workbench.
- Diseñar un sistema de tokens que sirva tanto para la interfaz como para la sintaxis.

## Mejoras futuras recomendadas

- Diseñar las paletas Light, Midnight y Soft.
- Agregar en el build una verificación de contraste (WCAG) entre el texto y el fondo.

## Estado

Versión `1.0.0` con un solo tema disponible (Pro Dark). Existe un `.vsix` empaquetado.

## Capturas

| Archivo | Contenido |
|---|---|
| `presentacion/01-vista-principal.png` | VS Code con **Pro Dark** mostrando el generador del tema (`build.js`) y la estructura del proyecto. |
| `presentacion/02-funcionalidad-principal.png` | Pro Dark sobre código TypeScript real, con la terminal integrada abierta. |
| `presentacion/03-funcionalidad-complementaria.png` | Selector de temas de VS Code con **Pro Dark** seleccionado y la paleta `dark.json` de fondo. |

Capturas de la extensión ejecutándose en un *Extension Development Host*, sobre copias de los repositorios.
