import React from "react";
import Message from "./Message";
import Button from "@avtopro/button/dist/index";
import TextInput from "@avtopro/text-input/dist/index";
import Select, { Option } from "@avtopro/select/dist/index";
import Preloader from "@avtopro/preloader/dist/index";
import Modal from "@avtopro/modal/dist/index";
import Search from "../assets/icons/Search";

const VinSearch = ({
    searchVin,
    setSearchVin,
    onVinDecode,
    vinData,
    recentlyVin,
    isLoading,
    respMessage,
    error,
    setError,
}) => {
    const handleChange = (string) => {
        setSearchVin(string[0]);
        onVinDecode(searchVin);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onVinDecode(searchVin);
    };

    return (
        <div className="vin-search">
            <div className="vin-search__wrapper">
                <form
                    name="vin"
                    onSubmit={handleSubmit}
                    className="vin-search__form"
                >
                    <TextInput
                        autoFocus
                        value={searchVin}
                        onChange={(e) => setSearchVin(e.target.value)}
                        type="text"
                        placeholder="Enter the VIN..."
                        maxLength="17"
                        className="vin-search__input"
                    />
                    <Button
                        theme="blue"
                        title="Decode VIN"
                        type="submit"
                        className="vin-search__button"
                    >
                        <span>Search</span>
                        <Search fill="white" className="vin-search__icon" />
                    </Button>
                </form>
                {recentlyVin.length > 0 && (
                    <div className="vin-search-recently">
                        <h3 className="vin-search-recently__title">
                            Recently VIN
                        </h3>
                        <Select
                            className="vin-search-recently__select"
                            onChange={(_, newValue) => handleChange(newValue)}
                            defaultValue={recentlyVin[0]}
                        >
                            {recentlyVin.map((item, index) => (
                                <Option key={index} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
            </div>
            <div className="vin-decode">
                {vinData.length > 0 && (
                    <h3 className="vin-decode__title component__title">
                        Decoding results:
                    </h3>
                )}
                <ul className="vin-decode__list">
                    {isLoading && <Preloader title="Loading..." />}
                    {error && (
                        <Modal
                            mode="error"
                            onClose={() => setError(false)}
                            closeOnClick={true}
                        >
                            <>
                                <div className="modwin__caption">
                                    Wrong VIN!
                                </div>
                                <div className="modwin__sub-caption">
                                    VIN must not contain special characters and
                                    be 17 characters long.
                                </div>
                            </>
                        </Modal>
                    )}
                    <div className="message">
                        {<Message text={respMessage} />}
                    </div>
                    {vinData.map((item, index) => (
                        <li key={index} className="list__item">
                            <h4>{item.Variable}:</h4>
                            <p>{item.Value}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default VinSearch;
