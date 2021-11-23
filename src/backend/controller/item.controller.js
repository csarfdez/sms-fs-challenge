const dbContext = require("./../models");
const Item = dbContext.Items;

exports.findAll = (req, res) => {
  Item.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};

exports.create = (req, res) => {
  if (req.body.name == null || req.body.email == null) {
    res.status(204).send({
      error: "Empty content not allowed",
    });
  }

  Item.create(req.body)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
};

exports.findById = (req, res) => {
  Item.findByPk(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(204).send(err));
};

exports.delete = (req, res) => {
  Item.destroy({
    where: { id: req.params.id },
  })
    .then((data) =>
      res.status(204).json({
        msg: "Item deleted.",
      })
    )
    .catch((err) =>
      res.status(400).send({
        error: "Error while deleting",
      })
    );
};

exports.update = (req, res) => {
  Item.update(req.body, { where: { id: req.params.id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Updated",
        });
      } else {
        res.status(400).send({
          message: `Can not update item with id ${req.params.id}`,
        });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};