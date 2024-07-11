/**
 * @author  sai
 * created  2024-07-10
 * project  off_da_rails_coffee
 */

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
  progress: {
    delay: 1000,
    color: '#29d',
    includeCSS: true,
    showSpinner: true,
  },
  resolve: async (name: string) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true });
    // return import(`./${name}`);
    console.log(`try to load component: ${name}`);
    return pages[`../pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    const container = document.getElementById(el.id);
    const appRoot = createRoot(container!);
    appRoot.render(<App {...props} />);
  },
}).then();
