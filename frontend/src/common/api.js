import axios from 'axios';

export default class Api {
    static baseUrl = "http://localhost:8000"

    static dateToYMD(date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    static postDocument(type, data) {
        return this._postFormData(type.toLowerCase(), data);
    }

    static getSearchResults(type, data) {
        return this._postJsonData(type.toLowerCase() + '/search', data);
    }

    static editDocument(type, data) {
        return this._postFormData(type.toLowerCase(), data)
    }

    static saveCrawlerConfig(data) {
        return this._postJsonData("crawler/saveConfig", data);
    }

    static runCrawler(data) {
        return this._postJsonData("crawler/run", data);
    }

    static _postFormData(relativeUrl, data) {
        var formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        return axios.post(`${this.baseUrl}/${relativeUrl}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static _postJsonData(relativeUrl, jsonData) {
        return axios.post(`${this.baseUrl}/${relativeUrl}`, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static getAutocompleteOptions(collectionName) {
        return axios.get(`${this.baseUrl}/autocomplete/${collectionName}`);
    }

    static getDocumentById(documentId) {
        return axios.get(`${this.baseUrl}/documents/${documentId}`);
    }
}