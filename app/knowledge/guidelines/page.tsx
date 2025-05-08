import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Search, FileText, Download, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ClinicalGuidelinesPage() {
  return (
    <PageLayout
      title="Clinical Guidelines"
      description="Access the latest clinical practice guidelines from medical associations"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search guidelines..." className="pl-9 border-gray-200" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-200">
              <Calendar className="mr-2 h-4 w-4" /> Latest
            </Button>
            <Button variant="outline" className="border-gray-200">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Featured Guidelines</h2>
          <div className="space-y-4">
            {[
              {
                title: "2024 Guidelines for the Management of Hypertension",
                organization: "American Heart Association",
                date: "March 2024",
                pages: 42,
              },
              {
                title: "Clinical Practice Guidelines for Diabetes Management",
                organization: "American Diabetes Association",
                date: "January 2024",
                pages: 56,
              },
              {
                title: "Guidelines for the Treatment of Major Depressive Disorder",
                organization: "American Psychiatric Association",
                date: "February 2024",
                pages: 38,
              },
            ].map((guideline, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">{guideline.title}</h3>
                    <p className="text-sm text-gray-500">
                      {guideline.organization} • {guideline.date} • {guideline.pages} pages
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">By Specialty</h2>
            <div className="space-y-2">
              {[
                "Cardiology (24)",
                "Endocrinology (18)",
                "Oncology (22)",
                "Neurology (16)",
                "Psychiatry (14)",
                "Infectious Disease (20)",
                "Pulmonology (15)",
                "Gastroenterology (17)",
              ].map((specialty, i) => (
                <div key={i} className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                  {specialty}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">By Organization</h2>
            <div className="space-y-2">
              {[
                "American Heart Association (AHA)",
                "American Medical Association (AMA)",
                "World Health Organization (WHO)",
                "National Institutes of Health (NIH)",
                "Centers for Disease Control (CDC)",
                "American College of Physicians (ACP)",
                "American Academy of Pediatrics (AAP)",
                "European Society of Cardiology (ESC)",
              ].map((org, i) => (
                <div key={i} className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                  {org}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
