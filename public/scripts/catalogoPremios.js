document.addEventListener('DOMContentLoaded', function () {
    fetchAwards();

    document.getElementById('buscar').addEventListener('click', fetchAwards);
    document.getElementById('restablecer').addEventListener('click', resetFilters);
});

function fetchAwards() {
    const premio = document.getElementById('premio').value.trim();
    const menora = document.getElementById('menora').value.trim();
    const mayora = document.getElementById('mayora').value.trim();
    const destacado = document.querySelector('input[name="destacadosOption"]:checked')?.value || '';
    const tipo = document.getElementById('tipo').value;

    fetch('/backend/fetch_awards.php')
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
        card.className = 'card h-100';

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
