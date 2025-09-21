const localStorageManager = {

    SaveData(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    LoadData(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

}
export default localStorageManager;