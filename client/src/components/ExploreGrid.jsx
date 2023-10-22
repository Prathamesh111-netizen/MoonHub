import React from "react";

export default function ExploreGrid() {
  const [repos, setRepos] = React.useState([
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "123",
      name: "MoonHub",
      description: "Footprints on the moon",
      owner: "Karan",
      image: "https://via.placeholder.com/300",
      oneTimeFee: "2cr",
      subscriptionRate: "1Cr/s",
      folder: "FolderName",
      isActive: true,
      crearedAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  return (
    <div>
      <div className="grid grid-cols-3 gap-10 justify-center pl-14">
        {repos.map((repo) => {
          return (
            <div className="">
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={repo.image}
                    alt="Shoes"
                    className="rounded-xl h-32 w-64"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{repo.name}</h2>
                  <p>{repo.description}</p>
                  <p>Subscription Rate:{repo.subscriptionRate}</p>
                  <p>One Time Fee:{repo.oneTimeFee}</p>

                  <div className="card-actions flex justify-center">
                    <button className="btn btn-primary">View</button>
                    <button className="btn btn-primary">
                      Request Subscription
                    </button>
                    <button className="btn btn-primary">
                      Buy One Time Access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
