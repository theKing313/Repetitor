'use client';

// import { ThemeProvider } from '@emotion/react';
import { createTheme, MantineProvider } from '@mantine/core';


import { PropsWithChildren, Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useMiddleware from '@/hooks/useMiddleware';
import '@mantine/core/styles.css'; // <--- обязательно
import AuthCheck from '@/hoc/AuthCheck';
// import { roboto, sf_pro_display } from '../assets/fonts';
// import '../assets/styles/globals.scss';
// import '../'
// import useMiddleware from '@/hooks/useMiddleware';

// import { MantineProvider } from '@mantine/core'
// import { AuthContextProvider } from '@/contexts/authContext';
// import AuthGuard from '@/guards/AuthGuard';
// import { BreadcrumbsProvider } from '@/contexts/BreadcrumbsProvider';
import { ModalsProvider } from '@mantine/modals';
export default function RootLayout({ children }: PropsWithChildren) {
    const client = new QueryClient();
    const theme = createTheme({
      /** Put your mantine theme override here */
    });
    useMiddleware();

    return (
        <html lang="en">
         

        <body className={''}>
          {/* `${roboto.variable} ${sf_pro_display.variable}` */}
          <MantineProvider theme={theme}>
            <ModalsProvider>
              <QueryClientProvider client={client}>
                <AuthCheck>
                    <AppRouterCacheProvider>
                      <Suspense>{children}</Suspense>
                    </AppRouterCacheProvider>
                </AuthCheck>
              </QueryClientProvider>
            </ModalsProvider>
          </MantineProvider>
        </body>
        {/* <ColorSchemeScript /> */}
      </html>
    );
}
