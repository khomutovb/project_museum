export const fetchById = async (id) => {
  const url = `https://openaccess-api.clevelandart.org/api/artworks/${id}`;
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (err) {
    return console.log(err);
  }
};
export const fetchSearch = async (type, limit) => {
  const url = `https://openaccess-api.clevelandart.org/api/artworks/?type=${type}&limit=${limit}`;
  try {
    console.log(url);
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (err) {
    return console.log(err);
  }
};
