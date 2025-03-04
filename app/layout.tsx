import './globals.css'; 

export const metadata = {
  title: 'PixelPerfect',
  description: 'A coding challenge platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}