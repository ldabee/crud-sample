import { IUser } from "../models/ITests";

export class TestService {

  public static async getAll(): Promise<IUser[]> {
    const response = await fetch("/getAll");
    const users: IUser[] = await response.json();
    return users;
  }

  public static async insert(item: IUser): Promise<IUser[]> {
    if (item !== undefined) {
      let userToAdd: IUser = item;
      const response = await fetch("/insert", {
        method: "POST",
        body: JSON.stringify(userToAdd),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const users: IUser[] = await response.json();
      return users;
    }
    return [] as IUser[];

  }

  public static async update(item: IUser): Promise<IUser[]> {
    if (item !== undefined) {
      let userToUpdate: IUser = item;
      const response = await fetch(`/update/${userToUpdate.id}`, {
        method: "POST",
        body: JSON.stringify(userToUpdate),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const users: IUser[] = await response.json();
      return users;
    }

    return [] as IUser[];
  }

  public static async delete(item: IUser): Promise<IUser[]> {
    if (item !== undefined) {
      let userToDelete: IUser = item;
      const response = await fetch(`/delete/${userToDelete.id}`, {
        method: "POST",
        body: JSON.stringify(userToDelete),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const users: IUser[] = await response.json();
      return users;
    }
    return [] as IUser[];
  }
}
