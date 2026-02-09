import db from "../models/index.js";

const Op = db.Sequelize.Op;
const Mybini = db.mybini;

export const create = (req, res) => {
    // Validasi request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    // Create Mybini
    const mybini = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };
    // Save Mybini in the database
    Mybini.create(mybini)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while saving database Mybini.",
            });
        });
};

// Find all Mybini
export const findAll = (req, res) => {
    // Allow filter condition
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Mybini.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving database Mybini.",
            });
        });
};

// Find a single Mybini with an id
export const findOne = (req, res) => {
    const id = req.params.id;

    // Find Mybini by id in the database
    Mybini.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot fing Mybini with id=${id}. Maybe Mybini was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Mybini with id=" + id,
            });
        });
};

// Update a Mybini with an id
export const update = (req, res) => {
    const id = req.params.id;

    // Mybini update with specified ID
    Mybini.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: "Mybini was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Mybini with id=${id}. Maybe Mybini was not successfully updated.`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Error updating Mybini with id=" + id,
            });
        });
};

// Delete a Mybini with an id
export const deleteOne = (req, res) => {
    const id = req.params.id;

    // Delete Mybini with specified ID
    Mybini.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num === 1) {
                res.send({
                    message: "Mybini was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Mybini with id=${id}. Maybe Mybini was not found.`
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Could not delete Mybini with id=" + id,
            });
        });
}

// Delete all Mybini from the database
export const deleteAll = (req, res) => {
    Mybini.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({
                message: `${nums} Mybini were deleted successfully!`,
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while removing all Mybini."
            });
        });
};

// Find all published Mybini
export const findAllPublished = (req, res) => {
    // Find all Mybini with published = true
    Mybini.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving published Mybini."
            })
        })
}
