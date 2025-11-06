export const metadata = {
  title: 'wwebjs',
  description: 'WhatsApp Web client for Node.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
