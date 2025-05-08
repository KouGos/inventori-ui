import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Star, Download, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MedicalJournalsPage() {
  return (
    <PageLayout title="Medical Journals" description="Access top medical journals and latest publications">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search journals or articles..." className="pl-9 border-gray-200" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-200">
              <Calendar className="mr-2 h-4 w-4" /> Latest
            </Button>
            <Button variant="outline" className="border-gray-200">
              <Star className="mr-2 h-4 w-4" /> Top Rated
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Top Journals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "New England Journal of Medicine",
                publisher: "Massachusetts Medical Society",
                impact: 91.2,
                frequency: "Weekly",
              },
              {
                name: "The Lancet",
                publisher: "Elsevier",
                impact: 79.3,
                frequency: "Weekly",
              },
              {
                name: "JAMA",
                publisher: "American Medical Association",
                impact: 56.3,
                frequency: "Weekly",
              },
              {
                name: "BMJ",
                publisher: "BMJ Publishing Group",
                impact: 39.9,
                frequency: "Weekly",
              },
              {
                name: "Nature Medicine",
                publisher: "Nature Publishing Group",
                impact: 53.4,
                frequency: "Monthly",
              },
              {
                name: "Annals of Internal Medicine",
                publisher: "American College of Physicians",
                impact: 25.4,
                frequency: "Monthly",
              },
            ].map((journal, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex items-start">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">{journal.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Publisher:</span> {journal.publisher}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Impact Factor:</span> {journal.impact}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Frequency:</span> {journal.frequency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Latest Publications</h2>
          <div className="space-y-4">
            {[
              {
                title: "Efficacy of mRNA Vaccines Against Emerging SARS-CoV-2 Variants",
                journal: "New England Journal of Medicine",
                authors: "Johnson M, Smith J, et al.",
                date: "April 15, 2024",
              },
              {
                title: "Long-term Outcomes of Minimally Invasive Cardiac Surgery",
                journal: "The Lancet",
                authors: "Williams R, Brown T, et al.",
                date: "April 12, 2024",
              },
              {
                title: "Artificial Intelligence in Diagnostic Radiology: A Systematic Review",
                journal: "JAMA",
                authors: "Chen L, Garcia P, et al.",
                date: "April 10, 2024",
              },
              {
                title: "Novel Biomarkers for Early Detection of Alzheimer's Disease",
                journal: "Nature Medicine",
                authors: "Rodriguez A, Kim S, et al.",
                date: "April 8, 2024",
              },
            ].map((article, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium text-gray-800">{article.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">{article.journal}</span> • {article.date}
                </p>
                <p className="text-sm text-gray-500">{article.authors}</p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="h-7 border-gray-200">
                    <Download className="h-3 w-3 mr-1" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
