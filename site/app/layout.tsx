import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
export const metadata = { metadataBase: new URL('https://docs.gnsis.studio'), title: { default: 'GNSIS Developers', template: '%s | GNSIS Developers' }, description: 'Panoptic API, SDK and MCP documentation, and GNSIS 01 runs API.' };
export default function Layout({ children }: LayoutProps<'/'>) {
  return <html lang="en" suppressHydrationWarning><body className="flex min-h-screen flex-col"><RootProvider>{children}</RootProvider></body></html>;
}
