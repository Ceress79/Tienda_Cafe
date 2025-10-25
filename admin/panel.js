// admin/panel.js
const inputImagen = document.getElementById('imagen');
const preview = document.getElementById('preview');

if (inputImagen) {
  inputImagen.addEventListener('change', (e) => {
    preview.innerHTML = '';
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      preview.textContent = 'Selecciona una imagen válida.';
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = document.createElement('img');
      img.src = ev.target.result;
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}
