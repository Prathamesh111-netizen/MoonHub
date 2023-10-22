import React from "react";
import { CgFolderAdd } from "react-icons/cg";
import CreateRepo from "./CreateRepo";

export default function Actionbar(props) {
  return (
    <>
      <div className="flex flex-row place-content-end bg-base-100">
        <ul className="menu menu-horizontal bg-base-100 rounded-box px-8 gap-3">
          <li>
            <button className={`${props.isAllActive ? "active" : ""}`}>
              All Repositories
            </button>
          </li>
          <li>
            <button className={`${props.isMyActive ? "active" : ""}`}>
              My Repositories
            </button>
          </li>
          <li>
            <button className={`${props.isPendingActive ? "active" : ""}`}>
              Pending Requests
            </button>
          </li>
        </ul>
        <>
          {/* The button to open modal */}
          <label
            htmlFor="my-modal-3"
            className="btn bg-blue-600 hover:bg-blue-800"
          >
            <CgFolderAdd />
            <pre>{"  "}Add New</pre>
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box w-max max-w-5xl ">
              <label
                htmlFor="my-modal-3"
                className="btn bg-blue-600 hover:bg-blue-900 btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <CreateRepo />
            </div>
          </div>
        </>
        <button></button>
      </div>
    </>
  );
}
