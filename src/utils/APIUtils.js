import axios from "axios";

export const getStagesData = data => {
	return axios
		.get(`${process.env.REACT_APP_MARINA_ENDPOINT}/data/stage`)
		.then(response => {
			console.log(response.data)
			return response.data;
		})
		.catch(error => {
			return Promise.reject(`Error while connecting to API - ${error}`);
		});
};
