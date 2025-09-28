// // utils/localStorageManager.ts
// const isBrowser = typeof window !== "undefined";

// type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
// interface JsonObject {
//     [key: string]: JsonValue;
// }

// const localStorageManager = {
//     SaveData(key: string, data: JsonValue) {
//         if (!isBrowser) return;
//         localStorage.setItem(key, JSON.stringify(data));
//     },

//     LoadData<T extends JsonValue = JsonValue>(key: string): T | null {
//         if (!isBrowser) return null;
//         const data = localStorage.getItem(key);
//         return data ? (JSON.parse(data) as T) : null;
//     },

//     GetUsuarioData<T extends JsonObject = JsonObject>(): T {
//         if (!isBrowser) return {} as T;
//         const perfilUsuarioStr = localStorage.getItem("perfilUsuario");
//         return perfilUsuarioStr ? (JSON.parse(perfilUsuarioStr) as T) : {} as T;
//     },

//     SetUsuarioData(data: JsonObject) {
//         if (!isBrowser) return;
//         localStorage.setItem("perfilUsuario", JSON.stringify(data));
//     },
// };

// // Export padrão
// export default localStorageManager;

// // Export nomeado separado, evita problemas de destructuring
// export { localStorageManager as LocalStorageManager, localStorageManager.GetUsuarioData, localStorageManager.SetUsuarioData };
