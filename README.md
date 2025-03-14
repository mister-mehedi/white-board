# white-board

Live-link: https://white-board.surge.sh/

Tools:
Canvas graphics, useState, useRef hooks, Mouse up-down-move event handling.


Characteristics: 
1. Full-Screen Whiteboard: The canvas dynamically adjusts to different display sizes for a seamless drawing experience.
2. Pen & Eraser Tools: Users can switch between drawing and erasing modes using buttons
3. One-Touch Erase: The eraser removes an entire stroke with a single hover or click on any part of the drawn shape.
4. Optimized Rendering: The canvas efficiently redraws only when necessary, improving performance.
5. Minimal UI with Tailwind CSS: Simple, clean, and responsive design using Tailwind CSS for styling.
6. State Management with React Hooks: Uses useState for managing tool selection and drawing states.
7. Interactive Toolbar: Positioned at the top-right corner, the toolbar allows easy switching between tools.
8. Smooth User Experience: Drawing is fluid with optimized event handling, and erasing is instantaneous.

Improve Plan:
1. Performance Enhancements: Potential use of useMemo and useCallback to optimize rendering and memory usage.
2. Scalable and Lightweight: Efficient memory allocation ensures smooth performance even with multiple strokes.
