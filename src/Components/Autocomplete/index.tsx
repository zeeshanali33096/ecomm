import React from "react";

// import { ReactSearchAutocomplete } from "react-search-autocomplete";

// import "./index.css";

const Autocomplete = () => {
  // selectedItem

  const items = [
    {
      id: 0,
      name: "English",
      translate: "English",
    },
    {
      id: 1,
      name: "Hindi",
      translate: "हिन्दी",
    },
    {
      id: 2,
      name: "Spanish",
      translate: "español",
    },
    {
      id: 3,
      name: "French",
      translate: "français",
    },
  ];

  //   const handleOnSearch = (string, results) => {
  //     // onSearch will have as the first callback parameter
  //     // the string searched and for the second the results.
  //     console.log(string, results);
  //   };

  //   const handleOnSelect = (item:string) => {
  //     // the item selected
  //     console.log(item);
  //   };

  //   const handleOnFocus = () => {
  //     console.log("Focused");
  //   };

  return (
    <></>
    // <ReactSearchAutocomplete
    //   items={items}
    //   fuseOptions={{ keys: ["name", "translate"], threshold: 0.3 }}
    //   onSearch={handleOnSearch}
    //   onSelect={handleOnSelect}
    //   onFocus={handleOnFocus}
    //   autoFocus
    // />
  );
};

export default Autocomplete;
