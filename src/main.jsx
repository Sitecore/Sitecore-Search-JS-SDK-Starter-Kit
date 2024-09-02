import ReactDOM from 'react-dom/client';

import { Logger } from '@sitecore-search/react';

import App from '@/App.jsx';

Logger.setLogLevel('debug');

ReactDOM.createRoot(document.getElementById('root')).render(<App />);