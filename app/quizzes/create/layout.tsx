export default function CreateQuizLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <section className='flex items-center justify-center'>{children}</section>
   );
}
