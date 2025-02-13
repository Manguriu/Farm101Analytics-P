/* eslint-disable @next/next/no-img-element */
"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Bird, Droplets, LineChart, HeartPulse, PieChart, ChevronRight } from "lucide-react"

const features = [
  {
    title: "Flock Management",
    icon: Bird,
    image: "/FlockManagement.png",
    alt: "Flock Management",
    action: "Manage flocks",
    href: "/pages/FlockManagement",
  },
  {
    title: "Feed & Water",
    icon: Droplets,
    image: "/FeedWaterTracking.png",
    alt: "Feed and Water",
    action: "Track feed and water",
    href: "/pages/FeedWaterTracking",
  },
 
  {
    title: "Health and Growth Monitoring",
    icon: HeartPulse,
    image: "/HealthMonitoring.png",
    alt: "Health Monitoring",
    action: "Flocks Monitoring",
    href: "/pages/MainMonitoring",
  },
  {
    title: "Financial Tracking",
    icon: LineChart,
    image: "/ExpenseTracking.png",
    alt: "Financial Tracking",
    action: "Manage finances",
    href: "/pages/FinanceTracking",
  },
  {
    title: "Reports & Insights",
    icon: PieChart,
    image: "/ReportInsights.png",
    alt: "Reports and Insights",
    action: "View reports",
    href: "/pages/ReportsAndInsights",
  },
]




export default function MainFeatures() {

 const router = useRouter();

 
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {features.map((feature) => (
      <div
        key={feature.title}
        className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
      >
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <feature.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <h3 className="text-lg font-medium text-gray-900 truncate">{feature.title}</h3>
            </div>
          </div>
        </div>
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            src={feature.image || "/placeholder.svg"}
            alt={feature.alt}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallbackElement = e.currentTarget.nextSibling as HTMLElement | null;
              if (fallbackElement) {
                fallbackElement.style.display = "flex";
              }
            }}
            
          />
          <div className="hidden absolute inset-0 items-center justify-center">
            <feature.icon className="h-24 w-24 text-gray-400" />
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3">
          <button
            className="text-sm font-medium text-blue-600 hover:text-blue-900 flex items-center justify-between w-full"
            onClick={() => router.push(feature.href)}
          >
            {feature.action}
            <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </button>
        </div>
      </div>
    ))}
  </div>
  );
}
