import React from "react";

const Search = (props) => {
    return (
        <div>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path
                    d="M4.49976 10.5C4.49976 5.52986 8.52962 1.5 13.4998 1.5C18.4699 1.5 22.4998 5.52986 22.4998 10.5C22.4998 15.4701 18.4699 19.5 13.4998 19.5C11.3741 19.5 9.42634 18.7571 7.88905 17.5258L3.20732 22.2076L3.2055 22.2094C3.01098 22.4019 2.75534 22.5 2.49976 22.5C2.24418 22.5 1.98854 22.4019 1.79403 22.2094L1.79221 22.2076C1.40195 21.8173 1.40195 21.1837 1.79221 20.7934L6.47403 16.1116C5.24271 14.5736 4.49976 12.6258 4.49976 10.5ZM13.4998 3.5C9.6409 3.5 6.49976 6.64114 6.49976 10.5C6.49976 14.3589 9.6409 17.5 13.4998 17.5C17.3586 17.5 20.4998 14.3589 20.4998 10.5C20.4998 6.64114 17.3586 3.5 13.4998 3.5Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};

export default Search;
