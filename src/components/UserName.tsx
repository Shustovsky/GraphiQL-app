/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, logout } from './../firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';
function UserName() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState('');
  //   const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      console.log(q);

      const doc = await getDocs(q);
      console.log(doc);

      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserName();
  }, [user, loading]);

  return (
    <>
      {user && (
        <div className="text-red-400">
          <div className="dashboard__container">
            Logged in as
            <div className="text-blue-500">{name}</div>
            <div>{user?.email}</div>
            <button className="dashboard__btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default UserName;
