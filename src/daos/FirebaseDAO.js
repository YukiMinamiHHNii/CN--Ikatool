import { firebaseApp } from "../utils/FirebaseConfig";
import { getSingleResult, getMultiResult } from "../utils/FirebaseUtils";
import crypto from "create-hash";
import "firebase/firestore";
import "firebase/storage";

export const findCollectionData = collection => {
	return firebaseApp
		.firestore()
		.collection(collection)
		.get()
		.then(result => {
			return getMultiResult(result);
		})
		.then(updatedResult => {
			return updatedResult;
		})
		.catch(error => {
			return Promise.reject({ error: `Backend - ${error}` });
		});
};

export const findCollectionDataById = (collection, item) => {
	return firebaseApp
		.firestore()
		.collection(collection)
		.doc(item)
		.get()
		.then(result => {
			return getSingleResult(result);
		})
		.then(updatedResult => {
			return updatedResult;
		})
		.catch(error => {
			return Promise.reject(`Backend - ${error}`);
		});
};

export const addCollectionData = (data, collection) => {
	return uploadImages(data, collection)
		.then(updatedData => {
			return saveData(updatedData, collection);
		})
		.catch(error => {
			return Promise.reject(`Backend - ${error}`);
		});
};

function uploadImages(data, collection) {
	let finalArray = [];

	Object.keys(data).forEach(key => {
		if (data[key] instanceof File) {
			finalArray.push(
				firebaseApp
					.storage()
					.ref(collection)
					.child(
						crypto("md5")
							.update(data[key].name)
							.digest("hex")
					)
					.put(data[key])
					.then(result => {
						return getDownloadURL(result.metadata.fullPath);
					})
					.then(url => {
						data[key] = url;
						return url;
					})
					.catch(error => {
						return `Backend - Error while uploading ${data[key]} (${error})`;
					})
			);
		}
	});

	return Promise.all(finalArray)
		.then(result => {
			return data;
		})
		.catch(error => {
			return error;
		});
}

function getDownloadURL(fullPath) {
	return firebaseApp
		.storage()
		.ref(fullPath)
		.getDownloadURL()
		.then(url => {
			return url;
		})
		.catch(error => {
			return error.code;
		});
}

const saveData = (data, collection) => {
	return firebaseApp
		.firestore()
		.collection(collection)
		.add(data)
		.then(result => {
			return { docId: result.id };
		})
		.catch(error => {
			return Promise.reject(`Backend - ${error}`);
		});
};

export const saveDataWithId = (collection, docId, data) => {
	return firebaseApp
		.firestore()
		.collection(collection)
		.doc(docId)
		.set(data)
		.then(() => {
			return { ...data, docId: docId };
		})
		.catch(error => {
			return Promise.reject(`Backend - ${error}`);
		});
};

export const updateData = (collection, docId, data) => {
	return firebaseApp
		.firestore()
		.collection(collection)
		.doc(docId)
		.update(data)
		.then(() => {
			return { ...data, docId: docId };
		})
		.catch(error => {
			return Promise.reject({ error: `Backend - ${error}` });
		});
};
