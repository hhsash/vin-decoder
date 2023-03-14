import React from "react";
import { Link } from "react-router-dom";
import Modal from "@avtopro/modal/dist/index";
import Preloader from "@avtopro/preloader/dist/index";

const VehicleVariables = ({
    variables,
    error,
    setError,
    errorMessage,
    isLoading,
}) => {
    return (
        <div className="vehicle-variable">
            <h3 className="vehicle-variable__title component__title">
                Variables list:
            </h3>
            {error && (
                <Modal
                    mode="error"
                    onClose={() => setError(false)}
                    closeOnClick={true}
                >
                    {errorMessage}
                </Modal>
            )}
            {isLoading && <Preloader title="Loading..." />}
            <ul className="variables__list">
                {variables.map((item) => (
                    <li className="variables__item list__item" key={item.ID}>
                        <Link to={`/vin-decoder/variables/${item.ID}`}>
                            <h4 className="variables__title">{item.Name}</h4>
                        </Link>
                        <div
                            className="variables__description"
                            dangerouslySetInnerHTML={{
                                __html: item.Description,
                            }}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VehicleVariables;
