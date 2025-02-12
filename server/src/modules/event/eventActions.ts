import type { RequestHandler } from "express";

// Import access to data
import eventRepository from "./eventRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all events
    const events = await eventRepository.readAll();

    // Respond with the events in JSON format
    res.json(events);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific event based on the provided ID
    const eventId = Number(req.params.id);
    const event = await eventRepository.read(eventId);

    // If the event is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the event in JSON format
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the event data from the request body
    const newEvent = {
      title: req.body.title,
      user_id: req.body.user_id,
      description: req.body.description,
      hour: req.body.hour,
      date: req.body.date,
      location: req.body.location,
    };

    // Create the event
    const insertId = await eventRepository.create(newEvent);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted event
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
