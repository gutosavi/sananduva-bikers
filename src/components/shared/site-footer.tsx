import { Mail } from "lucide-react";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaStrava,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const NAV_LINKS = [
  { href: "#about", label: "Quem Somos" },
  { href: "#contact", label: "Contato" },
  { href: "#faq", label: "Perguntas Frequentes" },
  { href: "#event", label: "O Evento" },
  { href: "#event-recap", label: "Confira os eventos anteriores" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/sananduvabikers",
    icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/sananduvabikers",
    icon: FaFacebook,
  },
  {
    href: "https://www.youtube.com/@sananduvabikers",
    icon: FaYoutube,
  },
  {
    href: "https://strava.app.link/lzxfxa1Bo7b",
    icon: FaStrava,
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-foreground py-10 px-6 md:px-30 lg:px-20 lg:py-15">
      <div className="grid grid-cols-1 md:[2fr_1fr] gap-8 mb-20">
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/logo-branca.svg"
              alt="Logo"
              width={60}
              height={60}
              className="w-20 h-20 mb-4"
            />
            <h2 className="text-primary text-lg uppercase font-bold tracking-wider">
              Nossas redes
            </h2>

            <ul className="flex gap-4 mt-2 md:mt-4">
              {SOCIAL_LINKS.map((link, index) => (
                <li key={link.href + index}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon
                      size={24}
                      className="text-sidebar-accent hover:text-primary-foreground"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-12 md:col-start-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-primary uppercase tracking-wider font-bold text-lg">
              Sananduva Bikers
            </h2>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="py-1">
                  <a
                    href={link.href}
                    className="text-sidebar-accent hover:text-primary-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-sidebar-accent">
            <h2 className="text-primary uppercase tracking-wider font-bold text-lg">
              Contato
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              <div>
                <Mail className="inline-block mr-2" />
                <span className="text-sidebar-accent">
                  contato@sananduva-bikers.com
                </span>
              </div>
              <div>
                <FaWhatsapp size={24} className="inline-block mr-2" />
                <span className="text-sidebar-accent">(54) 99999-9999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-secondary mt-6" />

      <div className="mt-6 text-sm text-sidebar-accent">
        © {new Date().getFullYear()} Sananduva Bikers. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
