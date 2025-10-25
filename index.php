<?php
include "conexion.php";
$result = $conn->query("SELECT * FROM productos");
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tienda Café Online</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>☕ Tienda Café Online</h1>
    <nav><a href="admin/panel.php">Panel Admin</a></nav>
  </header>

  <main>
    <section class="productos" id="productos">
      <?php while ($row = $result->fetch_assoc()): ?>
        <div class="producto">
          <img src="<?= htmlspecialchars($row['imagen']) ?>" alt="<?= htmlspecialchars($row['nombre']) ?>">
          <h3><?= htmlspecialchars($row['nombre']) ?></h3>
          <p>$<?= number_format($row['precio'], 2) ?></p>
          <button class="agregar" data-id="<?= $row['id'] ?>">Agregar</button>
        </div>
      <?php endwhile; ?>
    </section>

    <aside class="carrito">
      <h2>🛒 Carrito</h2>
      <ul id="lista-carrito"></ul>
      <p class="total">Total: $<span id="total">0.00</span></p>
      <button id="vaciar">Vaciar carrito</button>
    </aside>
  </main>

  <footer>
    <p>© 2025 - Sistema de Compras SaaS ☁️ | Proyecto Cloud</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
