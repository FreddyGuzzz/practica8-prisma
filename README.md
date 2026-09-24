# Gimnasio API — Práctica 8 (Prisma + MySQL)

API REST en NestJS para el gimnasio: `Clases`, `Horarios`, `Miembros` e `Inscripciones`, cada
módulo con dominio, DTOs e infraestructura separados (patrón repositorio + inyección por token).
Los datos viven en memoria — ningún repositorio se conecta todavía a una base de datos real.

Este proyecto es el punto de partida de la Práctica 8 (Prisma) y la Práctica 9 (Blindar la API).

## Cómo correrlo

```bash
npm install
npm run start:dev
```

El servidor levanta en `http://localhost:3000`. En `peticiones.http` está la batería completa de
pruebas (requiere la extensión "REST Client" de VS Code).

## Estructura

```
src/
  clases/        CRUD de clases del gimnasio
  horarios/      CRUD de horarios (día, hora, cupo, entrenador)
  miembros/      CRUD de miembros del gimnasio
  inscripciones/ inscribir a un miembro a un horario, con reglas de cupo y duplicados
  datos/         datos de arranque (seed) que usan Horarios y Miembros
```

Cada módulo sigue la misma forma: `dominio/` (entidades + interfaz del repositorio), `dto/`,
`infra/` (repositorio en memoria) y el token de inyección en `<módulo>.tokens.ts`.


---

## Práctica 8 — Prisma + MySQL

### Cómo levantar la base de datos

```bash
npm install
# 1. Edita .env y pon la contraseña de tu MySQL (ver .env.example)
# 2. Aplica las migraciones versionadas (crea la BD "gimnasio" si no existe)
npx prisma migrate dev
```

Migraciones incluidas (una por paso, en `prisma/migrations/`):

| # | Carpeta | Qué hace |
|---|---------|----------|
| 1 | `..._init` | Crea la tabla `clase` |
| 2 | `..._agregar_descripcion_clase` | Agrega `clase.descripcion` (texto, opcional) |
| 3 | `..._crear_horario` | Crea `horario` + FK hacia `clase` |
| 4 | `..._crear_miembro` | Crea `miembro` con `correo` único |
| 5 | `..._crear_inscripcion` | Crea `inscripcion` (enum de estado, FKs, único `horarioId + miembroId`) |

### Preguntas

**1. ¿Por qué el paquete del adaptador se llama `adapter-mariadb` si usamos MySQL?**
Porque MySQL y MariaDB hablan el mismo protocolo de red (MariaDB nació como un fork de MySQL) y comparten
prácticamente el mismo dialecto SQL. El adaptador de Prisma está construido sobre el driver `mariadb` de Node.js,
que se conecta sin problema a ambos servidores. Por eso Prisma publica un solo adaptador para las dos bases y lo
nombra por el driver, no por el servidor al que te conectas.

**2. ¿Editar `schema.prisma` cambió algo en la base de datos antes de migrar?**
No. `schema.prisma` es solo un archivo de texto que describe cómo *queremos* que sea la base. La base de datos
no cambia hasta que se ejecuta `prisma migrate dev`, que compara el esquema con el historial de migraciones,
genera el archivo `.sql` y lo aplica.

**3. ¿La carpeta de migraciones es una foto del esquema o un historial?**
Es un historial. Cada carpeta guarda solo el *cambio* de un paso (la primera crea `clase`, la segunda solo hace
`ALTER TABLE ... ADD COLUMN descripcion`), no el esquema completo. Prisma las aplica en orden cronológico y registra
cuáles ya corrieron en la tabla `_prisma_migrations`; así cualquiera puede reconstruir la base desde cero
reproduciendo la historia.

**4. ¿Por qué `Horario.clase` sí crea columna y `Clase.horarios` no?**
Porque `Horario.clase` es el lado que declara `@relation(fields: [claseId], references: [id])`: ahí vive la
llave foránea, y la columna `claseId` se guarda físicamente en la tabla `horario`. `Clase.horarios` (de tipo
`Horario[]`) es un campo virtual: solo existe en el esquema y en el cliente de Prisma para poder navegar la relación
desde `Clase`; en SQL una lista no cabe en una columna, la información ya está en `horario.claseId`. La columna
siempre queda del lado "muchos" de la relación uno a muchos.

**6. ¿De dónde sale la relación de muchos a muchos entre `Miembro` y `Horario`, si nunca se declaró?**
Sale de la tabla `Inscripcion`, que funciona como tabla intermedia (tabla pivote): tiene una llave foránea hacia
`Miembro` y otra hacia `Horario`. Un miembro puede tener muchas inscripciones (a distintos horarios) y un horario
puede tener muchas inscripciones (de distintos miembros); esas dos relaciones uno a muchos, juntas, forman el
muchos a muchos. Además, `@@unique([horarioId, miembroId])` evita que el mismo miembro se inscriba dos veces al mismo horario,
y por ser un modelo propio permite guardar datos de la relación como `estado` y `creadaEn`.
