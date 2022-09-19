import React from "react";
import * as TBIcons from "react-icons/tb";
import "./../Assets/css/ErrorPage.css";

export default function PageNotFound() {
  return (
    <div className="error-banner box-error text-light">
      <div>
        <p className="error-icon text-center">
          <TBIcons.TbError404 className="error-svg-color" />
        </p>
        <br />
        <h1 className="error-msg">Sorry, Page Not found</h1>
        <p className="error-msg">
          We can not seems to find the page you are looking for
        </p>
        {/* <div class="text-center">
                <button type="button" class="btn btn-primary">GO BACK</button>
            </div> */}
      </div>
    </div>
  );
}
