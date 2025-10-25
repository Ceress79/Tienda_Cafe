<?php
include "../conexion.php";

if (isset($_POST['id'])) {
  $id = intval($_POST['id']);

  // Obtener imagen para eliminarla del servidor
  $result = $conn->query("SELECT imagen FROM productos WHERE id = $id");
  if ($row = $result->fetch_assoc()) {
    $ruta = "../" . $row['imagen'];
    if (file_exists($ruta)) unlink($ruta);
  }

  $conn->query("DELETE FROM productos WHERE id = $id");
}

header("Location: panel.php");
exit;
?>
