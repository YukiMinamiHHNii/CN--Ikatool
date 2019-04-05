import { firebaseApp } from "../utils/FirebaseConfig";
import { getSingleResult, getMultiResult } from "../utils/FirebaseUtils";
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
			return Promise.reject({ error: `Backend - ${error}` });
		});
};
