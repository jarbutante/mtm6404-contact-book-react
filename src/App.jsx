import { useState, useEffect } from 'react'
import db from './utils/db';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

const App = () => {
  const navigate = useNavigate();

  const [classsList, setClasslist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchClasslist = async () => {
    const q = query(collection(db, "classlist"), orderBy('lastName', 'asc'));
    const docSnapshot = await getDocs(q);
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setClasslist(data);
  };

  const goToAdd = () => {
    navigate('/add');
  };

  useEffect(() => {
    fetchClasslist();
  }, []);

  // Filter students based on search input
  const filteredList = classsList.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
        <h1 className="text-center">Contacts</h1>

        {/* Search bar */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="list-unstyled text-center">
          {filteredList.map((student) => (
            <li key={student.id}>
              <Link to={`/student/${student.id}`}>
                {`${student.firstName} ${student.lastName}`}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-3">
          <button className="btn btn-primary" style={{ width: '100%', maxWidth: '500px' }} onClick={goToAdd}> Add contact </button>
        </div>
      </div>
    </div>
  );
}

export default App;
