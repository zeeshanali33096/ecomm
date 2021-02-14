import Fuse from "fuse.js";
const Languages = [
  {
    id: 0,
    label: "English",
    translation: "English",
  },
  {
    id: 1,
    label: "Hindi",
    translation: "हिन्दी",
  },
  {
    id: 2,
    label: "Spanish",
    translation: "español",
  },
  {
    id: 3,
    label: "French",
    translation: "français",
  },
];

const fuseService = new Fuse(Languages, {
  keys: ["label", "translation"],
  shouldSort: true,
  includeScore: true,
  threshold: 0.2,
  isCaseSensitive: false,
});

const query = (search: string) => {
  const results = fuseService.search(search);
  //   console.log({ Languages, results, search });
  const filteredResults = search ? results.map((r) => r.item) : Languages;
  return filteredResults;
};

export default query;
