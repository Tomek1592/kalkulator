export const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };

export const getFromLocalStorage = (key: string): any => {
    const data: any = localStorage.getItem(key);
    return data;
};
