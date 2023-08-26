export const blobToFile = async (
  blobData: string,
  fileName: string = ''
): Promise<File> => {
  if (fileName == '') fileName = new Date().toISOString();
  const response = await fetch(blobData);
  const data = await response.blob();
  const metadata = {
    type: 'image/png',
    lastModified: new Date().getTime(),
  };
  return new File([data], `${fileName}.png`, metadata);
};

export const randomColor = () => {
  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
  return randomRGB();
};

export const getMonthName = (monthNumber: number) => {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
};
