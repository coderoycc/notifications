# Módulo de Gestión de Notificaciones 🔔

## 📄 Descripción

Este proyecto es una réplica de un módulo de gestión de notificaciones que desarrollé durante mi primer trabajo como desarrollador fullstack. Aunque las aplicaciones originales en las que trabajé pertenecen a empresas que no me permiten compartir código ni acceso, esta versión recrea la estructura y funcionalidades clave del módulo, demostrando mis habilidades técnicas y enfoque en diseño escalable y mantenible.

El módulo permite el envío de notificaciones a través de múltiples canales:  
- **Email**  
- **Push notifications** (integración con OneSignal)  
- **SMS WhatsApp** (WhatsApp apis)

Está construido siguiendo los principios de **Clean/Hexagonal Architecture**, lo que garantiza una alta escalabilidad, mantenibilidad y facilidad para extender funcionalidades en el futuro.

---

## 🛠️ Características principales

- **Arquitectura limpia y modular:** separación clara de responsabilidades entre capas (dominio, aplicación, infraestructura).
- **Multicanal:** soporte para envío de notificaciones por email, push y SMS.   
- **Escalabilidad:** diseño pensado para soportar grandes volúmenes de notificaciones sin comprometer el rendimiento.  
- **Extensible:** estructura preparada para agregar nuevos canales o funcionalidades sin afectar la base existente.
- **Plug-in / Unplug:** orientado a cambiar de tecnologia de algun canal de notificación. 

---

## ⚡ Tecnologías utilizadas

- Lenguaje: Node.js / typescript
- Frameworks y librerías: NestJS, TypeORM.  
- Integración con APIs externas: OneSignal, servicios SMTP para email, proveedores whatsapp apis.

---

## 📂 Estructura del proyecto
Es la misma que una arquitectura hexagonal.
-  `/domain` Entidades y lógica de negocio pura.
-  `/application` Casos de uso y servicios de aplicación.
-  `/infrastructure` Implementaciones concretas (APIs, bases de datos, servicios externos) Controladores, endpoints, adaptadores de entrada/salida

## 🤓 Te puede servir.
* Pasos para poder ejecutar este proyecto.
  * Clonar el proyecto `git clone https://github.com/coderoycc/notifications`
  * En la carpeta instalar dependencias `npm i`
  * Copiar el archivo `.env.example` en un nuevo archivo en el mismo nivel de directorio con el nombre `.env`
  * Llena los tipicos valores de typeorm con tus propias credenciales, y todo esta funcional
  * Ejecutar el proyecto en modo watch `npm run start:dev`

* Puedes revisar la documentación indexada de la estructura de todo el proyecto en este enlace 👉 [DeepWiki - Notifications](https://deepwiki.com/coderoycc/notifications)


