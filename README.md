# Podcast App

Esto es una prueba que consiste en la creación de una mini-aplicación para escuchar podcasts musicales creada con react. La aplicación es una Single Page Application (SPA) de manera que la navegación se realizará siempre en cliente, sin refrescar completamente el documento principal en ningún momento.

La aplicación tendrá únicamente tres vistas:
1. Vista principal
2. Detalles de un podcast
3. Detalles de un capítulo de un podcast




## Contenido

1. [Descripción](#descripción)
2. [Requisitos](#requisitos)
3. [Instalación](#instalación)
4. [Ejecución en modo desarrollo](#ejecución-en-modo-desarrollo)
5. [Ejecución en modo producción](#ejecución-en-modo-producción)
6. [Tags de evolución](#tags-de-evolución)

## Descripción

Esta aplicacion recoge un listado de 100 podcast de Apple.com de los cuales puedes ver sus detalles y un listado de 20 episodios para cada uno, los cuales puedes escuchar dentro de ella.

## Requisitos

- Node.js (versión recomendada: 14.x o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/danylvr37/podcast-app.git
    cd nombre-del-repo
    ```
2. Instala las dependencias:
    ```sh
    npm install
    # o si prefieres yarn
    yarn install
    ```

## Ejecución en modo desarrollo

Para iniciar la aplicación en modo desarrollo:

```sh
npm run dev
```
La aplicación se ejecutará en http://localhost:5173/

## Ejecución en modo producción

```sh
npm run build
# o si prefieres yarn
yarn build
```
La aplicación se lanzará en http://localhost:4173/.

## Tags de evolución
v1.1: Creación del enrutado base y de la página Home con el filtro del podcast por nombre
v1.1.2: Actualización del buscador por artista, añadiendo cambios visuales y guardando en el almacenamiento local por un día el listado general de podcast
v1.2: Añadiendo las vistas de detalles del podcast  y del episodio y creando el método de carga de las páginas
v1.2.1: Organizando la estructura de algunos archivos y desarrollando el método de coincidencias del filtro de búsqueda
v1.2.3: Añadiendo el almacenamiento local de la información de la página de detalles del podcast