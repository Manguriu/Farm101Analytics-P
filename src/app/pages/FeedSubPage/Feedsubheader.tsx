import React from "react";
import { useSearchParams } from "next/navigation";
import { UserGroupIcon, CalendarIcon, IdentificationIcon } from '@heroicons/react/outline';
import { Suspense } from 'react';


function FeedSubPageContent (){

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();

  // const id = searchParams.get("id");
  const batchName = searchParams.get("batchName");
  const currentCount = searchParams.get('currentCount');
  const breed = searchParams.get('breed');
  const startDate = searchParams.get('startDate');

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
  <div className="flex items-center gap-4 mb-4">
    <UserGroupIcon className="h-10 w-10 text-blue-600" />
    <h1 className="text-3xl font-bold text-gray-800">Batch Name: {batchName}</h1>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="flex items-center gap-2">
      <IdentificationIcon className="h-5 w-5 text-gray-500" />
      <p className="text-gray-700">
        <span className="font-medium">Initial Count:</span> {currentCount}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <IdentificationIcon className="h-5 w-5 text-gray-500" />
      <p className="text-gray-700">
        <span className="font-medium">Breed:</span> {breed || 'Not specified'}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <CalendarIcon className="h-5 w-5 text-gray-500" />
      <p className="text-gray-700">
        <span className="font-medium">Start Date:</span>{" "}
        {startDate ? new Date(startDate).toLocaleDateString() : "Date not available"}
      </p>
    </div>
  </div>
</div>
    
  );
}
export default function Feedsubheader() {

  return(
    <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
      <FeedSubPageContent />
    </Suspense>

  )}