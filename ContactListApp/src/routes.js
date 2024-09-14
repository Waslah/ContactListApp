import { useRoutes } from 'react-router-dom';
import ContactListApp from './components/ContactListApp';
import SigninPage from './Pages/SignIn';
import SignupPage from './Pages/SignUp';

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            element: <SignupPage />,
        },
        {
            path: '/signin',
            element: <SigninPage />,
        },
        {
            path:'/contacts',
            element: <ContactListApp />
        }
    ]);
    return routes;
}
