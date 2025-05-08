import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { FileText, Plus } from "lucide-react"

export default function ProtocolDesignerPage() {
  return (
    <PageLayout
      title="Protocol Designer"
      description="Design and optimize research protocols for medical studies"
      headerAction={
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Protocol
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Recent Protocols</h2>
          <div className="space-y-4">
            {[
              {
                title: "Randomized Controlled Trial for Novel Antihypertensive",
                type: "Clinical Trial",
                date: "2024-04-14",
                status: "Draft",
              },
              {
                title: "Observational Study of Post-COVID Cognitive Effects",
                type: "Observational Study",
                date: "2024-04-08",
                status: "Finalized",
              },
              {
                title: "Cross-sectional Analysis of Diabetes Complications",
                type: "Cross-sectional Study",
                date: "2024-04-02",
                status: "Under Review",
              },
            ].map((protocol, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-800">{protocol.title}</h3>
                      <p className="text-sm text-gray-500">
                        {protocol.type} • Last edited: {protocol.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 ${
                        protocol.status === "Finalized"
                          ? "bg-green-100 text-green-800"
                          : protocol.status === "Draft"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {protocol.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Protocol Templates</h2>
            <p className="text-gray-600 mb-4">Start with a template to create your research protocol.</p>
            <div className="space-y-2">
              {[
                "Randomized Controlled Trial",
                "Observational Study",
                "Case-Control Study",
                "Cohort Study",
                "Cross-sectional Study",
              ].map((template, i) => (
                <div
                  key={i}
                  className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer flex justify-between items-center"
                >
                  <span>{template}</span>
                  <Button variant="outline" size="sm" className="h-7 border-gray-200">
                    Use
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Protocol Tools</h2>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Sample Size Calculator</h3>
                <p className="text-sm text-gray-500">Determine optimal sample size for your study</p>
              </div>
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Randomization Tool</h3>
                <p className="text-sm text-gray-500">Generate randomization sequences for clinical trials</p>
              </div>
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Inclusion/Exclusion Criteria Builder</h3>
                <p className="text-sm text-gray-500">Define and refine study criteria</p>
              </div>
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Timeline Generator</h3>
                <p className="text-sm text-gray-500">Create study timelines and milestones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
