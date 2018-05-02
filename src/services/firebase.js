import * as firebase from 'firebase';

export async function login(callback) {
	const auth = firebase.auth();
	auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

	firebase.auth().onAuthStateChanged((user) => {
		if (!user)	{
			const firebaseProvider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(firebaseProvider)
				.then(result => {
					const { user: signInUser } = result;
					if (result.credential) {
						signInUser.token = result.credential.accessToken;
					}
					callback(signInUser);	
				});
		} else {
			callback(user);
		}
	});
}

