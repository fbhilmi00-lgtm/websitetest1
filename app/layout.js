import './globals.css';

export const metadata = {
  title: 'BelajarPro - Langganan Pembelajaran',
  description: 'Platform pembelajaran premium dengan langganan RM15 sebulan.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms">
      <body>{children}</body>
    </html>
  );
}
