import { FacebookIcon, YoutubeIcon, TiktokIcon, InstagramIcon } from './ui/home/socialicons';
import Link from 'next/link';
import PlausibleProvider from 'next-plausible'



export default function Home() {
  return (
    <PlausibleProvider domain="carhype.dk">
      <div className="flex flex-col min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        {/* Header */}
        <header className="flex justify-center text-[36px] sm:text-[56px] mb-12">
          <h1 className="">CAR</h1>
          <h1 className="font-[800]">HYPE</h1>
        </header>

        {/* Main Content */}
        <main className="flex flex-col flex-grow items-center justify-center gap-12 w-full">
          {/* Intro Text */}
          <div className="text-center max-w-[400px]">
            <h2 className="font-bold text-[24px] sm:text-[32px]">Din digitale køremakker</h2>
            <p>
              Vi gør biloplevelsen bedre og billigere<br />
              Vi forbinder bilister med smarte værktøjer<br />
              +150.000 medlemmer
            </p>
          </div>

          {/* Buttons + Social Icons */}
          <div className="w-full max-w-[800px] flex flex-col md:flex-row justify-center md:justify-between items-center gap-10">
            {/* Buttons */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href={"/forsikringstest"} className="w-full md:text-[24px] px-10 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                Forsikringstest
              </Link>
              <Link href={"/civilvognstest"} className="w-full md:text-[24px] px-10 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Civilvognstest
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex flex-row md:flex-col items-center sm:items-end gap-4">
              <FacebookIcon />
              <YoutubeIcon />
              <TiktokIcon />
              <InstagramIcon />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex gap-6 flex-wrap items-center justify-center mt-12">

        </footer>
      </div>
    </PlausibleProvider>

  );
}
