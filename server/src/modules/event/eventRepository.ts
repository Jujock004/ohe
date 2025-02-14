import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Event = {
  id: number;
  title: string;
  user_id: number;
  description: string;
  hour: string;
  date: string;
  location: string;
  image_url: string;
};

class EventRepository {
  async create(event: Omit<Event, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into event (title, user_id, description, hour, date, location) values (?, ?, ?, ?, ?, ?)",
      [
        event.title,
        event.user_id,
        event.description,
        event.hour,
        event.date,
        event.location,
        event.image_url,
      ],
    );

    return result.insertId;
  }

  async delete(id: number) {
    await databaseClient.query("delete from event where id = ?", [id]);
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from event where id = ?",
      [id],
    );

    return rows[0] as Event;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from event");

    return rows as Event[];
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from event where user_id = ?",
      [userId],
    );

    return rows as Event[];
  }

  // async update(event: Event) {
  // }

  // async delete(id: number) {
  // }
}

export default new EventRepository();
