import React, { MouseEvent, useState } from "react";
import ListItem from "./ListItem";
import "./style.css";

interface AccordionItem {
  [name: string]: any;
  id: string | number;
}
interface AccorionProps {
  items: AccordionItem[];
  SummaryComponent: React.ElementType;
  DetailComponent: React.ElementType;
}
const Accordion = ({ items, ...rest }: AccorionProps) => {
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const clickHandler = (e: MouseEvent): void => {
    let element = e.target as HTMLElement;

    if (element.parentElement?.tagName === "LI") {
      element = element.parentElement;
    }

    if (element.tagName !== "LI") return;

    const id = element.getAttribute("id");

    if (!id) return;

    const isOpen = !!opened[id];

    if (isOpen) {
      const contentItem = document.getElementById(`acc-item-${id}`);

      if (!contentItem) return;

      contentItem
        .animate(
          { maxHeight: 0, opacity: 0 },
          { duration: 100, easing: "ease-out" }
        )
        .finished.then(() => {
          setOpened((prv) => ({ ...prv, [id]: false }));
        });
      return;
    }

    setOpened((prv) => ({ ...prv, [id]: true }));

    setTimeout(() => {
      const contentItem = document.getElementById(`acc-item-${id}`);

      if (!contentItem) return;
      const scrollHeight = contentItem.scrollHeight;

      contentItem.animate(
        { maxHeight: `${scrollHeight}px`, opacity: 1 },
        { duration: 100, easing: "ease-in", fill: "forwards" }
      );
    }, 0);
  };

  return (
    <ul onClick={clickHandler}>
      {items.map(({ id, ...data }) => (
        <ListItem id={id} {...data} key={id} isOpen={opened[id]} {...rest} />
      ))}
    </ul>
  );
};

export default Accordion;
