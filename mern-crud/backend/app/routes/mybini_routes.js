import * as mybini_controller from "../controllers/mybini_controllers.js";
import express from "express";

export default (app) => {
    let router = express.Router();

    // Create new Mybini
    router.post("/", mybini_controller.create);

    // Retrieve all Mybini
    router.get("/", mybini_controller.findAll);

    // Retrieve a single Mybini with an ID
    router.get("/:id", mybini_controller.findOne);

    // Update a Mybini with an ID
    router.put("/:id", mybini_controller.update);

    // Delete Mybini with an ID
    router.delete("/:id", mybini_controller.deleteOne);

    // Delete all Mybini
    router.delete("/", mybini_controller.deleteAll);

    // Find all published Mybini
    router.get("/published", mybini_controller.findAllPublished);

    // routes the api
    app.use("/api/mybini", router);
}