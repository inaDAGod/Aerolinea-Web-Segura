document.addEventListener('DOMContentLoaded', function () {
    fetchAwards();

    document.getElementById('buscar').addEventListener('click', fetchAwards);
    document.getElementById('restablecer').addEventListener('click', resetFilters);
    document.getElementById('borrarPremio').addEventListener('click', function () {
        const premio = document.getElementById('edit_premio').value.trim();
        borrarPremio(premio);
    });
});

function fetchAwards() {
    const premio = document.getElementById('premio').value.trim();
    const menora = document.getElementById('menora').value.trim();
    const mayora = document.getElementById('mayora').value.trim();
    const destacado = document.querySelector('input[name="destacadosOption"]:checked')?.value || '';
    const tipo = document.getElementById('tipo').value;

    fetch('http://localhost/SistemaWeb-Aerolinea/backend/fetch_awards.php')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(award => {
                let matches = true;

                if (premio && !award.premio.toLowerCase().includes(premio.toLowerCase())) {
                    matches = false;
                }
                if (menora && award.millas > parseInt(menora)) {
                    matches = false;
                }
                if (mayora && award.millas < parseInt(mayora)) {
                    matches = false;
                }
                if (destacado && (destacado === 'destacado' && award.producto_destacado !== 't' || destacado === 'no-destacado' && award.producto_destacado === 't')) {
                    matches = false;
                }
                if (tipo && award.tipo_premio !== tipo) {
                    matches = false;
                }

                return matches;
            });

            renderAwards(filteredData);
        })
        .catch(error => console.error('Error:', error));
}

function renderAwards(data) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    data.forEach(award => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-4 col-md-4 col-lg-3 mb-4';

        const card = document.createElement('div');
        card.className = 'card'; // Elimina la clase 'h-150'

        const img = document.createElement('img');
        img.src = award.src_foto;
        img.className = 'card-img-top';
        img.alt = award.premio;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = award.premio;

        const tipoPremio = document.createElement('span');
        tipoPremio.className = 'badge badge-pill badge-orange';
        tipoPremio.textContent = award.tipo_premio;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = `Millas: ${award.millas}`;

        // Botón de Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.className = 'btn btn-primary'; // Ajusta el tamaño del botón
        editButton.setAttribute('data-toggle', 'modal');
        editButton.addEventListener('click', function() {
            editAward(award);
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(tipoPremio);

        if (award.producto_destacado === 't') {
            const destacado = document.createElement('span');
            destacado.className = 'bi bi-star-fill star';
            cardBody.appendChild(destacado);
        }

        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(editButton); // Agrega el botón de Editar después del cuerpo de la tarjeta

        col.appendChild(card);
        cardsContainer.appendChild(col);
    });
}

function resetFilters() {
    document.getElementById('premio').value = '';
    document.getElementById('menora').value = '';
    document.getElementById('mayora').value = '';
    document.getElementById('destacado').checked = false;
    document.getElementById('no-destacado').checked = false;
    document.getElementById('tipo').selectedIndex = 0;
    fetchAwards();
}

async function editAward(award) {
   
    const editPremioInput = document.getElementById('edit_premio');
    const editMillasInput = document.getElementById('edit_millas');
    const editTipoInput = document.getElementById('edit_tipo');

    editPremioInput.value = award.premio;
    editMillasInput.value = award.millas;
    editTipoInput.value = award.tipo_premio;

 
    const editDestacadoInput = document.getElementById('edit_destacado');
    const editNoDestacadoInput = document.getElementById('edit_no-destacado');

    if (award.producto_destacado === 't') {
        editDestacadoInput.checked = true;
    } else {
        editNoDestacadoInput.checked = true;
    }

   
    const imgPreview = document.getElementById('edit_img_preview');
    imgPreview.src = award.src_foto;


    const validarCampos = () => {
        let isValid = true;

        if (!editPremioInput.checkValidity()) {
            isValid = false;
            editPremioInput.classList.add('is-invalid');
        } else {
            editPremioInput.classList.remove('is-invalid');
            editPremioInput.classList.add('is-valid');
        }

        if (!editMillasInput.checkValidity()) {
            isValid = false;
            editMillasInput.classList.add('is-invalid');
        } else {
            editMillasInput.classList.remove('is-invalid');
            editMillasInput.classList.add('is-valid');
        }

        if (!editTipoInput.checkValidity()) {
            isValid = false;
            editTipoInput.classList.add('is-invalid');
        } else {
            editTipoInput.classList.remove('is-invalid');
            editTipoInput.classList.add('is-valid');
        }

        if (!editDestacadoInput.checked && !editNoDestacadoInput.checked) {
            isValid = false;
            document.querySelector('.radio-group').classList.add('is-invalid');
        } else {
            document.querySelector('.radio-group').classList.remove('is-invalid');
        }

        return isValid;
    };

  
    const guardarEdicionButton = document.getElementById('guardarEdicion');
    guardarEdicionButton.removeEventListener('click', handleGuardarEdicionClick);
    guardarEdicionButton.addEventListener('click', handleGuardarEdicionClick, { once: true });

    async function handleGuardarEdicionClick() {
        if (!validarCampos()) {
            return;
        }

        const premioEditado = editPremioInput.value.trim();
        const millasEditadas = editMillasInput.value.trim();
        const tipoEditado = editTipoInput.value;
        const destacadoEditado = editDestacadoInput.checked ? 'true' : 'false';

        let nuevaFoto = null;
        const foto = document.getElementById('edit_foto');
        if (foto.files[0]) {
            nuevaFoto = foto.files[0];
        } else {
            nuevaFoto = await fetchFileFromServer(award.src_foto);
        }

        const formData = new FormData();
        formData.append('premioOriginal', award.premio);
        formData.append('premio', premioEditado);
        formData.append('millas', millasEditadas);
        formData.append('tipo_premio', tipoEditado);
        formData.append('producto_destacado', destacadoEditado);
        formData.append('foto', nuevaFoto);

        fetch('http://localhost/SistemaWeb-Aerolinea/backend/editarPremio.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            if (result.estado === 'registro_exitoso') {
                Swal.fire('¡Actualizado!', 'Premio actualizado exitosamente.', 'success');
                fetchAwards();
                $('#editarPremioModal').modal('hide');
            } else {
                Swal.fire('Error', 'Error al actualizar el premio.', 'error');
            }
        })
        .catch(error => console.error('Error:', error));
    }

    $('#editarPremioModal').modal('show');
}

async function fetchFileFromServer(filePath) {
    const response = await fetch(filePath);
    const blob = await response.blob();
    const fileName = filePath.split('/').pop();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
}
function borrarPremio(premio) {
    fetch('http://localhost/SistemaWeb-Aerolinea/backend/borrarPremio.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ premio: premio })
    })
    .then(response => response.json())
    .then(result => {
        if (result.estado === 'borrado_exitoso') {
            Swal.fire('¡Borrado!', 'Premio borrado exitosamente.', 'success');
            fetchAwards();
            $('#editarPremioModal').modal('hide');
        } else {
            Swal.fire('Error', 'Error al borrar el premio.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'Hubo un error al procesar la solicitud.', 'error');
    });
}