import React from 'react';
import ErrorMessage from "../errorMessage/errorMessage";
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return(
        <div>
            <ErrorMessage/>
    <p>Page is not found 404!!</p>
    <Link to='/'>Back</Link>
        </div>

    )
    }
;

export default PageNotFound;