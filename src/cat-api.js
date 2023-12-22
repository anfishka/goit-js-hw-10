import axios from 'axios'

axios.defaults.headers.common["x-api-key"] = "live_Dw63uuaBRpG0Fd04wMGGuAdIwVyxPx4LgPoEV7fBo1L5TrA5KPp4MyLDDmz2fy0D";

export async function fetchBreeds() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при загрузке списка пород');
    }
}

export async function fetchByBreeds(breedId) {
    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при загрузке информации о коте по породе.');
    }
}