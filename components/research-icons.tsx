import {
  Dna,
  Microscope,
  FlaskRoundIcon as Flask,
  Brain,
  BookOpen,
  BarChartIcon as ChartBar,
  Atom,
  Stethoscope,
} from "lucide-react"

export const ResearchIcons = {
  Dna,
  Microscope,
  Flask,
  Brain,
  BookOpen,
  ChartBar,
  Atom,
  Stethoscope,
}

export function ResearchBackground() {
  return (
    <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-400 rounded-full"></div>
      <div className="absolute top-40 right-20 w-32 h-32 border border-blue-300 rounded-full"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-blue-300 rounded-full"></div>
      <div className="absolute top-1/3 right-1/3 w-24 h-24 border-2 border-blue-400 rounded-full"></div>
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="1" fill="#3b82f6" fillOpacity="0.3"></circle>
          <circle cx="30" cy="30" r="0.5" fill="#3b82f6" fillOpacity="0.3"></circle>
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
      </svg>
    </div>
  )
}
