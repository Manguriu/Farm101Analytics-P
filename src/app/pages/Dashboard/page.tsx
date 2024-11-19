/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import { 
  HomeIcon, ChartBarIcon, CogIcon, PlusIcon, 
   BeakerIcon} from '@heroicons/react/outline'
import Stats from './Stats'
import MainFeatures from './MainFeatures'
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)


  const handleFlockManagement = () => {
    router.push("/pages/FlockManagement");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-blue-700 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-4 border-b border-blue-600">
          <div className="flex items-center space-x-2">
            <BeakerIcon className="h-8 w-8" />
            <span className="text-xl font-bold">SmartPoultry</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <BeakerIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2">
          <a href="/" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-blue-800 focus:outline-none focus:bg-blue-900 transition ease-in-out duration-150">
            <HomeIcon className="mr-4 h-6 w-6" />
            Home
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <ChartBarIcon className="mr-4 h-6 w-6" />
            Flock Management
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <CogIcon className="mr-4 h-6 w-6" />
            Feed & Water
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <ChartBarIcon className="mr-4 h-6 w-6" />
            Growth Analytics
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <CogIcon className="mr-4 h-6 w-6" />
            Financial Tracking
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <ChartBarIcon className="mr-4 h-6 w-6" />
            Health Monitoring
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <ChartBarIcon className="mr-4 h-6 w-6" />
            Reports & Insights
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition ease-in-out duration-150">
            <CogIcon className="mr-4 h-6 w-6" />
            Settings
          </a>
        </nav>
        <div className="absolute bottom-0 w-full">
          <div className="flex items-center px-4 py-3 border-t border-blue-600">
            <img className="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Smith</p>
              <p className="text-xs font-medium text-blue-300">View profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
                    <BeakerIcon className="block h-6 w-6" aria-hidden="true" />
                  </button>
                  <h1 className="ml-3 text-2xl font-bold text-gray-900">Dashboard</h1>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <button onClick={handleFlockManagement} className="ml-auto inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add New Flock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Stats Overview */}
              <Stats />

              {/* Main Features */}
              <MainFeatures />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}