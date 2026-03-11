import Hero from '../sections/Hero';
import VideoPortal from '../components/VideoPortal';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <div className="page-home">
      <Hero />
      <VideoPortal />
      <Contact />
    </div>
  );
}
