import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitle({children, className}) {
    const { toggle } = useAccordionContext();
    const id = useAccordionItemContext();

    return <h3 className={className} onClick={() => toggle(id)}>{children}</h3>
}
