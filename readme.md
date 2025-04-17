# Configuración del entorno de desarrollo

Este proyecto está dividido en dos partes:

- **GD**: Backend desarrollado en .NET 8
- **clientGD**: Frontend desarrollado con Angular

Además, utiliza servicios como MinIO y una base de datos que se levantan con Docker.

---

## Pasos para configurar el entorno

### 1. Levantar MinIO y la Base de Datos

Asegúrate de tener Docker instalado. Luego, desde la raíz del proyecto, ejecuta:

```bash
docker compose up -d
```

Este comando iniciará los servicios definidos en el archivo `docker-compose.yml`, incluyendo:

- **MinIO**
- **Base de datos**

> Puedes verificar que todo esté corriendo con `docker ps`.

---

### 2. Instalar NVM para Windows

Para manejar versiones de Node.js de forma sencilla, es necesario instalar `nvm-windows`.

#### Descarga e instalación:

1. Descarga el instalador desde el siguiente enlace:

   👉 [Descargar nvm-setup.exe (v1.2.2)](https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe)

2. Ejecuta el instalador y sigue los pasos recomendados.

---

### 3. Instalar y usar Node.js 18.17.0

Después de instalar `nvm`, abre una nueva terminal y ejecuta:

```bash
nvm install 18.17.0
nvm use 18.17.0
```

Verifica que esté correctamente instalado con:

```bash
node -v
```

---

### 4. Instalar dependencias y ejecutar el frontend

Para desplegar el **frontend**, asegúrate de ubicarte en la carpeta `clientGD` desde la terminal:

```bash
cd clientGD
```

Luego, instala Angular CLI de forma global si no lo tienes:

```bash
npm install -g @angular/cli
```

Instala las dependencias del proyecto:

```bash
npm install
```

Y ejecuta el frontend con:

```bash
ng serve
```

El frontend estará disponible generalmente en `http://localhost:4200/`.

---

### 5. Ejecutar el backend (GD)

El proyecto **GD** corresponde al backend y está desarrollado en **.NET 8.0**, por lo que es necesario tener el SDK instalado.

#### Recomendación:

Se recomienda instalar **Visual Studio 2022 o superior** con el **workload de ASP.NET y desarrollo web**.

También puedes descargar solo el SDK desde:  
👉 [Descargar .NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)

Una vez instalado, puedes compilar y ejecutar el backend desde Visual Studio o desde la terminal:

```bash
dotnet build
dotnet run
```

Asegúrate de estar ubicado dentro del proyecto GD al ejecutar esos comandos.

---

### ¡Listo! 🚀

Tu entorno de desarrollo está completamente configurado, tanto para backend como frontend.