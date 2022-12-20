import axios from './axios';

const BREEDS_URL = '/breeds/list/all';
const BREED_URL = '/breed';

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

export async function getBreedImages(breed: string) {
	return axios
        .get(`${BREED_URL}/${breed}/images`)
        .then((response: any) => {
            return response.data;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}

export async function getSubBreedImages(breed: string, subBreed: string) {
	return axios
        .get(`${BREED_URL}/${breed}/${subBreed}/images`)
        .then((response: any) => {
            return response.data;
        })
        .catch((error: any) => {
            return error.response.data;
        });
}