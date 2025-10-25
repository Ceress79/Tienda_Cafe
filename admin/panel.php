<?php
include "../conexion.php";
$result = $conn->query("SELECT * FROM productos ORDER BY id DESC");
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Panel de Administración</title>
  <link rel="stylesheet" href="panel.css">
</head>
<body>

  <aside class="sidebar">
    <div>
      <h2>☕ Admin Café</h2>
      <nav>
        <a href="panel.php">📦 Productos</a>
        <a href="../index.php">🏠 Ir a la tienda</a>
      </nav>
    </div>
    <footer>
      <p>© 2025 Tienda Café | Panel</p>
    </footer>
  </aside>

  <section class="main-content">
    <h1>Gestión de Productos</h1>

    <form action="subir.php" method="POST" enctype="multipart/form-data">
      <input type="text" name="nombre" placeholder="Nombre del producto" required>
      <input type="number" name="precio" placeholder="Precio" step="0.01" required>
      <input type="file" name="imagen" accept="image/*" required>
      <button type="submit">Agregar producto</button>
    </form>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <?php while ($row = $result->fetch_assoc()): ?>
          <tr>
            <td><?= $row['id'] ?></td>
            <td><?= htmlspecialchars($row['nombre']) ?></td>
            <td>$<?= number_format($row['precio'], 2) ?></td>
            <td><img src="../<?= htmlspecialchars($row['imagen']) ?>" width="50"></td>
            <td>
              <form action="eliminar.php" method="POST" style="display:inline;">
                <input type="hidden" name="id" value="<?= $row['id'] ?>">
                <button class="btn-eliminar" type="submit">Eliminar</button>
              </form>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </section>

</body>
</html>
