import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx';
import Student from "../routes/Student.jsx";
import Add from "../routes/Add.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/student/:id',
        element: <Student />
    },
    {
      path: '/add',
      element: <Add />  
    }
]);

export default router;
