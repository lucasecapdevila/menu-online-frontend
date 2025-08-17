# 🍽️ Menú Online Frontend

Una aplicación web moderna para mostrar menús de restaurantes de forma elegante y funcional, construida con React, TypeScript y Vite.

## ✨ Características

- **📱 Responsive Design**: Optimizado para móviles y desktop
- **🔍 Búsqueda en Tiempo Real**: Encuentra productos instantáneamente
- **🎨 Diseño Moderno**: Interfaz limpia con colores de marca personalizados
- **📊 Gestión de Stock**: Indicadores visuales para productos sin stock
- **🚀 Navegación Rápida**: Índice de categorías con scroll suave
- **⚡ Carga Rápida**: Optimizado con Vite para desarrollo y producción
- **🎯 TypeScript**: Tipado fuerte para mejor desarrollo

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Axios** - Cliente HTTP para API calls
- **React Spinners** - Indicadores de carga

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd menu-online-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu URL de backend
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Producción
```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   └── MenuExample.tsx  # Componente principal del menú
├── hooks/              # Custom hooks
│   └── useMenu.ts      # Hook para gestión de datos del menú
├── services/           # Servicios y API
│   ├── api.ts         # Cliente HTTP configurado
│   ├── menuService.ts # Servicios específicos del menú
│   └── index.ts       # Exportaciones centralizadas
├── assets/            # Recursos estáticos
│   ├── icons/         # Iconos e imágenes
│   └── styles/        # Estilos globales y Tailwind
├── types/             # Definiciones de tipos TypeScript
└── main.tsx          # Punto de entrada de la aplicación
```

## 🎨 Personalización

### Colores de Marca
Los colores se definen en `src/assets/styles/tailwind.css`:

```css
@theme {
  --color-brand-50: #ffa791;
  --color-brand-500: #ff5023;
  --color-brand-700: #cc401c;
  /* ... más colores */
}
```

### Orden de Categorías
Personaliza el orden en `src/services/menuService.ts`:

```javascript
const CATEGORY_ORDER = [
  "Aguas",
  "Gaseosas", 
  "Cervezas",
  // ... más categorías
];
```

## 🔧 Configuración de API

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3000/api
```

### Estructura de Datos Esperada
```typescript
interface MenuItem {
  id: string;
  categoria: string;
  producto: string;
  precio: string;
  descripcion: string;
  img: string;
  stock: string;
  _rowNumber: number;
}
```

## 📱 Funcionalidades

### Búsqueda
- Busca en nombres de productos, descripciones y categorías
- Filtrado en tiempo real sin necesidad de botón
- Botón de limpiar búsqueda

### Gestión de Stock
- Items con `stock: "0"` se muestran aclarados
- Cartel "Sin Stock" en esquina superior derecha
- Todos los items se muestran independientemente del stock

### Navegación
- Índice de categorías con scroll horizontal
- Navegación suave a secciones específicas
- Responsive en todos los dispositivos

## 🚦 Estados de la Aplicación

- **Carga**: Spinner con colores de marca
- **Error**: Mensaje amigable con botón de reintentar
- **Vacío**: Mensajes informativos cuando no hay resultados

## 🔍 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Previsualizar build
npm run lint         # Ejecutar ESLint
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.

---

Desarrollado con ❤️ para una mejor experiencia de menús online.