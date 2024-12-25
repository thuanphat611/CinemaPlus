const createImagePlaceholder = (width, height, text = "No Image") => {
  return `https://placehold.co/${width}x${height}?text=${text}`;
};

const movieImagePlaceholder = "https://placehold.co/200x280?text=No+Image";

module.exports = {
  createImagePlaceholder,
  movieImagePlaceholder,
};
