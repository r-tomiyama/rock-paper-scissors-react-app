import { DocumentData, FirestoreDataConverter } from "firebase/firestore";

export type Room = {
  name: string;
}

function assert(data: DocumentData): asserts data is Room {
    const d = data as Partial<Room>;
    if (
      !(
        typeof d.name !== "undefined" &&
        typeof d.name === "string"
      )
    ) {
      throw new Error("invalid data");
    }
}

export const roomConverter: FirestoreDataConverter<Room> = ({
    fromFirestore: (snapshot, option) => {
        const data = snapshot.data(option);
        assert(data);
        
        return data;
      },
    toFirestore: (model: Room) => model,
  })
  