import React from 'react';

const JobDetails = () => {
  return (
    <div className="p-8 prose dark:prose-invert">
      <h1 className="text-xl font-bold">Couldn't find any HTML, LLM Response:</h1>
      <div className="p-4 bg-background rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Jobs for you</h2>
        <div className="mt-4 space-y-4">
          {/* Job Card */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <h3 className="text-lg font-bold">F & B Waiter/steward</h3>
            <p className="text-muted-foreground">Karvlihan Residency (PLTD), Kozhikode, Kerala</p>
            <p className="text-primary">₹12,000 - ₹17,000 a month</p>
            <p className="text-muted">Job Type: Full-time, Part-time</p>
            <button className="mt-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded">
              Easily apply
            </button>
          </div>

          {/* Job Details */}
          <div className="p-4 bg-card rounded-lg border border-border">
            <h3 className="text-lg font-bold">F & B Waiter/steward</h3>
            <button className="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded">
              Apply now
            </button>
            <div className="mt-2">
              <h4 className="font-semibold">Job details</h4>
              <p className="text-muted-foreground">Salary: ₹12,000 - ₹17,000 a month</p>
              <p className="text-muted-foreground">Job Type: Full-time</p>
              <p className="text-muted-foreground">Schedule: Day shift</p>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Location</h4>
              <p className="text-muted-foreground">Kozhikode, Kerala</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
