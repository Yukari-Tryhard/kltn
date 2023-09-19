import { useRoutes, Navigate as Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import NotFoundPage from './pages/notfound/NotFoundPage';
import ProtectedRoute from './common/auth/ProtectedRoute';
import ResetPasswordPage from './pages/resetpassword/ResetPasswordPage';

const AppRoutes = () => {
    // Check if AccessToken is valid
    let routes = [
        {
            index: true,
            path: '/signin',
            element: <SignIn />
        },
        {
            index: true,
            path: '/signup',
            element: <SignIn />
        },
        {
            path: '/*',
            element: <NotFoundPage />
        },
        {
            path: '/reset-password',
            element: <ResetPasswordPage />
        },
        {
            path: '/home',
            element: <Home />
        }
        // {
        //     path: '/app',
        //     element: <ProtectedRoute />,
        //     children: [
        //         {
        //             path: 'home',
        //             element: <Home />
        //             // children: [
        //             //           {
        //             //             path: "usage",
        //             //             element: <UsagePage/>
        //             //           },
        //             //           {
        //             //             path: "project",
        //             //             element: <ProjectPage/>
        //             //           },
        //             //           {
        //             //             path: "project/view/:id",
        //             //             element: <ViewDocs/>
        //             //           },
        //             //           {
        //             //             path: "project/edit",
        //             //             element: <EditDocs/>
        //             //           },
        //             //           {
        //             //             path: "tutorial",
        //             //             element: <TutorialProject/>
        //             //           },
        //             //           {
        //             //             path: "settings",
        //             //             element: <SettingPage/>
        //             //           }
        //             //         ]
        //             //       },
        //             //       {
        //             //         path: 'signup',
        //             //         element: <SignUp />
        //             //       },
        //             //       {
        //             //         path: 'redirect',
        //             //         element: <RedirectPage/>
        //             //       },
        //             //       {
        //             //         path: 'signin',
        //             //         element: <SignIn></SignIn>
        //             //       },
        //             //       {
        //             //         path: 'notfound',
        //             //         element: <NotFoundPage/>
        //             //       },
        //             //       {
        //             //         path: 'preconfig',
        //             //         element: <PreconfigPage/>
        //             //       },
        //             //       {
        //             //         path: 'view/:encodeUrl',
        //             //         element: <ViewAsUser></ViewAsUser>,
        //             //         children: [
        //             //           {
        //             //             index: true,
        //             //             element: <WelcomeToProject />,
        //             //           },
        //             //           {
        //             //             path: ":memberName",
        //             //             element: <ComponentView/>
        //             //           },
        //             //         ]
        //         }
        //     ]
        // }
    ];

    let element = useRoutes(routes);
    return element;
};

export default AppRoutes;
