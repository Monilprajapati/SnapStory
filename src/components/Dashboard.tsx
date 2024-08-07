import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="h-[80vh] flex items-center justify-center text-foreground font-lato py-12 md:py-20 lg:py-24 w-full">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Discover the Stories That Matter
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
            SnapStory is a platform where writers, thinkers, and creators come
            together to share their unique perspectives.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center justify-center rounded-md bg-slate-200 font-semibold text-black px-6 py-3 text-sm md:text-base shadow-sm transition-colors hover:bg-slate-200/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            prefetch={false}
          >
            Explore Snaps
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
