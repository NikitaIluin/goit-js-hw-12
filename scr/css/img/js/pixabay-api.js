// Підключення бібліотеки Axios
const axios = require('axios');

// Функція для отримання зображень за запитом
async function searchImages(query) {
    try {
        // Виконання GET-запиту до API
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                per_page: 10, // Кількість зображень на сторінці
                client_id: '123456' // Замініть на ваш ключ доступу до Unsplash API
            }
        });

        // Повернення масиву з результатами пошуку
        return response.data.results;
    } catch (error) {
        // Обробка помилок
        console.error('Помилка при отриманні зображень:', error);
        return []; // Повернення порожнього масиву у випадку помилки
    }
}

// Приклад використання функції searchImages
async function main() {
    const query = 'nature'; // Запит на пошук зображень з темою "природа"
    const images = await searchImages(query);
    
    // Виведення результатів пошуку
    console.log('Зображення знайдені за запитом:', query);
    images.forEach((image, index) => {
        console.log(`${index + 1}. ${image.urls.small}`);
    });
}

// Виклик функції main для демонстрації
main();
import axios from 'axios';

export let perPage = 15;

export async function getImages(paramsToSearch, page = 1) {

    const searchedImages = await axios(`https://pixabay.com/api/`, {
        params: {
            key: '43250270-1f98e5ae52bb69b689c51c131',
            q: paramsToSearch,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: perPage,
        }
    });

    return searchedImages.data;
}