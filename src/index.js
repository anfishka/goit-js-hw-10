import { fetchBreeds, fetchByBreeds } from './cat-api.js'
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix'; 

document.addEventListener('DOMContentLoaded', async () => {
    const breedSelect = new SlimSelect({
            select:'.breed-select',
        });

        const loader = document.querySelector('.loader');
        const catInfo = document.querySelector('.cat-info');
        const error = document.querySelector('.error');

        loader.style.display = 'none';
        catInfo.style.display = 'none';
        error.style.display = 'none';

        try{
            const breeds = await fetchBreeds();

            breeds.forEach(breed => {
                breedSelect.addData({
                    value:breed.id,
                    text:breed.name,
                });
            });

            breedSelect.onChange(async () => {
                const selectedBreedId = breedSelect.selected();
                loader.style.display = 'block';
                catInfo.style.display = 'none';

                try {
                    const catData = await fetchByBreeds(selectedBreedId);
                    loader.style.display = 'none';
                    catInfo.style.display = 'block';
                } catch (error) {
                    loader.style.display = 'none';
                    error.style.display = 'block';
                    Notiflix.Notify.failure(error.message);
                }
            });
        } catch (error) {
            loader.style.display = 'none';
            error.style.display = 'block';
            Notiflix.Notify.failure(error.message);
        }
});

