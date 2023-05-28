/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

interface Props {
  startRow?: number;
}

function UserName({ startRow }: Props) {
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
        <div className={`flex gap-2 row-start-${startRow} justify-center`}>
          <div className="text-blue-500 flex items-center">{name}</div>
        </div>
      )}
    </>
  );
}
export default UserName;
