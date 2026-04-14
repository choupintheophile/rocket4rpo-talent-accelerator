import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";

interface FAQ {
  question: string;
  answer: string;
}

export const FAQSection = ({ faqs, title = "Questions fréquentes", className }: { faqs: FAQ[]; title?: string; className?: string }) => (
  <section className={`section-padding ${className ?? ""}`}>
    <div className="container-tight">
      <SectionHeading title={title} />
      <Accordion type="single" collapsible defaultValue="faq-0" className="max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} value={`faq-${i}`}>
            <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
