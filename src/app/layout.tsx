import "./globals.css";

export const metadata = {
  title: "Mailing Scheduler",
  description: "Schedule mail campaigns easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='min-h-screen bg-gray-100'>{children}</body>
    </html>
  );
}
