import axios from "axios";

export const getData = collection => {
	return axios
		.get(`${process.env.REACT_APP_MARINA_ENDPOINT}/data/${collection}`)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return Promise.reject(`Error while connecting to API - ${error}`);
		});
};

export const saveData = (data, collection) => {
	return axios
		.post(
			`${process.env.REACT_APP_MARINA_ENDPOINT}/data/${collection}`,
			getFormData(data),
			{ headers: { "X-Custom-Header": "someHeader" } }
		)
		.then(response => {
			return response.data;
		})
		.catch(error => {
			return Promise.reject(`Error in operation - ${error}`);
		});
};

const getFormData = data => {
	let formData = new FormData();

	Object.keys(data).forEach(item => {
		formData.append(item, data[item]);
	});

	return formData;
};
