"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import aboutNext from "../api/next.json";
import { Technology } from "@/types/type";

export function Modals() {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const technology = aboutNext as Technology[];

  const handleSetData = (tech: Technology) => {
    setSelectedTech(tech)
  }
  
  return (
    <Dialog>
      <div className="flex flex-wrap gap-4 text-wrap">
        {technology.map((tech: Technology) => (
          <DialogTrigger asChild key={tech.name}>
            <Button variant="outline" onClick={() => handleSetData(tech)} className="cursor-pointer">
              Explore
            </Button>
          </DialogTrigger>
        ))}

        {selectedTech && (
          <DialogContent className="sm:max-w-xl max-h-120 overflow-auto">
            <DialogHeader>
              <DialogTitle>{selectedTech.name}</DialogTitle>
              <DialogDescription>{selectedTech.description}</DialogDescription>
            </DialogHeader>

            <ul className="mt-4 space-y-2">
              {selectedTech.features.map((feature) => (
                <li key={feature.title}>
                  <strong>{feature.title}</strong> – {feature.description}
                </li>
              ))}
            </ul>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={() => setSelectedTech(null)} className="cursor-pointer">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
}
