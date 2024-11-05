import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from './Layouts/GuestLayout.jsx';
import LecturerLayout from './Layouts/LecturerLayout.jsx'; // Import the new layout
import LecturerAddLayout from './Layouts/LecturerAddLayout/LecturerAddLayout.jsx'; // Import the new layout
import AdminLayout from './Layouts/AdminLayout.jsx'; // Import the new layout
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // Debugging: Log the page name and layout assignment
        console.log(`Resolving page: ${name}`);
        if (name.startsWith('Lecturer/Add/')) {
            console.log('Assigning LecturerAddLayout');
            page.default.layout = page => <LecturerAddLayout children={page} />;
        } else if (name.startsWith('Lecturer/')) {
            console.log('Assigning LecturerLayout');
            page.default.layout = page => <LecturerLayout children={page} />;
        } else if (name.startsWith('AdminLayout/')) {
            console.log('Assigning AdminLayout');
            page.default.layout = page => <AdminLayout children={page} />;
        } else if (!name.startsWith('Public/')) {
            console.log('Assigning GuestLayout');
            page.default.layout = page => <Layout children={page} />;
        }
        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});