import { useNavigate as Navi } from 'react-router-dom';
import config from '~/config';
import { useMovie as Movie } from '~/GlobalState/useMovie';

import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '~/firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export const signInWithProvider = (type, provider) => {
    const navigate = Navi();
    const { setCurrentUser, currentUser } = Movie();

    signInWithPopup(auth, provider).then(async (result) => {
        const user = result.user;

        let credential;
        let accessToken;
        if (type === 'facebook') {
            credential = FacebookAuthProvider.credentialFromResult(result);
            accessToken = credential.accessToken;
            setCurrentUser({ ...user, photoURL: user.photoURL + '?access_token=' + accessToken });
        }
        if (type === 'google') {
            setCurrentUser(user);
        }

        let isStored = false;
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((item) => {
            if (item.id === user.uid) {
                isStored = true;
            }
        });

        if (isStored) {
            navigate(config.routes.home);
            return;
        } else {
            setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                ...(type === 'google' && { photo: user.photoURL }),
                ...(type === 'facebook' && { photo: user.photoURL + '?access_token=' + accessToken }),
                bookmarks: [],
            });
            navigate(config.routes.home);
        }
    });
};
