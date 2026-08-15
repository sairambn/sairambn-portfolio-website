import { Nav } from '@/components/nav';
import { Hero } from '@/components/sections/hero';
import { Marquee } from '@/components/sections/marquee';
import { Work } from '@/components/sections/work';
import { Approach } from '@/components/sections/approach';
import { Stack } from '@/components/sections/stack';
import { Activity } from '@/components/sections/activity';
import { Contact } from '@/components/sections/contact';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee text="SHIPS SYSTEMS PEOPLE USE" />
        <Work />
        <Approach />
        <Marquee text="DAILY DSA · PYTHON · JAVA · TYPESCRIPT" />
        <Stack />
        <Activity />
        <Contact />
      </main>
    </>
  );
}
