import React, {useState, useEffect, Fragment} from "react";
import Button from "react-bootstrap/Button";
const Pagination = ({ showPerPage, onPaginationChange, total }) => {
    const [counter, setCounter] = useState(1);
    const [numberOfButtons, setNumberOfButoons] = useState(
        Math.ceil(total / showPerPage)
    );
    useEffect(() => {
        const value = showPerPage * counter;
        onPaginationChange(value - showPerPage, value);
    }, [counter]);
    const onButtonClick = (type) => {
        if (type === "prev") {
            if (counter === 1) {
                setCounter(1);
            } else {
                setCounter(counter - 1);
            }
        } else if (type === "next") {
            if (numberOfButtons === counter) {
                setCounter(counter);
            } else {
                setCounter(counter + 1);
            }
        }
    };
    return (
        <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <Button className="page-link" onClick={() => onButtonClick("prev")}>Previous</Button>
                    </li>
                    {new Array(numberOfButtons).fill("").map((el, index) => (
                        <Fragment>
                            {index<4 &&
                                <li className={`page-item ${index + 1 === counter ? "active" : null}`}>
                                    <Button className="page-link" onClick={() => setCounter(index + 1)}>
                                        {index + 1}
                                    </Button>
                                </li>
                            }
                        </Fragment>
                    ))}
                    <li className="page-item">
                        <Button className="page-link" onClick={() => onButtonClick("next")}>Next</Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
export default Pagination;