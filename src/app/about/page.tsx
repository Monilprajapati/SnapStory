import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center font-lato mt-10">
      <header className="bg-white text-foreground py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              About SnapStory
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Learn more about our mission, team, and the stories we share.
            </p>
          </div>
        </div>
      </header>
      <section className="pt-4 py-10 md:pt-8 pb-12 lg:pt-10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                At SnapStory, our mission is to create a platform where writers,
                thinkers, and creators can share their unique perspectives and
                connect with like-minded individuals. We believe that
                storytelling has the power to inspire, educate, and bring people
                together.
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground">
                Our team is composed of passionate individuals who are dedicated
                to curating and sharing the most compelling stories. From our
                editors to our designers, we work together to ensure that every
                piece on SnapStory is of the highest quality and resonates with
                our readers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
