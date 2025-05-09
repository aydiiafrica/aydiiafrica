export const getImageDimensions = (ref: string) => {
  const dimensions = ref.match(/(\d+)x(\d+)/);
  return dimensions
    ? {
        width: parseInt(dimensions[1], 10),
        height: parseInt(dimensions[2], 10),
      }
    : {
        width: 800,
        height: 600,
      };
};
