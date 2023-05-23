/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from '../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { Button } from './Button';
function UserName() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    user && fetchUserName();
  }, [user, loading]);

  return (
    <>
      {user && (
        <div className="flex gap-2 ">
          <div className="text-blue-500 flex items-center">{name}</div>
          <Button label="Logout" onClick={logout} />
        </div>
      )}
    </>
  );
}
export default UserName;
