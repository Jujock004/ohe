import type { RequestHandler } from "express";

// Import access to data
import participationRepository from "./participationRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all participations
    const participations = await participationRepository.readAll();

    // Respond with the participations in JSON format
    res.json(participations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific participation based on the provided ID
    const participationId = Number(req.params.id);
    const participation = await participationRepository.read(participationId);

    // If the participation is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the participation in JSON format
    if (participation == null) {
      res.sendStatus(404);
    } else {
      res.json(participation);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read by Event ID operation
const readByEventId: RequestHandler = async (req, res, next) => {
  try {
    // Fetch participations based on the provided event ID
    const eventId = Number(req.params.eventId);
    const participations = await participationRepository.readByEventId(eventId);

    // Respond with the participations in JSON format
    res.json(participations);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the participation data from the request body
    const newParticipation = {
      user_id: req.body.user_id,
      event_id: req.body.event_id,
    };

    // Create the participation
    const insertId = await participationRepository.create(newParticipation);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted participation
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, readByEventId, add };
