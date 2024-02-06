document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    const gallery = document.querySelector('.image-container');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let query = form.querySelector('input').value.trim();
        form.querySelector('input').value = '';

        if (query === '') {
            query = 'nothing';
        }

        try {
            const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const shows = await res.json(); 
            makeImages(shows);
            window.scrollTo({
                top: gallery.offsetTop,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    });

    function makeImages(shows) {
        for (let show of shows) {
            if (show.show.image) {
                const img = document.createElement('img');
                img.src = show.show.image.medium;

                // Create a "Watch" button
                const watchButton = document.createElement('button');
                watchButton.textContent = 'Watch';
                watchButton.classList.add('button');
                watchButton.addEventListener('click', function () {
                window.open('https://ww3.123movies.com.pk/', '_blank');
                });

               
                const containerDiv = document.createElement('div');
                containerDiv.classList.add('image-item');

               
                containerDiv.appendChild(img);
                containerDiv.appendChild(watchButton);
                gallery.appendChild(containerDiv);
            }
        }
    }
});
