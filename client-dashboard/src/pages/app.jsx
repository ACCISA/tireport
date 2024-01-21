import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppView } from 'src/sections/overview/view';
import CreateReport from 'src/sections/overview/app-create-report';
import FindReport from 'src/sections/overview/app-find-report';

export default function AppPage() {

  const [reportId, setReportId] = useState(null);

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      {reportId != null && <AppView /> }
      {reportId == null && 
        <div className='flex justify-content items-center flex-row gap-8'>
          <h1 className="text-2xl font-bold">Find a report </h1>
          <FindReport/>
          <h1>or</h1>
          <CreateReport/>
        </div>
      }
      
    </>
  );
}
