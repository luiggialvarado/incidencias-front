# incidencias-front

Frontend de una app para llevar el control de las incidencias de máquinas. Habla con un backend en Java (Spring Boot) y MySQL, que está en otro repositorio (privado).

**App en vivo:** https://luiggialvarado.github.io/incidencias-front/

## Qué hace

- Registrar una máquina con nombre, tipo y zona.
- Ver la lista de máquinas.
- Ver las incidencias de una máquina, con su fecha, estado y descripción.
- Registrar una incidencia nueva.
- Avisar si faltan campos o si no hay conexión con el servidor.

## Cómo funciona

La página usa `fetch` para pedir y enviar datos en formato JSON al backend:

| Qué hace | Petición |
| --- | --- |
| Listar máquinas | `GET /maquinas` |
| Guardar una máquina | `POST /maquinas` |
| Ver incidencias de una máquina | `GET /maquinas/{id}/incidencias` |

El backend está en Render y la base de datos MySQL en Aiven.

## Aviso

Render y Aiven son servicios gratuitos y se apagan cuando no se usan. Si la lista sale vacía o aparece "No se pudo cargar la lista de máquinas", es por eso y no por la página.

## Archivos

```
index.html   estructura de la página
style.css    estilos
app.js       peticiones al backend y cambios en la pantalla
```
