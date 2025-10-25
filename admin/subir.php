<?php
include "../conexion.php";

$nombre = $_POST['nombre'];
$precio = $_POST['precio'];

$directorio = "../img/";
if (!is_dir($directorio)) mkdir($directorio, 0777, true);

$nombreArchivo = basename($_FILES["imagen"]["name"]);
$rutaDestino = $directorio . $nombreArchivo;
$rutaBD = "img/" . $nombreArchivo;

if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $rutaDestino)) {
  $stmt = $conn->prepare("INSERT INTO productos (nombre, precio, imagen) VALUES (?, ?, ?)");
  $stmt->bind_param("sds", $nombre, $precio, $rutaBD);
  $stmt->execute();
  $stmt->close();
  echo "<script>alert('✅ Producto agregado correctamente'); window.location='panel.php';</script>";
} else {
  echo "<script>alert('❌ Error al subir la imagen'); window.location='panel.php';</script>";
}
?>
