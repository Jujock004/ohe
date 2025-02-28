import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Participation = {
  id: number;
  event_id: number;
  user_id: number;
};

class ParticipationRepository {
  // The C of CRUD - Create operation

  async create(participation: Omit<Participation, "id">) {
    // Execute the SQL INSERT query to add a new participation to the "participation" table
    const [result] = await databaseClient.query<Result>(
      "insert into participation (event_id, user_id) values (?, ?)",
      [participation.event_id, participation.user_id],
    );

    // Return the ID of the newly inserted participation
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific participation by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from participation where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the participation
    return rows[0] as Participation;
  }

  async readByEventId(eventId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from participation where event_id = ?",
      [eventId],
    );
    return rows as Participation[];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all participations from the "participation" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from participation",
    );

    // Return the array of participations
    return rows as Participation[];
  }

  async isRegistered(eventId: number, userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from participation where event_id = ? and user_id = ?",
      [eventId, userId],
    );
    return rows.length > 0;
  }

  async register(eventId: number, userId: number) {
    const isAlreadyRegistered = await this.isRegistered(eventId, userId);
    if (isAlreadyRegistered) {
      throw new Error("Already registered to this event");
    }

    const [result] = await databaseClient.query<Result>(
      "insert into participation (event_id, user_id) values (?, ?)",
      [eventId, userId],
    );
    return result.insertId;
  }

  async unregister(eventId: number, userId: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from participation where event_id = ? and user_id = ?",
      [eventId, userId],
    );
    return result.affectedRows > 0;
  }

  async readByParticipant(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select e.* from event e inner join participation p on e.id = p.event_id where p.user_id = ?",
      [userId],
    );

    return rows as Event[];
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM event WHERE user_id = ?",
      [userId],
    );

    return rows as Event[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing participation

  // async update(participation: Participation) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a participation by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ParticipationRepository();
