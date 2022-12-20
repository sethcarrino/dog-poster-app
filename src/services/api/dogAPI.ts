import axios from './axios';

const BREEDS_URL = '/breeds/list/all';

export async function getBreeds() {
	return axios
        .get(BREEDS_URL)
        .then((response: any) => {
            return response.data;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}