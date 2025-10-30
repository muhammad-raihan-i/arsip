import Navbar from "/navbar";
export default function Layout(content) {
  return (
    <>
      <Navbar />
      {content}
    </>
  );
}
