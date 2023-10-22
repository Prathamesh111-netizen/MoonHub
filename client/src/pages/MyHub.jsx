import React from "react";
import Actionbar from "../components/Actionbar";
import ReposList from "../components/ReposList";

export default function Hub() {
  return (
    <div className="p-6">
      <Actionbar isAllActive />
      <ReposList />
    </div>
  );
}
