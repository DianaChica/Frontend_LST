# Comfort++ 2.0
Este proyecto es la continuación del proyecto de grado realizado por Andrés Cedeño y Angelo Sanchez para la ESCUELA SUPERIOR POLITECNICA DEL LITORAL. La continuación de este proyecto realizado por Diana Chica y Andrés Noboa es una versión mejorada de la app energy-coach-remake para la web, ahora con una arquitectura de backend propia y mejoras sustanciales en la experiencia del usuario. Hecho con React.js y un backend Node.js con MongoDB.

## Generalidades

A diferencia del proyecto original, esta versión no utiliza Firebase para el backend. En lugar de ello, se ha implementado un backend con Node.js y MongoDB que se aloja en el servidor.

### Librerías Usadas

Este proyecto utiliza varias librerías:

- React para el frontend
- MongoDB para la base de datos
- sweetalert2 para alertas en el frontend
- node-fetch para realizar peticiones HTTP

## Instrucciones

### Dependencias

Para instalar las dependencias necesarias, ejecuta:

```bash
npm install sweetalert2
npm install node-fetch@2.6.6
```

Cada vez que realices cambios y quieras verlos reflejados, deberás ejecutar `npm run build` y actualizar el volumen de Docker.
Puedes utilizar el siguiente comando para ejecutar el frontend:

```bash
sudo docker run --name some-nginx -v /home/administrator/paginaweb/frontend_LST/dist:/usr/share/nginx/html -p 80:80 -d --restart always nginx
```

## Trabajos Futuros

Implementación de autenticación y autorización para soportar múltiples usuarios y laboratorios.

## Detalles adicionales

Este proyecto mejora varios aspectos del proyecto original, incluyendo la eliminación de la dependencia de Firebase y la implementación de un backend más robusto y escalable. También se ha simplificado el proceso de votación al eliminar la necesidad de autenticación. Cabe destacar que no se borro las carpetas iniciales sino que se modificó de tal manera que exista la interacción nueva con el backend.
Espero que esta versión del README te sea de ayuda. Si tienes más preguntas o necesitas más detalles, no dudes en preguntar.
