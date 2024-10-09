document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para botones de llamada a la acción
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Funcionalidad de descarga próximamente.');
        });
    });
});
