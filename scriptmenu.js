const toggleBtn=document.querySelector('.toggle_btn');
const toggleBtnIcon=document.querySelector('.toggle_btn i');
const dropDownMenu=document.querySelector('.dropdown_menu');

toggleBtn.onclick = function() { 

    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ?'fa-solid fa-xmark'
        :'fa-solid fa-bars'
}


document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes agregar funcionalidades dinámicas si es necesario
    console.log('Página cargada y lista para interactuar.');
    
    // Ejemplo: añadir evento a los botones de llamada a la acción
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Funcionalidad de descarga próximamente.');
        });
    });
});