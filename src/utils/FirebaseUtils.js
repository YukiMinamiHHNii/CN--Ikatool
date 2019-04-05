import firebase from "firebase/app";

export const getSingleResult = doc => {
	let result = doc.data();
	if (result) {
		return getReferenceData(result).then(updatedResult => {
			result.docId = doc.id;
			return updatedResult;
		});
	} else {
		throw new Error(`No data exists for given id (${doc.id})`);
	}
};

function getReferenceData(data) {
	let refArray = [];
	for (let key in data) {
		if (data[key] instanceof firebase.firestore.DocumentReference) {
			refArray.push(
				data[key]
					.get()
					.then(result => {
						data[key] = result.data();
					})
					.catch(error => {
						data[key] = { error: `Backend - ${error}` };
					})
			);
		}
	}

	return Promise.all(refArray).then(result => {
		return data;
	});
}

export const getMultiResult = querySnapshot => {
	let result = [],
		resultSet;

	querySnapshot.forEach(item => {
		if (item.id) {
			resultSet = item.data();
			result.push(
				getReferenceData(resultSet)
					.then(updatedResult => {
						updatedResult.docId = item.id;
						return updatedResult;
					})
					.catch(error => {
						return { error: `Backend - ${error}` };
					})
			);
		}
	});

	return Promise.all(result).then(data => {
		return data;
	});
};
