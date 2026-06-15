import React from "react";
import { Button } from "@/components/ui/button";
import { Calculator, Boxes, Printer, Sliders } from "lucide-react";

const Features = () => {
  return (
    <section className="grid md:grid-cols-2 gap-12 mb-20">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          What is Skadisfinity?
        </h3>
        <p className="text-gray-600 mb-6">
          Skadisfinity helps you plan modular storage layouts for your
          workspace with maximum efficiency and flexibility. Our calculator
          empowers you to create custom layouts that perfectly fit your needs.
        </p>
        <Button 
          variant="outline"
          onClick={() => window.open("https://www.ikea.com/us/en/p/skadis-pegboard-white-10321618/", "_blank")}
        >
          Learn More
        </Button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-white">
        <h3 className="text-2xl font-semibold mb-6">Key Features</h3>
        <ul className="space-y-4">
          <li className="flex items-center">
            <Calculator className="mr-4 h-6 w-6" />
            <span>Easy-to-use calculator interface</span>
          </li>
          <li className="flex items-center">
            <Boxes className="mr-4 h-6 w-6" />
            <span>Customizable Skadis board dimensions</span>
          </li>
          <li className="flex items-center">
            <Sliders className="mr-4 h-6 w-6" />
            <span>Real-time visual preview</span>
          </li>
          <li className="flex items-center">
            <Printer className="mr-4 h-6 w-6" />
            <span>Export designs for 3D printing <span className="text-yellow-400 font-semibold">(Coming Soon!)</span></span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Features;
