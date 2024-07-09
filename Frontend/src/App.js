import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './hooks/authProvider';
import { publicRoutes } from './routes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
            <Routes>
              {
                publicRoutes.map((route, index) => {
                  const Page = route.component;
                  return <Route key={index} path={route.path} element={<Page props={route.props} />} />
                })
              }
            </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
