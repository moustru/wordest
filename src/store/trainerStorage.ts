import type StorageObject from "@/types/Storage";

// class TrainerStorage {
//   initStorage(store: StorageObject) {
//     const isStorageExists = localStorage.getItem("trainerData");

//     if (!isStorageExists) this.recordStorage(store);
//   }

//   recordStorage(store: StorageObject) {
//     const { words } = store;

//     localStorage.setItem(
//       "trainerData",
//       JSON.stringify({
//         question: store.questionsCounter.current,
//         letter: store.lettersCounter.current,
//         words
//       })
//     );
//   }

//   removeStorage() {
//     localStorage.removeItem("trainerData");
//   }

//   actionWithStorageRecord(callback: () => void) {
//     callback();
//     this.recordStorage();
//   }
// }
