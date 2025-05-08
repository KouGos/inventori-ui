import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Brain, Info, ArrowRight } from "lucide-react"

export default function GeneralMedicalModelsPage() {
  return (
    <PageLayout
      title="General Medical AI Models"
      description="AI models trained on broad medical knowledge for general healthcare applications"
    >
      <div className="space-y-6">
        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Available Models</h2>
          <div className="space-y-4">
            {[
              {
                name: "MedAssist GPT",
                version: "4.0",
                description: "General-purpose medical AI assistant with broad knowledge across specialties",
                capabilities: ["Medical literature analysis", "Clinical decision support", "Patient education"],
                training: "Trained on medical textbooks, journals, and clinical guidelines through 2023",
              },
              {
                name: "DiagnosticGPT",
                version: "2.5",
                description: "Specialized in differential diagnosis and clinical reasoning",
                capabilities: [
                  "Symptom analysis",
                  "Differential diagnosis generation",
                  "Diagnostic test recommendation",
                ],
                training: "Trained on case studies, diagnostic manuals, and clinical decision trees",
              },
              {
                name: "MedResearchGPT",
                version: "3.0",
                description: "Optimized for medical research and literature analysis",
                capabilities: ["Research paper summarization", "Study design analysis", "Statistical interpretation"],
                training: "Trained on medical journals, research methodologies, and statistical analyses",
              },
            ].map((model, i) => (
              <div key={i} className="border border-gray-200 hover:border-blue-200">
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Brain className="h-6 w-6 text-blue-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">{model.name}</h3>
                      <p className="text-sm text-gray-500">Version {model.version}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{model.description}</p>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Capabilities:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                      {model.capabilities.map((capability, j) => (
                        <li key={j}>{capability}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{model.training}</p>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" className="border-gray-200">
                      <Info className="h-4 w-4 mr-2" /> Details
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Use Model <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Model Performance</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2">Benchmark Results</h3>
              <div className="space-y-3">
                {[
                  {
                    test: "Medical Knowledge Assessment",
                    score: "92%",
                    description: "Evaluation of general medical knowledge across specialties",
                  },
                  {
                    test: "Clinical Reasoning Test",
                    score: "88%",
                    description: "Assessment of diagnostic reasoning and clinical decision-making",
                  },
                  {
                    test: "Medical Literature Comprehension",
                    score: "94%",
                    description: "Ability to understand and summarize medical research papers",
                  },
                ].map((benchmark, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-700">{benchmark.test}</p>
                      <p className="text-sm text-gray-500">{benchmark.description}</p>
                    </div>
                    <div className="text-lg font-medium text-blue-600">{benchmark.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
