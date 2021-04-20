import { http_get } from './utils/request';

const api_url = 'https://swapi.dev/api';
const format = 'json';

export default class SWAPI {

    /**
     * Retourne tous les films
     * 
     * @returns list
     */
    static films() {
        return this.getAllPagesRecursive(`${api_url}/films/?format=${format}`);
    }

    /**
     * Retourne tous les personnages
     * 
     * @returns list
     */
    static people() {
        return this.getAllPagesRecursive(`${api_url}/people/?format=${format}`);
    }


    /**
     * Retourne toutes les pages de résultats de la requête
     * 
     * La méthode utilise la récursivité pour ajouter
     * chaque page à la liste de données existante
     * 
     * @param {string} url 
     * @param {Array} list 
     * @returns Array 
     */
    static getAllPagesRecursive(url, list = []) {
        return http_get(url).then(data => {
            list = list.concat(data.results);

            console.log(data);

            if (data.next) {
                return this.getAllPagesRecursive(data.next, list);

            } else {
                return list;
            }
        });
    }
}