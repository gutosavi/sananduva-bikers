import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const items = [
  {
    value: "item-1",
    trigger: "Como me inscrever no Pedal do Tigre?",
    content:
      "Aguarde a abertura oficial do evento e faça sua inscrição em nosso site. Basta clicar no botão 'Inscrever-se', preencher o formulário e confirmar.",
  },
  {
    value: "item-2",
    trigger: "Quem pode participar?",
    content:
      "O evento contempla diferentes perfis de ciclistas. As idades permitidas, os critérios de participação e as condições de cada modalidade serão informados no regulamento da próxima edição.",
  },
  {
    value: "item-3",
    trigger: "Quando abrem as inscrições?",
    content:
      "A abertura das inscrições para 2027 será anunciada nos canais oficiais do Sananduva Bikers.",
  },
  {
    value: "item-4",
    trigger: "Preciso ter experiência em mountain bike para participar?",
    content:
      "Isso depende da modalidade e dos percursos oferecidos. A organização divulgará as características de cada trajeto para ajudar os participantes a escolherem uma opção adequada ao seu preparo.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="w-full bg-secondary-foreground py-20 px-6 md:px-30 flex flex-col justify-center gap-8 lg:px-20 lg:py-24"
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-lg text-primary font-bold font-display uppercase tracking-widest md:text-2xl">
          Perguntas Frequentes
        </h1>
        <p className="text-sm leading-relaxed text-surface md:text-base">
          Aqui estão algumas das perguntas mais comuns que recebemos de nossos
          usuários. Se você tiver outras dúvidas, não hesite em entrar em
          contato conosco.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center py-3 h-75 md:h-85">
        <Accordion defaultValue={["item-1"]} className="max-w-lg">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-primary-foreground text-base md:text-lg font-bold">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent className="text-sidebar-accent text-sm md:text-base">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
