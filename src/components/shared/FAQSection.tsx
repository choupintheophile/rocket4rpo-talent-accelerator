import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

interface FAQ {
  question: string;
  answer: string;
}

export const FAQSection = ({ faqs, title = "Questions fréquentes" }: { faqs: FAQ[]; title?: string }) => (
  <section className="section-padding">
    <div className="container-tight">
      <SectionHeading title={title} />
      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
