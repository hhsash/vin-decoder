import React from "react";
import Banner from "@avtopro/banner/dist/index";

const NotFound = () => {
    return (
        <Banner header="Страница не найдена..." mode="error">
            <>
                <div>
                    По данной ссылке ничего не найдено. Похоже, что контент был
                    перемещён или удалён.
                </div>
            </>
        </Banner>
    );
};

export default NotFound;
