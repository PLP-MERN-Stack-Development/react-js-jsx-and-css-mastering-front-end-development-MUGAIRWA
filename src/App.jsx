import { useState } from 'react';
import './index.css';

// Import your components here
import Button from './components/Button';
import Layout from './components/Layout';
import Card from './components/Card';
import TaskManager from './components/TaskManager';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [count, setCount] = useState(0);

  // Define navbar and footer links
  const navbarLinks = [
    { label: 'Home', href: '#' },
    { label: 'Tasks', href: '#tasks' },
    { label: 'API', href: '#api' },
  ];

  const footerLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <ThemeProvider>
      <Layout navbarLinks={navbarLinks} footerLinks={footerLinks}>
        <Card>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg mb-4">
              Edit <code className="font-mono bg-gray-200 dark:bg-gray-700 p-1 rounded">src/App.jsx</code> and save to test HMR
            </p>

            <div className="flex items-center gap-4 my-4">
              <Button
                variant="danger"
                onClick={() => setCount((count) => count - 1)}
              >
                -
              </Button>
              <span className="text-xl font-bold">{count}</span>
              <Button
                variant="success"
                onClick={() => setCount((count) => count + 1)}
              >
                +
              </Button>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mt-4">
              Implement your TaskManager component here
            </p>
          </div>
        </Card>

        {/* TaskManager component */}
        <div className="mt-8" id="tasks">
          <TaskManager />
        </div>

        {/* API data display will go here */}
        <Card title="API Data" className="mt-8" id="api">
          <p className="text-gray-500 dark:text-gray-400">
            Fetch and display data from an API here
          </p>
        </Card>
      </Layout>
    </ThemeProvider>
  );
}

export default App; 