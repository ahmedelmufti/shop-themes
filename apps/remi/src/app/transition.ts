export const transition = async (element, time) => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
