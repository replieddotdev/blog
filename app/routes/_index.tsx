import React from "react";
import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/Header";
import { BlogCard } from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "replied.dev" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto px-6">
        <BlogCard
          title="Manejando estado complejo en aplicaciones React"
          excerpt="Un análisis sobre diferentes estrategias para manejar estado en aplicaciones React modernas, desde Context hasta máquinas de estado."
          author="Daniel Huerta"
          date="29 DIC 2024"
          tags={["react", "frontend"]}
        />

        <BlogCard
          title="Event Sourcing: Lecciones de implementación"
          excerpt="Experiencias y aprendizajes implementando Event Sourcing en un sistema de alta concurrencia."
          author="Eduardo Álvarez"
          date="27 DIC 2024"
          tags={["arquitectura", "backend"]}
        />

        <BlogCard
          title="Refactoring: De monolito a microservicios"
          excerpt="Un caso de estudio sobre cómo dividimos un monolito en servicios manteniendo el sistema en producción."
          author="Daniel Huerta"
          date="23 DIC 2024"
          tags={["arquitectura", "patterns"]}
        />
      </div>
    </main>
  );
}
