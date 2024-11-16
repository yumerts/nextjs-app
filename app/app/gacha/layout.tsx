export default function GachaLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section>
        <div>
          {children}
        </div>
      </section>
    );
  }
  