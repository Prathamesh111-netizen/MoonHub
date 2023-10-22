import React from "react";

export default function RepoCard(props) {
  console.log(props.repo.image);
  return (
    <>
      <div className="card p-3 lg:card-side bg-base-100 shadow-xl h-48 mb-5">
        <figure>
          <img src={`${props.repo.image}`} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{props.repo.name}</h2>
          <p>{props.repo.description}</p>
          <div className="card-actions justify-end">
            <a href = {`https://files.lighthouse.storage/viewFile/${props.repo.folder}`} target="_blank" rel="noreferrer">
            <button className="btn btn-primary">Visit</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
