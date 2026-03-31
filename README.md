# Bingo Blum Blum Shub
Un proyecto interactivo de Bingo que utiliza el generador pseudoaleatorio de números **Blum Blum Shub**.

## Características principales
- Generador Blum Blum Shub: Algoritmo criptográfico para números aleatorios seguros
- Detección automática de Bingos: Identifica automáticamente filas y columnas completas
- Estadísticas: Registra rondas necesarias para primer binguito y cartilla completa
- Diseño responsivo: Compatible con dispositivos móviles, tablets y escritorio
- Interfaz atractiva: Colores llamativos y animaciones suaves
- Sin dependencias externas: JavaScript puro (vanilla) para máximo rendimiento

## Elementos visibles
- BINGO: Título principal colorido
- Bola de Bingo: Muestra el último número extraído
- Cartilla: Tu tarjeta de juego (5×5 con casilla "FREE" en el centro)
- Botones: "Llamar un número" y "Nuevo bingo"
- Números llamados: Lista de todos los números extraídos
- Rondas: Contador de números llamados
- Resultados: Muestra cuántas rondas necesitaste para tu primer binguito y para completar la cartilla

## ¿Cómo ejecutar el proyecto?
Clona el repositorio:
```bash
git clone https://github.com/FedeJGM/Bingo-Blum_Blum_Shub.git
```

### Opción 1: Ejecuta con Live Server (Recomendado)

Este proyecto está diseñado para ejecutarse con **Live Server**, una extensión de Visual Studio Code que crea un servidor local en tiempo real.

#### Instalación de Live Server:

1. Abre **Visual Studio Code**
2. Ve a la sección de **Extensiones** (Ctrl+Shift+X)
3. Busca "Live Server" (creador: Ritwick Dey)
4. Haz clic en **Instalar**

#### ¿Cómo usar Live Server?:

1. Abre este proyecto en VS Code
2. Haz clic derecho en el archivo `index.html`
3. Selecciona **"Open with Live Server"**
4. El proyecto se abrirá automáticamente en tu navegador predeterminado
5. Los cambios se recargarán automáticamente al guardar archivos

### Opción 2: Abrir directamente en el navegador

1. Abre el archivo `index.html` directamente en tu navegador (arrastra y suelta o doble clic)
2. **Nota:** Sin Live Server, necesitarás recargar manualmente la página (F5) para ver los cambios

## Tecnologías utilizadas
- HTML5 - Estructura semántica y elementos interactivos
- CSS3 - Estilos, diseño responsivo y animaciones
- JavaScript (Vanilla) - Lógica del juego y algoritmo BBS sin dependencias externas
- Bootstrap 4.5.2 - Framework CSS (CDN) para componentes base

## ¿Cómo jugar?
1. Iniciar el juego: Al cargar la página, se genera automáticamente una cartilla de 5×5
2. Llamar números: Haz clic en el botón "Llamar un número" para extraer un número aleatorio (1-75)
3. Marcar números: Los números que coincidan con tu cartilla se marcarán automáticamente
4. Ganar:
- Binguito: Completa una fila o columna entera (recibirás una alerta)
- Cartilla completa: Marca todos los números (recibirás una notificación final)
5. Reiniciar: Haz clic en "Nuevo bingo" para generar una nueva cartilla y empezar de nuevo

## Notas
- El algoritmo BBS genera números pseudoaleatorios seguros criptográficamente
- Cada sesión de juego tiene una semilla diferente basada en Date.now()
- La cartilla nunca se repite en la misma sesión (números únicos garantizados)
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)

## Autor

FedeJGM 

---
